import type { MetadataRoute } from "next";
// Crawlers must be able to fetch pages to observe their enforced noindex headers.
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] } }; }
