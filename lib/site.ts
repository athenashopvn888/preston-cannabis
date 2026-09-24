import type { Metadata } from "next";
export const SITE = {
  name: "Preston Cannabis", address: "268 Preston St", city: "Ottawa", province: "ON", postalCode: "K1R 7R5",
  fullAddress: "268 Preston St, Ottawa, ON K1R 7R5", phone: "343-804-9020", tel: "tel:+13438049020",
  domain: "https://prestoncannabis.com", maps: "https://www.google.com/maps/search/?api=1&query=268%20Preston%20St%2C%20Ottawa%2C%20ON%20K1R%207R5",
  pod: "POD 9", storeCode: null,
} as const;
// TPC01-INDEX-GOLIVE: indexability enabled for canonical public routes after NAP/robots release.
export const INDEXABLE = true;
export const PREVIEW_NOTICE = "All current catalog entries are temporary CHC01 preview content and do not represent confirmed Preston Cannabis inventory.";
export const canonical = (path = "/") => `${SITE.domain}${path === "/" ? "" : path.replace(/\/$/, "")}`;
export function meta(title: string, description: string, path = "/"): Metadata {
  return { title, description, alternates: { canonical: canonical(path) }, robots: { index: INDEXABLE, follow: INDEXABLE },
    openGraph: { title, description, url: canonical(path), siteName: SITE.name, locale: "en_CA", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Preston Cannabis — Ottawa" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}
export const CATEGORIES = [
  { slug: "flower", name: "Flower", mark: "✳", text: "Explore flower by strain and menu tier." },
  { slug: "pre-rolls", name: "Pre-rolls", mark: "╱", text: "Compare listed pre-roll formats." },
  { slug: "vape-disposables", name: "THC vapes", mark: "◒", text: "Cannabis vape formats in one collection." },
  { slug: "edibles", name: "Edibles", mark: "◈", text: "Browse listed edible formats." },
  { slug: "concentrates", name: "Concentrates", mark: "✦", text: "Explore concentrate formats." },
  { slug: "accessories", name: "Accessories", mark: "◎", text: "Browse accessories and hardware." },
  { slug: "nicotine-vapes", name: "Nicotine vapes", mark: "▯", text: "A separate collection for nicotine products." },
  { slug: "cigarettes", name: "Cigarettes", mark: "≋", text: "Browse the temporary source collection." },
] as const;
export { TIERS } from "./tiers.mjs";
export const FAQS = [
  ["Where is Preston Cannabis?", "Preston Cannabis is at 268 Preston St, Ottawa, ON K1R 7R5, in Little Italy between Carling and Somerset West."],
  ["Is this Preston's live inventory?", "Not yet. This preview uses the CHC01 menu temporarily. Products, prices and quantities are not confirmed for Preston."],
  ["How can I contact the store?", "Call 343-804-9020 for questions about Preston Cannabis."],
  ["Where can I find store hours?", "Call 343-804-9020 before planning a visit. This website does not claim 24-hour opening for Preston Cannabis."],
  ["Is delivery available?", "Preston pickup and delivery details have not been confirmed. Contact the store before making arrangements."],
];
