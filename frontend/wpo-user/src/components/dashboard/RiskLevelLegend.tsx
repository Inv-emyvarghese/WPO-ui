import { RISK_COLORS, RISK_THRESHOLDS } from "./riskBuckets";
import { MapIndicationRangeSize } from "@/constants/stringConstants";

const titleFor: Record<(typeof RISK_THRESHOLDS)[number]["key"], string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  veryHigh: "Very High",
};

const items = RISK_THRESHOLDS.map((b) => ({
  key: b.key,
  label: `${titleFor[b.key]} ${b.min}-${b.max}`,
  color: RISK_COLORS[b.key],
}));

export function RiskLevelLegend() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[1] max-w-[calc(100%-32px)]">
      <div
        className="flex max-w-full flex-row flex-wrap items-center justify-start gap-x-2 gap-y-0.5 rounded-xl border border-[rgba(148,163,184,0.2)] py-[10px] pl-1.5 pr-1.5 sm:gap-x-1.75 md:gap-x-2.25"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.72)" }}
      >
        {items.map((r) => (
          <div key={r.key} className="flex shrink-0 items-center gap-0.75">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <span
              className="whitespace-nowrap text-[#E5E7EB]"
              style={{ fontSize: MapIndicationRangeSize }}
            >
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
