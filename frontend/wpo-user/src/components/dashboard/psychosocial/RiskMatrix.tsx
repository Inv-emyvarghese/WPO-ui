import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bubble } from "react-chartjs-2";
import { type ChartOptions } from "chart.js";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { registerDashboardCharts } from "../chartRegister";
import { generateDataForYear } from "./riskMatrixData";
import { cx } from "@/utils/cx";
import type { MatrixDataPoint } from "./riskMatrixModel";

const BAND_COLOR: Record<MatrixDataPoint["riskBand"], string> = {
  high: "rgba(239, 68, 68, 0.75)",
  modHigh: "rgba(249, 115, 22, 0.75)",
  modLow: "rgba(234, 179, 8, 0.75)",
  low: "rgba(34, 197, 94, 0.75)",
};

const YEAR_MIN = 2018;
const YEAR_MAX = 2026;

function popToRadius(pop: number) {
  return Math.min(28, 6 + (pop / 200) * 4);
}

type Props = { className?: string };

export function RiskMatrix({ className = "" }: Readonly<Props>) {
  const { t } = useTranslation();
  const f = "dashboard.mapDetailTabs.forecastingContent.matrix";
  const [currentYear, setCurrentYear] = useState(YEAR_MAX);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready] = useState(() => {
    registerDashboardCharts();
    return true;
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const points = useMemo(() => generateDataForYear(currentYear), [currentYear]);

  const data = useMemo(
    () => ({
      datasets: [
        {
          label: t(`${f}.datasetLabel`),
          data: points.map((d) => ({
            x: d.regulationScore,
            y: d.enforcementScore,
            r: popToRadius(d.population),
          })),
          backgroundColor: points.map((d) => BAND_COLOR[d.riskBand]),
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    }),
    [points, t, f]
  );

  const options: ChartOptions<"bubble"> = useMemo(() => {
    const pts = points;
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          max: 100,
          grid: { color: "rgba(226, 232, 240, 1)" },
          ticks: { color: "#64748b" },
          title: {
            display: true,
            text: t(`${f}.xAxis`),
            color: "#64748b",
            font: { size: 12 },
          },
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: "rgba(226, 232, 240, 1)" },
          ticks: { color: "#64748b" },
          title: {
            display: true,
            text: t(`${f}.yAxis`),
            color: "#64748b",
            font: { size: 12 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => {
              if (!items.length) {
                return "";
              }
              const idx = (items[0] as unknown as { dataIndex: number }).dataIndex;
              return pts[idx]?.country ?? "";
            },
            afterBody: (items) => {
              if (!items.length) {
                return [];
              }
              const idx = (items[0] as unknown as { dataIndex: number }).dataIndex;
              const pt = pts[idx];
              if (!pt) {
                return [];
              }
              const b = "dashboard.references.bubbleKey";
              return [
                pt.region,
                `Risk: ${pt.riskScore}`,
                `${t(`${b}.regulation`)}: ${pt.regulationScore}`,
                `${t(`${b}.enforcement`)}: ${pt.enforcementScore}`,
                `${t(`${b}.pop`)}: ${pt.population}M`,
              ];
            },
          },
        },
      },
    };
  }, [t, f, points]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= YEAR_MAX) {
          setIsPlaying(false);
          return YEAR_MAX;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (currentYear >= YEAR_MAX && !isPlaying) {
      setCurrentYear(YEAR_MIN);
    }
    setIsPlaying((p) => !p);
  }, [currentYear, isPlaying]);

  if (!ready) {
    return null;
  }

  return (
    <div className={cx("space-y-4", className)}>
      <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-slate-500">
            {t(`${f}.subtitle`)}
            <br />
            <span className="text-xs text-slate-400">{t(`${f}.legendLine`)}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentYear((y) => Math.max(YEAR_MIN, y - 1));
              }}
              className="rounded p-1 text-slate-600 disabled:opacity-50"
              disabled={currentYear <= YEAR_MIN}
              aria-label={t(`${f}.stepBack`)}
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex w-8 items-center justify-center rounded p-1 font-medium text-slate-700 hover:bg-slate-200"
              aria-label={isPlaying ? t(`${f}.pause`) : t(`${f}.play`)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentYear((y) => Math.min(YEAR_MAX, y + 1));
              }}
              className="rounded p-1 text-slate-600 disabled:opacity-50"
              disabled={currentYear >= YEAR_MAX}
              aria-label={t(`${f}.stepForward`)}
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
          <div className="flex min-w-[200px] items-center gap-3">
            <span className="w-10 text-sm font-bold text-slate-700">{currentYear}</span>
            <input
              type="range"
              min={YEAR_MIN}
              max={YEAR_MAX}
              value={currentYear}
              aria-label={t(`${f}.ariaSlider`)}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentYear(parseInt(e.target.value, 10));
              }}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
            />
          </div>
        </div>
        <div className="hidden text-xs text-slate-500 lg:flex lg:items-center lg:gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            {t(`${f}.highRisk`)}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {t(`${f}.lowRisk`)}
          </span>
        </div>
      </div>

      <div
        className="relative w-full min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/50"
        style={{ height: 450, minHeight: 450 }}
      >
        <Bubble data={data} options={options} />
        <div className="pointer-events-none absolute right-3 bottom-4 text-6xl font-bold text-slate-200/50 select-none">
          {currentYear}
        </div>
        <div className="pointer-events-none absolute top-2 left-20 z-0 max-w-[45%] rounded border border-slate-200 bg-white/90 px-2 py-1 text-xs font-semibold text-slate-400 sm:left-24">
          {t(`${f}.quadrant.tl`)}
        </div>
        <div className="pointer-events-none absolute top-2 right-2 z-0 max-w-[45%] rounded border border-slate-200 bg-white/90 px-2 py-1 text-right text-xs font-semibold text-slate-400 sm:right-3">
          {t(`${f}.quadrant.tr`)}
        </div>
        <div className="pointer-events-none absolute bottom-12 left-20 z-0 max-w-[45%] rounded border border-slate-200 bg-white/90 px-2 py-1 text-xs font-semibold text-slate-400 sm:bottom-16 sm:left-24">
          {t(`${f}.quadrant.bl`)}
        </div>
        <div className="pointer-events-none absolute right-2 bottom-12 z-0 max-w-[45%] rounded border border-slate-200 bg-white/90 px-2 py-1 text-right text-xs font-semibold text-slate-400 sm:right-3 sm:bottom-16">
          {t(`${f}.quadrant.br`)}
        </div>
      </div>
    </div>
  );
}
