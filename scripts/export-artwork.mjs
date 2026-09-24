// Mechanical WebP export only; original generated artwork is unchanged.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const source = "C:/Users/ADMIN/.codex/generated_images/01a0718e-aa91-7611-8ed9-514154d246e7/";
const entries = [
  ["hero", "exec-a9174c6d-4d48-460d-af59-be3c8ee4a33a.png"],
  ["exotic", "exec-e5782a9c-358f-4643-a975-0b5e23869d5c.png"],
  ["premium", "exec-509afdc6-586e-4d0b-ae32-ac4e74403278.png"],
  ["aaa", "exec-94fb8bec-d4dd-483b-971b-ebc2ace2ebb6.png"],
  ["aa", "exec-db733bd5-64b2-4ea8-8813-50977723e087.png"],
  ["budget", "exec-40b95586-a733-44c1-8ddd-f1de60046e96.png"],
];
await mkdir("public/artwork", { recursive: true });
for (const [name, filename] of entries) {
  const output = await sharp(source + filename).resize({ width: name === "hero" ? 1536 : 1200, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/artwork/${name}.webp`);
  console.log(`${name}.webp: ${output.width}x${output.height}, ${output.size} bytes`);
}
