import { LANDING_ROUTES } from "./landing-contract.mjs";
export const stableRoutes = ["/", "/menu", ...LANDING_ROUTES, "/exotic", "/premium", "/aaa", "/aa", "/budget", ...["flower", "pre-rolls", "vape-disposables", "edibles", "concentrates", "accessories", "nicotine-vapes", "cigarettes"].map((slug) => `/menu/${slug}`)];
// Caller must pass verified eligible routes at launch. Source-stock products and
// tobacco/nicotine collections cannot become eligible just by flipping this flag.
/**
 * @param {{ indexable?: boolean, domain: string, eligibleRoutes?: string[], modifiedByRoute?: Record<string, string> }} opts
 * @returns {{ url: string, lastModified?: string }[]}
 */
export function buildSitemap({ indexable = false, domain, eligibleRoutes = /** @type {string[]} */ ([]), modifiedByRoute = {} }) {
  if (!indexable) return [];
  return [...new Set(eligibleRoutes)].filter((path) => stableRoutes.includes(path)).map((path) => {
    const entry = { url: `${domain}${path === "/" ? "" : path}` };
    if (modifiedByRoute[path] && Number.isFinite(Date.parse(modifiedByRoute[path]))) entry.lastModified = modifiedByRoute[path];
    return entry;
  });
}
