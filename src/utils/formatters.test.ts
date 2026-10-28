import { describe, expect, it } from "vitest";
import {
  formatPercentLabel,
  formatZAR,
  getInitials,
} from "./formatters";

describe(formatZAR, () => {
  it("formats numbers in the exact Capitec format (R 3 381.78)", () => {
    expect(formatZAR(3381.78)).toBe("R3 381.78");
    expect(formatZAR(15420.5)).toBe("R15 420.50");
    expect(formatZAR(1000000)).toBe("R1 000 000.00");
    expect(formatZAR(0)).toBe("R0.00");
  });

  it("Handles negative numbers correctly", () => {
    expect(formatZAR(-245.8)).toBe("-R245.80");
  });

  it("Handles null, undefined, and NaN gracefully", () => {
    expect(formatZAR(null)).toBe("R0.00");
    expect(formatZAR(undefined)).toBe("R0.00");
    expect(formatZAR(NaN)).toBe("R0.00");
  });
});

describe("formatPercentLabel", () => {
  it("formats the percentage", () => {
    const formatter = formatPercentLabel();
    expect(formatter(29.4)).toBe("29.4%");
    expect(formatter("invalid")).toBe("0%");
    expect(formatter(null)).toBe("0%");
    expect(formatter(undefined)).toBe("0%");
  });
});

describe("getInitials", () => {
  it("returns the first and last initial for a standard name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("handles middle names by taking the first and last", () => {
    expect(getInitials("Kulani Micheal Ngobeni")).toBe("KM");
  });

  it("handles extra spaces between names", () => {
    expect(getInitials("  John   Doe  ")).toBe("JD");
  });

  it("handles single names", () => {
    expect(getInitials("Madonna")).toBe("M");
  });

  it("handles empty strings gracefully", () => {
    expect(getInitials("")).toBe("?");
  });
});
