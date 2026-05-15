import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CMJ Modelação",
    short_name: "CMJ",
    description: "Moldes em isopor para fundição com estrutura CNC.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#12335d",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
