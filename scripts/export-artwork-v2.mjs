// Mechanical web export only. Hero, Exotic and previous variants stay intact.
import sharp from "sharp";
import { readFile } from "node:fs/promises";
const source = "C:/Users/ADMIN/.codex/generated_images/01a0718e-aa91-7611-8ed9-514154d246e7/";
const protectedNames = ["hero", "exotic", "premium", "aaa", "aa", "budget"];
const before = await Promise.all(protectedNames.map((name) => readFile(`public/artwork/${name}.webp`)));
const entries = [
  ["premium-v2", "exec-d26cb801-a435-4d35-9856-767a0843197a.png"],
  ["aaa-v2", "exec-c114d0a4-9e0a-4a49-a2c8-69aad547ff4d.png"],
  ["aa-v2", "exec-d56c248e-78b1-4695-b9f2-df484b603345.png"],
  ["budget-v2", "exec-40cc252d-3435-47d0-9bd6-7dbcf24bb574.png"],
  ["category-flower-v2", "exec-f4ea819d-e830-4009-b166-acd2c84aeae0.png"],
  ["category-prerolls-v2", "exec-6dc9d092-c223-4ddf-97d4-50c4cb9f69b6.png"],
  ["category-vapes-v2", "exec-4d5607e6-6b68-43c5-8b53-54cfe6605985.png"],
  ["category-edibles-v2", "exec-9cf4b261-780f-4e9c-b30a-cf2cd2f17215.png"],
  ["category-concentrates-v2", "exec-a925017b-3d1d-4e0d-96e6-1ab1138d8e28.png"],
  ["category-accessories-v2", "exec-28fa5e5d-b67e-42de-be2f-7f36b5576df9.png"],
  ["preston-panel-v2", "exec-8e33f915-a12a-41ae-a4ce-8fec79d455aa.png"],
];
for (const [name, file] of entries) {
  const output = await sharp(source + file).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/artwork/${name}.webp`);
  console.log(`${name}.webp: ${output.width}x${output.height}, ${output.size} bytes`);
}
for (let index = 0; index < protectedNames.length; index++) {
  const current = await readFile(`public/artwork/${protectedNames[index]}.webp`);
  if (!before[index].equals(current)) throw new Error(`Protected artwork unexpectedly changed: ${protectedNames[index]}`);
}
console.log("Hero, Exotic and all original variants are byte-for-byte unchanged.");
