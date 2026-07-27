import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/social";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0b0d",
          color: "#edeef0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#2de8b8", letterSpacing: 2 }}>
          {siteConfig.role.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600, marginTop: 24 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#9aa0a8", marginTop: 24, maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
