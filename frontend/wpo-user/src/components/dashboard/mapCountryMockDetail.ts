/** Deterministic “detail panel” data for the map hover tooltip. */

function hash32(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export type MapCountryMockMetric = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export type MapCountryMockDetail = {
  countryName: string;
  overall: number;
  metrics: MapCountryMockMetric[];
  established: number;
  /** "Full" | "Partial" | "None" */
  mandatory: string;
};

const METRIC_COLORS = {
  financial: "#3b82f6",
  reputational: "#8b5cf6",
  criminal: "#ef4444",
  operational: "#f97316",
  insurance: "#14b8a6",
} as const;

const LABELS: readonly { key: string; label: string; color: string }[] = [
  { key: "financial", label: "Financial Risk", color: METRIC_COLORS.financial },
  { key: "reputational", label: "Reputational Risk", color: METRIC_COLORS.reputational },
  { key: "criminal", label: "Criminal Risk", color: METRIC_COLORS.criminal },
  { key: "operational", label: "Operational Risk", color: METRIC_COLORS.operational },
  { key: "insurance", label: "Insurance Risk", color: METRIC_COLORS.insurance },
];

export function getMapCountryMockDetail(
  id: string,
  displayName: string,
  dataScore: number | null
): MapCountryMockDetail {
  const h = hash32(id);
  const overall =
    dataScore != null && !Number.isNaN(dataScore)
      ? Math.round(dataScore)
      : 16 + (h % 80);

  const metrics: MapCountryMockMetric[] = LABELS.map((row, j) => ({
    key: row.key,
    label: row.label,
    color: row.color,
    value: 20 + (hash32(`${id}:${j}:${row.key}`) % 75),
  }));

  const mod = h % 3;
  let mandatory: MapCountryMockDetail["mandatory"] = "None";
  if (mod === 0) {
    mandatory = "Full";
  } else if (mod === 1) {
    mandatory = "Partial";
  }

  return {
    countryName: displayName || "—",
    overall,
    metrics,
    established: 1995 + (h % 28),
    mandatory,
  };
}
