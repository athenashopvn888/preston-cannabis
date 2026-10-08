import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { beforeEach, test } from "node:test";

const require = createRequire(import.meta.url);
const {
  DEFAULT_APPS_SCRIPT_URL,
  TV_STORE,
  getTvData,
  postprocessFlowers,
  postprocessItems,
  resetTvStockCache,
} = require("../app/lib/tvStock.js");

const staticFlowers = Array.from({ length: 10 }, (_, index) => flower(`STATIC FLOWER ${index}`));
const staticItems = Array.from({ length: 10 }, (_, index) => item(`STATIC ITEM ${index}`));

beforeEach(() => {
  resetTvStockCache();
});

function flower(name, extra = {}) {
  return {
    sku: name,
    name,
    slug: name.toLowerCase(),
    tier: "AAA+",
    type: "hybrid",
    isHot: false,
    isSale: false,
    thc: "20%",
    price3g: { regular: 20, sale: null },
    price5g: { regular: 30, sale: null },
    price14g: null,
    price28g: null,
    image: "",
    ...extra,
  };
}

function item(name, price = "$10", extra = {}) {
  return {
    sku: name,
    name,
    slug: name.toLowerCase(),
    category: "EDIBLES",
    type: "",
    thc: "",
    mg: "",
    price,
    image: "",
    ...extra,
  };
}

function list(count, factory) {
  return Array.from({ length: count }, (_, index) => factory(index));
}

function stockMap(rows) {
  const stock = {};
  for (const row of rows) {
    for (const token of String(row.sku).split(",").map((part) => part.trim())) {
      const units = {};
      if (row.price3g) units["3g"] = 2;
      if (row.price5g) units["5g"] = 2;
      if (row.price14g) units["14g"] = 1;
      if (row.price28g) units["28g"] = 1;
      if (row.price) units.e = 3;
      stock[token] = units;
    }
  }
  return { storeCode: "TPC01", date: "2026-09-27T16:15:30.000Z", skuCount: Object.keys(stock).length, stock };
}

function mockFetch(catalog, onHand, { catalogStatus = 200, stockStatus = 200, throwCatalog = null, throwStock = null } = {}) {
  const calls = [];
  const fetchImpl = async (url, opts) => {
    calls.push({ url, opts });
    const stockCall = String(url).includes("stock=1");
    if (stockCall ? throwStock : throwCatalog) throw (stockCall ? throwStock : throwCatalog);
    const status = stockCall ? stockStatus : catalogStatus;
    return {
      ok: status >= 200 && status < 300,
      status,
      async json() {
        return stockCall ? onHand : catalog;
      },
    };
  };
  return { fetchImpl, calls };
}

