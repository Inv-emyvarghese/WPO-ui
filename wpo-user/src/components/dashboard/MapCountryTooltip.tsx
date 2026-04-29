import type { CSSProperties } from "react";
import type { MapCountryMockDetail } from "./mapCountryMockDetail";

const panelClass =
  "min-w-[300px] max-w-[340px] box-border rounded-[10px] border border-[rgba(100,116,139,0.45)] p-2 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)]";
const panelStyle: CSSProperties = {
  backgroundColor: "rgba(15, 22, 38, 0.97)",
  fontFamily: 'Inter, "Noto Sans JP", sans-serif',
};

function barTrack(value0to100: number, color: string) {
  return (
    <div
      className="relative mx-0.5 min-w-[48px] flex-1 overflow-hidden rounded"
      style={{ height: 6, backgroundColor: "rgba(30, 41, 59, 0.85)" }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 rounded"
        style={{ width: `${value0to100}%`, backgroundColor: color }}
      />
    </div>
  );
}

type Props = {
  detail: MapCountryMockDetail;
  x: number;
  y: number;
};

function placement(x: number, y: number) {
  if (globalThis.window === undefined) {
    return { left: x + 18, top: y + 14 };
  }
  const w = globalThis.window.innerWidth;
  const hWin = globalThis.window.innerHeight;
  const pad = 12;
  const wT = 360;
  const hT = 420;
  return {
    left: Math.max(pad, Math.min(x + 18, w - wT - pad)),
    top: Math.max(pad, Math.min(y + 14, hWin - hT - pad)),
  };
}

/**
 * Design reference: country hover card (overall, five sub-metrics, footer).
 * Positioned fixed near the pointer; `pointerEvents: "none"`.
 */
export function MapCountryTooltip({ detail, x, y }: Readonly<Props>) {
  const { left, top } = placement(x, y);
  return (
    <div
      role="tooltip"
      data-testid="map-country-tooltip"
      className={`${panelClass} pointer-events-none fixed z-[1600]`}
      style={{ ...panelStyle, left, top }}
    >
      <div className="flex items-start justify-between gap-1.5 pb-1.5 pr-1">
        <div className="min-w-0 flex-1 text-[0.9rem] font-bold leading-tight text-white">
          {detail.countryName}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[1.75rem] font-extrabold leading-none text-white">{detail.overall}</div>
          <div className="text-[0.7rem] text-[rgba(148,163,184,0.9)]">Overall Risk</div>
        </div>
      </div>

      <div className="border-t border-[rgba(51,65,85,0.75)] py-2.5">
        {detail.metrics.map((m) => (
          <div
            key={m.key}
            className="grid items-center gap-0.5 py-0.4"
            style={{ gridTemplateColumns: "1fr 1.4fr 28px" }}
          >
            <div className="text-[0.7rem] text-[rgba(148,163,184,0.95)]">{m.label}</div>
            {barTrack(m.value, m.color)}
            <div className="text-right text-[0.75rem] font-semibold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <div
        className="grid gap-1.5 border-t border-[rgba(51,65,85,0.75)] pt-1.25"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <div className="text-[0.7rem] text-[rgba(148,163,184,0.9)]">First Established</div>
          <div className="text-[0.85rem] font-bold text-white">{detail.established}</div>
        </div>
        <div>
          <div className="text-[0.7rem] text-[rgba(148,163,184,0.9)]">Mandatory Assessment</div>
          <div
            className="text-[0.85rem] font-bold"
            style={{ color: detail.mandatory === "Partial" ? "#facc15" : "#fff" }}
          >
            {detail.mandatory}
          </div>
        </div>
      </div>
    </div>
  );
}
