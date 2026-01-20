import React from "react";
import { Stack } from "../Stack";

export type DocSectionProps = {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
};

export function DocSection({ title, description, children }: DocSectionProps) {
  return (
    <Stack gap={10}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 950, letterSpacing: 0.2 }}>
          {title}
        </div>
        {description ? (
          <div style={{ marginTop: 6, opacity: 0.78, lineHeight: 1.5 }}>
            {description}
          </div>
        ) : null}
      </div>

      {children}
    </Stack>
  );
}
