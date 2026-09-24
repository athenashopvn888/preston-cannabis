import type { Product } from "@/lib/menu";

const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

export default function FlowerPrices({ prices, compact = false }: { prices: Product["prices"]; compact?: boolean }) {
  return <div className={`flower-prices${compact ? " flower-prices-compact" : ""}`}>
    <p className="flower-prices-heading">Weight prices</p>
    {prices.length ? <dl>{prices.map((price) => <div className="flower-price-row" key={price.label}>
      <dt>{price.label}</dt>
      <dd>{price.sale !== null && <del><span className="sr-only">Source regular price </span>{currency.format(price.regular)}</del>}<strong><span className="sr-only">Source listed price </span>{currency.format(price.amount)}</strong></dd>
    </div>)}</dl> : <p className="flower-price-empty">Price unconfirmed</p>}
  </div>;
}
