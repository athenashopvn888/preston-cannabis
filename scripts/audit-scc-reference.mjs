// Read-only architectural audit of the explicitly approved SCC reference.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
const root = "C:/Users/ADMIN/Desktop/Dispensary Templates/spirit-corner";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exported = (file) => { const exports = {}; vm.runInNewContext(ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports }); return exports; };
const info = exported("app/lib/seoPages.ts").SEO_PAGES.map((p) => ({ route: `/info/${p.slug}`, sections: p.sections.length, faqs: p.faqs.length, headings: p.sections.map((s) => s.heading) }));
const tiers = Object.entries(exported("app/lib/tierSeoContent.ts").TIER_SEO).map(([name, p]) => ({ name, sections: p.sections.length, faqs: p.faqs.length }));
const top = ["weed-dispensary-ottawa", "cheap-weed-ottawa", "native-cigarettes-ottawa", "nicotine-pouches-ottawa", "5-percent-vapes-ottawa", "24-hour-ottawa-dispensary", "dispensaire-cannabis-pres-de-gatineau", "cannabis-delivery-ottawa", "contact-spirit-corner-cannabis", "delivery", "contact", "faq", "menu"];
const clean = (s) => s.replace(/<[^>]*>/g, " ").replace(/\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim();
const source = top.map((slug) => {
  const file = `app/${slug}/page.tsx`; const text = read(file);
  return { route: `/${slug}`, file, headings: [...text.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/g)].map((m) => clean(m[1])), faqCount: [...text.matchAll(/<summary\b/g)].length, links: [...new Set([...text.matchAll(/href=["'](\/[^"']*)["']/g)].map((m) => m[1]))], importedDelegates: [...text.matchAll(/import.*from ["']([^"']+)["']/g)].map((m) => m[1]).filter((x) => /Content|Landing|gbp/.test(x)) };
});
console.log(JSON.stringify({ info, tiers, source }));
if (process.argv.includes("--live")) {
  const routes = [...new Set(["/", ...source.map((s) => s.route), ...info.map((p) => p.route), ...["exotic", "premium", "aaa", "aa", "budget"].map((p) => `/${p}`), ...["edibles", "vapes", "vape-disposables", "concentrates", "prerolls", "add-ons", "magic", "cigarettes"].map((p) => `/items/${p}`), "/blog", "/blog/architecture-audit", "/sitemap.xml"])];
  for (let i = 0; i < routes.length; i += 4) await Promise.all(routes.slice(i, i + 4).map(async (route) => {
    try { const response = await fetch(`https://spiritcornercannabis.com${route}`, { redirect: "manual", signal: AbortSignal.timeout(20000) }); const text = await response.text(); console.log(JSON.stringify({ route, status: response.status, redirect: response.headers.get("location"), title: text.match(/<title>(.*?)<\/title>/)?.[1], canonical: text.match(/rel="canonical" href="([^"]+)"/)?.[1], headings: [...text.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/g)].map((m) => clean(m[1])), faqCount: [...text.matchAll(/<summary\b/g)].length, links: [...new Set([...text.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]))] })); }
    catch (error) { console.log(JSON.stringify({ route, error: error.cause?.code || error.name })); }
  }));
}
