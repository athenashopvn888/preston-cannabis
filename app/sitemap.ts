import type { MetadataRoute } from "next";
import { buildSitemap, stableRoutes } from "@/lib/route-registry.mjs";
import { INDEXABLE, SITE } from "@/lib/site";
import { GUIDE_REGISTRY } from "@/lib/guideRegistry";
import { isHiddenCigaretteGuide, showCigarettes } from "@/lib/show-cigarettes.mjs";
export default function sitemap(): MetadataRoute.Sitemap {
  const eligibleRoutes = stableRoutes.filter((path) => showCigarettes() || (path !== "/native-cigarettes" && path !== "/menu/cigarettes"));
  const rows = buildSitemap({
    indexable: INDEXABLE,
    domain: SITE.domain,
    eligibleRoutes: [...eligibleRoutes],
    modifiedByRoute: {},
  });
  const guides = GUIDE_REGISTRY.map((guide) => isHiddenCigaretteGuide(guide.slug) ? null : ({ url: `${SITE.domain}/guides/${guide.slug}` })).filter((guide): guide is { url: string } => guide != null);
  return [...rows, { url: `${SITE.domain}/delivery` }, { url: `${SITE.domain}/guides` }, ...guides] as MetadataRoute.Sitemap;
}
