import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function iconDims(size: number | undefined, props: SVGProps<SVGSVGElement>) {
  const w = props.width ?? size ?? 24;
  const h = props.height ?? size ?? 24;
  return { width: w, height: h };
}

export function MenuIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export function LayersOutlinedIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="m12 16.5 6.5-5.05-1.23-.95L12 14.6 6.73 10.5l-1.23.95L12 16.5zm0-5.4 6.5-5.05L17.27 5.1 12 9.2 6.73 5.1 5.5 6.05 12 11.1zM12 21l6.5-5.05-1.23-.95L12 19.1 6.73 15l-1.23.95L12 21z" />
    </svg>
  );
}

export function HelpOutlineIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14a4 4 0 0 0-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5a4 4 0 0 0-4-4z" />
    </svg>
  );
}

export function PeopleOutlinedIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

export function PersonOutlineOutlinedIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export function TextSnippetOutlinedIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-2-12V9h-2v4h4v-2h-2zm-4 8h6v-2h-6v2zm0-4h6v-2h-6v2z" />
    </svg>
  );
}

export function LogoutIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );
}

export function VerifiedUserOutlinedIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export function ArrowDropDownIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="m7 10 5 5 5-5z" />
    </svg>
  );
}

export function PublicIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

export function ArrowBackIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

export function ErrorIcon({ size, ...props }: IconProps) {
  const { width, height } = iconDims(size, props);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={width}
      height={height}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
