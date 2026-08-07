import Link from "next/link";
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
          <svg className="brand-logo" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M8 12.5 24 4l16 8.5v23L24 44 8 35.5v-23Z" />
            <path d="m15 29 9-14 9 14M18 25h12" />
          </svg>
          <span>{siteConfig.name}</span>
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
