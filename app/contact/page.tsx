import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss AI evaluation, prompt regression, and AI quality engineering use cases.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Bring a concrete AI quality problem."
        description="The most useful conversations start with a real workflow: a prompt that changes, a model migration, a release gate, a RAG quality risk, or an evaluation process that does not yet scale."
      />
      <section className="section section-tight">
        <Container className="contact-grid">
          <article className="contact-card">
            <p className="eyebrow">Engineering collaboration</p>
            <h2>Review the framework</h2>
            <p>Use GitHub for implementation questions, issues, architecture discussion, and reproducible examples.</p>
            <a className="button" href={siteConfig.github} target="_blank" rel="noreferrer">Open GitHub</a>
          </article>
          <article className="contact-card">
            <p className="eyebrow">Professional contact</p>
            <h2>Start a direct conversation</h2>
            <p>Use LinkedIn to discuss AI evaluation strategy, quality engineering, or potential collaboration.</p>
            <a className="button button-secondary" href={siteConfig.linkedin} target="_blank" rel="noreferrer">Open LinkedIn</a>
          </article>
        </Container>
      </section>
    </>
  );
}
