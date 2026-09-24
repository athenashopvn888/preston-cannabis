import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMenu, safeImage, categorySlug, flowerPrices, flowerWeightLabel, FLOWER_PRICE_FIELDS, resolveMenuStoreCode, APPROVED_STORE_CODE } from "../lib/menu-core.mjs";
const product = { sku: "42", name: "Test flower", tier: "AAA+", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/test.webp", price5g: { regular: 30 } };
test("validates TPC01 store scope and distinguishes request-only identity", () => { const output = normalizeMenu({ flowers: [product], items: [] }); assert.equal(APPROVED_STORE_CODE, "TPC01"); assert.equal(output.sourceIdentity, "request-scoped-only"); assert.equal(output.products[0].slug, "test-flower-flower-42"); assert.equal(output.products[0].prices[0].label, "5g"); assert.equal(output.products[0].prices[0].amount, 30); assert.equal(normalizeMenu({ storeCode: "TPC01", flowers: [product], items: [] }).sourceIdentity, "response-validated"); assert.throws(() => normalizeMenu({ storeCode: "FYC01", flowers: [], items: [] }), /SOURCE_MISMATCH/); assert.throws(() => normalizeMenu({ storeCode: "CHC01", flowers: [], items: [] }), /SOURCE_MISMATCH/); assert.throws(() => normalizeMenu({ flowers: [], items: [] }, "PRESTON"), /SOURCE_NOT_APPROVED/); assert.throws(() => normalizeMenu({ flowers: [], items: [] }, "CHC01"), /SOURCE_NOT_APPROVED/); });
test("malformed and mismatched products are rejected; duplicates removed", () => { assert.throws(() => normalizeMenu({ flowers: [] }), /INVALID_MENU/); assert.equal(normalizeMenu({ flowers: [null, {}, product, product], items: [] }).products.length, 1); assert.throws(() => normalizeMenu({ flowers: [{ ...product, storeCode: "SCC01" }], items: [] }), /SOURCE_MISMATCH/); });
test("images cannot load arbitrary or unsafe URLs", () => { assert.equal(safeImage("javascript:alert(1)"), ""); assert.equal(safeImage("https://evil.example/product.png"), ""); assert.equal(safeImage(product.image), product.image); });
test("THC disposables remain separate from nicotine vapes", () => { assert.equal(categorySlug("VAPE DISPOSABLES"), "vape-disposables"); assert.equal(categorySlug("VAPE PENS"), "nicotine-vapes"); assert.equal(categorySlug("PREROLLS"), "pre-rolls"); });
test("invalid prices never become fabricated product prices", () => { const output = normalizeMenu({ flowers: [{ ...product, price5g: { regular: -10 } }], items: [{ sku: "3", name: "Item", price: "$[object Object]" }] }); assert.equal(output.products[0].prices.length, 0); assert.equal(output.products[1].prices.length, 0); });
test("grouped SKUs and named variants remain distinct", () => { const items = [{ sku: "1, 2", name: "First variant" }, { sku: "1, 2", name: "Second variant" }, { sku: "3, 4", name: "Second variant" }]; const output = normalizeMenu({ flowers: [], items }); assert.equal(output.products.length, 3); assert.equal(new Set(output.products.map((p) => p.slug)).size, 3); });
test("valid source sales preserved and malformed dates not advertised", () => { const output = normalizeMenu({ flowers: [{ ...product, price5g: { regular: 30, sale: 25 } }], items: [], stockDate: "today" }); assert.deepEqual(output.products[0].prices[0], { label: "5g", amount: 25, regular: 30, sale: 25 }); assert.equal(output.stockDate, ""); });

test("every tier keeps the source price5g bucket as 5g", () => {
  for (const tier of ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"]) assert.equal(flowerWeightLabel("price5g", tier), "5g");
  assert.equal(flowerWeightLabel("price3g"), "3g");
  assert.equal(flowerWeightLabel("price14g"), "14g");
  assert.equal(flowerWeightLabel("price28g"), "28g");
  assert.equal(flowerWeightLabel("price6g"), "");
  assert.equal(flowerWeightLabel("price7g"), "");
});

test("a leftover CHC01 env still resolves to the TPC01 feed", () => {
  assert.equal(resolveMenuStoreCode(undefined), "TPC01");
  assert.equal(resolveMenuStoreCode(""), "TPC01");
  assert.equal(resolveMenuStoreCode("CHC01"), "TPC01");
  assert.equal(resolveMenuStoreCode(" chc01 "), "");
  assert.equal(resolveMenuStoreCode(" TPC01 "), "TPC01");
  assert.equal(resolveMenuStoreCode("SCC01"), "");
});

test("all source-listed flower weights retain their own regular and sale prices", () => {
  const row = { ...product, price3g: { regular: 20 }, price5g: { regular: 35, sale: 30 }, price14g: { regular: 70 }, price28g: { regular: 120, sale: 100 } };
  assert.deepEqual(flowerPrices(row), [
    { label: "3g", amount: 20, regular: 20, sale: null },
    { label: "5g", amount: 30, regular: 35, sale: 30 },
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
  assert.deepEqual(output.products[0].prices.map((p) => p.label), ["5g", "28g"]);
  assert.equal(JSON.stringify(output).includes("6g") || JSON.stringify(output).includes("7g"), false);
});

test("missing weights are omitted and never invented", () => {
  const half = { sku: "9", name: "Half only", tier: "EXOTIC", price14g: { regular: 80 }, price28g: { regular: 0 } };
  assert.deepEqual(flowerPrices(half).map((p) => p.label), ["14g"]);
  assert.deepEqual(flowerPrices({ tier: "PREMIUM", price3g: { regular: 20 } }).map((p) => p.label), ["3g"]);
  const labels = new Set(FLOWER_PRICE_FIELDS.map((field) => flowerWeightLabel(field)));
  assert.deepEqual([...labels], ["3g", "5g", "14g", "28g"]);
});
