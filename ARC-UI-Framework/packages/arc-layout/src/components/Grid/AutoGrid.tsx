import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export type AutoGridProps = React.HTMLAttributes<HTMLDivElement> & {
  minItemWidth?: Responsive<number>;
  gap?: Responsive<number>;
  minRowHeight?: Responsive<number>;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyItems"];
};

export function AutoGrid({
  minItemWidth = 240,
  gap = 12,
  minRowHeight,
  align,
  justify,
  style,
  ...rest
}: AutoGridProps) {
  const bp = useBreakpoint();

  const w = resolveResponsive(minItemWidth, bp, 240)!;
  const g = resolveResponsive(gap, bp, 12)!;
  const rh = resolveResponsive(minRowHeight, bp);

  return (
    <div
      {...rest}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${w}px, 1fr))`,
        gap: `${g}px`,
        ...(rh ? { gridAutoRows: `minmax(${rh}px, auto)` } : null),
        alignItems: align,
        justifyItems: justify,
        ...style
      }}
    />
  );
}