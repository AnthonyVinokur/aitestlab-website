import { Container } from "@/components/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead">{description}</p>
      </Container>
    </section>
  );
}
