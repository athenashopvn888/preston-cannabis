import test from "node:test";
import assert from "node:assert/strict";
import {
  cigaretteRedirectTarget,
  gateCigarettePhrase,
  gateFaqEntries,
  gateLandingFields,
  isCigaretteOrTobaccoItem,
  isHiddenCigaretteGuide,
  itemsCatchallRedirect,
  showCigarettes,
} from "../lib/show-cigarettes.mjs";

function withCigaretteEnv(value, run) {
  const previous = process.env.NEXT_PUBLIC_SHOW_CIGARETTES;
  if (value == null) delete process.env.NEXT_PUBLIC_SHOW_CIGARETTES;
  else process.env.NEXT_PUBLIC_SHOW_CIGARETTES = value;
  try {
    return run();
  } finally {
    if (previous == null) delete process.env.NEXT_PUBLIC_SHOW_CIGARETTES;
    else process.env.NEXT_PUBLIC_SHOW_CIGARETTES = previous;
  }
}

test("recallable cigarette switch, redirects, and kept accessories", () => {
  withCigaretteEnv(undefined, () => {
    assert.equal(showCigarettes(), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "BB FULL CARTON", category: "CIGARETTES" }), true);
    assert.equal(isCigaretteOrTobaccoItem({ name: "BELMONT KING SIZE", category: "cigarettes" }), true);
    assert.equal(isCigaretteOrTobaccoItem({ name: "GRABBA SHAKER", category: "CIGARETTES" }), true);
    assert.equal(isCigaretteOrTobaccoItem({ name: "BACKWOODS ASSORTED FLAVORS", category: "CIGARETTES" }), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "Honey Cigarillo", category: "CIGARETTES" }), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "RAW Rolling Papers", category: "accessories" }), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "ZYN NICOTINE POUCHES", category: "CIGARETTES" }), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "OVNS Pioneer", category: "VAPE PENS" }), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "Pink Kush", category: "flower" }), false);
    assert.equal(cigaretteRedirectTarget("/native-cigarettes"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/menu/cigarettes"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/items/cigarettes"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/guides/belmont-king-size"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/guides/grabba"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/guides/backwoods"), null);
    assert.equal(cigaretteRedirectTarget("/guides/pink-kush"), null);
    assert.equal(cigaretteRedirectTarget("/products/belmont-king-size-item-12"), "/nicotine-vape");
    assert.equal(cigaretteRedirectTarget("/products/backwoods-assorted-item-701"), null);
    assert.equal(isHiddenCigaretteGuide("bb-cigarettes"), true);
    assert.equal(isHiddenCigaretteGuide("backwoods"), false);
    assert.match(itemsCatchallRedirect().source, /cigarettes/);
    const faqs = gateFaqEntries([
      { question: "Where should first-time visitors start?", answer: "Use the Visit page for transit and parking notes, then browse flower tiers or the Native cigarettes and nicotine vape shelves." },
      { question: "Can I get the store price on a delivery order?", answer: "Delivery is coming soon. In-store prices are for purchases made in the store, and delivery orders will have their own prices." },
    ]);
    assert.match(faqs[0].answer, /nicotine vape shelf/);
    assert.doesNotMatch(faqs[0].answer, /cigarette/i);
    assert.match(faqs[1].answer, /Delivery is coming soon/);
    const gated = gateLandingFields("/faq", {
      title: "Preston Cannabis FAQ | Ottawa",
      description: "Answers about the Ottawa store.",
      h1: "Questions",
      intro: ["Cartons are listed on the cigarette page. Call the store for hours."],
      sections: [{ heading: "Shelf", paragraphs: ["Native cigarettes are a separate shelf.", "Hours are posted on the hours page."] }],
      faqs,
      relatedLinks: [{ href: "/menu/cigarettes", label: "Cigarettes" }, { href: "/visit", label: "Visit" }],
      cta: { href: "/contact", label: "Contact Preston Cannabis" },
    });
    assert.deepEqual(gated.intro, ["Call the store for hours."]);
    assert.deepEqual(gated.sections[0].paragraphs, ["Hours are posted on the hours page."]);
    assert.deepEqual(gated.relatedLinks.map((link) => link.href), ["/visit"]);
    assert.equal(gated.cta.href, "/contact");
    assert.equal(gateCigarettePhrase("Open 24 hours, 7 days a week."), "Open 24 hours, 7 days a week.");
    const untouched = gateLandingFields("/contact", { title: "Native cigarettes", description: "Keep", h1: "Keep", intro: ["Keep"], sections: [], faqs: [], relatedLinks: [], cta: { href: "/contact", label: "Contact" } });
    assert.equal(untouched.title, "Native cigarettes");
  });
  withCigaretteEnv("true", () => {
    assert.equal(showCigarettes(), true);
    assert.equal(cigaretteRedirectTarget("/native-cigarettes"), null);
    assert.equal(isHiddenCigaretteGuide("belmont-king-size"), false);
    assert.equal(isCigaretteOrTobaccoItem({ name: "BB FULL CARTON", category: "CIGARETTES" }), true);
    assert.equal(itemsCatchallRedirect().source, "/items/:category");
    assert.equal(itemsCatchallRedirect().permanent, true);
    const original = "Browse weed tiers, cigarette and nicotine shelves, then visit.";
    assert.equal(gateCigarettePhrase(original), original);
  });
  withCigaretteEnv("false", () => {
    assert.equal(showCigarettes(), false);
  });
});
