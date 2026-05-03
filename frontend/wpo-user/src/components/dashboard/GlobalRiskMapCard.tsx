import { useMemo, useState } from "react";
import { WorldChoroplethMap } from "./WorldChoroplethMap";
import { RiskLevelLegend } from "./RiskLevelLegend";
import { MapDetailPlaceholder } from "./MapDetailPlaceholder";
import { MapSelectedCountryRiskPanel } from "./MapSelectedCountryRiskPanel";
import type { CountryIdScoreMap } from "@/hooks/useCountryRiskScores";
import { IconButton } from "@/components/common/icons/IconButton";
import { Chip } from "@/components/common/icons/Chip";
import { ChevronDown, X } from "lucide-react";
import { cx } from "@/utils/cx";

type Props = {
  scores: CountryIdScoreMap;
  loading: boolean;
  lastUpdated: Date;
  onSelectCountry: (id: string | null, name: string | null) => void;
  selectedCountryId: string | null;
  selectedCountry: { id: string; name: string } | null;
  i18n: {
    mapTitle: string;
    mapSubtitle: string;
    mapPill: string;
    updated: string;
    clearSelection: string;
    mapPlaceholder: string;
  };
};

function formatUpdated(d: Date) {
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

const panelRadius = "14px";
const panelBorder = "1px solid rgba(71, 85, 105, 0.6)";
const mapContentPanelMinHeight = "870.5px";
const worldMapAreaHeight = "606.5px";
const panelInset = "25px";

export function GlobalRiskMapCard({
  scores,
  loading,
  lastUpdated,
  onSelectCountry,
  selectedCountryId,
  selectedCountry,
  i18n,
}: Readonly<Props>) {
  const [open, setOpen] = useState(true);
  const monthYear = useMemo(
    () => i18n.updated + formatUpdated(lastUpdated),
    [lastUpdated, i18n.updated]
  );

  return (
    <section
      className="m-0 flex w-full min-w-0 shrink-0 flex-col gap-0 rounded-xl bg-[#0F172B] p-3 text-white shadow-[0_2px_16px_rgba(0,0,0,0.12)] sm:p-4 md:p-5"
    >
      <div
        className={cx(
          "box-border flex h-auto min-h-[85px] flex-wrap content-center items-center justify-between gap-3 border border-[#314158] bg-[#1D293D]/80 px-3 py-2 sm:h-[85px] sm:min-h-[85px] sm:max-h-[85px] sm:flex-nowrap sm:items-center sm:px-4 sm:py-3 md:px-5",
          open
            ? "rounded-t-[14px] rounded-b-none"
            : "rounded-[14px]"
        )}
      >
        <div className="min-w-[240px] flex-1">
          <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.449px] text-white">
            {i18n.mapTitle}
          </h2>
          <p className="mt-0.5 text-sm font-normal leading-5 tracking-[-0.15px] text-[#90A1B9]">
            {i18n.mapSubtitle}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2.5 text-[#90A1B9]">
          <span className="whitespace-nowrap text-sm font-normal leading-5 tracking-[-0.15px] text-[#90A1B9]">
            {monthYear}
          </span>
          <span
            className="hidden h-[15px] w-px sm:block"
            style={{ backgroundColor: "rgba(148,163,184,0.35)" }}
            aria-hidden
          />
          {selectedCountry && (
            <button
              type="button"
              onClick={() => {
                onSelectCountry(null, null);
              }}
              aria-label={i18n.clearSelection}
              className="link box-border flex h-[30px] min-h-[30px] max-w-full flex-nowrap items-center justify-center gap-0 rounded-lg border border-slate-600 bg-[#314158] px-1.5 py-0 text-center text-xs font-medium leading-4 text-slate-200 no-underline shadow-none [text-transform:none] hover:border-slate-500 hover:bg-[#3b4b63] sm:max-w-none"
            >
              <span className="mr-0 flex shrink-0">
                <X className="h-3 w-3 text-slate-200" aria-hidden />
              </span>
              {i18n.clearSelection}
            </button>
          )}
          <IconButton
            type="button"
            size="sm"
            onClick={() => {
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-label={open ? "collapse map" : "expand map"}
            className="inline-flex h-5 min-h-5 w-5 min-w-5 shrink-0 p-0 text-[#90A1B9] hover:bg-white/10"
          >
            <ChevronDown
              size={20}
              className={cx(
                "shrink-0 flex-none transition-transform duration-200",
                open && "rotate-180"
              )}
              aria-hidden
            />
          </IconButton>
        </div>
      </div>

      {open && (
        <div
          className="mt-0 box-border flex min-w-0 flex-col gap-[25px] border border-t-0 border-[rgba(71,85,105,0.6)] bg-[#0F172B] p-[25px] rounded-b-[14px] rounded-t-none"
          style={{
            minHeight: selectedCountry ? "min-content" : mapContentPanelMinHeight,
          }}
        >
          {loading && (
            <div
              className="block h-1 w-full overflow-hidden rounded-sm bg-slate-800"
              role="status"
              aria-live="polite"
            >
              <div className="h-1 w-full origin-left animate-pulse bg-sky-500" />
            </div>
          )}
          <div
            aria-label="World risk map"
            className="relative mx-auto flex w-full min-w-0 max-w-full flex-col"
            style={{
              minHeight: worldMapAreaHeight,
              height: worldMapAreaHeight,
              boxSizing: "border-box",
              border: panelBorder,
              borderRadius: panelRadius,
              padding: panelInset,
              background: "rgba(10, 14, 24, 0.72)",
            }}
          >
            <WorldChoroplethMap
              scores={scores}
              onSelectCountry={onSelectCountry}
              selectedCountryId={selectedCountryId}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[17px] z-[2] -translate-x-1/2"
            >
              <Chip
                size="md"
                className="h-auto max-w-[min(100vw-48px,100%)] border-0 bg-[#0F172B]/50 py-2.5 pl-3 pr-3.5 text-lg font-medium leading-tight text-slate-200"
              >
                {i18n.mapPill}
              </Chip>
            </div>
            <RiskLevelLegend />
          </div>
          {selectedCountry ? (
            <MapSelectedCountryRiskPanel
              countryId={selectedCountry.id}
              countryName={selectedCountry.name}
            />
          ) : (
            <MapDetailPlaceholder message={i18n.mapPlaceholder} />
          )}
        </div>
      )}
    </section>
  );
}