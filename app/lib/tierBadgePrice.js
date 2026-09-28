/**
 * Per-gram label for the /tv tier badge.
 *
 * Uses the smallest listed weight on each flower. TPC01 sells price5g as 5g
 * on every tier (never 6g). The badge shows the most common real rate in
 * that tier. It never substitutes a catalog default.
 */

const PRICE_FIELDS = [
  ["price3g", 3],
  ["price5g", 5],
  ["price14g", 14],
  ["price28g", 28],
];

function gramsForField(field) {
  const row = PRICE_FIELDS.find(([name]) => name === field);
  return row ? row[1] : 0;
}

function amountOf(pricePoint) {
  if (!pricePoint || typeof pricePoint !== "object") return null;
  const regular = pricePoint.regular;
  if (typeof regular === "number" && Number.isFinite(regular) && regular > 0) return regular;
  const sale = pricePoint.sale;
  if (typeof sale === "number" && Number.isFinite(sale) && sale > 0) return sale;
  return null;
}

function flowerPerGram(flower) {
  if (!flower || typeof flower !== "object") return null;
  for (const [field, grams] of PRICE_FIELDS) {
    const amount = amountOf(flower[field]);
    if (amount == null || grams <= 0) continue;
    return amount / grams;
  }
  return null;
}

function formatPerGram(perGram) {
  const rounded = Math.round(perGram * 100) / 100;
  if (!Number.isFinite(rounded) || rounded <= 0) return null;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
  return `$${text}/g`;
}

function tierPerGramLabel(_tier, flowers) {
  if (!Array.isArray(flowers) || flowers.length === 0) return null;
  const counts = new Map();
  for (const flower of flowers) {
    const per = flowerPerGram(flower);
    if (per == null) continue;
    const key = (Math.round(per * 100) / 100).toFixed(2);
    const perValue = Number(key);
    if (!Number.isFinite(perValue) || perValue <= 0) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  let bestKey = null;
  let bestCount = 0;
  for (const [key, count] of counts) {
    if (count > bestCount) {
      bestKey = key;
      bestCount = count;
    }
  }
  if (!bestKey) return null;
  return formatPerGram(Number(bestKey));
}

module.exports = {
  gramsForField,
  flowerPerGram,
  tierPerGramLabel,
};
