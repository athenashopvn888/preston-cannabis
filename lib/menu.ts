import { cache } from "react";
import { normalizeMenu, parseOnHandStock, resolveMenuStoreCode } from "./menu-core.mjs";
export type Product = { id: string; sku: string; name: string; slug: string; category: string; tier: string; type: string; thc: string; mg: string; image: string; prices: { label: string; amount: number; regular: number; sale: number | null }[] };
export type Menu = { products: Product[]; state: "connected" | "unconfigured" | "unavailable"; fetchedAt: string; stockDate: string; sourceIdentity: string; source: "TPC01" };
const MENU_FETCH_TIMEOUT_MS = 120_000;
async function fetchMenuJson(url: URL): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, { next: { revalidate: 120 }, signal: AbortSignal.timeout(MENU_FETCH_TIMEOUT_MS) });
      if (!response.ok) throw new Error("MENU_UNAVAILABLE");
      return await response.json();
    } catch (error) { lastError = error; }
  }
  throw lastError instanceof Error ? lastError : new Error("MENU_UNAVAILABLE");
}
export const getMenu = cache(async (): Promise<Menu> => {
  const empty: Menu = { products: [], state: "unconfigured", fetchedAt: "", stockDate: "", sourceIdentity: "unverified", source: "TPC01" };
  if (!process.env.APPS_SCRIPT_URL) return empty;
  try {
    const code = resolveMenuStoreCode(process.env.MENU_STORE_CODE);
    if (!code) return { ...empty, state: "unavailable" };
    const catalogUrl = new URL(process.env.APPS_SCRIPT_URL);
    if (catalogUrl.protocol !== "https:" || !["script.google.com", "script.googleusercontent.com"].includes(catalogUrl.hostname)) return { ...empty, state: "unavailable" };
    catalogUrl.searchParams.set("store", code);
    const onHandUrl = new URL(catalogUrl);
    onHandUrl.searchParams.set("stock", "1");
    const [catalog, onHandPayload] = await Promise.all([fetchMenuJson(catalogUrl), fetchMenuJson(onHandUrl)]);
    const normalized = normalizeMenu(catalog, code, parseOnHandStock(onHandPayload, code));
    return { ...empty, ...normalized, state: "connected", fetchedAt: new Date().toISOString() };
  } catch { return { ...empty, state: "unavailable" }; }
});
