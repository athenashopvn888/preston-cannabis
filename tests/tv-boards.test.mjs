import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { HOURS_STATUS } from "../lib/content-hub.mjs";
import { stableRoutes } from "../lib/route-registry.mjs";

const require = createRequire(import.meta.url);
const { buildTvStore, isOpen24Hours7Days } = require("../app/lib/tvStoreFacts.js");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("in-store boards stay out of the sitemap and the public site has no age gate", () => {
  assert.equal(stableRoutes.includes("/tv"), false);
  assert.equal(stableRoutes.includes("/tv2"), false);
  for (const path of ["app/tv/layout.tsx", "app/tv2/layout.tsx"]) {
    assert.match(read(path), /index:\s*false/);
    assert.match(read(path), /follow:\s*false/);
  }
  assert.match(read("components/SiteFrame.tsx"), /path === "\/tv"/);
  assert.doesNotMatch(read("components/SiteFrame.tsx"), /AgeGate/);
  assert.match(read("app/layout.tsx"), /SiteFrame/);
  assert.doesNotMatch(read("app/layout.tsx"), /<AgeGate/);
});

test("header uses this store's address and hours and hides the 24-hour alert", () => {
  const store = buildTvStore({
    name: "Preston Cannabis",
    streetAddress: "268 Preston St",
    city: "Ottawa",
    weekly: HOURS_STATUS.weekly,
    summary: HOURS_STATUS.summary,
  });
  assert.equal(store.name, "Preston Cannabis");
  assert.equal(store.shortAddress, "268 Preston St, Ottawa");
  assert.equal(store.hours, "Thu–Sat 12 PM–4 AM · Sun 12 PM–2 AM · Mon–Wed 12 PM–1 AM");
  assert.equal(store.open24Hours7Days, false);
  assert.equal(HOURS_STATUS.is24h, false);
  assert.equal(isOpen24Hours7Days([
    { dayOfWeek: "Monday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Tuesday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Wednesday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Thursday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Friday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Saturday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Sunday", opens: "00:00", closes: "23:59" },
  ]), true);
  assert.match(read("app/lib/tvPolicy.ts"), /ALL SALES ARE FINAL - NO EXCHANGE OR REFUNDS/);
  assert.match(read("app/lib/tvHiring.ts"), /prestoncannabis\.com/);
  assert.match(read("app/lib/tvHiring.ts"), /BUDTENDERS \/ MANAGERS/);
  assert.doesNotMatch(read("app/tv/page.tsx") + read("app/tv2/page.tsx"), /Open 24 Hours|Spirit Corner|251 Dalhousie/);
});
