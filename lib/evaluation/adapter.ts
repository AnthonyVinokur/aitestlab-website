import type {
  EvaluationCase,
  EvaluationDecision,
  EvaluationCaseComparison,
  EvaluationComparisonChange,
  EvaluationRunComparison,
  EvaluationEngineResult,
  EvaluationMetric,
  EvaluationModelSummary,
  EvaluationRun,
  EvaluationRunContext,
  RawEvaluationReport,
  RawEvaluationResult,
  EvaluationReproducibilityContext,
  EvaluationRegressionDiagnosis,
  EvaluationComparisonEvidence,
  EvaluationRegressionImpact,
} from "./types";

const numberOrNull = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const numberOrZero = (value: unknown): number => numberOrNull(value) ?? 0;

const stringOr = (value: unknown, fallback = "unknown"): string =>
  typeof value === "string" && value.trim() ? value : fallback;

const nullableString = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value : null;

const firstNullableString = (values: unknown[]): string | null => {
  for (const value of values) {
    const normalized = nullableString(value);

    if (normalized) {
      return normalized;
    }
  }

  return null;
};

const expectedAsText = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value == null) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

function deriveStatusCounts(results: RawEvaluationResult[]) {
  return results.reduce(
    (counts, result) => {
      const status = stringOr(result.status, "").toUpperCase();
      if (status === "PASS") counts.passed += 1;
      else if (status === "XFAIL") counts.expectedFailures += 1;
      else if (status === "FAIL" || status === "XPASS")
        counts.unexpectedFailures += 1;
      else if (status === "ERROR") counts.errors += 1;
      return counts;
    },
    { passed: 0, expectedFailures: 0, unexpectedFailures: 0, errors: 0 },
  );
}

function adaptMetric(
  metric: NonNullable<RawEvaluationResult["evaluation_results"]>[number],
): EvaluationMetric {
  return {
    name: stringOr(metric.metric_name, "metric"),
    engine: stringOr(metric.engine, "unknown"),
    score: numberOrNull(metric.score),
    threshold: numberOrNull(metric.threshold),
    passed: typeof metric.passed === "boolean" ? metric.passed : null,
    reason: nullableString(metric.reason),
    profileName: nullableString(metric.profile_name),
    profileVersion: nullableString(metric.profile_version),
    evaluatorModel: nullableString(metric.evaluator_model),
  };
}

function adaptEngineResult(
  engineResult: NonNullable<RawEvaluationResult["engine_results"]>[number],
): EvaluationEngineResult {
  return {
    engine: stringOr(engineResult.engine, "unknown"),
    succeeded:
      typeof engineResult.succeeded === "boolean"
        ? engineResult.succeeded
        : null,
    error: nullableString(engineResult.error),
  };
}

function adaptResult(result: RawEvaluationResult): EvaluationCase {
  return {
    id: stringOr(result.test_id, "unnamed-test"),
    name: stringOr(result.name, stringOr(result.test_id, "Unnamed test")),
    category: stringOr(result.category, "uncategorized"),
    prompt: stringOr(result.prompt, ""),
    provider: stringOr(result.provider),
    model: stringOr(result.model),
    status: stringOr(result.status, "ERROR"),
    expectedToFail: result.expected_to_fail === true,
    assertionType: stringOr(result.assertion_type, "unknown"),
    expected: expectedAsText(result.expected),
    actualResponse: stringOr(result.actual_response, ""),
    reason: stringOr(result.reason, "No evaluation reason recorded."),
    estimatedCostUsd: numberOrNull(result.estimated_cost_usd),
    responseTimeSeconds: numberOrNull(result.response_time_seconds),
    promptTokens: numberOrNull(result.prompt_tokens),
    outputTokens: numberOrNull(result.output_tokens),
    promptLatencySeconds: numberOrNull(result.prompt_latency_seconds),
    generationLatencySeconds: numberOrNull(result.generation_latency_seconds),
    modelLoadSeconds: numberOrNull(result.model_load_seconds),
    promptTokensPerSecond: numberOrNull(result.prompt_tokens_per_second),
    generationTokensPerSecond: numberOrNull(
      result.generation_tokens_per_second,
    ),
    metrics: Array.isArray(result.evaluation_results)
      ? result.evaluation_results.map(adaptMetric)
      : [],
    engineResults: Array.isArray(result.engine_results)
      ? result.engine_results.map(adaptEngineResult)
      : [],
  };
}

