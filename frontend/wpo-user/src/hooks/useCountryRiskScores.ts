import { useEffect, useMemo, useState } from "react";

export type DashboardFilterState = {
  country: string;
};

export const emptyFilters: DashboardFilterState = {
  country: "",
};

/** world-atlas country `id` (ISO 3166-1 numeric string) → 0–100 */
export type CountryIdScoreMap = Readonly<Record<string, number>>;

export type CountryRiskPayload = {
  /** ISO-8601 */
  updatedAt: string;
  scores: CountryIdScoreMap;
};

function simpleHash(n: string): number {
  let h = 0;
  for (let i = 0; i < n.length; i += 1) {
    h = (h * 31 + n.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** ~18% of countries get a score; the rest use the unmapped (blue‑grey) fill, like the reference. */
const SCORE_EVERY = 7;

function mockScoresFor(
  _filters: DashboardFilterState,
  countryIds: string[]
): CountryIdScoreMap {
  const o: Record<string, number> = {};
  for (const id of countryIds) {
    if (simpleHash(id) % SCORE_EVERY !== 0) {
      continue;
    }
    const base = 15 + (simpleHash(id) % 85);
    o[id] = Math.min(100, Math.max(0, base));
  }
  return o;
}

export function useCountryRiskScores(
  filters: DashboardFilterState,
  worldCountryIds: string[] | null
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryRiskPayload | null>(null);

  const idsKey = useMemo(
    () => (worldCountryIds ? worldCountryIds.join(",") : ""),
    [worldCountryIds]
  );

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    void Promise.resolve().then(() => {
      if (cancelled) {
        return;
      }
      if (!worldCountryIds) {
        setData(null);
        setLoading(true);
        return;
      }
      setLoading(true);
      timeoutId = setTimeout(() => {
        if (cancelled) {
          return;
        }
        setData({
          updatedAt: new Date().toISOString(),
          scores: mockScoresFor(filters, worldCountryIds),
        });
        setLoading(false);
      }, 0);
    });

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [filters, idsKey, worldCountryIds]);

  return { data, loading };
}
