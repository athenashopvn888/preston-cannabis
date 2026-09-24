import { cache } from "react";
import { normalizeMenu, resolveMenuStoreCode } from "./menu-core.mjs";
export type Product = { id: string; sku: string; name: string; slug: string; category: string; tier: string; type: string; thc: string; mg: string; image: string; prices: { label: string; amount: number; regular: number; sale: number | null }[] };
export type Menu = { products: Product[]; state: "connected" | "unconfigured" | "unavailable"; fetchedAt: string; stockDate: string; sourceIdentity: string; source: "TPC01" };
export const getMenu = cache(async (): Promise<Menu> => {
  const empty: Menu = { products: [], state: "unconfigured", fetchedAt: "", stockDate: "", sourceIdentity: "unverified", source: "TPC01" };
  if (!process.env.APPS_SCRIPT_URL) return empty;
  try {
    const code = resolveMenuStoreCode(process.env.MENU_STORE_CODE);
    if (!code) return { ...empty, state: "unavailable" };
    const url = new URL(process.env.APPS_SCRIPT_URL);
    if (url.protocol !== "https:" || !["script.google.com", "script.googleusercontent.com"].includes(url.hostname)) return { ...empty, state: "unavailable" };
    url.searchParams.set("store", code);
    const response = await fetch(url, { next: { revalidate: 120 }, signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error("MENU_UNAVAILABLE");
    const normalized = normalizeMenu(await response.json(), code);
    return { ...empty, ...normalized, state: "connected", fetchedAt: new Date().toISOString() };
  } catch { return { ...empty, state: "unavailable" }; }
});
