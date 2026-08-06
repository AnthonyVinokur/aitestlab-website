import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Reports",
  description: "See how AI Test Lab turns evaluation runs into reviewable engineering evidence.",
  alternates: { canonical: "/reports" },
};

export default function ReportsPage() {
  return (
    <>
      <PageHero
        eyebrow="Evaluation evidence"
        title="Reports designed for humans, automation, and audit trails."
        description="A useful evaluation report must explain what ran, what passed, what failed, why it failed, and whether the release policy was satisfied."
      />
      <section className="section section-tight">
        <Container className="report-layout">
          <div>
            <p className="eyebrow">Illustrative output</p>
            <h2>One run. Multiple evidence consumers.</h2>
            <p className="section-copy">
              HTML supports engineering review. JSON supports automation, dashboards, trend analysis,
              and downstream quality-gate logic.
            </p>
            <ul className="check-list">
              <li>Run and environment metadata</li>
              <li>Per-test status, reason, expectation, and response</li>
              <li>Timing and token-performance measurements</li>
              <li>Normalized engine and model evidence</li>
            </ul>
          </div>
          <div className="report-card" aria-label="Illustrative report summary">
            <div className="report-title-row">
              <div><span>AI Test Lab Report</span><strong>release-candidate-42</strong></div>
              <span className="status-badge">PASS</span>
            </div>
            <div className="report-summary">
              <div><span>Passed</span><strong>31</strong></div>
              <div><span>Failed</span><strong>0</strong></div>
              <div><span>Errors</span><strong>0</strong></div>
            </div>
            <div className="report-table">
              <div className="report-row report-head"><span>Test</span><span>Engine</span><span>Status</span></div>
              <div className="report-row"><span>answer-grounding</span><span>ragas</span><b>PASS</b></div>
              <div className="report-row"><span>policy-refusal</span><span>core</span><b>PASS</b></div>
              <div className="report-row"><span>response-format</span><span>core</span><b>PASS</b></div>
            </div>
            <small>Sample interface—not a live production result.</small>
          </div>
        </Container>
      </section>
    </>
  );
}
