import { useTranslation } from "react-i18next";
import { Database, Globe, Scale } from "lucide-react";
import { PanelContainer } from "./PanelContainer";

const PRIMARY_KEYS = ["ilo", "who", "oecd", "gpi"] as const;
const FW_KEYS = ["iso", "eu", "ca"] as const;
const DC_ROWS = [
  { k: "high" as const, color: "bg-green-500", title: "text-green-700", border: "hover:border-green-300" },
  { k: "mediumHigh" as const, color: "bg-emerald-500", title: "text-emerald-600", border: "hover:border-emerald-300" },
  { k: "medium" as const, color: "bg-amber-500", title: "text-amber-600", border: "hover:border-amber-300" },
  { k: "low" as const, color: "bg-red-500", title: "text-red-600", border: "hover:border-red-300" },
] as const;

type Props = { className?: string };

export function SourceAttribution({ className = "" }: Readonly<Props>) {
  const { t } = useTranslation();
  const r = "dashboard.references";

  return (
    <div className={className} id="data-confidence">
      <PanelContainer title={t(`${r}.sectionTitle`)}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-800">
                  {t(`${r}.primaryDataSources`)}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {PRIMARY_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {t(`${r}.primaryItems.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">
                  {t(`${r}.regulatoryFrameworks`)}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {FW_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    {t(`${r}.frameworkItems.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-slate-800">{t(`${r}.methodologyNote`)}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {t(`${r}.methodologyBody`)}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 italic">
              <span>{t(`${r}.methodologyVersion`)}</span>
              <span>{t(`${r}.methodologyReview`)}</span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Globe className="h-4 w-4 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                {t(`${r}.dataConfidenceLevels`)}
              </h3>
            </div>
            <p className="mb-6 max-w-3xl text-sm text-slate-600">
              {t(`${r}.dataConfidenceIntro`)}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DC_ROWS.map((row) => (
                <div
                  key={row.k}
                  className={
                    "relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors " +
                    row.border
                  }
                >
                  <div
                    className={["absolute top-0 left-0 h-full w-1", row.color].join(" ")}
                  />
                  <div
                    className={["mb-2 text-sm font-bold uppercase tracking-wide", row.title].join(" ")}
                  >
                    {t(`dashboard.references.confidence.${row.k}`)}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {t(`${r}.dataConfidence.${row.k}Body`)}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-700">
                    {t(`${r}.dataConfidence.${row.k}Use`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PanelContainer>
    </div>
  );
}
