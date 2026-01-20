import React from "react";
import {
  PageShell,
  DocSection,
  PropsTable,
  CodeBlock,
  Stack,
  Inline,
  Spacer,
  AutoGrid
} from "@arc/layout";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.03)",
        whiteSpace: "nowrap"
      }}
    >
      {children}
    </span>
  );
}

export function DocsPage() {
  return (
    <PageShell
      title="ARC Layout Docs"
      subtitle="Layout primitives + presets. Bu sayfa framework dokümantasyon vitrinin."
      actions={
        <>
          <Chip>v0.0.1</Chip>
          <Chip>React</Chip>
          <Chip>TypeScript</Chip>
        </>
      }
      footer="ARC UI Framework · docs page · built with @arc/layout"
    >
      <Stack gap={18}>
        <DocSection
          title="Felsefe"
          description={
            <>
              Bu kütüphane “tek tek CSS yaz” yerine <b>primitives</b> (Container, Stack, Inline…)
              ve üstünde <b>presets</b> (PageShell gibi) sunar. Amaç: sayfa ritmini ve responsive davranışı
              standardize etmek.
            </>
          }
        >
          <AutoGrid minItemWidth={{ base: 220, md: 260 }} gap={12}>
            {[
              ["Container", "max-width + gutter standardı"],
              ["Stack", "dikey ritim ve spacing"],
              ["Inline", "satır hizalama + wrap"],
              ["Grid", "12-col layout için"],
              ["Show/Only/Hide", "breakpoint conditional render"],
              ["PageShell", "preset: header/actions/footer/sidebar slots"]
            ].map(([name, desc]) => (
              <div
                key={name}
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  padding: 12
                }}
              >
                <div style={{ fontWeight: 950 }}>{name}</div>
                <div style={{ marginTop: 6, opacity: 0.78, lineHeight: 1.45 }}>
                  {desc}
                </div>
              </div>
            ))}
          </AutoGrid>
        </DocSection>

        <DocSection
          title="Container API"
          description="Sayfanın yatay sınırlarını ve padding’ini standartlaştırır."
        >
          <PropsTable
            rows={[
              {
                name: "size",
                type: 'Responsive<"sm" | "md" | "lg" | "xl">',
                defaultValue: '"lg"',
                description: "Breakpoint’e göre max-width seçer."
              },
              {
                name: "gutter",
                type: "Responsive<number>",
                defaultValue: "defaultGutterPx",
                description: "Sağ/sol padding. Responsive olabilir."
              },
              {
                name: "center",
                type: "boolean",
                defaultValue: "true",
                description: "auto margin ile ortalar."
              }
            ]}
          />

          <CodeBlock
            title="Usage"
            language="tsx"
            code={`<Container size={{ base: "sm", md: "xl" }} gutter={{ base: 12, md: 24 }}>
  <YourContent />
</Container>`}
          />
        </DocSection>

        <DocSection
          title="Show / Only / Hide"
          description="Breakpoint’e göre render kontrolü. UI’yı responsive yapmanın en temiz yolu."
        >
          <PropsTable
            title="Show Props"
            rows={[
              { name: "below", type: "BreakpointKey", description: "Belirtilen breakpoint’in altındayken gösterir." },
              { name: "above", type: "BreakpointKey", description: "Belirtilen breakpoint ve üstünde gösterir." },
              { name: "between", type: "[BreakpointKey, BreakpointKey]", description: "İki breakpoint aralığında gösterir." },
              { name: "when", type: "Responsive<boolean>", description: "Responsive boolean ile kontrol." },
              { name: "fallback", type: "ReactNode", defaultValue: "null", description: "Gizliyken ne render edilsin." }
            ]}
          />

          <CodeBlock
            title="Examples"
            language="tsx"
            code={`<Show below="md">Mobile only</Show>
<Only on="md">Only md</Only>
<Hide below="md">md and up</Hide>`}
          />
        </DocSection>

        <DocSection
          title="PageShell (Preset)"
          description={
            <>
              Tek component ile iki modu yönetir:
              <Inline align="center" gap={10} wrap style={{ marginTop: 8 }}>
                <Chip>sidebar yoksa → normal page</Chip>
                <Chip>sidebar varsa → dashboard (SidebarLayout)</Chip>
              </Inline>
            </>
          }
        >
          <PropsTable
            rows={[
              { name: "title", type: "ReactNode", required: true, description: "Header başlığı." },
              { name: "subtitle", type: "ReactNode", description: "Başlık altı açıklama." },
              { name: "actions", type: "ReactNode", description: "Header sağ tarafı buton/aksiyon slot’u." },
              { name: "sidebar", type: "ReactNode", description: "Verilirse dashboard moduna geçer." },
              { name: "footer", type: "ReactNode", description: "Sayfa altı slot’u." },
              { name: "children", type: "ReactNode", required: true, description: "İçerik." }
            ]}
          />

          <CodeBlock
            title="Usage"
            language="tsx"
            code={`<PageShell
  title="Dashboard"
  actions={<button>New</button>}
  sidebar={<Nav />}
  footer="v0.0.1"
>
  <DashboardContent />
</PageShell>`}
          />
        </DocSection>
      </Stack>
    </PageShell>
  );
}
