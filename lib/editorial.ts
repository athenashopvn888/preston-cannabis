import { TIER_PAGE_COPY } from "./content-hub.mjs";

export const HOME_COPY = {
  title: "Cannabis Dispensary on Preston St in Little Italy | Preston Cannabis",
  description: "Preston Cannabis at 268 Preston St, Ottawa, ON K1R 7R6. Little Italy corridor hub for flower tiers, Native cigarettes, nicotine vapes, and visit planning near Dow's Lake, Somerset West, and Centretown West.",
  subline: "Little Italy · Dow's Lake · Somerset West · Centretown West",
  support: "Rooted on Preston Street between Carling and Somerset West. Browse weed tiers, cigarette and nicotine shelves, then use Visit for O-Train Line 2 / Carling notes before you arrive at 268 Preston St, Ottawa, ON K1R 7R6.",
};

export const TIER_COPY: Record<string, { intro: string; description: string; faqs: { question: string; answer: string }[] }> = {
  exotic: TIER_PAGE_COPY.exotic,
  premium: TIER_PAGE_COPY.premium,
  aaa: TIER_PAGE_COPY.aaa,
  aa: TIER_PAGE_COPY.aa,
  budget: TIER_PAGE_COPY.budget,
};
