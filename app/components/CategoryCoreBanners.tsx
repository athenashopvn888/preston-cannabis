import Link from "next/link";

type CategoryCoreBannersProps = {
  kind: "weed" | "vapes" | "cigarettes";
  storeName: string;
  weedHref: string;
  vapeHref: string;
  cigaretteHref: string;
};

const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

function Promo({ banner, href, alt, caption }: { banner: string; href: string; alt: string; caption: React.ReactNode }) {
  return (
    <figure data-category-core-banner="" style={{ margin: 0, width: "100%" }}>
      <Link href={href} aria-label={alt} style={{ display: "block", width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={banner} alt={alt} style={imageStyle} loading="lazy" />
      </Link>
      <figcaption style={captionStyle}>{caption}</figcaption>
    </figure>
  );
}
export default function CategoryCoreBanners({ kind, storeName, weedHref, vapeHref, cigaretteHref }: CategoryCoreBannersProps) {
  return (
    <section data-category-core-promos={kind} aria-label={`${storeName} ${kind} promotions`} style={{ width: "100%", maxWidth: "100%", overflowX: "hidden", marginBottom: "24px" }}>
      {kind === "weed" ? <Promo banner="/banners/core-top-weed-tier.webp" href={weedHref} alt={`${storeName} top three weed tiers`} caption="Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)" /> : null}
      {kind === "vapes" ? <Promo banner="/banners/core-vapes-nicotine-thc.webp" href={vapeHref} alt={`${storeName} nicotine and THC vapes`} caption="Nicotine + THC vapes" /> : null}
      {kind === "cigarettes" ? <Promo banner="/banners/native-cigarette-offer-20260822.webp" href={cigaretteHref} alt={`${storeName} cigarette mix and match offer`} caption="2 PACKS $5 / $25 CARTON" /> : null}
      {kind === "cigarettes" ? <Promo banner="/banners/core-premium-bb-marlboro-belmont.webp" href={cigaretteHref} alt={`${storeName} BB, Marlboro and Belmont cigarette offer`} caption={<>BB Full Flavor + Lights 2 packs $5 · Marlboro &amp; Belmont $10/pack</>} /> : null}
    </section>
  );
}
