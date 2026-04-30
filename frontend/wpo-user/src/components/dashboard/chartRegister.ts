import { Chart, registerables } from "chart.js";
import {
  ChoroplethController,
  ColorScale,
  GeoFeature,
  ProjectionScale,
} from "chartjs-chart-geo";
import { projectionPanZoomPlugin } from "./projectionPanZoomPlugin";

let didRegister = false;

export function registerChoropleth() {
  if (didRegister) {
    return;
  }
  didRegister = true;
  Chart.register(
    ...registerables,
    ChoroplethController,
    GeoFeature,
    ColorScale,
    ProjectionScale,
    projectionPanZoomPlugin
  );
}

/** Same registration as the map (includes `registerables` for radar/line/bubble). Use from non-geo chart components. */
export function registerDashboardCharts() {
  registerChoropleth();
}
