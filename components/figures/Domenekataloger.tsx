"use client";

import type { ReactNode } from "react";
import { useStep } from "@/components/steps";

/*
 * Figurer for «hvor vi er – og hvor vi skal» med katalogstrukturen:
 *
 * HvorViEr:   i dag – én kilde (AIS) gjennom én bronze/silver/gold-struktur,
 *             med dataproduktene ut av gold.
 * HvorViSkal: neste år – én katalog per domene på venstre side, en Open Data
 *             Contract som pushes til et sentralt repo, og CI som automatisk
 *             oppretter et view i den sentrale «dataprodukter»-katalogen.
 *
 * Ren SVG (viewBox 1240x640) i Miles-paletten. Delene avsløres med
 * klikk-steg (useStep), og flyten kontrakt → repo → view har en løpende
 * SMIL-animert prikk.
 */

const W = 1240;
const H = 640;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const KREM_DUS = "rgba(251, 240, 229, 0.72)";

const BRONSE = "#b5773f";
const SOLV = "#9ea7ae";
const GULL = "#d3a53a";

/** Viser innholdet først når klikk-steget `at` er nådd */
function Steg({ at, children }: { at: number; children: ReactNode }) {
  const step = useStep();
  const shown = step >= at;
  return (
    <g style={{ opacity: shown ? 1 : 0, transition: "opacity 300ms ease" }}>
      {children}
    </g>
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

function PilDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX={8}
        refY={5}
        markerWidth={8}
        markerHeight={8}
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--red)" />
      </marker>
    </defs>
  );
}

function Pil({ d, marker }: { d: string; marker: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--red)"
      strokeWidth={1.8}
      strokeLinecap="round"
      markerEnd={`url(#${marker})`}
    />
  );
}

/* ---------- Ikoner (24x24, strek-stil) ---------- */

function IkonAntenne() {
  return (
    <>
      <path d="M12 21V11" />
      <path d="M8 21h8" />
      <circle cx={12} cy={9} r={2} />
      <path d="M7.5 4.5a6.5 6.5 0 0 0 0 9" />
      <path d="M16.5 4.5a6.5 6.5 0 0 1 0 9" />
      <path d="M5 2a10 10 0 0 0 0 14" />
      <path d="M19 2a10 10 0 0 1 0 14" />
    </>
  );
}

function IkonFil() {
  return (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
    </>
  );
}

function IkonGit() {
  return (
    <>
      <circle cx={6} cy={5} r={2.5} />
      <circle cx={6} cy={19} r={2.5} />
      <circle cx={18} cy={9} r={2.5} />
      <path d="M6 7.5v9" />
      <path d="M18 11.5c0 3.5-3 4.5-6 5-2.5.4-4 1-4 2" />
    </>
  );
}

function IkonView() {
  return (
    <>
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" />
      <circle cx={12} cy={12} r={2.8} />
    </>
  );
}

/* =====================================================================
 * HVOR VI ER – én kilde, én bronze/silver/gold-struktur
 * ===================================================================== */

const LAG: { navn: string; farge: string; sub: string; tabeller: string[] }[] = [
  { navn: "bronze", farge: BRONSE, sub: "rå AIS-meldinger – som de kom inn", tabeller: ["ais_raw"] },
  { navn: "silver", farge: SOLV, sub: "vasket, deduplisert og beriket", tabeller: ["ais_clean", "skip"] },
  { navn: "gold", farge: GULL, sub: "tracks, seilaser og utslipp – klare til bruk", tabeller: ["ais_tracks", "seilaser", "utslipp"] },
];

const PRODUKTER_IDAG: { navn: string; sub: string }[] = [
  { navn: "AIS-tracks", sub: "posisjoner og spor" },
  { navn: "MarTraf", sub: "seilaser havn til havn" },
  { navn: "MarU", sub: "utslipp per AIS-punkt" },
  { navn: "HAIS", sub: "historiske uttrekk" },
];

