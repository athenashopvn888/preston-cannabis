import type { Metadata } from "next";
export const SITE = {
  name: "Preston Cannabis", address: "268 Preston St", city: "Ottawa", province: "ON", postalCode: "K1R 7R6",
  fullAddress: "268 Preston St, Ottawa, ON K1R 7R6", phone: "343-804-9020", tel: "tel:+13438049020",
  domain: "https://prestoncannabis.com", maps: "https://www.google.com/maps/search/?api=1&query=268%20Preston%20St%2C%20Ottawa%2C%20ON%20K1R%207R6",
  pod: "POD 9", storeCode: "TPC01",
} as const;
// TPC01-INDEX-GOLIVE: indexability enabled for canonical public routes after NAP/robots release.
export const INDEXABLE = true;
export { SHOW_CIGARETTES, showCigarettes } from "./show-cigarettes.mjs";
export const canonical = (path = "/") => `${SITE.domain}${path === "/" ? "" : path.replace(/\/$/, "")}`;
export function meta(title: string, description: string, path = "/"): Metadata {
  return { title, description, alternates: { canonical: canonical(path) }, robots: { index: INDEXABLE, follow: INDEXABLE },
    openGraph: { title, description, url: canonical(path), siteName: SITE.name, locale: "en_CA", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Preston Cannabis — Ottawa" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}
export const CATEGORIES = [
  { slug: "flower", name: "Flower", mark: "✳", text: "Every strain, sorted by tier from Exotic to Budget." },
  { slug: "pre-rolls", name: "Pre-rolls", mark: "╱", text: "Single pre-rolls and multi-packs." },
  { slug: "vape-disposables", name: "THC vapes", mark: "◒", text: "THC carts and disposables." },
  { slug: "edibles", name: "Edibles", mark: "◈", text: "Gummies, chocolates and other edibles." },
  { slug: "concentrates", name: "Concentrates", mark: "✦", text: "Shatter, hash, rosin and other concentrates." },
  { slug: "accessories", name: "Accessories", mark: "◎", text: "Papers, cones, grinders and lighters." },
  { slug: "nicotine-vapes", name: "Nicotine vapes", mark: "▯", text: "A separate collection for nicotine products." },
  { slug: "cigarettes", name: "Cigarettes", mark: "≋", text: "Native and Canadian cigarettes in packs and cartons." },
] as const;
export { TIERS } from "./tiers.mjs";
export const FAQS = [
  ["Where is Preston Cannabis?", "Preston Cannabis is at 268 Preston St, Ottawa, ON K1R 7R6, in Little Italy between Carling and Somerset West."],
  ["Is this Preston's live inventory?", "Yes. The menu lists Preston Cannabis products, weights, and prices for this store."],
  ["How can I contact the store?", "Call 343-804-9020 for questions about Preston Cannabis."],
  ["Where can I find store hours?", "Preston Cannabis is open 24 hours a day, 7 days a week. Call 343-804-9020 with any questions."],
];
