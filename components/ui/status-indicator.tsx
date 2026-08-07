type Status = "pass" | "fail" | "warning" | "neutral";

type StatusIndicatorProps = {
  status: Status;
  label?: string;
};

const defaultLabels: Record<Status, string> = {
  pass: "PASS",
  fail: "FAIL",
  warning: "WARNING",
  neutral: "PENDING",
};

export function StatusIndicator({
  status,
  label,
}: StatusIndicatorProps) {
  return (
    <span className={`status-indicator status-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {label ?? defaultLabels[status]}
    </span>
  );
}
