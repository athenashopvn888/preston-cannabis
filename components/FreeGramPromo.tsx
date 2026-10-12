/**
 * Free-gram promo (After Dark parity, Grok 2026-10-12).
 * Wording: "Buy 2g Get 1g FREE" / "Buy 3g Get 3g FREE". Every number comes from the
 * strain's own live-feed pack price; nothing is invented. Top tiers only (Exotic, Premium, AAA+).
 * show6g=false on stores that label the second pack as 5g: the 6g offer is then never shown.
 */
const TOP_TIERS = new Set(["EXOTIC", "PREMIUM", "AAA+"]);
export const BOGO_BUY_2_GET_1 = "Buy 2g Get 1g FREE";
export const BOGO_BUY_3_GET_3 = "Buy 3g Get 3g FREE";

export function isFreeGramTier(tier: string | null | undefined): boolean {
  return TOP_TIERS.has(String(tier ?? "").toUpperCase());
}
function dollars(amount: number): string {
  const cents = Math.round(amount * 100);
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}
function perGram(price: number, grams: number): string {
  const body = `${dollars(Math.round((price / grams) * 100) / 100)}/g`;
  return Math.round(price * 100) % grams === 0 ? body : `~${body}`;
}
function mode(values: number[]): number | null {
  const counts = new Map<number, number>();
  for (const v of values) if (Number.isFinite(v) && v > 0) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best: number | null = null; let n = 0;
  for (const [v, c] of counts) if (c > n || (c === n && best !== null && v > best)) { best = v; n = c; }
  return best;
}

/** Card line. price3g / price6g = the strain's own paid + regular pack prices from the feed. */
export function FreeGramCardLine({ name, tier, price3g, price6g, show6g }: {
  name: string; tier: string;
  price3g: { amount: number; regular: number } | null;
  price6g?: { amount: number } | null; show6g: boolean;
}) {
  if (!isFreeGramTier(tier) || !price3g || !(price3g.amount > 0)) return null;
  return (
    <div className="fg-card" data-fg-card={name}>
      <span className="fg-scope">In-store price</span>
      <span className="fg-rates"><s>{dollars(price3g.regular / 2)}/g</s> <strong>{dollars(Math.round((price3g.amount / 3) * 100) / 100)}/g</strong></span>
      <span className="fg-label">{BOGO_BUY_2_GET_1}</span>
      <span className="fg-pay">Pay {dollars(price3g.amount)} = 3g</span>
      {show6g && price6g && price6g.amount > 0 ? <span className="fg-hint">6g → {perGram(price6g.amount, 6)}</span> : null}
    </div>
  );
}

/** Tier header. Uses the most common real 3g / 6g pack price on this tier's live menu. */
export function FreeGramTierHeader({ tier, prices3g, prices6g, show6g }: {
  tier: string; prices3g: number[]; prices6g: number[]; show6g: boolean;
}) {
  if (!isFreeGramTier(tier)) return null;
  const p3 = mode(prices3g); const p6 = show6g ? mode(prices6g) : null;
  if (p3 === null) return null;
  return (
    <div className="fg-header" data-fg-header={tier.toUpperCase()}>
      <p className="fg-aslow">As low as {p6 !== null ? perGram(p6, 6) : perGram(p3, 3)} after promos</p>
      <p className="fg-list">List {dollars(p3 / 2)}/g</p>
      <div className="fg-deals">
        <div className="fg-deal">
          <div className="fg-deal-label">In-store price · {BOGO_BUY_2_GET_1}</div>
          <div className="fg-deal-price">Pay <strong>{dollars(p3)}</strong> = 3g</div>
          <div className="fg-deal-meta">{perGram(p3, 3)} · 2g=3g</div>
        </div>
        {p6 !== null ? (
          <div className="fg-deal">
            <div className="fg-deal-label">In-store price · {BOGO_BUY_3_GET_3}</div>
            <div className="fg-deal-price">Pay <strong>{dollars(p6)}</strong> = 6g</div>
            <div className="fg-deal-meta">{perGram(p6, 6)} · 3g=6g</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
