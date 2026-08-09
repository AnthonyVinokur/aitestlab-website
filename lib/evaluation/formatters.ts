export function formatPercent(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export function formatSeconds(value: number | null): string {
  return value == null ? "—" : `${value.toFixed(2)} s`;
}

export function formatThroughput(value: number | null): string {
  return value == null ? "—" : `${value.toFixed(2)} tok/s`;
}

export function formatNumber(value: number | null, digits = 0): string {
  return value == null ? "—" : value.toFixed(digits);
}

export function formatUsd(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value === 0 ? 2 : 4,
    maximumFractionDigits: 6,
  }).format(value);
}

export function formatGeneratedAt(value: string | null): string {
  if (!value) return "Unknown time";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(date);
}
