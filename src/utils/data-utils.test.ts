import { test, expect } from "vitest";
import { compareTime } from "./date-utils";

test("compareTime should return 0 when times are equal", () => {
  expect(compareTime("12:00:00", "12:00:00")).toBe(0);
});

test("compareTime should return 1 when source time is later than target time", () => {
  expect(compareTime("13:00:00", "12:00:00")).toBe(1);
});

test("compareTime should return -1 when source time is earlier than target time", () => {
  expect(compareTime("11:00:00", "12:00:00")).toBe(-1);
});

test("compareTime should handle AM/PM correctly", () => {
  expect(compareTime("01:00:00 PM", "01:00:00 PM")).toBe(0);
  expect(compareTime("02:00:00 PM", "01:00:00 PM")).toBe(1);
  expect(compareTime("12:00:00 AM", "01:00:00 AM")).toBe(-1);
});

test("compareTime should handle edge cases", () => {
  expect(compareTime("23:59:59", "00:00:00")).toBe(1);
  expect(compareTime("00:00:00", "23:59:59")).toBe(-1);
  expect(compareTime("12:34:56", "12:34:56")).toBe(0);
});
