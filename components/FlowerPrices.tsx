import type { Product } from "@/lib/menu";
import { FreeGramCardLine, isFreeGramTier } from "./FreeGramPromo";

const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

export default function FlowerPrices({ prices, compact = false, name, tier }: { prices: Product["prices"]; compact?: boolean; name?: string; tier?: string }) {
  const p3 = prices.find((price) => price.label === "3g") ?? null;
  // Top-3 tiers: the second pack is 6g (feed field price5g). AA stays a true 5g.
  const top3 = isFreeGramTier(tier);
  const p6 = prices.find((price) => price.label === "5g") ?? null;
  return <div className={`flower-prices${compact ? " flower-prices-compact" : ""}`}>
    <p className="flower-prices-heading">Weight prices</p>
    {prices.length ? <dl>{prices.map((price) => <div className="flower-price-row" key={price.label}>
      <dt>{top3 && price.label === "5g" ? "6g" : price.label}</dt>
      <dd>{price.sale !== null && <del><span className="sr-only">Source regular price </span>{currency.format(price.regular)}</del>}<strong><span className="sr-only">Source listed price </span>{currency.format(price.amount)}</strong></dd>
    </div>)}</dl> : <p className="flower-price-empty">Price unconfirmed</p>}
    {name && tier ? <FreeGramCardLine name={name} tier={tier} price3g={p3} price6g={p6} show6g/> : null}
  </div>;
}
