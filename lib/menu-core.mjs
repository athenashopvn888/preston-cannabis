const text = (value) => typeof value === "string" ? value.trim().slice(0, 400) : "";
export const slugify = (value) => text(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export function categorySlug(value) {
  const key = text(value).toUpperCase().replace(/[_-]/g, " ");
  if (key.includes("PRE") && key.includes("ROLL")) return "pre-rolls";
  if (key.includes("DISPOSABLE")) return "vape-disposables";
  if (key.includes("VAPE") || key.includes("NICOTINE")) return "nicotine-vapes";
  if (key.includes("EDIBLE")) return "edibles";
  if (key.includes("CONCENTRATE") || key.includes("HASH")) return "concentrates";
  if (key.includes("CIGARETTE")) return "cigarettes";
  if (key.includes("ACCESSOR") || key.includes("ADD ON")) return "accessories";
  return "other";
}
export function safeImage(value) {
  try { const url = new URL(value); return url.protocol === "https:" && url.hostname === "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev" ? url.href : ""; } catch { return ""; }
}
// Exact fields verified in the CHC01 source contract; do not infer other weights.
export const FLOWER_PRICE_FIELDS = Object.freeze(["price3g", "price5g", "price14g", "price28g"]);
const SIX_GRAM_TIERS = new Set(["EXOTIC", "PREMIUM", "AAA+"]);
export function flowerWeightLabel(field, tier) {
  if (field === "price5g" && SIX_GRAM_TIERS.has(text(tier).toUpperCase())) return "6g";
  return field.slice(5);
}
export function flowerPrices(row) {
  return FLOWER_PRICE_FIELDS.flatMap((field) => {
    const price = row?.[field];
    if (!price || typeof price.regular !== "number" || !Number.isFinite(price.regular) || price.regular <= 0) return [];
    const sale = typeof price.sale === "number" && Number.isFinite(price.sale) && price.sale > 0 && price.sale < price.regular ? price.sale : null;
    return [{ label: flowerWeightLabel(field, row?.tier), amount: sale ?? price.regular, regular: price.regular, sale }];
  });
}
export function normalizeMenu(data, requestedStore = "CHC01") {
  if (requestedStore !== "CHC01") throw new Error("SOURCE_NOT_APPROVED");
  if (!data || !Array.isArray(data.flowers) || !Array.isArray(data.items)) throw new Error("INVALID_MENU");
  const claimedStore = data.storeCode ?? data.store;
  if (claimedStore && claimedStore !== requestedStore) throw new Error("SOURCE_MISMATCH");
  const used = new Set();
  const products = [];
  for (const [kind, rows] of [["flower", data.flowers], ["item", data.items]]) {
    for (const row of rows) {
      if (!row || !text(row.name) || !["number", "string"].includes(typeof row.sku)) continue;
      if (row.storeCode && row.storeCode !== requestedStore) throw new Error("SOURCE_MISMATCH");
      const sku = String(row.sku).trim();
      if (!sku || !/^[A-Za-z0-9_, -]+$/.test(sku)) continue;
      // Upstream rows can legitimately group several SKUs or share a SKU group
      // across different named variants. Preserve that source identity.
      const id = `${kind}-${slugify(sku)}-${slugify(row.name)}`;
      if (used.has(id)) continue;
      used.add(id);
      const prices = kind === "flower" ? flowerPrices(row) : [];
      const rawPrice = typeof row.price === "number" ? row.price : Number(text(row.price).replace(/^\$/, ""));
      if (kind === "item" && Number.isFinite(rawPrice) && rawPrice > 0) prices.push({ label: "Listed price", amount: rawPrice, regular: rawPrice, sale: null });
      products.push({ id, sku, name: text(row.name), slug: `${slugify(row.name)}-${kind}-${slugify(sku)}`, category: kind === "flower" ? "flower" : categorySlug(row.category), tier: text(row.tier), type: text(row.type), thc: text(row.thc), mg: text(row.mg), image: safeImage(row.image), prices });
    }
  }
  const date = text(data.stockDate);
  const validDate = /^\d{4}-\d{2}-\d{2}T/.test(date) && Number.isFinite(Date.parse(date));
  return { products, stockDate: validDate ? date : "", sourceIdentity: claimedStore ? "response-validated" : "request-scoped-only" };
}
