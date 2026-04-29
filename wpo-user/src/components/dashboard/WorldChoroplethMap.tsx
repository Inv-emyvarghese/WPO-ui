import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Chart as ChartJS, ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { ChoroplethController } from "chartjs-chart-geo";
import { registerChoropleth } from "./chartRegister";
import { colorScaleInterpolate, MAP_GEO, RISK_COLORS } from "./riskBuckets";
import { getMapCountryMockDetail } from "./mapCountryMockDetail";
import { MapCountryTooltip } from "./MapCountryTooltip";
import type { MapCountryMockDetail } from "./mapCountryMockDetail";
import type { CountryIdScoreMap } from "@/hooks/useCountryRiskScores";
import {
  allCountryFeatures,
  getNumericId,
  type CountryFeature,
} from "./worldGeo";

function resolveChoroplethIndexColor(chart: ChartJS, dataIndex: number) {
  const ctrl = chart.getDatasetMeta(0).controller as InstanceType<typeof ChoroplethController>;
  return ctrl.indexToColor(dataIndex);
}

function buildMapData(
  scoreMap: CountryIdScoreMap,
  countries: CountryFeature[]
): ChartData<"choropleth", { feature: CountryFeature; value: number | null }[]> {
  const data: { feature: CountryFeature; value: number | null }[] = countries.map(
    (cf) => {
      const id = getNumericId(cf);
      const raw =
        id && Object.prototype.hasOwnProperty.call(scoreMap, id)
          ? scoreMap[id]!
          : null;
      return {
        feature: cf,
        value: raw == null || Number.isNaN(raw) ? null : raw,
      };
    }
  );
  return {
    labels: countries.map((c) => String(c.properties?.name ?? "")),
    datasets: [
      {
        label: "Countries",
        data,
        showGraticule: false,
      },
    ],
  };
}

type TooltipState = {
  x: number;
  y: number;
  detail: MapCountryMockDetail;
};

type Props = {
  scores: CountryIdScoreMap;
  onSelectCountry: (id: string | null, name: string | null) => void;
  /** Sticky selection border; keep in sync with click handler. */
  selectedCountryId: string | null;
};

