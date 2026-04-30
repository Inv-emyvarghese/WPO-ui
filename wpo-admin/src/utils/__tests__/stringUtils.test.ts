import { describe, expect, it, beforeEach } from "vitest";
import {
  extractNameFromEmail,
  convertToJapaneseDate,
  setUserRole,
  getUserRole,
  removeUserRole,
  trimValue,
  trimObjectValues,
  formatUTCToLocalDate
} from "../stringUtils";

describe("extractNameFromEmail", () => {
  it("should return the part before @ in a valid email", () => {
    expect(extractNameFromEmail("john.doe@example.com")).toBe("john.doe");
    expect(extractNameFromEmail("test123@gmail.com")).toBe("test123");
  });

  it("should return the whole string if there's no @ symbol", () => {
    expect(extractNameFromEmail("noatsymbol")).toBe("noatsymbol");
  });

  it("should return an empty string for an empty input", () => {
    expect(extractNameFromEmail("")).toBe("");
  });
});

describe("convertToJapaneseDate", () => {
  it("should convert date string to Japanese format", () => {
    expect(convertToJapaneseDate("2023-09-01")).toBe("2023年09月01日 ");
    expect(convertToJapaneseDate("2022-01-15")).toBe("2022年01月15日 ");
  });
});

describe("UserRole localStorage functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set, get, and remove userRole", () => {
    setUserRole("admin");
    expect(getUserRole()).toBe("admin");
    removeUserRole();
    expect(getUserRole()).toBeNull();
  });
});

describe("trimValue", () => {
  it("should trim whitespace from string", () => {
    expect(trimValue("  hello  ")).toBe("hello");
    expect(trimValue("test")).toBe("test");
    expect(trimValue("")).toBe("");
  });
});

describe("trimObjectValues", () => {
  it("should trim all string values in object", () => {
    const obj = { a: "  foo  ", b: "bar", c: 123 };
    expect(trimObjectValues(obj)).toEqual({ a: "foo", b: "bar", c: 123 });
  });
});

describe("formatUTCToLocalDate", () => {
  it("should format date in English locale", () => {
    expect(formatUTCToLocalDate("2023-09-01T10:20:30Z", "en")).toMatch(/2023-09-01/);
  });

  it("should format date in Japanese locale", () => {
    expect(formatUTCToLocalDate("2023-09-01T10:20:30Z", "jp")).toMatch(/2023年09月01日/);
  });

  it("should return '--' for undefined date", () => {
    expect(formatUTCToLocalDate(undefined)).toBe("--");
  });
});
