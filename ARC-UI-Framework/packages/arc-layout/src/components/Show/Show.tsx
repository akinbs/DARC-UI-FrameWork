import React from "react";
import type { BreakpointKey } from "../../core/breakpoints";
import { breakpointOrder } from "../../core/breakpoints";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export type ShowProps = React.PropsWithChildren<{
  above?: BreakpointKey;
  below?: BreakpointKey;
  between?: [BreakpointKey, BreakpointKey];
  when?: Responsive<boolean>;
  fallback?: React.ReactNode;
  invert?: boolean; 
}>;
function idx(bp: BreakpointKey) {
  return breakpointOrder.indexOf(bp);
}

export function Show({
  above,
  below,
  between,
  when,
  fallback = null,
  invert = false,
  children
}: ShowProps) {
  const bp = useBreakpoint();

  let shouldShow = true;

  if (when !== undefined) {
    shouldShow = !!resolveResponsive(when, bp, false);
  } else if (between) {
    const [from, to] = between;
    shouldShow = idx(bp) >= idx(from) && idx(bp) <= idx(to);
  } else if (above) {
    shouldShow = idx(bp) >= idx(above);
  } else if (below) {
    shouldShow = idx(bp) < idx(below);
  }

  // 🔁 TERS ÇEVİRME NOKTASI (kritik)
  if (invert) {
    shouldShow = !shouldShow;
  }

  if (!shouldShow) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}