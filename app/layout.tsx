import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AI Test Lab | Evidence for Reliable AI",
    template: "%s | AI Test Lab",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  keywords: [
    "LLM evaluation",
    "prompt regression testing",
    "AI quality engineering",
    "model comparison",
    "AI testing framework",
    "LLM quality gates",
  ],
  authors: [{ name: "Anthony Vinokur" }],
  creator: "Anthony Vinokur",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "AI Test Lab | Evidence for Reliable AI",
    description: siteConfig.description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "AI Test Lab — evidence for reliable AI systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Test Lab | Evidence for Reliable AI",
    description: siteConfig.description,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07111f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
