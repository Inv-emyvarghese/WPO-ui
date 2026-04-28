import type { SVGProps } from "react";

export default function LayersWithoutBgIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  ...props
}: SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
      {...props}
    >
      <path d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
    </svg>
  );
}
