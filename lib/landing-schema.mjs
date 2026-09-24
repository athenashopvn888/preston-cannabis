import { GEOGRAPHIC_ROUTES, GEO_RADIUS_METRES } from "./landing-contract.mjs";

export const jsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const url = (site, path) => `${site.domain}${path === "/" ? "" : path}`;
export function postalAddress(site) {
  return { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressRegion: site.province, postalCode: site.postalCode, addressCountry: "CA" };
}
export function businessGraph(site) {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "LocalBusiness", "@id": `${site.domain}/#business`, name: site.name, url: site.domain, telephone: site.phone, address: postalAddress(site) },
    { "@type": "WebSite", "@id": `${site.domain}/#website`, name: site.name, url: site.domain, publisher: { "@id": `${site.domain}/#business` } },
  ] };
}
// Address-based radius describes this page's geographic subject, never a service area.
export function landingGraph(site, page) {
  const pageUrl = url(site, page.path);
  const faqs = page.faqs ?? [];
  const node = {
    "@type": faqs.length ? ["WebPage", "FAQPage"] : page.path === "/resources" ? "CollectionPage" : "WebPage",
    "@id": `${pageUrl}#webpage`, url: pageUrl, name: page.title, description: page.description,
    inLanguage: page.lang ?? "en-CA", isPartOf: { "@id": `${site.domain}/#website` }, about: { "@id": `${site.domain}/#business` },
    ...(GEOGRAPHIC_ROUTES.includes(page.path) ? { spatialCoverage: { "@type": "Place", geo: { "@type": "GeoCircle", address: postalAddress(site), geoRadius: GEO_RADIUS_METRES } } } : {}),
    ...(faqs.length ? { mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } : {}),
  };
  return { "@context": "https://schema.org", "@graph": [node] };
}
