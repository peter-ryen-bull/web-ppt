"use client";

import type { ReactNode } from "react";
import { useStep } from "@/components/steps";
import { IkonI, type IkonNavn } from "@/components/figures/strek";
import {
  W,
  H,
  MONO,
  SUB_FARGE,
  LINJE_FARGE,
  KREM_DUS,
  BRONSE,
  SOLV,
  GULL,
  Steg,
  Pill,
  PilDefs,
  Pil,
  IkonFil,
  IkonGit,
  IkonView,
  VIEWS,
} from "./Domenekataloger";

/*
 * «Hvor vi skal» som ett zoomet-ut bilde (HelePlattformen), pluss de tre
 * delbildene som bygde det opp (DomenerKilder, ProduktForbruk, og
 * HvorViSkal i Domenekataloger.tsx).
 *
 * Ren SVG (HelePlattformen: viewBox 1280x720, de øvrige 1240x640), samme
 * palett og byggeklosser som de andre katalogfigurene. HelePlattformen
 * avslører én del per klikk.
 */

const MINT_DUS = "rgba(120, 232, 219, 0.35)";
const TEAL_LINJE = "rgba(0, 64, 71, 0.55)";

/* ---------- Domenene og kildene deres ---------- */

/** `kort` er navnet i det utzoomede bildet, der det er lite plass */
type Kilde = { navn: string; kort: string; ikon: IkonNavn };
type Domene = { navn: string; ikon: IkonNavn; kilder: Kilde[] };

const DOMENER_MED_KILDER: Domene[] = [
  {
    navn: "customs",
    ikon: "skjema",
    kilder: [
      { navn: "declarations", kort: "declarations", ikon: "skjema" },
      { navn: "cargo manifests", kort: "manifests", ikon: "innboks" },
    ],
  },
  {
    navn: "ais",
    ikon: "antenne",
    kilder: [
      { navn: "AIS stream", kort: "AIS stream", ikon: "antenne" },
      { navn: "ship register", kort: "ship register", ikon: "bok" },
    ],
  },
  {
    navn: "hr_and_finance",
    ikon: "mynt",
    kilder: [
      { navn: "payroll", kort: "payroll", ikon: "person" },
      { navn: "ERP ledger", kort: "ERP ledger", ikon: "mynt" },
    ],
  },
  {
    navn: "lighthouses",
    ikon: "verktoy",
    kilder: [
      { navn: "sensors", kort: "sensors", ikon: "puls" },
      { navn: "maintenance log", kort: "maint. log", ikon: "verktoy" },
    ],
  },
];

const LAG: { navn: string; farge: string; sub: string }[] = [
  { navn: "bronze", farge: BRONSE, sub: "raw, as it arrived" },
  { navn: "silver", farge: SOLV, sub: "cleaned and enriched" },
  { navn: "gold", farge: GULL, sub: "ready to use" },
];

/* ---------- Konsumentene utenfor domenene ---------- */

const KONSUMENTER: { navn: string; sub: string; ikon: IkonNavn }[] = [
  { navn: "Climate accounts", sub: "Environment Agency · municipalities", ikon: "royk" },
  { navn: "BarentsWatch API", sub: "developers, live and historical", ikon: "kode" },
  { navn: "Dashboards and BI", sub: "analysts across Kystverket", ikon: "soyler" },
  { navn: "Researchers", sub: "notebooks and HAIS extracts", ikon: "bok" },
  { navn: "Other agencies", sub: "customs, police, rescue services", ikon: "deling" },
];

/* =====================================================================
 * Byggeklosser
 * ===================================================================== */

/** Liggende sylinder i teal – én domenekatalog. Barna plasseres i absolutte koordinater. */
function Sylinder({
  x,
  y,
  w,
  h,
  ry = 13,
  uthevet = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  ry?: number;
  uthevet?: boolean;
  children?: ReactNode;
}) {
  const rx = w / 2;
  const cx = x + rx;
  const top = y + ry;
  const bot = y + h - ry;
  const omriss = `M ${x} ${top} A ${rx} ${ry} 0 0 0 ${x + w} ${top} L ${x + w} ${bot} A ${rx} ${ry} 0 0 1 ${x} ${bot} Z`;
  return (
    <g>
      <path
        d={omriss}
        fill="var(--teal)"
        stroke={uthevet ? "var(--mint)" : "none"}
        strokeWidth={uthevet ? 2 : 0}
        style={{ transition: "stroke 300ms ease" }}
      />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="color-mix(in srgb, var(--teal) 72%, var(--mint))" />
      <path
        d={`M ${x} ${top} A ${rx} ${ry} 0 0 1 ${x + w} ${top}`}
        fill="none"
        stroke="rgba(251, 240, 229, 0.28)"
        strokeWidth={1.3}
      />
      {uthevet && (
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="none" stroke="var(--mint)" strokeWidth={2} />
      )}
      {children}
    </g>
  );
}

