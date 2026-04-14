import type { CSSProperties } from "react";

const sans = "'Inter', sans-serif";

const C = {
  dark: "#1A1916",
  charcoal: "#3A3835",
  line: "#D8D5CF",
  bg: "#F9F9F7",
};

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  /** Arrow indicator (default true) */
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Swiss-luxury ghost button — refined border, subtle fill on hover.
 * Used consistently across all sections for prominent CTAs.
 */
export function CtaButton({
  href,
  children,
  arrow = true,
  className = "",
  style,
  onClick,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      onClick={
        onClick ??
        ((e) => {
          e.preventDefault();
        })
      }
      className={`
        group inline-flex items-center gap-3
        uppercase tracking-[0.16em]
        border border-[#D8D5CF]
        rounded-none
        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        hover:bg-[#1A1916] hover:text-[#F9F9F7] hover:border-[#1A1916]
        active:scale-[0.98]
        px-6 py-3 md:px-8 md:py-4
        text-[10px] md:text-[11px]
        ${className}
      `}
      style={{
        fontFamily: sans,
        color: C.dark,
        letterSpacing: "0.16em",
        lineHeight: 1,
        ...style,
      }}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className="
            inline-block transition-transform duration-500
            group-hover:translate-x-1
          "
          aria-hidden
        >
          →
        </span>
      )}
    </a>
  );
}
