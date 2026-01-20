import React from "react";
import {
  AutoGrid,
  Center,
  Container,
  Grid,
  GridItem,
  Inline,
  Show,
  Only,
  Hide,
  Spacer,
  Stack,
  SidebarLayout,
  PageShell
} from "@arc/layout";
import { DocsPage } from "./DocsPage";

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at 20% 10%, rgba(90,120,255,0.18), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,140,70,0.14), transparent 45%), #0b0f17",
    color: "rgba(255,255,255,0.92)",
    overflowX: "hidden"
  } as React.CSSProperties,

  card: {
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 14,
    padding: 16,
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
  } as React.CSSProperties,

  chip: {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.03)",
    whiteSpace: "nowrap"
  } as React.CSSProperties,

  sectionTitle: {
    margin: "0 0 10px 0",
    fontSize: 18,
    letterSpacing: 0.2
  } as React.CSSProperties,

  helper: {
    margin: "6px 0 0 0",
    opacity: 0.8,
    lineHeight: 1.5
  } as React.CSSProperties,

  hr: {
    border: "none",
    height: 1,
    background: "rgba(255,255,255,0.12)",
    margin: "18px 0"
  } as React.CSSProperties
};

function Card({ title, badge }: { title: string; badge?: string }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        {badge ? <span style={styles.chip}>{badge}</span> : null}
      </div>

      <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.35 }}>
        AutoGrid minItemWidth ile kolon sayısını otomatik ayarlar.
      </p>
    </div>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...styles.card,
        padding: 12,
        background: "rgba(60,120,255,0.10)",
        border: "1px solid rgba(90,120,255,0.35)"
      }}
    >
      {children}
    </div>
  );
}

