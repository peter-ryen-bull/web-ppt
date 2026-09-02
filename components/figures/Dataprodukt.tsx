import type { ReactNode } from "react";

/*
 * Figur for dataprodukt – "show, don't tell":
 *
 * Venstre: den ensomme tabellen – en parquet-fil dumpet i en bucket, med
 * ubesvarte spørsmål hengende rundt seg. Høyre: nøyaktig samme data pakket
 * som produkt, med dokumentasjon, eier, tester, ferskhet, kontrakt og
 * tilgang. Spørsmålene og produkt-egenskapene toner inn i rekkefølge slik
 * at kontrasten fortelles av figuren selv.
 *
 * Ren SVG (viewBox 1240x640) i Miles-paletten, animert med SMIL.
 */

const W = 1240;
const H = 640;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const KREM_DUS = "rgba(251, 240, 229, 0.72)";

/** Total looptid (sekunder) */
const T = 14;

/** Tone inn ved `at` sekunder, hold, ton ut helt på slutten av loopen */
function Appear({ at }: { at: number }) {
  const t1 = Math.max(0, (at - 0.15) / T);
  const t2 = at / T;
  return (
    <animate
      attributeName="opacity"
      values="0;0;1;1;0"
      keyTimes={`0;${t1.toFixed(4)};${t2.toFixed(4)};0.96;1`}
      dur={`${T}s`}
      repeatCount="indefinite"
    />
  );
}

function Pill({ cx, text, w }: { cx: number; text: string; w: number }) {
  return (
    <g>
      <rect x={cx - w / 2} y={8} width={w} height={30} rx={15} fill="var(--teal)" />
      <text
        x={cx}
        y={27.5}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={11.5}
        letterSpacing={1.5}
        fill="var(--cream)"
      >
        {text}
      </text>
    </g>
  );
}

/* ---------- Ikoner (24x24, strek-stil) ---------- */

function IkonFil() {
  return (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
    </>
  );
}

function IkonPerson() {
  return (
    <>
      <circle cx={12} cy={8} r={3.5} />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  );
}

function IkonKontrakt() {
  return (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9 14.5l2 2 4-4.5" />
    </>
  );
}

function IkonSkjold() {
  return (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6z" />
      <path d="M8.7 12l2.2 2.2 4.4-4.4" />
    </>
  );
}

function IkonKlokke() {
  return (
    <>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 7.5V12l3.5 2" />
    </>
  );
}

function IkonDeling() {
  return (
    <>
      <circle cx={6} cy={12} r={2.8} />
      <circle cx={18} cy={5.5} r={2.8} />
      <circle cx={18} cy={18.5} r={2.8} />
      <path d="M8.5 10.6l7-3.7" />
      <path d="M8.5 13.4l7 3.7" />
    </>
  );
}

/* ---------- Innhold ---------- */

const KOLONNER = [
  { label: "MMSI", x: 28 },
  { label: "TID", x: 156 },
  { label: "FART (KN)", x: 276 },
];

const RADER = [
  ["257061000", "09:41:02", "12.3"],
  ["259122000", "09:41:03", "8.7"],
  ["258963000", "09:41:04", "6.4"],
  ["257845000", "09:41:05", "14.1"],
];

/** Spørsmålene som henger ubesvart rundt den ensomme tabellen */
const SPORSMAL: { x: number; y: number; text: string; lineTo: [number, number]; at: number }[] = [
  { x: 300, y: 116, text: "Hva betyr feltene?", lineTo: [290, 150], at: 1.2 },
  { x: 92, y: 462, text: "Hvor ferske er dataene?", lineTo: [140, 402], at: 2.0 },
  { x: 268, y: 512, text: "Hvem svarer når noe ser rart ut?", lineTo: [330, 402], at: 2.8 },
];

