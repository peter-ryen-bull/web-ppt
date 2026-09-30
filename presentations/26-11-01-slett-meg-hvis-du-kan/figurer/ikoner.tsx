import type { ReactNode } from "react";

/*
 * Små strek-ikoner (24x24), kopiert fra TDC-dekkets strek-sett. Arver strek
 * fra bruker – farge og tykkelse settes i StrekIkon / IkonI.
 */

export type IkonNavn =
  | "person"
  | "database"
  | "skjema"
  | "konvolutt"
  | "nokkel"
  | "hengelas"
  | "server"
  | "varsel"
  | "kode"
  | "kart"
  | "innboks"
  | "nettverk"
  | "bok"
  | "skjold"
  | "trakt"
  | "kontrakt"
  | "lag"
  | "klokke"
  | "sok"
  | "kryss";

const IKONER: Record<IkonNavn, ReactNode> = {
  person: (
    <>
      <circle cx={12} cy={8} r={3.5} />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  database: (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
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
  konvolutt: (
    <>
      <rect x={3} y={5.5} width={18} height={13} rx={2} />
      <path d="M3.5 7 12 13.5 20.5 7" />
    </>
  ),
  nokkel: (
    <>
      <circle cx={8} cy={15.5} r={4.5} />
      <path d="M11.2 12.3 20 3.5" />
      <path d="M16.5 7l3 3" />
    </>
  ),
  hengelas: (
    <>
      <rect x={5} y={10.5} width={14} height={10} rx={2} />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
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
  varsel: (
    <>
      <path d="M12 3.5 21 19.5H3z" />
      <path d="M12 9.5v4.5" />
      <path d="M12 16.8h.01" strokeWidth={2.6} />
    </>
  ),
  kode: (
    <>
      <path d="M8.5 6.5 3.5 12l5 5.5" />
      <path d="M15.5 6.5l5 5.5-5 5.5" />
    </>
  ),
  kart: (
    <>
      <path d="M3.5 6.5 9 4l6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  innboks: (
    <>
      <path d="M12 3.5v10" />
      <path d="M8.5 10 12 13.5 15.5 10" />
      <path d="M3.5 15v3.5a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V15" />
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
  bok: (
    <>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13.5v15H6a2 2 0 0 0-2 2z" />
      <path d="M4 18.5v2h15.5v-2" />
      <path d="M9 8h6" />
      <path d="M9 11.5h4" />
    </>
  ),
  skjold: (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6z" />
      <path d="M8.7 12l2.2 2.2 4.4-4.4" />
    </>
  ),
  trakt: <path d="M3.5 4.5h17L14 12.5v6l-4 2v-8z" />,
  kontrakt: (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9 14.5l2 2 4-4.5" />
    </>
  ),
  lag: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 17 12 21.5 20.5 17" />
    </>
  ),
  klokke: (
    <>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  sok: (
    <>
      <circle cx={10.5} cy={10.5} r={6} />
      <path d="M15 15l5.5 5.5" />
    </>
  ),
  kryss: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
};

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

/** Ikon inni en SVG-figur, plassert med x/y og skalert til `size` */
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
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {IKONER[navn]}
    </g>
  );
}
