import React from "react";

export type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
  /** uzun kodlarda kaydırma */
  maxHeight?: number;
};

export function CodeBlock({
  code,
  language = "tsx",
  title,
  maxHeight = 360
}: CodeBlockProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "radial-gradient(circle at 20% 10%, rgba(90,120,255,0.12), transparent 55%), rgba(0,0,0,0.25)",
        overflow: "hidden"
      }}
    >
      {(title || language) ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)"
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 13 }}>
            {title ?? "Example"}
          </div>
          <div
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              opacity: 0.9
            }}
          >
            {language}
          </div>
        </div>
      ) : null}

      <pre
        style={{
          margin: 0,
          padding: 12,
          maxHeight,
          overflow: "auto",
          fontSize: 12.5,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.90)",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
