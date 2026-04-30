import { useTranslation } from "react-i18next";
import { Activity, AlertTriangle, Layers, Scale, TrendingUp } from "lucide-react";
import { PanelContainer } from "@/components/dashboard/psychosocial/PanelContainer";
import { DashboardMetricCard } from "@/components/dashboard/psychosocial/DashboardMetricCard";
import { ExecutiveRecommendationsSection } from "./ExecutiveRecommendationsSection";
import { cx } from "@/utils/cx";
import { Link } from "react-router-dom";

const riskAlert = {
  border: "border-red-200",
  label: "text-red-800",
  bg: "bg-red-50",
  icon: "text-red-600",
};

const moderate = {
  border: "border-yellow-200",
  label: "text-yellow-800",
  bg: "bg-yellow-50",
  icon: "text-yellow-600",
};

const information = {
  border: "border-blue-200",
  label: "text-blue-800",
  bg: "bg-blue-50",
  icon: "text-blue-600",
};

type AlertVariant = typeof riskAlert | typeof moderate | typeof information;

type AlertRowProps = {
  title: string;
  body: string;
  date: string;
  viewSource: string;
  variant: AlertVariant;
  header: React.ReactNode;
};

function AlertRow({ title, body, date, viewSource, variant, header }: Readonly<AlertRowProps>) {
  return (
    <div
      className={cx(
        "flex w-full min-w-0 flex-1 flex-col rounded-lg border p-4",
        variant.border,
        variant.bg,
      )}
    >
      <div className="mb-1 flex items-start gap-2">
        <div className={variant.icon} aria-hidden>
          {header}
        </div>
        <p className={cx("text-sm font-bold", variant.label)}>{title}</p>
      </div>
      <p className="flex-1 text-sm text-slate-700">{body}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{date}</span>
        <Link
          to="#"
          onClick={(e) => e.preventDefault()}
          className={cx("text-xs font-medium underline", variant.label)}
        >
          {viewSource}
        </Link>
      </div>
    </div>
  );
}

export function ExecutiveOverviewContent() {
  const { t } = useTranslation();
  const p = "dashboard.mapDetailTabs.executiveOverviewContent";

  return (
    <div className="box-border flex w-full flex-col gap-[24px] py-2.5">
      <PanelContainer
        title={t(`${p}.keyRiskMetrics`)}
        contentClassName="flex min-h-[134px] flex-col items-start self-stretch px-5 pt-5 pb-0"
      >
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardMetricCard
            label={t(`${p}.metrics.overallRiskScore`)}
            value={t(`${p}.metrics.overallRiskScoreValue`)}
            icon={<AlertTriangle size={20} strokeWidth={2} aria-hidden />}
          />
          <DashboardMetricCard
            label={t(`${p}.metrics.tier`)}
            value={t(`${p}.metrics.tierValue`)}
            icon={<Layers size={20} strokeWidth={2} aria-hidden />}
          />
          <DashboardMetricCard
            label={t(`${p}.metrics.regulatoryMaturity`)}
            value={t(`${p}.metrics.regulatoryMaturityValue`)}
            icon={<Scale size={20} strokeWidth={2} aria-hidden />}
          />
          <DashboardMetricCard
            label={t(`${p}.metrics.trendDirection`)}
            value={t(`${p}.metrics.trendDirectionValue`)}
            icon={<TrendingUp size={20} strokeWidth={2} aria-hidden />}
          />
        </div>
      </PanelContainer>

      <PanelContainer title={t(`${p}.recentUpdates`)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AlertRow
            variant={riskAlert}
            title={t(`${p}.alerts.critical.title`)}
            body={t(`${p}.alerts.critical.body`)}
            date={t(`${p}.alerts.critical.date`)}
            viewSource={t(`${p}.viewSource`)}
            header={<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
          />
          <AlertRow
            variant={moderate}
            title={t(`${p}.alerts.moderate.title`)}
            body={t(`${p}.alerts.moderate.body`)}
            date={t(`${p}.alerts.moderate.date`)}
            viewSource={t(`${p}.viewSource`)}
            header={<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
          />
          <AlertRow
            variant={information}
            title={t(`${p}.alerts.information.title`)}
            body={t(`${p}.alerts.information.body`)}
            date={t(`${p}.alerts.information.date`)}
            viewSource={t(`${p}.viewSource`)}
            header={<Activity className="mt-0.5 h-5 w-5 shrink-0" />}
          />
        </div>
      </PanelContainer>

      <ExecutiveRecommendationsSection />
    </div>
  );
}
