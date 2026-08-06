import { siteConfig } from "@/lib/site";

export function SoftwareJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: siteConfig.url,
    codeRepository: siteConfig.github,
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
