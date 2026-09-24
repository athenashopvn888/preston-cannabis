import Link from "next/link";
import { SITE } from "@/lib/site";
import { HOURS_STATUS } from "@/lib/content-hub.mjs";
import Leaf from "./Leaf";

export function Header() {
  return <>
    <div className="topbar"><span>PRESTON STREET · LITTLE ITALY · OTTAWA</span><span>ADULTS 19+</span></div>
    <header className="header">
      <Link className="brand" href="/" aria-label="Preston Cannabis home"><Leaf /><span>Preston<small>CANNABIS</small></span></Link>
      <nav aria-label="Main navigation">
        <Link href="/menu">Explore menu</Link>
        <Link href="/visit">Visit</Link>
        <Link href="/native-cigarettes">Native cigarettes</Link>
        <Link href="/faq">FAQs</Link>
      </nav>
      <a className="header-call" href={SITE.tel}>{SITE.phone} <span aria-hidden="true">→</span></a>
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <Link className="brand" href="/"><Leaf /><span>Preston<small>CANNABIS</small></span></Link>
      <div>
        <h2>Find us on Preston.</h2>
        <p>{SITE.fullAddress}</p>
        <a href={SITE.tel}>{SITE.phone}</a>
        <p className="quiet-note" style={{marginTop: 8}}>{HOURS_STATUS.summary}</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/menu">Menu</Link>
        <Link href="/visit">Visit & directions</Link>
        <Link href="/hours">Hours guidance</Link>
        <Link href="/native-cigarettes">Native cigarettes</Link>
        <Link href="/nicotine-vape">Nicotine vapes</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/faq">Questions & answers</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/delivery">Delivery information</Link>
      </nav>
    </div>
    <div className="footer-base">
      <span>© {new Date().getFullYear()} Preston Cannabis · Adults 19+</span>
      <span>Ottawa, Ontario</span>
    </div>
  </footer>;
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item) => <span key={item.href}><span aria-hidden="true"> / </span><Link href={item.href}>{item.name}</Link></span>)}</nav>;
}
