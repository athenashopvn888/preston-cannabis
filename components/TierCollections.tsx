import Link from "next/link";
import { TIERS } from "@/lib/site";
import { ARTWORK } from "@/lib/artwork";
import EditorialArtwork from "./EditorialArtwork";
export default function TierCollections() {
  return <section className="section tier-collections"><div className="section-heading"><div><span className="eyebrow">FIND YOUR FLOWER</span><h2>Explore the<br/><em>weed tiers.</em></h2></div><Link className="text-link" href="/menu/flower">View all cannabis flower ↗</Link></div><div className="tier-card-grid">{TIERS.map((tier, i) => <Link className={`tier-card tier-card-${tier.slug}`} href={`/${tier.slug}`} key={tier.slug}><EditorialArtwork asset={ARTWORK.tiers[tier.slug]} className="tier-card-art" sizes={i === 0 ? "(max-width:650px) 90vw, 45vw" : i === 1 ? "(max-width:650px) 42vw, 45vw" : "(max-width:650px) 42vw, 30vw"}/><div className="tier-card-copy"><span className="eyebrow">0{i + 1} / FLOWER COLLECTION</span><h3>{tier.name}</h3><span className="tier-card-link">Explore {tier.name.toLowerCase()} <span aria-hidden="true">↗</span></span></div></Link>)}</div><p className="quiet-note">Botanical artwork is illustrative. Explore listed products on the Preston Cannabis menu.</p></section>;
}