function TabellChips({ tekster, hoyre, y }: { tekster: string[]; hoyre: number; y: number }) {
  let x = hoyre;
  const chips = [...tekster].reverse().map((t) => {
    const w = t.length * 7.2 + 22;
    x -= w;
    const cx = x;
    x -= 8;
    return (
      <g key={t}>
        <rect x={cx} y={y} width={w} height={26} rx={13} fill="var(--cream)" />
        <text x={cx + w / 2} y={y + 17.5} textAnchor="middle" fontFamily={MONO} fontSize={11.5} fill="var(--burgundy)">
          {t}
        </text>
      </g>
    );
  });
  return <>{chips}</>;
}

export function HvorViEr() {
  const lagY = [185, 300, 415];
  const lagH = 90;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="I dag: AIS-data gjennom bronze, silver og gold, med dataprodukter ut av gold"
    >
      <PilDefs id="pil-idag" />
      <Pill cx={620} text="I DAG – ÉN KILDE, ÉN KATALOGSTRUKTUR" w={400} />

      {/* Kilden */}
      <g transform="translate(30 280)">
        <rect width={230} height={110} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
        <g
          transform="translate(16 20) scale(1.3)"
          fill="none"
          stroke="var(--red)"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IkonAntenne />
        </g>
        <text x={62} y={46} fontFamily={MONO} fontSize={22} fill="var(--burgundy)">
          AIS
        </text>
        <text x={62} y={68} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
          100 mill. rader/dag
        </text>
        <text x={62} y={86} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
          ett domene, én kilde
        </text>
      </g>
      <Pil d="M 268 335 H 315" marker="pil-idag" />

      {/* Metastore med tre kataloger */}
      <rect x={325} y={90} width={560} height={470} rx={20} fill="var(--teal)" />
      <text x={605} y={130} textAnchor="middle" fontFamily="var(--font-serif)" fontSize={26} fill="var(--cream)">
        Unity Catalog
      </text>
      <rect x={587} y={142} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text x={605} y={166} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={KREM_DUS}>
        tre kataloger – ett domene
      </text>

      {LAG.map((lag, i) => {
        const y = lagY[i];
        return (
          <g key={lag.navn}>
            <rect x={355} y={y} width={500} height={lagH} rx={12} fill="#fff" />
            <rect x={367} y={y + 12} width={6} height={lagH - 24} rx={3} fill={lag.farge} />
            <text x={388} y={y + 36} fontFamily={MONO} fontSize={18} fill="var(--burgundy)">
              {lag.navn}
            </text>
            <text x={388} y={y + 58} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
              {lag.sub}
            </text>
            <TabellChips tekster={lag.tabeller} hoyre={840} y={y + 14} />
            {i < LAG.length - 1 && <Pil d={`M 605 ${y + lagH + 3} V ${y + lagH + 22}`} marker="pil-idag" />}
          </g>
        );
      })}

      {/* Dataproduktene ut av gold */}
      <Steg at={1}>
        <Pil d="M 858 460 H 925" marker="pil-idag" />
        <text
          x={1067}
          y={345}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={11}
          letterSpacing={1.5}
          fill={SUB_FARGE}
        >
          DATAPRODUKTER
        </text>
        {PRODUKTER_IDAG.map((p, i) => {
          const y = 360 + i * 56;
          return (
            <g key={p.navn}>
              <rect x={935} y={y} width={265} height={44} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
              <text x={953} y={y + 19} fontFamily="var(--font-sans)" fontWeight={600} fill="var(--burgundy)" fontSize={14}>
                {p.navn}
              </text>
              <text x={953} y={y + 34} fontFamily="var(--font-sans)" fontSize={11} fill={SUB_FARGE}>
                {p.sub}
              </text>
            </g>
          );
        })}
      </Steg>

      <Steg at={2}>
        <text x={620} y={612} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={15.5} fill="var(--red)">
          Fungerer fint for ett domene. Neste år kommer toll, HR og økonomi – og fyrtårnene.
        </text>
      </Steg>
    </svg>
  );
}

/* =====================================================================
 * HVOR VI SKAL – domenekataloger, datakontrakt, sentral dataprodukt-katalog
 * ===================================================================== */

const DOMENER: string[] = ["toll", "ais", "hr_og_okonomi", "prediktivt_vedlikehold_fyrtaarn"];

