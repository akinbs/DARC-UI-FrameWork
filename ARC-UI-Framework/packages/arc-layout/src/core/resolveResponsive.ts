import type { BreakpointKey } from "./breakpoints";
import { breakpointOrder } from "./breakpoints";
import type { Responsive } from "./types";
import { isResponsiveObject } from "./types";

export function resolveResponsive<T>(
  value: Responsive<T> | undefined,
  bp: BreakpointKey,
  fallback?: T
): T | undefined {
  if (value === undefined) return fallback;
  if (!isResponsiveObject(value)) return value as T;

  const idx = breakpointOrder.indexOf(bp);
  for (let i = idx; i >= 0; i--) {
    const key = breakpointOrder[i];
    const v = value[key];
    if (v !== undefined) return v;
  }
  return fallback;
}