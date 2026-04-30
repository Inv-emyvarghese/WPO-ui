import { useTranslation } from "react-i18next";
import {
  DollarSign,
  Gavel,
  Megaphone,
  Settings,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { riskCategories, type RiskCategory } from "./riskDimensionsData";
import { cx } from "@/utils/cx";

const ID_TO_ICON: Record<string, React.ReactNode> = {
  financial: <DollarSign className="h-6 w-6 text-green-600" />,
  criminal: <Gavel className="h-6 w-6 text-red-600" />,
  operational: <Settings className="h-6 w-6 text-blue-600" />,
  reputational: <Megaphone className="h-6 w-6 text-purple-600" />,
  insurance: <ShieldCheck className="h-6 w-6 text-amber-600" />,
};

type ScoreBarProps = {
  value: number;
  max: number;
  label: string;
  colorClass: string;
  explanation: string;
};

function ScoreBar({ value, max, label, colorClass, explanation }: Readonly<ScoreBarProps>) {
  const percentage = (value / max) * 100;
  return (
    <div className="min-w-[200px] flex-1">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </span>
        <span className="text-sm font-bold text-slate-800">
          {value}/{max}
        </span>
      </div>
      <div className="mb-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cx("h-full rounded-full transition-all duration-500", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs leading-relaxed text-slate-500">{explanation}</p>
    </div>
  );
}

type CategoryCardProps = { category: RiskCategory };

function CategoryCard({ category }: Readonly<CategoryCardProps>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="mb-6 flex items-start gap-4">
          <div
            className={cx(
              "rounded-xl border border-slate-100 p-3",
              category.bgColor
            )}
          >
            {ID_TO_ICON[category.id]}
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              {category.title}
            </h3>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              {category.description}
            </p>
          </div>
        </div>

        <div className="-mx-6 grid grid-cols-1 gap-6 border-t border-slate-100 bg-slate-50/50 px-6 pt-6 pb-6 md:grid-cols-3">
          <ScoreBar
            value={category.enforcementScore}
            max={10}
            label="Enforcement"
            colorClass="bg-blue-500"
            explanation={category.enforcementExplanation}
          />
          <ScoreBar
            value={category.penaltyScore}
            max={10}
            label="Penalty severity"
            colorClass="bg-amber-500"
            explanation={category.penaltyExplanation}
          />
          <ScoreBar
            value={category.overallScore}
            max={20}
            label="Overall risk"
            colorClass="bg-red-500"
            explanation={category.overallExplanation}
          />
        </div>
      </div>
    </div>
  );
}

export function RiskDimensionsTable() {
  const { t } = useTranslation();
  const p = "dashboard.mapDetailTabs.dimensionTable";

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
        <div className="text-sm text-slate-600">
          <p className="mb-1 font-semibold text-slate-800">{t(`${p}.overviewTitle`)}</p>
          <p>{t(`${p}.overviewBody`)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {riskCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export type { RiskCategory } from "./riskDimensionsData";
