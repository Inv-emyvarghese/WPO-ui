import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/utils/cx";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  size?: "sm" | "md";
};

export function Chip({
  children,
  size = "md",
  className,
  ...rest
}: Readonly<ChipProps>) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
