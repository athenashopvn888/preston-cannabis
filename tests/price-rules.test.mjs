import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("tier ranges use normalized sale price per gram and source THC only", () => {
  const source = read("lib/tierPriceRanges.ts");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiled = { exports: {} };
  new Function("module", "exports", output)(compiled, compiled.exports);
  const ranges = compiled.exports;
  const value = ranges.storeTierRange([{ category: "flower", tier: "AAA+", thc: "30-32%", prices: [{ label: "3g", amount: 15 }, { label: "5g", amount: 25 }] }], "AAA+");
  assert.equal(ranges.tierRangeText(value), "$8.33 a gram list, as low as $4.17 a gram after promos · THC about 30 to 32%");
  assert.equal(ranges.tierRangeText(ranges.storeTierRange([], "AAA+")), null);
});

test("coming-soon price rules and FAQ schema source stay wired without delivery surfaces", () => {
  const home = read("components/TierCollections.tsx");
  const tier = read("app/[tier]/page.tsx");
  const menu = read("app/menu/page.tsx");
  const landing = read("components/LandingPage.tsx");
  const faq = read("lib/landing-copy.json");
  for (const source of [home, tier, menu]) {
    assert.match(source, /IN-STORE PRICES ONLY\./);
    assert.match(source, /Delivery coming soon\./);
    assert.doesNotMatch(source, /DELIVERY PRICES ONLY/);
  }
  assert.match(read("app/page.tsx"), /export const dynamic = "force-dynamic"/);
  assert.match(landing, /"delivery-price-rule"/);
  assert.match(landing, /open=\{isPriceRule\}/);
  assert.match(faq, /Delivery is coming soon\. In-store prices are for purchases made in the store, and delivery orders will have their own prices\./);
  const delivery = read("app/delivery/page.tsx");
  assert.match(delivery, /Delivery coming soon\. Shop in store at 268 Preston St, Ottawa/);
  assert.doesNotMatch(delivery, /Weed Delivery|same.day|DeliveryMenu|DeliveryCatalog/i);
  assert.doesNotMatch(read("app/layout.tsx"), /DeliveryChat/);
});
