# Design-System-Inventur — Tellian Capital

> Erstellt: 2026-04-22

---

## Schritt 1.1 — Durchgefuehrt (2026-04-22)

### Was geaendert wurde

**Neue Dateien:**
- `src/styles/motion.ts` — Easing-Kurven (`EASE.standard`, `.in`, `.nav`) + Timings als CSS-Strings und Framer-Motion-Arrays
- `src/app/tokens.ts` — Farb-Konstanten (`C`) + Font-Families (`serif`, `sans`) als TypeScript-Bruecke zu `theme.css`

**theme.css erweitert:**
- 12 `--tellian-*` Custom Properties in `:root` (Farben)
- 12 `--color-tellian-*` Mappings in `@theme inline` (Tailwind-Utilities)
- 2 `--tellian-font-*` Properties mit `/* REBRAND: pending */`
- 2 `--font-tellian-*` Mappings mit `/* REBRAND: pending */`

**19 Component-Dateien migriert:**
- Lokale `const C = {...}` Bloecke entfernt (15+ Dateien)
- Lokale `const serif/sans` entfernt (15+ Dateien)
- Lokale Easing-Konstanten entfernt und durch `EASE.*` ersetzt (8 Dateien)
- Section6Kontakt: 12 Property-Umbenennungen (`bgPrimary→bg`, `textPrimary→dark`, etc.)
- Section4CoreSatellite + TopDownBottomUp: 18 Inline-Hex-Werte durch `C.*` ersetzt
- DotNavigation: `COLOR`-Objekt aufgeloest → `C.dotInactive/dotActive/stone/charcoal`
- Navigation: ~30 Inline-Hex-Werte (`#1a1a1a` → `C.dark`, `#989071` → `C.warm`, `#F2F1EC` → `C.bgSecondary`)

**25 Tailwind-Arbitrary-Klassen ersetzt:**
- `hover:bg-[#3A3835]` → `hover:bg-tellian-charcoal`
- `placeholder:text-[#B0ACA5]` → `placeholder:text-tellian-muted`
- `focus:border-[#1A1916]` → `focus:border-tellian-dark`
- `hover:text-[#1A1916]` → `hover:text-tellian-dark`
- `border-[#D8D5CF]` → `border-tellian-line`
- `hover:border-[#1A1916]` → `hover:border-tellian-dark`
- `hover:bg-[#F2F1EC]` → `hover:bg-tellian-bg-secondary`
- `focus:border-[#8A857C]` → `focus:border-tellian-stone`

### Was bewusst nicht migriert wurde

- **Weiss-Werte** (`#ffffff`, `#FFFFFF`) — generische Farbe, kein Tellian-Token
- **Inaktiv-Grau** (`#bbb`, `#999`) — Navigation-spezifische UI-Farben ohne Token-Aequivalent
- **Border-Grau** (`#ddd`) — subtile Trenner in Navigation, kein Token
- **Mapbox-Kartenfarben** (`#D5DDD8`, `#E4E8E0`, `#DCD8D0`) — Karten-Theming in `MAP_COLORS`-Objekt isoliert
- **shadcn/ui Komponenten** — out-of-scope
- **Neue Tokens** — nur bestehende konsolidiert

### Drift-Risiken

| Risiko | Massnahme |
|---|---|
| `tokens.ts` driftet von `theme.css` | SYNC-Header-Kommentar dokumentiert die Abhaengigkeit. Langfristig: Inline-Styles durch Tailwind-Klassen ersetzen, dann tokens.ts entfaellt. |
| Neue Komponente definiert lokale Farben | Code-Review pruefen: keine `const C = {...}` in Components, immer Import aus `tokens.ts`. |
| Navigation hat `#bbb`/`#999`/`#ddd` ohne Token | Akzeptiert — bei Bedarf spaeter tokenisieren. Kein Blocker fuer Portal. |
| `#1a1a1a` (Navigation) vs `#1A1916` (tokens) | Normalisiert auf `C.dark` (#1A1916). Visueller Unterschied (RGB 26,26,26 vs 26,25,22) nicht wahrnehmbar. |
