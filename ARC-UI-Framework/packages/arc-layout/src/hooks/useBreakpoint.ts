import { useEffect, useMemo, useState } from "react";
import { breakpoints, type BreakpointKey } from "../core/breakpoints";

function getBreakpoint(width: number): BreakpointKey {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "base";
}

export function useBreakpoint(): BreakpointKey {
  const isClient = typeof window !== "undefined";

  const initial = useMemo<BreakpointKey>(() => {
    return isClient ? getBreakpoint(window.innerWidth) : "base";
  }, [isClient]);

  const [bp, setBp] = useState<BreakpointKey>(initial);

  useEffect(() => {
    if (!isClient) return;

    const onResize = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isClient]);

  return bp;
}