function adaptModelSummary(
  item: NonNullable<RawEvaluationReport["model_comparison"]>[number],
): EvaluationModelSummary {
  return {
    provider: stringOr(item.provider),
    model: stringOr(item.model),
    passed: numberOrZero(item.passed),
    expectedFailures: numberOrZero(item.expected_failures),
    unexpectedFailures: numberOrZero(item.unexpected_failures),
    errors: numberOrZero(item.errors),
    total: numberOrZero(item.total),
    passRatePercent: numberOrZero(item.pass_rate_percent),
    averageResponseTimeSeconds: numberOrNull(
      item.average_response_time_seconds,
    ),
    averageGenerationLatencySeconds: numberOrNull(
      item.average_generation_latency_seconds,
    ),
    averageGenerationTokensPerSecond: numberOrNull(
      item.average_generation_tokens_per_second,
    ),
    averageOutputTokens: numberOrNull(item.average_output_tokens),
    totalEstimatedCostUsd: numberOrNull(item.total_estimated_cost_usd),
  };
}

function deriveRunContext(raw: RawEvaluationReport): EvaluationRunContext {
  const rawResults = Array.isArray(raw.results) ? raw.results : [];

  const firstModelSummary = Array.isArray(raw.model_comparison)
    ? raw.model_comparison[0]
    : undefined;

  const metrics = rawResults.flatMap((result) =>
    Array.isArray(result.evaluation_results) ? result.evaluation_results : [],
  );

  return {
    provider:
      nullableString(firstModelSummary?.provider) ??
      firstNullableString(rawResults.map((result) => result.provider)),

    model:
      nullableString(firstModelSummary?.model) ??
      firstNullableString(Array.isArray(raw.models) ? raw.models : []) ??
      firstNullableString(rawResults.map((result) => result.model)),

    profileName: firstNullableString(
      metrics.map((metric) => metric.profile_name),
    ),

    profileVersion: firstNullableString(
      metrics.map((metric) => metric.profile_version),
    ),
  };
}
function deriveReproducibilityContext(
  raw: RawEvaluationReport,
): EvaluationReproducibilityContext {
  const rawResults = Array.isArray(raw.results) ? raw.results : [];

  const metrics = rawResults.flatMap((result) =>
    Array.isArray(result.evaluation_results) ? result.evaluation_results : [],
  );

  const engineResults = rawResults.flatMap((result) =>
    Array.isArray(result.engine_results) ? result.engine_results : [],
  );

  const engines = [
    ...new Set(
      [
        ...metrics.map((metric) => nullableString(metric.engine)),
        ...engineResults.map((result) => nullableString(result.engine)),
      ].filter((engine): engine is string => engine !== null),
    ),
  ];

  const evaluatorModels = [
    ...new Set(
      metrics
        .map((metric) => nullableString(metric.evaluator_model))
        .filter((model): model is string => model !== null),
    ),
  ];

  const runtimeOptionsPresent = metrics.some(
    (metric) =>
      metric.runtime_options != null &&
      typeof metric.runtime_options === "object" &&
      Object.keys(metric.runtime_options).length > 0,
  );

  const engineErrors = engineResults
    .filter((result) => result.succeeded === false)
    .map((result) => {
      const engine = stringOr(result.engine, "unknown");
      const error = nullableString(result.error);

      return error ? `${engine}: ${error}` : `${engine}: evaluation failed`;
    });

  return {
    engines,
    evaluatorModels,
    runtimeOptionsPresent,
    engineErrors,
  };
}

