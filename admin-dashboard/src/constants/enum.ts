export const PageType = {
  INVALID: "invalid",
  SUCCESS: "success",
  INPUT: "input",
} as const;
export type PageTypeValue = (typeof PageType)[keyof typeof PageType];

export const UserTypes = {
  PASSWORD_ONLY: 1,
  SSO_ONLY: 2,
  SSO_AND_PASSWORD: 3,
} as const;
export type UserTypesValue = (typeof UserTypes)[keyof typeof UserTypes];

/** Fills for severity / system-level indicator bands; keys align with `SeverityBandKey`. */
export const SeverityIndicatorColor = {
  veryLow: "#A3E8C0",
  /** Lightest (safest) band; complements `Low`. */
  low: "#B9F8CF",
  moderate: "#FFF085",
  high: "#FFD6A8",
  veryHigh: "#FFC9C9",
} as const;
export type SeverityIndicatorColorKey =
  keyof typeof SeverityIndicatorColor;
