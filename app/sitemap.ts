import type { MetadataRoute } from "next";
import { buildSitemap, stableRoutes } from "@/lib/route-registry.mjs";
import { INDEXABLE, SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const rows = buildSitemap({
    indexable: INDEXABLE,
    domain: SITE.domain,
    eligibleRoutes: [...stableRoutes],
    modifiedByRoute: {},
  });
  return rows as MetadataRoute.Sitemap;
}