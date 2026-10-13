"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FourCoreBannerStackProps = {
  title: string;
  storeName: string;
  storeArea: string;
  storeOrigin: string;
  weedHref: string;
  vapeHref: string;
  cigaretteHref: string;
};

const TOP_WEED_IMAGE = "/banners/core-top-weed-tier.webp";
const VAPE_IMAGE = "/banners/core-vapes-nicotine-thc.webp";
const CIGARETTE_IMAGE = "/banners/native-cigarette-offer-20260822.webp";
const PREMIUM_CIGARETTE_IMAGE = "/banners/core-premium-bb-marlboro-belmont.webp";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const linkStyle = { display: "block", width: "100%" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

export default function FourCoreBannerStack({
  title,
  storeName,
  storeArea,
  storeOrigin,
  weedHref,
  vapeHref,
  cigaretteHref,
}: FourCoreBannerStackProps) {
  const announcementRef = useRef<HTMLElement>(null);
  const [navClearance, setNavClearance] = useState<number | null>(null);
  const imageObjects = [
    { name: `${storeName} top weed tiers`, description: `Exotic, Premium and AAA+ weed tiers at ${storeName} in ${storeArea}.`, contentUrl: `${storeOrigin}${TOP_WEED_IMAGE}` },
    { name: `${storeName} nicotine and THC vapes`, description: `Nicotine vapes and THC vapes at ${storeName} in ${storeArea}.`, contentUrl: `${storeOrigin}${VAPE_IMAGE}` },
    { name: `${storeName} cigarette mix and match`, description: `Two packs for $5 mix and match and $25 carton cigarette offer at ${storeName} in ${storeArea}.`, contentUrl: `${storeOrigin}${CIGARETTE_IMAGE}` },
    { name: `${storeName} premium cigarette offer`, description: `BB Full Flavor and Lights plus Marlboro and Belmont cigarette offer at ${storeName} in ${storeArea}.`, contentUrl: `${storeOrigin}${PREMIUM_CIGARETTE_IMAGE}` },
  ].map((image) => ({ "@type": "ImageObject", ...image }));

  useEffect(() => {
    const announcement = announcementRef.current;
    const nav = document.querySelector<HTMLElement>("#main-nav, header[data-site-header], header.site-header, header, nav.nav");
    if (!announcement || !nav) return;
    let frame = 0;
    const updateClearance = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const currentMargin = Number.parseFloat(window.getComputedStyle(announcement).marginTop);
        const flowTop = announcement.getBoundingClientRect().top - (currentMargin || 0);
        const nextClearance = Math.max(0, Math.ceil(nav.getBoundingClientRect().bottom - flowTop));
        setNavClearance((current) => current === nextClearance ? current : nextClearance);
      });
    };
    updateClearance();
    const resizeObserver = new ResizeObserver(updateClearance);
    resizeObserver.observe(nav);
    window.addEventListener("resize", updateClearance);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateClearance);
    };
  }, []);

  return (
    <aside
      ref={announcementRef}
      data-fleet-homepage-announcement=""
      aria-label="Store announcements"
      style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", overflowX: "hidden", overflowY: "visible", marginTop: navClearance === null ? undefined : navClearance, position: "relative", zIndex: 50 }}
    >
      <div data-home-title-block="" style={{ width: "100%", boxSizing: "border-box", padding: "10px 16px", background: "#0b1018", color: "#ffffff", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "clamp(24px, 3.5vw, 38px)", lineHeight: 1.2, fontWeight: 900 }}>{title}</h1>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": imageObjects }).replace(/</g, "\\u003c") }} />
      <figure data-core-banner="weed" style={figureStyle}><Link href={weedHref} aria-label={`Shop Exotic, Premium and AAA+ weed tiers at ${storeName}`} style={linkStyle}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={TOP_WEED_IMAGE} alt={`${storeName} in ${storeArea} — Exotic, Premium and AAA+ top weed tiers`} title={`${storeName} top weed tiers — Exotic, Premium and AAA+`} style={imageStyle} /></Link><figcaption style={captionStyle}>Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)</figcaption></figure>
      <figure data-core-banner="vapes" style={figureStyle}><Link href={vapeHref} aria-label={`Shop nicotine and THC vapes at ${storeName}`} style={linkStyle}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={VAPE_IMAGE} alt={`${storeName} in ${storeArea} — nicotine and THC vapes`} title={`${storeName} nicotine and THC vapes`} style={imageStyle} loading="lazy" /></Link><figcaption style={captionStyle}>Nicotine + THC vapes</figcaption></figure>
      <figure data-core-banner="cigarettes" style={figureStyle}><Link href={cigaretteHref} aria-label={`Shop cigarette mix and match offers at ${storeName}`} style={linkStyle}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={CIGARETTE_IMAGE} alt={`${storeName} in ${storeArea} — 2 packs for $5 mix and match and $25 carton cigarette offer`} title={`${storeName} cigarette offer — 2 packs $5 mix and match, $25 carton`} style={imageStyle} loading="lazy" /></Link><figcaption style={captionStyle}>2 PACKS $5 / $25 CARTON</figcaption></figure>
      <figure data-core-banner="premium-cigarettes" style={figureStyle}><Link href={cigaretteHref} aria-label={`Shop BB, Marlboro and Belmont cigarette offers at ${storeName}`} style={linkStyle}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={PREMIUM_CIGARETTE_IMAGE} alt={`${storeName} in ${storeArea} — BB Full Flavor and Lights, Marlboro and Belmont premium cigarettes`} title={`${storeName} premium cigarettes — BB, Marlboro and Belmont`} style={imageStyle} loading="lazy" /></Link><figcaption style={captionStyle}>BB Full Flavor + Lights 2 packs $5 · Marlboro &amp; Belmont $10/pack</figcaption></figure>
    </aside>
  );
}
