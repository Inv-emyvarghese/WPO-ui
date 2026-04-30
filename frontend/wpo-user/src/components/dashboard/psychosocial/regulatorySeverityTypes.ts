export type RegulatorySeverityEntry = {
  rank: number;
  country: string;
  regulatoryStrictness: "Low" | "Moderate" | "High" | "Very High";
  consequenceSeverity: "Low" | "Moderate" | "High" | "Very High";
  summaryLabel: string;
  region: string;
};
