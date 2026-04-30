import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { registerDashboardCharts } from "../chartRegister";
import { riskCategories, shortTitleFromCategory } from "./riskDimensionsData";
import { RiskDimensionSummaryTable } from "./riskDimensionSummaryTable";

const chartHeightStyle = { minHeight: 320, height: 320 };

export function RiskDimensionsChart() {
  const { t } = useTranslation();
  const p = "dashboard.dimensionScores";
  const [ready] = useState(() => {
    registerDashboardCharts();
    return true;
  });

  const data: ChartData<"radar"> = useMemo(
    () => ({
      labels: riskCategories.map((c) => shortTitleFromCategory(c)),
      datasets: [
        {
          label: t(`${p}.chartEnforcement`),
          data: riskCategories.map((c) => (c.enforcementScore / 10) * 100),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.12)",
          pointBackgroundColor: "rgb(59, 130, 246)",
        },
        {
          label: t(`${p}.chartPenalty`),
          data: riskCategories.map((c) => (c.penaltyScore / 10) * 100),
          borderColor: "rgb(245, 158, 11)",
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          pointBackgroundColor: "rgb(245, 158, 11)",
        },
        {
          label: t(`${p}.chartOverallRisk`),
          data: riskCategories.map((c) => (c.overallScore / 20) * 100),
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          pointBackgroundColor: "rgb(239, 68, 68)",
        },
      ],
    }),
    [t]
  );

  const options: ChartOptions<"radar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 500 },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            showLabelBackdrop: false,
          },
          pointLabels: {
            font: { size: 11, weight: 600 },
            color: "#64748b",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const i = ctx.dataIndex;
              const cat = riskCategories[i]!;
              const line = String(ctx.dataset.label ?? "");
              if (line === t(`${p}.chartOverallRisk`)) {
                return `${line}: ${cat.overallScore}/20`;
              }
              const rawKey =
                line === t(`${p}.chartEnforcement`) ? "enforcementScore" : "penaltyScore";
              return `${line}: ${cat[rawKey]}/10`;
            },
          },
        },
      },
    }),
    [t, p]
  );

  const avgE = useMemo(
    () =>
      (
        riskCategories.reduce((a, c) => a + c.enforcementScore, 0) /
        riskCategories.length
      ).toFixed(1),
    []
  );
  const avgP = useMemo(
    () =>
      (
        riskCategories.reduce((a, c) => a + c.penaltyScore, 0) / riskCategories.length
      ).toFixed(1),
    []
  );
  const avgO = useMemo(
    () =>
      (
        riskCategories.reduce((a, c) => a + c.overallScore, 0) / riskCategories.length
      ).toFixed(1),
    []
  );

  if (!ready) {
    return (
      <div
        className="flex w-full min-w-0 items-center justify-center text-sm text-slate-500"
        style={chartHeightStyle}
        role="status"
      >
        {t("dashboard.map.loading")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div
        className="relative w-full min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-4 lg:col-span-5"
        style={chartHeightStyle}
      >
        <h4 className="absolute left-4 top-4 z-10 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {t(`${p}.comparativeRiskRadar`)}
        </h4>
        <div
          className="h-full w-full min-h-0 pt-8"
          style={{ minHeight: 280 }}
        >
          <Radar data={data} options={options} aria-label={t(`${p}.radarChartAria`)} />
        </div>
      </div>

      <div className="w-full min-w-0 space-y-4 lg:col-span-7">
        <RiskDimensionSummaryTable ariaLabel={t(`${p}.summaryAriaLabel`)} />

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-blue-100 bg-blue-50/50 p-3 text-center">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-500">
              {t(`${p}.avgEnforcement`)}
            </div>
            <div className="text-xl font-bold text-blue-700">
              {avgE}
              <span className="text-sm font-normal text-blue-400">/10</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-amber-100 bg-amber-50/50 p-3 text-center">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-500">
              {t(`${p}.avgPenalty`)}
            </div>
            <div className="text-xl font-bold text-amber-700">
              {avgP}
              <span className="text-sm font-normal text-amber-400">/10</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-red-100 bg-red-50/50 p-3 text-center">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
              {t(`${p}.avgOverallRisk`)}
            </div>
            <div className="text-xl font-bold text-red-700">
              {avgO}
              <span className="text-sm font-normal text-red-400">/20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
