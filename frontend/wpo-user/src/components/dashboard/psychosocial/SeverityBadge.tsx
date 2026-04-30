import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export type SeverityLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Very High"
  | "n/a";

type Props = {
  level: SeverityLevel;
  children?: ReactNode;
  className?: string;
};

const levelToClass: Record<SeverityLevel, string> = {
  Low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Moderate: "bg-amber-100 text-amber-800 border-amber-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  "Very High": "bg-red-100 text-red-800 border-red-200",
  "n/a": "bg-slate-100 text-slate-600 border-slate-200",
};

export function SeverityBadge({ level, children, className }: Readonly<Props>) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        levelToClass[level],
        className
      )}
    >
      {children ?? level}
    </span>
  );
}
