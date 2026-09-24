import { readFileSync } from "node:fs";
import { GEOGRAPHIC_ROUTES } from "../lib/landing-contract.mjs";
const copy = JSON.parse(readFileSync(new URL("../lib/landing-copy.json", import.meta.url), "utf8"));
const origin = process.argv[2] ?? "http://localhost:3017";
const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
let failures = 0;
for (const page of copy) {
  const response = await fetch(origin + page.path);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const text = strip(main);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const nodes = graphs.flatMap((g) => g["@graph"] ?? [g]);
  const business = nodes.filter((n) => n["@type"] === "LocalBusiness");
  const node = nodes.find((n) => n["@id"] === `https://prestoncannabis.com${page.path}#webpage`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/); 
  const checks = {
    status200: response.status === 200,
    title: decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? "") === page.title,
    singleH1: [...main.matchAll(/<h1\b/g)].length === 1,
    h1: strip(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "") === page.h1,
    canonical: canonical?.[1] === `https://prestoncannabis.com${page.path}`,
    noindex: response.headers.get("x-robots-tag") === "noindex, nofollow, noarchive" && /name="robots" content="noindex, nofollow"/.test(html),
    copy: [page.intro, ...page.sections.flatMap((s) => [s.heading, s.body]), ...page.faqs.flatMap((q) => [q.question, q.answer])].every((s) => text.includes(s)),
    nap: html.includes("268 Preston St") && !html.includes("286 Preston") && business.length === 1 && business[0].address.streetAddress === "268 Preston St",
    schema: !!node && node.about["@id"] === "https://prestoncannabis.com/#business",
    radius: GEOGRAPHIC_ROUTES.includes(page.path) ? node?.spatialCoverage?.geo?.geoRadius === 50000 : !node?.spatialCoverage,
    faqParity: JSON.stringify(node?.mainEntity?.map((q) => [q.name, q.acceptedAnswer.text]) ?? []) === JSON.stringify(page.faqs.map((q) => [q.question, q.answer])),
    noInventedSchema: !/"(?:areaServed|serviceArea|geoMidpoint|latitude|longitude|openingHours|hasOfferCatalog|makesOffer)"/.test(JSON.stringify(nodes)),
  };
  const failed = Object.entries(checks).filter(([, pass]) => !pass).map(([name]) => name);
  failures += failed.length;
  console.log(JSON.stringify({ path: page.path, checks: Object.keys(checks).length, failed, faqs: page.faqs.length, radius: node?.spatialCoverage?.geo?.geoRadius ?? null }));
}
const redirect = await fetch(origin + "/weed-dispensary-ottawa?qa=keep", { redirect: "manual" });
const location = redirect.headers.get("location");
const redirectPass = redirect.status === 308 && location?.endsWith("/weed-dispensary-near-me?qa=keep");
if (!redirectPass) failures++;
const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
if (sitemap.includes("<loc>")) failures++;
console.log(JSON.stringify({ redirect: redirect.status, location, redirectPass, emptySitemap: !sitemap.includes("<loc>"), failures }));
process.exitCode = failures ? 1 : 0;
