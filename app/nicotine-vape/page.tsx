import Link from "next/link";
import { Breadcrumbs } from "@/components/Chrome";
import { meta, SITE, PREVIEW_NOTICE } from "@/lib/site";
import { jsonLd, simplePageGraph } from "@/lib/landing-schema.mjs";
import { NICOTINE_VAPE_COPY } from "@/lib/content-hub.mjs";

const pageMeta = meta(NICOTINE_VAPE_COPY.title, NICOTINE_VAPE_COPY.description, "/nicotine-vape");
export const metadata = { ...pageMeta, title: { absolute: NICOTINE_VAPE_COPY.title }, openGraph: { ...pageMeta.openGraph, title: NICOTINE_VAPE_COPY.title } };

export default function NicotineVapePage() {
  const schema = simplePageGraph(SITE, { path: "/nicotine-vape", title: NICOTINE_VAPE_COPY.h1, description: NICOTINE_VAPE_COPY.description, faqs: NICOTINE_VAPE_COPY.faqs });
  return <main id="main" className="page-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}/>
    <Breadcrumbs items={[{ name: "Nicotine vapes", href: "/nicotine-vape" }]}/>
    <div className="page-heading">
      <span className="eyebrow">NICOTINE PILLAR</span>
      <h1>{NICOTINE_VAPE_COPY.h1}</h1>
      <p>{NICOTINE_VAPE_COPY.intro}</p>
      <p className="quiet-note">{PREVIEW_NOTICE}</p>
    </div>
    {NICOTINE_VAPE_COPY.sections.map((section) => (
      <article key={section.heading} style={{marginBottom: 28}}>
        <h2>{section.heading}</h2>
        <p>{section.body}</p>
      </article>
    ))}
    <div className="button-row" style={{marginBottom: 36}}>
      <Link className="button" href="/menu/nicotine-vapes">Open nicotine vapes collection</Link>
      <Link className="button secondary" href="/menu/vape-disposables">THC disposables (separate)</Link>
    </div>
    <section className="faq-section" style={{paddingInline: 0}}>
      <div><span className="eyebrow">VAPE FAQ</span><h2>Nicotine shelf<br/><em>notes.</em></h2></div>
      <div className="faq-list">{NICOTINE_VAPE_COPY.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
  </main>;
}