export function WorldChoroplethMap({
  scores,
  onSelectCountry,
  selectedCountryId,
}: Readonly<Props>) {
  registerChoropleth();
  const chartRef = useRef<ChartJS | null>(null);
  const selectedDataIndexRef = useRef<number | null>(null);

  const { countries, data } = useMemo(() => {
    const c = allCountryFeatures();
    return { countries: c, data: buildMapData(scores, c) };
  }, [scores]);

  useLayoutEffect(() => {
    if (!selectedCountryId) {
      selectedDataIndexRef.current = null;
      return;
    }
    const i = countries.findIndex((f) => getNumericId(f) === selectedCountryId);
    selectedDataIndexRef.current = i >= 0 ? i : null;
  }, [selectedCountryId, countries]);

  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onPointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const chart = chartRef.current;
      if (!chart) {
        return;
      }
      if (e.type === "pointerleave" || e.type === "pointercancel") {
        setTooltip(null);
        return;
      }
      if (e.type !== "pointermove") {
        return;
      }
      const ne = e.nativeEvent;
      const el = getElementAtEvent(
        chart,
        { nativeEvent: ne } as unknown as React.MouseEvent<HTMLCanvasElement>
      );
      if (!el.length) {
        setTooltip(null);
        return;
      }
      const i = el[0]!.index;
      const f = countries[i]!;
      const id = getNumericId(f) || String(i);
      const name = f.properties?.name != null ? String(f.properties.name) : "";
      const row = data.datasets[0]!.data[i] as { value: number | null } | undefined;
      const v = row?.value ?? null;
      const score = v != null && !Number.isNaN(v) ? v : null;
      if (!(ne instanceof MouseEvent)) {
        return;
      }
      setTooltip({
        x: ne.clientX,
        y: ne.clientY,
        detail: getMapCountryMockDetail(id, name, score),
      });
    },
    [countries, data.datasets]
  );

  useEffect(() => {
    chartRef.current?.update("none");
  }, [selectedCountryId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const scheduleResize = () => {
      requestAnimationFrame(() => {
        chartRef.current?.resize();
      });
    };
    const ro = new ResizeObserver(() => {
      scheduleResize();
    });
    ro.observe(el);
    scheduleResize();
    const t = setTimeout(() => {
      scheduleResize();
    }, 0);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  const onChartClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const chart = chartRef.current;
      if (!chart) {
        return;
      }
      const el = getElementAtEvent(chart, e);
      if (!el.length) {
        onSelectCountry(null, null);
        return;
      }
      const idx = el[0]!.index;
      const c = countries[idx]!;
      onSelectCountry(
        getNumericId(c) || null,
        c.properties?.name != null ? String(c.properties.name) : null
      );
    },
    [countries, onSelectCountry]
  );

  const options = useMemo<ChartOptions<"choropleth">>(
    () => ({
      showOutline: false,
      showGraticule: false,
      layout: { padding: 0 },
      responsive: true,
      maintainAspectRatio: false,
      events: [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove",
        "pointerdown",
        "pointermove",
      ],
      scales: {
        projection: {
          axis: "x" as const,
          projection: "equirectangular" as const,
          projectionScale: 1,
          projectionOffset: [0, 0] as [number, number],
          padding: 4,
        },
        color: {
          axis: "x" as const,
          display: true,
          min: 0,
          max: 100,
          missing: RISK_COLORS.unmappedLand,
          quantize: 0,
          interpolate: colorScaleInterpolate,
          ticks: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        projectionPanZoom: true,
      },
      elements: {
        geoFeature: {
          borderColor: (ctx: ScriptableContext<"choropleth">) => {
            if (ctx.dataIndex == null) {
              return MAP_GEO.borderDefault;
            }
            if (ctx.dataIndex === selectedDataIndexRef.current) {
              return MAP_GEO.borderSelected;
            }
            if (ctx.active) {
              return MAP_GEO.borderHover;
            }
            return MAP_GEO.borderDefault;
          },
          borderWidth: (ctx: ScriptableContext<"choropleth">) => {
            if (ctx.dataIndex == null) {
              return 0.2;
            }
            if (ctx.dataIndex === selectedDataIndexRef.current) {
              return 1.75;
            }
            if (ctx.active) {
              return 1.5;
            }
            return 0.2;
          },
          backgroundColor: (context: ScriptableContext<"choropleth">) => {
            const { chart, dataIndex, active } = context;
            if (dataIndex == null) {
              return "transparent";
            }
            const row = chart.data.datasets[0]!.data[dataIndex] as { value: number | null };
            if (row?.value == null || Number.isNaN(row.value)) {
              if (dataIndex === selectedDataIndexRef.current) {
                return RISK_COLORS.unmappedActiveFill;
              }
              if (active) {
                return RISK_COLORS.unmappedActiveFill;
              }
              return RISK_COLORS.unmappedLand;
            }
            return resolveChoroplethIndexColor(chart, dataIndex);
          },
        },
      },
    }),
    []
  );

  return (
    <div className="relative flex h-full min-h-0 w-full max-w-full flex-1 flex-col p-0">
      <div
        ref={containerRef}
        onPointerMove={onPointer}
        onPointerLeave={onPointer}
        onPointerCancel={onPointer}
        className="relative flex min-h-0 w-full flex-1 flex-col"
      >
        <div className="relative block min-h-0 w-full flex-1">
          <Chart
            type="choropleth"
            data={data}
            options={options}
            onClick={onChartClick}
            ref={chartRef as never}
            style={{ width: "100%", height: "100%", maxWidth: "100%", display: "block" }}
          />
        </div>
        {tooltip ? (
          <MapCountryTooltip detail={tooltip.detail} x={tooltip.x} y={tooltip.y} />
        ) : null}
      </div>
    </div>
  );
}
