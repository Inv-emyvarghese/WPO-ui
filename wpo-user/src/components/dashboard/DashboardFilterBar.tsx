import type { DashboardFilterState } from "@/hooks/useCountryRiskScores";
import { getWorldCountryFilterOptions } from "./worldGeo";
import { cx } from "@/utils/cx";
import { ChevronDown } from "lucide-react";

type Props = {
  value: DashboardFilterState;
  onChange: (next: DashboardFilterState) => void;
  labelCountry: string;
  placeholder: string;
};

export function DashboardFilterBar({
  value,
  onChange,
  labelCountry,
  placeholder,
}: Readonly<Props>) {
  const options = getWorldCountryFilterOptions();

  return (
    <div
      className={cx(
        "relative z-30 border-b border-slate-200 bg-white shadow-sm"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:px-6">
        <label className="flex w-full min-w-0 max-w-xs flex-1 flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {labelCountry}
          </span>
          <div className="relative">
            <select
              className={cx(
                "h-10 w-full max-w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-slate-50",
                "px-3 pr-10 text-sm text-slate-700 transition-colors",
                "hover:border-blue-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              value={value.country}
              onChange={(e) => {
                onChange({ country: e.target.value });
              }}
              aria-label={labelCountry}
            >
              <option value="">{placeholder}</option>
              {options.map((o) => (
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
      </div>
    </div>
  );
}
