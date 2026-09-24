import Image from "next/image";
import type { ArtworkAsset } from "@/lib/artwork";
import Leaf from "./Leaf";
export default function EditorialArtwork({ asset, className = "", priority = false, sizes }: { asset?: ArtworkAsset | null; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`editorial-artwork ${className}`}>{asset ? <Image src={asset.src} alt={asset.alt} fill sizes={sizes || (priority ? "100vw" : "(max-width:650px) 90vw, 40vw")} priority={priority} style={{ objectPosition: asset.position || "center" }}/> : <Leaf/>}</div>;
}
