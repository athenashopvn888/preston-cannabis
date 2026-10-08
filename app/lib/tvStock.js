/**
 * TPC01 stock + catalog loader for /api/tv-data.
 *
 * Reads the same Apps Script deployment spirit-corner uses, with ?store=TPC01
 * for the flowers/items catalog and ?store=TPC01&stock=1 for the ONHAND map.
 * Successful live payloads are cached in memory for TV_STOCK_CACHE_MS (~5 min).
 * A failed refresh serves the last successful payload. If TPC01 has never
 * returned a usable sheet, callers receive the static snapshot they passed in
 * (this repo has no committed flowers.json / items.json, so that snapshot is
 * empty unless a caller supplies one). Nothing is invented.
 *
 * Does not import lib/menu-core.mjs, so it stays independent of the menu
 * ONHAND filter.
 */

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

const TV_STORE = "TPC01";
const TV_STOCK_CACHE_MS = 300 * 1000;
const TV_STOCK_FAILURE_CACHE_MS = 60 * 1000;
const TV_STOCK_FETCH_TIMEOUT_MS = 25000;
const PARTIAL_STOCK_RATIO = 0.5;
const ALLOWED_HOSTS = new Set(["script.google.com", "script.googleusercontent.com"]);

const SALE_RE = /\bSALE\b/i;
const ON_SALE_RE = /ON\s*SALE/i;
const PRICE_FIELDS = [
  ["price3g", "3g"],
  ["price5g", "5g"],
  ["price14g", "14g"],
  ["price28g", "28g"],
];

function hasSalePrice(flower) {
  return PRICE_FIELDS.some(([field]) => flower[field] && flower[field].sale !== null && flower[field].sale !== undefined);
}

function cleanName(name) {
  return String(name || "")
    .replace(/\s*\(?\s*AAA\+?\s*ON\s*SALE\s*\)?\s*$/i, "")
    .replace(/\s*\(?\s*AAA\+?\s*SALE!?\s*\)?\s*$/i, "")
    .replace(/\s*\bSALE!?\s*$/i, "")
    .replace(/\s*\bON\s*SALE\s*$/i, "")
    .trim();
}

function postprocessFlowers(flowers) {
  let saleFixed = 0;
  for (const flower of flowers) {
    if (!flower.isSale) {
      if (SALE_RE.test(flower.name) || ON_SALE_RE.test(flower.name) || hasSalePrice(flower)) {
        flower.isSale = true;
        saleFixed++;
      }
    }
    flower.name = cleanName(flower.name);
  }
  return { flowers, saleFixed };
}

function postprocessItems(items) {
  let itemsFixed = 0;
  for (const item of items) {
    if (typeof item.price === "string" && item.price.includes("[object")) {
      item.price = "";
      itemsFixed++;
    }
  }
  return { items, itemsFixed };
}

