import React, { useRef, useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { LAYOUT } from "../layout";

/* ─── Design tokens ─── */
const C = {
  dark:    "#1A1916",   // strip bottom · numbers 03–05 · separator
  charcoal:"#3A3835",   // descriptions 03–05
  stone:   "#8A857C",   // descriptions 01–02
  line:    "#D8D5CF",   // strip top · numbers 01–02
  warm:    "#989071",   // footer hint (unchanged)
};
const serif = "'Cormorant Garamond', serif";
const sans  = "'Inter', sans-serif";

/* ─── Step definitions ─── */
const STEPS = [
  {
    num:    "01",
    title:  "Ihre Ziele definieren",
    desc:   "Anlageziele, Zeithorizont und Erwartungen klären",
    accent: false,
  },
  {
    num:    "02",
    title:  "Risikotoleranz & Eignung",
    desc:   "Finanzielle Gesamtsituation und Anlegerprofil prüfen",
    accent: false,
  },
  {
    num:    "03",
    title:  "Investmentuniversum filtern",
    desc:   "Quantitative Modelle und systematische Selektion",
    accent: true,
  },
  {
    num:    "04",
    title:  "Vermögensallokation",
    desc:   "Strategische und taktische Verteilung über Anlageklassen",
    accent: true,
  },
  {
    num:    "05",
    title:  "Portfolio aktiv verwalten",
    desc:   "Laufende Überwachung, Risikokontrolle, Reporting",
    accent: true,
  },
] as const;

/* ─── Animation helpers ───────────────────────────────────────────────
   Trigger: the moment the timeline container's left edge enters the
   viewport (rect.left < window.innerWidth).
   "scrolledPast" = pixel distance scrolled past that trigger point.
   Each step is delayed by ~staggerPx (~200ms at moderate scroll speed).
   ─────────────────────────────────────────────────────────────────── */
function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function getItemP(
  scrolledPast: number,
  index: number,
  staggerPx: number,
  windowPx: number
): number {
  if (windowPx <= 0) return 0;
  const startPx = index * staggerPx;
  const t = Math.max(0, Math.min(1, (scrolledPast - startPx) / windowPx));
  return easeOut(t);
}

interface Props {
  /** Passed from parent to drive re-renders on every scroll frame. */
  scrollX: number;
  isVertical?: boolean;
}

export function Section3Timeline({ scrollX, isVertical = false }: Props) {
  // scrollX is intentionally referenced so prop-change triggers re-renders
  void scrollX;

  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Compute how many pixels we've scrolled past the trigger point ── */
  let scrolledPast = 0;
  if (isVertical) {
    // In vertical mode, use intersection-based trigger
    if (containerRef.current && typeof window !== "undefined") {
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh) {
        scrolledPast = vh - rect.top;
      }
    }
  } else if (containerRef.current && typeof window !== "undefined") {
    const rect = containerRef.current.getBoundingClientRect();
    const vw   = window.innerWidth;
    if (rect.left < vw) {
      scrolledPast = vw - rect.left;
    }
  }

  const vw        = typeof window !== "undefined" && window.innerWidth > 0 ? window.innerWidth : 1440;
  // staggerPx ≈ 166 px at 1440 → ≈ 200 ms at comfortable scroll speed
  const staggerPx = vw * 0.115;
  // Each step's own animation window
  const windowPx  = vw * 0.10;
  // Strip grows over the full reveal range
  const totalRange = (STEPS.length - 1) * staggerPx + windowPx;
  const stripScale = totalRange > 0
    ? Math.max(0, Math.min(1, scrolledPast / totalRange))
    : 0;

  // In vertical mode, re-trigger renders on scroll
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!isVertical) return;
    const onScroll = () => setTick((t) => t + 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isVertical]);

  return (
    <div
      ref={containerRef}
      className={isVertical ? "" : "absolute z-0"}
      style={isVertical ? {
        width:          "100%",
        height:         "100%",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        backgroundColor: "#F9F9F7",
      } : {
        top:            0,
        bottom:         0,
        left:           LAYOUT.imageLeft,
        right:          0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
      }}
    >
      {/* ── Inner wrapper: strip + content ── */}
      <div
        style={{
          display:       "flex",
          flexDirection: "row",
          alignItems:    "stretch",
          width:         "clamp(460px, 50vw, 760px)",
        }}
      >
        {/* ════════════════════════════════════════════
            Vertical colour strip  (6 px, grows top→bottom)
            Top 40 %  → #D8D5CF  (steps 01–02)
            Bottom 60 % → #1A1916 (steps 03–05)
            ════════════════════════════════════════════ */}
        <div
          style={{
            width:           "6px",
            flexShrink:      0,
            borderRadius:    "2px",
            overflow:        "hidden",
            transform:       `scaleY(${stripScale.toFixed(4)})`,
            transformOrigin: "top",
            willChange:      "transform",
            marginRight:     "36px",
          }}
        >
          <div style={{ height: "40%", backgroundColor: C.line }} />
          <div style={{ height: "60%", backgroundColor: C.dark }} />
        </div>

        {/* ════════════════════════════════════════════
            Step list
            ════════════════════════════════════════════ */}
        <div
          style={{
            flex:          1,
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(8px, 1.4vh, 20px)",
          }}
        >
          {STEPS.map((step, i) => {
            const sp        = getItemP(scrolledPast, i, staggerPx, windowPx);
            const numColor  = step.accent ? C.dark  : C.line;
            const descColor = step.accent ? C.charcoal : C.stone;

            return (
              <React.Fragment key={step.num}>

                {/* ── Separator before step 03 ── */}
                {i === 2 && (
                  <div
                    style={{
                      opacity:       getItemP(scrolledPast, 1.6, staggerPx, windowPx),
                      display:       "flex",
                      flexDirection: "row",
                      alignItems:    "center",
                      gap:           "14px",
                      paddingTop:    "clamp(10px, 1.6vh, 22px)",
                      paddingBottom: "clamp(10px, 1.6vh, 22px)",
                      willChange:    "opacity",
                    }}
                  >
                    <div
                      style={{
                        width:           "32px",
                        height:          "1px",
                        backgroundColor: C.dark,
                        flexShrink:      0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily:    sans,
                        fontSize:      "13px",
                        letterSpacing: "0.2em",
                        color:         C.dark,
                        textTransform: "uppercase" as const,
                      }}
                    >
                      Tellian Capital übernimmt
                    </span>
                  </div>
                )}

                {/* ── Step row: ordinal + title + description ── */}
                <div
                  style={{
                    opacity:         sp,
                    transform:       `scale(${(0.92 + 0.08 * sp).toFixed(4)})`,
                    transformOrigin: "left center",
                    willChange:      "opacity, transform",
                    display:         "flex",
                    flexDirection:   "row",
                    alignItems:      "flex-start",
                    gap:             "20px",
                  }}
                >
                  {/* Large ordinal number */}
                  <span
                    style={{
                      fontFamily: serif,
                      fontSize:   "120px",
                      fontWeight: 400,
                      color:      numColor,
                      lineHeight: 0.82,
                      flexShrink: 0,
                      minWidth:   "130px",
                      display:    "block",
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Title + description */}
                  <div style={{ paddingTop: "12px" }}>
                    <span
                      style={{
                        fontFamily: serif,
                        fontSize:   "28px",
                        color:      C.dark,
                        display:    "block",
                        lineHeight: 1.15,
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      style={{
                        fontFamily: sans,
                        fontSize:   "16px",
                        color:      descColor,
                        display:    "block",
                        marginTop:  "6px",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.desc}
                    </span>
                  </div>
                </div>

              </React.Fragment>
            );
          })}

          {/* ── Footer: reporting cycle hint ── */}
          <div
            style={{
              opacity:    getItemP(scrolledPast, STEPS.length, staggerPx, windowPx) * 0.5,
              display:    "flex",
              alignItems: "center",
              gap:        "10px",
              marginTop:  "clamp(12px, 2vh, 28px)",
              willChange: "opacity",
            }}
          >
            <RotateCcw
              size={18}
              style={{ color: C.warm, flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: sans,
                fontSize:   "14px",
                color:      C.warm,
                fontStyle:  "italic",
              }}
            >
              Vierteljährliches Reporting an den Kunden
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}