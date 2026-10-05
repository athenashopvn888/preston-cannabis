import type { MetadataRoute } from "next";
import { DELIVERY_GUIDE_REGISTRY } from "./lib/deliveryGuideRegistry";
import { buildSitemap, stableRoutes } from "@/lib/route-registry.mjs";
import { INDEXABLE, SITE } from "@/lib/site";
import { GUIDE_REGISTRY } from "@/lib/guideRegistry";
export default function sitemap(): MetadataRoute.Sitemap {
  const rows = buildSitemap({
    indexable: INDEXABLE,
    domain: SITE.domain,
    eligibleRoutes: [...stableRoutes],
    modifiedByRoute: {},
  });
  const guides = [...GUIDE_REGISTRY, ...DELIVERY_GUIDE_REGISTRY].map((guide) => ({ url: `${SITE.domain}/guides/${guide.slug}` }));
  return [...rows, { url: `${SITE.domain}/guides` }, ...guides] as MetadataRoute.Sitemap;
}
