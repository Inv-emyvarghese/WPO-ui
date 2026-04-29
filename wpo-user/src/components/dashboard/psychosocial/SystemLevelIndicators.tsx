import { useTranslation } from "react-i18next";
import { BookOpen, FileText, Heart, Info, Scale, Search } from "lucide-react";
import { cx } from "@/utils/cx";
import { SeverityBadge, type SeverityLevel } from "./SeverityBadge";
import { getSeverityBandClass, getStatusBadgeProps } from "./systemLevelStatus";
import type { ReactNode } from "react";

export type SystemIndicator = {
  id: string;
  category: string;
  icon: ReactNode;
  status: string;
  description: string;
  context: string;
  iconColor: string;
};

const defaultIndicators: SystemIndicator[] = [
  {
    id: "enforcement",
    category: "Enforcement Frequency Indicator",
    icon: <Search className="h-5 w-5" />,
    status: "Moderate",
    description:
      "Frequency of workplace inspections and enforcement actions related to psychosocial hazards",
    context:
      "Based on publicly reported inspection rates, enforcement case volumes, and regulatory activity data. Does not reflect individual employer enforcement history.",
    iconColor: "text-blue-600",
  },
  {
    id: "maturity",
    category: "Psychosocial Risk Maturity",
    icon: <Scale className="h-5 w-5" />,
    status: "Developed - not enforced",
    description:
      "Current status of psychosocial risk regulation development and enforcement implementation",
    context:
      'Reflects the lifecycle stage of regulatory frameworks. "Enforced" status requires evidence of active penalties and inspections.',
    iconColor: "text-purple-600",
  },
  {
    id: "workers-comp",
    category: "Workers' Compensation Mental Health Recognition",
    icon: <Heart className="h-5 w-5" />,
    status: "Partial",
    description:
      "Recognition of work-related mental health conditions within workers' compensation systems",
    context:
      "Based on statutory frameworks and policy documents. Coverage varies by jurisdiction and claim type. Does not reflect claim approval rates.",
    iconColor: "text-red-600",
  },
  {
    id: "guidance",
    category: "National Guidance Availability",
    icon: <BookOpen className="h-5 w-5" />,
    status: "Available",
    description:
      "Availability of official government guidance on managing psychosocial workplace risks",
    context:
      "Indicates presence of published standards, codes of practice, or guidance materials. Does not assess quality, compliance, or employer adoption.",
    iconColor: "text-teal-600",
  },
  {
    id: "inspection",
    category: "Inspection Authority Powers",
    icon: <FileText className="h-5 w-5" />,
    status: "High",
    description:
      "Legal powers of regulatory authorities to inspect and enforce psychosocial risk standards",
    context:
      "Evaluated based on statutory authority, enforcement tools, and regulatory mandates. Does not reflect actual enforcement patterns or resource allocation.",
    iconColor: "text-orange-600",
  },
];

type Props = {
  indicators?: SystemIndicator[];
  className?: string;
};

type BandLevel = "Low" | "Moderate" | "High" | "Very High";

function toBandLevel(level: SeverityLevel): BandLevel {
  if (level === "n/a") {
    return "Moderate";
  }
  return level;
}

function SeverityBandLine({ level }: { level: SeverityLevel }) {
  const band = toBandLevel(level);
  return (
    <div className="mt-3">
      <div className="mb-2">
        <span className="text-xs text-slate-500">Severity band:</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="flex-1 bg-green-200" />
        <div className="flex-1 bg-yellow-200" />
        <div className="flex-1 bg-orange-200" />
        <div className="flex-1 bg-red-200" />
      </div>
      <div className="mt-1 flex justify-between">
        {(["Low", "Moderate", "High", "Very High"] as const).map((b) => (
          <div
            key={b}
            className={cx("h-3 w-0.5", b === band ? getSeverityBandClass(b) : "bg-transparent")}
          />
        ))}
      </div>
    </div>
  );
}

export function SystemLevelIndicators({ indicators = defaultIndicators, className = "" }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <div className="text-sm text-blue-900">
            <span className="mb-1 block font-bold">System-level context only:</span>
            <span>
              {t("dashboard.context.systemLevelDisclaimer")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {indicators.map((indicator, index) => {
          const badgeProps = getStatusBadgeProps(indicator.status);
          return (
            <div
              key={indicator.id}
              className={cx(
                "rounded-lg border p-5 transition-all",
                index % 2 === 0 ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50"
              )}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div
                    className={cx(
                      "rounded-lg bg-slate-100 p-2.5",
                      indicator.iconColor
                    )}
                  >
                    {indicator.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 text-slate-800">{indicator.category}</h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {indicator.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <SeverityBadge level={badgeProps.level}>
                    {badgeProps.displayText}
                  </SeverityBadge>
                </div>
              </div>

              <div className="ml-0 mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 sm:ml-14">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <p className="text-xs leading-relaxed text-slate-600">
                    {indicator.context}
                  </p>
                </div>
              </div>

              <div className="ml-0 sm:ml-14">
                <SeverityBandLine level={badgeProps.level} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <h5 className="mb-2 text-sm text-slate-700">Important limitations</h5>
          <ul className="list-inside list-disc space-y-1.5 text-xs text-slate-600">
            {(
              [
                "li1",
                "li2",
                "li3",
                "li4",
                "li5",
              ] as const
            ).map((k) => (
              <li key={k}>{t(`dashboard.context.systemLevelLimits.${k}`)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
