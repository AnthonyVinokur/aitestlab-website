export type EvaluationStatus =
  "PASS" | "FAIL" | "XFAIL" | "XPASS" | "ERROR" | "SKIP" | string;

export interface RawEvaluationMetric {
  metric_name?: string;
  score?: number | null;
  passed?: boolean | null;
  threshold?: number | null;
  engine?: string;
  reason?: string | null;
  runtime_options?: Record<string, unknown>;
  profile_name?: string | null;
  profile_version?: string | null;
  evaluator_model?: string | null;
  [key: string]: unknown;
}

export interface RawEvaluationEngineResult {
  engine?: string;
  succeeded?: boolean;
  error?: string | null;
  [key: string]: unknown;
}

export interface RawEvaluationResult {
  test_id?: string;
  name?: string;
  category?: string;
  prompt?: string;
  provider?: string;
  model?: string;
  estimated_cost_usd?: number | null;
  actual_response?: string;
  passed?: boolean;
  status?: EvaluationStatus;
  expected_to_fail?: boolean;
  assertion_type?: string;
  expected?: unknown;
  reason?: string;
  evaluation_results?: RawEvaluationMetric[];
  engine_results?: RawEvaluationEngineResult[];
  response_time_seconds?: number | null;
  prompt_tokens?: number | null;
  output_tokens?: number | null;
  prompt_latency_seconds?: number | null;
  generation_latency_seconds?: number | null;
  model_load_seconds?: number | null;
  prompt_tokens_per_second?: number | null;
  generation_tokens_per_second?: number | null;
  [key: string]: unknown;
}

export interface RawModelComparison {
  provider?: string;
  model?: string;
  passed?: number;
  expected_failures?: number;
  unexpected_failures?: number;
  errors?: number;
  total?: number;
  pass_rate_percent?: number;
  average_response_time_seconds?: number | null;
  average_generation_latency_seconds?: number | null;
  average_generation_tokens_per_second?: number | null;
  average_output_tokens?: number | null;
  total_estimated_cost_usd?: number | null;
  [key: string]: unknown;
}

export interface RawEvaluationReport {
  schema_version?: string;
  report_type?: string;
  run_id?: string;
  generated_at?: string;
  models?: string[];
  summary?: {
    passed?: number;
    failed?: number;
    expected_failures?: number;
    unexpected_failures?: number;
    errors?: number;
    total?: number;
    pass_rate_percent?: number;
    total_estimated_cost_usd?: number | null;
    [key: string]: unknown;
  };
  highlights?: {
    highest_scoring_model?: string | null;
    fastest_model?: string | null;
    [key: string]: unknown;
  };
  model_comparison?: RawModelComparison[];
  results?: RawEvaluationResult[];
  [key: string]: unknown;
}

export interface EvaluationMetric {
  name: string;
  engine: string;
  score: number | null;
  threshold: number | null;
  passed: boolean | null;
  reason: string | null;
  profileName: string | null;
  profileVersion: string | null;
  evaluatorModel: string | null;
}

export interface EvaluationEngineResult {
  engine: string;
  succeeded: boolean | null;
  error: string | null;
}

export interface EvaluationCase {
  id: string;
  name: string;
  category: string;
  prompt: string;
  provider: string;
  model: string;
  status: EvaluationStatus;
  expectedToFail: boolean;
  assertionType: string;
  expected: string;
  actualResponse: string;
  reason: string;
  estimatedCostUsd: number | null;
  responseTimeSeconds: number | null;
  promptTokens: number | null;
  outputTokens: number | null;
  promptLatencySeconds: number | null;
  generationLatencySeconds: number | null;
  modelLoadSeconds: number | null;
  promptTokensPerSecond: number | null;
  generationTokensPerSecond: number | null;
  metrics: EvaluationMetric[];
  engineResults: EvaluationEngineResult[];
}

export interface EvaluationModelSummary {
  provider: string;
  model: string;
  passed: number;
  expectedFailures: number;
  unexpectedFailures: number;
  errors: number;
  total: number;
  passRatePercent: number;
  averageResponseTimeSeconds: number | null;
  averageGenerationLatencySeconds: number | null;
  averageGenerationTokensPerSecond: number | null;
  averageOutputTokens: number | null;
  totalEstimatedCostUsd: number | null;
}
export interface EvaluationRunContext {
  provider: string | null;
  model: string | null;
  profileName: string | null;
  profileVersion: string | null;
}

export interface EvaluationRun {
  schemaVersion: string;
  reportType: string;
  runId: string;
  generatedAt: string | null;
  models: string[];
  passed: number;
  expectedFailures: number;
  unexpectedFailures: number;
  errors: number;
  total: number;
  passRatePercent: number;
  totalEstimatedCostUsd: number | null;
  highestScoringModel: string | null;
  fastestModel: string | null;
  modelComparison: EvaluationModelSummary[];
  results: EvaluationCase[];
  decision: EvaluationDecision;
  context: EvaluationRunContext;
}
export type EvaluationDecisionStatus = "CLEAR" | "ATTENTION_REQUIRED";

export interface EvaluationDecision {
  status: EvaluationDecisionStatus;
  unexpectedFailures: number;
  errors: number;
  explanation: string;
}
