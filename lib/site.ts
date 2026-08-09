const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "AI Test Lab",
  shortName: "AITL",
  url: configuredUrl || "https://aitestlab.dev",
  description:
    "A lightweight, extensible framework for prompt regression, model comparison, evaluation evidence, and AI quality gates.",
  github: "https://github.com/AnthonyVinokur/AI-Test-Lab",
  linkedin: "https://www.linkedin.com/in/anthony-vinokur-a41964368/",
  navigation: [
    { href: "/features", label: "Features" },
    { href: "/atlas", label: "Atlas" },
    { href: "/results", label: "Results" },
    { href: "/reports", label: "Reports" },
    { href: "/documentation", label: "Docs" },
    { href: "/roadmap", label: "Roadmap" },
  ],
} as const;
