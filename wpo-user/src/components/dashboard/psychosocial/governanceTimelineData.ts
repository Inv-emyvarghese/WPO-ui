export const GOVERNANCE_START_YEAR = 2021;
export const GOVERNANCE_END_YEAR = 2031;
export const GOVERNANCE_CURRENT = 2026;

export const governanceRiskPoints = (() => {
  const out: { year: number; riskScore: number }[] = [];
  for (let y = GOVERNANCE_START_YEAR; y <= GOVERNANCE_END_YEAR; y += 1) {
    const i = y - GOVERNANCE_START_YEAR;
    let riskScore = 30 + i * 8;
    if (y > GOVERNANCE_CURRENT) {
      riskScore = 70 + (y - GOVERNANCE_CURRENT) * 2;
    }
    out.push({ year: y, riskScore: Math.min(100, Math.max(0, riskScore)) });
  }
  return out;
})();

export type Milestone = {
  id: string;
  year: number;
  titleKey: string;
  bodyKey: string;
  tagKey: string;
  category: "regulatory" | "obligations" | "enforcement";
};
