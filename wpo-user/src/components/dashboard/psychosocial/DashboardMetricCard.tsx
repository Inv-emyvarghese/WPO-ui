import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

type DashboardMetricCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
};

export function DashboardMetricCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  className = "",
}: Readonly<DashboardMetricCardProps>) {
  return (
    <div
      className={cx(
        "rounded-md border border-slate-200 bg-slate-50 p-4",
        className
      )}
    >
      <div className="mb-2 flex items-start justify-between">
        <span className="text-sm text-slate-600">{label}</span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl text-slate-900">{value}</span>
        {trendValue && (
          <span
            className={cx(
              "text-sm",
              trend === "up" && "text-red-600",
              trend === "down" && "text-green-600",
              (trend === "neutral" || trend == null) && "text-slate-500"
            )}
          >
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
