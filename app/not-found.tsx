import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="page-hero not-found-page">
      <Container>
        <p className="eyebrow">404 / Evaluation error</p>
        <h1>That route did not pass validation.</h1>
        <p className="page-lead">The requested page does not exist or has moved.</p>
        <Link className="button" href="/">Return to AI Test Lab</Link>
      </Container>
    </section>
  );
}
