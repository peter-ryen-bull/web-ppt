import type { CSSProperties, ReactNode } from "react";

/*
 * Felles byggeklosser for små strek-figurer i samme stil som båten på
 * Kystverket-sliden (BaatSignal): tynne burgunder-streker, kremfyll, teal
 * for vann og rødt som eneste aksent. Animasjonene er få, sakte og myke –
 * ingen elementer som flyter langs baner.
 */

export const STREK = "var(--burgundy)";
export const KREM = "var(--cream)";
export const TEAL = "var(--teal)";
export const MINT = "var(--mint)";
export const ROD = "var(--red)";
export const DUS = "#9a5068";

/** Myk fram-og-tilbake-easing (samme som båtens duving) */
export const SPLINES = "0.45 0 0.55 1; 0.45 0 0.55 1";

/** SVG-ramme med strek-stilen satt som standard på alle barn */
export function Figur({
  w,
  h,
  label,
  strokeWidth = 2.5,
  style,
  children,
}: {
  w: number;
  h: number;
  label: string;
  strokeWidth?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      role="img"
      aria-label={label}
    >
      <g
        fill="none"
        stroke={STREK}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

/** Gruppe som duver sakte opp og ned */
export function Duv({
  dy = 4,
  dur = 3.2,
  children,
}: {
  dy?: number;
  dur?: number;
  children: ReactNode;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`0 0; 0 ${-dy}; 0 0`}
        keyTimes="0; 0.5; 1"
        calcMode="spline"
        keySplines={SPLINES}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

/** Gruppe som svinger sakte fram og tilbake rundt et punkt */
export function Sving({
  grader = 4,
  cx,
  cy,
  dur = 4.6,
  children,
}: {
  grader?: number;
  cx: number;
  cy: number;
  dur?: number;
  children: ReactNode;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`${-grader} ${cx} ${cy}; ${grader} ${cx} ${cy}; ${-grader} ${cx} ${cy}`}
        keyTimes="0; 0.5; 1"
        calcMode="spline"
        keySplines={SPLINES}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

/** Gruppe som roterer jevnt rundt et punkt */
export function Roter({
  cx,
  cy,
  dur = 12,
  retning = 1,
  children,
}: {
  cx: number;
  cy: number;
  dur?: number;
  retning?: 1 | -1;
  children: ReactNode;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`0 ${cx} ${cy}`}
        to={`${360 * retning} ${cx} ${cy}`}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

/** Myk puls i opacity – brukes på små aksenter som «lyser» */
export function Puls({
  fra = 0.35,
  til = 1,
  dur = 2.6,
  begin = 0,
}: {
  fra?: number;
  til?: number;
  dur?: number;
  begin?: number;
}) {
  return (
    <animate
      attributeName="opacity"
      values={`${fra}; ${til}; ${fra}`}
      keyTimes="0; 0.5; 1"
      calcMode="spline"
      keySplines={SPLINES}
      dur={`${dur}s`}
      begin={`${begin}s`}
      repeatCount="indefinite"
    />
  );
}

/** Bølgelengde – translate-animasjonene flytter nøyaktig én lengde for sømløs loop */
export const BLG = 64;

/** Sinuslignende bølgelinje fra utenfor venstre kant til forbi høyre kant */
export function bolgelinje(y: number, amp: number, w: number) {
  const halvbolger = Math.ceil((w + 2 * BLG) / (BLG / 2));
  let d = `M ${-BLG} ${y} q ${BLG / 4} ${-amp} ${BLG / 2} 0`;
  for (let i = 1; i < halvbolger; i++) d += ` t ${BLG / 2} 0`;
  return d;
}

/**
 * Bølger i to lag: en dus bakre linje og en fremre linje fylt med krem, så
 * alt som står «i vannet» skjules under vannlinjen.
 */
export function Bolger({
  y,
  w,
  h,
  amp = 12,
  dur = 8,
}: {
  /** Vannlinjen (fremre bølge) */
  y: number;
  w: number;
  /** Total høyde på figuren, så fyllet dekker helt ned */
  h: number;
  amp?: number;
  dur?: number;
}) {
  return (
    <>
      <path
        d={bolgelinje(y - 14, -amp * 0.8, w)}
        stroke={TEAL}
        strokeWidth={2}
        opacity={0.35}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${-BLG} 0`}
          dur={`${dur * 1.6}s`}
          repeatCount="indefinite"
        />
      </path>
      <path
        d={`${bolgelinje(y, amp, w)} V ${h + 2} H ${-BLG} Z`}
        fill={KREM}
        stroke={TEAL}
        strokeWidth={2.5}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${-BLG} 0`}
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
      </path>
    </>
  );
}

/** Signalbuer som pulserer ut fra et punkt, åpner i retning `rot` grader (0 = opp) */
export function Signal({
  x,
  y,
  rot = 0,
  radier = [10, 17, 24],
  dur = 2.8,
}: {
  x: number;
  y: number;
  rot?: number;
  radier?: number[];
  dur?: number;
}) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      {radier.map((r, i) => {
        const k = r * Math.SQRT1_2;
        return (
          <path
            key={r}
            d={`M ${x - k} ${y - k} A ${r} ${r} 0 0 1 ${x + k} ${y - k}`}
            stroke={ROD}
            strokeWidth={2.4}
            opacity={0}
          >
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0; 0"
              keyTimes="0; 0.15; 0.45; 0.7; 1"
              dur={`${dur}s`}
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
            />
          </path>
        );
      })}
    </g>
  );
}

/**
 * Liten skute i strek-stil, tegnet med baugen mot venstre. Origo er midt på
 * vannlinjen; skroget er 124 bredt ved vannlinjen og stikker 26 under.
 */
export function Skute({
  x,
  y,
  s = 1,
  signal = true,
}: {
  x: number;
  y: number;
  s?: number;
  signal?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {signal && <Signal x={-1} y={-90} />}
      <path d="M -1 -44 V -86" />
      <path d="M -7 -76 h 12" strokeWidth={2} />
      <circle cx={-1} cy={-88} r={3} fill={ROD} stroke="none" />
      <rect x={-24} y={-46} width={46} height={26} rx={5} fill={KREM} />
      <circle cx={-10} cy={-33} r={3.5} strokeWidth={2} />
      <path
        d="M -62 -20 L -49 6 Q 0 13 49 6 L 62 -20 Z"
        fill={KREM}
        strokeWidth={3}
      />
    </g>
  );
}

/** Enkel skyform – bredde ca. 240, høyde ca. 110, origo øverst til venstre */
export const SKYFORM =
  "M 50 108 A 30 30 0 0 1 46 50 A 44 44 0 0 1 130 32 A 34 34 0 0 1 194 58 A 27 27 0 0 1 196 108 Z";

/** Tannhjul med `teeth` tenner rundt (cx, cy) */
export function tannhjul(cx: number, cy: number, r: number, teeth: number) {
  const dybde = r * 0.24;
  const n = teeth * 4;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const k = i % 4;
    const rr = k === 0 || k === 1 ? r : r - dybde;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

/** Sekskant (spiss opp) med «radius» r rundt (cx, cy) */
export function sekskant(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

/** Liten tekst i figurene – dus, sans-serif */
export function Tekst({
  x,
  y,
  children,
  size = 12.5,
  color = DUS,
  anchor = "middle",
  weight = 400,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-sans)"
      fontSize={size}
      fontWeight={weight}
      fill={color}
      stroke="none"
    >
      {children}
    </text>
  );
}
