import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async headers() { return [{ source: "/:path*", headers: [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" }
  ] }]; },
  async redirects() { return [
    { source: "/weed-dispensary-ottawa", destination: "/weed-dispensary-near-me", permanent: true },
    { source: "/flowers", destination: "/menu/flower", permanent: true },
    { source: "/aaa-plus", destination: "/aaa", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/items", destination: "/menu", permanent: true },
    { source: "/items/vapes", destination: "/menu/nicotine-vapes", permanent: true },
    { source: "/menu/vapes", destination: "/menu/nicotine-vapes", permanent: true },
    { source: "/items/:category", destination: "/menu/:category", permanent: true }
  ]; }
};
export default config;
