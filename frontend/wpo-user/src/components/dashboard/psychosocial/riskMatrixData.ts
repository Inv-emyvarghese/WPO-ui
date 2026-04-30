import type { MatrixDataPoint } from "./riskMatrixModel";

const COUNTRIES: {
  name: string;
  baseReg: number;
  baseEnf: number;
  baseRisk: number;
  pop: number;
  region: string;
  trend: { reg: number; enf: number };
}[] = [
  {
    name: "Germany",
    baseReg: 80,
    baseEnf: 85,
    baseRisk: 30,
    pop: 83,
    region: "Europe",
    trend: { reg: 1, enf: 0.5 },
  },
  {
    name: "France",
    baseReg: 78,
    baseEnf: 75,
    baseRisk: 35,
    pop: 67,
    region: "Europe",
    trend: { reg: 0.8, enf: 1 },
  },
  {
    name: "Australia",
    baseReg: 85,
    baseEnf: 80,
    baseRisk: 25,
    pop: 26,
    region: "Asia Pacific",
    trend: { reg: 1, enf: 1 },
  },
  {
    name: "Ukraine",
    baseReg: 60,
    baseEnf: 30,
    baseRisk: 85,
    pop: 38,
    region: "Europe",
    trend: { reg: 2.5, enf: 2 },
  },
  {
    name: "Brazil",
    baseReg: 65,
    baseEnf: 35,
    baseRisk: 70,
    pop: 214,
    region: "Americas",
    trend: { reg: 0.5, enf: 0.5 },
  },
  {
    name: "Somalia",
    baseReg: 5,
    baseEnf: 2,
    baseRisk: 98,
    pop: 17,
    region: "Africa",
    trend: { reg: 0.5, enf: 0.2 },
  },
  {
    name: "Sudan",
    baseReg: 15,
    baseEnf: 10,
    baseRisk: 90,
    pop: 45,
    region: "Africa",
    trend: { reg: 0.5, enf: 0.5 },
  },
  {
    name: "Singapore",
    baseReg: 40,
    baseEnf: 80,
    baseRisk: 38,
    pop: 6,
    region: "Asia",
    trend: { reg: 1.5, enf: 0.5 },
  },
  {
    name: "China",
    baseReg: 35,
    baseEnf: 70,
    baseRisk: 55,
    pop: 1400,
    region: "Asia",
    trend: { reg: 1.2, enf: 1.5 },
  },
];

function pickBand(r: number) {
  if (r > 75) {
    return "high" as const;
  }
  if (r > 50) {
    return "modHigh" as const;
  }
  if (r > 25) {
    return "modLow" as const;
  }
  return "low" as const;
}

export function generateDataForYear(year: number) {
  const yearIndex = year - 2018;
  return COUNTRIES.map((c) => {
    const regScore = Math.min(100, c.baseReg + c.trend.reg * yearIndex);
    const enfScore = Math.min(100, c.baseEnf + c.trend.enf * yearIndex);
    const riskReduction = (regScore - c.baseReg + (enfScore - c.baseEnf)) * 0.4;
    const riskScore = Math.max(10, Math.min(100, c.baseRisk - riskReduction));
    return {
      country: c.name,
      regulationScore: Math.round(regScore),
      enforcementScore: Math.round(enfScore),
      riskScore: Math.round(riskScore),
      population: c.pop,
      region: c.region,
      riskBand: pickBand(Math.round(riskScore)),
    } satisfies MatrixDataPoint;
  });
}
