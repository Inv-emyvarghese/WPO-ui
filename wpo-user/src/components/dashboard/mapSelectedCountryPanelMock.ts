function hash32(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Deterministic 41–60 band scores (reference-style) for the map detail panel. */
export function getMapSelectedPanelScores(countryId: string): {
  regulatoryScore: number;
  nonComplianceScore: number;
} {
  const h = hash32(countryId);
  const regulatoryScore = 50 + (h % 11);
  const nonComplianceScore = 45 + ((h * 3) % 16);
  return { regulatoryScore, nonComplianceScore };
}
