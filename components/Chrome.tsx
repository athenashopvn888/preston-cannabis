import Link from "next/link";
import { SITE } from "@/lib/site";
import Leaf from "./Leaf";
export function Header() { return <>
  <div className="topbar"><span>PRESTON STREET · OTTAWA</span><span>ADULTS 19+</span></div>
  <header className="header"><Link className="brand" href="/" aria-label="Preston Cannabis home"><Leaf /><span>Preston<small>CANNABIS</small></span></Link><nav aria-label="Main navigation"><Link href="/menu">Explore menu</Link><Link href="/weed-dispensary-near-me">Our location</Link><Link href="/faq">FAQs</Link></nav><a className="header-call" href={SITE.tel}>{SITE.phone} <span>↗</span></a></header>
  </>; }
export function Footer() { return <footer className="footer"><div className="footer-main"><Link className="brand" href="/"><Leaf /><span>Preston<small>CANNABIS</small></span></Link><div><h2>Find us on Preston.</h2><p>{SITE.fullAddress}</p><a href={SITE.tel}>{SITE.phone}</a></div><nav aria-label="Footer navigation"><Link href="/menu">Menu preview</Link><Link href="/contact">Contact & directions</Link><Link href="/faq">Questions & answers</Link><Link href="/resources">Preston Cannabis Resources</Link><Link href="/delivery">Delivery Information</Link></nav></div><div className="footer-base"><span>© {new Date().getFullYear()} Preston Cannabis · Adults 19+</span><span>Ottawa, Ontario</span></div></footer>; }
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item) => <span key={item.href}><span aria-hidden="true"> / </span><Link href={item.href}>{item.name}</Link></span>)}</nav>; }