test("live catalog intersected with ONHAND is cached and reports TPC01 headers", async () => {
  const flowers = list(8, (index) =>
    index === 0
      ? flower("GELATO AAA+ ON SALE", { sku: "900" })
      : flower(`FLOWER ${index}`, { sku: String(100 + index), ...(index === 1 ? { price3g: { regular: 20, sale: 15 } } : {}) }),
  );
  const items = list(8, (index) => (index === 0 ? item("CART", "$[object Object]", { sku: "800" }) : item(`ITEM ${index}`, "$12", { sku: String(200 + index) })));
  const hidden = flower("OUT OF STOCK", { sku: "404" });
  const catalog = {
    storeCode: "TPC01",
    stockDate: "2026-09-27T16:15:30.000Z",
    flowers: [...flowers, hidden],
    items,
  };
  const onHand = stockMap(flowers.concat(items));
  onHand.stock["101"] = { "5g": 4 };
  const { fetchImpl, calls } = mockFetch(catalog, onHand);

  const flowerRes = await getTvData({
    type: "flowers",
    staticFlowers,
    staticItems,
    fetchImpl,
    appsScriptUrl: "",
    now: 1_000,
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, `${DEFAULT_APPS_SCRIPT_URL}?store=TPC01`);
  assert.equal(calls[1].url, `${DEFAULT_APPS_SCRIPT_URL}?store=TPC01&stock=1`);
  assert.equal(calls[0].opts.cache, "no-store");
  assert.equal(flowerRes.headers["x-tv-data-source"], "live");
  assert.equal(flowerRes.headers["x-tv-data-as-of"], "2026-09-27T16:15:30.000Z");
  assert.equal(flowerRes.headers["x-tv-data-store"], TV_STORE);
  assert.equal(flowerRes.headers["x-tv-data-flower-count"], "8");
  assert.equal(flowerRes.headers["Cache-Control"], "no-store");
  assert.equal(flowerRes.body[0].name, "GELATO");
  assert.equal(flowerRes.body[0].isSale, true);
  assert.equal(flowerRes.body.some((row) => row.sku === "404"), false);
  const weighted = flowerRes.body.find((row) => row.sku === "101");
  assert.equal(weighted.price3g, null);
  assert.equal(weighted.price5g.regular, 30);

  const itemRes = await getTvData({
    type: "items",
    staticFlowers,
    staticItems,
    fetchImpl,
    now: 1_000 + 200_000,
  });
  assert.equal(calls.length, 2);
  assert.equal(itemRes.body[0].price, "");
  assert.equal(itemRes.headers["x-tv-data-source"], "live");
});

test("a failed refresh keeps the last-known-good snapshot", async () => {
  const flowers = list(6, (index) => flower(`LIVE ${index}`, { sku: String(index + 1) }));
  const items = list(6, (index) => item(`LIVE ITEM ${index}`, "$9", { sku: String(50 + index) }));
  const first = mockFetch(
    { storeCode: "TPC01", stockDate: "2026-09-27T16:15:30.000Z", flowers, items },
    stockMap(flowers.concat(items)),
  );
  const live = await getTvData({
    type: "flowers",
    staticFlowers,
    staticItems,
    fetchImpl: first.fetchImpl,
    appsScriptUrl: "https://script.google.com/macros/s/test/exec",
    now: 5_000,
  });
  assert.equal(live.headers["x-tv-data-source"], "live");
  assert.equal(live.body[0].name, "LIVE 0");

  const failed = await getTvData({
    type: "items",
    staticFlowers,
    staticItems,
    fetchImpl: mockFetch(null, null, { throwCatalog: new Error("network down") }).fetchImpl,
    appsScriptUrl: "https://script.google.com/macros/s/test/exec",
    now: 5_000 + 301_000,
  });
  assert.equal(failed.headers["x-tv-data-source"], "last-good");
  assert.equal(failed.headers["x-tv-data-fallback-reason"], "network down");
  assert.equal(failed.headers["x-tv-data-as-of"], "2026-09-27T16:15:30.000Z");
  assert.equal(failed.body.length, 6);
  assert.equal(failed.body[0].name, "LIVE ITEM 0");
  assert.notEqual(failed.body, staticItems);
});

test("HTTP 200 HTML, HTTP 429, and thrown fetches serve last-good with a reason and cool down for 60 seconds", async () => {
  const flowers = list(6, (index) => flower(`LIVE ${index}`, { sku: String(index + 1) }));
  const items = list(6, (index) => item(`LIVE ITEM ${index}`, "$9", { sku: String(50 + index) }));
  const good = mockFetch(
    { storeCode: "TPC01", stockDate: "2026-09-27T16:15:30.000Z", flowers, items },
    stockMap(flowers.concat(items)),
  );

  for (const scenario of [
    {
      name: "HTML error body",
      fetchImpl: async () => ({ ok: true, status: 200, async json() { throw new SyntaxError("Unexpected token '<'"); } }),
      reason: "Unexpected token '<'",
    },
    {
      name: "429 rate limit",
      ...mockFetch(null, null, { catalogStatus: 429 }),
      reason: "HTTP 429",
    },
    {
      name: "thrown network error",
      ...mockFetch(null, null, { throwCatalog: new Error("socket reset") }),
      reason: "socket reset",
    },
  ]) {
    resetTvStockCache();
    await getTvData({ type: "flowers", staticFlowers, staticItems, fetchImpl: good.fetchImpl, appsScriptUrl: "https://script.google.com/macros/s/test/exec", now: 1_000 });
    const failed = await getTvData({ type: "flowers", staticFlowers, staticItems, fetchImpl: scenario.fetchImpl, appsScriptUrl: "https://script.google.com/macros/s/test/exec", now: 302_000 });
    assert.equal(failed.status, 200, scenario.name);
    assert.equal(failed.headers["x-tv-data-source"], "last-good", scenario.name);
    assert.equal(failed.headers["x-tv-data-as-of"], "2026-09-27T16:15:30.000Z", scenario.name);
    assert.equal(failed.headers["x-tv-data-fallback-reason"], scenario.reason, scenario.name);
    let callsDuringCooldown = 0;
    const retry = await getTvData({
      type: "items",
      staticFlowers,
      staticItems,
      fetchImpl: async () => { callsDuringCooldown += 1; throw new Error("must not refetch during cooldown"); },
      appsScriptUrl: "https://script.google.com/macros/s/test/exec",
      now: 361_000,
    });
    assert.equal(callsDuringCooldown, 0, scenario.name);
    assert.equal(retry.headers["x-tv-data-source"], "last-good", scenario.name);
    assert.equal(retry.headers["x-tv-data-fallback-reason"], scenario.reason, scenario.name);
  }
});

test("fetch failure with no snapshot returns the static product data", async () => {
  const result = await getTvData({
    type: "flowers",
    staticFlowers,
    staticItems,
    fetchImpl: mockFetch(null, null, { throwCatalog: new Error("network down") }).fetchImpl,
    appsScriptUrl: "https://script.google.com/macros/s/test/exec",
  });
  assert.equal(result.headers["x-tv-data-source"], "static-fallback");
  assert.equal(result.status, 503);
  assert.equal(result.headers["x-tv-data-fallback-reason"], "network down");
  assert.equal(result.headers["x-tv-data-as-of"], "");
  assert.equal(result.headers["x-tv-data-store"], "TPC01");
  assert.equal(result.body, staticFlowers);

  resetTvStockCache();
  const emptyStatic = await getTvData({
    type: "items",
    staticFlowers: [],
    staticItems: [],
    fetchImpl: mockFetch({ flowers: [], items: [], storeCode: "TPC01" }, { stock: {} }, {}).fetchImpl,
    appsScriptUrl: "https://script.google.com/macros/s/test/exec",
  });
  assert.equal(emptyStatic.headers["x-tv-data-source"], "static-fallback");
  assert.equal(emptyStatic.status, 503);
  assert.deepEqual(emptyStatic.body, []);
});

test("partial live stock falls back instead of inventing a full board", async () => {
  const flowers = list(4, (index) => flower(`P${index}`, { sku: String(index + 1) }));
  const items = list(10, (index) => item(`I${index}`, "$8", { sku: String(30 + index) }));
  const result = await getTvData({
    type: "flowers",
    staticFlowers,
    staticItems,
    fetchImpl: mockFetch(
      { storeCode: "TPC01", stockDate: "2026-09-27T16:15:30.000Z", flowers, items },
      stockMap(flowers.concat(items)),
    ).fetchImpl,
    appsScriptUrl: "https://script.google.com/macros/s/test/exec",
  });
  assert.equal(result.headers["x-tv-data-source"], "static-fallback");
  assert.equal(result.body, staticFlowers);
});

test("sale names and mangled item prices are cleaned", () => {
  const flowers = [flower("COOKIE AAA+ SALE!"), flower("PLAIN", { isSale: true })];
  const { saleFixed } = postprocessFlowers(flowers);
  assert.equal(saleFixed, 1);
  assert.equal(flowers[0].name, "COOKIE");
  assert.equal(flowers[0].isSale, true);

  const items = [item("BAD", "from $[object Object]"), item("OK", "$12")];
  const { itemsFixed } = postprocessItems(items);
  assert.equal(itemsFixed, 1);
  assert.equal(items[0].price, "");
  assert.equal(items[1].price, "$12");
});
