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
  children
}: ShowProps) {
  const bp = useBreakpoint();


  if (when !== undefined) {
    const ok = resolveResponsive(when, bp, false);
    return ok ? <>{children}</> : <>{fallback}</>;
  }


  if (between) {
    const [from, to] = between;
    const ok = idx(bp) >= idx(from) && idx(bp) <= idx(to);
    return ok ? <>{children}</> : <>{fallback}</>;
  }


  if (above) {
    const ok = idx(bp) >= idx(above);
    return ok ? <>{children}</> : <>{fallback}</>;
  }


  if (below) {
    const ok = idx(bp) < idx(below);
    return ok ? <>{children}</> : <>{fallback}</>;
  }

  return <>{children}</>;
}