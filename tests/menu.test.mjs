import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMenu, safeImage, categorySlug, flowerPrices, flowerWeightLabel, FLOWER_PRICE_FIELDS } from "../lib/menu-core.mjs";
const product = { sku: "42", name: "Test flower", tier: "AAA+", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/test.webp", price5g: { regular: 30 } };
test("validates store scope and distinguishes request-only identity", () => { const output = normalizeMenu({ flowers: [product], items: [] }); assert.equal(output.sourceIdentity, "request-scoped-only"); assert.equal(output.products[0].slug, "test-flower-flower-42"); assert.equal(output.products[0].prices[0].amount, 30); assert.throws(() => normalizeMenu({ storeCode: "FYC01", flowers: [], items: [] }), /SOURCE_MISMATCH/); assert.throws(() => normalizeMenu({ flowers: [], items: [] }, "PRESTON"), /SOURCE_NOT_APPROVED/); });
test("malformed and mismatched products are rejected; duplicates removed", () => { assert.throws(() => normalizeMenu({ flowers: [] }), /INVALID_MENU/); assert.equal(normalizeMenu({ flowers: [null, {}, product, product], items: [] }).products.length, 1); assert.throws(() => normalizeMenu({ flowers: [{ ...product, storeCode: "SCC01" }], items: [] }), /SOURCE_MISMATCH/); });
test("images cannot load arbitrary or unsafe URLs", () => { assert.equal(safeImage("javascript:alert(1)"), ""); assert.equal(safeImage("https://evil.example/product.png"), ""); assert.equal(safeImage(product.image), product.image); });
test("THC disposables remain separate from nicotine vapes", () => { assert.equal(categorySlug("VAPE DISPOSABLES"), "vape-disposables"); assert.equal(categorySlug("VAPE PENS"), "nicotine-vapes"); assert.equal(categorySlug("PREROLLS"), "pre-rolls"); });
test("invalid prices never become fabricated product prices", () => { const output = normalizeMenu({ flowers: [{ ...product, price5g: { regular: -10 } }], items: [{ sku: "3", name: "Item", price: "$[object Object]" }] }); assert.equal(output.products[0].prices.length, 0); assert.equal(output.products[1].prices.length, 0); });
test("grouped SKUs and named variants remain distinct", () => { const items = [{ sku: "1, 2", name: "First variant" }, { sku: "1, 2", name: "Second variant" }, { sku: "3, 4", name: "Second variant" }]; const output = normalizeMenu({ flowers: [], items }); assert.equal(output.products.length, 3); assert.equal(new Set(output.products.map((p) => p.slug)).size, 3); });
test("valid source sales preserved and malformed dates not advertised", () => { const output = normalizeMenu({ flowers: [{ ...product, price5g: { regular: 30, sale: 25 } }], items: [], stockDate: "today" }); assert.deepEqual(output.products[0].prices[0], { label: "6g", amount: 25, regular: 30, sale: 25 }); assert.equal(output.stockDate, ""); });

test("protected top tiers display the backend price5g bucket as 6g while AA stays 5g", () => {
  for (const tier of ["EXOTIC", "PREMIUM", "AAA+"]) assert.equal(flowerWeightLabel("price5g", tier), "6g");
  assert.equal(flowerWeightLabel("price5g", "AA"), "5g");
  assert.equal(flowerWeightLabel("price5g", "BUDGET"), "5g");
  assert.equal(flowerWeightLabel("price3g", "EXOTIC"), "3g");
});

test("all source-listed flower weights retain their own regular and sale prices", () => {
  const row = { ...product, price3g: { regular: 20 }, price5g: { regular: 35, sale: 30 }, price14g: { regular: 70 }, price28g: { regular: 120, sale: 100 } };
  assert.deepEqual(flowerPrices(row), [
    { label: "3g", amount: 20, regular: 20, sale: null },
    { label: "6g", amount: 30, regular: 35, sale: 30 },
    { label: "14g", amount: 70, regular: 70, sale: null },
    { label: "28g", amount: 100, regular: 120, sale: 100 },
  ]);
  assert.deepEqual(normalizeMenu({ flowers: [row], items: [] }).products[0].prices, flowerPrices(row));
});

test("missing zero and malformed flower prices do not invent weight options", () => {
  for (const regular of [undefined, null, 0, -1, NaN, Infinity, "30"]) {
    assert.deepEqual(flowerPrices({ tier: "AA", price5g: { regular, sale: 10 } }), []);
  }
  assert.deepEqual(flowerPrices({ price3g: null, price5g: null }), []);
  for (const sale of [undefined, null, 0, -1, NaN, Infinity, 30, 40, "20"]) {
    assert.deepEqual(flowerPrices({ tier: "AA", price5g: { regular: 30, sale } }), [{ label: "5g", amount: 30, regular: 30, sale: null }]);
  }
});

test("weight mappings are unique and repeated source rows cannot duplicate price rows", () => {
  assert.equal(new Set(FLOWER_PRICE_FIELDS).size, FLOWER_PRICE_FIELDS.length);
  assert.equal(new Set(FLOWER_PRICE_FIELDS.map((field) => field.slice(5))).size, FLOWER_PRICE_FIELDS.length);
  const row = { ...product, price05g: { regular: 30 }, price28g: { regular: 100 } };
  const output = normalizeMenu({ flowers: [row, row], items: [] });
  assert.equal(output.products.length, 1);
  assert.deepEqual(output.products[0].prices.map((p) => p.label), ["6g", "28g"]);
});
