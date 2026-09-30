"use client";

import type { ReactNode } from "react";
import { useStep } from "@/components/steps";
import { IkonI, type IkonNavn } from "./ikoner";

/*
 * Små byggeklosser for SVG-figurene: ramme, steg-avdekking, noder og piler.
 * Tynne burgunder-streker, kremfyll, teal for plattformen, rødt som aksent.
 */

export const STREK = "var(--burgundy)";
export const KREM = "var(--cream)";
export const TEAL = "var(--teal)";
export const MINT = "var(--mint)";
export const ROD = "var(--red)";
export const RODDYP = "var(--red-deep)";
export const ROSA = "#FBE3E0";
export const DUS = "#9a5068";
export const SANS = "var(--font-sans)";
export const MONO =
  'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export function Ramme({
  w,
  h,
  label,
  children,
}: {
  w: number;
  h: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

/** Viser barna først når klikk-steget `at` er nådd */
export function Vis({ at, children }: { at: number; children: ReactNode }) {
  const step = useStep();
  return (
    <g
      style={{
        opacity: step >= at ? 1 : 0,
        transition: "opacity 260ms ease",
      }}
    >
      {children}
    </g>
  );
}

export type Tone = "hvit" | "teal" | "rod" | "svak";

const FYLL: Record<Tone, string> = {
  hvit: "#fff",
  teal: "#E3F7F4",
  rod: ROSA,
  svak: KREM,
};
const LINJE: Record<Tone, string> = {
  hvit: STREK,
  teal: TEAL,
  rod: RODDYP,
  svak: DUS,
};

/** Boks med etikett, valgfritt ikon og valgfri «Kari er her»-prikk */
export function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  ikon,
  tone = "hvit",
  kari = false,
  size = 17,
  mono = false,
  stiplet = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  ikon?: IkonNavn;
  tone?: Tone;
  kari?: boolean;
  size?: number;
  mono?: boolean;
  stiplet?: boolean;
}) {
  const tekstX = ikon ? x + 18 + 26 + 10 : x + w / 2;
  const anchor = ikon ? "start" : "middle";
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={FYLL[tone]}
        stroke={LINJE[tone]}
        strokeWidth={1.8}
        strokeDasharray={stiplet ? "6 5" : undefined}
      />
      {ikon && (
        <IkonI
          navn={ikon}
          x={x + 16}
          y={cy - 13}
          size={26}
          color={LINJE[tone]}
          strokeWidth={1.7}
        />
      )}
      <text
        x={tekstX}
        y={sub ? cy - 3 : cy + size * 0.35}
        textAnchor={anchor}
        fontFamily={mono ? MONO : SANS}
        fontSize={size}
        fontWeight={600}
        fill={STREK}
      >
        {label}
      </text>
      {sub && (
        <text
          x={tekstX}
          y={cy + size * 0.95}
          textAnchor={anchor}
          fontFamily={SANS}
          fontSize={size - 4}
          fill={DUS}
        >
          {sub}
        </text>
      )}
      {kari && (
        <g>
          <circle cx={x + w - 4} cy={y + 4} r={9} fill={ROD} />
          <circle cx={x + w - 4} cy={y + 4} r={3.4} fill="#fff" />
        </g>
      )}
    </g>
  );
}

/** Pil fra (x1,y1) til (x2,y2) med liten pilspiss */
export function Pil({
  x1,
  y1,
  x2,
  y2,
  farge = STREK,
  stiplet = false,
  tykkelse = 1.8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  farge?: string;
  stiplet?: boolean;
  tykkelse?: number;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = 10;
  const p1 = [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)];
  const p2 = [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)];
  return (
    <g stroke={farge} strokeWidth={tykkelse} strokeLinecap="round" fill="none">
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 2 * Math.cos(a)}
        y2={y2 - 2 * Math.sin(a)}
        strokeDasharray={stiplet ? "6 5" : undefined}
      />
      <path d={`M ${p1[0]} ${p1[1]} L ${x2} ${y2} L ${p2[0]} ${p2[1]}`} />
    </g>
  );
}

/** Fri etikett */
export function Tekst({
  x,
  y,
  children,
  size = 15,
  farge = STREK,
  anchor = "start",
  vekt = 400,
  mono = false,
  spacing,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  farge?: string;
  anchor?: "start" | "middle" | "end";
  vekt?: number;
  mono?: boolean;
  spacing?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={mono ? MONO : SANS}
      fontSize={size}
      fontWeight={vekt}
      fill={farge}
      letterSpacing={spacing}
    >
      {children}
    </text>
  );
}
