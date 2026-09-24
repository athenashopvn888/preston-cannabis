import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/Chrome";
import AgeGate from "@/components/AgeGate";
import { INDEXABLE, SITE } from "@/lib/site";
import { businessGraph, jsonLd } from "@/lib/landing-schema.mjs";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL(SITE.domain), title: { default: "Preston Cannabis | Ottawa", template: "%s | Preston Cannabis" }, description: "Explore Preston Cannabis on Preston Street in Ottawa. Browse the menu preview and find contact information.", robots: { index: INDEXABLE, follow: INDEXABLE }, openGraph: { locale: "en_CA", siteName: SITE.name, type: "website" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#083e29" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en-CA"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessGraph(SITE)) }}/><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/><AgeGate/></body></html>; }
