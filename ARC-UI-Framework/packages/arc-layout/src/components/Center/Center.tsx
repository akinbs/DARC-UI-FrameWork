import React from "react";

export type CenterProps = React.HTMLAttributes<HTMLDivElement> & {
  inline?: boolean;
};

export function Center({ inline = false, style, ...rest }: CenterProps) {
  return (
    <div
      {...rest}
      style={{
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
    />
  );
}
