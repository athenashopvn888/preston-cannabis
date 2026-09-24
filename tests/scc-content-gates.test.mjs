import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_HUB_CARDS, HOURS_STATUS, NATIVE_CIG_COPY, NICOTINE_VAPE_COPY, VISIT_COPY, HOURS_COPY } from "../lib/content-hub.mjs";
import { buildSitemap, stableRoutes } from "../lib/route-registry.mjs";
import { tierSeoTitle } from "../lib/tiers.mjs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const homeTitle = read("lib/editorial.ts").match(/title:\s*"([^"]+)"/)[1];

test("G3 homepage hubs include visit/cig/vape/geo and omit false 24h", () => {
  assert.equal(HOURS_STATUS.is24h, false);
  const hrefs = HOME_HUB_CARDS.map((c) => c.href);
  for (const required of ["/visit", "/native-cigarettes", "/nicotine-vape", "/weed-dispensary-near-me", "/delivery"]) {
    assert.ok(hrefs.includes(required), required);
  }
  assert.ok(!hrefs.some((h) => /24|hour/.test(h)));
  assert.doesNotMatch(read("app/page.tsx"), /\bOpen 24\b|open 24 hours|24-hour dispensary/i);
  assert.doesNotMatch(HOURS_COPY.intro + HOURS_COPY.sections.map((s) => s.body).join(" "), /we are open 24/i);
});

test("G1/G5 brand-once corridor titles for pillars and home", () => {
  for (const title of [homeTitle, VISIT_COPY.title, HOURS_COPY.title, NATIVE_CIG_COPY.title, NICOTINE_VAPE_COPY.title, tierSeoTitle("AAA+ Weed")]) {
    assert.equal((title.match(/Preston Cannabis/g) || []).length, 1, title);
  }
  assert.match(NATIVE_CIG_COPY.h1, /Preston|Little Italy|Somerset/i);
  assert.match(NICOTINE_VAPE_COPY.h1, /Preston|Somerset|Little Italy/i);
  assert.ok(NATIVE_CIG_COPY.h1.length > "Native cigarettes".length);
});

test("G8 visit/hours routes registered and sitemap eligible", () => {
  for (const path of ["/visit", "/hours", "/native-cigarettes", "/nicotine-vape"]) {
    assert.ok(stableRoutes.includes(path), path);
  }
  const rows = buildSitemap({ indexable: true, domain: "https://prestoncannabis.com", eligibleRoutes: stableRoutes });
  assert.ok(rows.some((r) => r.url.endsWith("/visit")));
  assert.ok(rows.some((r) => r.url.endsWith("/native-cigarettes")));
});

test("G10 native wording stays merchandise-category only", () => {
  const blob = JSON.stringify(NATIVE_CIG_COPY);
  assert.match(blob, /merchandise-category|merchandise category/i);
  assert.doesNotMatch(blob, /\bFirst Nation\b|\breserve land\b|\bhealing\b|\bIndigenous governance\b/i); assert.match(blob, /merchandise-category|merchandise category/i);
});

test("G7 weight hard-fail tokens absent from hub copy", () => {
  const blob = [VISIT_COPY, HOURS_COPY, NATIVE_CIG_COPY, NICOTINE_VAPE_COPY].map((x) => JSON.stringify(x)).join("\n") + read("lib/editorial.ts");
  assert.doesNotMatch(blob, /3\.5\s*g|7\s*g/i);
});
