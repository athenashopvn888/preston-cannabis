"use client";

import { usePathname } from "next/navigation";
import AgeGate from "./AgeGate";
import { Footer, Header } from "./Chrome";

function isTvBoard(path: string) {
  return path === "/tv" || path === "/tv2";
}

/** Site chrome stays on every public page. In-store boards render full-bleed. */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  if (isTvBoard(path)) return children;
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      {children}
      <Footer />
      <AgeGate />
    </>
  );
}
