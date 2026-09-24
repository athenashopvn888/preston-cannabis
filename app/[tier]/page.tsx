import Link from "next/link";
import { notFound } from "next/navigation";
import MenuGrid from "@/components/MenuGrid";
import { Breadcrumbs } from "@/components/Chrome";
import StructuredData from "@/components/StructuredData";
import { getMenu } from "@/lib/menu";
import { TIERS, meta } from "@/lib/site";
import EditorialArtwork from "@/components/EditorialArtwork";
import { ARTWORK } from "@/lib/artwork";
import { TIER_COPY } from "@/lib/editorial";
import { tierSeoTitle } from "@/lib/tiers.mjs";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ tier: string }> };
export async function generateMetadata({ params }: Props) {
  const { tier } = await params;
  const t = TIERS.find((v) => v.slug === tier);
  const title = tierSeoTitle(t?.name || "Weed");
  const metadata = meta(title, TIER_COPY[tier]?.description || "Explore the Preston Cannabis menu preview.", `/${tier}`);
  return { ...metadata, title: { absolute: title }, openGraph: { ...metadata.openGraph, title } };
}
export default async function TierPage({ params }: Props) {
  const { tier } = await params;
  const t = TIERS.find((v) => v.slug === tier);
  if (!t) notFound();
  const items = [{ name: "Flower", href: "/menu/flower" }, { name: t.name, href: `/${tier}` }];
  return <main id="main" className="page-wrap">
    <Breadcrumbs items={items}/><StructuredData items={items}/>
    <div className="tier-introduction"><div className="page-heading"><span className="eyebrow">EXPLORE THE WEED TIERS</span><h1>{t.name}</h1><p>{TIER_COPY[tier].intro}</p></div><EditorialArtwork asset={ARTWORK.tiers[t.slug]} className="tier-introduction-art"/></div>
    <MenuGrid menu={await getMenu()} category="flower" tier={t.inventoryTier}/>
    <aside className="related-links"><h2>Explore the weed tiers</h2><nav><Link href="/menu/flower">All cannabis flower →</Link><Link href="/weed-dispensary-near-me">Cannabis and weed in Ottawa →</Link><Link href="/faq">Questions before a visit →</Link>{TIERS.filter((v) => v.slug !== tier).map((v) => <Link href={`/${v.slug}`} key={v.slug}>{v.name} →</Link>)}</nav></aside>
  </main>;
}
