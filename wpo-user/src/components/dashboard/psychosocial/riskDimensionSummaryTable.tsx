import { useTranslation } from "react-i18next";
import { riskCategories, shortTitleFromCategory, type RiskCategory } from "./riskDimensionsData";
import { cx } from "@/utils/cx";

function getOverallPillClass(score: number) {
  if (score >= 15) {
    return "bg-red-50 text-red-600";
  }
  if (score >= 10) {
    return "bg-orange-50 text-orange-600";
  }
  return "bg-green-50 text-green-600";
}

function getRiskLabelKey(score: number): "high" | "medium" | "low" {
  if (score >= 15) {
    return "high";
  }
  if (score >= 10) {
    return "medium";
  }
  return "low";
}

type RiskFactorPillProps = { score: number };

function RiskFactorPill({ score }: Readonly<RiskFactorPillProps>) {
  const { t } = useTranslation();
  const k = getRiskLabelKey(score);
  const classByKey = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-green-100 text-green-700",
  } as const;
  const p = "dashboard.mapDetailTabs.dimensionTable.riskFactor";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        classByKey[k]
      )}
    >
      {t(`${p}.${k}`)}
    </span>
  );
}

type RowProps = { cat: RiskCategory };

function DimensionSummaryTableRow({ cat }: Readonly<RowProps>) {
  return (
    <tr className="group transition-colors hover:bg-slate-50">
      <td className="px-4 py-2.5 font-medium text-slate-700">
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "h-2 w-2 shrink-0 rounded-full",
              cat.id === "financial" && "bg-green-600",
              cat.id === "criminal" && "bg-red-600",
              cat.id === "operational" && "bg-blue-600",
              cat.id === "reputational" && "bg-purple-600",
              cat.id === "insurance" && "bg-amber-600"
            )}
          />
          {shortTitleFromCategory(cat)}
        </div>
      </td>
      <td className="px-2 py-2.5 text-center">
        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-600">
          {cat.enforcementScore}
        </span>
      </td>
      <td className="px-2 py-2.5 text-center">
        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-600">
          {cat.penaltyScore}
        </span>
      </td>
      <td className="px-2 py-2.5 text-center">
        <span
          className={cx(
            "rounded px-1.5 py-0.5 text-xs font-bold",
            getOverallPillClass(cat.overallScore)
          )}
        >
          {cat.overallScore}
        </span>
      </td>
      <td className="px-4 py-2.5">
        <RiskFactorPill score={cat.overallScore} />
      </td>
    </tr>
  );
}

type SummaryTableProps = { ariaLabel: string };

export function RiskDimensionSummaryTable({ ariaLabel }: Readonly<SummaryTableProps>) {
  const { t } = useTranslation();
  const p = "dashboard.dimensionScores";
  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      aria-label={ariaLabel}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">{t(`${p}.colDimension`)}</th>
            <th className="px-2 py-3 text-center font-semibold">{t(`${p}.colEnf`)}</th>
            <th className="px-2 py-3 text-center font-semibold">{t(`${p}.colPen`)}</th>
            <th className="px-2 py-3 text-center font-semibold">{t(`${p}.colOverall`)}</th>
            <th className="px-4 py-3 font-semibold">{t(`${p}.colRiskFactor`)}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {riskCategories.map((c) => (
            <DimensionSummaryTableRow key={c.id} cat={c} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
