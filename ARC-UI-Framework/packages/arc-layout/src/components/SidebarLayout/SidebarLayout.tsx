import React from "react";
import type { BreakpointKey } from "../../core/breakpoints";
import { breakpointOrder } from "../../core/breakpoints";
import { useBreakpoint } from "../../hooks/useBreakpoint";

function idx(bp: BreakpointKey) {
  return breakpointOrder.indexOf(bp);
}

export type SidebarLayoutProps = {
  /** Sidebar içeriği (menü, nav, filtre vs.) */
  sidebar: React.ReactNode;

  /** Ana içerik (sayfanın geri kalanı) */
  children: React.ReactNode;

  /** Bu breakpoint’in ALTINDA sidebar drawer’a dönüşür */
  collapseBelow?: BreakpointKey;

  /** Sidebar genişliği (desktop) */
  sidebarWidth?: number;

  /** Drawer açıkken overlay rengi */
  overlayColor?: string;

  /** Controlled kullanım */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Uncontrolled başlangıç değeri (mobil drawer) */
  defaultOpen?: boolean;

  /** Mobilde otomatik menü butonu göster */
  showToggle?: boolean;

  /** Toggle butonu metni */
  toggleLabel?: string;

  /** Üst bar (mobil) için ekstra slot */
  topbarRight?: React.ReactNode;

  /** Dış container style */
  style?: React.CSSProperties;
};

function useControllableBoolean(params: {
  value?: boolean;
  defaultValue: boolean;
  onChange?: (v: boolean) => void;
}) {
  const { value, defaultValue, onChange } = params;
  const [inner, setInner] = React.useState(defaultValue);

  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;

  const set = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setInner(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  return [current, set] as const;
}

function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // Scrollbar genişliği kadar padding ekleyerek "layout shift" azaltır
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

export function SidebarLayout({
  sidebar,
  children,
  collapseBelow = "lg",
  sidebarWidth = 280,
  overlayColor = "rgba(0,0,0,0.55)",
  open,
  onOpenChange,
  defaultOpen = false,
  showToggle = true,
  toggleLabel = "Menu",
  topbarRight,
  style
}: SidebarLayoutProps) {
  const bp = useBreakpoint();


  const isCollapsed = idx(bp) < idx(collapseBelow);


  const [isOpen, setIsOpen] = useControllableBoolean({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });


  React.useEffect(() => {
    if (!isCollapsed && isOpen) setIsOpen(false);
  }, [isCollapsed, isOpen, setIsOpen]);


  useLockBodyScroll(isCollapsed && isOpen);


  React.useEffect(() => {
    if (!(isCollapsed && isOpen)) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCollapsed, isOpen, setIsOpen]);

  const toggle = () => setIsOpen(!isOpen);


  const rootStyle: React.CSSProperties = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: isCollapsed ? "1fr" : `${sidebarWidth}px 1fr`,
    alignItems: "start",
    position: "relative",
    ...style
  };

  const sidebarDesktopStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "auto",
    borderRight: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)"
  };

  const contentStyle: React.CSSProperties = {
    minWidth: 0 
  };

 
  const drawerPanelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: Math.min(sidebarWidth, 320),
    maxWidth: "86vw",
    transform: isOpen ? "translateX(0)" : "translateX(-110%)",
    transition: "transform 180ms ease",
    background: "#0b0f17",
    borderRight: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    zIndex: 50,
    overflow: "auto"
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: overlayColor,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    transition: "opacity 160ms ease",
    zIndex: 40
  };

  const topbarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)"
  };

  const buttonStyle: React.CSSProperties = {
    appearance: "none",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 700
  };

  return (
    <div style={rootStyle}>
      {!isCollapsed ? <aside style={sidebarDesktopStyle}>{sidebar}</aside> : null}

      
      <main style={contentStyle}>
        {isCollapsed && showToggle ? (
          <div style={{ padding: 12 }}>
            <div style={topbarStyle}>
              <button type="button" onClick={toggle} style={buttonStyle}>
                ☰ {toggleLabel}
              </button>

              <div style={{ flex: 1, opacity: 0.85, fontWeight: 700 }}>
                {toggleLabel === "Menu" ? "Navigation" : toggleLabel}
              </div>

              {topbarRight ? <div>{topbarRight}</div> : null}
            </div>
          </div>
        ) : null}

        <div style={{ padding: isCollapsed ? 12 : 16 }}>{children}</div>
      </main>

     
      {isCollapsed ? (
        <>
          <div
            style={overlayStyle}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <aside
            style={drawerPanelStyle}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar"
          >
            <div style={{ padding: 12 }}>
              <button type="button" onClick={() => setIsOpen(false)} style={buttonStyle}>
                ✕ Close
              </button>
            </div>
            <div style={{ padding: 12, paddingTop: 0 }}>{sidebar}</div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
