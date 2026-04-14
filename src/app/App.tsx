import { Section4CoreSatellite } from "./components/Section4CoreSatellite";
import { Section4TopDownBottomUp } from "./components/Section4TopDownBottomUp";
import { useEffect, useState, useCallback, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { useHorizontalScroll } from "./components/useHorizontalScroll";
import { useBreakpoint } from "./components/useBreakpoint";
import {
  ScrollImage,
  HeroExpandingImage,
  ParallaxText,
  ScrollFade,
} from "./components/ScrollAnimations";
import { DotNavigation } from "./components/DotNavigation";
import { CtaButton } from "./components/CtaButton";
import { Section5UeberTellian } from "./components/Section5UeberTellian";
import { Section6Kontakt } from "./components/Section6Kontakt";
import { HeroVertical } from "./components/HeroVertical";
import { ExpandableBody } from "./components/ExpandableBody";
import { Section2Anlagephilosophie } from "./components/Section2Anlagephilosophie";
import { Section3Timeline } from "./components/Section3Timeline";
import { LAYOUT, TEXT_COLUMN_STYLE, getLayout, getTextColumnStyle, SPACING } from "./layout";
import heroImg from "figma:asset/f68e696a94d5501be4f500478f5085490ea6351a.png";
import strategyImg from "figma:asset/868d6afdf0335422ce32d497da0c82ae30b6012c.png";
import notebookImg from "figma:asset/29fb6897d14923649548800503cc773b55cb5083.png";
import teamPhotoImg from "figma:asset/b4ed6cb147950f15472091157e857a2d7f1ce0e8.png";
import philosophyImg from "figma:asset/a44e63e47eecf6c5811f4525d593bd929e31be63.png";

/* ═════════════════════════════════════════════════════════
   LIGHT MODE — SWISS LUXURY PALETTE
   ════════════════════════════════════════════════════════ */
const C = {
  bg: "#F9F9F7",
  dark: "#1A1916",
  charcoal: "#3A3835",
  stone: "#8A857C",
  muted: "#B0ACA5",
  line: "#D8D5CF",
  accent: "#6B665E",
  subtle: "#E8E6E1",
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Inter', sans-serif";

/* ═══════════════════════════════════════════════════════════
   SWISS IMAGERY
   ═══════════════════════════════════════════════════════════ */
const IMG = {
  hero: heroImg,
  alps: "https://images.unsplash.com/photo-1588231055738-da5e3a717644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbiUyMGZvZyUyMGRhd24lMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzczNjk2OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  forest:
    "https://images.unsplash.com/photo-1627314827715-204d1002dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGZvcmVzdCUyMG1pc3R5JTIwbW9ybmluZyUyMHBpbmUlMjB0cmVlc3xlbnwxfHx8fDE3NzM2NTc0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  lake: "https://images.unsplash.com/photo-1682244097336-673f4db39c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwc3dpc3MlMjBsYWtlJTIwcmVmbGVjdGlvbiUyMG1vdW50YWlucyUyMG1pc3R8ZW58MXx8fHwxNzczNjU3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  zurich:
    "https://images.unsplash.com/photo-1661506743970-79ff97200aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6dXJpY2glMjBvbGQlMjB0b3duJTIwc3RvbmUlMjBhcmNoaXRlY3R1cmUlMjBtb3JuaW5nfGVufDF8fHx8MTc3MzY1NzQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bridge: strategyImg,
  teamPhoto: teamPhotoImg,
  alpine:
    "https://images.unsplash.com/photo-1706997185842-d45feced14d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMG1vdW50YWluJTIwcGFub3JhbWElMjBjYWxtJTIwbW9ybmluZyUyMGxpZ2h0fGVufDF8fHx8MTc3MzY3NjI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  strategy:
    "https://images.unsplash.com/photo-1716124095942-c6ff3ad0541c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBTd2lzcyUyMGFyY2hpdGVjdHVyZSUyMHN0b25lJTIwZ2xhc3MlMjBtaW5pbWFsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczNzMzODU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  notebook: notebookImg,
};

/* ═════════════════════════════════════════════════════════
   PRELOAD SCREEN
   ═══════════════════════════════════════════════════════════ */
function PreloadScreen({ onComplete }: { onComplete: () => void }) {
  const [textVisible, setTextVisible] = useState(false);
  const [sliding,     setSliding]     = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 500);
    const t2 = setTimeout(() => setSliding(true),     2700);
    const t3 = setTimeout(() => onComplete(),         3500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "#989071" }}
      animate={{ y: sliding ? "-100%" : "0%" }}
      transition={
        sliding
          ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      <span
        style={{
          fontFamily: sans,
          fontSize: "clamp(32px, 8vw, 60px)",
          letterSpacing: "5px",
          color: "#FFFFFF",
          opacity: textVisible ? 1 : 0,
          transition: textVisible ? "opacity 0.6s ease-out" : "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontWeight: 700 }}>TELLIAN</span>
        {" "}
        <span style={{ fontWeight: 400 }}>CAPITAL</span>
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM — minimalist line inputs
   ═══════════════════════════════════════════════════════════ */
function ContactForm({ scrollX, isVertical = false }: { scrollX: number; isVertical?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: sans,
    color: C.dark,
    backgroundColor: "transparent",
    borderBottom: `1px solid ${C.line}`,
    outline: "none",
    padding: "12px 0 10px 0",
    width: "100%",
    transition: "border-color 0.4s ease",
  };

  return (
    <div className="w-full max-w-[380px]">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                ...inputStyle,
                fontSize: "12px",
                letterSpacing: "0.04em",
              }}
              className="placeholder:text-[#B0ACA5] focus:border-[#8A857C]"
            />
            <input
              type="email"
              placeholder="E-Mail"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{
                ...inputStyle,
                fontSize: "12px",
                letterSpacing: "0.04em",
              }}
              className="placeholder:text-[#B0ACA5] focus:border-[#8A857C]"
            />
            <textarea
              placeholder="Ihre Nachricht"
              required
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              style={{
                ...inputStyle,
                fontSize: "12px",
                letterSpacing: "0.04em",
                resize: "none",
              }}
              className="placeholder:text-[#B0ACA5] focus:border-[#8A857C]"
            />
            <CtaButton href="#" onClick={(e) => { e.preventDefault(); handleSubmit(e as any); }}>
              Anfrage senden
            </CtaButton>
          </motion.form>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="flex flex-col items-start"
          >
            <span
              style={{
                fontFamily: serif,
                color: C.dark,
                lineHeight: 1.15,
              }}
              className="text-[clamp(1.4rem,2.5vw,2.2rem)] tracking-[-0.015em]"
            >
              Vielen Dank.
            </span>
            <span
              style={{
                fontFamily: sans,
                color: C.charcoal,
                lineHeight: 1.8,
              }}
              className="text-[11px] mt-5 max-w-[300px]"
            >
              Wir melden uns innerhalb von zwei Arbeitstagen bei Ihnen.
              Wenn Sie vorher Fragen haben, erreichen Sie uns unter
              +41 44 224 40 24.
            </span>
            <div
              className="w-8 h-[1px] mt-8"
              style={{ backgroundColor: C.line }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — VERMÖGENSVERWALTUNG
   ══════════════════════════════════════════════════════════ */
function Section3Vermoegensverwaltung({ scrollX, isVertical = false, breakpoint = "desktop" as const }: { scrollX: number; isVertical?: boolean; breakpoint?: "mobile" | "tablet" | "desktop" }) {
  const layout = getLayout(breakpoint);
  const textColStyle = getTextColumnStyle(breakpoint);

  const bodyParagraphs = [
    "Tellian Capital verwaltet Vermögen auf Mandatsbasis. Das bedeutet: Sie erteilen uns eine Verwaltungsvollmacht, Ihr Vermögen bleibt auf Ihrem eigenen Depot bei einer Kooperationsbank. Wir treffen die Anlageentscheide — Sie behalten die Kontrolle über Ihre Bankbeziehung.",
    "Jeder Kunde erhält ein eigenes Portfolio. Keine Modellportfolios, keine Standardallokation. Die Zusammenstellung richtet sich nach Ihren Zielen, Ihrer Risikotoleranz und Ihrer finanziellen Gesamtsituation.",
    "Der Weg zum Portfolio folgt einem klaren Ablauf: Zuerst definieren wir gemeinsam Ihre Anlageziele. Dann prüfen wir Risikotoleranz und Eignung. Auf dieser Basis filtern wir das Investmentuniversum, bestimmen die Vermögensallokation und bauen Ihr Portfolio auf. Danach beginnt die aktive Verwaltung.",
    "Anlageentscheide trifft nicht eine einzelne Person. Das Anlagekomitee von Tellian Capital tagt monatlich und vereint Geschäftsleitung, Chef Anlagestrategie, internationale Partner Asset Manager und Experten für alternative Anlageklassen. Bei ausserordentlichen Marktentwicklungen tagt das Komitee kurzfristig. Entschieden wird mit einfachem Mehr.",
    "Die Portfolios folgen einer Core-/Satelliten-Struktur. Der Kern besteht aus Positionen mit einem Anlagehorizont von drei bis fünf Jahren. Der Satellitenanteil nutzt kurzfristige Marktchancen und taktische Opportunitäten. Die Gewichtung zwischen beiden wird vom Anlagekomitee festgelegt.",
    "Ihr Portfolio wird laufend überwacht. Definierte Verlustschwellen, aktive Kontrolle der Anlegerprofile und ein klarer Prozess für Gewinnmitnahmen sind Teil der Verwaltung. Die Berichterstattung erfolgt vierteljährlich — automatisch, konsolidiert und bei Bedarf mit kundenspezifischen Zusatzauswertungen.",
  ];

  if (isVertical) {
    return (
      <section
        id="section-vermoegensverwaltung"
        style={{ backgroundColor: C.bg }}
      >
        {/* Timeline visual on top for vertical — auto height on mobile */}
        <div style={{
          width: "100%",
          height: breakpoint === "mobile" ? "auto" : "60vh",
          padding: breakpoint === "mobile" ? "32px 16px" : undefined,
          position: "relative",
        }}>
          <Section3Timeline scrollX={0} isVertical />
        </div>

        <div style={{ ...textColStyle }}>
          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <span
              style={{
                fontFamily: sans,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: C.stone,
                display: "block",
              }}
              className="uppercase"
            >
              Vermögensverwaltung
            </span>

            <div
              style={{
                width: "32px",
                height: "1.5px",
                backgroundColor: C.dark,
                marginTop: SPACING.eyebrowToAccent,
              }}
            />
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={24}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: breakpoint === "mobile" ? "clamp(36px, 10vw, 48px)" : "clamp(48px, 6vw, 68px)",
                lineHeight: 0.94,
                color: C.dark,
                letterSpacing: "-0.03em",
                marginTop: SPACING.accentToHeadline,
              }}
            >
              Ihr Vermögen.
              <br />
              Ihr Konto.
              <br />
              <em>Unsere Verantwortung.</em>
            </h2>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={20}>
            <div style={{ marginTop: SPACING.headlineToBody }}>
              <ExpandableBody
                paragraphs={bodyParagraphs}
                visibleCount={1}
                fontSize={breakpoint === "mobile" ? "14px" : "13px"}
                lineHeight={1.7}
                gap="14px"
                maxWidth={layout.bodyMaxWidth}
              />
            </div>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <div style={{ marginTop: SPACING.bodyToCta, paddingBottom: "48px" }}>
              <CtaButton href="/portfoliomanagement">
                Mehr zum Anlageprozess
              </CtaButton>
            </div>
          </ScrollFade>
        </div>
      </section>
    );
  }

  /* ── Desktop (horizontal) ── */
  return (
    <div
      className="flex-shrink-0 h-screen relative"
      style={{ width: layout.sectionWidth, backgroundColor: C.bg }}
    >
      <Section3Timeline scrollX={scrollX} />

      <div
        className="relative z-10 h-full flex flex-col"
        style={{ ...textColStyle }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: C.stone,
            display: "block",
          }}
          className="uppercase"
        >
          Vermögensverwaltung
        </span>

        <div
          style={{
            width: "28px",
            height: "1.5px",
            backgroundColor: C.dark,
            marginTop: SPACING.eyebrowToAccent,
          }}
        />

        <h2
          style={{
            fontFamily: serif,
            fontSize: "clamp(40px, 5.5vh, 64px)",
            lineHeight: 0.94,
            color: C.dark,
            letterSpacing: "-0.03em",
            marginTop: SPACING.accentToHeadline,
          }}
        >
          Ihr Vermögen.
          <br />
          Ihr Konto.
          <br />
          <em>Unsere Verantwortung.</em>
        </h2>

        <div
          style={{
            marginTop: SPACING.headlineToBody,
            maxWidth: layout.bodyMaxWidth,
            display: "flex",
            flexDirection: "column",
            gap: SPACING.bodyParagraphGap,
            flex: 1,
            minHeight: 0,
          }}
        >
          {bodyParagraphs.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: sans,
                fontSize: "clamp(10.5px, 1.3vh, 12.5px)",
                color: C.charcoal,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <div style={{ marginTop: SPACING.bodyToCta, flexShrink: 0 }}>
          <CtaButton href="/portfoliomanagement">
            Mehr zum Anlageprozess
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — ANLAGESTRATEGIEN
   ═════════════════════════════════════════════════════════ */
function Section4Anlagestrategien({ scrollX, isVertical = false, breakpoint = "desktop" as const }: { scrollX: number; isVertical?: boolean; breakpoint?: "mobile" | "tablet" | "desktop" }) {
  const layout = getLayout(breakpoint);
  const textColStyle = getTextColumnStyle(breakpoint);

  const bodyParagraphs = [
    "Der Investmentansatz von Tellian Capital verbindet zwei Analyseperspektiven: eine Top-Down-Betrachtung der globalen Finanzmärkte und eine Bottom-Up-Selektion einzelner Anlagen. Beide stützen sich auf quantitative Modelle und eigene Datenanalyse.",
    "Die strategische Vermögensallokation bildet den Kern. Sie basiert auf Makroindikatoren, einer systematischen Bewertung von Anlageklassen und einem Anlagehorizont von drei bis fünf Jahren. Ziel ist eine Portfoliostruktur, die langfristig trägt — nicht eine, die auf kurzfristige Marktbewegungen reagiert.",
    "Die taktische Allokation ergänzt diesen Kern. Hier nutzt das Anlagekomitee kurzfristige Trends, technische Analyse und Erkenntnisse aus der Marktpsychologie, um Opportunitäten zu identifizieren. Die Gewichtung zwischen strategischem Kern und taktischen Positionen wird laufend vom Komitee gesteuert.",
    "Tellian Capital investiert über Anlageklassen hinweg. Aktien, Anleihen, alternative Anlagen — die Auswahl richtet sich nach der Analyse, nicht nach Produktkategorien. Wo die Daten eine Position stützen, handeln wir. Wo nicht, halten wir Liquidität. Das schliesst auch Absicherungsstrategien und den gezielten Einsatz von Instrumenten ein, die in konventionellen Mandaten selten Platz finden.",
    "Auf Basis der eigenen quantitativen Analyse bietet Tellian Capital zusätzlich ausgewählte Investmentfonds an. Diese Strategien richten sich an Anleger, die von der Methodik profitieren wollen, ohne ein individuelles Mandat zu führen.",
  ];

  if (isVertical) {
    return (
      <section
        id="section-anlagestrategien"
        style={{ backgroundColor: C.bg }}
      >
        {/* Visual on top — natural height on mobile so content never clips */}
        <div style={{
          width: "100%",
          height: breakpoint === "mobile" ? "auto" : "60vh",
          padding: breakpoint === "mobile" ? "32px 16px" : undefined,
          position: "relative",
        }}>
          <Section4TopDownBottomUp scrollX={0} isVertical />
        </div>

        <div style={{ ...textColStyle }}>
          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <span
              style={{
                fontFamily: sans,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: C.stone,
                display: "block",
              }}
              className="uppercase"
            >
              Anlagestrategien
            </span>

            <div
              style={{
                width: "32px",
                height: "1.5px",
                backgroundColor: C.dark,
                marginTop: SPACING.eyebrowToAccent,
              }}
            />
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={24}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: breakpoint === "mobile" ? "clamp(36px, 10vw, 48px)" : "clamp(48px, 6vw, 68px)",
                lineHeight: 0.94,
                color: C.dark,
                letterSpacing: "-0.03em",
                marginTop: SPACING.accentToHeadline,
              }}
            >
              Strategie statt
              <br />
              <em>Spekulation.</em>
            </h2>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={20}>
            <div style={{ marginTop: SPACING.headlineToBody }}>
              <ExpandableBody
                paragraphs={bodyParagraphs}
                visibleCount={1}
                fontSize={breakpoint === "mobile" ? "14px" : "13px"}
                lineHeight={1.7}
                gap="14px"
                maxWidth={layout.bodyMaxWidth}
              />
            </div>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <div style={{ marginTop: SPACING.bodyToCta, paddingBottom: "48px" }}>
              <CtaButton href="/strategies">
                Strategien im Detail
              </CtaButton>
            </div>
          </ScrollFade>
        </div>
      </section>
    );
  }

  /* Desktop */
  return (
    <div
      className="flex-shrink-0 h-screen relative"
      style={{ width: layout.sectionWidth, backgroundColor: C.bg }}
    >
      <Section4TopDownBottomUp scrollX={scrollX} />

      <div
        className="relative z-10 h-full flex flex-col"
        style={{ ...textColStyle }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: C.stone,
            display: "block",
          }}
          className="uppercase"
        >
          Anlagestrategien
        </span>

        <div
          style={{
            width: "28px",
            height: "1.5px",
            backgroundColor: C.dark,
            marginTop: SPACING.eyebrowToAccent,
          }}
        />

        <h2
          style={{
            fontFamily: serif,
            fontSize: "clamp(40px, 5.5vh, 64px)",
            lineHeight: 0.94,
            color: C.dark,
            letterSpacing: "-0.03em",
            marginTop: SPACING.accentToHeadline,
          }}
        >
          Strategie statt
          <br />
          <em>Spekulation.</em>
        </h2>

        <div
          style={{
            marginTop: SPACING.headlineToBody,
            maxWidth: layout.bodyMaxWidth,
            display: "flex",
            flexDirection: "column",
            gap: SPACING.bodyParagraphGap,
            flex: 1,
            minHeight: 0,
          }}
        >
          {bodyParagraphs.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: sans,
                fontSize: "clamp(10.5px, 1.3vh, 12.5px)",
                color: C.charcoal,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <div style={{ marginTop: SPACING.bodyToCta, flexShrink: 0 }}>
          <CtaButton href="/strategies">
            Strategien im Detail
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const { breakpoint, isMobile, isTablet, isDesktop, isVertical } = useBreakpoint();
  const layout = getLayout(breakpoint);
  const textColStyle = getTextColumnStyle(breakpoint);

  const { containerRef, scrollProgress, scrollX, scrollTo, scrollDirection, scrollLockRef, targetScroll, currentScroll } =
    useHorizontalScroll({ disabled: isVertical });
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const navigateToContact = useCallback(() => {
    if (isVertical) {
      const el = document.getElementById("section-kontakt");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollTo(0.88);
    }
  }, [isVertical, scrollTo]);

  /* ═══════════════════════════════════════════════════════
     VERTICAL LAYOUT (Tablet + Mobile)
     ═══════════════════════════════════════════════════════ */
  if (isVertical) {
    return (
      <div
        className="min-h-screen w-full cursor-default"
        style={{ backgroundColor: C.bg }}
      >
        {!introComplete && (
          <PreloadScreen onComplete={handleIntroComplete} />
        )}

        <Navigation
          scrollProgress={scrollProgress}
          scrollDirection={scrollDirection}
          onNavigate={scrollTo}
          introComplete={introComplete}
          breakpoint={breakpoint}
          isVertical
        />

        {/* ── HERO (mobile/tablet — page-load stagger animation) ── */}
        <HeroVertical
          imageSrc={IMG.hero}
          introComplete={introComplete}
          breakpoint={breakpoint}
          onCtaClick={navigateToContact}
        />

        {/* ── ANLAGEPHILOSOPHIE ── */}
        <Section2Anlagephilosophie scrollX={0} isVertical breakpoint={breakpoint} />

        {/* ── VERMÖGENSVERWALTUNG ── */}
        <Section3Vermoegensverwaltung scrollX={0} isVertical breakpoint={breakpoint} />

        {/* ── ANLAGESTRATEGIEN ── */}
        <Section4Anlagestrategien scrollX={0} isVertical breakpoint={breakpoint} />

        {/* ── ÜBER TELLIAN ── */}
        <Section5UeberTellian
          isVertical
          breakpoint={breakpoint}
        />

        {/* ── KONTAKT (mobile/tablet — 5-field form, MapOverlay trigger) ── */}
        <Section6Kontakt isVertical breakpoint={breakpoint} />
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     DESKTOP — HORIZONTAL LAYOUT (unchanged logic)
     ═══════════════════════════════════════════════════════ */
  return (
    <div
      className="h-screen w-screen overflow-hidden cursor-default"
      style={{ backgroundColor: C.bg }}
    >
      {!introComplete && (
        <PreloadScreen onComplete={handleIntroComplete} />
      )}

      <Navigation
        scrollProgress={scrollProgress}
        scrollDirection={scrollDirection}
        onNavigate={scrollTo}
        introComplete={introComplete}
        breakpoint={breakpoint}
        isVertical={false}
      />

      {introComplete && (
        <DotNavigation
          scrollProgress={scrollProgress}
          onNavigate={scrollTo}
        />
      )}

      {/* ── Horizontal Scroll Strip ── */}
      <div
        ref={containerRef}
        className="flex h-screen overflow-x-scroll overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        {/* CHAPTER 1 — HERO */}
        <div
          className="flex-shrink-0 h-screen relative"
          style={{ width: layout.heroWidth, backgroundColor: C.bg }}
        >
          <div
            className="absolute z-0"
            style={{ top: 0, bottom: 0, left: layout.imageLeft, right: 0 }}
          >
            <HeroExpandingImage
              src={IMG.hero}
              scrollX={scrollX}
              className="w-full h-full"
            />
          </div>

          <div
            className="relative z-10 h-full flex flex-col"
            style={{ ...textColStyle }}
          >
            <div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: "clamp(10px, 1.4vh, 14px)",
                  letterSpacing: "0.15em",
                  color: C.stone,
                  display: "block",
                }}
                className="uppercase"
              >
                UNABHÄNGIGE VERMÖGENSVERWALTUNG · ZÜRICH · SEIT 1996
              </span>

              <div
                style={{
                  width: "32px",
                  height: "1.5px",
                  backgroundColor: C.dark,
                  marginTop: SPACING.eyebrowToAccent,
                }}
              />

              <h1
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(72px, 12vh, 128px)",
                  lineHeight: 0.93,
                  color: C.dark,
                  letterSpacing: "-0.03em",
                  marginTop: SPACING.accentToHeadline,
                  maxWidth: "340px",
                  fontWeight: 400,
                }}
              >
                Vermögen
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400 }}>mit Methode</em>
              </h1>
            </div>

            <div style={{ flex: 1, minHeight: "clamp(40px, 5vh, 100px)" }} />

            <div>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: "clamp(11px, 1.3vh, 12px)",
                  color: C.charcoal,
                  lineHeight: 1.8,
                  maxWidth: "520px",
                }}
              >
                Tellian Capital ist eine FINMA-lizenzierte Vermögensverwaltung mit Sitz in Zürich. Wir verwalten Vermögen auf Mandatsbasis — quantitativ gestützt, unabhängig von Bankprodukten und frei von Vertriebsinteressen. Jeder Anlageentscheid folgt einem systematischen Prozess: eigene quantitative Modelle, ein monatlich tagendes Anlagekomitee und eine klare Trennung zwischen Kundeninteresse und Produktvertrieb.
              </p>

              <div style={{ marginTop: SPACING.bodyToCta }}>
                <CtaButton href="#contact" onClick={(e) => { e.preventDefault(); scrollTo(0.88); }}>
                  Gespräch vereinbaren
                </CtaButton>
              </div>

              <div
                className="flex items-center gap-3"
                style={{ marginTop: "12px" }}
              >
                <div
                  style={{ width: "16px", height: "1px", backgroundColor: C.muted }}
                />
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    color: C.stone,
                  }}
                  className="uppercase"
                >
                  FINMA-LIZENZIERT · ZÜRICH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Breathing after Hero */}
        <div
          className="flex-shrink-0 h-screen"
          style={{ width: layout.breathingSpace, backgroundColor: C.bg }}
        />

        {/* CHAPTER 2 — ANLAGEPHILOSOPHIE */}
        <Section2Anlagephilosophie scrollX={scrollX} />

        <div
          className="flex-shrink-0 h-screen"
          style={{ width: layout.breathingSpace, backgroundColor: C.bg }}
        />

        {/* CHAPTER 3 — VERMÖGENSVERWALTUNG */}
        <Section3Vermoegensverwaltung scrollX={scrollX} breakpoint={breakpoint} />

        <div
          className="flex-shrink-0 h-screen"
          style={{ width: layout.breathingSpace, backgroundColor: C.bg }}
        />

        {/* CHAPTER 4 — ANLAGESTRATEGIEN */}
        <Section4Anlagestrategien scrollX={scrollX} breakpoint={breakpoint} />

        <div
          className="flex-shrink-0 h-screen"
          style={{ width: layout.breathingSpace, backgroundColor: C.bg }}
        />

        {/* CHAPTER 5 — ÜBER TELLIAN (Teil 1 + Filmstrip als Fragment) */}
        <Section5UeberTellian />

        <div
          className="flex-shrink-0 h-screen"
          style={{ width: layout.breathingSpace, backgroundColor: C.bg }}
        />

        {/* CHAPTER 6 — KONTAKT (map rendered via overlay, no layout impact) */}
        <Section6Kontakt />
      </div>
    </div>
  );
}