function deriveDecision(
  unexpectedFailures: number,
  errors: number,
): EvaluationDecision {
  const requiresAttention = unexpectedFailures > 0 || errors > 0;

  return {
    status: requiresAttention ? "ATTENTION_REQUIRED" : "CLEAR",
    unexpectedFailures,
    errors,
    explanation: requiresAttention
      ? "Unexpected evaluation behavior requires investigation before this run can be treated as clear."
      : "No unexpected failures or evaluation errors were recorded.",
  };
}

export function adaptEvaluationReport(raw: RawEvaluationReport): EvaluationRun {
  const rawResults = Array.isArray(raw.results) ? raw.results : [];
  const derived = deriveStatusCounts(rawResults);
  const summary = raw.summary ?? {};

  const passed = numberOrNull(summary.passed) ?? derived.passed;
  const expectedFailures =
    numberOrNull(summary.expected_failures) ?? derived.expectedFailures;
  const unexpectedFailures =
    numberOrNull(summary.unexpected_failures) ??
    numberOrNull(summary.failed) ??
    derived.unexpectedFailures;
  const errors = numberOrNull(summary.errors) ?? derived.errors;
  const total = numberOrNull(summary.total) ?? rawResults.length;
  const passRatePercent =
    numberOrNull(summary.pass_rate_percent) ??
    (total ? Math.round((passed / total) * 10000) / 100 : 0);

  const generatedAt =
    typeof raw.generated_at === "string" ? raw.generated_at : null;

  const fallbackRunId = generatedAt
    ? `run-${generatedAt.replace(/[^0-9]/g, "").slice(0, 14)}`
    : "run-unknown";

  return {
    schemaVersion: stringOr(raw.schema_version, "legacy"),
    reportType: stringOr(raw.report_type, "evaluation_run"),
    runId: stringOr(raw.run_id, fallbackRunId),
    decision: deriveDecision(unexpectedFailures, errors),
    generatedAt,
    models: Array.isArray(raw.models)
      ? raw.models.filter((model): model is string => typeof model === "string")
      : [],
    passed,
    expectedFailures,
    unexpectedFailures,
    errors,
    total,
    context: deriveRunContext(raw),
    reproducibility: deriveReproducibilityContext(raw),
    passRatePercent,
    totalEstimatedCostUsd: numberOrNull(summary.total_estimated_cost_usd),
    highestScoringModel:
      typeof raw.highlights?.highest_scoring_model === "string"
        ? raw.highlights.highest_scoring_model
        : null,
    fastestModel:
      typeof raw.highlights?.fastest_model === "string"
        ? raw.highlights.fastest_model
        : null,
    modelComparison: Array.isArray(raw.model_comparison)
      ? raw.model_comparison.map(adaptModelSummary)
      : [],
    results: rawResults.map(adaptResult),
  };
}

function statusOutcome(
  status: string | null,
): "ACCEPTABLE" | "UNACCEPTABLE" | "NEUTRAL" {
  if (!status) {
    return "NEUTRAL";
  }

  const normalized = status.toUpperCase();

  if (normalized === "PASS" || normalized === "XFAIL") {
    return "ACCEPTABLE";
  }

  if (
    normalized === "FAIL" ||
    normalized === "XPASS" ||
    normalized === "ERROR"
  ) {
    return "UNACCEPTABLE";
  }

  return "NEUTRAL";
}

function classifyCaseChange(
  baseline: EvaluationCase | undefined,
  current: EvaluationCase | undefined,
): EvaluationComparisonChange {
  if (!baseline) {
    return "ADDED";
  }

  if (!current) {
    return "REMOVED";
  }

  const baselineOutcome = statusOutcome(baseline.status);
  const currentOutcome = statusOutcome(current.status);

  if (baselineOutcome === "UNACCEPTABLE" && currentOutcome === "ACCEPTABLE") {
    return "IMPROVED";
  }

  if (baselineOutcome === "ACCEPTABLE" && currentOutcome === "UNACCEPTABLE") {
    return "REGRESSED";
  }

  return "UNCHANGED";
}
function comparisonEvidence(
  evaluationCase: EvaluationCase | undefined,
): EvaluationComparisonEvidence | null {
  if (!evaluationCase) {
    return null;
  }

  return {
    actualResponse: evaluationCase.actualResponse,
    expected: evaluationCase.expected,
    assertionType: evaluationCase.assertionType,
    reason: evaluationCase.reason,
  };
}

