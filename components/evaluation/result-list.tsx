import type { EvaluationCase } from "@/lib/evaluation/types";
import {
  formatNumber,
  formatSeconds,
  formatThroughput,
  formatUsd,
} from "@/lib/evaluation/formatters";
import { EvaluationStatusPill } from "./status-pill";

function MetricRows({ result }: { result: EvaluationCase }) {
  if (!result.metrics.length) {
    return <p className="results-empty">No normalized evaluation metrics recorded.</p>;
  }

  return (
    <div className="results-metrics">
      {result.metrics.map((metric, index) => (
        <div className="results-metric" key={`${metric.engine}-${metric.name}-${index}`}>
          <div><span>{metric.engine}</span><strong>{metric.name}</strong></div>
          <div><small>score</small><strong>{formatNumber(metric.score, 3)}</strong></div>
          <div><small>threshold</small><strong>{formatNumber(metric.threshold, 3)}</strong></div>
          <span className={metric.passed === false ? "metric-fail" : "metric-pass"}>
            {metric.passed == null ? "—" : metric.passed ? "PASS" : "FAIL"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function EvaluationResultList({ results }: { results: EvaluationCase[] }) {
  return (
    <div className="results-list">
      {results.map((result, index) => (
        <details className="result-entry" key={`${result.id}-${index}`} open={result.status === "FAIL"}>
          <summary>
            <span className="result-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="result-identity">
              <strong>{result.id}</strong>
              <small>{result.name} · {result.category}</small>
            </span>
            <span className="result-time">{formatSeconds(result.responseTimeSeconds)}</span>
            <EvaluationStatusPill status={result.status} />
          </summary>

          <div className="result-detail">
            <div className="result-narrative">
              <section><span className="result-label">Prompt</span><p>{result.prompt}</p></section>
              <section><span className="result-label">Actual response</span><pre>{result.actualResponse}</pre></section>
              <section><span className="result-label">Evaluation reason</span><p>{result.reason}</p></section>
            </div>

            <aside className="result-evidence">
              <div className="result-fact"><span>Assertion</span><strong>{result.assertionType}</strong></div>
              <div className="result-fact"><span>Expected</span><code>{result.expected || "—"}</code></div>
              <div className="result-fact-grid">
                <div><span>Prompt tokens</span><strong>{formatNumber(result.promptTokens)}</strong></div>
                <div><span>Output tokens</span><strong>{formatNumber(result.outputTokens)}</strong></div>
                <div><span>Prompt latency</span><strong>{formatSeconds(result.promptLatencySeconds)}</strong></div>
                <div><span>Generation</span><strong>{formatSeconds(result.generationLatencySeconds)}</strong></div>
                <div><span>Generation speed</span><strong>{formatThroughput(result.generationTokensPerSecond)}</strong></div>
                <div><span>Estimated cost</span><strong>{formatUsd(result.estimatedCostUsd)}</strong></div>
              </div>
            </aside>

            <MetricRows result={result} />
          </div>
        </details>
      ))}
    </div>
  );
}
