export type LandingLink = { label: string; href: string };
export type LandingCopy = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow?: string;
  lang?: "en-CA" | "fr-CA";
  intro: string[];
  cta: LandingLink;
  sections: { heading: string; paragraphs: string[]; links?: LandingLink[] }[];
  faqs?: { question: string; answer: string }[];
  faqHeading?: string;
  relatedHeading?: string;
  relatedLinks?: LandingLink[];
  breadcrumbs: { name: string; href: string }[];
};
