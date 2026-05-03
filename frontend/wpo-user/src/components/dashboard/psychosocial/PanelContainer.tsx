import { type KeyboardEvent, type ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cx } from "@/utils/cx";

type PanelContainerProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  /** Replaces default `p-5` on the body when set (e.g. metrics panel padding). */
  contentClassName?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
};

export function PanelContainer({
  title,
  children,
  className = "",
  contentClassName,
  collapsible = false,
  defaultExpanded = true,
}: Readonly<PanelContainerProps>) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    if (collapsible) {
      setIsExpanded((e) => !e);
    }
  };

  const headerProps = collapsible
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: toggleExpand,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpand();
          }
        },
      }
    : {};

  return (
    <div
      className={cx(
        "overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md",
        className
      )}
    >
      {title && (
        <div
          className={cx(
            "box-border flex h-[52px] min-h-[52px] w-full shrink-0 items-center justify-between self-stretch border-b border-slate-200 bg-slate-50 px-5 py-3",
            collapsible && "cursor-pointer transition-colors hover:bg-slate-100"
          )}
          {...headerProps}
          aria-expanded={collapsible ? isExpanded : undefined}
        >
          <h3 className="text-[18px] font-semibold leading-[27px] tracking-[-0.439px] text-[#314158]">
            {title}
          </h3>
          {collapsible && (
            <span className="flex shrink-0 text-slate-400" aria-hidden>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          )}
        </div>
      )}
      {isExpanded && (
        <div
          className={cx(
            "min-w-0 w-full shrink-0 self-stretch",
            contentClassName ?? "p-5"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}