import React from "react";

export type PropRow = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
};

export type PropsTableProps = {
  title?: string;
  rows: PropRow[];
};

export function PropsTable({ title = "Props", rows }: PropsTableProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          padding: "10px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          fontWeight: 900,
          fontSize: 13
        }}
      >
        {title}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["Prop", "Type", "Default", "Description"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: 12,
                    opacity: 0.85,
                    padding: "10px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.10)"
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td
                  style={{
                    padding: "10px 12px",
                    verticalAlign: "top",
                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: 12.5 }}>
                    {r.name}
                  </span>
                  {r.required ? (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,140,70,0.35)",
                        background: "rgba(255,140,70,0.10)",
                        opacity: 0.95
                      }}
                    >
                      required
                    </span>
                  ) : null}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    verticalAlign: "top",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 12,
                    opacity: 0.9,
                    whiteSpace: "nowrap"
                  }}
                >
                  {r.type}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    verticalAlign: "top",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 12,
                    opacity: 0.85,
                    whiteSpace: "nowrap"
                  }}
                >
                  {r.defaultValue ?? "—"}
                </td>

                <td
                  style={{
                    padding: "10px 12px",
                    verticalAlign: "top",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    opacity: 0.9,
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    minWidth: 320
                  }}
                >
                  {r.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
