import Link from "next/link";
import Leaf from "@/components/Leaf";
import TierCollections from "@/components/TierCollections";
import CategoryCollections from "@/components/CategoryCollections";
import LocalArtwork from "@/components/LocalArtwork";
import EditorialArtwork from "@/components/EditorialArtwork";
import { ARTWORK } from "@/lib/artwork";
import { meta, SITE, PREVIEW_NOTICE } from "@/lib/site";
import { HOME_COPY } from "@/lib/editorial";
import { CORRIDOR_NEIGHBOURHOODS, HOME_FAQS, HOME_HUB_CARDS, HOURS_STATUS } from "@/lib/content-hub.mjs";

const homeMetadata = meta(HOME_COPY.title, HOME_COPY.description);
export const metadata = { ...homeMetadata, title: { absolute: HOME_COPY.title }, openGraph: { ...homeMetadata.openGraph, title: HOME_COPY.title } };

export default function Home() {
  return <main id="main">
    <section className={`hero ${ARTWORK.hero ? "hero-photographic" : ""}`}>
      {ARTWORK.hero && <EditorialArtwork asset={ARTWORK.hero} className="hero-background" priority/>}
      <div className="hero-lines" aria-hidden="true"/>
      <div className="hero-content">
        <span className="eyebrow light"><span/>PRESTON STREET · LITTLE ITALY</span>
        <h1>Cannabis on <em>Preston Street</em></h1>
        <p className="hero-subline">{HOME_COPY.subline}</p>
        <p className="hero-intro">{HOME_COPY.support}</p>
        <div className="button-row">
          <Link className="button cream" href="/menu">Explore the menu <span>→</span></Link>
          <Link className="button ghost" href="/visit">Plan your visit <span>↗</span></Link>
        </div>
        <div className="hero-caption">268 PRESTON ST <span>·</span> OTTAWA, ON K1R 7R5 <span>·</span> 19+</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="art-label">ROOTED ON<br/>PRESTON STREET</div>
        <Leaf monogram/>
        <span className="art-stamp">OTTAWA<br/><strong>PC</strong><br/>ONTARIO</span>
      </div>
    </section>

    <section className="quick-links" aria-label="Store quick links">
      <Link href="/visit"><span>01 / VISIT</span><strong>268 Preston St</strong><small>Little Italy directions →</small></Link>
      <Link href="/menu"><span>02 / EXPLORE</span><strong>Find your format</strong><small>Browse the menu preview →</small></Link>
      <a href={SITE.tel}><span>03 / SAY HELLO</span><strong>{SITE.phone}</strong><small>{HOURS_STATUS.summary}</small></a>
    </section>

    <section className="section" aria-label="Corridor neighbourhoods">
      <div className="section-heading">
        <div><span className="eyebrow">PRESTON CORRIDOR</span><h2>Neighbourhoods that<br/><em>reach this door.</em></h2></div>
        <Link className="text-link" href="/weed-dispensary-near-me">Geo weed owner →</Link>
      </div>
      <div className="category-grid">
        {CORRIDOR_NEIGHBOURHOODS.map((name, i) => (
          <div className={`category-card category-${i % 6}`} key={name}>
            <span className="category-number">0{i + 1}</span>
            <h3>{name}</h3>
            <p>Orientation for shoppers already moving along the Preston Street spine.</p>
          </div>
        ))}
      </div>
    </section>

    <section className="section tier-collections" aria-label="Homepage hubs">
      <div className="section-heading">
        <div><span className="eyebrow">START HERE</span><h2>Hubs for tiers,<br/><em>shelves, and visit.</em></h2></div>
        {!HOURS_STATUS.is24h && <p className="quiet-note" style={{margin:0}}>Hours stay phone-verified; overnight claims are omitted.</p>}
      </div>
      <div className="tier-card-grid">
        {HOME_HUB_CARDS.map((card, i) => (
          <Link className={`tier-card tier-card-${i}`} href={card.href} key={card.href}>
            <div className="tier-card-copy">
              <span className="eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p className="quiet-note" style={{marginTop:0}}>{card.blurb}</p>
              <span className="tier-card-link">Open <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <TierCollections/>
    <CategoryCollections/>

    <section className="local-section">
      <LocalArtwork/>
      <div className="local-copy">
        <span className="eyebrow">A PLACE ON PRESTON</span>
        <h2>Your next stop.<br/><em>Preston Cannabis.</em></h2>
        <p>Map the Little Italy pin, confirm timing by phone, then browse flower tiers or the Native cigarettes and nicotine vape shelves.</p>
        <address>{SITE.address}<br/>{SITE.city}, {SITE.province} {SITE.postalCode}</address>
        <div className="button-row">
          <a className="button" href={SITE.maps} target="_blank" rel="noopener noreferrer">Get directions →</a>
          <Link className="text-link" href="/hours">Hours guidance →</Link>
        </div>
        <p className="quiet-note">{PREVIEW_NOTICE}</p>
      </div>
    </section>

    <section className="section faq-section">
      <div>
        <span className="eyebrow">GOOD TO KNOW</span>
        <h2>A few questions,<br/><em>answered.</em></h2>
        <Link className="text-link" href="/faq">All questions →</Link>
      </div>
      <div className="faq-list">
        {HOME_FAQS.map(({ question, answer }) => (
          <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
        ))}
      </div>
    </section>
  </main>;
}