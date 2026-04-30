export type RiskCategory = {
  id: string;
  title: string;
  enforcementScore: number;
  enforcementExplanation: string;
  penaltyScore: number;
  penaltyExplanation: string;
  overallScore: number;
  overallExplanation: string;
  description: string;
  color: string;
  bgColor: string;
};

export function shortTitleFromCategory(category: Pick<RiskCategory, "title">) {
  return category.title.replace(" Risk", "");
}

export const riskCategories: RiskCategory[] = [
  {
    id: "financial",
    title: "Financial Risk",
    enforcementScore: 7,
    enforcementExplanation:
      "Active monitoring by labor inspectorate with frequent audits.",
    penaltyScore: 8,
    penaltyExplanation:
      "Significant fines up to $50,000 per breach for non-compliance.",
    overallScore: 15,
    overallExplanation:
      "High financial exposure due to compounding fines and compensation.",
    description:
      "Financial risk remains elevated as regulators prioritize economic sanctions for psychosocial hazards.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "criminal",
    title: "Criminal Risk",
    enforcementScore: 4,
    enforcementExplanation:
      "Criminal prosecution is currently rare but legally possible.",
    penaltyScore: 9,
    penaltyExplanation:
      "Potential prison terms for directors in cases of gross negligence.",
    overallScore: 13,
    overallExplanation: "Low probability but extreme severity event risk.",
    description:
      "While enforcement is low, the theoretical maximum penalty includes incarceration for senior executives.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "operational",
    title: "Operational Risk",
    enforcementScore: 6,
    enforcementExplanation: "Mandatory stress risk assessments required annually.",
    penaltyScore: 5,
    penaltyExplanation:
      "Stop-work orders are issued for immediate danger situations.",
    overallScore: 11,
    overallExplanation:
      "Moderate disruption potential from compliance activities.",
    description:
      "Operational impact focuses on the administrative burden of mandatory assessments and potential work stoppages.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "reputational",
    title: "Reputational Risk",
    enforcementScore: 8,
    enforcementExplanation: "Regulators publicly name and shame violator organizations.",
    penaltyScore: 6,
    penaltyExplanation: "Loss of government contracts and partnership eligibility.",
    overallScore: 14,
    overallExplanation:
      "Significant brand damage risk affecting talent acquisition.",
    description:
      "Public scrutiny is high, with adverse findings often leading to negative media coverage.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "insurance",
    title: "Insurance Risk",
    enforcementScore: 5,
    enforcementExplanation: "Stress-related claims frequency is steadily increasing.",
    penaltyScore: 4,
    penaltyExplanation: "Premium hikes of 15-20% for high-claim employers.",
    overallScore: 9,
    overallExplanation:
      "Moderate cost driver for workers' compensation policies.",
    description:
      "Insurers are adjusting premiums to reflect the growing volume of mental health claims.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];
