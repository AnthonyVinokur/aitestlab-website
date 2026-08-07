import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            {siteConfig.name}
          </Link>
          <p className="footer-copy">
            Building repeatable evidence for reliable AI systems.
          </p>
        </div>

        <div>
          <p className="footer-heading">Product</p>
          <ul className="footer-links">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/atlas">Atlas</Link></li>
            <li><Link href="/reports">Reports</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Resources</p>
          <ul className="footer-links">
            <li><Link href="/documentation">Documentation</Link></li>
            <li><Link href="/roadmap">Roadmap</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Connect</p>
          <ul className="footer-links">
            <li><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <Link href="/privacy">Privacy</Link>
      </Container>
    </footer>
  );
}
