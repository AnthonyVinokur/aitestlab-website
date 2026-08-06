import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Test Lab",
    short_name: "AI Test Lab",
    description: "Evidence for reliable AI systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#07111f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