function compareCases(
  baseline: EvaluationRun,
  current: EvaluationRun,
): EvaluationCaseComparison[] {
  const baselineById = new Map(
    baseline.results.map((result) => [result.id, result]),
  );

  const currentById = new Map(
    current.results.map((result) => [result.id, result]),
  );

  const orderedIds = [
    ...baseline.results.map((result) => result.id),
    ...current.results
      .map((result) => result.id)
      .filter((id) => !baselineById.has(id)),
  ];

  return orderedIds.map((id) => {
    const baselineCase = baselineById.get(id);
    const currentCase = currentById.get(id);

    const change = classifyCaseChange(baselineCase, currentCase);

    return {
      id,
      name: currentCase?.name ?? baselineCase?.name ?? id,
      baselineStatus: baselineCase?.status ?? null,
      currentStatus: currentCase?.status ?? null,
      change,
      baselineEvidence: comparisonEvidence(baselineCase),
      currentEvidence: comparisonEvidence(currentCase),
      diagnosis: regressionDiagnosis(change, baselineCase, currentCase),
      impact: regressionImpact(change, baselineCase, currentCase),
    };
  });
}

export function compareEvaluationRuns(
  baseline: EvaluationRun,
  current: EvaluationRun,
): EvaluationRunComparison {
  const cases = compareCases(baseline, current);

  const summary = cases.reduce(
    (counts, item) => {
      switch (item.change) {
        case "IMPROVED":
          counts.improved += 1;
          break;
        case "REGRESSED":
          counts.regressed += 1;
          break;
        case "ADDED":
          counts.added += 1;
          break;
        case "REMOVED":
          counts.removed += 1;
          break;
        default:
          counts.unchanged += 1;
      }

      return counts;
    },
    {
      unchanged: 0,
      improved: 0,
      regressed: 0,
      added: 0,
      removed: 0,
    },
  );

  return {
    baselineRunId: baseline.runId,
    currentRunId: current.runId,

    baselineDecision: baseline.decision.status,
    currentDecision: current.decision.status,

    baselinePassed: baseline.passed,
    currentPassed: current.passed,
    passedDelta: current.passed - baseline.passed,

    baselineUnexpectedFailures: baseline.unexpectedFailures,
    currentUnexpectedFailures: current.unexpectedFailures,
    unexpectedFailuresDelta:
      current.unexpectedFailures - baseline.unexpectedFailures,

    baselineErrors: baseline.errors,
    currentErrors: current.errors,
    errorsDelta: current.errors - baseline.errors,

    baselinePassRatePercent: baseline.passRatePercent,
    currentPassRatePercent: current.passRatePercent,
    passRateDelta:
      Math.round((current.passRatePercent - baseline.passRatePercent) * 100) /
      100,

    cases,
    summary,
  };
}

function regressionDiagnosis(
  change: EvaluationComparisonChange,
  baseline: EvaluationCase | undefined,
  current: EvaluationCase | undefined,
): EvaluationRegressionDiagnosis | null {
  if (change !== "REGRESSED" || !baseline || !current) {
    return null;
  }

  return {
    cause: `Evaluation outcome changed from ${baseline.status} to ${current.status}.`,
    assertionType: current.assertionType || null,
    expected: current.expected || null,
    reason: current.reason || null,
  };
}

function regressionImpact(
  change: EvaluationComparisonChange,
  baseline: EvaluationCase | undefined,
  current: EvaluationCase | undefined,
): EvaluationRegressionImpact | null {
  if (change !== "REGRESSED" || !baseline || !current) {
    return null;
  }

  return {
    level: "HIGH",
    reason:
      `Previously acceptable evaluation outcome changed from ` +
      `${baseline.status} to ${current.status} and now requires investigation.`,
  };
}
