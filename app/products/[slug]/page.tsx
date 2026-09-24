import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Chrome";
import Leaf from "@/components/Leaf";
import FlowerPrices from "@/components/FlowerPrices";
import StructuredData from "@/components/StructuredData";
import { getMenu } from "@/lib/menu";
import { CATEGORIES, PREVIEW_NOTICE, SITE, meta } from "@/lib/site";
import { tierDisplayName } from "@/lib/tiers.mjs";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
const currency = (amount: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const menu = await getMenu();
  const p = menu.products.find((p) => p.slug === slug);
  return meta(p?.name || "Product preview", "Product details from the temporary CHC01 source. Preston product availability and pricing are unconfirmed.", `/products/${slug}`);
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const menu = await getMenu();
  const p = menu.products.find((p) => p.slug === slug);
  if (!p) {
    if (menu.state !== "connected") return <main id="main" className="page-wrap"><div className="page-heading"><h1>Product source unavailable</h1><p>We cannot load this product right now. This is a temporary connection issue.</p><Link className="button" href="/menu">Back to the menu</Link></div></main>;
    notFound();
  }
  const c = CATEGORIES.find((c) => c.slug === p.category);
  const items = [{ name: "Menu", href: "/menu" }, { name: p.name, href: `/products/${slug}` }];
  return <main id="main" className="page-wrap">
    <Breadcrumbs items={items}/><StructuredData items={items}/>
    <div className="product-detail">
      <div className="detail-image">{p.image ? <Image src={p.image} alt={p.name} fill unoptimized sizes="(max-width:650px) 90vw, 45vw"/> : <Leaf/>}</div>
      <div><span className="eyebrow">{c?.name || "MENU PREVIEW"}</span><h1>{p.name}</h1><p className="source-notice">{PREVIEW_NOTICE}</p>
        <dl><dt>Source catalogue</dt><dd>CHC01</dd>
          {p.tier && <><dt>Menu tier</dt><dd>{tierDisplayName(p.tier)}</dd></>}
          {p.type && <><dt>Source type</dt><dd>{p.type}</dd></>}
          {p.thc && <><dt>Source-listed THC</dt><dd>{p.thc}</dd></>}
          {p.mg && <><dt>Source-listed amount</dt><dd>{p.mg}</dd></>}
        </dl>
        {p.category === "flower" ? <FlowerPrices prices={p.prices}/> : <ul className="price-list">{p.prices.map((price) => <li key={price.label}><span>{price.label}</span><span>{price.sale && <><span className="sr-only">Source regular price </span><del>{currency(price.regular)}</del> </>}{currency(price.amount)}</span></li>)}</ul>}
        <p className="quiet-note">Source-listed details and prices are for the CHC01 preview. No Preston stock or price is confirmed.</p>
        <div className="button-row" style={{ marginTop: 25 }}><a className="button" href={SITE.tel}>Ask about Preston ↗</a><Link className="text-link" href={c ? `/menu/${c.slug}` : "/menu"}>Back to collection →</Link></div>
      </div>
    </div>
  </main>;
}
