import type { Product } from "./menu";
export type GuideLane = "strain" | "native_cig" | "nic_vape" | "thc_vape";
export type GuideEntry = { slug: string; lane: GuideLane; name: string; title: string; menuPath: string; preferredProductSlug?: string; relatedSlugs: string[] };
type Seed = Omit<GuideEntry, "relatedSlugs">;
const seeds: Seed[] = [
  { slug: "og-kush", lane: "strain", name: "OG Kush", title: "OG Kush at Preston Cannabis | Preston", menuPath: "/aaa", preferredProductSlug: "og-kush-aaa" },
  { slug: "gorilla-glue", lane: "strain", name: "Gorilla Glue", title: "Gorilla Glue at Preston Cannabis | Preston", menuPath: "/aa", preferredProductSlug: "gorilla-glue-4" },
  { slug: "northern-lights", lane: "strain", name: "Northern Lights", title: "Northern Lights at Preston Cannabis | Preston", menuPath: "/budget", preferredProductSlug: "northern-lights-shreds" },
  { slug: "master-kush", lane: "strain", name: "Master Kush", title: "Master Kush at Preston Cannabis | Preston", menuPath: "/aaa", preferredProductSlug: "master-kush-aaa" },
  { slug: "pineapple-haze", lane: "strain", name: "Pineapple Haze", title: "Pineapple Haze at Preston Cannabis | Preston", menuPath: "/premium", preferredProductSlug: "pineapple-haze" },
  { slug: "granddaddy-purple", lane: "strain", name: "Granddaddy Purple", title: "Granddaddy Purple at Preston Cannabis | Preston", menuPath: "/budget", preferredProductSlug: "grandaddy-purple-shreds" },
  { slug: "peanut-butter-rockstar", lane: "strain", name: "Peanut Butter Rockstar", title: "Peanut Butter Rockstar at Preston Cannabis | Preston", menuPath: "/exotic", preferredProductSlug: "peanut-butter-rockstar" },
  { slug: "slurricane", lane: "strain", name: "Slurricane", title: "Slurricane at Preston Cannabis | Preston", menuPath: "/aa", preferredProductSlug: "slurricane" },
  { slug: "island-pink", lane: "strain", name: "Island Pink", title: "Island Pink at Preston Cannabis | Preston", menuPath: "/premium", preferredProductSlug: "island-pink" },
  { slug: "tequila-sunrise", lane: "strain", name: "Tequila Sunrise", title: "Tequila Sunrise at Preston Cannabis | Preston", menuPath: "/exotic", preferredProductSlug: "tequila-sunrise-s" },
  { slug: "royal-gorilla", lane: "strain", name: "Royal Gorilla", title: "Royal Gorilla at Preston Cannabis | Preston", menuPath: "/aa", preferredProductSlug: "royal-gorilla" },
  { slug: "diamond-og", lane: "strain", name: "Diamond OG", title: "Diamond OG at Preston Cannabis | Preston", menuPath: "/aa", preferredProductSlug: "diamond-og" },
  { slug: "lavender-kush", lane: "strain", name: "Lavender Kush", title: "Lavender Kush at Preston Cannabis | Preston", menuPath: "/budget", preferredProductSlug: "lavender-kush" },
  { slug: "bb-cigarettes", lane: "native_cig", name: "BB", title: "BB Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "bb-full-carton" },
  { slug: "canadian-classics", lane: "native_cig", name: "Canadian Classics", title: "Canadian Classics Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "canadian-classics-original" },
  { slug: "nexus-cigarettes", lane: "native_cig", name: "Nexus", title: "Nexus Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "nexus-full" },
  { slug: "canadian-goose", lane: "native_cig", name: "Canadian Goose", title: "Canadian Goose Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "canadian-goose-full" },
  { slug: "putters", lane: "native_cig", name: "Putters", title: "Putters Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "putters" },
  { slug: "time-cigarettes", lane: "native_cig", name: "Time", title: "Time Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "time-full" },
  { slug: "rolled-gold", lane: "native_cig", name: "Rolled Gold", title: "Rolled Gold Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "rolled-gold-lights" },
  { slug: "canadian-cigarettes", lane: "native_cig", name: "Canadian", title: "Canadian Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "canadian-full" },
  { slug: "backwoods", lane: "native_cig", name: "Backwoods", title: "Backwoods Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "backwoods-assorted-flavors-20-25" },
  { slug: "grabba", lane: "native_cig", name: "Grabba", title: "Grabba Native Cigarettes at Preston Cannabis | Preston", menuPath: "/menu/cigarettes", preferredProductSlug: "grabba" },
  { slug: "ovns-vape", lane: "nic_vape", name: "OVNS", title: "OVNS Nicotine Vape at Preston Cannabis | Preston", menuPath: "/menu/nicotine-vapes", preferredProductSlug: "ovns-10000-5-10k-puffs-nvape" },
  { slug: "gas-gang-thc-vape", lane: "thc_vape", name: "Gas Gang", title: "Gas Gang THC Vape at Preston Cannabis | Preston", menuPath: "/menu/vape-disposables", preferredProductSlug: "2g-gas-gang-vol3-hybrid-thcvape" },
  { slug: "drizzle-thc-vape", lane: "thc_vape", name: "Drizzle", title: "Drizzle THC Vape at Preston Cannabis | Preston", menuPath: "/menu/vape-disposables", preferredProductSlug: "drizzle-switch-3in1-2g-thcvape" },
];
export const GUIDE_REGISTRY: GuideEntry[] = seeds.map((seed) => ({ ...seed, relatedSlugs: seeds.filter((row) => row.lane === seed.lane && row.slug !== seed.slug).slice(0, seed.lane === "strain" ? 4 : 3).map((row) => row.slug) }));
export const getGuide = (slug: string) => GUIDE_REGISTRY.find((guide) => guide.slug === slug);
export const resolveGuideProduct = (guide: GuideEntry, products: Product[]) => guide.preferredProductSlug ? products.find((product) => product.slug === guide.preferredProductSlug) : undefined;
export const getTierGuideLinks = (menuPath: string, limit = 6) => GUIDE_REGISTRY.filter((guide) => guide.lane === "strain" && guide.menuPath === menuPath).slice(0, limit);
export const getCategoryGuideGroups = (menuPath: string) => {
  if (menuPath === "/menu/cigarettes") return [{ label: "Native Cigarettes guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "native_cig").slice(0, 11) }];
  if (menuPath === "/menu/nicotine-vapes") return [{ label: "Nicotine Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "nic_vape").slice(0, 8) }, { label: "Separate THC Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "thc_vape").slice(0, 2) }];
  if (menuPath === "/menu/vape-disposables") return [{ label: "THC Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "thc_vape").slice(0, 8) }];
  return [];
};

