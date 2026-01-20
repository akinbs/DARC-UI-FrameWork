import type { BreakpointKey } from "./breakpoints";

export type Responsive<T> = T | Partial<Record<BreakpointKey, T>>;

export type ResponsiveProps = Record<string, Responsive<any>>;

export function isResponsiveObject<T>(
  value: Responsive<T>
): value is Partial<Record<BreakpointKey, T>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}