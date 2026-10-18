import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
test("site-wide NEW ! NOW OPEN 24HRS banner sits above the header and links to /hours", () => {
  const banner = read("components/Open24Banner.tsx");
  assert.match(banner, /"NEW ! NOW OPEN 24HRS"/);
  assert.match(read("app/globals.css"), /prefers-reduced-motion:reduce\)\{\.open24-banner::after,\.open24-new\{animation:none/);
  assert.match(banner, /href="\/hours"/);
  assert.doesNotMatch(banner, /onClick|dismiss|useState/);
  const frame = read("components/SiteFrame.tsx");
  assert.ok(frame.indexOf("<Open24Banner />") > -1 && frame.indexOf("<Open24Banner />") < frame.indexOf("<Header />"));
  assert.match(read("app/globals.css"), /\.open24-banner\{[^}]*white-space:nowrap/);
});
