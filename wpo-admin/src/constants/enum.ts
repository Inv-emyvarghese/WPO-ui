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