const KONTRAKT_LINJER: [string, string][] = [
  ["apiVersion:", " v3.0.2"],
  ["kind:", " DataContract"],
  ["id:", " ais.tracks"],
  ["domain:", " ais"],
  ["team:", " ais"],
  ["status:", " active"],
  ["schema:", ""],
  ["  - name:", " mmsi"],
  ["  - name:", " fart_knop"],
];

const VIEWS: { navn: string; kilde: string }[] = [
  { navn: "ais.tracks", kilde: "view → ais.gold.tracks" },
  { navn: "ais.utslipp", kilde: "view → ais.gold.utslipp" },
  { navn: "toll.deklarasjoner", kilde: "view → toll.gold.deklarasjoner" },
  { navn: "hr_og_okonomi.kostnader", kilde: "view → hr_og_okonomi.gold.kostnader" },
  { navn: "fyrtaarn.tilstand", kilde: "view → …vedlikehold_fyrtaarn.gold.tilstand" },
];

const DOMENE_X = 40;
const DOMENE_W = 380;
const DOMENE_H = 110;
const DOMENE_GAP = 14;
const domeneY = (i: number) => 70 + i * (DOMENE_H + DOMENE_GAP);

function DomeneKort({ navn, y, uthevet }: { navn: string; y: number; uthevet: boolean }) {
  const medaljong = [
    { navn: "bronze", farge: BRONSE },
    { navn: "silver", farge: SOLV },
    { navn: "gold", farge: GULL },
  ];
  return (
    <g>
      <rect
        x={DOMENE_X}
        y={y}
        width={DOMENE_W}
        height={DOMENE_H}
        rx={14}
        fill="var(--teal)"
        stroke={uthevet ? "var(--mint)" : "none"}
        strokeWidth={uthevet ? 2 : 0}
        style={{ transition: "stroke 300ms ease" }}
      />
      <text x={DOMENE_X + 20} y={y + 32} fontFamily={MONO} fontSize={16} fill="var(--cream)">
        {navn}
      </text>
      {medaljong.map((m, j) => {
        const mx = DOMENE_X + 20 + j * 110;
        return (
          <g key={m.navn}>
            <rect x={mx} y={y + 48} width={104} height={18} rx={4} fill={m.farge} opacity={0.9} />
            <text
              x={mx + 52}
              y={y + 61}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={10.5}
              fontWeight={600}
              fill="#2a0813"
            >
              {m.navn}
            </text>
          </g>
        );
      })}
      <text x={DOMENE_X + 20} y={y + 92} fontFamily="var(--font-sans)" fontSize={11.5} fill={KREM_DUS}>
        eget team · eget kostnadssenter · eget forvaltningsansvar
      </text>
    </g>
  );
}

function ViewRad({ navn, kilde, y, ny }: { navn: string; kilde: string; y: number; ny: boolean }) {
  return (
    <g>
      <rect
        x={880}
        y={y}
        width={300}
        height={50}
        rx={12}
        fill="rgba(251, 240, 229, 0.08)"
        stroke={ny ? "var(--mint)" : "rgba(120, 232, 219, 0.35)"}
        strokeWidth={ny ? 1.8 : 1}
      />
      <g
        transform={`translate(${892} ${y + 13})`}
        fill="none"
        stroke="var(--mint)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonView />
      </g>
      <text x={926} y={y + 22} fontFamily={MONO} fontSize={13.5} fill="var(--cream)">
        {navn}
      </text>
      <text x={926} y={y + 39} fontFamily="var(--font-sans)" fontSize={10.5} fill={KREM_DUS}>
        {kilde}
      </text>
    </g>
  );
}

/** Ruten prikken følger: kontrakt → repo → inn i dataprodukter-katalogen */
const FLYT_STI = "M 635 330 V 427 H 820 V 210 H 872";

