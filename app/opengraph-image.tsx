import { ImageResponse } from "next/og";
export const alt = "Preston Cannabis — Ottawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OGImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#083e29", color: "#f6f3e9", padding: 85 }}><div style={{ fontSize: 22, letterSpacing: 7, color: "#b8e46f", display: "flex" }}>PRESTON STREET · OTTAWA</div><div style={{ fontSize: 108, display: "flex", marginTop: 32, lineHeight: 1 }}>Preston Cannabis</div><div style={{ fontSize: 30, display: "flex", color: "#d3e5c5", marginTop: 40 }}>Good roots. New beginnings.</div><div style={{ fontSize: 21, display: "flex", marginTop: 55 }}>prestoncannabis.com · Adults 19+</div></div>, size); }
