# Preston botanical artwork

Six original concept illustrations generated with the built-in image generation tool using PINKY's art direction. Parent visually inspected and approved all six before Agent X integrated them. These depict illustrative botanical arrangements, not Preston inventory, a real storefront, or product availability. Text remains live HTML rather than being embedded in artwork.

## Final prompt set

Shared direction: sophisticated realistic botanical still life, rich emerald and ivory with restrained lime, cinematic light and tactile materials. No text, logos, people, consumption, smoke, medical imagery, promotions, storefronts or representations of actual inventory. Five tier images are square; the hero is landscape 3:2.

- **Hero:** Realistic cannabis leaves, an unlabelled faceted emerald glass jar and ivory ceramic vessel on green stone. Brighter rich emerald/ivory, restrained lime, cinematic side light and tactile shadows. Subject on the right with negative space on the left; retain a usable phone crop within the central 60%.
- **Exotic Weed:** Lush layered leaves, faceted green glass, emerald stone, luminous ivory and lime veins, with cinematic macro detail. Main cluster within the central 60%.
- **Premium Weed:** Balanced symmetry, smooth green stone pedestal, leaf forms and unlabelled ivory vessel in an emerald studio. Ivory glow, subtle lime and crisp cinematic light. Compact central 60% composition.
- **AAA+ Weed:** Neat leaves and translucent unlabelled glass containers on tiered matte emerald blocks. Ivory contrast, lime light, cinematic side light, center-weighted 60% composition.
- **AA Weed:** Graceful cannabis leaf sprig and unlabelled matte ivory cylinder, layered emerald backdrop and green stone. Soft ivory light, lime accents and calm tactile realism. Central 60% composition.
- **Budget Weed:** Low leaf arrangement and unlabelled round ivory ceramic container on textured emerald stone. Brighter emerald backdrop, warm cinematic light, ivory/lime and an uncluttered compact center.

## Files and web exports

Originals preserved under `C:/Users/ADMIN/.codex/generated_images/01a0718e-aa91-7611-8ed9-514154d246e7/`.

| Slot | Original PNG | WebP export | Size |
| --- | --- | --- | --- |
| Hero | exec-a9174c6d-4d48-460d-af59-be3c8ee4a33a.png | public/artwork/hero.webp | 1536×1024; 145456 bytes |
| Exotic Weed | exec-e5782a9c-358f-4643-a975-0b5e23869d5c.png | public/artwork/exotic.webp | 1200×1200; 272234 bytes |
| Premium Weed | exec-509afdc6-586e-4d0b-ae32-ac4e74403278.png | public/artwork/premium.webp | 1200×1200; 87392 bytes |
| AAA+ Weed | exec-94fb8bec-d4dd-483b-971b-ebc2ace2ebb6.png | public/artwork/aaa.webp | 1200×1200; 142654 bytes |
| AA Weed | exec-db733bd5-64b2-4ea8-8813-50977723e087.png | public/artwork/aa.webp | 1200×1200; 142920 bytes |
| Budget Weed | exec-40b95586-a733-44c1-8ddd-f1de60046e96.png | public/artwork/budget.webp | 1200×1200; 98888 bytes |

Mechanical WebP conversion uses quality 84 and resizes square sources to 1200px without upscaling or semantic edits. Hero is priority-loaded through Next Image; tier imagery is lazy-loaded with responsive sizes. Mobile hero presents the text above a separate image crop. Alt text in `lib/artwork.ts` explicitly identifies the imagery as illustrative; tier names remain visible HTML labels.

## Revision 2 — owner screenshot feedback

The owner approved Exotic Weed exactly as shown and requested the other four tiers look like mature harvested cannabis rather than premature plants. The six category symbols and flat Preston Street panel were also identified for replacement. Hero and Exotic are unchanged, including their existing WebP bytes. All original tier variants remain available in the artwork folder.

The revised creative brief: four tiers use mature, harvested, trimmed dense buds, with no live plant leaves, growing stems or vases. Six category-specific product still lifes depict flower, unlit pre-rolls, vape devices, edible formats, concentrate formats and accessories. The Preston Street panel uses an abstract emerald brand texture with a cannabis leaf, not an invented geographic scene or storefront. It leaves a calmer upper-left area for the existing live HTML text. These are illustrations, not actual-stock or availability claims; existing SEO copy and source notices remain unchanged.

Parent generated and visually approved all eleven replacement/additional assets. Original PNGs stay in the same generated-image directory. Each new export is a distinct `-v2.webp` file, resized mechanically from 1536×1024 to 1200×800 at quality 84.

| Slot | Original PNG | WebP export | Bytes |
| --- | --- | --- | --- |
| Premium Weed v2 | exec-d26cb801-a435-4d35-9856-767a0843197a.png | premium-v2.webp | 200108 |
| AAA+ Weed v2 | exec-c114d0a4-9e0a-4a49-a2c8-69aad547ff4d.png | aaa-v2.webp | 271800 |
| AA Weed v2 | exec-d56c248e-78b1-4695-b9f2-df484b603345.png | aa-v2.webp | 152406 |
| Budget Weed v2 | exec-40cc252d-3435-47d0-9bd6-7dbcf24bb574.png | budget-v2.webp | 166372 |
| Flower category | exec-f4ea819d-e830-4009-b166-acd2c84aeae0.png | category-flower-v2.webp | 148930 |
| Pre-rolls category | exec-6dc9d092-c223-4ddf-97d4-50c4cb9f69b6.png | category-prerolls-v2.webp | 132470 |
| THC vapes category | exec-4d5607e6-6b68-43c5-8b53-54cfe6605985.png | category-vapes-v2.webp | 68244 |
| Edibles category | exec-9cf4b261-780f-4e9c-b30a-cf2cd2f17215.png | category-edibles-v2.webp | 91238 |
| Concentrates category | exec-a925017b-3d1d-4e0d-96e6-1ab1138d8e28.png | category-concentrates-v2.webp | 99772 |
| Accessories category | exec-28fa5e5d-b67e-42de-be2f-7f36b5576df9.png | category-accessories-v2.webp | 71000 |
| Preston brand panel | exec-8e33f915-a12a-41ae-a4ce-8fec79d455aa.png | preston-panel-v2.webp | 207560 |

Exports are under `public/artwork/`. `scripts/export-artwork-v2.mjs` compares the protected existing image bytes before and after export and fails if any were altered. Export verification passed for Hero, Exotic and all four old tier variants. Category imagery is lazy-loaded with 42vw mobile / 30vw desktop sizes; the abstract panel uses 100vw mobile / 50vw desktop. Copy remains separate from images, with illustrative alt descriptions.

The parent also retained all eleven exact generator prompts and output-path receipts in [artwork-revision-prompts.json](../../output/artwork-revision-prompts.json). This is the complete prompt record; the creative brief above is a readable summary.
