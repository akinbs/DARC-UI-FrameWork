import React from "react";
import { Container } from "../Container";
import { Stack } from "../Stack";
import { Inline } from "../Inline";
import { Spacer } from "../Spacer";
import { SidebarLayout } from "../SidebarLayout";
import type { BreakpointKey } from "../../core/breakpoints";
import type { Responsive } from "../../core/types";

export type PageShellProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;

  actions?: React.ReactNode;

  sidebar?: React.ReactNode;

  footer?: React.ReactNode;

  children: React.ReactNode;

  containerSize?: Responsive<"sm" | "md" | "lg" | "xl">;
  gutter?: Responsive<number>;

  collapseBelow?: BreakpointKey;
  sidebarWidth?: number;

  style?: React.CSSProperties;
};

function HeaderCard({
  title,
  subtitle,
  actions
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "radial-gradient(circle at 20% 10%, rgba(90,120,255,0.18), transparent 55%), rgba(255,255,255,0.03)",
        padding: 14
      }}
    >
      <Inline align="center" gap={12} wrap>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 950, fontSize: 18, letterSpacing: 0.2 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 4, opacity: 0.78, fontSize: 13, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <Spacer />

        {actions ? <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{actions}</div> : null}
      </Inline>
    </div>
  );
}

function FooterCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        padding: 12,
        opacity: 0.9,
        fontSize: 13
      }}
    >
      {children}
    </div>
  );
}

export function PageShell({
  title,
  subtitle,
  actions,
  sidebar,
  footer,
  children,
  containerSize = { base: "sm", md: "xl" },
  gutter = { base: 12, md: 24 },
  collapseBelow = "lg",
  sidebarWidth = 300,
  style
}: PageShellProps) {

  const body = (
    <Container
      size={containerSize}
      gutter={gutter}
      style={{ paddingTop: 22, paddingBottom: 26, ...style }}
    >
      <Stack gap={14}>
        <HeaderCard title={title} subtitle={subtitle} actions={actions} />

        <div>{children}</div>

        {footer ? <FooterCard>{footer}</FooterCard> : null}
      </Stack>
    </Container>
  );

  if (!sidebar) return body;

  return (
    <SidebarLayout
      collapseBelow={collapseBelow}
      sidebarWidth={sidebarWidth}
      sidebar={sidebar}
    >
      {body}
    </SidebarLayout>
  );
}
