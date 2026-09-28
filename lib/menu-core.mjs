const text = (value) => typeof value === "string" ? value.trim().slice(0, 400) : "";
export const slugify = (value) => text(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export function categorySlug(value) {
  const key = text(value).toUpperCase().replace(/[_-]/g, " ");
  if (key.includes("PRE") && key.includes("ROLL")) return "pre-rolls";
  if (key.includes("DISPOSABLE")) return "vape-disposables";
  if (key.includes("VAPE") || key.includes("NICOTINE")) return "nicotine-vapes";
  if (key.includes("EDIBLE")) return "edibles";
  if (key.includes("CONCENTRATE") || key.includes("HASH")) return "concentrates";
  if (key.includes("CIGARETTE")) return "cigarettes";
  if (key.includes("ACCESSOR") || key.includes("ADD ON")) return "accessories";
  return "other";
}
export function safeImage(value) {
  try { const url = new URL(value); return url.protocol === "https:" && url.hostname === "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev" ? url.href : ""; } catch { return ""; }
}
// TPC01 lists only these weights, and only when the source price is positive. Never derive a missing weight.
export const APPROVED_STORE_CODE = "TPC01";
const LEGACY_PREVIEW_STORE_CODE = "CHC01";
export const FLOWER_PRICE_FIELDS = Object.freeze(["price3g", "price5g", "price14g", "price28g"]);
const FLOWER_WEIGHTS = new Set(["3g", "5g", "14g", "28g"]);
export function resolveMenuStoreCode(envValue) {
  const code = typeof envValue === "string" ? envValue.trim() : "";
  // This storefront is TPC01. An empty value or a leftover CHC01 preview env must not select another feed.
  if (!code || code === LEGACY_PREVIEW_STORE_CODE || code === APPROVED_STORE_CODE) return APPROVED_STORE_CODE;
  return "";
}
export function flowerWeightLabel(field) {
  const label = typeof field === "string" && field.startsWith("price") ? field.slice(5) : "";
  return FLOWER_WEIGHTS.has(label) ? label : "";
}
export function flowerPrices(row, allowedWeights = null) {
  return FLOWER_PRICE_FIELDS.flatMap((field) => {
    const label = flowerWeightLabel(field);
    if (!label || (allowedWeights && !allowedWeights.has(label))) return [];
    const price = row?.[field];
    if (!price || typeof price.regular !== "number" || !Number.isFinite(price.regular) || price.regular <= 0) return [];
    const sale = typeof price.sale === "number" && Number.isFinite(price.sale) && price.sale > 0 && price.sale < price.regular ? price.sale : null;
    return [{ label, amount: sale ?? price.regular, regular: price.regular, sale }];
  });
}
const skuTokens = (sku) => String(sku).split(",").map((part) => part.trim()).filter(Boolean);
// stock=1 is a quantity map, not a catalog. Keep source rows only where a listed SKU is on hand.
/**
 * @param {any} data
 * @param {string} [requestedStore]
 * @returns {{ available: Map<string, Set<string>>, stockDate: string }}
 */
export function parseOnHandStock(data, requestedStore = APPROVED_STORE_CODE) {
  if (requestedStore !== APPROVED_STORE_CODE) throw new Error("SOURCE_NOT_APPROVED");
  if (!data || typeof data !== "object" || Array.isArray(data) || !data.stock || typeof data.stock !== "object" || Array.isArray(data.stock)) throw new Error("INVALID_ONHAND");
  const claimedStore = data.storeCode ?? data.store;
  if (claimedStore && claimedStore !== requestedStore) throw new Error("SOURCE_MISMATCH");
  const available = new Map();
  for (const [sku, units] of Object.entries(data.stock)) {
    const key = text(sku);
    if (!key || !units || typeof units !== "object" || Array.isArray(units)) continue;
    const positive = new Set();
    for (const [unit, qty] of Object.entries(units)) {
      if (typeof qty === "number" && Number.isFinite(qty) && qty > 0) positive.add(text(unit));
    }
    if (positive.size) available.set(key, positive);
  }
  if (typeof data.skuCount === "number" && data.skuCount > 0 && available.size === 0) throw new Error("INVALID_ONHAND");
  const date = text(data.date ?? data.stockDate);
  const validDate = /^\d{4}-\d{2}-\d{2}T/.test(date) && Number.isFinite(Date.parse(date));
  return { available, stockDate: validDate ? date : "" };
}
/**
 * @param {any} data
 * @param {string} [requestedStore]
 * @param {{ available: Map<string, Set<string>>, stockDate: string } | null} [onHand]
 */
export function normalizeMenu(data, requestedStore = APPROVED_STORE_CODE, onHand = null) {
  if (requestedStore !== APPROVED_STORE_CODE) throw new Error("SOURCE_NOT_APPROVED");
  if (!data || !Array.isArray(data.flowers) || !Array.isArray(data.items)) throw new Error("INVALID_MENU");
  const claimedStore = data.storeCode ?? data.store;
  if (claimedStore && claimedStore !== requestedStore) throw new Error("SOURCE_MISMATCH");
  const used = new Set();
  const products = [];
  for (const [kind, rows] of [["flower", data.flowers], ["item", data.items]]) {
    for (const row of rows) {
      if (!row || !text(row.name) || !["number", "string"].includes(typeof row.sku)) continue;
      if (row.storeCode && row.storeCode !== requestedStore) throw new Error("SOURCE_MISMATCH");
      const sourceSku = String(row.sku).trim();
      if (!sourceSku || !/^[A-Za-z0-9_, -]+$/.test(sourceSku)) continue;
      let sku = sourceSku;
      let allowedWeights = null;
      if (onHand) {
        const kept = [];
        const units = new Set();
        for (const token of skuTokens(sourceSku)) {
          const entry = onHand.available?.get(token);
          if (!entry) continue;
          kept.push(token);
          for (const unit of entry) units.add(unit);
        }
        // A grouped row stays when any member is on hand. Out-of-stock siblings are not listed.
        if (!kept.length) continue;
        sku = kept.join(", ");
        if (kind === "flower") allowedWeights = units;
      }
      // Upstream rows can legitimately group several SKUs or share a SKU group
      // across different named variants. Slug identity stays on the source SKU string.
      const id = `${kind}-${slugify(sourceSku)}-${slugify(row.name)}`;
      if (used.has(id)) continue;
      used.add(id);
      const prices = kind === "flower" ? flowerPrices(row, allowedWeights) : [];
      if (kind === "flower" && allowedWeights && prices.length === 0) continue;
      const rawPrice = typeof row.price === "number" ? row.price : Number(text(row.price).replace(/^\$/, ""));
      if (kind === "item" && Number.isFinite(rawPrice) && rawPrice > 0) prices.push({ label: "Listed price", amount: rawPrice, regular: rawPrice, sale: null });
      products.push({ id, sku, name: text(row.name), slug: `${slugify(row.name)}-${kind}-${slugify(sourceSku)}`, category: kind === "flower" ? "flower" : categorySlug(row.category), tier: text(row.tier), type: text(row.type), thc: text(row.thc), mg: text(row.mg), image: safeImage(row.image), prices });
    }
  }
  const date = text(data.stockDate);
  const validDate = /^\d{4}-\d{2}-\d{2}T/.test(date) && Number.isFinite(Date.parse(date));
  const stockDate = onHand?.stockDate || (validDate ? date : "");
  return { products, stockDate, sourceIdentity: claimedStore ? "response-validated" : "request-scoped-only" };
}
