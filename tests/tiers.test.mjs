import test from "node:test";
import assert from "node:assert/strict";
import { TIERS, matchesInventoryTier, tierDisplayName, tierSeoTitle, tierH1 } from "../lib/tiers.mjs";
test("all five public names include Weed and canonical slugs stay unchanged", () => {
  assert.deepEqual(TIERS.map((t) => t.name), ["Exotic Weed", "Premium Weed", "AAA+ Weed", "AA Weed", "Budget Weed"]);
  assert.deepEqual(TIERS.map((t) => t.slug), ["exotic", "premium", "aaa", "aa", "budget"]);
});
test("renaming public tiers preserves all raw inventory filters", () => {
  for (const tier of TIERS) {
    assert.equal(matchesInventoryTier(tier.inventoryTier, tier.inventoryTier), true);
    assert.equal(matchesInventoryTier(tier.inventoryTier.toLowerCase(), tier.inventoryTier), true);
    assert.equal(tierDisplayName(tier.inventoryTier), tier.name);
    assert.equal(matchesInventoryTier(tier.inventoryTier, tier.name), false);
  }
});
test("unknown source tier is not silently assigned a known grade", () => {
  assert.equal(tierDisplayName("UNVERIFIED"), "UNVERIFIED");
  assert.equal(matchesInventoryTier("UNVERIFIED", "EXOTIC"), false);
});
test("tier SEO titles are corridor-localized with a single brand suffix", () => {
  for (const tier of TIERS) {
    const title = tierSeoTitle(tier.name);
    const h1 = tierH1(tier.name);
    assert.match(title, new RegExp(`^${tier.name.replace("+", "\\+")} on .+ \\| Preston Cannabis$`));
    assert.equal((title.match(/Preston Cannabis/g) || []).length, 1);
    assert.ok(!title.includes("Preston Cannabis Ottawa"));
    assert.ok(h1.includes(tier.corridor.split(" ")[0]) || h1.toLowerCase().includes("preston") || h1.toLowerCase().includes("somerset") || h1.toLowerCase().includes("centretown"));
    assert.ok(!/^\s*(Nicotine Vape|Native Cigarettes)\s*$/i.test(h1));
  }
});