/** Egenskapene som gjør tabellen til et produkt */
const EGENSKAPER: { title: string; sub: string; icon: ReactNode }[] = [
  { title: "Dokumentasjon", sub: "hva feltene betyr", icon: <IkonFil /> },
  { title: "Tydelig eier", sub: "team-hav svarer", icon: <IkonPerson /> },
  { title: "Datakontrakt", sub: "maskinlesbar avtale", icon: <IkonKontrakt /> },
  { title: "Tilgang", sub: "API · SQL · BI", icon: <IkonDeling /> },
];

const EGENSKAPER_VENSTRE: { title: string; sub: string; icon: ReactNode }[] = [
  { title: "Kvalitetstester", sub: "kjørt på hver eneste rad", icon: <IkonSkjold /> },
  { title: "Ferskhet", sub: "SLA: ferskere enn 5 min", icon: <IkonKlokke /> },
];

/* ---------- Byggeklosser ---------- */

/** Egenskaps-chip inne i produktboksen */
function Egenskap({
  x,
  y,
  w,
  title,
  sub,
  icon,
  at,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  sub: string;
  icon: ReactNode;
  at: number;
}) {
  return (
    <g opacity={0}>
      <Appear at={at} />
      <rect
        x={x}
        y={y}
        width={w}
        height={56}
        rx={12}
        fill="rgba(251, 240, 229, 0.08)"
        stroke="rgba(120, 232, 219, 0.35)"
        strokeWidth={1}
      />
      <g
        transform={`translate(${x + 13} ${y + 16.5})`}
        fill="none"
        stroke="var(--mint)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </g>
      <text
        x={x + 48}
        y={y + 25}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={14}
        fill="var(--cream)"
      >
        {title}
      </text>
      <text x={x + 48} y={y + 43} fontFamily="var(--font-sans)" fontSize={11} fill={KREM_DUS}>
        {sub}
      </text>
    </g>
  );
}

/* ---------- Hovedfigur ---------- */

