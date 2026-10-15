type Price = { label?: unknown; amount?: unknown };
type FlowerProduct = { category?: unknown; tier?: unknown; thc?: unknown; prices?: Price[] };

export type TierRange = { count: number; perGram?: [number, number]; listPerGram?: number; thc?: [number, number] };

function positiveNumber(value: unknown): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function range(values: number[]): [number, number] | undefined {
  return values.length ? [Math.min(...values), Math.max(...values)] : undefined;
}

function thcNumbers(value: unknown): number[] {
  return (String(value ?? "").match(/\d+(?:\.\d+)?/g) || []).map(Number).filter((number) => number > 0 && number <= 100);
}

export function storeTierRange(products: FlowerProduct[], tier: string): TierRange {
  const matches = products.filter((product) =>
    String(product.category || "").toLowerCase() === "flower" &&
    String(product.tier || "").toUpperCase() === tier.toUpperCase()
  );
  const perGram: number[] = [];
  const listPerGram: number[] = [];
  const thc: number[] = [];
  const promoTier = ["EXOTIC", "PREMIUM", "AAA+"].includes(tier.toUpperCase());
  for (const product of matches) {
    for (const price of product.prices || []) {
      const labelGrams = Number(String(price.label ?? "").match(/^(\d+(?:\.\d+)?)g$/i)?.[1]);
      // Top-3 tiers (Exotic, Premium, AAA+): the "5g" feed pack is 6g. AA stays a true 5g.
      const grams = labelGrams === 5 && ["EXOTIC", "PREMIUM", "AAA+"].includes(tier.toUpperCase()) ? 6 : labelGrams;
      const amount = positiveNumber(price.amount);
      if (Number.isFinite(grams) && grams > 0 && amount !== null) {
        perGram.push(amount / grams);
        // Top-3 tiers: the 3g pack is Buy 2g Get 1g FREE and the 6g pack is Buy 3g Get 3g FREE,
        // so the list (pre-promo) gram price is the pack price divided by the paid grams.
        if (promoTier && (grams === 3 || grams === 6)) listPerGram.push(amount / (grams === 3 ? 2 : 3));
      }
    }
    thc.push(...thcNumbers(product.thc));
  }
  const list = listPerGram.length ? Math.max(...listPerGram) : undefined;
  return { count: matches.length, perGram: range(perGram), listPerGram: list, thc: range(thc) };
}

function money(value: number): string {
  return `$${(Math.round(value * 100) / 100).toFixed(2)}`;
}

function percent(value: number): string {
  return String(Math.round(value * 10) / 10).replace(/\.0$/, "");
}

export function tierRangeText(value: TierRange): string | null {
  const parts: string[] = [];
  if (value.perGram) {
    const [low, high] = value.perGram;
    if (value.listPerGram !== undefined && value.listPerGram > low) {
      parts.push(`${money(value.listPerGram)} a gram list, as low as ${money(low)} a gram after promos`);
    } else parts.push(money(low) === money(high) ? `${money(low)} a gram` : `From ${money(low)} to ${money(high)} a gram`);
  }
  if (value.thc) {
    const [low, high] = value.thc;
    parts.push(percent(low) === percent(high) ? `THC about ${percent(low)}%` : `THC about ${percent(low)} to ${percent(high)}%`);
  }
  return parts.length ? parts.join(" · ") : null;
}
