import { useState, useEffect, type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  Activity,
  BarChart2,
  BookOpen,
  FileText,
  TrendingUp,
} from "lucide-react";
import { ExecutiveOverviewContent } from "./ExecutiveOverviewContent";
import { ExecutiveOverviewEmptyState } from "./ExecutiveOverviewEmptyState";
import { TabBar } from "@/components/common/icons/TabBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PanelContainer } from "@/components/dashboard/psychosocial/PanelContainer";
import { RiskDimensionsTable } from "@/components/dashboard/psychosocial/RiskDimensionsTable";
import { RiskDimensionsChart } from "@/components/dashboard/psychosocial/RiskDimensionsChart";
import { RegulatorySeverityIndex } from "@/components/dashboard/psychosocial/RegulatorySeverityIndex";
import { SystemLevelIndicators } from "@/components/dashboard/psychosocial/SystemLevelIndicators";
import { RiskMatrix } from "@/components/dashboard/psychosocial/RiskMatrix";
import { GovernanceTimeline } from "@/components/dashboard/psychosocial/GovernanceTimeline";
import { SourceAttribution } from "@/components/dashboard/psychosocial/SourceAttribution";

const EXECUTIVE_OVERVIEW_TAB = 0;
const DIMENSIONS_SCORES_TAB = 1;
const CONTEXT_TAB = 2;
const FORECASTING_TAB = 3;
const REFERENCES_TAB = 4;

const mapHorizontalGutter = "px-3 sm:px-4 md:px-5";

const TAB_ICONS = [Activity, BarChart2, FileText, TrendingUp, BookOpen] as const;

const tabLabelKeys = [
  "executiveOverview",
  "dimensionsAndScores",
  "context",
  "forecasting",
  "references",
] as const;

const selectedTabClassName =
  "rounded-t-lg border-t-[3px] border-t-blue-600 bg-white !text-blue-700 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]";

type Props = {
  hasSelectedCountry: boolean;
  selectedCountry: { id: string; name: string } | null;
};

export function DashboardMapDetailTabs({
  hasSelectedCountry,
  selectedCountry,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const isSmUp = useMediaQuery("(min-width: 37.5rem)");
  const [value, setValue] = useState(EXECUTIVE_OVERVIEW_TAB);

  useEffect(() => {
    if (!hasSelectedCountry) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional sync when map selection clears
      setValue(EXECUTIVE_OVERVIEW_TAB);
    }
  }, [hasSelectedCountry]);

  const tabsValue = hasSelectedCountry ? value : EXECUTIVE_OVERVIEW_TAB;
  const panelId = hasSelectedCountry ? value : EXECUTIVE_OVERVIEW_TAB;

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tPrefix = "dashboard.mapDetailTabs";

  const items = tabLabelKeys.map((labelKey, index) => {
    const tabDisabled = !hasSelectedCountry && index > EXECUTIVE_OVERVIEW_TAB;
    const Icon = TAB_ICONS[index]!;
    return {
      value: index,
      id: `dashboard-map-tab-${index}`,
      panelId: `dashboard-map-tabpanel-${index}`,
      label: t(`${tPrefix}.${labelKey}`),
      icon: <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />,
      disabled: tabDisabled,
      title: tabDisabled ? t(`${tPrefix}.selectCountryToEnable`) : undefined,
    };
  });

  const f = "dashboard.mapDetailTabs.forecastingContent";
  return (
    <div
      key={selectedCountry?.id ?? "no-country"}
      className="relative z-[1] mt-0 flex min-h-0 w-full min-w-0 max-w-full flex-[0_0_auto] flex-col self-stretch"
    >
      <div
        className={`sticky top-0 z-20 border-b border-slate-200 bg-slate-100 ${mapHorizontalGutter}`}
      >
        <TabBar
          value={tabsValue}
          onChange={handleChange}
          variant={isSmUp ? "fullWidth" : "scrollable"}
          items={items}
          contentClassName="text-sm"
          selectedAccentClassName={selectedTabClassName}
        />
      </div>

      <div
        className={`min-h-[200px] min-w-0 flex-1 py-6 sm:py-8 ${mapHorizontalGutter} bg-slate-100`}
        role="tabpanel"
        id={`dashboard-map-tabpanel-${panelId}`}
        aria-labelledby={`dashboard-map-tab-${panelId}`}
      >
        {!hasSelectedCountry && (
          <div className="min-h-0 w-full">
            <ExecutiveOverviewEmptyState />
          </div>
        )}

        {hasSelectedCountry && value === EXECUTIVE_OVERVIEW_TAB && <ExecutiveOverviewContent />}

        {hasSelectedCountry && value === DIMENSIONS_SCORES_TAB && (
          <div className="w-full min-w-0 max-w-full space-y-6">
            <PanelContainer title={t("dashboard.mapDetailTabs.panels.dimensionsTitle")} collapsible defaultExpanded>
              <RiskDimensionsTable />
            </PanelContainer>
            <PanelContainer title={t("dashboard.dimensionScores.riskDimensionsVisualizationTitle")} collapsible defaultExpanded>
              <RiskDimensionsChart />
            </PanelContainer>
          </div>
        )}

        {hasSelectedCountry && value === CONTEXT_TAB && (
          <div className="w-full min-w-0 max-w-full space-y-6">
            <PanelContainer
              title={t("dashboard.mapDetailTabs.panels.systemLevelTitle")}
              collapsible
              defaultExpanded={false}
            >
              <SystemLevelIndicators />
            </PanelContainer>
            <PanelContainer title={t("dashboard.mapDetailTabs.panels.regulatoryIndexTitle")}>
              <RegulatorySeverityIndex />
            </PanelContainer>
          </div>
        )}

        {hasSelectedCountry && value === FORECASTING_TAB && (
          <div className="min-h-0 w-full min-w-0 max-w-full space-y-6 self-stretch">
            <PanelContainer title={t(`${f}.matrix.title`)}>
              <RiskMatrix />
            </PanelContainer>
            <PanelContainer title={t(`${f}.governance.title`)}>
              <GovernanceTimeline />
            </PanelContainer>
          </div>
        )}

        {hasSelectedCountry && value === REFERENCES_TAB && (
          <div className="w-full min-w-0 max-w-full">
            <SourceAttribution />
          </div>
        )}
      </div>
    </div>
  );
}
