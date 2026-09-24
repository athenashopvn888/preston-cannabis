import { ARTWORK } from "@/lib/artwork";
import EditorialArtwork from "./EditorialArtwork";
export default function LocalArtwork() {
  return <div className="local-art local-texture-panel"><EditorialArtwork asset={ARTWORK.local} className="local-texture" sizes="(max-width:650px) 100vw, 50vw"/><span className="street-name">PRESTON<br/>STREET</span><span className="coordinate-label">OTTAWA · ONTARIO</span></div>;
}
