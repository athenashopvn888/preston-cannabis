import Link from "next/link";
import { TIERS } from "@/lib/site";
import { ARTWORK } from "@/lib/artwork";
import EditorialArtwork from "./EditorialArtwork";
import { getMenu } from "@/lib/menu";
import { storeTierRange, tierRangeText } from "@/lib/tierPriceRanges";

export default async function TierCollections() {
  const menu = await getMenu();
  return <section className="section tier-collections"><div className="section-heading"><div><span className="eyebrow">FIND YOUR FLOWER</span><h2>Explore the<br/><em>weed tiers.</em></h2></div><Link className="text-link" href="/menu/flower">View all cannabis flower ↗</Link></div><p className="price-rule-notice"><strong>IN-STORE PRICES ONLY.</strong><br/>Delivery coming soon.</p><div className="tier-card-grid">{TIERS.map((tier, i) => { const line = tierRangeText(storeTierRange(menu.products, tier.inventoryTier)); return <Link className={`tier-card tier-card-${tier.slug}`} href={`/${tier.slug}`} key={tier.slug}><EditorialArtwork asset={ARTWORK.tiers[tier.slug]} className="tier-card-art" sizes={i === 0 ? "(max-width:650px) 90vw, 45vw" : i === 1 ? "(max-width:650px) 42vw, 45vw" : "(max-width:650px) 42vw, 30vw"}/><div className="tier-card-copy"><span className="eyebrow">0{i + 1} / FLOWER COLLECTION</span><h3>{tier.name}</h3>{line && <span className="tier-live-range"><small className="price-scope-label">In-store price</small>{line}</span>}<span className="tier-card-link">Explore {tier.name.toLowerCase()} <span aria-hidden="true">↗</span></span></div></Link>; })}</div><p className="quiet-note">Botanical artwork is illustrative. Explore listed products on the Preston Cannabis menu.</p></section>;
}
