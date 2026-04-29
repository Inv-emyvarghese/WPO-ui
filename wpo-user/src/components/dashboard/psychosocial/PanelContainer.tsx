import { type KeyboardEvent, type ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cx } from "@/utils/cx";

type PanelContainerProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
};

export function PanelContainer({
  title,
  children,
  className = "",
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
            "flex items-center justify-between border-b border-slate-200 px-5 py-3",
            collapsible
              ? "cursor-pointer transition-colors hover:bg-slate-50"
              : "bg-slate-50"
          )}
          {...headerProps}
          aria-expanded={collapsible ? isExpanded : undefined}
        >
          <h3 className="font-semibold text-slate-700">{title}</h3>
          {collapsible && (
            <span className="text-slate-400" aria-hidden>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          )}
        </div>
      )}
      {isExpanded && <div className="p-5">{children}</div>}
    </div>
  );
}
