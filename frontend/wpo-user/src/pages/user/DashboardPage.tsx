import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardFilterBar } from "@/components/dashboard/DashboardFilterBar";
import { GlobalRiskMapCard } from "@/components/dashboard/GlobalRiskMapCard";
import { DashboardMapDetailTabs } from "@/components/dashboard/tab/DashboardTabs";
import {
  type DashboardFilterState,
  useCountryRiskScores,
} from "@/hooks/useCountryRiskScores";
import { getWorldCountryFilterOptions, getWorldCountryIds } from "@/components/dashboard/worldGeo";

const worldIds = getWorldCountryIds();

function resolveNameForCountryId(countryId: string): string {
  return (
    getWorldCountryFilterOptions().find((o) => o.id === countryId)?.name ?? "—"
  );
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [companyId, setCompanyId] = useState("");

  const filters: DashboardFilterState = useMemo(
    () => ({ country: selected?.id ?? "", company: companyId }),
    [selected, companyId]
  );

  const { data, loading } = useCountryRiskScores(filters, worldIds);

  const handleSelectCountry = useCallback(
    (id: string | null, name: string | null) => {
      if (id == null) {
        setSelected(null);
        return;
      }
      setSelected({ id, name: name && name.length > 0 ? name : resolveNameForCountryId(id) });
    },
    []
  );

  const handleFilterChange = useCallback((next: DashboardFilterState) => {
    setCompanyId(next.company);
    if (next.country === "") {
      setSelected(null);
      return;
    }
    setSelected({
      id: next.country,
      name: resolveNameForCountryId(next.country),
    });
  }, []);

  const scores = data?.scores ?? {};
  const last = data?.updatedAt
    ? new Date(data.updatedAt)
    : new Date("2024-04-01");

  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col bg-slate-100">
      <DashboardFilterBar
        value={filters}
        onChange={handleFilterChange}
        labelCountry={t("dashboard.filters.country")}
        labelCompany={t("dashboard.filters.company")}
        placeholder={t("dashboard.filters.selectPlaceholder")}
      />
      <div className="shrink-0 bg-slate-900 pb-8 pt-6">
        <div className="px-4 sm:px-6">
          <div className="mx-auto w-full min-w-0 max-w-[1350px]">
            <GlobalRiskMapCard
              scores={scores}
              loading={loading}
              lastUpdated={last}
              onSelectCountry={handleSelectCountry}
              selectedCountryId={selected?.id ?? null}
              selectedCountry={
                selected?.id
                  ? { id: selected.id, name: selected.name }
                  : null
              }
              i18n={{
                mapTitle: t("dashboard.map.title"),
                mapSubtitle: t("dashboard.map.subtitle"),
                mapPill: t("dashboard.map.pill"),
                updated: t("dashboard.map.updated"),
                clearSelection: t("dashboard.map.clearSelection"),
                mapPlaceholder: t("dashboard.map.placeholder"),
              }}
            />
          </div>
        </div>
      </div>
      <div className="min-h-0 w-full min-w-0 flex-1">
        <div className="px-4 sm:px-6">
          <div className="mx-auto w-full min-w-0 max-w-[1350px]">
            <DashboardMapDetailTabs
              hasSelectedCountry={Boolean(selected?.id)}
              selectedCountry={
                selected?.id
                  ? { id: selected.id, name: selected.name }
                  : null
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
