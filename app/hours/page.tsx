import Link from "next/link";
import { Breadcrumbs } from "@/components/Chrome";
import { meta, SITE } from "@/lib/site";
import { jsonLd, simplePageGraph } from "@/lib/landing-schema.mjs";
import { HOURS_COPY, HOURS_STATUS } from "@/lib/content-hub.mjs";

const pageMeta = meta(HOURS_COPY.title, HOURS_COPY.description, "/hours");
export const metadata = { ...pageMeta, title: { absolute: HOURS_COPY.title }, openGraph: { ...pageMeta.openGraph, title: HOURS_COPY.title } };

export default function HoursPage() {
  const schema = simplePageGraph(SITE, { path: "/hours", title: HOURS_COPY.h1, description: HOURS_COPY.description, faqs: HOURS_COPY.faqs });
  return <main id="main" className="page-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}/>
    <Breadcrumbs items={[{ name: "Hours", href: "/hours" }]}/>
    <div className="page-heading">
      <span className="eyebrow">HOURS HONESTY</span>
      <h1>{HOURS_COPY.h1}</h1>
      <p>{HOURS_COPY.intro}</p>
      <p className="quiet-note">{HOURS_STATUS.summary}</p>
    </div>
    
    <div className="info-card" style={{marginBottom: 28}}>
      <h2>Weekly hours</h2>
      <ul style={{listStyle: "none", padding: 0, margin: 0}}>
        {HOURS_STATUS.weekly.map((row) => (
          <li key={row.dayOfWeek} style={{display: "flex", justifyContent: "space-between", gap: 16, padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.08)"}}>
            <span>{row.dayOfWeek}</span>
            <strong>{row.label}</strong>
          </li>
        ))}
      </ul>
      <p className="quiet-note" style={{marginTop: 12}}>Times are Ottawa local. Closes after midnight stay attached to the day the shift began.</p>
    </div>

    {HOURS_COPY.sections.map((section) => (
      <article key={section.heading} style={{marginBottom: 28}}>
        <h2>{section.heading}</h2>
        <p>{section.body}</p>
      </article>
    ))}
    <div className="button-row" style={{marginBottom: 36}}>
      <a className="button" href={SITE.tel}>Call {SITE.phone}</a>
      <Link className="button secondary" href="/visit">Visit directions</Link>
    </div>
    <section className="faq-section" style={{paddingInline: 0}}>
      <div><span className="eyebrow">HOURS FAQ</span><h2>Quick<br/><em>clarifications.</em></h2></div>
      <div className="faq-list">{HOURS_COPY.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
  </main>;
}
