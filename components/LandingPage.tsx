import Link from "next/link";
import { Breadcrumbs } from "./Chrome";
import StructuredData from "./StructuredData";
import { SITE, meta } from "@/lib/site";
import { jsonLd, landingGraph } from "@/lib/landing-schema.mjs";
import type { LandingCopy } from "@/lib/landing-types";
import approvedCopy from "@/lib/landing-copy.json";

export function landingMetadata(page: LandingCopy) {
  const data = meta(page.title, page.description, page.path);
  return { ...data, title: { absolute: page.title }, openGraph: { ...data.openGraph, title: page.title, locale: page.lang === "fr-CA" ? "fr_CA" : "en_CA" }, twitter: { ...data.twitter, title: page.title } };
}

export default function LandingPage({ page }: { page: LandingCopy }) {
  return <main id="main" className="page-wrap" lang={page.lang ?? "en-CA"}>
    <Breadcrumbs items={page.breadcrumbs}/>
    <StructuredData items={page.breadcrumbs}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(landingGraph(SITE, page)) }}/>
    <div className="page-heading">
      {page.eyebrow && <span className="eyebrow">{page.eyebrow}</span>}
      <h1>{page.h1}</h1>
      {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className="button-row"><Link className="button" href={page.cta.href}>{page.cta.label} →</Link>{page.path === "/contact" && <><a className="text-link" href={SITE.tel}>{SITE.phone} ↗</a><a className="text-link" href={SITE.maps} target="_blank" rel="noopener noreferrer">Open Google Maps ↗</a></>}</div>
    </div>
    <article className="editorial">
      {page.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.links && <nav className="filter-row" aria-label={section.heading}>{section.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>}
      </section>)}
      {!!page.faqs?.length && <section><h2>{page.faqHeading}</h2><div className="faq-list">{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>}
      {!!page.relatedLinks?.length && <section className="related-links"><h2>{page.relatedHeading}</h2><nav aria-label={page.relatedHeading}>{page.relatedLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></section>}
      {page.path === "/resources" && <nav className="landing-directory" aria-label={page.h1}>{approvedCopy.filter((entry) => entry.path !== page.path).map((entry) => <Link key={entry.path} href={entry.path}>{entry.h1}<span aria-hidden="true">→</span></Link>)}</nav>}
    </article>
  </main>;
}
