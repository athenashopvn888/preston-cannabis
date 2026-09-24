import Link from "next/link";
import { Breadcrumbs } from "@/components/Chrome";
import { meta, SITE } from "@/lib/site";
import { jsonLd, simplePageGraph } from "@/lib/landing-schema.mjs";
import { VISIT_COPY, HOURS_STATUS } from "@/lib/content-hub.mjs";

const pageMeta = meta(VISIT_COPY.title, VISIT_COPY.description, "/visit");
export const metadata = { ...pageMeta, title: { absolute: VISIT_COPY.title }, openGraph: { ...pageMeta.openGraph, title: VISIT_COPY.title } };

export default function VisitPage() {
  const schema = simplePageGraph(SITE, { path: "/visit", title: VISIT_COPY.h1, description: VISIT_COPY.description, faqs: VISIT_COPY.faqs });
  return <main id="main" className="page-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}/>
    <Breadcrumbs items={[{ name: "Visit", href: "/visit" }]}/>
    <div className="page-heading">
      <span className="eyebrow">REACH THE DOOR</span>
      <h1>{VISIT_COPY.h1}</h1>
      <p>{VISIT_COPY.intro}</p>
    </div>
    <div className="contact-grid">
      <div className="info-card">
        <h2>Store details</h2>
        <p><strong>{SITE.name}</strong><br/>{SITE.fullAddress}<br/><a href={SITE.tel}>{SITE.phone}</a></p>
        <p>{HOURS_STATUS.detail}</p>
        <div className="button-row">
          <a className="button" href={SITE.maps} target="_blank" rel="noopener noreferrer">Google Maps</a>
          <Link className="button secondary" href="/hours">Hours guidance</Link>
        </div>
      </div>
      <div className="info-card">
        <h2>Map</h2>
        <iframe
          title="Map of Preston Cannabis at 268 Preston St"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.fullAddress)}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: "100%", minHeight: 280, borderRadius: 8 }}
        />
      </div>
    </div>
    <section className="section" style={{paddingInline: 0}}>
      {VISIT_COPY.sections.map((section) => (
        <article key={section.heading} style={{marginBottom: 28}}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </article>
      ))}
    </section>
    <section className="faq-section" style={{paddingInline: 0}}>
      <div><span className="eyebrow">VISIT FAQ</span><h2>Before you<br/><em>leave home.</em></h2></div>
      <div className="faq-list">{VISIT_COPY.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
    <aside className="related-links">
      <h2>Continue</h2>
      <nav>
        <Link href="/native-cigarettes">Native cigarettes →</Link>
        <Link href="/nicotine-vape">Nicotine vapes →</Link>
        <Link href="/exotic">Exotic Weed →</Link>
        <Link href="/menu">Menu →</Link>
      </nav>
    </aside>
  </main>;
}
