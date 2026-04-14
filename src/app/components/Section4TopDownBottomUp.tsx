import { useRef, useState, useEffect } from "react";

const serif = "'Cormorant Garamond', serif";
const sans  = "'Inter', sans-serif";

/* ─── Accent line + text row ─── */
function AccentRow({
  text,
  lineColor,
}: {
  text:      string;
  lineColor: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          width:           "16px",
          height:          "1px",
          backgroundColor: lineColor,
          flexShrink:      0,
        }}
      />
      <span
        style={{
          fontFamily: sans,
          fontSize:   "15px",
          color:      "#8A857C",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
}

interface Props {
  scrollX: number;
  isVertical?: boolean;
}

export function Section4TopDownBottomUp({ scrollX, isVertical = false }: Props) {
  const panelRef              = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !panelRef.current) return;

    if (isVertical) {
      // Vertical: use IntersectionObserver
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        { threshold: 0.15 }
      );
      observer.observe(panelRef.current);
      return () => observer.disconnect();
    }

    const rect = panelRef.current.getBoundingClientRect();
    if (rect.left < window.innerWidth) setVisible(true);
  }, [scrollX, visible, isVertical]);

  return (
    <div
      ref={panelRef}
      className={isVertical ? "" : "absolute z-0"}
      style={isVertical ? {
        width:          "100%",
        height:         "100%",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity:        visible ? 1 : 0,
        transition:     "opacity 600ms ease-out",
        backgroundColor: "#F9F9F7",
        padding:        "24px",
      } : {
        top:            0,
        bottom:         0,
        left:           "44vw",
        right:          0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity:        visible ? 1 : 0,
        transition:     "opacity 600ms ease-out",
      }}
    >
      {/* ── Contained block: width just slightly wider than content ── */}
      <div
        style={{
          width:         "clamp(460px, 34vw, 540px)",
          display:       "flex",
          flexDirection: "column",
          height:        "72vh",
          minHeight:     "480px",
          maxHeight:     "680px",
        }}
      >
        {/* ════════════════════════════════════════════════
            OBERE ZONE — dunkel, Inhalt unten verankert
            ════════════════════════════════════════════════ */}
        <div
          style={{
            flex:            1,
            backgroundColor: "#1A1916",
            display:         "flex",
            flexDirection:   "column",
            justifyContent:  "flex-end",
            padding:         "44px 52px",
          }}
        >
          {/* Kleine Überschrift */}
          <span
            style={{
              fontFamily:    sans,
              fontSize:      "10px",
              letterSpacing: "0.2em",
              color:         "#6B665E",
              textTransform: "uppercase",
              display:       "block",
              marginBottom:  "20px",
            }}
          >
            Globale Perspektive
          </span>

          {/* Grosse Headline */}
          <span
            style={{
              fontFamily:    serif,
              fontSize:      "64px",
              letterSpacing: "-0.03em",
              color:         "#F9F9F7",
              lineHeight:    1,
              display:       "block",
            }}
          >
            Top-Down
          </span>

          {/* Drei Zeilen */}
          <div
            style={{
              marginTop:     "28px",
              display:       "flex",
              flexDirection: "column",
              gap:           "14px",
            }}
          >
            <AccentRow text="Makroindikatoren und Konjunkturzyklen"     lineColor="#989071" />
            <AccentRow text="Systematische Bewertung der Anlageklassen" lineColor="#989071" />
            <AccentRow text="Strategischer Horizont: 3–5 Jahre"         lineColor="#989071" />
          </div>
        </div>

        {/* ═══════════════════��════════════════════════════
            MITTLERE ZONE — Akzentbalken
            ════════════════════════════════════════════════ */}
        <div
          style={{
            height:          "72px",
            flexShrink:      0,
            backgroundColor: "#989071",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            padding:         "0 52px",
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontSize:   "24px",
              fontStyle:  "italic",
              color:      "#F9F9F7",
              lineHeight: 1,
            }}
          >
            Anlageentscheid
          </span>

          <span
            style={{
              fontFamily:    sans,
              fontSize:      "10px",
              letterSpacing: "0.15em",
              color:         "#D8D5CF",
              textTransform: "uppercase",
            }}
          >
            Anlagekomitee
          </span>
        </div>

        {/* ════════════════════════════════════════════════
            UNTERE ZONE — hell, Inhalt oben verankert
            ════════════════════════════════════════════════ */}
        <div
          style={{
            flex:            1,
            backgroundColor: "#F9F9F7",
            display:         "flex",
            flexDirection:   "column",
            justifyContent:  "flex-start",
            padding:         "44px 52px",
          }}
        >
          {/* Grosse Headline */}
          <span
            style={{
              fontFamily:    serif,
              fontSize:      "64px",
              letterSpacing: "-0.03em",
              color:         "#1A1916",
              lineHeight:    1,
              display:       "block",
            }}
          >
            Bottom-Up
          </span>

          {/* Kleine Überschrift */}
          <span
            style={{
              fontFamily:    sans,
              fontSize:      "10px",
              letterSpacing: "0.2em",
              color:         "#B0ACA5",
              textTransform: "uppercase",
              display:       "block",
              marginTop:     "20px",
            }}
          >
            Einzeltitel-Perspektive
          </span>

          {/* Drei Zeilen */}
          <div
            style={{
              marginTop:     "28px",
              display:       "flex",
              flexDirection: "column",
              gap:           "14px",
            }}
          >
            <AccentRow text="Quantitative Modelle und Datenanalyse"   lineColor="#D8D5CF" />
            <AccentRow text="Technische Analyse und Marktpsychologie" lineColor="#D8D5CF" />
            <AccentRow text="Kurzfristige Trends und Opportunitäten"  lineColor="#D8D5CF" />
          </div>
        </div>
      </div>
    </div>
  );
}