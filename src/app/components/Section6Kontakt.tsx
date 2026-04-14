import { useEffect, useRef, useState, FormEvent } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/* ─── Design tokens ─── */
const C = {
  bgPrimary:      "#F9F9F7",
  bgSecondary:    "#F2F1EC",
  textPrimary:    "#1A1916",
  textSecondary:  "#3A3835",
  textTertiary:   "#8A857C",
  borderTertiary: "#D8D5CF",
  line:           "#D8D5CF",
  muted:          "#B0ACA5",
  warm:           "#989071",
  road:           "#E8E6E1",
  water:          "#D5DDD8",
  green:          "#E4E8E0",
};

const serif = "'Cormorant Garamond', serif";
const sans  = "'Inter', sans-serif";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
const MAP_CENTER: [number, number] = [8.5387, 47.3769];

/* ═══════════════════════════════════════════════════════════
   MAPBOX STYLING HELPERS
   ═══════════════════════════════════════════════════════════ */
function applyStyleAndMarker(map: mapboxgl.Map) {
  const style = map.getStyle();
  if (!style?.layers) return;

  for (const layer of style.layers) {
    const id = layer.id;
    const type = layer.type;
    try {
      if (type === "background") {
        map.setPaintProperty(id, "background-color", C.bgSecondary);
      } else if (type === "fill") {
        if (/water|river|stream|sea|lake/i.test(id)) {
          map.setPaintProperty(id, "fill-color", C.water);
        } else if (/park|wood|grass|vegetation|landuse/i.test(id) && !/building/i.test(id)) {
          map.setPaintProperty(id, "fill-color", C.green);
        } else if (/building/i.test(id)) {
          map.setPaintProperty(id, "fill-color", "#E8E6E1");
          map.setPaintProperty(id, "fill-outline-color", "#DCD8D0");
        } else {
          map.setPaintProperty(id, "fill-color", C.bgSecondary);
        }
      } else if (type === "line") {
        if (/motorway|trunk|primary|main/i.test(id)) {
          map.setPaintProperty(id, "line-color", C.line);
        } else if (/road|street|secondary|tertiary|service|path|pedestrian/i.test(id)) {
          map.setPaintProperty(id, "line-color", C.road);
        } else if (/water|river/i.test(id)) {
          map.setPaintProperty(id, "line-color", C.water);
        } else {
          map.setPaintProperty(id, "line-color", C.road);
        }
      } else if (type === "symbol") {
        if (/poi|transit|airport|shield/i.test(id)) {
          map.setLayoutProperty(id, "visibility", "none");
        } else {
          try {
            map.setPaintProperty(id, "text-color", C.textTertiary);
            map.setPaintProperty(id, "text-halo-color", C.bgSecondary);
            map.setPaintProperty(id, "text-halo-width", 1.2);
          } catch { /* ignore */ }
        }
      }
    } catch { /* unsupported property */ }
  }

  /* Custom marker */
  const el = document.createElement("div");
  el.style.width = "20px";
  el.style.height = "20px";
  el.style.borderRadius = "50%";
  el.style.backgroundColor = "rgba(152, 144, 113, 0.2)";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";

  const dot = document.createElement("div");
  dot.style.width = "12px";
  dot.style.height = "12px";
  dot.style.borderRadius = "50%";
  dot.style.backgroundColor = C.warm;
  el.appendChild(dot);

  new mapboxgl.Marker({ element: el, anchor: "center" })
    .setLngLat(MAP_CENTER)
    .addTo(map);
}

/* ═══════════════════════════════════════════════════════════
   ZURICH MAP
   ═══════════════════════════════════════════════════════════ */
function ZurichMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const el = mapContainer.current;
    if (!el || mapRef.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    let cancelled = false;
    let ro: ResizeObserver | null = null;

    const initWhenReady = () => {
      if (cancelled) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        requestAnimationFrame(initWhenReady);
        return;
      }

      const map = new mapboxgl.Map({
        container: el,
        style: "mapbox://styles/mapbox/light-v11",
        center: MAP_CENTER,
        zoom: 15.5,
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
      });

      mapRef.current = map;
      map.on("load", () => map.resize());
      map.on("style.load", () => applyStyleAndMarker(map));
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

      ro = new ResizeObserver(() => map.resize());
      ro.observe(el);
    };

    initWhenReady();

    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: C.bgSecondary,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   MAP OVERLAY — centered modal via React portal
   ═══════════════════════════════════════════════════════════ */
