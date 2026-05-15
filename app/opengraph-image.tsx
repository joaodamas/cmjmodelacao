import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f4f7fb",
          color: "#12335d",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: 56,
          width: "100%"
        }}
      >
        <div
          style={{
            borderLeft: "8px solid #1499d3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 34,
            width: 720
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>
            CMJ Modelação
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.02, marginTop: 28 }}>
            Moldes em Isopor para Fundição
          </div>
          <div style={{ color: "#475569", fontSize: 28, lineHeight: 1.32, marginTop: 28 }}>
            Estrutura CNC, acabamento técnico e atendimento industrial em São Bernardo do Campo/SP.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "#12335d",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 34,
            width: 310
          }}
        >
          <div style={{ border: "3px solid #ffffff", fontSize: 68, fontWeight: 900, padding: "28px 34px" }}>
            CMJ
          </div>
          <div style={{ color: "#9bd7f0", fontSize: 22, fontWeight: 800, marginTop: 28, textAlign: "center" }}>
            Modelação Industrial
          </div>
        </div>
      </div>
    ),
    size
  );
}
