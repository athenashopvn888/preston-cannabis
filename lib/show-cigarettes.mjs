/** Site-wide cigarette switch. Unset env defaults to hidden. */
const VAPE_PATH = "/nicotine-vape";

export function showCigarettes() {
  const raw = process.env.NEXT_PUBLIC_SHOW_CIGARETTES;
  if (raw == null || String(raw).trim() === "") return false;
  return /^(1|true|yes|on)$/i.test(String(raw).trim());
}

export const SHOW_CIGARETTES = showCigarettes();

const KEPT_ACCESSORY = /\b(backwoods?|cigarillos?)\b|\brolling\s+papers?\b/i;
const NON_CIGARETTE_NICOTINE = /\b(zyn|z[\s-]?pods?|nicotine\s+pouches?|pouches?|vapes?|disposables?|e-?liquids?)\b/i;
const CIGARETTE_WORD = /\b(cigarettes?|tobaccos?|marlboros?|belmonts?)\b/i;
const CIGARETTE_NAME = /\b(cigarettes?|tobaccos?|marlboros?|belmonts?|du\s*monts?|rolled\s+golds?|playfares?|putters?|grabbas?|cartons?|canadian\s+classics|canadian\s+goose|canadian\s+full|canadian\s+lights|canadian\s+menthol|bb\s*full|bb\s*lights?|dks)\b/i;
const CIGARETTE_SLUG = /(cigarette|tobacco|marlboro|belmont|rolled-gold|playfare|putter|grabba|carton|canadian-classic|canadian-goose|canadian-full|canadian-light|canadian-menthol|nexus|bb-full|bb-light|(^|-)dks($|-)|du-mont)/;

/** Native-cigarette guides. Backwoods stays up with the other kept accessories. */
export const NATIVE_CIG_GUIDE_SLUGS = [
  "canadian-classics",
  "nexus-cigarettes",
  "canadian-goose",
  "putters",
  "time-cigarettes",
  "rolled-gold",
  "canadian-cigarettes",
  "backwoods",
  "grabba",
  "playfares",
  "bb-cigarettes",
  "dks-cigarettes",
  "belmont-king-size",
];

const KEPT_GUIDE_SLUGS = new Set(["backwoods"]);

export function isCigaretteOrTobaccoItem(item) {
  const name = String(item?.name || "");
  const category = String(item?.category || "");
  if (KEPT_ACCESSORY.test(name)) return false;
  if (NON_CIGARETTE_NICOTINE.test(name) && !CIGARETTE_WORD.test(name)) return false;
  if (/cigarette/i.test(category)) return true;
  return CIGARETTE_NAME.test(name);
}

export function isHiddenCigaretteGuide(slug) {
  if (showCigarettes()) return false;
  if (KEPT_GUIDE_SLUGS.has(slug) || /backwoods|cigarillo|rolling-paper/.test(String(slug))) return false;
  return NATIVE_CIG_GUIDE_SLUGS.includes(slug);
}

export function isCigaretteProductSlug(slug) {
  if (showCigarettes()) return false;
  const value = String(slug || "");
  if (/backwoods|cigarillo|rolling-paper|zyn|pouch|vape|zpod/.test(value)) return false;
  if (CIGARETTE_SLUG.test(value)) return true;
  return isCigaretteOrTobaccoItem({ name: value.replace(/-/g, " ") });
}

export function cigaretteRedirectTarget(pathname) {
  if (showCigarettes()) return null;
  const path = String(pathname || "").split("?")[0].replace(/\/+$/, "") || "/";
  if (path === "/native-cigarettes" || path === "/menu/cigarettes" || path === "/items/cigarettes") return VAPE_PATH;
  const guide = path.match(/^\/guides\/([^/]+)$/);
  if (guide && isHiddenCigaretteGuide(guide[1])) return VAPE_PATH;
  const product = path.match(/^\/products\/([^/]+)$/);
  if (product && isCigaretteProductSlug(product[1])) return VAPE_PATH;
  return null;
}

export function isCigaretteHref(href) {
  return cigaretteRedirectTarget(href) != null;
}

export function itemsCatchallRedirect() {
  if (showCigarettes()) {
    return { source: "/items/:category", destination: "/menu/:category", permanent: true };
  }
  return { source: "/items/:category((?!cigarettes$).*)", destination: "/menu/:category", permanent: true };
}

function swap(text, from, to) {
  return text.split(from).join(to);
}

/** Drop cigarette wording. Kept accessory names and unrelated sentences stay. */
export function gateCigarettePhrase(text) {
  if (showCigarettes() || typeof text !== "string") return text;
  let next = text;
  next = swap(next, "the Native cigarettes and nicotine vape shelves", "the nicotine vape shelf");
  next = swap(next, "Native cigarettes and nicotine vape shelves", "the nicotine vape shelf");
  next = swap(next, "cigarette and nicotine shelves", "nicotine shelves");
  next = swap(next, "flower tiers, Native cigarettes, nicotine vapes", "flower tiers, nicotine vapes");
  next = swap(next, "strains, Native Cigarettes, Nicotine Vape", "strains, Nicotine Vape");
  const parts = next.split(/(?<=[.!?])\s+/);
  const kept = parts.filter((part) => part.trim() && !CIGARETTE_WORD.test(part));
  return kept.join(" ").replace(/[ ]{2,}/g, " ").trim();
}

export function gateFaqEntries(faqs) {
  if (!Array.isArray(faqs)) return faqs;
  if (showCigarettes()) return faqs;
  return faqs
    .map((faq) => ({
      ...faq,
      question: gateCigarettePhrase(faq.question),
      answer: gateCigarettePhrase(faq.answer),
    }))
    .filter((faq) => faq.question && faq.answer);
}

export function isGatedInfoSurface(path) {
  return path === "/faq" || path.startsWith("/info/") || path === "/resources" || path.startsWith("/resources/");
}

export function gateLandingFields(path, page) {
  if (showCigarettes() || !page || !isGatedInfoSurface(path)) return page;
  const text = (value) => (typeof value === "string" ? gateCigarettePhrase(value) : value);
  const sections = (page.sections || [])
    .map((section) => ({
      ...section,
      heading: text(section.heading),
      paragraphs: (section.paragraphs || []).map(text).filter(Boolean),
    }))
    .filter((section) => section.heading && section.paragraphs.length);
  const faqs = (page.faqs || [])
    .map((faq) => ({ ...faq, question: text(faq.question), answer: text(faq.answer) }))
    .filter((faq) => faq.question && faq.answer);
  const relatedLinks = (page.relatedLinks || [])
    .filter((link) => !isCigaretteHref(link.href))
    .map((link) => ({ ...link, label: text(link.label) }));
  const intro = (page.intro || []).map(text).filter(Boolean);
  return {
    ...page,
    title: text(page.title) || page.title,
    description: text(page.description) || page.description,
    h1: text(page.h1) || page.h1,
    intro: intro.length ? intro : page.intro,
    sections,
    faqs,
    relatedLinks,
    cta: page.cta
      ? { ...page.cta, label: text(page.cta.label) || page.cta.label, href: isCigaretteHref(page.cta.href) ? VAPE_PATH : page.cta.href }
      : page.cta,
  };
}
