import type { ReactNode, SyntheticEvent } from "react";
import { cx } from "@/utils/cx";

export type TabItem = {
  value: number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  id: string;
  /** Omit when no corresponding tabpanel exists in the DOM (e.g. placeholder tab). */
  panelId?: string;
  title?: string;
};

type TabBarTone = "light" | "dark";

type Props = {
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
  items: TabItem[];
  /** MUI-style: fullWidth vs scrollable */
  variant: "fullWidth" | "scrollable";
  className?: string;
  tabListClassName?: string;
  /** Inset padding x for tab bar label text */
  contentClassName?: string;
  /** Visual theme for tab buttons (default light). */
  tone?: TabBarTone;
  /** When set, overrides selected border + text color (Tailwind classes). */
  selectedAccentClassName?: string;
};

const toneTabButton: Record<TabBarTone, { base: string; selected: string; disabled: string }> = {
  light: {
    base:
      "inline-flex h-full min-h-0 min-w-0 items-center justify-center gap-1.5 border-0 border-t-[3px] border-transparent bg-transparent px-2 py-0 text-left text-[15px] leading-tight text-slate-600 transition-[background-color,color,border-color] duration-200 sm:px-3",
    selected: "rounded-t-lg border-t-[#1447E6] bg-white text-[#1447E6]",
    disabled: "pointer-events-auto cursor-not-allowed opacity-100",
  },
  dark: {
    base:
      "inline-flex h-full min-h-0 min-w-0 shrink-0 items-center justify-center gap-1.5 border-0 border-t-[3px] border-transparent bg-transparent px-2 py-0 text-left text-xs font-medium transition-[background-color,color,border-color] duration-200 sm:px-3 sm:text-sm text-slate-300",
    selected: "rounded-t-lg border-t-[#60A5FA] bg-slate-700/90 text-white",
    disabled: "pointer-events-auto cursor-not-allowed opacity-100",
  },
};

export function TabBar({
  value,
  onChange,
  items,
  variant,
  className,
  tabListClassName,
  contentClassName,
  tone = "light",
  selectedAccentClassName,
}: Props) {
  const t = toneTabButton[tone];
  const selectedStateClass = selectedAccentClassName != null ? selectedAccentClassName : t.selected;
  return (
    <div
      className={cx(
        "flex h-[62px] min-h-[62px] w-full items-stretch py-2",
        variant === "fullWidth" && "*:min-w-0 *:flex-1",
        variant === "scrollable" && "overflow-x-auto",
        tabListClassName,
        className
      )}
      role="tablist"
      aria-label="Tabs"
    >
      {items.map((item) => {
        const selected = value === item.value;
        return (
          <button
            key={item.id}
            type="button"
            id={item.id}
            role="tab"
            aria-selected={selected}
            {...(item.panelId ? { "aria-controls": item.panelId } : {})}
            disabled={item.disabled}
            title={item.title}
            onClick={(e) => !item.disabled && onChange(e, item.value)}
            className={cx(
              t.base,
              !item.disabled && tone === "light" && "hover:bg-black/2",
              !item.disabled && tone === "dark" && "hover:bg-slate-700/50",
              item.disabled && t.disabled,
              selected && selectedStateClass
            )}
          >
            {item.icon && <span className="shrink-0 text-[20px] [&_svg]:block">{item.icon}</span>}
            <span className={contentClassName}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  id,
  labelledBy,
  hidden,
  children,
  className,
}: {
  id: string;
  labelledBy: string;
  hidden: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={hidden}
      className={cx(!hidden && "block", hidden && "hidden", className)}
    >
      {children}
    </div>
  );
}
