import test from "node:test";
import assert from "node:assert/strict";
import { businessGraph, landingGraph, jsonLd, tierCollectionGraph } from "../lib/landing-schema.mjs";
import { LANDING_ROUTES, GEOGRAPHIC_ROUTES } from "../lib/landing-contract.mjs";
const site = { domain: "https://prestoncannabis.com", name: "Preston Cannabis", address: "268 Preston St", city: "Ottawa", province: "ON", postalCode: "K1R 7R5", phone: "343-804-9020", maps: "https://maps.example/preston" };
test("one store and website identity, no invented service or inventory facts", () => {
  const graph = businessGraph(site);
  assert.equal(graph["@graph"].filter((n) => n["@type"] === "Store").length, 1);
  assert.equal(graph["@graph"][0]["@id"], `${site.domain}/#business`);
  assert.equal(graph["@graph"][0].address.streetAddress, site.address);
  assert.equal(graph["@graph"][0].address.postalCode, "K1R 7R5");
  assert.doesNotMatch(JSON.stringify(graph), /areaServed|serviceArea|geoMidpoint|latitude|longitude|openingHours|Offer|Product/);
});
test("homepage FAQPage attaches without inventing 24h hours", () => {
  const graph = businessGraph(site, [{ question: "Hours?", answer: "Call ahead." }]);
  assert.ok(graph["@graph"].some((n) => n["@type"] === "FAQPage"));
  assert.doesNotMatch(JSON.stringify(graph), /openingHours|24/);
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
test("tier CollectionPage + ItemList follows After Dark pattern", () => {
  const graph = tierCollectionGraph(site, {
    path: "/exotic",
    name: "Exotic Weed on Preston St in Little Italy",
    description: "Exotic collection",
    products: [{ name: "Demo Flower", slug: "demo-flower" }],
    faqs: [{ question: "Q?", answer: "A." }],
  });
  assert.ok(graph["@graph"].some((n) => n["@type"] === "CollectionPage"));
  const list = graph["@graph"].find((n) => n["@type"] === "ItemList");
  assert.equal(list.numberOfItems, 1);
  assert.equal(list.itemListElement[0].url, "https://prestoncannabis.com/products/demo-flower");
  assert.ok(graph["@graph"].some((n) => n["@type"] === "FAQPage"));
});
