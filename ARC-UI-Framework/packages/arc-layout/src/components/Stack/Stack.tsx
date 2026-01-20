import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

type Direction = "row" | "column";

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: Responsive<Direction>;
  gap?: Responsive<number>;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
};

export function Stack({
  direction = "column",
  gap = 12,
  align,
  justify,
  wrap,
  style,
  ...rest
}: StackProps) {
  const bp = useBreakpoint();
  const dir = resolveResponsive(direction, bp, "column")!;
  const g = resolveResponsive(gap, bp, 12)!;

  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexDirection: dir,
        gap: `${g}px`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...style
      }}
    />
  );
}