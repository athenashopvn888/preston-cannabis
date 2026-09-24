import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("owner-corrected street address and map target remain consistent", () => {
  const site = fs.readFileSync(new URL("../lib/site.ts", import.meta.url), "utf8");
  assert.match(site, /address: "268 Preston St"/);
  assert.match(site, /fullAddress: "268 Preston St, Ottawa, ON K1R 7R6"/);
  assert.match(site, /phone: "343-804-9020"/);
  assert.match(site, /domain: "https:\/\/prestoncannabis\.com"/);
  const maps = new URL(site.match(/maps: "([^"]+)"/)[1]);
  assert.equal(maps.hostname, "www.google.com");
  assert.equal(maps.searchParams.get("query"), "268 Preston St, Ottawa, ON K1R 7R6");
  assert.match(site, /INDEXABLE = true/);
  for (const file of ["lib/site.ts", "lib/editorial.ts", "app/page.tsx", "app/contact/page.tsx"]) {
    const content = fs.readFileSync(new URL("../" + file, import.meta.url), "utf8");
    assert.doesNotMatch(content, /286\s+PRESTON/i);
    assert.doesNotMatch(content, /maps\.app\.goo\.gl\/x3bXNjnsHsgw5FE16/);
    assert.doesNotMatch(content, /K1R 7R5/);
  }
});
