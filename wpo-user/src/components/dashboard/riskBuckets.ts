/**
 * Fills and legend labels (design spec, 0–100 score).
 * `unmappedLand` — solid blue‑grey for countries with no risk score (matches mock / screenshot land fill).
 */
export const RISK_COLORS = {
  /** Unmapped / no data — same blue‑grey as reference map land mass */
  unmappedLand: "#2f3a4a",
  /** Filled for countries with no score but hovered/selected (matches reference grey land) */
  unmappedActiveFill: "#4f5a6e",
  low: "#4ADE80",
  moderate: "#FACC15",
  high: "#FB923C",
  veryHigh: "#EF4444",
} as const;

export const RISK_THRESHOLDS = [
  { min: 0, max: 20, key: "low" as const, color: RISK_COLORS.low },
  { min: 21, max: 40, key: "moderate" as const, color: RISK_COLORS.moderate },
  { min: 41, max: 60, key: "high" as const, color: RISK_COLORS.high },
  { min: 61, max: 100, key: "veryHigh" as const, color: RISK_COLORS.veryHigh },
];

/** 0–100 display color for a raw score (legend buckets). */
export function riskScoreToDisplayColor(score: number): string {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  const row = RISK_THRESHOLDS.find((r) => s >= r.min && s <= r.max);
  return row?.color ?? RISK_COLORS.veryHigh;
}

/** 0–100; returns color for use in ColorScale interpolate (0–1 normalized) */
export function colorScaleInterpolate(_normalized0to1: number): string {
  const t = _normalized0to1;
  if (t < 0.2) {
    return RISK_COLORS.low;
  }
  if (t < 0.4) {
    return RISK_COLORS.moderate;
  }
  if (t < 0.6) {
    return RISK_COLORS.high;
  }
  return RISK_COLORS.veryHigh;
}

export const MAP_GEO = {
  borderDefault: "rgba(2, 6, 12, 0.28)",
  borderHover: "rgba(226, 232, 240, 0.92)",
  borderSelected: "rgba(255, 255, 255, 0.95)",
} as const;
