import { AutoGrid, Container, Show, Stack } from "@arc/layout";

function Card({ title, badge }: { title: string; badge?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 14,
        padding: 16,
        background: "rgba(255,255,255,0.02)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        {badge ? (
          <span
            style={{
              fontSize: 12,
              padding: "3px 8px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              opacity: 0.9
            }}
          >
            {badge}
          </span>
        ) : null}
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
        padding: 10,
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 12,
        background: "rgba(255,255,255,0.03)"
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        // İstersen full-screen arkaplan hissi için:
        // background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 55%)"
      }}
    >
      <Container
        size={{ base: "sm", md: "xl" }}
        gutter={{ base: 12, md: 24 }}
        style={{ paddingTop: 28, paddingBottom: 40 }}
      >
        <Stack gap={16}>
          <div>
            <h1 style={{ margin: 0, fontSize: 44, letterSpacing: -0.5 }}>
              AutoGrid + Show
            </h1>
            <p style={{ marginTop: 10, marginBottom: 0, opacity: 0.85 }}>
              Banner’lar breakpoint’e göre görünür/gizli. Alt tarafta AutoGrid kartları var.
            </p>
          </div>

          <Stack gap={10}>
            <Show below="md">
              <Banner>
                ✅ <b>below="md"</b>: Şu an mobil/sm görünümündesin.
              </Banner>
            </Show>

            <Show above="md">
              <Banner>
                ✅ <b>above="md"</b>: Şu an md ve üstü görünümündesin.
              </Banner>
            </Show>

            <Show between={["sm", "lg"]}>
              <Banner>
                ✅ <b>between=["sm","lg"]</b>: Şu an sm..lg aralığındasın.
              </Banner>
            </Show>

            <Show when={{ base: true, md: false }}>
              <Banner>
                ✅ <b>when</b>: base’de görünür, md’de gizli.
              </Banner>
            </Show>
          </Stack>

          <AutoGrid
            minItemWidth={{ base: 160, sm: 200, md: 220, lg: 240 }}
            gap={{ base: 12, md: 16 }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <Card
                key={i}
                title={`Card ${i + 1}`}
                badge={i % 4 === 0 ? "featured" : undefined}
              />
            ))}
          </AutoGrid>
        </Stack>
      </Container>
    </div>
  );
}
