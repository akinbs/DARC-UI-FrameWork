import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

type Span = number | "auto" | "full";

export type GridItemProps = React.HTMLAttributes<HTMLDivElement> & {
  span?: Responsive<Span>;
  start?: Responsive<number | "auto">;
  order?: Responsive<number>;
  alignSelf?: React.CSSProperties["alignSelf"];
  justifySelf?: React.CSSProperties["justifySelf"];
};

export function GridItem({
  span = "auto",
  start = "auto",
  order,
  alignSelf,
  justifySelf,
  style,
  ...rest
}: GridItemProps) {
  const bp = useBreakpoint();

  const sp = resolveResponsive(span, bp, "auto")!;
  const st = resolveResponsive(start, bp, "auto")!;
  const od = resolveResponsive(order, bp);

  const gridColumnEnd =
    sp === "full" ? "-1" : sp === "auto" ? "auto" : `span ${sp}`;

  const gridColumnStart = st === "auto" ? "auto" : String(st);

  const finalStart = sp === "full" ? "1" : gridColumnStart;
  const finalEnd = sp === "full" ? "-1" : gridColumnEnd;

  return (
    <div
      {...rest}
      style={{
        gridColumnStart: finalStart,
        gridColumnEnd: finalEnd,
        ...(od !== undefined ? { order: od } : null),
        alignSelf,
        justifySelf,
        ...style
      }}
    />
  );
}
