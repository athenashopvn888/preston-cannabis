import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Chrome";
import { getMenu } from "@/lib/menu";
import { SITE, canonical, meta } from "@/lib/site";
import { GUIDE_REGISTRY, getGuide, resolveGuideProduct, type GuideEntry } from "@/lib/guideRegistry";
import styles from "./guide.module.css";
type Props = { params: Promise<{ slug: string }> };
const copy = {
  strain: { label: "Strain guide", noun: "cannabis flower name", board: "flower menu", note: "Flower names stay separate from tobacco, nicotine devices, and THC vape formats." },
  native_cig: { label: "Native Cigarettes", noun: "adult tobacco brand name", board: "Native Cigarettes menu", note: "This is adult tobacco information, not cannabis or vape information. Adults 19+ only." },
  nic_vape: { label: "Nicotine Vape", noun: "adult nicotine-vape name", board: "Nicotine Vape menu", note: "This is the Nicotine Vape shelf, not the THC Vape shelf. Nicotine is addictive. Adults 19+ only." },
  thc_vape: { label: "THC Vape", noun: "cannabis-menu vape name", board: "THC Vape menu", note: "This is cannabis-menu information, not a nicotine-device recommendation." },
} as const;
export const dynamicParams = false;
export function generateStaticParams() { return GUIDE_REGISTRY.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug); if (!guide) return {};
  return { ...meta(guide.title, `Adult 19+ guide to ${guide.name}, a ${copy[guide.lane].noun} connected to ${SITE.name}'s current menu on Preston Street. Selection rotates; check today's menu.`, `/guides/${guide.slug}`), title: { absolute: guide.title } };
}
const faqs = (g: GuideEntry, linked: boolean) => [
  { q: `Is ${g.name} on the Preston Cannabis menu today?`, a: linked ? `A matching ${g.name} listing appears in the current site snapshot, but stock rotates. Open the linked listing and today's menu before travelling.` : `There is no matching product page in the current site snapshot. Use today's category menu because a named item can rotate out.` },
  { q: `Does every ${g.name} listing use the same format?`, a: g.lane === "native_cig" ? "No. Read the package label for full, lights, silver, menthol, pack, or carton details." : g.lane === "nic_vape" ? "No. Device formats and nicotine strengths differ. Read the current item and package label." : g.lane === "thc_vape" ? "No. Cannabis vape formats differ; the current item and package label control." : "No. A flower name does not guarantee one batch, potency, package size, or tier forever." },
  { q: `Where should I check before visiting for ${g.name}?`, a: `Open the linked item when available, then check today's ${copy[g.lane].board}. Use the visit page for directions to ${SITE.fullAddress}.` },
  { q: "Who can shop this category?", a: `${SITE.name} serves adults 19+. Bring valid government-issued photo ID. This guide is informational and does not reserve an item.` },
];
export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug); if (!guide) notFound();
  const menu = await getMenu(); const product = resolveGuideProduct(guide, menu.products); const productHref = product ? `/products/${product.slug}` : undefined; const lane = copy[guide.lane]; const related = guide.relatedSlugs.map(getGuide).filter((v): v is GuideEntry => Boolean(v)); const questions = faqs(guide, Boolean(productHref)); const url = canonical(`/guides/${guide.slug}`);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: guide.title, description: `${SITE.name} guide to ${guide.name} and today's ${lane.board}.` },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.domain }, { "@type": "ListItem", position: 2, name: lane.label, item: canonical(guide.menuPath) }, { "@type": "ListItem", position: 3, name: guide.name, item: url }] },
    { "@type": "FAQPage", mainEntity: questions.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ] };
  return <main id="main" className="page-wrap"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/>
    <Breadcrumbs items={[{ name: lane.label, href: guide.menuPath }, { name: guide.name, href: `/guides/${guide.slug}` }]}/>
    <article className={styles.article}><header className={styles.hero}><span className="eyebrow">{lane.label}</span><h1>{guide.title}</h1><p>A practical adult 19+ name guide for {SITE.name} on Preston Street in Ottawa. Identify the correct menu lane, compare nearby names, and move to today&apos;s board without treating an older listing as a stock promise.</p><div className={styles.actions}><Link href={productHref ?? guide.menuPath}>Check today&apos;s menu path</Link><Link href="/visit">Plan a visit</Link></div></header>
    <section><h2>The short version</h2><ul><li><strong>{guide.name}</strong> is treated here as a {lane.noun}; the public label is {lane.label}.</li><li>{lane.note}</li><li>Selection rotates. Check the current menu and bring government photo ID showing 19+.</li></ul></section>
    <section><h2>What we show today for {guide.name}</h2><p>This guide comes from the stock-gated TPC01 shiplist and the current Preston site snapshot. It is deliberately narrower than an availability guarantee. Menu data places a name on the correct shelf, but counter stock can rotate after this page is built. Prices, package options, variants, and quantities belong on the current menu listing, not this evergreen guide.</p>{productHref ? <p>A matching entry appears in the current snapshot: <Link href={productHref}>{product?.name}</Link>. Open it for published item details, then compare the surrounding <Link href={guide.menuPath}>{lane.board}</Link>. The link helps navigation; it does not reserve stock.</p> : <p>No matching product-detail route appears in the current snapshot, so this guide points to the <Link href={guide.menuPath}>{lane.board}</Link> instead of inventing one. Check today&apos;s board or call when the exact name matters.</p>}</section>
    <section><h2>How {guide.name} appears on our menu</h2><p>{SITE.name} organizes names by shopping lane. This page does not rename a product or imply similarly named products are identical. If an exact item rotates out, the stable menu category remains the next place to check.</p><p>Flower names may attach to a tier or format. Native Cigarettes can have pack or carton variants. Nicotine Vape devices use model and strength labels. THC Vape names refer to cannabis formats. The current item label is always more specific than the hub name.</p>{guide.slug === "ovns-vape" && <p><strong>OVNS is the listed brand name.</strong> It is not OVI, and this site does not publish an OVI guide.</p>}</section>
    <section><h2>Compare names from the same lane</h2><p>These links stay in {lane.label}. They do not claim products taste alike, perform alike, or are interchangeable. Nicotine Vape and THC Vape remain separate so shoppers do not need to infer the substance from a device-shaped product.</p><div className={styles.related}>{related.map((r) => <Link key={r.slug} href={`/guides/${r.slug}`}>{r.name}<small>{copy[r.lane].label}</small></Link>)}</div></section>
    <section><h2>Plan a Preston Street visit</h2><p>{SITE.name} is at {SITE.fullAddress}. Use the <Link href="/visit">visit page</Link> for current directions and store information. Adults must be 19 or older. If a trip depends on one exact listing, check the menu immediately before travelling or call the store.</p><p>This page makes no medical, wellness, effect, or performance claims. It promises no price, potency, pack size, flavour, device life, or quantity. Its purpose is a durable name route connected to the relevant menu lane.</p></section>
    <section><h2>Frequently asked questions</h2>{questions.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section></article></main>;
}

