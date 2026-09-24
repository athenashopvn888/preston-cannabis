import { getMenu } from "@/lib/menu";
import { PREVIEW_NOTICE } from "@/lib/site";
export const dynamic = "force-dynamic";
export async function GET() { const menu = await getMenu(); return Response.json({ ...menu, notice: PREVIEW_NOTICE }, { status: menu.state === "connected" ? 200 : 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }); }
