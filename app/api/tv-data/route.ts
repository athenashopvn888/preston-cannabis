import { NextResponse } from "next/server";
import { getTvData } from "../../lib/tvStock";
import { isCigaretteOrTobaccoItem, showCigarettes } from "@/lib/show-cigarettes.mjs";

export const runtime = "nodejs";

// Always run the handler. Upstream Apps Script reads are cached for ~300s
// inside getTvData; this response itself is not cached (Cache-Control: no-store).
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "flowers";
  const result = await getTvData({
    type,
    staticFlowers: [],
    staticItems: [],
  });
  let body = result.body;
  const headers = { ...result.headers, "X-Robots-Tag": "noindex" };
  if (!showCigarettes() && type === "items" && Array.isArray(body)) {
    body = body.filter((item) => !isCigaretteOrTobaccoItem(item));
    headers["x-tv-data-item-count"] = String(body.length);
  }

  return NextResponse.json(body, {
    status: result.status ?? 200,
    headers,
  });
}
