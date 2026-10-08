import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Screenista — digital out-of-home advertising";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141414",
          color: "#ffffff",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, letterSpacing: "-0.04em" }}>
          SCREEN<span style={{ color: "#ff7756" }}>i</span>STA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ff7756", fontSize: 20, letterSpacing: "0.14em" }}>
            Intelligent Out of Home
          </div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 68, lineHeight: 1.02, letterSpacing: "-0.04em", maxWidth: 980 }}>
            Screens. Campaigns. Audience. Analytics.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