/** Hvit kilde-brikke med ikon og navn */
function KildeBrikke({
  x,
  y,
  w,
  h = 40,
  kilde,
  fontSize = 12.5,
  ikonSize = 20,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  kilde: Kilde;
  fontSize?: number;
  ikonSize?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 3} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <g fill="none" stroke="var(--red)" strokeLinecap="round" strokeLinejoin="round">
        <IkonI navn={kilde.ikon} x={x + 12} y={y + (h - ikonSize) / 2} size={ikonSize} strokeWidth={1.7} />
      </g>
      <text x={x + 12 + ikonSize + 10} y={y + h / 2 + fontSize * 0.36} fontFamily={MONO} fontSize={fontSize} fill="var(--burgundy)">
        {kilde.navn}
      </text>
    </g>
  );
}

/** Kompakt view-rad inne i dataprodukt-katalogen */
function ViewRadKompakt({
  x,
  y,
  w,
  h,
  navn,
  kilde,
  fontSize = 13,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  navn: string;
  kilde?: string;
  fontSize?: number;
}) {
  const ikon = Math.min(20, h - 14);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="rgba(251, 240, 229, 0.08)" stroke={MINT_DUS} strokeWidth={1} />
      <g
        transform={`translate(${x + 11} ${y + (h - ikon) / 2}) scale(${ikon / 24})`}
        fill="none"
        stroke="var(--mint)"
        strokeWidth={1.8 * (24 / ikon)}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonView />
      </g>
      {kilde ? (
        <>
          <text x={x + 11 + ikon + 9} y={y + h / 2 - 2} fontFamily={MONO} fontSize={fontSize} fill="var(--cream)">
            {navn}
          </text>
          <text x={x + 11 + ikon + 9} y={y + h / 2 + 12} fontFamily="var(--font-sans)" fontSize={fontSize * 0.78} fill={KREM_DUS}>
            {kilde}
          </text>
        </>
      ) : (
        <text x={x + 11 + ikon + 9} y={y + h / 2 + fontSize * 0.36} fontFamily={MONO} fontSize={fontSize} fill="var(--cream)">
          {navn}
        </text>
      )}
    </g>
  );
}

/** Dataprodukt-katalogen som teal boks med overskrift og view-rader */
function ProduktKatalog({
  x,
  y,
  w,
  h,
  tittelSize = 28,
  sub,
  rader,
  radH,
  radGap,
  radStart,
  visKilde = true,
  radFont = 13,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tittelSize?: number;
  sub: string;
  rader: typeof VIEWS;
  radH: number;
  radGap: number;
  radStart: number;
  visKilde?: boolean;
  radFont?: number;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={20} fill="var(--teal)" />
      <text x={cx} y={y + tittelSize * 1.7} textAnchor="middle" fontFamily="var(--font-serif)" fontSize={tittelSize} fill="var(--cream)">
        data products
      </text>
      <rect x={cx - 18} y={y + tittelSize * 1.7 + 13} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text x={cx} y={y + tittelSize * 1.7 + 40} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill={KREM_DUS}>
        {sub}
      </text>
      {rader.map((v, i) => (
        <ViewRadKompakt
          key={v.navn}
          x={x + 18}
          y={y + radStart + i * (radH + radGap)}
          w={w - 36}
          h={radH}
          navn={v.navn}
          kilde={visKilde ? v.kilde : undefined}
          fontSize={radFont}
        />
      ))}
    </g>
  );
}

