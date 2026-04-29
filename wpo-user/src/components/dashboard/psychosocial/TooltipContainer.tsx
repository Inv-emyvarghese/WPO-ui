import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cx } from "@/utils/cx";

type TooltipContainerProps = {
  content: string;
  children?: ReactNode;
  className?: string;
};

export function TooltipContainer({
  content,
  children,
  className = "",
}: Readonly<TooltipContainerProps>) {
  return (
    <div
      className={cx("group relative inline-flex items-center", className)}
    >
      {children || (
        <Info
          className="h-4 w-4 cursor-help text-slate-400"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white opacity-0 transition-all duration-200 [visibility:hidden] group-hover:opacity-100 group-hover:[visibility:visible]"
        role="tooltip"
      >
        {content}
        <div
          className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 transform border-4 border-transparent border-t-slate-800"
          aria-hidden
        />
      </div>
    </div>
  );
}
