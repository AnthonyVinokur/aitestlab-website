import type { ReactNode } from "react";
import { Container } from "@/components/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container className={children ? "page-hero-grid" : undefined}>
        <div className="page-hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-lead">{description}</p>
        </div>

        {children ? (
          <div className="page-hero-aside">
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
