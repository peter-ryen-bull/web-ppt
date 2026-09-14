"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useStep } from "@/components/steps";

/*
 * Byggeklosser for slides. Alle mål er i piksler på et 1280x720-lerret,
 * hentet direkte ut av PowerPoint-filens XML (EMU / 9525 = px).
 * 1 pt skriftstørrelse i PowerPoint = 1.333 px her.
 */

export const pt = (n: number) => `${(n * 4) / 3}px`;

const SLIDE_W = 1280;
const SLIDE_H = 720;

/**
 * Stil som fader innholdet inn når klikk-steget `at` er nådd. Brukes på
 * elementer som ligger i vanlig flyt, der en wrapper ville brutt layouten.
 * NB: setter `transform` – kombiner manuelt hvis elementet roteres.
 */
export function useRevealStyle(at: number): CSSProperties {
  const step = useStep();
  const shown = step >= at;
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(14px)",
    transition: "opacity 260ms ease, transform 260ms ease",
  };
}

/**
 * Viser innholdet først når klikk-steget `at` er nådd. Wrapperen dekker hele
 * lerretet og er selv posisjonert, slik at absolutt plasserte Box-barn får
 * samme koordinater som om de lå direkte på sliden.
 */
export function Reveal({
  at,
  children,
}: {
  /** Klikk-steget som avslører innholdet. 1 = første Neste-klikk. */
  at: number;
  children?: ReactNode;
}) {
  const step = useStep();
  const shown = step >= at;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: SLIDE_W,
        height: SLIDE_H,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: "opacity 260ms ease, transform 260ms ease",
        pointerEvents: shown ? undefined : "none",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Miles-punkt: 3 px rød strek som strekker seg med teksten. Brukes overalt
 * der sliden har en punktliste, så høyde, avstand og farge er like.
 */
export function BulletItem({
  children,
  at,
  size = 22,
  color = "var(--burgundy-2)",
  bar = "var(--red)",
}: {
  children?: ReactNode;
  /** Klikk-steget som avslører punktet. Utelatt = alltid synlig. */
  at?: number;
  size?: number;
  color?: string;
  bar?: string;
}) {
  const reveal = useRevealStyle(at ?? 0);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 14,
        ...(at != null ? reveal : null),
      }}
    >
      <div
        style={{
          width: 3,
          flexShrink: 0,
          background: bar,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(size),
          lineHeight: 1.3,
          color,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Punktliste i en Box. `fromStep` gjør at punktene dukker opp ett og ett. */
export function BulletList({
  box,
  items,
  fromStep,
  size = 22,
  gap = 28,
  color,
}: {
  box: [number, number, number, number];
  items: ReactNode[];
  fromStep?: number;
  size?: number;
  gap?: number;
  color?: string;
}) {
  return (
    <Box
      box={box}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap,
      }}
    >
      {items.map((item, i) => (
        <BulletItem
          key={typeof item === "string" ? item : i}
          at={fromStep == null ? undefined : fromStep + i}
          size={size}
          color={color}
        >
          {item}
        </BulletItem>
      ))}
    </Box>
  );
}

export function Box({
  box,
  style,
  children,
}: {
  /** [x, y, bredde, høyde] i px på 1280x720-lerretet */
  box: [number, number, number, number];
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const [x, y, w, h] = box;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Miles-logo øverst til høyre (fra layouten de fleste slides bruker) */
export function MilesLogo() {
  return (
    <Box box={[1145.6, 48.6, 95.4, 29.5]}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/miles-logo.svg"
        alt="Miles"
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}

/** Kapittelside: stor Gelica-tittel midt på siden, ev. rød undertittel nederst */
export function ChapterSlide({
  title,
  subtitle,
  titleSize = 65,
  align = "center",
  showLogo = true,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  titleSize?: number;
  align?: "center" | "left";
  showLogo?: boolean;
}) {
  return (
    <>
      {showLogo && <MilesLogo />}
      <Box
        box={[81.5, 226, 1117.1, 268]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(titleSize),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: align,
            width: "100%",
          }}
        >
          {title}
        </div>
      </Box>
      {subtitle && (
        <Box
          box={[160, 508, 960, 80]}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              lineHeight: 1.35,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        </Box>
      )}
    </>
  );
}

/** Liten rød "Pains"-etikett brukt på smerte-slidene */
export function PainsLabel() {
  return (
    <Box box={[77.2, 201.8, 640.5, 48.5]}>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(24),
          color: "var(--red)",
        }}
      >
        Pains
      </span>
    </Box>
  );
}

export function Img({
  box,
  src,
  alt = "",
  fit = "contain",
}: {
  box: [number, number, number, number];
  src: string;
  alt?: string;
  fit?: CSSProperties["objectFit"];
}) {
  return (
    <Box box={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: fit }}
      />
    </Box>
  );
}

/** Video som spiller på live-sliden, ikke i miniatyrer. */
export function Video({
  box,
  src,
  fit = "contain",
}: {
  box: [number, number, number, number];
  src: string;
  fit?: CSSProperties["objectFit"];
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().width >= 400) {
      void el.play();
    }
  }, []);
  return (
    <Box box={box}>
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
