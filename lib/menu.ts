import { cache } from "react";
import { getTvData } from "@/app/lib/tvStock";
import { normalizeMenu } from "./menu-core.mjs";
export type Product = { id: string; sku: string; name: string; slug: string; category: string; tier: string; type: string; thc: string; mg: string; image: string; prices: { label: string; amount: number; regular: number; sale: number | null }[] };
export type Menu = { products: Product[]; state: "connected" | "unconfigured" | "unavailable"; fetchedAt: string; stockDate: string; sourceIdentity: string; source: "TPC01" };
export const getMenu = cache(async (): Promise<Menu> => {
  const empty: Menu = { products: [], state: "unconfigured", fetchedAt: "", stockDate: "", sourceIdentity: "unverified", source: "TPC01" };
  try {
    const flowerResult = await getTvData({ type: "flowers" });
    const itemResult = await getTvData({ type: "items" });
    const normalized = normalizeMenu({
      storeCode: "TPC01",
      stockDate: flowerResult.headers["x-tv-data-as-of"],
      flowers: flowerResult.body,
      items: itemResult.body,
    });
    return { ...empty, ...normalized, state: "connected", fetchedAt: new Date().toISOString() };
  } catch { return { ...empty, state: "unavailable" }; }
});
