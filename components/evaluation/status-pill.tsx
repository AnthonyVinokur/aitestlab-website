import type { EvaluationStatus } from "@/lib/evaluation/types";

export function EvaluationStatusPill({ status }: { status: EvaluationStatus }) {
  const normalized = status.toUpperCase();
  return (
    <span
      className={`evaluation-status evaluation-status-${normalized.toLowerCase()}`}
      data-status={normalized}
    >
      {normalized}
    </span>
  );
}
