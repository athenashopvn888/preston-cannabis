import approvedCopy from "./landing-copy.json";
import type { LandingCopy } from "./landing-types";

// Mechanical field mapping only: source packets remain verbatim in docs.
export function getLandingCopy(path: string): LandingCopy {
  const copy = approvedCopy.find((page) => page.path === path);
  if (!copy) throw new Error(`No approved landing copy for ${path}`);
  const french = path === "/dispensaire-cannabis-pres-de-moi";
  return {
    path: copy.path, title: copy.title, description: copy.metaDescription,
    h1: copy.h1, eyebrow: copy.eyebrow, lang: french ? "fr-CA" : "en-CA",
    intro: [copy.intro], cta: copy.cta,
    sections: copy.sections.map((section) => ({ heading: section.heading, paragraphs: [section.body] })),
    faqs: copy.faqs, faqHeading: french ? "Questions fréquentes" : "Frequently asked questions",
    relatedHeading: french ? "Guides et coordonnées" : "Related guides and contact information",
    relatedLinks: copy.internalLinks,
    breadcrumbs: [...(path.startsWith("/resources/") ? [{ name: "Resources", href: "/resources" }] : []), { name: copy.h1, href: path }],
  };
}
