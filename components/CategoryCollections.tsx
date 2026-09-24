import Link from "next/link";
import { CATEGORIES } from "@/lib/site";
import { ARTWORK } from "@/lib/artwork";
import EditorialArtwork from "./EditorialArtwork";
export default function CategoryCollections() {
  return <section className="section categories-section">
    <div className="section-heading"><div><span className="eyebrow">THE MENU</span><h2>A little exploration.<br/><em>A world of possibilities.</em></h2></div><Link className="text-link" href="/menu">View all collections ↗</Link></div>
    <div className="category-grid">{CATEGORIES.slice(0, 6).map((category, i) => <Link className={`category-card category-photo-card category-${i}`} href={`/menu/${category.slug}`} key={category.slug}>
      <EditorialArtwork asset={ARTWORK.categories[category.slug]} className="category-photo" sizes="(max-width:650px) 42vw, 30vw"/>
      <div className="category-photo-copy"><span className="category-number">0{i + 1}</span><h3>{category.name}</h3><p>{category.text}</p><span className="category-arrow" aria-hidden="true">↗</span></div>
    </Link>)}</div>
    <p className="quiet-note">Menu preview uses CHC01 temporarily. Preston products, pricing and availability are still to be confirmed.</p>
  </section>;
}
