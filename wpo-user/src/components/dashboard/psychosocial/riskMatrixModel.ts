export type MatrixDataPoint = {
  country: string;
  regulationScore: number;
  enforcementScore: number;
  riskScore: number;
  population: number;
  region: string;
  riskBand: "high" | "modHigh" | "modLow" | "low";
};
