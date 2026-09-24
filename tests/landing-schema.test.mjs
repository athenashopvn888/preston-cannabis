import test from "node:test";
import assert from "node:assert/strict";
import { businessGraph, landingGraph, jsonLd } from "../lib/landing-schema.mjs";
import { LANDING_ROUTES, GEOGRAPHIC_ROUTES } from "../lib/landing-contract.mjs";
const site = { domain: "https://prestoncannabis.com", name: "Preston Cannabis", address: "268 Preston St", city: "Ottawa", province: "ON", postalCode: "K1R 7R6", phone: "343-804-9020" };
test("one business and website identity, no invented service or inventory facts", () => {
  const graph = businessGraph(site);
  assert.equal(graph["@graph"].filter((n) => n["@type"] === "LocalBusiness").length, 1);
  assert.equal(graph["@graph"][0]["@id"], `${site.domain}/#business`);
  assert.equal(graph["@graph"][0].address.streetAddress, site.address);
  assert.doesNotMatch(JSON.stringify(graph), /areaServed|serviceArea|geoMidpoint|latitude|longitude|openingHours|Offer|Product/);
});
test("50000 metre address-based coverage appears only on approved geographic pages", () => {
  for (const path of LANDING_ROUTES) {
    const node = landingGraph(site, { path, title: "Test", description: "Test" })["@graph"][0];
    assert.equal(!!node.spatialCoverage, GEOGRAPHIC_ROUTES.includes(path), path);
    if (node.spatialCoverage) {
      assert.equal(node.spatialCoverage["@type"], "Place");
      assert.equal(node.spatialCoverage.geo["@type"], "GeoCircle");
      assert.equal(node.spatialCoverage.geo.geoRadius, 50000);
      assert.equal(node.spatialCoverage.geo.address.streetAddress, site.address);
    }
    assert.equal(node.about["@id"], `${site.domain}/#business`);
    assert.doesNotMatch(JSON.stringify(node), /areaServed|serviceArea|geoMidpoint|latitude|longitude|openingHours|Offer|Product/);
  }
});
test("FAQ schema derives exactly from supplied visible copy and JSON-LD escapes markup", () => {
  const faqs = [{ question: "Where?", answer: "268 Preston St" }];
  const node = landingGraph(site, { path: "/faq", title: "FAQ", description: "Details", faqs })["@graph"][0];
  assert.deepEqual(node.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), faqs.map((q) => [q.question, q.answer]));
  assert.equal(landingGraph(site, { path: "/resources", title: "Resources", description: "Guides" })["@graph"][0]["@type"], "CollectionPage");
  assert.ok(!jsonLd({ text: "</script><script>" }).includes("<"));
});
