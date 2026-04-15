import { motion } from "motion/react";
import { ANLAGESTRATEGIEN_SECTIONS } from "../data/anlagestrategienSections";
import { CtaButton } from "./CtaButton";

/* ─── Design tokens ─── */
const C = {
  dark:     "#1A1916",
  charcoal: "#3A3835",
  stone:    "#8A857C",
  muted:    "#B0ACA5",
  line:     "#D8D5CF",
};

const serif = "'Cormorant Garamond', serif";
const sans  = "'Inter', sans-serif";

interface AnlagestrategienDetailProps {
  isMobile: boolean;
  /** Whether detail is currently visible — gates the FLIP ordinals */
  isDetail: boolean;
  /** Disable motion for reduced-motion users */
  reducedMotion: boolean;
  /** Called when the user clicks "Gespräch vereinbaren" */
  onContactClick: () => void;
}

/**
 * Long-scroll detail body for /anlagestrategien.
 * Contains two large sections (Top-Down + Bottom-Up), each with a
 * FLIP'd headline (matching the headlines in Section4TopDownBottomUp).
 */
export function AnlagestrategienDetail({
  isMobile,
  isDetail,
  reducedMotion,
  onContactClick,
}: AnlagestrategienDetailProps) {
  const enableFlip = !isMobile && !reducedMotion;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: isMobile ? "16px 20px 40px" : "40px 48px 56px",
        fontFamily: sans,
        color: C.dark,
      }}
    >
      {ANLAGESTRATEGIEN_SECTIONS.map((section, i) => (
        <section
          key={section.key}
          style={{
            paddingTop: i === 0 ? "0" : isMobile ? "56px" : "80px",
            paddingBottom: isMobile ? "56px" : "80px",
            borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
          }}
        >
          {/* Section header — FLIP target wrapped in motion.span so it lands here from Section4 */}
          <div style={{ maxWidth: "760px" }}>
            <span
              style={{
                fontFamily: sans,
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.stone,
                display: "block",
              }}
            >
              {section.detailEyebrow}
            </span>

            {/* FLIP'd headline — shares layoutId with the one in Section4TopDownBottomUp */}
            {isDetail && (
              <AnlagestrategienFlipTitle
                id={section.key}
                title={section.title}
                enableFlip={enableFlip}
                sizeDesktop="clamp(48px, 6vw, 72px)"
                sizeMobile="clamp(40px, 10vw, 56px)"
                isMobile={isMobile}
              />
            )}

            <p
              style={{
                fontFamily: sans,
                fontSize: isMobile ? "13px" : "14px",
                color: C.stone,
                lineHeight: 1.5,
                margin: "12px 0 32px 0",
              }}
            >
              {section.detailSubline}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {section.detailBody.map((text, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: sans,
                    fontSize: "14px",
                    color: C.charcoal,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "16px 0 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {section.detailBullets.map((bullet, j) => (
                <li
                  key={j}
                  style={{
                    fontFamily: sans,
                    fontSize: "14px",
                    color: C.charcoal,
                    lineHeight: 1.7,
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span aria-hidden style={{ color: C.stone, flexShrink: 0 }}>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {section.detailClosing && (
              <p
                style={{
                  fontFamily: sans,
                  fontSize: "14px",
                  color: C.charcoal,
                  lineHeight: 1.7,
                  margin: "24px 0 0 0",
                }}
              >
                {section.detailClosing}
              </p>
            )}
          </div>
        </section>
      ))}

      {/* ═══ Final CTA ═══ */}
      <div
        style={{
          borderTop: `1px solid ${C.line}`,
          paddingTop: isMobile ? "48px" : "72px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.stone,
          }}
        >
          Nächster Schritt
        </span>
        <h3
          style={{
            fontFamily: serif,
            fontSize: isMobile ? "clamp(26px, 6vw, 32px)" : "32px",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            margin: 0,
            color: C.dark,
          }}
        >
          Reden wir über <em style={{ fontStyle: "italic", fontWeight: 400 }}>Ihre</em> Strategie.
        </h3>
        <p
          style={{
            fontFamily: sans,
            fontSize: "14px",
            color: C.charcoal,
            lineHeight: 1.7,
            maxWidth: "500px",
            margin: 0,
          }}
        >
          Jede Strategie beginnt mit einer Frage: Was wollen Sie erreichen?
          Lassen Sie uns die Antwort zusammen finden.
        </p>
        <CtaButton
          href="/#contact"
          onClick={(e) => { e.preventDefault(); onContactClick(); }}
        >
          Gespräch vereinbaren
        </CtaButton>
      </div>

      {/* ═══ Footer ═══ */}
      <div
        style={{
          marginTop: "48px",
          padding: "32px 0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          borderTop: `1px solid ${C.line}`,
        }}
      >
        <div style={{ width: "16px", height: "1px", backgroundColor: C.line }} />
        <span
          style={{
            fontFamily: sans,
            fontSize: "8px",
            letterSpacing: "0.16em",
            color: C.muted,
            opacity: 0.6,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Tellian Capital AG &mdash; Est. 1996 &mdash; Zürich
        </span>
      </div>
    </div>
  );
}

/* ─── Reusable FLIP'd title ─── */
function AnlagestrategienFlipTitle({
  id,
  title,
  enableFlip,
  sizeDesktop,
  sizeMobile,
  isMobile,
}: {
  id: string;
  title: string;
  enableFlip: boolean;
  sizeDesktop: string;
  sizeMobile: string;
  isMobile: boolean;
}) {
  const style: React.CSSProperties = {
    fontFamily: serif,
    fontSize: isMobile ? sizeMobile : sizeDesktop,
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
    color: C.dark,
    fontWeight: 400,
    margin: "14px 0 0 0",
    display: "block",
  };

  if (!enableFlip) {
    return <h2 style={style}>{title}</h2>;
  }

  return (
    <motion.h2
      layoutId={`anlagestrategien-headline-${id}`}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: id === "bottomup" ? 0.08 : 0 }}
      style={style}
    >
      {title}
    </motion.h2>
  );
}
