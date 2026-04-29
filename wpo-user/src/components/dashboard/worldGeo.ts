import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { Topology } from "topojson-specification";
import worldData from "world-atlas/countries-50m.json";

// GeoJSON feature from world-atlas + topojson `feature()` (has numeric `id` per world-atlas spec)
export type CountryFeature = {
  type: "Feature";
  id?: string | number;
  properties: { name?: string } & Record<string, string | number | boolean | null | undefined>;
  geometry: NonNullable<unknown>;
};

const worldTopology = worldData as unknown as Topology;

export function getNumericId(f: CountryFeature): string {
  if (f.id != null) {
    return String(f.id);
  }
  const p = f.properties;
  if (p && "ISO_N3" in p && p.ISO_N3) {
    return String(p.ISO_N3);
  }
  return "";
}

export function allCountryFeatures(): CountryFeature[] {
  const fc = feature(worldTopology, worldTopology.objects.countries) as FeatureCollection;
  return fc.features as CountryFeature[];
}

let cachedIds: string[] | null = null;

export function getWorldCountryIds(): string[] {
  if (cachedIds) {
    return cachedIds;
  }
  const c = allCountryFeatures();
  /** world-atlas can include multiple features per ISO N3 (e.g. discontiguous areas); ids must be unique for lists and data keys. */
  const unique = new Set<string>();
  for (const f of c) {
    const id = getNumericId(f);
    if (id) {
      unique.add(id);
    }
  }
  cachedIds = [...unique];
  return cachedIds;
}

let cachedFilterOptions: { id: string; name: string }[] | null = null;

/** Sorted country id + display name for filter dropdowns (same ids as choropleth). */
export function getWorldCountryFilterOptions(): { id: string; name: string }[] {
  if (cachedFilterOptions) {
    return cachedFilterOptions;
  }
  const byId = new Map<string, { id: string; name: string }>();
  for (const f of allCountryFeatures()) {
    const id = getNumericId(f);
    if (!id || byId.has(id)) {
      continue;
    }
    const name = f.properties?.name != null ? String(f.properties.name) : "";
    byId.set(id, { id, name: name || id });
  }
  const rows = [...byId.values()];
  rows.sort((a, b) => a.name.localeCompare(b.name));
  cachedFilterOptions = rows;
  return cachedFilterOptions;
}
