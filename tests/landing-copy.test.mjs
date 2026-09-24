import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { LANDING_ROUTES, GEOGRAPHIC_ROUTES } from "../lib/landing-contract.mjs";
import { stableRoutes, buildSitemap } from "../lib/route-registry.mjs";
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const copy = JSON.parse(read("lib/landing-copy.json"));
test("runtime copy exactly matches both approved PINKY packets and all eleven routes", () => {
  assert.deepEqual(copy, [1, 2].flatMap((n) => JSON.parse(read(`docs/pinky-preston-copy-batch-${n}.json`))));
  assert.deepEqual(copy.map((p) => p.path).sort(), [...LANDING_ROUTES].sort());
  for (const field of ["path", "title", "metaDescription", "h1"]) assert.equal(new Set(copy.map((p) => p[field])).size, 11, field);
  assert.doesNotMatch(JSON.stringify(copy), /286 Preston|251 Dalhousie|Spirit Corner/);
});
test("all approved links and routes resolve to known owners; no duplicate old owner", () => {
  for (const page of copy) {
    assert.ok(existsSync(new URL(`../app${page.path}/page.tsx`, import.meta.url)), page.path);
    assert.equal(page.useSpatialCoverage, GEOGRAPHIC_ROUTES.includes(page.path), page.path);
    for (const link of [page.cta, ...page.internalLinks]) assert.ok(stableRoutes.includes(link.href), `${page.path} -> ${link.href}`);
  }
  assert.ok(!stableRoutes.includes("/weed-dispensary-ottawa"));
  assert.match(read("next.config.ts"), /source: "\/weed-dispensary-ottawa", destination: "\/weed-dispensary-near-me", permanent: true/);
});
test("index go-live enables sitemap and removes sitewide noindex while keeping CHC01 notice", () => {
  assert.ok(buildSitemap({ indexable: true, domain: "https://prestoncannabis.com", eligibleRoutes: LANDING_ROUTES }).length > 0);
  assert.match(read("lib/site.ts"), /INDEXABLE = true/);
  assert.doesNotMatch(read("next.config.ts"), /noindex, nofollow, noarchive/);
  assert.match(read("lib/site.ts"), /All current catalog entries are temporary CHC01 preview content/);
  assert.doesNotMatch(read("lib/landing-schema.mjs"), /areaServed|serviceArea|geoMidpoint|latitude|longitude|openingHours|hasOfferCatalog|makesOffer/);
});
test("resource directory and footer make all approved pages discoverable", () => {
  assert.match(read("components/LandingPage.tsx"), /approvedCopy\.filter/);
  assert.match(read("components/Chrome.tsx"), /href="\/resources"/);
  for (const path of ["components/Chrome.tsx", "app/page.tsx", "app/[tier]/page.tsx", "app/menu/[category]/page.tsx"]) assert.doesNotMatch(read(path), /href="\/weed-dispensary-ottawa"/);
});
