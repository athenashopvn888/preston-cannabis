import Link from "next/link";
import { notFound } from "next/navigation";
import MenuGrid from "@/components/MenuGrid";
import { Breadcrumbs } from "@/components/Chrome";
import StructuredData from "@/components/StructuredData";
import { getMenu } from "@/lib/menu";
import { CATEGORIES, meta } from "@/lib/site";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({ params }: Props) { const { category } = await params; const c = CATEGORIES.find((v) => v.slug === category); return meta(c?.name || "Collection", `Browse the ${c?.name.toLowerCase() || "product"} collection at Preston Cannabis.`, `/menu/${category}`); }
export default async function CategoryPage({ params }: Props) { const { category } = await params; const c = CATEGORIES.find((v) => v.slug === category); if (!c) notFound(); const items = [{ name: "Menu", href: "/menu" }, { name: c.name, href: `/menu/${category}` }]; return <main id="main" className="page-wrap"><Breadcrumbs items={items}/><StructuredData items={items}/><div className="page-heading"><span className="eyebrow">THE COLLECTIONS</span><h1>{c.name}</h1><p>{c.text}</p></div><MenuGrid menu={await getMenu()} category={category}/><aside className="related-links"><h2>Keep exploring</h2><nav><Link href="/menu">All menu categories →</Link><Link href="/weed-dispensary-near-me">Preston Cannabis in Ottawa →</Link><Link href="/contact">Contact the store →</Link></nav></aside></main>; }
