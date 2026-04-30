import { useEffect, useState } from "react";

/**
 * Subscribes to CSS media queries (e.g. MUI breakpoint strings like "(min-width: 37.5rem)").
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (): boolean =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const mql = window.matchMedia(query);
    const onChange = () => {
      setMatches(mql.matches);
    };
    mql.addEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- align state with fresh MediaQueryList on mount
    setMatches(mql.matches);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
}