function DemoBox({
  label,
  hint,
  tone = "blue",
  children
}: {
  label: string;
  hint?: string;
  tone?: "blue" | "green" | "orange" | "purple";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { border: string; bg: string }> = {
    blue: { border: "rgba(90,120,255,0.45)", bg: "rgba(90,120,255,0.10)" },
    green: { border: "rgba(80,220,150,0.45)", bg: "rgba(80,220,150,0.08)" },
    orange: { border: "rgba(255,160,70,0.50)", bg: "rgba(255,160,70,0.08)" },
    purple: { border: "rgba(190,120,255,0.50)", bg: "rgba(190,120,255,0.08)" }
  };

  const t = toneMap[tone];

  return (
    <div
      style={{
        ...styles.card,
        background: t.bg,
        border: `1px solid ${t.border}`
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>{label}</div>
        <span style={{ ...styles.chip, opacity: 0.95 }}>{tone}</span>
      </div>
      {hint ? <div style={styles.helper}>{hint}</div> : null}
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(255,255,255,0.03)",
        whiteSpace: "nowrap"
      }}
    >
      {children}
    </span>
  );
}

/** Sidebar (göze hitap eden) */
function PrettySidebar() {
  return (
    <div style={{ display: "grid", gap: 14, padding: 14 }}>
      <div
        style={{
          borderRadius: 16,
          padding: 14,
          border: "1px solid rgba(255,255,255,0.10)",
          background:
            "radial-gradient(circle at 30% 20%, rgba(90,120,255,0.16), transparent 60%), rgba(255,255,255,0.03)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.35)"
            }}
          >
            <span style={{ fontSize: 18 }}>🧭</span>
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>ARC UI</div>
            <div style={{ opacity: 0.72, fontSize: 12 }}>Layout primitives playground</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, opacity: 0.65, paddingLeft: 4 }}>NAVIGATION</div>

      <div style={{ display: "grid", gap: 8 }}>
        {[
          { label: "Dashboard", icon: "📊", active: true },
          { label: "Projects", icon: "🧩" },
          { label: "Docs", icon: "📚" },
          { label: "Settings", icon: "⚙️" }
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            style={{ all: "unset", cursor: "pointer" }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 14,
                border: item.active
                  ? "1px solid rgba(90,120,255,0.45)"
                  : "1px solid rgba(255,255,255,0.10)",
                background: item.active ? "rgba(90,120,255,0.12)" : "rgba(255,255,255,0.03)",
                boxShadow: item.active ? "0 10px 28px rgba(0,0,0,0.30)" : "none"
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 18,
                  borderRadius: 999,
                  background: item.active ? "rgba(90,120,255,0.95)" : "transparent"
                }}
              />

              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)"
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
              </div>

              <div style={{ fontWeight: 800 }}>{item.label}</div>
              <div style={{ marginLeft: "auto", opacity: 0.55, fontSize: 12 }}>↵</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.10)", margin: "6px 0" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 12,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)"
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)"
          }}
        >
          👤
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 13 }}>Akın</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>Local dev</div>
        </div>

        <div style={{ marginLeft: "auto", ...styles.chip, opacity: 0.9 }}>Online</div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = React.useState<"playground" | "docs">("playground");

  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(11,15,23,0.72)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Container size={{ base: "sm", md: "xl" }} gutter={{ base: 12, md: 24 }}>
          <Inline align="center" gap={10} style={{ padding: "10px 0" }}>
            <div style={{ fontWeight: 950, letterSpacing: 0.2 }}>ARC UI</div>
            <div style={{ opacity: 0.65, fontSize: 12 }}>layout framework</div>
            <Spacer />

            <button
              onClick={() => setView("playground")}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border:
                  view === "playground"
                    ? "1px solid rgba(90,120,255,0.55)"
                    : "1px solid rgba(255,255,255,0.14)",
                background:
                  view === "playground"
                    ? "rgba(90,120,255,0.12)"
                    : "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                fontWeight: 850
              }}
            >
              Playground
            </button>

            <button
              onClick={() => setView("docs")}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border:
                  view === "docs"
                    ? "1px solid rgba(90,120,255,0.55)"
                    : "1px solid rgba(255,255,255,0.14)",
                background:
                  view === "docs" ? "rgba(90,120,255,0.12)" : "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                fontWeight: 850
              }}
            >
              Docs
            </button>
          </Inline>
        </Container>
      </div>

      {view === "docs" ? (
        <DocsPage />
      ) : (
        <Container
          size={{ base: "sm", md: "xl" }}
          gutter={{ base: 12, md: 24 }}
          style={{ paddingTop: 28, paddingBottom: 40 }}
        >
          <Stack gap={16}>
            <div>
              <h1 style={{ margin: 0, fontSize: 44, letterSpacing: -0.5 }}>ARC Layout Playground</h1>
              <p style={{ marginTop: 10, marginBottom: 0, opacity: 0.85 }}>
                Bu sayfa: Show/Only/Hide, AutoGrid, 12 kolon Grid, Inline/Spacer/Center, SidebarLayout ve PageShell demolarını içerir.
              </p>
            </div>

            {/* SHOW / ONLY / HIDE */}
            <Stack gap={10}>
              <Show below="md">
                <Banner>
                  ✅ <b>Show below="md"</b>: Şu an mobil/sm görünümündesin.
                </Banner>
              </Show>

              <Show above="md">
                <Banner>
                  ✅ <b>Show above="md"</b>: Şu an md ve üstü görünümündesin.
                </Banner>
              </Show>

              <Only on="md">
                <Banner>
                  🎯 <b>Only on="md"</b>: Sadece md breakpoint’te görünürüm.
                </Banner>
              </Only>

              <Hide below="md">
                <Banner>
                  🙈 <b>Hide below="md"</b>: md altındayken gizliyim (md+’da görünürüm).
                </Banner>
              </Hide>
            </Stack>

            <div style={styles.hr} />

            {/* AUTOGRID */}
            <h2 style={styles.sectionTitle}>AutoGrid Demo</h2>
            <AutoGrid
              minItemWidth={{ base: 160, sm: 200, md: 220, lg: 240 }}
              gap={{ base: 12, md: 16 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <Card key={i} title={`Card ${i + 1}`} badge={i % 4 === 0 ? "featured" : undefined} />
              ))}
            </AutoGrid>

            <div style={styles.hr} />

            {/* GRID */}
            <h2 style={styles.sectionTitle}>12 Column Grid Demo</h2>
            <p style={{ margin: 0, opacity: 0.82 }}>
              Renkler sadece kolon yerleşimini okumayı kolaylaştırmak için. Pencereyi daraltınca hepsi full width olur.
            </p>

            <Grid columns={12} gap={{ base: 12, md: 16 }} flow="row dense" style={{ marginTop: 12 }}>
              <GridItem span={{ base: "full", md: 8 }}>
                <DemoBox tone="blue" label="Main (span 8)" hint="Mobil: full. md+: 8 kolon.">
                  <div style={{ opacity: 0.9 }}>Chart, tablo, feed vb.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 4 }}>
                <DemoBox tone="orange" label="Side A (span 4)" hint="Mobil: full. md+: sağ yan panel.">
                  <div style={{ opacity: 0.9 }}>KPI, filtre, aksiyon kutusu.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 4 }}>
                <DemoBox tone="green" label="Side B (span 4)" hint="Dense flow ile boşlukları daha iyi doldurabilir.">
                  <div style={{ opacity: 0.9 }}>İkinci yan panel.</div>
                </DemoBox>
              </GridItem>

              <GridItem span={{ base: "full", md: 8 }}>
                <DemoBox tone="purple" label="Wide (span 8)" hint="İkinci satırda geniş alan. Form / tablo için iyi.">
                  <div style={{ opacity: 0.9 }}>Geniş içerik alanı.</div>
                </DemoBox>
              </GridItem>
            </Grid>

            <div style={styles.hr} />

            {/* INLINE + SPACER + CENTER */}
            <h2 style={styles.sectionTitle}>Inline + Spacer + Center</h2>

            <Inline
              wrap
              gap={{ base: 8, md: 12 }}
              align="center"
              style={{ ...styles.card, padding: 12, background: "rgba(255,255,255,0.03)" }}
            >
              <MiniChip>🏷️ Chip A</MiniChip>
              <MiniChip>🏷️ Chip B</MiniChip>
              <MiniChip>🏷️ Chip C</MiniChip>
              <MiniChip>🏷️ Chip D</MiniChip>
              <MiniChip>🏷️ Chip E</MiniChip>

              <Spacer />

              <MiniChip>⚡ Right Action</MiniChip>
            </Inline>

            <div
              style={{
                height: 160,
                marginTop: 12,
                borderRadius: 14,
                border: "1px dashed rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.02)"
              }}
            >
              <Center style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>🎯 Ortadayım</div>
                  <div style={{ opacity: 0.8, marginTop: 6 }}>
                    Center = align-items + justify-content
                  </div>
                </div>
              </Center>
            </div>

            <div style={styles.hr} />

            {/* SIDEBAR LAYOUT */}
            <h2 style={styles.sectionTitle}>SidebarLayout</h2>

            <SidebarLayout collapseBelow="lg" sidebarWidth={300} sidebar={<PrettySidebar />}>
              <Stack gap={12}>
                <div style={styles.card}>
                  <b>Content Area</b>
                  <div style={styles.helper}>Desktop’ta sidebar sabit. Mobilde drawer olarak açılır.</div>
                </div>

                <div style={{ height: 420, borderRadius: 12, border: "1px dashed rgba(255,255,255,0.18)" }} />
              </Stack>
            </SidebarLayout>

            <div style={styles.hr} />

            {/* PAGESHELL PRESET */}
            <h2 style={styles.sectionTitle}>PageShell (Preset) Demo</h2>

            <PageShell
              title="PageShell Preset"
              subtitle="Header + actions + footer + (opsiyonel) sidebar. Tek component ile iki layout modu."
              actions={
                <>
                  <button
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                      fontWeight: 800
                    }}
                  >
                    New
                  </button>
                  <button
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                      fontWeight: 800
                    }}
                  >
                    Export
                  </button>
                </>
              }
              footer="Footer slot: copyright, links, version vb. burada."
              sidebar={<PrettySidebar />}
            >
              <div style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.03)",
                    padding: 14
                  }}
                >
                  <b>Content</b>
                  <div style={{ opacity: 0.78, marginTop: 6, lineHeight: 1.45 }}>
                    PageShell burada içerik alanını taşıyor. Container + Stack ritmini otomatikleştiriyor.
                  </div>
                </div>

                <div style={{ height: 320, borderRadius: 14, border: "1px dashed rgba(255,255,255,0.18)" }} />
              </div>
            </PageShell>
          </Stack>
        </Container>
      )}
    </div>
  );
}
