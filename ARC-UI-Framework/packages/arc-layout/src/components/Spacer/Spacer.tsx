import React from "react";

export type SpacerProps = React.HTMLAttributes<HTMLDivElement> & {
  grow?: number;
};

export function Spacer({ grow = 1, style, ...rest }: SpacerProps) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      style={{
        flexGrow: grow,
        flexShrink: 1,
        flexBasis: 0,
        ...style
      }}
    />
  );
}
