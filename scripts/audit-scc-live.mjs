// Read-only evidence for current SCC live architecture; no source writes.
const base = "https://spiritcornercannabis.com";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(base, "") || "/");
const stable = sitemapRoutes.filter((p) => !/^\/(flower|item)\//.test(p));
const routes = [...new Set([...stable, "/contact-spirit-corner-cannabis", "/blog", "/blog/architecture-audit"])];
console.log(JSON.stringify({ kind: "inventory", sitemapRoutes: stable, flowerDetailCount: sitemapRoutes.filter((p) => p.startsWith("/flower/")).length, itemDetailCount: sitemapRoutes.filter((p) => p.startsWith("/item/")).length }));
const clean = (s) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
for (let i = 0; i < routes.length; i += 4) await Promise.all(routes.slice(i, i + 4).map(async (route) => {
  try {
    const response = await fetch(base + route, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    const visible = html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<style\b[\s\S]*?<\/style>/g, "");
    const start = visible.indexOf("<h1");
    const body = visible.slice(start < 0 ? 0 : start).split("<footer")[0];
    const links = [...new Set([...body.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((p) => !p.startsWith("/_next") && !/^\/(flower|item)\//.test(p)))];
    console.log(JSON.stringify({ kind: "page", route, status: response.status, redirect: response.headers.get("location"), title: html.match(/<title>(.*?)<\/title>/)?.[1], canonical: html.match(/rel="canonical" href="([^"]+)"/)?.[1], headings: [...body.matchAll(/<h([123])[^>]*>([\s\S]*?)<\/h[123]>/g)].map((m) => ({ level: Number(m[1]), text: clean(m[2]) })), faqs: [...body.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => clean(m[1])), approxBodyWords: clean(body).split(/\s+/).length, links }));
  } catch (error) { console.log(JSON.stringify({ kind: "page", route, error: error.cause?.code || error.name })); }
}));
