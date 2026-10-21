import { NextResponse } from "next/server";
import { cigaretteRedirectTarget } from "@/lib/show-cigarettes.mjs";

export function middleware(request: Request) {
  const target = cigaretteRedirectTarget(new URL(request.url).pathname);
  if (!target) return NextResponse.next();
  return NextResponse.redirect(new URL(target, request.url), 302);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)"],
};
