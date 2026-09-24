import { GEOGRAPHIC_ROUTES, GEO_RADIUS_METRES } from "./landing-contract.mjs";
import { CORRIDOR_NEIGHBOURHOODS, HOURS_STATUS } from "./content-hub.mjs";

export const jsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const url = (site, path) => `${site.domain}${path === "/" ? "" : path}`;
export function postalAddress(site) {
  return { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressRegion: site.province, postalCode: site.postalCode, addressCountry: "CA" };
}
/**
 * @param {any} site
 * @param {{ question: string, answer: string }[]} [faqs]
 */
export function businessGraph(site, faqs = /** @type {{question:string,answer:string}[]} */ ([])) {
  const store = {
    "@type": "Store",
    "@id": `${site.domain}/#business`,
    additionalType: "https://schema.org/Store",
    name: site.name,
    url: site.domain,
    telephone: site.phone,
    address: postalAddress(site),
    hasMap: site.maps,
    description: `${site.name} is a cannabis storefront on Preston Street in Little Italy, Ottawa, serving shoppers from ${CORRIDOR_NEIGHBOURHOODS.join(", ")}. Adults 19+.`,
  };
  // Do not invent openingHours when the storefront is not certified 24h.
  if (HOURS_STATUS.is24h) {
    store.openingHours = "Mo-Su 00:00-23:59";
  }
  const graph = [
    store,
    { "@type": "WebSite", "@id": `${site.domain}/#website`, name: site.name, url: site.domain, publisher: { "@id": `${site.domain}/#business` } },
  ];
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${site.domain}/#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
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
/**
 * @param {any} site
 * @param {{ path: string, name: string, description: string, products?: { name: string, slug: string }[], faqs?: { question: string, answer: string }[] }} opts
 */
export function tierCollectionGraph(site, { path, name, description, products = /** @type {{name:string,slug:string}[]} */ ([]), faqs = /** @type {{question:string,answer:string}[]} */ ([]) }) {
  const pageUrl = url(site, path);
  const itemListId = `${pageUrl}#itemlist`;
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      isPartOf: { "@id": `${site.domain}/#website` },
      about: { "@id": `${site.domain}/#business` },
      mainEntity: { "@id": itemListId },
    },
    {
      "@type": "ItemList",
      "@id": itemListId,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${site.domain}/products/${product.slug}`,
      })),
    },
  ];
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
/**
 * @param {any} site
 * @param {{ path: string, title: string, description: string, faqs?: { question: string, answer: string }[], type?: string }} opts
 */
export function simplePageGraph(site, { path, title, description, faqs = /** @type {{question:string,answer:string}[]} */ ([]), type = "WebPage" }) {
  const pageUrl = url(site, path);
  const node = {
    "@type": faqs.length ? [type, "FAQPage"] : type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": `${site.domain}/#website` },
    about: { "@id": `${site.domain}/#business` },
    ...(faqs.length ? { mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } : {}),
  };
  return { "@context": "https://schema.org", "@graph": [node] };
}
