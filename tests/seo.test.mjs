import test from "node:test";
import assert from "node:assert/strict";
import { buildSitemap, stableRoutes } from "../lib/route-registry.mjs";
test("preview sitemap fails closed even with eligible URLs", () => { assert.deepEqual(buildSitemap({ indexable: false, domain: "https://prestoncannabis.com", eligibleRoutes: stableRoutes }), []); });
test("future sitemap uses approved canonical routes and genuine dates only", () => { const rows = buildSitemap({ indexable: true, domain: "https://prestoncannabis.com", eligibleRoutes: ["/", "/menu", "/menu", "/fake"], modifiedByRoute: { "/menu": "2026-09-05", "/": "not-a-date" } }); assert.deepEqual(rows, [{ url: "https://prestoncannabis.com" }, { url: "https://prestoncannabis.com/menu", lastModified: "2026-09-05" }]); });
test("golive sitemap lists canonical stable routes on apex", () => {
  const rows = buildSitemap({ indexable: true, domain: "https://prestoncannabis.com", eligibleRoutes: stableRoutes });
  assert.ok(rows.length === new Set(stableRoutes).size);
  assert.equal(rows[0].url, "https://prestoncannabis.com");
  assert.ok(rows.every((r) => r.url.startsWith("https://prestoncannabis.com")));
});
