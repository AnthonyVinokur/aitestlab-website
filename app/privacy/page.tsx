import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the AI Test Lab website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="A minimal website should collect minimal data."
        description="This foundation does not include analytics, advertising trackers, account registration, or a server-side contact form."
      />
      <section className="section section-tight">
        <Container className="prose narrow">
          <h2>Current foundation</h2>
          <p>
            The website links to external services such as GitHub and LinkedIn. Those services apply
            their own privacy policies after you follow an external link.
          </p>
          <h2>Before adding data collection</h2>
          <p>
            Update this policy before enabling analytics, cookies, newsletter tools, contact-form
            storage, authentication, or any other feature that processes visitor information.
          </p>
        </Container>
      </section>
    </>
  );
}
