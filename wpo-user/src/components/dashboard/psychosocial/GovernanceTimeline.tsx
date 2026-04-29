import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Line } from "react-chartjs-2";
import { type ChartData, type ChartOptions } from "chart.js";
import { ChevronDown } from "lucide-react";
import { registerDashboardCharts } from "../chartRegister";
import { governanceRiskPoints, type Milestone } from "./governanceTimelineData";
import { getWorldCountryFilterOptions } from "../worldGeo";
import { cx } from "@/utils/cx";

const MILESTONES: Milestone[] = [
  {
    id: "e1",
    year: 2022,
    titleKey: "milestone1.title",
    bodyKey: "milestone1.body",
    tagKey: "milestone1.tag",
    category: "regulatory",
  },
  {
    id: "e2",
    year: 2024,
    titleKey: "milestone2.title",
    bodyKey: "milestone2.body",
    tagKey: "milestone2.tag",
    category: "obligations",
  },
  {
    id: "e3",
    year: 2026,
    titleKey: "milestone3.title",
    bodyKey: "milestone3.body",
    tagKey: "milestone3.tag",
    category: "enforcement",
  },
];

const DOT_BY_YEAR: Record<number, string> = {
  2022: "#fbbf24",
  2024: "#fbbf24",
  2026: "#f97316",
};

type Props = { className?: string };

export function GovernanceTimeline({ className = "" }: Readonly<Props>) {
  const { t } = useTranslation();
  const g = "dashboard.mapDetailTabs.forecastingContent.governance";
  const [ready] = useState(() => {
    registerDashboardCharts();
    return true;
  });
  const countryOptions = useMemo(() => {
    return getWorldCountryFilterOptions()
      .slice(0, 12)
      .map((o) => o.name);
  }, []);
  const [country, setCountry] = useState("Ukraine");

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels: governanceRiskPoints.map((p) => p.year),
      datasets: [
        {
          label: t(`${g}.sub`),
          data: governanceRiskPoints.map((p) => p.riskScore),
          borderColor: "rgb(16, 185, 129)",
          borderWidth: 2,
          tension: 0.35,
          pointRadius: governanceRiskPoints.map((p) =>
            DOT_BY_YEAR[p.year] ? 5 : 0
          ),
          pointBackgroundColor: governanceRiskPoints.map(
            (p) => DOT_BY_YEAR[p.year] ?? "transparent"
          ),
        },
      ],
    }),
    [t, g]
  );

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      color: "rgba(255,255,255,0.2)",
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { right: 8, left: 0, top: 4, bottom: 4 } },
      interaction: { intersect: false, mode: "index" },
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(51, 65, 85, 0.8)" },
          ticks: { color: "#94a3b8", maxRotation: 0 },
        },
        y: {
          min: 0,
          max: 100,
          display: false,
          grid: { color: "rgba(51, 65, 85, 0.8)" },
        },
      },
    }),
    []
  );

  if (!ready || countryOptions.length === 0) {
    return null;
  }

  return (
    <div className={cx("space-y-6", className)}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
            {t(`${g}.sub`)}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {t(`${g}.description`)}
          </p>
        </div>
        <div className="relative w-48 min-w-0">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="w-full appearance-none rounded-md border border-slate-300 bg-slate-50 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label={t(`${g}.countryLabel`)}
          >
            {countryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4 shadow-inner">
        <div className="from-slate-800 to-slate-900" />
        <div className="relative z-10" style={{ height: 220, minHeight: 220 }}>
          <div className="text-xs font-bold text-red-400 absolute right-1 top-2 z-20">
            {t(`${g}.yHigh`)}
          </div>
          <div className="text-xs font-bold text-green-400 absolute bottom-8 left-1 z-20">
            {t(`${g}.yLow`)}
          </div>
          <Line
            data={data}
            options={options as ChartOptions<"line">}
            aria-label={t(`${g}.lineAria`, { defaultValue: "Risk trend line" })}
          />
        </div>
        <div className="from-green-500 via-yellow-500 to-red-500 relative z-10 mt-1 h-4 w-full rounded-full bg-gradient-to-r opacity-80" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {MILESTONES.map((e) => (
          <div key={e.id} className="relative border-l-2 border-slate-300 pl-4">
            <div
              className={cx(
                "absolute top-0 left-[-5px] h-2.5 w-2.5 rounded-full",
                e.category === "regulatory" && "bg-green-500",
                e.category === "obligations" && "bg-yellow-500",
                e.category === "enforcement" && "bg-orange-500"
              )}
            />
            <h4 className="mb-1 text-sm font-bold text-slate-800 leading-tight">
              {t(`${g}.${e.titleKey}`)}
            </h4>
            <p className="mb-2 text-xs text-slate-500 leading-snug">
              {t(`${g}.${e.bodyKey}`)}
            </p>
            <span className="inline-block rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium tracking-wide text-slate-500 uppercase">
              {t(`${g}.${e.tagKey}`)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-4">
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {t(`${g}.trendNote`)}:
        </span>
        {(
          [
            { col: "bg-green-500", k: "trend1" },
            { col: "bg-yellow-500", k: "trend2" },
            { col: "bg-orange-500", k: "trend3" },
          ] as const
        ).map((row) => (
          <div key={row.k} className="flex items-center gap-2">
            <div className={cx("h-3 w-3 rounded", row.col)} />
            <span className="text-xs text-slate-600">{t(`${g}.${row.k}`)}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 italic">* {t(`${g}.disclaimer`)}</p>
    </div>
  );
}
