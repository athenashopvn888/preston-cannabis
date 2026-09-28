import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Preston Cannabis In-Store Items Display" },
  description: "Operational in-store items menu display for Preston Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