export function DataproduktAnatomi() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Dataprodukt: en ensom tabell til venstre, samme data pakket som produkt til høyre"
    >
      <Pill cx={255} text="BARE EN TABELL" w={190} />
      <Pill cx={910} text="ET DATAPRODUKT" w={200} />

      {/* Den ensomme tabellen – en fil dumpet i en bucket */}
      <g transform="translate(60 150)">
        <rect width={390} height={252} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
        <path
          d="M 0 14 A 14 14 0 0 1 14 0 H 376 A 14 14 0 0 1 390 14 V 34 H 0 Z"
          fill="var(--cream)"
        />
        <g
          transform="translate(14 6) scale(0.9)"
          fill="none"
          stroke={SUB_FARGE}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IkonFil />
        </g>
        <text x={44} y={22.5} fontFamily={MONO} fontSize={12} fill={SUB_FARGE}>
          ais_dump_siste_v2_FINAL.parquet
        </text>
        {KOLONNER.map((k) => (
          <text
            key={k.label}
            x={k.x}
            y={64}
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={11}
            letterSpacing={1}
            fill={SUB_FARGE}
          >
            {k.label}
          </text>
        ))}
        <path d="M 18 76 H 372" stroke="var(--cream-dark)" strokeWidth={1.5} />
        {RADER.map((rad, i) => (
          <g key={i}>
            {rad.map((verdi, j) => (
              <text
                key={j}
                x={KOLONNER[j].x}
                y={106 + i * 36}
                fontFamily={MONO}
                fontSize={14.5}
                fill="var(--burgundy)"
              >
                {verdi}
              </text>
            ))}
            {i < RADER.length - 1 && (
              <path d={`M 18 ${116 + i * 36} H 372`} stroke="rgba(69, 13, 32, 0.08)" strokeWidth={1} />
            )}
          </g>
        ))}
      </g>

      {/* Ubesvarte spørsmål rundt tabellen */}
      {SPORSMAL.map((q) => (
        <g key={q.text} opacity={0}>
          <Appear at={q.at} />
          <path
            d={`M ${q.x + 8} ${q.y + (q.lineTo[1] > q.y ? 10 : -14)} L ${q.lineTo[0]} ${q.lineTo[1]}`}
            fill="none"
            stroke={LINJE_FARGE}
            strokeWidth={1.4}
            strokeDasharray="1.5 6"
            strokeLinecap="round"
          />
          <circle cx={q.x} cy={q.y - 5} r={10} fill="rgba(255, 48, 59, 0.1)" stroke="var(--red)" strokeWidth={1.4} />
          <text
            x={q.x}
            y={q.y - 0.5}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight={700}
            fontSize={13}
            fill="var(--red)"
          >
            ?
          </text>
          <text x={q.x + 18} y={q.y} fontFamily="var(--font-sans)" fontSize={14.5} fill="var(--red)">
            {q.text}
          </text>
        </g>
      ))}

      <text x={255} y={560} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={SUB_FARGE}>
        – en fil i en bucket er ikke et produkt
      </text>

      {/* Produkttankegang: pilen over til produktet */}
      <text x={535} y={262} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill="var(--red)">
        produkttankegang
      </text>
      <path
        d="M 458 285 H 612"
        fill="none"
        stroke={LINJE_FARGE}
        strokeWidth={1.6}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      {[0, -1.75].map((b) => (
        <circle key={b} r={5} fill="var(--red)">
          <animateMotion dur="3.5s" begin={`${b}s`} repeatCount="indefinite" path="M 458 285 H 612" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.88;1"
            dur="3.5s"
            begin={`${b}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Produktboksen: samme data, pakket og forvaltet */}
      <rect x={620} y={80} width={580} height={480} rx={20} fill="var(--teal)" />
      <text
        x={910}
        y={130}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={30}
        fill="var(--cream)"
      >
        AIS-tracks
      </text>
      <rect x={892} y={144} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text x={910} y={172} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={KREM_DUS}>
        samme data – pakket som produkt
      </text>

      {/* Samme tabell, nå ryddig og versjonert */}
      <g transform="translate(650 195)">
        <rect width={250} height={170} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
        <path
          d="M 0 12 A 12 12 0 0 1 12 0 H 238 A 12 12 0 0 1 250 12 V 28 H 0 Z"
          fill="var(--cream)"
        />
        <text x={14} y={19} fontFamily={MONO} fontSize={11} fill={SUB_FARGE}>
          ais_tracks · v2.1.0
        </text>
        {["MMSI", "TID", "FART"].map((label, j) => (
          <text
            key={label}
            x={[18, 110, 190][j]}
            y={50}
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={10}
            letterSpacing={1}
            fill={SUB_FARGE}
          >
            {label}
          </text>
        ))}
        <path d="M 12 60 H 238" stroke="var(--cream-dark)" strokeWidth={1.2} />
        {RADER.slice(0, 3).map((rad, i) => (
          <g key={i}>
            {rad.map((verdi, j) => (
              <text
                key={j}
                x={[18, 110, 190][j]}
                y={86 + i * 32}
                fontFamily={MONO}
                fontSize={12.5}
                fill="var(--burgundy)"
              >
                {verdi}
              </text>
            ))}
          </g>
        ))}
      </g>

      {/* Egenskapene som gjør det til et produkt */}
      {EGENSKAPER_VENSTRE.map((e, i) => (
        <Egenskap key={e.title} x={650} y={380 + i * 70} w={250} at={5.8 + i * 0.4} {...e} />
      ))}
      {EGENSKAPER.map((e, i) => (
        <Egenskap key={e.title} x={920} y={195 + i * 77} w={250} at={4.2 + i * 0.4} {...e} />
      ))}

      <text
        x={620}
        y={618}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fill="var(--red)"
      >
        En tabell er en ingrediens. Dataproduktet er retten.
      </text>
    </svg>
  );
}