/** Repo-brikken: burgunder med git-ikon */
function RepoBrikke({
  x,
  y,
  w,
  h,
  sub,
  fontSize = 14,
  ikonSize,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  sub?: string;
  fontSize?: number;
  ikonSize?: number;
}) {
  const ikon = ikonSize ?? Math.min(24, h - 24);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={14} fill="var(--burgundy)" />
      <g
        transform={`translate(14 ${(h - ikon) / 2}) scale(${ikon / 24})`}
        fill="none"
        stroke="var(--mint)"
        strokeWidth={1.8 * (24 / ikon)}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonGit />
      </g>
      <text x={14 + ikon + 12} y={sub ? h / 2 - 3 : h / 2 + fontSize * 0.36} fontFamily={MONO} fontSize={fontSize} fill="var(--cream)">
        kystverket/data-contracts
      </text>
      {sub && (
        <text x={14 + ikon + 12} y={h / 2 + 15} fontFamily="var(--font-sans)" fontSize={fontSize * 0.8} fill={KREM_DUS}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Utforsker-webappen som en liten nettleser-mock */
function Utforsker({
  x,
  y,
  w,
  h,
  sok,
  treff,
  kompakt = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  sok: string;
  treff: { navn: string; sub: string }[];
  kompakt?: boolean;
}) {
  const bar = kompakt ? 20 : 26;
  const feltH = kompakt ? 22 : 30;
  const feltW = kompakt ? w - 24 : Math.min(250, w * 0.42);
  const feltY = y + bar + (kompakt ? 10 : 14);
  const treffX = kompakt ? x + 12 : x + feltW + 40;
  const treffY0 = kompakt ? feltY + feltH + 12 : y + bar + 16;
  const treffGap = kompakt ? 24 : 34;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <path d={`M ${x} ${y + 12} A 12 12 0 0 1 ${x + 12} ${y} H ${x + w - 12} A 12 12 0 0 1 ${x + w} ${y + 12} V ${y + bar} H ${x} Z`} fill="var(--cream)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 14 + i * 12} cy={y + bar / 2} r={3.2} fill={i === 0 ? "var(--red)" : "var(--cream-dark)"} />
      ))}
      <text
        x={kompakt ? x + w - 10 : x + w / 2}
        y={y + bar / 2 + 4}
        textAnchor={kompakt ? "end" : "middle"}
        fontFamily={MONO}
        fontSize={kompakt ? 9.5 : 11}
        fill={SUB_FARGE}
      >
        {kompakt ? "explorer.kystverket.no" : "data-explorer.kystverket.no"}
      </text>

      {/* Søkefelt */}
      <rect x={x + 12} y={feltY} width={feltW} height={feltH} rx={feltH / 2} fill="var(--cream)" />
      <g fill="none" stroke={SUB_FARGE} strokeWidth={1.8} strokeLinecap="round">
        <circle cx={x + 12 + feltH / 2} cy={feltY + feltH / 2 - 1} r={feltH * 0.2} />
        <path d={`M ${x + 12 + feltH / 2 + feltH * 0.15} ${feltY + feltH / 2 + feltH * 0.14} l ${feltH * 0.18} ${feltH * 0.18}`} />
      </g>
      <text x={x + 12 + feltH + 4} y={feltY + feltH / 2 + 4.5} fontFamily={MONO} fontSize={kompakt ? 11 : 13} fill="var(--burgundy)">
        {sok}
        <tspan fill="var(--red)">|</tspan>
      </text>
      {!kompakt && (
        <text x={x + 12} y={feltY + feltH + 28} fontFamily="var(--font-sans)" fontSize={11} fill={SUB_FARGE}>
          owner · schema · quality checks · version
        </text>
      )}

      {/* Treff */}
      {treff.map((t, i) => {
        const ty = treffY0 + i * treffGap;
        return (
          <g key={t.navn}>
            <g fill="none" stroke="var(--teal)" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" transform={`translate(${treffX} ${ty}) scale(${kompakt ? 0.6 : 0.75})`}>
              <IkonView />
            </g>
            <text x={treffX + (kompakt ? 20 : 26)} y={ty + (kompakt ? 11 : 12)} fontFamily={MONO} fontSize={kompakt ? 10.5 : 12.5} fill="var(--burgundy)">
              {t.navn}
            </text>
            {!kompakt && (
              <text x={treffX + 26} y={ty + 26} fontFamily="var(--font-sans)" fontSize={10.5} fill={SUB_FARGE}>
                {t.sub}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

const TREFF = [
  { navn: "ais.tracks", sub: "owner ais · v3.0.2 · active · 3 quality checks" },
  { navn: "ais.emissions", sub: "owner ais · v1.4.0 · active · 5 quality checks" },
];

/* =====================================================================
 * 1. DOMENER OG KILDER – hvert domene henter inn sitt eget
 * ===================================================================== */

const K_RAD_Y = (i: number) => 60 + i * 126;
const K_RAD_H = 108;
const K_SYL_X = 320;
const K_SYL_W = 890;

export function DomenerKilder() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Every domain ingests its own sources into its own catalog, with bronze, silver and gold inside"
    >
      <PilDefs id="pil-kilder" />
      <PilDefs id="pil-kilder-mint" farge="var(--mint)" />
      <Pill cx={620} text="EVERY DOMAIN INGESTS ITS OWN SOURCES" w={440} />

      {DOMENER_MED_KILDER.map((d, i) => {
        const y = K_RAD_Y(i);
        const top = y + 13;
        const midt = y + K_RAD_H / 2;
        return (
          <g key={d.navn}>
            {/* Kildene inn */}
            <Steg at={1}>
              <KildeBrikke x={40} y={y + 12} w={230} kilde={d.kilder[0]} />
              <KildeBrikke x={40} y={y + 58} w={230} kilde={d.kilder[1]} />
              <path
                d={`M 272 ${y + 32} H 292 V ${y + 78} H 272`}
                fill="none"
                stroke="var(--red)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <Pil d={`M 292 ${midt} H 316`} marker="pil-kilder" />
            </Steg>

            {/* Domenekatalogen */}
            <Sylinder x={K_SYL_X} y={y} w={K_SYL_W} h={K_RAD_H}>
              <g fill="none" stroke="var(--mint)" strokeLinecap="round" strokeLinejoin="round">
                <IkonI navn={d.ikon} x={K_SYL_X + 26} y={top + 26} size={26} strokeWidth={1.7} />
              </g>
              <text x={K_SYL_X + 66} y={top + 46} fontFamily={MONO} fontSize={18} fill="var(--cream)">
                {d.navn}
              </text>
              <text x={K_SYL_X + 66} y={top + 68} fontFamily="var(--font-sans)" fontSize={11.5} fill={KREM_DUS}>
                own team · own cost center · own stewardship
              </text>

              {/* Medaljongen inne i katalogen */}
              <Steg at={2}>
                {LAG.map((lag, j) => {
                  const lx = K_SYL_X + 390 + j * 170;
                  const ly = top + 22;
                  return (
                    <g key={lag.navn}>
                      <rect x={lx} y={ly} width={140} height={36} rx={10} fill="rgba(251, 240, 229, 0.08)" stroke={MINT_DUS} strokeWidth={1} />
                      <rect x={lx + 10} y={ly + 9} width={5} height={18} rx={2.5} fill={lag.farge} />
                      <text x={lx + 26} y={ly + 23.5} fontFamily={MONO} fontSize={14} fill="var(--cream)">
                        {lag.navn}
                      </text>
                      <text x={lx + 70} y={ly + 56} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={10.5} fill={KREM_DUS}>
                        {lag.sub}
                      </text>
                      {j < LAG.length - 1 && (
                        <Pil d={`M ${lx + 146} ${ly + 18} H ${lx + 166}`} marker="pil-kilder-mint" farge="var(--mint)" strokeWidth={1.6} />
                      )}
                    </g>
                  );
                })}
              </Steg>
            </Sylinder>
          </g>
        );
      })}

      <Steg at={3}>
        <text x={620} y={608} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={15.5} fill="var(--red)">
          Ingest, clean and refine – inside the domain. Nobody touches another domain’s raw data.
        </text>
      </Steg>
    </svg>
  );
}

/* =====================================================================
 * 3. FORBRUK – katalogen er organisasjonens data, og utforskeren er
 *    måten man finner fram
 * ===================================================================== */

const F_KAT = { x: 470, y: 60, w: 300, h: 380 };
const F_DOM_X = 60;
const F_DOM_W = 240;
const F_DOM_H = 78;
const F_DOM_Y = (i: number) => 70 + i * 95;
const F_KONS_X = 900;
const F_KONS_W = 300;
const F_KONS_H = 56;
const F_KONS_Y = (i: number) => 80 + i * 72;
const F_UTF = { x: 330, y: 470, w: 580, h: 120 };
const F_REPO = { x: 36, y: 490, w: 254, h: 78 };

/** Hvilke domener som leser hva tilbake: [domene-indeks, view-indeks] */
const TILBAKE: [number, number][] = [
  [0, 0], // customs leser ais.tracks
  [1, 2], // ais leser customs.declarations
  [3, 3], // lighthouses leser hr_and_finance.costs
];

export function ProduktForbruk() {
  const step = useStep();
  const radH = 42;
  const radGap = 8;
  const radStart = 110;
  const viewY = (i: number) => F_KAT.y + radStart + i * (radH + radGap) + radH / 2;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="The data products catalog in the middle: domains read each other's products back, consumers outside read from the same catalog, and a data explorer built from the contracts is how you find things"
    >
      <PilDefs id="pil-forbruk" />
      <PilDefs id="pil-forbruk-teal" farge={TEAL_LINJE} />
      <Pill cx={180} text="DOMAINS" w={130} />
      <Pill cx={620} text="THE ORGANIZATION’S DATA" w={260} />
      <Pill cx={1050} text="CONSUMERS" w={150} />

      {/* Domenene til venstre */}
      {DOMENER_MED_KILDER.map((d, i) => {
        const y = F_DOM_Y(i);
        const top = y + 11;
        const leser = step >= 1 && TILBAKE.some(([di]) => di === i);
        return (
          <Sylinder key={d.navn} x={F_DOM_X} y={y} w={F_DOM_W} h={F_DOM_H} ry={11} uthevet={leser}>
            <g fill="none" stroke="var(--mint)" strokeLinecap="round" strokeLinejoin="round">
              <IkonI navn={d.ikon} x={F_DOM_X + 20} y={top + 20} size={22} strokeWidth={1.7} />
            </g>
            <text x={F_DOM_X + 54} y={top + 36} fontFamily={MONO} fontSize={15} fill="var(--cream)">
              {d.navn}
            </text>
            <text x={F_DOM_X + 54} y={top + 54} fontFamily="var(--font-sans)" fontSize={10.5} fill={KREM_DUS}>
              own catalog · bronze / silver / gold
            </text>
          </Sylinder>
        );
      })}

      {/* Katalogen i midten */}
      <ProduktKatalog
        x={F_KAT.x}
        y={F_KAT.y}
        w={F_KAT.w}
        h={F_KAT.h}
        sub="consumable quality data"
        rader={VIEWS}
        radH={radH}
        radGap={radGap}
        radStart={radStart}
        visKilde={false}
        radFont={13.5}
      />

      {/* Domenene leser tilbake */}
      <Steg at={1}>
        {TILBAKE.map(([di, vi]) => {
          const fraY = viewY(vi);
          const tilY = F_DOM_Y(di) + F_DOM_H / 2;
          const x0 = F_KAT.x;
          const x1 = F_DOM_X + F_DOM_W + 6;
          const cx = (x0 + x1) / 2;
          return (
            <Pil
              key={`${di}-${vi}`}
              d={`M ${x0} ${fraY} C ${cx} ${fraY}, ${cx} ${tilY}, ${x1} ${tilY}`}
              marker="pil-forbruk-teal"
              farge={TEAL_LINJE}
              strokeWidth={1.6}
              dash="2 6"
            />
          );
        })}
        <text x={385} y={452} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill={SUB_FARGE}>
          domains read each other’s products
        </text>
        <text x={385} y={467} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill={SUB_FARGE}>
          through the catalog – never the gold tables
        </text>
      </Steg>

      {/* Konsumentene utenfor */}
      <Steg at={2}>
        {KONSUMENTER.map((k, i) => {
          const y = F_KONS_Y(i);
          const midt = y + F_KONS_H / 2;
          return (
            <g key={k.navn}>
              <Pil d={`M ${F_KAT.x + F_KAT.w + 2} ${midt} H ${F_KONS_X - 6}`} marker="pil-forbruk" />
              <rect x={F_KONS_X} y={y} width={F_KONS_W} height={F_KONS_H} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
              <g fill="none" stroke="var(--red)" strokeLinecap="round" strokeLinejoin="round">
                <IkonI navn={k.ikon} x={F_KONS_X + 16} y={y + 16} size={24} strokeWidth={1.7} />
              </g>
              <text x={F_KONS_X + 54} y={y + 24} fontFamily="var(--font-sans)" fontWeight={600} fontSize={14} fill="var(--burgundy)">
                {k.navn}
              </text>
              <text x={F_KONS_X + 54} y={y + 41} fontFamily="var(--font-sans)" fontSize={11} fill={SUB_FARGE}>
                {k.sub}
              </text>
            </g>
          );
        })}
      </Steg>

      {/* Utforskeren, bygget på kontraktene i repoet */}
      <Steg at={3}>
        <RepoBrikke x={F_REPO.x} y={F_REPO.y} w={F_REPO.w} h={F_REPO.h} sub="every contract, every version" fontSize={12} />
        <Pil d={`M ${F_REPO.x + F_REPO.w + 2} ${F_REPO.y + F_REPO.h / 2} H ${F_UTF.x - 4}`} marker="pil-forbruk" />
        <text x={(F_REPO.x + F_REPO.w + F_UTF.x) / 2} y={F_REPO.y + F_REPO.h / 2 - 9} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill="var(--red)">
          reads
        </text>
        <Utforsker x={F_UTF.x} y={F_UTF.y} w={F_UTF.w} h={F_UTF.h} sok="ais" treff={TREFF} />
        <text x={F_UTF.x + F_UTF.w + 14} y={F_UTF.y + 40} fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
          a small web app
        </text>
        <text x={F_UTF.x + F_UTF.w + 14} y={F_UTF.y + 57} fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
          built from the contracts:
        </text>
        <text x={F_UTF.x + F_UTF.w + 14} y={F_UTF.y + 74} fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
          search, find, understand
        </text>
      </Steg>

      {/* Funnet → lest fra katalogen */}
      <Steg at={4}>
        <Pil d={`M 620 ${F_UTF.y - 2} V ${F_KAT.y + F_KAT.h + 4}`} marker="pil-forbruk" />
        <text x={632} y={F_KAT.y + F_KAT.h + 20} fontFamily={MONO} fontSize={11} fill="var(--red)">
          found it → query it
        </text>
        <text x={620} y={624} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={15.5} fill="var(--red)">
          Find it in the explorer. Read it from the catalog. Inside and outside the organization.
        </text>
      </Steg>
    </svg>
  );
}

/* =====================================================================
 * 4. HELE PLATTFORMEN – alt sammen, zoomet ut
 * ===================================================================== */

const HP_W = 1280;
const HP_H = 720;

const H_KILDE = { x: 24, w: 100, h: 34 };
const H_DOM_X = 148;
const H_DOM_W = 236;
const H_DOM_H = 118;
const H_DOM_Y = (i: number) => 52 + i * 156;
const H_KTR = { x: 424, y: 52, w: 208, h: 118 };
const H_REPO = { x: 424, y: 214, w: 208, h: 66 };
const H_UTF = { x: 424, y: 324, w: 208, h: 200 };
const H_KAT = { x: 692, y: 48, w: 260, h: 590 };
const H_KONS_X = 996;
const H_KONS_W = 256;
const H_KONS_H = 80;
const H_KONS_Y = (i: number) => 52 + i * 126;

const KONTRAKT_KORT: [string, string][] = [
  ["kind:", " DataContract"],
  ["id:", " ais.tracks"],
  ["domain:", " ais"],
  ["schema:", " …"],
];

export function HelePlattformen() {
  const step = useStep();
  const aisY = H_DOM_Y(1) + H_DOM_H / 2;
  const katMidtX = H_KAT.x + H_KAT.w / 2;
  const domMidtX = H_DOM_X + H_DOM_W / 2;
  const domBunn = H_DOM_Y(3) + H_DOM_H;
  return (
    <svg
      viewBox={`0 0 ${HP_W} ${HP_H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="The whole picture: sources into domain databases, contracts through git and CI into the data products catalog, consumers inside and outside reading from it, and an explorer built from the contracts"
    >
      <PilDefs id="pil-hel" />
      <PilDefs id="pil-hel-teal" farge={TEAL_LINJE} />

      <Steg at={1}>
        <Pill cx={domMidtX} text="DOMAIN DATABASES" w={186} />
      </Steg>
      <Steg at={2}>
        <Pill cx={H_KILDE.x + H_KILDE.w / 2} text="SOURCES" w={100} />
      </Steg>
      <Steg at={4}>
        <Pill cx={H_KTR.x + H_KTR.w / 2} text="CONTRACTS" w={120} />
      </Steg>
      <Steg at={6}>
        <Pill cx={katMidtX} text="DATA PRODUCTS" w={160} />
      </Steg>
      <Steg at={7}>
        <Pill cx={H_KONS_X + H_KONS_W / 2} text="CONSUMERS" w={130} />
      </Steg>

      {/* 1. Domenene */}
      <Steg at={1}>
        {DOMENER_MED_KILDER.map((d, i) => {
          const y = H_DOM_Y(i);
          const top = y + 11;
          return (
            <Sylinder key={d.navn} x={H_DOM_X} y={y} w={H_DOM_W} h={H_DOM_H} ry={13} uthevet={i === 1 && step >= 4}>
              <g fill="none" stroke="var(--mint)" strokeLinecap="round" strokeLinejoin="round">
                <IkonI navn={d.ikon} x={H_DOM_X + 20} y={top + 16} size={22} strokeWidth={1.7} />
              </g>
              <text x={H_DOM_X + 52} y={top + 33} fontFamily={MONO} fontSize={15} fill="var(--cream)">
                {d.navn}
              </text>
            </Sylinder>
          );
        })}
      </Steg>

      {/* 2. Kildene inn i domenene */}
      <Steg at={2}>
        {DOMENER_MED_KILDER.map((d, i) => {
          const y = H_DOM_Y(i);
          const midt = y + H_DOM_H / 2;
          return (
            <g key={d.navn}>
              {d.kilder.map((k, j) => {
                const ky = y + 18 + j * 48;
                return (
                  <g key={k.navn}>
                    <rect x={H_KILDE.x} y={ky} width={H_KILDE.w} height={H_KILDE.h} rx={10} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.3} />
                    <g fill="none" stroke="var(--red)" strokeLinecap="round" strokeLinejoin="round">
                      <IkonI navn={k.ikon} x={H_KILDE.x + 8} y={ky + 8} size={18} strokeWidth={1.7} />
                    </g>
                    <text x={H_KILDE.x + 30} y={ky + 21} fontFamily="var(--font-sans)" fontSize={9.5} fill="var(--burgundy)">
                      {k.kort}
                    </text>
                  </g>
                );
              })}
              <Pil d={`M ${H_KILDE.x + H_KILDE.w + 2} ${midt} H ${H_DOM_X - 4}`} marker="pil-hel" strokeWidth={1.5} />
            </g>
          );
        })}
      </Steg>

      {/* 3. Bronze / silver / gold inne i domenene */}
      <Steg at={3}>
        {DOMENER_MED_KILDER.map((d, i) => {
          const top = H_DOM_Y(i) + 11;
          return (
            <g key={d.navn}>
              {LAG.map((lag, j) => (
                <g key={lag.navn}>
                  <rect x={H_DOM_X + 48 + j * 58} y={top + 68} width={50} height={16} rx={8} fill="rgba(251, 240, 229, 0.08)" stroke={MINT_DUS} strokeWidth={0.8} />
                  <circle cx={H_DOM_X + 57 + j * 58} cy={top + 76} r={3.5} fill={lag.farge} />
                  <text x={H_DOM_X + 65 + j * 58} y={top + 79.5} fontFamily={MONO} fontSize={9.5} fill={KREM_DUS}>
                    {lag.navn}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </Steg>

      {/* 4. Kontrakten */}
      <Steg at={4}>
        <path
          d={`M ${H_DOM_X + H_DOM_W} ${aisY} C 395 ${aisY}, 395 ${H_KTR.y + H_KTR.h / 2}, ${H_KTR.x} ${H_KTR.y + H_KTR.h / 2}`}
          fill="none"
          stroke={LINJE_FARGE}
          strokeWidth={1.5}
          strokeDasharray="1.5 6"
          strokeLinecap="round"
        />
        <g transform={`translate(${H_KTR.x} ${H_KTR.y})`}>
          <rect width={H_KTR.w} height={H_KTR.h} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
          <path d={`M 0 12 A 12 12 0 0 1 12 0 H ${H_KTR.w - 12} A 12 12 0 0 1 ${H_KTR.w} 12 V 26 H 0 Z`} fill="var(--cream)" />
          <g transform="translate(9 4) scale(0.75)" fill="none" stroke={SUB_FARGE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <IkonFil />
          </g>
          <text x={32} y={17.5} fontFamily={MONO} fontSize={10} fill={SUB_FARGE}>
            ais.tracks.odcs.yaml
          </text>
          {KONTRAKT_KORT.map(([k, v], i) => (
            <text key={k} x={14} y={44 + i * 16} fontFamily={MONO} fontSize={10.5} style={{ whiteSpace: "pre" }}>
              <tspan fill={SUB_FARGE}>{k}</tspan>
              <tspan fill="var(--burgundy)">{v}</tspan>
            </text>
          ))}
        </g>
      </Steg>

      {/* 5. Git */}
      <Steg at={5}>
        <Pil d={`M ${H_KTR.x + H_KTR.w / 2} ${H_KTR.y + H_KTR.h + 2} V ${H_REPO.y - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={H_KTR.x + H_KTR.w / 2 + 10} y={H_KTR.y + H_KTR.h + 26} fontFamily={MONO} fontSize={10} fill="var(--red)">
          git push
        </text>
        <RepoBrikke x={H_REPO.x} y={H_REPO.y} w={H_REPO.w} h={H_REPO.h} fontSize={10} ikonSize={18} sub="PR · CI checks" />
      </Steg>

      {/* 6. Dataprodukter */}
      <Steg at={6}>
        <Pil d={`M ${H_REPO.x + H_REPO.w + 2} ${H_REPO.y + H_REPO.h / 2} H ${H_KAT.x - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={(H_REPO.x + H_REPO.w + H_KAT.x) / 2} y={H_REPO.y + H_REPO.h / 2 - 8} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={9.5} fill="var(--red)">
          CI → view
        </text>
        <ProduktKatalog
          x={H_KAT.x}
          y={H_KAT.y}
          w={H_KAT.w}
          h={H_KAT.h}
          tittelSize={26}
          sub="consumable quality data"
          rader={VIEWS}
          radH={82}
          radGap={18}
          radStart={100}
          visKilde
          radFont={12}
        />
      </Steg>

      {/* 7. Konsumentene */}
      <Steg at={7}>
        {KONSUMENTER.map((k, i) => {
          const y = H_KONS_Y(i);
          const midt = y + H_KONS_H / 2;
          return (
            <g key={k.navn}>
              <Pil d={`M ${H_KAT.x + H_KAT.w + 2} ${midt} H ${H_KONS_X - 5}`} marker="pil-hel" strokeWidth={1.6} />
              <rect x={H_KONS_X} y={y} width={H_KONS_W} height={H_KONS_H} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
              <g fill="none" stroke="var(--red)" strokeLinecap="round" strokeLinejoin="round">
                <IkonI navn={k.ikon} x={H_KONS_X + 16} y={y + 26} size={26} strokeWidth={1.7} />
              </g>
              <text x={H_KONS_X + 54} y={y + 34} fontFamily="var(--font-sans)" fontWeight={600} fontSize={14} fill="var(--burgundy)">
                {k.navn}
              </text>
              <text x={H_KONS_X + 54} y={y + 52} fontFamily="var(--font-sans)" fontSize={11} fill={SUB_FARGE}>
                {k.sub}
              </text>
            </g>
          );
        })}
      </Steg>

      {/* 8. Domenene leser tilbake */}
      <Steg at={8}>
        <Pil
          d={`M ${katMidtX} ${H_KAT.y + H_KAT.h + 2} V 668 H ${domMidtX} V ${domBunn + 5}`}
          marker="pil-hel-teal"
          farge={TEAL_LINJE}
          strokeWidth={1.6}
          dash="2 6"
        />
        <text x={(katMidtX + domMidtX) / 2} y={702} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={SUB_FARGE}>
          the domains read each other’s products back – through the catalog
        </text>
      </Steg>

      {/* 9. Utforskeren */}
      <Steg at={9}>
        <Pil d={`M ${H_REPO.x + H_REPO.w / 2} ${H_REPO.y + H_REPO.h + 2} V ${H_UTF.y - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={H_REPO.x + H_REPO.w / 2 + 10} y={H_REPO.y + H_REPO.h + 28} fontFamily={MONO} fontSize={10} fill="var(--red)">
          reads
        </text>
        <Utforsker x={H_UTF.x} y={H_UTF.y} w={H_UTF.w} h={H_UTF.h} sok="ais" treff={TREFF} kompakt />
        <Pil d={`M ${H_UTF.x + H_UTF.w + 2} ${H_UTF.y + H_UTF.h / 2} H ${H_KAT.x - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={(H_UTF.x + H_UTF.w + H_KAT.x) / 2} y={H_UTF.y + H_UTF.h / 2 - 8} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={9.5} fill="var(--red)">
          find → query
        </text>
      </Steg>
    </svg>
  );
}
