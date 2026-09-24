import type { MetadataRoute } from "next";
import { buildSitemap } from "@/lib/route-registry.mjs";
import { INDEXABLE, SITE } from "@/lib/site";
// Empty during onboarding. Do not advertise unverified Preston/CHC product URLs.
export default function sitemap(): MetadataRoute.Sitemap { return buildSitemap({ indexable: INDEXABLE, domain: SITE.domain, eligibleRoutes: [], modifiedByRoute: {} }); }
