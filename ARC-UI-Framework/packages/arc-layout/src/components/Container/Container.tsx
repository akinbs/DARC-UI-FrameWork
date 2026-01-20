import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { containerSizes, type ContainerSize, defaultGutterPx } from "../../tokens/layout";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: Responsive<ContainerSize>;
  gutter?: Responsive<number>;
  center?: boolean;
};

export function Container({
  size = "lg",
  gutter = defaultGutterPx,
  center = true,
  style,
  ...rest
}: ContainerProps) {
  const bp = useBreakpoint();

  const s = resolveResponsive(size, bp, "lg")!;
  const g = resolveResponsive(gutter, bp, defaultGutterPx)!;

  return (
    <div
      {...rest}
      style={{
        boxSizing: "border-box",   
        width: "100%",
        maxWidth: `${containerSizes[s]}px`,
        paddingLeft: `${g}px`,
        paddingRight: `${g}px`,
        marginLeft: center ? "auto" : undefined,
        marginRight: center ? "auto" : undefined,
        minWidth: 0,               
        overflowX: "clip",         

        ...style
      }}
    />
  );
}
