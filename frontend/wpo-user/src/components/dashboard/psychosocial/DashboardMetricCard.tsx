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

const labelClass =
  "text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#45556C]";
const valueClass =
  "text-[24px] font-normal leading-8 tracking-[0.07px] text-[#0F172B]";

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
        "box-border flex h-[94px] w-full min-w-0 shrink-0 flex-col items-start gap-2 self-stretch rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-[17px] pb-px pt-[17px]",
        className
      )}
    >
      <div className="flex w-full min-w-0 items-start justify-between gap-2">
        <span className={labelClass}>{label}</span>
        {icon && (
          <span className="flex shrink-0 self-stretch text-slate-400 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:min-h-5 [&_svg]:min-w-5 [&_svg]:shrink-0">
            {icon}
          </span>
        )}
      </div>
      <div className="flex w-full min-w-0 items-end justify-between gap-2">
        <span className={valueClass}>{value}</span>
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