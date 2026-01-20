export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const;

export type BreakpointToken = keyof typeof breakpoints;
export type BreakpointKey = "base" | BreakpointToken;

export const breakpointOrder: BreakpointKey[] = ["base", "sm", "md", "lg", "xl", "2xl"];