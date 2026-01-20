import React from "react";
import { Show } from "../Show";
import type { BreakpointKey } from "../../core/breakpoints";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export type OnlyProps = {
  on: BreakpointKey | BreakpointKey[];
  children: React.ReactNode;
};

export function Only({ on, children }: OnlyProps) {
  const bp = useBreakpoint();
  const list = Array.isArray(on) ? on : [on];

  if (!list.includes(bp)) return null;

  return <>{children}</>;
}
