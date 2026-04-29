import type { DashboardFilterState } from "@/hooks/useCountryRiskScores";
import { DASHBOARD_MAP_CARD_ALIGN_X } from "@/constants/stringConstants";
import { getWorldCountryFilterOptions } from "./worldGeo";
import { COMPANY_FILTER_OPTIONS } from "./companyFilterOptions";
import { cx } from "@/utils/cx";
import { ChevronDown } from "lucide-react";

const selectClass = cx(
  "h-10 w-full max-w-full shrink-0 self-stretch cursor-pointer appearance-none rounded-[10px]",
  "border border-[#CAD5E2] bg-[#F8FAFC] px-3 pr-10 text-sm text-slate-700",
  "transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
);

const labelClass =
  "flex w-full min-w-0 max-w-xs flex-1 flex-col gap-1.5";

type Props = {
  value: DashboardFilterState;
  onChange: (next: DashboardFilterState) => void;
  labelCountry: string;
  labelCompany: string;
  placeholder: string;
};

export function DashboardFilterBar({
  value,
  onChange,
  labelCountry,
  labelCompany,
  placeholder,
}: Readonly<Props>) {
  const countryOptions = getWorldCountryFilterOptions();

  return (
    <div
      className={cx(
        "relative z-30 border-b border-slate-200 bg-white shadow-sm"
      )}
    >
      <div className="px-4 py-4 sm:px-6">
        <div
          className={cx(
            "mx-auto flex w-full min-w-0 max-w-[1300px] flex-col gap-4 sm:flex-row sm:items-end",
            DASHBOARD_MAP_CARD_ALIGN_X
          )}
        >
          <label className={labelClass}>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {labelCountry}
            </span>
            <div className="relative">
              <select
                className={selectClass}
                value={value.country}
                onChange={(e) => {
                  onChange({ ...value, country: e.target.value });
                }}
                aria-label={labelCountry}
              >
                <option value="">{placeholder}</option>
                {countryOptions.map((o) => (
                  <option key={`${o.id}-${o.name}`} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </label>
          <label className={labelClass}>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {labelCompany}
            </span>
            <div className="relative">
              <select
                className={selectClass}
                value={value.company}
                onChange={(e) => {
                  onChange({ ...value, company: e.target.value });
                }}
                aria-label={labelCompany}
              >
                <option value="">{placeholder}</option>
                {COMPANY_FILTER_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
