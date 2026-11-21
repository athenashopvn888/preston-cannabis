import { NextResponse } from "next/server";
import { showCigarettes } from "@/lib/show-cigarettes.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  const active = showCigarettes();
  return NextResponse.json({
    storeCode: "TPC01",
    renderedAt: new Date().toISOString(),
    cig: { web: active, tv: active, guides: active },
  }, { headers: { "Cache-Control": "no-store" } });
}
