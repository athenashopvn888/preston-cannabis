import { getMenu } from "@/lib/menu";
export const dynamic = "force-dynamic";
export async function GET() { const menu = await getMenu(); return Response.json(menu, { status: menu.state === "connected" ? 200 : 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }); }
