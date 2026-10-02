import Link from "next/link";
import { notFound } from "next/navigation";
import MenuGrid from "@/components/MenuGrid";
import { Breadcrumbs } from "@/components/Chrome";
import StructuredData from "@/components/StructuredData";
import { getMenu } from "@/lib/menu";
import { TIERS, meta, SITE } from "@/lib/site";
import EditorialArtwork from "@/components/EditorialArtwork";
import { ARTWORK } from "@/lib/artwork";
import { TIER_COPY } from "@/lib/editorial";
import { tierSeoTitle, tierH1 } from "@/lib/tiers.mjs";
import { jsonLd, tierCollectionGraph } from "@/lib/landing-schema.mjs";
import { getTierGuideLinks } from "@/lib/guideRegistry";
import guideStyles from "../guides/[slug]/guide.module.css";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ tier: string }> };

export async function generateMetadata({ params }: Props) {
  const { tier } = await params;
  const t = TIERS.find((v) => v.slug === tier);
  const title = tierSeoTitle(t?.name || "Weed");
  const metadata = meta(title, TIER_COPY[tier]?.description || "Explore the Preston Cannabis menu.", `/${tier}`);
  return { ...metadata, title: { absolute: title }, openGraph: { ...metadata.openGraph, title } };
}

export default async function TierPage({ params }: Props) {
  const { tier } = await params;
  const t = TIERS.find((v) => v.slug === tier);
  if (!t) notFound();
  const copy = TIER_COPY[tier];
  const menu = await getMenu();
  const products = menu.products.filter((product) => product.category === "flower" && product.tier === t.inventoryTier);
  const h1 = tierH1(t.name);
  const schema = tierCollectionGraph(SITE, {
    path: `/${tier}`,
    name: h1,
    description: copy.description,
    products,
    faqs: copy.faqs,
  });
  const items = [{ name: "Flower", href: "/menu/flower" }, { name: t.name, href: `/${tier}` }];
  const guideLinks = getTierGuideLinks(`/${tier}`);
  return <main id="main" className="page-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}/>
    <Breadcrumbs items={items}/><StructuredData items={items}/>
    <div className="tier-introduction">
      <div className="page-heading">
        <span className="eyebrow">PRESTON STREET FLOWER</span>
        <h1>{h1}</h1>
        <p>{copy.intro}</p>
      </div>
      <EditorialArtwork asset={ARTWORK.tiers[t.slug]} className="tier-introduction-art"/>
    </div>
    <MenuGrid menu={menu} category="flower" tier={t.inventoryTier}/>
    {guideLinks.length > 0 && <section className={guideStyles.guideStrip} aria-label="Popular strain guides"><h2>Popular strain guides</h2><div className={guideStyles.guideLinks}>{guideLinks.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`}>{guide.name}</Link>)}</div></section>}
    <section className="faq-section" style={{paddingInline: 0}}>
      <div><span className="eyebrow">TIER FAQ</span><h2>{t.name}<br/><em>questions.</em></h2></div>
      <div className="faq-list">{copy.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
    <aside className="related-links">
      <h2>Explore the weed tiers</h2>
      <nav>
        <Link href="/menu/flower">All cannabis flower →</Link>
        <Link href="/visit">Visit Preston St →</Link>
        <Link href="/weed-dispensary-near-me">Geo weed near Preston →</Link>
        {TIERS.filter((v) => v.slug !== tier).map((v) => <Link href={`/${v.slug}`} key={v.slug}>{v.name} →</Link>)}
      </nav>
    </aside>
  </main>;
}