export function HvorViSkal() {
  const step = useStep();
  const aisY = domeneY(1);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Dit vi skal: domenekataloger til venstre, datakontrakt som pushes til et sentralt repo og automatisk blir et view i dataprodukter-katalogen"
    >
      <PilDefs id="pil-skal" />
      <Pill cx={230} text="DOMENEKATALOGER" w={200} />
      <Pill cx={635} text="DATAKONTRAKT" w={170} />
      <Pill cx={1030} text="SENTRAL KATALOG" w={200} />

      {/* Domenene – én katalog hver */}
      {DOMENER.map((d, i) => (
        <DomeneKort key={d} navn={d} y={domeneY(i)} uthevet={d === "ais" && step >= 1} />
      ))}

      {/* Kontrakten – skrevet av domenet */}
      <Steg at={1}>
        <text x={635} y={62} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
          Open Data Contract Standard
        </text>
        <path
          d={`M ${DOMENE_X + DOMENE_W} ${aisY + DOMENE_H / 2} H 490`}
          fill="none"
          stroke={LINJE_FARGE}
          strokeWidth={1.6}
          strokeDasharray="1.5 7"
          strokeLinecap="round"
        />
        <g transform="translate(490 80)">
          <rect width={290} height={250} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
          <path d="M 0 14 A 14 14 0 0 1 14 0 H 276 A 14 14 0 0 1 290 14 V 32 H 0 Z" fill="var(--cream)" />
          <g
            transform="translate(12 5) scale(0.9)"
            fill="none"
            stroke={SUB_FARGE}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <IkonFil />
          </g>
          <text x={40} y={21.5} fontFamily={MONO} fontSize={12} fill={SUB_FARGE}>
            ais.tracks.odcs.yaml
          </text>
          {KONTRAKT_LINJER.map(([key, val], i) => (
            <text key={i} x={20} y={56 + i * 21} fontFamily={MONO} fontSize={12.5} style={{ whiteSpace: "pre" }}>
              <tspan fill={SUB_FARGE}>{key}</tspan>
              <tspan fill="var(--burgundy)">{val}</tspan>
            </text>
          ))}
        </g>
      </Steg>

      {/* git push → sentralt repo */}
      <Steg at={2}>
        <Pil d="M 635 332 V 380" marker="pil-skal" />
        <text x={648} y={362} fontFamily={MONO} fontSize={12} fill="var(--red)">
          git push
        </text>
        <g transform="translate(490 388)">
          <rect width={290} height={78} rx={14} fill="var(--burgundy)" />
          <g
            transform="translate(16 27)"
            fill="none"
            stroke="var(--mint)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <IkonGit />
          </g>
          <text x={54} y={34} fontFamily={MONO} fontSize={14} fill="var(--cream)">
            kystverket/datakontrakter
          </text>
          <text x={54} y={55} fontFamily="var(--font-sans)" fontSize={11.5} fill={KREM_DUS}>
            sentralt repo · PR og CI-sjekk
          </text>
        </g>
      </Steg>

      {/* Automatisk: CI oppretter view i dataprodukter-katalogen */}
      <Steg at={3}>
        <Pil d="M 780 427 H 820 V 210 H 870" marker="pil-skal" />
        <text
          x={806}
          y={330}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={12}
          fill="var(--red)"
          transform="rotate(-90 806 330)"
        >
          automatisk – CI oppretter view
        </text>

        <rect x={860} y={70} width={340} height={482} rx={20} fill="var(--teal)" />
        <text x={1030} y={118} textAnchor="middle" fontFamily="var(--font-serif)" fontSize={28} fill="var(--cream)">
          dataprodukter
        </text>
        <rect x={1012} y={131} width={36} height={3} rx={1.5} fill="var(--mint)" />
        <text x={1030} y={158} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={KREM_DUS}>
          én katalog · alle produkter · som views
        </text>
        <ViewRad {...VIEWS[0]} y={185} ny />
      </Steg>

      <Steg at={4}>
        {VIEWS.slice(1).map((v, i) => (
          <ViewRad key={v.navn} {...v} y={247 + i * 62} ny={false} />
        ))}
      </Steg>

      {/* Prikken som følger flyten kontrakt → repo → view */}
      {step >= 3 &&
        [0, -2].map((b) => (
          <circle key={b} r={5} fill="var(--red)">
            <animateMotion dur="4s" begin={`${b}s`} repeatCount="indefinite" path={FLYT_STI} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.9;1"
              dur="4s"
              begin={`${b}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      <Steg at={5}>
        <text x={620} y={612} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={15.5} fill="var(--red)">
          Data delt på domener – tydelig eierskap, tydelig kostnadssenter, tydelig forvaltningsansvar
        </text>
      </Steg>
    </svg>
  );
}