interface MapOverlayProps {
  open: boolean;
  onClose: () => void;
  /** Element to return focus to after close */
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

function MapOverlay({ open, onClose, returnFocusRef }: MapOverlayProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const [rendered, setRendered] = useState(open);

  /* Keep the overlay mounted during the closing animation */
  useEffect(() => {
    if (open) {
      setRendered(true);
      return;
    }
    // Unmount after close animation finishes (250ms backdrop + 100ms delay = 350ms total)
    const t = setTimeout(() => setRendered(false), 400);
    return () => clearTimeout(t);
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Focus management */
  useEffect(() => {
    if (open) {
      // Wait until close button is visually present (300ms delay + 250ms fade = 550ms)
      const t = setTimeout(() => closeBtnRef.current?.focus(), 550);
      return () => clearTimeout(t);
    } else {
      returnFocusRef.current?.focus();
    }
  }, [open, returnFocusRef]);

  const handleClose = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    onClose();
    setTimeout(() => { isAnimatingRef.current = false; }, 500);
  };

  if (!rendered) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Standort auf Karte"
      className={open ? "tellian-map-overlay open" : "tellian-map-overlay"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        visibility: open ? "visible" : "hidden",
        transition: open
          ? "visibility 0s"
          : "visibility 0s linear 350ms",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          opacity: open ? 1 : 0,
          transition: open
            ? "opacity 350ms ease-out"
            : "opacity 250ms ease-out 100ms",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "680px",
          maxWidth: "90vw",
          height: "480px",
          maxHeight: "80vh",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#E8E4DC",
          transform: open
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.92)",
          opacity: open ? 1 : 0,
          transition: open
            ? "transform 450ms cubic-bezier(0.16, 1, 0.3, 1) 50ms, opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) 50ms"
            : "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Karte schliessen"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "0.5px solid rgba(0, 0, 0, 0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            fontSize: "16px",
            color: "#666",
            fontFamily: sans,
            zIndex: 2,
            opacity: open ? 1 : 0,
            transition: open
              ? "opacity 250ms ease-out 300ms, transform 150ms ease-out"
              : "opacity 100ms ease-out",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          ×
        </button>

        {/* Map area */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#E8E4DC",
          }}
        >
          <ZurichMap />
        </div>

        {/* Address bar */}
        <div
          style={{
            height: "48px",
            backgroundColor: "#1A1A1A",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: sans,
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.45)",
            }}
          >
            Löwenstrasse 1, 8001 Zürich
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT FORM (Card content)
   ═══════════════════════════════════════════════════════════ */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle: React.CSSProperties = {
    fontFamily: sans,
    fontSize: "13px",
    color: C.textPrimary,
    backgroundColor: "transparent",
    border: `0.5px solid ${C.borderTertiary}`,
    borderRadius: "6px",
    padding: "10px 12px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease",
    appearance: "none",
  };

