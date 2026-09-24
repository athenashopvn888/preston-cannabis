import Link from "next/link";
import { Breadcrumbs } from "@/components/Chrome";
import { meta, SITE } from "@/lib/site";
import { jsonLd, simplePageGraph } from "@/lib/landing-schema.mjs";
import { NATIVE_CIG_COPY } from "@/lib/content-hub.mjs";

const pageMeta = meta(NATIVE_CIG_COPY.title, NATIVE_CIG_COPY.description, "/native-cigarettes");
export const metadata = { ...pageMeta, title: { absolute: NATIVE_CIG_COPY.title }, openGraph: { ...pageMeta.openGraph, title: NATIVE_CIG_COPY.title } };

export default function NativeCigarettesPage() {
  const schema = simplePageGraph(SITE, { path: "/native-cigarettes", title: NATIVE_CIG_COPY.h1, description: NATIVE_CIG_COPY.description, faqs: NATIVE_CIG_COPY.faqs });
  return <main id="main" className="page-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}/>
    <Breadcrumbs items={[{ name: "Native cigarettes", href: "/native-cigarettes" }]}/>
    <div className="page-heading">
      <span className="eyebrow">MERCHANDISE CATEGORY</span>
      <h1>{NATIVE_CIG_COPY.h1}</h1>
      <p>{NATIVE_CIG_COPY.intro}</p>
    </div>
    {NATIVE_CIG_COPY.sections.map((section) => (
      <article key={section.heading} style={{marginBottom: 28}}>
        <h2>{section.heading}</h2>
        <p>{section.body}</p>
      </article>
    ))}
    <div className="button-row" style={{marginBottom: 36}}>
      <Link className="button" href="/menu/cigarettes">Open cigarettes collection</Link>
      <Link className="button secondary" href="/visit">Visit Preston St</Link>
    </div>
    <section className="faq-section" style={{paddingInline: 0}}>
      <div><span className="eyebrow">SHELF FAQ</span><h2>Native cigarettes<br/><em>clarified.</em></h2></div>
      <div className="faq-list">{NATIVE_CIG_COPY.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
  </main>;
}