function resolveAppsScriptUrl(explicit) {
  const raw = explicit != null ? String(explicit) : String(process.env.APPS_SCRIPT_URL || "");
  const trimmed = raw.trim();
  const candidate = trimmed || DEFAULT_APPS_SCRIPT_URL;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function sheetUrl(baseUrl, stock) {
  const url = new URL(baseUrl);
  url.searchParams.set("store", TV_STORE);
  if (stock) url.searchParams.set("stock", "1");
  else url.searchParams.delete("stock");
  return url.toString();
}

function staticDataset(staticFlowers, staticItems) {
  return {
    source: "static-fallback",
    flowers: Array.isArray(staticFlowers) ? staticFlowers : [],
    items: Array.isArray(staticItems) ? staticItems : [],
    stockDate: "",
  };
}

function skuTokens(sku) {
  return String(sku ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseOnHand(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  if (!data.stock || typeof data.stock !== "object" || Array.isArray(data.stock)) return null;
  const claimed = data.storeCode || data.store;
  if (claimed && claimed !== TV_STORE) return null;
  const available = new Map();
  for (const [sku, units] of Object.entries(data.stock)) {
    const key = String(sku).trim();
    if (!key || !units || typeof units !== "object" || Array.isArray(units)) continue;
    const positive = new Set();
    for (const [unit, qty] of Object.entries(units)) {
      if (typeof qty === "number" && Number.isFinite(qty) && qty > 0) positive.add(String(unit).trim());
    }
    if (positive.size) available.set(key, positive);
  }
  const date = data.date == null && data.stockDate == null ? "" : String(data.date ?? data.stockDate);
  return { available, stockDate: date };
}

function applyOnHand(flowers, items, onHand) {
  const nextFlowers = [];
  for (const flower of flowers) {
    if (!flower || typeof flower !== "object") continue;
    const weights = new Set();
    let listed = false;
    for (const token of skuTokens(flower.sku)) {
      const entry = onHand.available.get(token);
      if (!entry) continue;
      listed = true;
      for (const unit of entry) weights.add(unit);
    }
    if (!listed) continue;
    const copy = { ...flower };
    for (const [field, unit] of PRICE_FIELDS) {
      if (!weights.has(unit)) copy[field] = null;
    }
    if (!PRICE_FIELDS.some(([field]) => copy[field])) continue;
    nextFlowers.push(copy);
  }

  const nextItems = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    if (!skuTokens(item.sku).some((token) => onHand.available.has(token))) continue;
    nextItems.push({ ...item });
  }
  return { flowers: nextFlowers, items: nextItems };
}

function rejectCatalog(data) {
  if (!data || typeof data !== "object") return "invalid payload";
  if (!Array.isArray(data.flowers) || !Array.isArray(data.items)) return "missing flowers or items";
  const claimed = data.storeCode || data.store;
  if (claimed && claimed !== TV_STORE) return "store mismatch";
  if (data.flowers.length === 0 || data.items.length === 0) return "empty flowers or items";
  return null;
}

function tooPartial(flowers, items, staticFlowers, staticItems) {
  const flowerBaseline = Array.isArray(staticFlowers) ? staticFlowers.length : 0;
  const itemBaseline = Array.isArray(staticItems) ? staticItems.length : 0;
  if (flowerBaseline > 0 && flowers.length < flowerBaseline * PARTIAL_STOCK_RATIO) {
    return `partial flowers ${flowers.length}/${flowerBaseline}`;
  }
  if (itemBaseline > 0 && items.length < itemBaseline * PARTIAL_STOCK_RATIO) {
    return `partial items ${items.length}/${itemBaseline}`;
  }
  return null;
}

let cached = null;
let lastGood = null;
let inflight = null;

function resetTvStockCache() {
  cached = null;
  lastGood = null;
  inflight = null;
}

function selectTvPayload(dataset, type) {
  const body = type === "items" ? dataset.items : dataset.flowers;
  return {
    body,
    headers: {
      "x-tv-data-source": dataset.source,
      "x-tv-data-as-of": dataset.stockDate == null ? "" : String(dataset.stockDate),
      "x-tv-data-store": TV_STORE,
      "x-tv-data-flower-count": String(dataset.flowers.length),
      "x-tv-data-item-count": String(dataset.items.length),
      ...(dataset.fallbackReason ? { "x-tv-data-fallback-reason": dataset.fallbackReason } : {}),
      "Cache-Control": "no-store",
    },
    status: dataset.status || 200,
  };
}

async function fetchJson(fetchImpl, url, timeoutMs) {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetchImpl(url, {
        signal: AbortSignal.timeout(timeoutMs),
        cache: "no-store",
      });
      if (!res || !res.ok) {
        const status = res ? res.status : "no response";
        throw new Error(`HTTP ${status}`);
      }
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("fetch failed");
}

function remember(dataset, now) {
  lastGood = dataset;
  cached = { expiresAt: now + TV_STOCK_CACHE_MS, dataset };
  return dataset;
}

async function resolveDataset(options) {
  const fetchImpl = options.fetchImpl || fetch;
  const timeoutMs = options.timeoutMs ?? TV_STOCK_FETCH_TIMEOUT_MS;
  const baseUrl = resolveAppsScriptUrl(options.appsScriptUrl);
  const now = options.now ?? Date.now();
  const fail = (reason) => {
    const dataset = lastGood
      ? { ...lastGood, source: "last-good", fallbackReason: reason }
      : { ...staticDataset(options.staticFlowers, options.staticItems), fallbackReason: reason, status: 503 };
    cached = { expiresAt: now + TV_STOCK_FAILURE_CACHE_MS, dataset };
    return dataset;
  };

  if (!baseUrl) {
    console.warn("[tv-data] Apps Script URL unavailable; serving fallback");
    return fail("Apps Script URL unavailable");
  }

  let catalog;
  try {
    catalog = await fetchJson(fetchImpl, sheetUrl(baseUrl, false), timeoutMs);
  } catch (err) {
    console.warn(`[tv-data] Catalog fetch failed (${err.message}); serving fallback`);
    return fail(err.message || "catalog fetch failed");
  }

  const catalogReason = rejectCatalog(catalog);
  if (catalogReason) {
    console.warn(`[tv-data] Catalog rejected (${catalogReason}); serving fallback`);
    return fail(`catalog rejected: ${catalogReason}`);
  }

  let onHand = null;
  try {
    onHand = parseOnHand(await fetchJson(fetchImpl, sheetUrl(baseUrl, true), timeoutMs));
  } catch (err) {
    console.warn(`[tv-data] ONHAND fetch failed (${err.message})`);
    return fail(err.message || "ONHAND fetch failed");
  }

  let flowers = catalog.flowers;
  let items = catalog.items;
  let source = "catalog";
  let stockDate = catalog.stockDate == null ? "" : String(catalog.stockDate);

  if (onHand && onHand.available.size > 0) {
    const filtered = applyOnHand(flowers, items, onHand);
    if (filtered.flowers.length === 0 || filtered.items.length === 0) {
      console.warn("[tv-data] ONHAND intersection empty; serving fallback");
      return fail("ONHAND intersection empty");
    }
    flowers = filtered.flowers;
    items = filtered.items;
    source = "live";
    if (onHand.stockDate) stockDate = onHand.stockDate;
  } else {
    console.warn("[tv-data] ONHAND unavailable; serving last-known-good snapshot");
    return fail("ONHAND data unavailable");
  }

  const partial = tooPartial(flowers, items, options.staticFlowers, options.staticItems);
  if (partial) {
    console.warn(`[tv-data] Live stock rejected (${partial}); serving fallback`);
    return fail(`live stock rejected: ${partial}`);
  }

  postprocessFlowers(flowers);
  postprocessItems(items);

  return remember({ source, flowers, items, stockDate }, now);
}

async function getTvData(options) {
  const now = options.now ?? Date.now();
  let dataset;
  if (cached && now < cached.expiresAt) {
    dataset = cached.dataset;
  } else {
    if (!inflight) {
      inflight = resolveDataset(options).finally(() => {
        inflight = null;
      });
    }
    dataset = await inflight;
  }

  const requested = options.type === "items" ? dataset.items : dataset.flowers;
  const staticRequested = options.type === "items" ? options.staticItems : options.staticFlowers;
  if (
    dataset.source !== "static-fallback" &&
    dataset.source !== "last-known-good" &&
    Array.isArray(requested) &&
    requested.length === 0 &&
    Array.isArray(staticRequested) &&
    staticRequested.length > 0
  ) {
    dataset = staticDataset(options.staticFlowers, options.staticItems);
  }

  return selectTvPayload(dataset, options.type);
}

module.exports = {
  DEFAULT_APPS_SCRIPT_URL,
  TV_STORE,
  TV_STOCK_CACHE_MS,
  TV_STOCK_FETCH_TIMEOUT_MS,
  PARTIAL_STOCK_RATIO,
  hasSalePrice,
  cleanName,
  postprocessFlowers,
  postprocessItems,
  resolveAppsScriptUrl,
  parseOnHand,
  applyOnHand,
  getTvData,
  resetTvStockCache,
};
