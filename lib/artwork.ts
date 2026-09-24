export type ArtworkAsset = { src: string; alt: string; position?: string };
export const ARTWORK: { hero: ArtworkAsset | null; tiers: Record<string, ArtworkAsset | null>; categories: Record<string, ArtworkAsset | null>; local: ArtworkAsset | null } = {
  hero: { src: "/artwork/hero.webp", alt: "Illustrative botanical still life with cannabis leaves, emerald glass and an ivory vase", position: "center" },
  tiers: {
    exotic: { src: "/artwork/exotic.webp", alt: "Illustrative cannabis botanical arrangement with emerald crystal for the Exotic Weed collection" },
    premium: { src: "/artwork/premium-v2.webp", alt: "Illustrative mature trimmed cannabis buds on emerald stone for the Premium Weed collection" },
    aaa: { src: "/artwork/aaa-v2.webp", alt: "Illustrative harvested and trimmed cannabis buds for the AAA+ Weed collection" },
    aa: { src: "/artwork/aa-v2.webp", alt: "Illustrative mature dried cannabis buds for the AA Weed collection" },
    budget: { src: "/artwork/budget-v2.webp", alt: "Illustrative collection of trimmed cannabis buds for the Budget Weed collection" },
  },
  categories: {
    flower: { src: "/artwork/category-flower-v2.webp", alt: "Illustrative still life of mature trimmed cannabis flower" },
    "pre-rolls": { src: "/artwork/category-prerolls-v2.webp", alt: "Illustrative unlit cannabis pre-rolls on green stone" },
    "vape-disposables": { src: "/artwork/category-vapes-v2.webp", alt: "Illustrative still life of unlabelled cannabis vape devices" },
    edibles: { src: "/artwork/category-edibles-v2.webp", alt: "Illustrative edible formats arranged on an emerald background" },
    concentrates: { src: "/artwork/category-concentrates-v2.webp", alt: "Illustrative still life of cannabis concentrate formats" },
    accessories: { src: "/artwork/category-accessories-v2.webp", alt: "Illustrative cannabis accessories arranged on green stone" },
  },
  local: { src: "/artwork/preston-panel-v2.webp", alt: "Abstract emerald brand illustration with a cannabis leaf and textured stone", position: "60% center" },
};
