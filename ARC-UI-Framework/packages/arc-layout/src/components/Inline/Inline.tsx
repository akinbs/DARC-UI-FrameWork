import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: Responsive<number>;
  rowGap?: Responsive<number>;
  colGap?: Responsive<number>;
  wrap?: boolean;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
};

export function Inline({
  gap = 12,
  rowGap,
  colGap,
  wrap = false,
  align,
  justify,
  style,
  ...rest
}: InlineProps) {
  const bp = useBreakpoint();

  const g = resolveResponsive(gap, bp, 12)!;
  const rg = resolveResponsive(rowGap, bp);
  const cg = resolveResponsive(colGap, bp);

  const finalRowGap = rg ?? g;
  const finalColGap = cg ?? g;

  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: wrap ? "wrap" : "nowrap",
        rowGap: `${finalRowGap}px`,
        columnGap: `${finalColGap}px`,
        alignItems: align,
        justifyContent: justify,
        ...style
      }}
    />
  );
}
