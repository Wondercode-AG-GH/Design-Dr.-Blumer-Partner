import { LAYOUT, getLayout, getTextColumnStyle, SPACING } from "../layout";
import { CtaButton } from "./CtaButton";
import { ScrollFade } from "./ScrollAnimations";
import type { Breakpoint } from "./useBreakpoint";

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — ÜBER TELLIAN CAPITAL
   Desktop: Teil 1 (110vw, text + first portrait as static image)
            followed by Teil 2 (filmstrip of 7 remaining portraits,
            each 28vw wide, 24px gaps, static — revealed by natural
            horizontal page scroll).
   Tablet/Mobile: stacked text + 1- or 2-column team grid.
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#F9F9F7",
  dark: "#1A1916",
  charcoal: "#3A3835",
  stone: "#8A857C",
  muted: "#B0ACA5",
  line: "#D8D5CF",
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Inter', sans-serif";

/* ── Team data ── */
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Dr. Thomas Keller",
    role: "Geschäftsleitung & Gründer",
    bio: "Über 30 Jahre Erfahrung in quantitativer Vermögensverwaltung.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Claudia Meier",
    role: "Chef Anlagestrategie",
    bio: "Leiterin des Anlagekomitees und verantwortlich für die Makroanalyse.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Martin Huber",
    role: "Relationship Manager",
    bio: "Persönliche Mandatsführung für private Anleger seit 2008.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Elena Brunner",
    role: "Compliance & Operations",
    bio: "Verantwortlich für regulatorische Anforderungen und Kundenprozesse.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lukas Widmer",
    role: "Quantitative Analyse",
    bio: "Entwicklung und Pflege der proprietären Anlagemodelle.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah Roth",
    role: "Relationship Managerin",
    bio: "Betreuung institutioneller Mandate und Stiftungsportfolios.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Peter Frei",
    role: "Partner Asset Management",
    bio: "Internationale Anlagestrategien und alternative Anlageklassen.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Anna Zürcher",
    role: "Kundenberatung & Reporting",
    bio: "Konsolidierte Berichterstattung und direkter Kundenkontakt.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
];

const BODY = [
  "Tellian Capital ist eine unabhängige Vermögensverwaltung mit Sitz in Zürich und einem Standort in Balzers, Liechtenstein. Die Firma ist FINMA-lizenziert und verwaltet Vermögen für private und institutionelle Anleger auf Mandatsbasis.",
  "Das Team ist bewusst klein. Jeder Kunde hat einen persönlichen Relationship Manager, der sein Portfolio kennt und seine Anlageziele versteht. Die Entscheidungswege sind kurz. Wer bei Tellian Capital anruft, erreicht die Menschen, die sein Vermögen verwalten.",
  "Die Firma wurde 1996 gegründet — als eine der ersten Schweizer Vermögensverwaltungen mit einem quantitativen Investmentansatz. Damals war datengestützte Analyse in der Branche kaum verbreitet. Tellian Capital hat diesen Ansatz über fast drei Jahrzehnte weiterentwickelt, durch Marktkrisen hindurch und über mehrere regulatorische Umbrüche hinweg.",
  "Das Anlagekomitee bringt verschiedene Perspektiven zusammen: Geschäftsleitung, Chef Anlagestrategie, internationale Partner Asset Manager und Spezialisten für alternative Anlageklassen. Bei Bedarf werden externe Finanzexperten hinzugezogen. Die Breite im Komitee stellt sicher, dass Anlageentscheide nicht aus einer einzelnen Sichtweise entstehen.",
  "Tellian Capital war bis 2026 unter dem Namen Dr. Blumer & Partner bekannt. Der neue Name steht für den Anspruch, mit dem die Firma heute arbeitet: methodisch, unabhängig und mit klarer Überzeugung. Was sich nicht verändert hat, ist die Art, wie wir Kundenbeziehungen verstehen — persönlich, verbindlich und auf lange Sicht angelegt.",
];

/* ═══════════════════════════════════════════════════════════
   PORTRAIT CARD — used in filmstrip (desktop) & grid (vertical)
   ═══════════════════════════════════════════════════════════ */
