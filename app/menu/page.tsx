import MenuGrid from "@/components/MenuGrid";
import { Breadcrumbs } from "@/components/Chrome";
import StructuredData from "@/components/StructuredData";
import { getMenu } from "@/lib/menu";
import { meta } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = meta("Menu preview", "Explore the temporary CHC01 product menu for the Preston Cannabis site preview. Preston availability is not yet confirmed.", "/menu");
export default async function MenuPage() { const menu = await getMenu(); return <main id="main" className="page-wrap"><Breadcrumbs items={[{ name: "Menu", href: "/menu" }]}/><StructuredData items={[{ name: "Menu", href: "/menu" }]}/><div className="page-heading"><span className="eyebrow">EXPLORE THE COLLECTIONS</span><h1>Find your format.</h1><p>Search products, explore categories and compare the details in our temporary menu preview.</p></div><MenuGrid menu={menu}/></main>; }
