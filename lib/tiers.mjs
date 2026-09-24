// Public SEO names are separate from raw inventory keys.
export const TIERS = [
  { slug: "exotic", name: "Exotic Weed", inventoryTier: "EXOTIC" },
  { slug: "premium", name: "Premium Weed", inventoryTier: "PREMIUM" },
  { slug: "aaa", name: "AAA+ Weed", inventoryTier: "AAA+" },
  { slug: "aa", name: "AA Weed", inventoryTier: "AA" },
  { slug: "budget", name: "Budget Weed", inventoryTier: "BUDGET" },
];
export const tierDisplayName = (rawTier) => TIERS.find((tier) => tier.inventoryTier === String(rawTier).toUpperCase())?.name || rawTier;
export const matchesInventoryTier = (rawTier, requestedTier) => String(rawTier).toUpperCase() === String(requestedTier).toUpperCase();
export const tierSeoTitle = (name) => `${name} | Preston Cannabis Ottawa`;
