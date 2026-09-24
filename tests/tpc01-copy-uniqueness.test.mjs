import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  HOME_FAQS,
  HOME_HUB_CARDS,
  HOURS_COPY,
  NATIVE_CIG_COPY,
  NICOTINE_VAPE_COPY,
  VISIT_COPY,
  TIER_PAGE_COPY,
  CORRIDOR_NEIGHBOURHOODS,
} from "../lib/content-hub.mjs";

const editorial = readFileSync(new URL("../lib/editorial.ts", import.meta.url), "utf8");
const homePage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const visitPage = readFileSync(new URL("../app/visit/page.tsx", import.meta.url), "utf8");
const fixture = JSON.parse(readFileSync(new URL("./fixtures/peer-sentences-scc-chc.json", import.meta.url), "utf8"));
const peerSet = new Set(fixture.sentences.map((s) => s.toLowerCase()));

function collectSentences(value, bag = []) {
  if (typeof value === "string") {
    for (const part of value.split(/(?<=[.!?])\s+/)) {
      const s = part.trim();
      if (s.length >= 60) bag.push(s);
    }
  } else if (Array.isArray(value)) {
    for (const item of value) collectSentences(item, bag);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectSentences(item, bag);
  }
  return bag;
}

test("TPC01 copy shares fewer than 4 long sentences with live SCC/CHC peers", () => {
  assert.ok(fixture.sentences.length > 40, "fixture should include peer sentences");
  assert.ok(CORRIDOR_NEIGHBOURHOODS.includes("Little Italy"));
  const ours = collectSentences({
    HOME_FAQS,
    HOME_HUB_CARDS,
    VISIT_COPY,
    HOURS_COPY,
    NATIVE_CIG_COPY,
    NICOTINE_VAPE_COPY,
    TIER_PAGE_COPY,
    editorial,
    homePage,
    visitPage,
  });
  assert.ok(ours.length > 20, `preston corpus too small: ${ours.length}`);
  const shared = [...new Set(ours.map((s) => s.toLowerCase()))].filter((s) => peerSet.has(s));
  assert.ok(shared.length < 4, `shared long sentences (${shared.length}):\n${shared.join("\n")}`);
});