function PortraitCard({
  member,
  width,
  nameSize = "16px",
  roleSize = "13px",
}: {
  member: TeamMember;
  width: string;
  nameSize?: string;
  roleSize?: string;
}) {
  return (
    <div style={{ width, flexShrink: 0 }}>
      {/* Photo — 3:4 portrait ratio */}
      <div
        className="w-full relative overflow-hidden"
        style={{ paddingBottom: "133.333%" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${member.img})`,
            backgroundPosition: "center top",
            filter: "saturate(0.2) contrast(1.06) brightness(1.02)",
          }}
        />
      </div>

      {/* Name */}
      <div style={{ marginTop: "12px" }}>
        <span
          style={{
            fontFamily: sans,
            fontSize: nameSize,
            fontWeight: 600,
            color: C.dark,
            display: "block",
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </span>
        <span
          style={{
            fontFamily: sans,
            fontSize: roleSize,
            fontWeight: 400,
            color: C.stone,
            display: "block",
            marginTop: "4px",
            lineHeight: 1.3,
          }}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */
export function Section5UeberTellian({
  scrollX,
  isVertical = false,
  breakpoint = "desktop",
}: {
  scrollX?: number;
  isVertical?: boolean;
  breakpoint?: Breakpoint;
}) {
  // scrollX is kept as optional prop for API compatibility but unused
  void scrollX;

  const layout = getLayout(breakpoint);
  const textColStyle = getTextColumnStyle(breakpoint);

  /* ═══ VERTICAL MODE ═══ */
  if (isVertical) {
    return (
      <section
        id="section-ueber-uns"
        style={{ backgroundColor: C.bg }}
      >
        <div style={{ ...textColStyle }}>
          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <span
              style={{
                fontFamily: sans,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: C.stone,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              Über Tellian Capital
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
              Wer hinter den
              <br />
              <em>Entscheiden steht</em>
            </h2>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={20}>
            <div
              style={{
                marginTop: SPACING.headlineToBody,
                maxWidth: layout.bodyMaxWidth,
                display: "flex",
                flexDirection: "column",
                gap: SPACING.bodyParagraphGap,
              }}
            >
              {BODY.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: sans,
                    fontSize: breakpoint === "mobile" ? "13px" : "12px",
                    color: C.charcoal,
                    lineHeight: 1.85,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </ScrollFade>

          <ScrollFade scrollX={0} isVertical yOffset={16}>
            <div style={{ marginTop: SPACING.bodyToCta }}>
              <CtaButton href="#contact">
                Gespräch vereinbaren
              </CtaButton>
            </div>
          </ScrollFade>
        </div>

        {/* Team grid — responsive, each card fades in individually */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: breakpoint === "mobile" ? "1fr" : "1fr 1fr",
            gap: breakpoint === "mobile" ? "24px" : "20px",
            padding: breakpoint === "mobile" ? "32px 20px 48px" : "32px clamp(32px, 6vw, 80px) 48px",
          }}
        >
          {TEAM.map((member) => (
            <ScrollFade key={member.name} scrollX={0} isVertical yOffset={18}>
              <PortraitCard
                member={member}
                width="100%"
                nameSize="14px"
                roleSize="12px"
              />
            </ScrollFade>
          ))}
        </div>
      </section>
    );
  }

  /* ═══ DESKTOP MODE ═══
     Single container: text column (absolute, 56vw) + filmstrip of all 8
     portraits (flex row, 28vw each, 24px gaps). Text sits on top of the
     first ~56vw of the filmstrip via matching bg color.
     Layout width: paddingLeft(60vw) + 8×28vw + 7×24px ≈ 284vw + 168px.
  ══════════════════════════════════════════════════════════ */
  return (
    <div
      className="flex-shrink-0 h-screen relative flex items-center"
      style={{
        paddingLeft: "calc(56vw + 4vw)",
        gap: "24px",
        backgroundColor: C.bg,
      }}
    >
      {/* Text column — absolute, covers leftmost 56vw (first portrait starts at 60vw) */}
      <div
        className="absolute z-10 top-0 left-0 h-full flex flex-col"
        style={{
          width:         LAYOUT.columnWidth,
          paddingLeft:   LAYOUT.paddingLeft,
          paddingRight:  LAYOUT.paddingRight,
          paddingTop:    LAYOUT.paddingTop,
          paddingBottom: LAYOUT.paddingBottom,
          backgroundColor: C.bg,
        }}
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
          Über Tellian Capital
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
            fontSize: "clamp(36px, 5vh, 60px)",
            lineHeight: 0.94,
            color: C.dark,
            letterSpacing: "-0.03em",
            marginTop: SPACING.accentToHeadline,
          }}
        >
          Wer hinter den
          <br />
          <em>Entscheiden steht</em>
        </h2>

        <div
          style={{
            marginTop: SPACING.headlineToBody,
            maxWidth: LAYOUT.bodyMaxWidth,
            display: "flex",
            flexDirection: "column",
            gap: SPACING.bodyParagraphGap,
            flex: 1,
            minHeight: 0,
          }}
        >
          {BODY.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: sans,
                fontSize: "clamp(10.5px, 1.3vh, 12px)",
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
          <CtaButton href="#contact">
            Gespräch vereinbaren
          </CtaButton>
        </div>
      </div>

      {/* Filmstrip — all 8 portraits, equal spacing */}
      {TEAM.map((member) => (
        <PortraitCard
          key={member.name}
          member={member}
          width="28vw"
        />
      ))}
    </div>
  );
}
