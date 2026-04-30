import type { RegulatorySeverityEntry } from "./regulatorySeverityTypes";

const SEVERITY_ORDER: Record<RegulatorySeverityEntry["regulatoryStrictness"], number> = {
  Low: 0,
  Moderate: 1,
  High: 2,
  "Very High": 3,
};

export function filterRegulatoryEntries(
  entries: RegulatorySeverityEntry[],
  search: string,
  region: string
) {
  const q = search.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesSearch = entry.country.toLowerCase().includes(q);
    const matchesRegion = region === "All Regions" || entry.region === region;
    return matchesSearch && matchesRegion;
  });
}

export function sortRegulatoryEntries(
  entries: RegulatorySeverityEntry[],
  sortBy: string
): RegulatorySeverityEntry[] {
  if (sortBy === "country") {
    return [...entries].sort((a, b) => a.country.localeCompare(b.country));
  }
  if (sortBy === "strictness") {
    return [...entries].sort(
      (a, b) => SEVERITY_ORDER[b.regulatoryStrictness] - SEVERITY_ORDER[a.regulatoryStrictness]
    );
  }
  if (sortBy === "consequence") {
    return [...entries].sort(
      (a, b) => SEVERITY_ORDER[b.consequenceSeverity] - SEVERITY_ORDER[a.consequenceSeverity]
    );
  }
  return [...entries].sort((a, b) => a.rank - b.rank);
}
