import type { ReactNode } from "react";
import { Roter } from "./Strek";

/*
 * Små strek-ikoner (24x24) som brukes over prosessbokser, ved roller og i
 * verbrekka. Alle tegnes med arvet strek – farge og tykkelse settes av den
 * som bruker dem.
 */

export type IkonNavn =
  | "antenne"
  | "puls"
  | "lag"
  | "deling"
  | "skjema"
  | "trakt"
  | "konvolutt"
  | "rute"
  | "royk"
  | "soyler"
  | "kode"
  | "skjold"
  | "person"
  | "innboks"
  | "database"
  | "rotasjon"
  | "kontrakt"
  | "bok"
  | "server"
  | "nokkel"
  | "nettverk"
  | "satellitt"
  | "hengelas"
  | "gnist"
  | "verktoy"
  | "mynt";

const IKONER: Record<IkonNavn, ReactNode> = {
  antenne: (
    <>
      <path d="M12 21V11" />
      <path d="M8 21h8" />
      <circle cx={12} cy={9} r={2} />
      <path d="M7.5 4.5a6.5 6.5 0 0 0 0 9" />
      <path d="M16.5 4.5a6.5 6.5 0 0 1 0 9" />
    </>
  ),
  puls: <path d="M2.5 12h4L9 6l4 12 2.5-6h6" />,
  lag: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 17 12 21.5 20.5 17" />
    </>
  ),
  deling: (
    <>
      <circle cx={6} cy={12} r={2.8} />
      <circle cx={18} cy={5.5} r={2.8} />
      <circle cx={18} cy={18.5} r={2.8} />
      <path d="M8.5 10.6l7-3.7" />
      <path d="M8.5 13.4l7 3.7" />
    </>
  ),
  skjema: (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 16.5h5" />
    </>
  ),
  trakt: (
    <>
      <path d="M3.5 4.5h17L14 12.5v6l-4 2v-8z" />
    </>
  ),
  konvolutt: (
    <>
      <rect x={3} y={5.5} width={18} height={13} rx={2} />
      <path d="M3.5 7 12 13.5 20.5 7" />
    </>
  ),
  rute: (
    <>
      <circle cx={5.5} cy={18.5} r={2.5} />
      <circle cx={18.5} cy={5.5} r={2.5} />
      <path d="M7.5 17c4-1 3-6 6.5-8 1.5-.8 2.5-1 3.5-1.5" />
    </>
  ),
  royk: (
    <>
      <path d="M7 20.5V13" />
      <path d="M11 20.5V13" />
      <path d="M5 13h8" />
      <path d="M9 10.5a2.5 2.5 0 0 1 0-5 3.5 3.5 0 0 1 6.5-1.5 3 3 0 0 1 3 5" />
      <path d="M12.5 10.5h6" />
    </>
  ),
  soyler: (
    <>
      <path d="M4 20.5h16" />
      <path d="M7.5 20.5v-6" />
      <path d="M12 20.5V9" />
      <path d="M16.5 20.5v-9.5" />
    </>
  ),
  kode: (
    <>
      <path d="M8.5 6.5 3.5 12l5 5.5" />
      <path d="M15.5 6.5l5 5.5-5 5.5" />
    </>
  ),
  skjold: (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6z" />
      <path d="M8.7 12l2.2 2.2 4.4-4.4" />
    </>
  ),
  person: (
    <>
      <circle cx={12} cy={8} r={3.5} />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  innboks: (
    <>
      <path d="M12 3.5v10" />
      <path d="M8.5 10 12 13.5 15.5 10" />
      <path d="M3.5 15v3.5a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V15" />
    </>
  ),
  database: (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  ),
  rotasjon: (
    <Roter cx={12} cy={12} dur={16}>
      <path d="M3.5 12a8.5 8.5 0 0 1 8.5-8.5 9 9 0 0 1 6.3 2.6L20.5 8" />
      <path d="M20.5 3.5V8h-4.5" />
      <path d="M20.5 12a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-6.3-2.6L3.5 16" />
      <path d="M3.5 20.5V16H8" />
    </Roter>
  ),
  kontrakt: (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9 14.5l2 2 4-4.5" />
    </>
  ),
  bok: (
    <>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13.5v15H6a2 2 0 0 0-2 2z" />
      <path d="M4 18.5v2h15.5v-2" />
      <path d="M9 8h6" />
      <path d="M9 11.5h4" />
    </>
  ),
  server: (
    <>
      <rect x={3.5} y={4} width={17} height={6.5} rx={1.5} />
      <rect x={3.5} y={13.5} width={17} height={6.5} rx={1.5} />
      <path d="M7 7.25h.01" strokeWidth={2.6} />
      <path d="M7 16.75h.01" strokeWidth={2.6} />
    </>
  ),
  nokkel: (
    <>
      <circle cx={8} cy={15.5} r={4.5} />
      <path d="M11.2 12.3 20 3.5" />
      <path d="M16.5 7l3 3" />
    </>
  ),
  nettverk: (
    <>
      <circle cx={12} cy={5} r={2.5} />
      <circle cx={5} cy={19} r={2.5} />
      <circle cx={19} cy={19} r={2.5} />
      <path d="M12 7.5v5" />
      <path d="M12 12.5 6.3 17" />
      <path d="M12 12.5l5.7 4.5" />
    </>
  ),
  satellitt: (
    <>
      <rect x={9.5} y={9.5} width={5} height={5} rx={1} transform="rotate(45 12 12)" />
      <path d="M8.5 8.5 4.5 4.5" />
      <path d="M2.5 6.5l4-4" />
      <path d="M15.5 15.5l4 4" />
      <path d="M17.5 21.5l4-4" />
      <path d="M13 4.5a6.5 6.5 0 0 1 6.5 6.5" />
    </>
  ),
  hengelas: (
    <>
      <rect x={5} y={10.5} width={14} height={10} rx={2} />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </>
  ),
  gnist: <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />,
  verktoy: (
    <path d="M14.5 4.5a4.5 4.5 0 0 0 5 6L9.5 20.5a2.1 2.1 0 0 1-3-3L16.5 7.5a4.5 4.5 0 0 0-2-3z" />
  ),
  mynt: (
    <>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M9 8.5v7" />
      <path d="M9 12.2c2 0 3.5-1.2 3.5-3.7" />
      <path d="M9 12c1.5 0 2.8 1.2 3.8 3.5" />
    </>
  ),
};

/** Frittstående ikon som egen SVG – til bruk i HTML-layout */
export function StrekIkon({
  navn,
  size = 40,
  color = "var(--teal)",
  strokeWidth = 1.7,
}: {
  navn: IkonNavn;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ display: "block" }}
      aria-hidden
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {IKONER[navn]}
    </svg>
  );
}

/** Ikon plassert inne i en annen SVG: origo øverst til venstre, `size` px høyt */
export function IkonI({
  navn,
  x,
  y,
  size = 24,
  color,
  strokeWidth = 1.8,
}: {
  navn: IkonNavn;
  x: number;
  y: number;
  size?: number;
  color?: string;
  /** Visuell strektykkelse i px (kompenseres for skaleringen) */
  strokeWidth?: number;
}) {
  const s = size / 24;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      stroke={color}
      strokeWidth={strokeWidth / s}
    >
      {IKONER[navn]}
    </g>
  );
}
