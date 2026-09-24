"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Menu, Product } from "@/lib/menu";
import { CATEGORIES, PREVIEW_NOTICE, TIERS } from "@/lib/site";
import { matchesInventoryTier, tierDisplayName } from "@/lib/tiers.mjs";
import Leaf from "./Leaf";
import FlowerPrices from "./FlowerPrices";
const currency = (amount: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  return <div className="product-image">{product.image && !failed ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 260px" unoptimized onError={() => setFailed(true)} /> : <Leaf />}<span>{product.category === "flower" ? tierDisplayName(product.tier) || "Flower" : CATEGORIES.find((c) => c.slug === product.category)?.name || "Other"}</span></div>;
}
export default function MenuGrid({ menu, category, tier }: { menu: Menu; category?: string; tier?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(category || "all");
  const [sort, setSort] = useState("name");
  const [type, setType] = useState("all");
  const products = useMemo(() => menu.products.filter((p) => (!category || p.category === category) && (!tier || matchesInventoryTier(p.tier, tier)) && (selected === "all" || p.category === selected) && (type === "all" || p.type.toLowerCase() === type) && `${p.name} ${p.category} ${tierDisplayName(p.tier)}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "price" ? Math.min(...a.prices.map((v) => v.amount)) - Math.min(...b.prices.map((v) => v.amount)) : a.name.localeCompare(b.name)), [menu.products, category, tier, selected, query, sort, type]);
  return <div><div className="source-notice"><span className="status-dot"/><div><strong>{PREVIEW_NOTICE}</strong><p>{menu.state === "connected" ? `${menu.products.length} source entries · Listed prices belong to CHC01.` : menu.state === "unconfigured" ? "The temporary menu connection is being prepared." : "The temporary source is unavailable. Please try again later."}</p>{menu.state === "connected" && <details className="source-details"><summary>Menu source &amp; date</summary><p>Source date: {menu.stockDate ? new Date(menu.stockDate).toLocaleString("en-CA", { timeZone: "America/Toronto", timeZoneName: "short" }) : "not supplied"}. Checked: {new Date(menu.fetchedAt).toLocaleString("en-CA", { timeZone: "America/Toronto", timeZoneName: "short" })}. {menu.sourceIdentity === "response-validated" ? "CHC01 response identity confirmed." : "Requested CHC01; source response does not identify its store."}</p></details>}</div></div>
    <div className="menu-controls"><label className="search"><span className="sr-only">Search products</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Search the menu…" value={query} onChange={(e) => setQuery(e.target.value)} /></label><label><span className="sr-only">Sort products</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Name: A–Z</option><option value="price">Price: low to high</option></select></label><label><span className="sr-only">Strain type</span><select value={type} onChange={(e) => setType(e.target.value)}><option value="all">All strain types</option><option value="indica">Indica</option><option value="sativa">Sativa</option><option value="hybrid">Hybrid</option></select></label></div>
    {!category && <div className="filter-row" aria-label="Filter by category"><button className={selected === "all" ? "active" : ""} onClick={() => setSelected("all")}>All products</button>{CATEGORIES.map((c) => <button key={c.slug} className={selected === c.slug ? "active" : ""} onClick={() => setSelected(c.slug)}>{c.name}</button>)}</div>}
    {(category === "flower" || tier) && <nav className="filter-row" aria-label="Weed tiers">{TIERS.map((t) => <Link href={`/${t.slug}`} key={t.slug} className={tier === t.inventoryTier ? "active" : ""}>{t.name}</Link>)}</nav>}
    <div className="result-line" role="status">{products.length} {products.length === 1 ? "product" : "products"}<span>CHC01 PREVIEW</span></div>
    <div className="product-grid">{products.map((p) => <Link href={`/products/${p.slug}`} key={p.id} className="product-card"><ProductImage product={p}/><div className="product-copy"><p className="product-type">{p.type || "Menu preview"}{p.thc && ` · THC ${p.thc}`}</p><h3>{p.name}</h3>{p.category === "flower" ? <><FlowerPrices prices={p.prices} compact/><div className="product-bottom flower-details-link"><span>View details</span><span aria-hidden="true">↗</span></div></> : <div className="product-bottom"><span>{p.prices.length ? `From ${currency(Math.min(...p.prices.map((v) => v.amount)))}` : "Price unconfirmed"}</span><span aria-hidden="true">↗</span></div>}</div></Link>)}</div>
    {!products.length && <div className="empty-state"><Leaf/><h3>{menu.state === "connected" ? "No matching products" : menu.state === "unavailable" ? "Temporary menu unavailable" : "Menu connection pending"}</h3><p>{menu.state === "connected" ? "Try another category or clear your search." : "We’ll show the temporary catalogue here once the source is connected."}</p>{menu.state === "connected" ? <button className="button secondary" onClick={() => { setQuery(""); setSelected(category || "all"); setType("all"); }}>Reset filters</button> : <button className="button secondary" onClick={() => router.refresh()}>Retry menu connection</button>}</div>}
  </div>;
}
