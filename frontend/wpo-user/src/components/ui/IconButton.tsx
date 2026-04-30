import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/utils/cx";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  edge?: "start" | "end";
  size?: "sm" | "md";
};

export function IconButton({
  children,
  className,
  edge,
  size = "md",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
        edge === "start" && "-ml-1",
        edge === "end" && "-mr-1",
        size === "sm" && "p-1.5",
        size === "md" && "p-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
