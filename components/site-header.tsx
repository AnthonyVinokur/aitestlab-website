import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul className={mobile ? "mobile-nav-list" : "nav-list"}>
      {siteConfig.navigation.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <BrandMark className="brand-logo" />
          <span className="brand-wordmark">AI TEST LAB</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>

        <a
          className="button button-small header-cta"
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
        >
          View GitHub
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            <NavigationLinks mobile />
            <a
              className="button mobile-github"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </nav>
        </details>
      </Container>
    </header>
  );
}
