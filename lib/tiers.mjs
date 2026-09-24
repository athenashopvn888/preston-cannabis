// Public SEO names are separate from raw inventory keys.
export const TIERS = [
  { slug: "exotic", name: "Exotic Weed", inventoryTier: "EXOTIC", corridor: "Preston St in Little Italy" },
  { slug: "premium", name: "Premium Weed", inventoryTier: "PREMIUM", corridor: "Little Italy near Dow's Lake" },
  { slug: "aaa", name: "AAA+ Weed", inventoryTier: "AAA+", corridor: "Preston St in Little Italy" },
  { slug: "aa", name: "AA Weed", inventoryTier: "AA", corridor: "Somerset West and Chinatown" },
  { slug: "budget", name: "Budget Weed", inventoryTier: "BUDGET", corridor: "Centretown West Ottawa" },
];
export const tierDisplayName = (rawTier) => TIERS.find((tier) => tier.inventoryTier === String(rawTier).toUpperCase())?.name || rawTier;
export const matchesInventoryTier = (rawTier, requestedTier) => String(rawTier).toUpperCase() === String(requestedTier).toUpperCase();
export const tierSeoTitle = (name, corridor) => {
  const row = TIERS.find((tier) => tier.name === name);
  const place = corridor || row?.corridor || "Preston St in Little Italy";
  return `${name} on ${place} | Preston Cannabis`;
};
export const tierH1 = (name, corridor) => {
  const row = TIERS.find((tier) => tier.name === name);
  const place = corridor || row?.corridor || "Preston St in Little Italy";
  return `${name} on ${place}`;
};