  if (submitted) {
    return (
      <div style={{ padding: "20px 0" }}>
        <span style={{ fontFamily: serif, fontSize: "24px", color: C.textPrimary, display: "block", lineHeight: 1.15 }}>
          Vielen Dank.
        </span>
        <span style={{ fontFamily: sans, fontSize: "12px", color: C.textSecondary, display: "block", marginTop: "12px", lineHeight: 1.6 }}>
          Wir melden uns innerhalb von 24 Stunden.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <input
          type="text" placeholder="Vorname" required
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          style={fieldStyle}
          className="placeholder:text-[#B0ACA5] focus:border-[#1A1916]"
        />
        <input
          type="text" placeholder="Nachname" required
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          style={fieldStyle}
          className="placeholder:text-[#B0ACA5] focus:border-[#1A1916]"
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <input
          type="email" placeholder="E-Mail" required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={fieldStyle}
          className="placeholder:text-[#B0ACA5] focus:border-[#1A1916]"
        />
        <input
          type="tel" placeholder="Telefon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={fieldStyle}
          className="placeholder:text-[#B0ACA5] focus:border-[#1A1916]"
        />
      </div>
      <textarea
        placeholder="Nachricht" required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        style={{ ...fieldStyle, height: "80px", resize: "none" }}
        className="placeholder:text-[#B0ACA5] focus:border-[#1A1916]"
      />
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "6px" }}>
        <button
          type="submit"
          style={{
            fontFamily: sans,
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            backgroundColor: C.textPrimary,
            border: "none",
            borderRadius: "6px",
            padding: "13px 28px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            appearance: "none",
          }}
          className="hover:bg-[#3A3835]"
        >
          Anfrage senden →
        </button>
        <span style={{ fontFamily: sans, fontSize: "10px", color: C.textTertiary }}>
          Antwort innert 24h
        </span>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — KONTAKT
   2 columns: Editorial (left) | Form (right, on bg-secondary)
   Map is rendered via MapOverlay (portal) — does NOT affect layout.
   ═══════════════════════════════════════════════════════════ */
export function Section6Kontakt() {
  const [mapOpen, setMapOpen] = useState(false);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="flex-shrink-0 h-screen flex"
      style={{
        width: "100vw",
        backgroundColor: C.bgPrimary,
      }}
    >
      {/* ═══ COLUMN 1 — Editorial ═══ */}
      <div
        style={{
          width: "36vw",
          minWidth: "380px",
          flexShrink: 0,
          padding: "clamp(36px, 5vh, 80px) clamp(36px, 5vw, 80px) clamp(24px, 3vh, 56px)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: C.bgPrimary,
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontFamily: sans,
            fontSize: "10px",
            letterSpacing: "2.5px",
            color: C.textTertiary,
            display: "block",
            textTransform: "uppercase",
          }}
        >
          Kontakt
        </span>

        {/* Accent line */}
        <div
          style={{
            width: "28px",
            height: "1.5px",
            backgroundColor: C.textPrimary,
            margin: "12px 0",
          }}
        />

        {/* Headline */}
        <h2
          style={{
            fontFamily: serif,
            fontSize: "32px",
            lineHeight: 1.12,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Ein Gespräch ist
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>der Anfang.</em>
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: sans,
            fontSize: "14px",
            color: C.textSecondary,
            lineHeight: 1.6,
            maxWidth: "320px",
            marginTop: "20px",
          }}
        >
          Wenn Sie wissen möchten, ob unsere Arbeitsweise zu Ihren Erwartungen passt, laden wir Sie zu einem unverbindlichen Erstgespräch ein. Persönlich, vertraulich, in unseren Räumen an der Löwenstrasse oder digital.
        </p>

        {/* Bottom block — pushed down */}
        <div style={{ marginTop: "auto", paddingTop: "24px" }}>
          <div
            style={{
              width: "100%",
              height: "0.5px",
              backgroundColor: C.borderTertiary,
              marginBottom: "20px",
            }}
          />

          {/* Company */}
          <span
            style={{
              fontFamily: sans,
              fontSize: "13px",
              fontWeight: 500,
              color: C.textPrimary,
              display: "block",
            }}
          >
            Tellian Capital
          </span>
          <span
            style={{
              fontFamily: sans,
              fontSize: "11px",
              color: C.textTertiary,
              display: "block",
              marginTop: "2px",
            }}
          >
            Vermögensverwaltung Zürich AG
          </span>
          <span
            style={{
              fontFamily: sans,
              fontSize: "11px",
              color: C.textTertiary,
              display: "block",
              marginTop: "4px",
            }}
          >
            Löwenstrasse 1, CH-8001 Zürich
          </span>

          {/* Contact row */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "12px",
            }}
          >
            <a
              href="tel:+41442244024"
              style={{ fontFamily: sans, fontSize: "11px", color: C.textSecondary }}
              className="hover:text-[#1A1916] transition-colors duration-300"
            >
              +41 44 224 40 24
            </a>
            <a
              href="mailto:info@telliancapital.ch"
              style={{ fontFamily: sans, fontSize: "11px", color: C.textSecondary }}
              className="hover:text-[#1A1916] transition-colors duration-300"
            >
              info@telliancapital.ch
            </a>
          </div>
        </div>
      </div>

      {/* ═══ COLUMN 2 — Form (on secondary bg) ═══ */}
      <div
        style={{
          flex: 1,
          minWidth: "460px",
          backgroundColor: C.bgSecondary,
          padding: "clamp(36px, 5vh, 80px) clamp(36px, 4vw, 64px) clamp(24px, 3vh, 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Form card */}
        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            backgroundColor: C.bgPrimary,
            border: `0.5px solid ${C.borderTertiary}`,
            borderRadius: "12px",
            padding: "28px",
          }}
        >
          <span
            style={{
              fontFamily: sans,
              fontSize: "10px",
              letterSpacing: "2px",
              color: C.textTertiary,
              display: "block",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Schreiben Sie uns
          </span>
          <ContactForm />
        </div>

        {/* "Auf Karte anzeigen" — bottom right, triggers overlay */}
        <button
          ref={openBtnRef}
          onClick={() => setMapOpen(true)}
          aria-expanded={mapOpen}
          style={{
            position: "absolute",
            bottom: "clamp(24px, 3vh, 48px)",
            right: "clamp(36px, 4vw, 64px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            fontFamily: sans,
            fontSize: "9px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: C.textTertiary,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.textSecondary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textTertiary)}
        >
          <span
            style={{
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "currentColor",
            }}
            aria-hidden
          />
          Auf Karte anzeigen
        </button>
      </div>

      {/* ═══ OVERLAY — rendered via portal to document.body ═══ */}
      <MapOverlay
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        returnFocusRef={openBtnRef}
      />
    </div>
  );
}
