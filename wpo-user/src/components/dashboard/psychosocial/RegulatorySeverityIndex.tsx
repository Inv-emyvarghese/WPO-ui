import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpDown, Search } from "lucide-react";
import { cx } from "@/utils/cx";
import { SeverityBadge, type SeverityLevel } from "./SeverityBadge";
import { filterRegulatoryEntries, sortRegulatoryEntries } from "./regulatorySeverityUtils";
import type { RegulatorySeverityEntry } from "./regulatorySeverityTypes";

const defaultEntries: RegulatorySeverityEntry[] = [
  {
    rank: 1,
    country: "Australia",
    regulatoryStrictness: "Very High",
    consequenceSeverity: "Very High",
    summaryLabel: "Comprehensive psychosocial framework with strict enforcement",
    region: "Asia-Pacific",
  },
  {
    rank: 2,
    country: "United Kingdom",
    regulatoryStrictness: "Very High",
    consequenceSeverity: "High",
    summaryLabel: "Robust health and safety requirements with clear guidance",
    region: "Europe",
  },
  {
    rank: 3,
    country: "Canada",
    regulatoryStrictness: "High",
    consequenceSeverity: "High",
    summaryLabel: "Provincial frameworks with increasing psychosocial focus",
    region: "North America",
  },
  {
    rank: 4,
    country: "Germany",
    regulatoryStrictness: "High",
    consequenceSeverity: "High",
    summaryLabel: "Strong occupational health laws with mental health integration",
    region: "Europe",
  },
  {
    rank: 5,
    country: "France",
    regulatoryStrictness: "High",
    consequenceSeverity: "Moderate",
    summaryLabel: "Evolving framework with focus on workplace stress prevention",
    region: "Europe",
  },
  {
    rank: 6,
    country: "United States",
    regulatoryStrictness: "Moderate",
    consequenceSeverity: "Moderate",
    summaryLabel: "General duty clause with limited psychosocial specificity",
    region: "North America",
  },
  {
    rank: 7,
    country: "Japan",
    regulatoryStrictness: "Moderate",
    consequenceSeverity: "Moderate",
    summaryLabel: "Stress check requirements with growing enforcement",
    region: "Asia-Pacific",
  },
  {
    rank: 8,
    country: "Brazil",
    regulatoryStrictness: "Moderate",
    consequenceSeverity: "Low",
    summaryLabel: "Developing framework with variable enforcement",
    region: "South America",
  },
];

function toSeverityLevel(
  s: RegulatorySeverityEntry["regulatoryStrictness"]
): SeverityLevel {
  if (s === "Very High") {
    return "Very High";
  }
  if (s === "High") {
    return "High";
  }
  if (s === "Moderate") {
    return "Moderate";
  }
  return "Low";
}

type Props = {
  entries?: RegulatorySeverityEntry[];
  className?: string;
};

export function RegulatorySeverityIndex({ entries = defaultEntries, className = "" }: Readonly<Props>) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("rank");

  const regions = useMemo(
    () => ["All Regions", ...Array.from(new Set(entries.map((e) => e.region)))],
    [entries]
  );

  const filtered = useMemo(
    () => filterRegulatoryEntries(entries, searchQuery, selectedRegion),
    [entries, searchQuery, selectedRegion]
  );
  const sorted = useMemo(() => sortRegulatoryEntries(filtered, sortBy), [filtered, sortBy]);

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative min-w-[250px] max-w-md flex-1">
          <Search
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            aria-label={t("dashboard.context.searchCountriesAria")}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-4 pl-10 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative min-w-[200px]">
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
            }}
            aria-label={t("dashboard.context.regulatoryRegionFilterAria")}
            className="w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 transition-colors hover:border-blue-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <div className="relative min-w-[200px]">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            aria-label={t("dashboard.context.regulatorySortByAria")}
            className="w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 transition-colors hover:border-blue-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="rank">Sort by: Rank</option>
            <option value="country">Sort by: Country</option>
            <option value="strictness">Sort by: Strictness</option>
            <option value="consequence">Sort by: Consequence</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <p className="mb-3 text-sm text-slate-600">
        Showing {sorted.length} of {entries.length} countries
      </p>

      <div
        className="overflow-x-auto"
        aria-label={t("dashboard.context.regulatoryTableAria")}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="w-20 px-4 py-3 text-left text-sm tracking-wide text-slate-600 uppercase">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm tracking-wide text-slate-600 uppercase">
                Country
              </th>
              <th className="w-40 px-4 py-3 text-left text-sm tracking-wide text-slate-600 uppercase">
                Regulatory strictness
              </th>
              <th className="w-40 px-4 py-3 text-left text-sm tracking-wide text-slate-600 uppercase">
                Consequence severity
              </th>
              <th className="px-4 py-3 text-left text-sm tracking-wide text-slate-600 uppercase">
                Summary label
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td className="py-8 text-center text-slate-400" colSpan={5}>
                  {t("dashboard.context.regulatoryEmpty")}
                </td>
              </tr>
            ) : (
              sorted.map((entry, index) => (
                <tr
                  key={entry.country}
                  className={cx(
                    "border-b border-slate-200 transition-colors hover:bg-slate-50",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-700">
                      {entry.rank}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-slate-800">{entry.country}</div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {entry.region}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <SeverityBadge level={toSeverityLevel(entry.regulatoryStrictness)} />
                  </td>
                  <td className="px-4 py-4">
                    <SeverityBadge level={toSeverityLevel(entry.consequenceSeverity)} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {entry.summaryLabel}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
