import Link from "next/link";
import Leaf from "@/components/Leaf";
import TierCollections from "@/components/TierCollections";
import CategoryCollections from "@/components/CategoryCollections";
import LocalArtwork from "@/components/LocalArtwork";
import EditorialArtwork from "@/components/EditorialArtwork";
import { ARTWORK } from "@/lib/artwork";
import { FAQS, meta, SITE } from "@/lib/site";
import { HOME_COPY } from "@/lib/editorial";
const homeMetadata = meta(HOME_COPY.title, HOME_COPY.description);
export const metadata = { ...homeMetadata, title: { absolute: HOME_COPY.title }, openGraph: { ...homeMetadata.openGraph, title: HOME_COPY.title } };
export default function Home() { return <main id="main">
  <section className={`hero ${ARTWORK.hero ? "hero-photographic" : ""}`}>{ARTWORK.hero && <EditorialArtwork asset={ARTWORK.hero} className="hero-background" priority/>}<div className="hero-lines" aria-hidden="true"/><div className="hero-content"><span className="eyebrow light"><span/>PRESTON STREET, OTTAWA</span><h1>Preston <em>Cannabis</em></h1><p className="hero-subline">{HOME_COPY.subline}</p><p className="hero-intro">{HOME_COPY.support}</p><div className="button-row"><Link className="button cream" href="/menu">Explore the menu <span>↗</span></Link><Link className="button ghost" href="/contact">Find us on Preston <span>→</span></Link></div><div className="hero-caption">268 PRESTON ST <span>·</span> OTTAWA, ON <span>·</span> 19+</div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-label">ROOTED ON<br/>PRESTON STREET</div><Leaf monogram/><span className="art-stamp">OTTAWA<br/><strong>PC</strong><br/>ONTARIO</span></div></section>
  <section className="quick-links" aria-label="Store quick links"><Link href="/contact"><span>01 / VISIT</span><strong>268 Preston St</strong><small>Ottawa, Ontario ↗</small></Link><Link href="/menu"><span>02 / EXPLORE</span><strong>Find your format</strong><small>Browse the menu preview ↗</small></Link><a href={SITE.tel}><span>03 / SAY HELLO</span><strong>{SITE.phone}</strong><small>Questions? Give us a call ↗</small></a></section>
  <TierCollections/>
  <CategoryCollections/>
  <section className="local-section"><LocalArtwork/><div className="local-copy"><span className="eyebrow">A PLACE ON PRESTON</span><h2>Your next stop.<br/><em>Preston Cannabis.</em></h2><p>Find our location, explore the menu preview and get in touch. Everything you need to start getting to know Preston Cannabis, together in one place.</p><address>{SITE.address}<br/>{SITE.city}, {SITE.province} {SITE.postalCode}</address><div className="button-row"><a className="button" href={SITE.maps} target="_blank" rel="noopener noreferrer">Get directions ↗</a><Link className="text-link" href="/weed-dispensary-near-me">About our Ottawa location →</Link></div></div></section>
  <section className="section faq-section"><div><span className="eyebrow">GOOD TO KNOW</span><h2>A few questions,<br/><em>answered.</em></h2><Link className="text-link" href="/faq">All questions ↗</Link></div><div className="faq-list">{FAQS.slice(0, 3).map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
  </main>; }
