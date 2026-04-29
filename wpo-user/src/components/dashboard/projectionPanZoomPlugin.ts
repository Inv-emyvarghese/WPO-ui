import type { Chart, Plugin } from "chart.js";

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 6;
const MAX_PAN = 2_500;
const WHEEL_SCALE = 0.0012;

type ProjectionOpts = {
  projectionScale?: number;
  projectionOffset?: [number, number];
};

function getProjectionOpts(chart: Chart): ProjectionOpts {
  return (chart.options.scales?.projection as ProjectionOpts | undefined) ?? {};
}

function setProjectionOffset(chart: Chart, next: [number, number]): void {
  const s = chart.options.scales;
  if (!s?.projection) {
    return;
  }
  const p = s.projection as { projectionOffset: [number, number] };
  p.projectionOffset = [next[0], next[1]];
}

function setProjectionScale(chart: Chart, next: number) {
  const s = chart.options.scales;
  if (!s?.projection) {
    return;
  }
  const p = s.projection as { projectionScale: number };
  p.projectionScale = next;
}

function applyPan(chart: Chart, dx: number, dy: number) {
  const p = getProjectionOpts(chart);
  const off = p.projectionOffset ?? [0, 0];
  const nx = Math.max(-MAX_PAN, Math.min(MAX_PAN, off[0]! + dx));
  const ny = Math.max(-MAX_PAN, Math.min(MAX_PAN, off[1]! + dy));
  setProjectionOffset(chart, [nx, ny]);
  chart.update("none");
}

function applyZoom(chart: Chart, factor: number) {
  const p = getProjectionOpts(chart);
  const cur = p.projectionScale ?? 1;
  const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, cur * factor));
  setProjectionScale(chart, next);
  chart.update("none");
}

function buildHandlers(chart: Chart) {
  if (!("type" in chart.config) || chart.config.type !== "choropleth") {
    return () => {};
  }
  const canvas = chart.canvas;
  if (!canvas) {
    return () => {};
  }

  const state = { dragging: false, lastX: 0, lastY: 0, moved: 0 };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const z = 1 - e.deltaY * WHEEL_SCALE;
    if (z <= 0 || !Number.isFinite(z)) {
      return;
    }
    applyZoom(chart, z);
  };

  const onDown = (e: MouseEvent) => {
    state.dragging = true;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    state.moved = 0;
  };

  const onMove = (e: MouseEvent) => {
    if (!state.dragging) {
      return;
    }
    const dx = e.clientX - state.lastX;
    const dy = e.clientY - state.lastY;
    state.moved += Math.abs(dx) + Math.abs(dy);
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    applyPan(chart, dx, dy);
  };

  const onUp = () => {
    state.dragging = false;
  };

  const onDbl = () => {
    setProjectionOffset(chart, [0, 0]);
    setProjectionScale(chart, 1);
    chart.update("none");
  };

  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("mousedown", onDown);
  globalThis.addEventListener("mousemove", onMove);
  globalThis.addEventListener("mouseup", onUp);
  canvas.addEventListener("dblclick", onDbl);

  return () => {
    canvas.removeEventListener("wheel", onWheel);
    canvas.removeEventListener("mousedown", onDown);
    globalThis.removeEventListener("mousemove", onMove);
    globalThis.removeEventListener("mouseup", onUp);
    canvas.removeEventListener("dblclick", onDbl);
  };
}

/**
 * chartjs-plugin-zoom is not reliable with chartjs-chart-geo (ProjectionScale).
 * Pan and zoom are implemented by adjusting `projectionOffset` and `projectionScale` per chartjs-chart-geo options.
 */
export const projectionPanZoomPlugin: Plugin<"choropleth"> = {
  id: "projectionPanZoom",
  afterInit(chart) {
    const c = chart as unknown as { __geoPanzoomCleanup?: () => void };
    c.__geoPanzoomCleanup?.();
    c.__geoPanzoomCleanup = buildHandlers(chart);
  },
  afterDestroy(chart) {
    const c = chart as unknown as { __geoPanzoomCleanup?: () => void };
    c.__geoPanzoomCleanup?.();
    c.__geoPanzoomCleanup = undefined;
  },
};
