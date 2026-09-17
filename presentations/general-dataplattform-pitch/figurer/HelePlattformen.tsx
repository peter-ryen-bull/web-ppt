"use client";

import type { ReactNode } from "react";
import { useStep } from "@/components/steps";

/*
 * Helhetsbildet fra NDC/TDC («hvor vi skal»), tilpasset den generelle
 * pitchen. Samme oppbygging og klikk-steg: domener, kilder, medaljong,
 * kontrakt, git, dataprodukter, konsumenter, tilbakelesing, utforsker.
 *
 * Eksemplene er de samme fire domenene som på domenesliden – ikke
 * Kystverket. Ren SVG, viewBox 1280×720, Miles-palett.
 */

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const KREM_DUS = "rgba(251, 240, 229, 0.72)";
const MINT_DUS = "rgba(120, 232, 219, 0.35)";
const TEAL_LINJE = "rgba(0, 64, 71, 0.55)";
const BRONSE = "#b5773f";
const SOLV = "#9ea7ae";
const GULL = "#d3a53a";

type IkonNavn =
  | "skjema"
  | "innboks"
  | "verktoy"
  | "puls"
  | "mynt"
  | "person"
  | "kode"
  | "soyler"
  | "gnist"
  | "deling"
  | "vindu";

const IKONER: Record<IkonNavn, ReactNode> = {
  skjema: (
    <>
      <path d="M6.5 3h7l4.5 4.5V21h-11.5z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 16.5h5" />
    </>
  ),
  innboks: (
    <>
      <path d="M12 3.5v10" />
      <path d="M8.5 10 12 13.5 15.5 10" />
      <path d="M3.5 15v3.5a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V15" />
    </>
  ),
  verktoy: (
    <path d="M14.5 4.5a4.5 4.5 0 0 0 5 6L9.5 20.5a2.1 2.1 0 0 1-3-3L16.5 7.5a4.5 4.5 0 0 0-2-3z" />
  ),
  puls: <path d="M2.5 12h4L9 6l4 12 2.5-6h6" />,
  mynt: (
    <>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M9 8.5v7" />
      <path d="M9 12.2c2 0 3.5-1.2 3.5-3.7" />
      <path d="M9 12c1.5 0 2.8 1.2 3.8 3.5" />
    </>
  ),
  person: (
    <>
      <circle cx={12} cy={8} r={3.5} />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  kode: (
    <>
      <path d="M8.5 6.5 3.5 12l5 5.5" />
      <path d="M15.5 6.5l5 5.5-5 5.5" />
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
  gnist: <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />,
  deling: (
    <>
      <circle cx={6} cy={12} r={2.8} />
      <circle cx={18} cy={5.5} r={2.8} />
      <circle cx={18} cy={18.5} r={2.8} />
      <path d="M8.5 10.6l7-3.7" />
      <path d="M8.5 13.4l7 3.7" />
    </>
  ),
  vindu: (
    <>
      <rect x={3.5} y={5} width={17} height={14.5} rx={2} />
      <path d="M3.5 9.5h17" />
    </>
  ),
};

function IkonI({
  navn,
  x,
  y,
  size = 24,
  strokeWidth = 1.7,
}: {
  navn: IkonNavn;
  x: number;
  y: number;
  size?: number;
  strokeWidth?: number;
}) {
  const s = size / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={strokeWidth / s}>
      {IKONER[navn]}
    </g>
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

function PilDefs({ id, farge = "var(--red)" }: { id: string; farge?: string }) {
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
        <path d="M 0 0 L 10 5 L 0 10 z" fill={farge} />
      </marker>
    </defs>
  );
}

function Pil({
  d,
  marker,
  farge = "var(--red)",
  strokeWidth = 1.8,
  dash,
}: {
  d: string;
  marker: string;
  farge?: string;
  strokeWidth?: number;
  dash?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={farge}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dash}
      markerEnd={`url(#${marker})`}
    />
  );
}

type Kilde = { navn: string; kort: string; ikon: IkonNavn };
type Domene = { navn: string; ikon: IkonNavn; kilder: Kilde[] };

const DOMENER: Domene[] = [
  {
    navn: "sales",
    ikon: "skjema",
    kilder: [
      { navn: "CRM", kort: "CRM", ikon: "skjema" },
      { navn: "ordre", kort: "ordre", ikon: "innboks" },
    ],
  },
  {
    navn: "operations",
    ikon: "verktoy",
    kilder: [
      { navn: "fagsystem", kort: "fagsystem", ikon: "verktoy" },
      { navn: "kapasitet", kort: "kapasitet", ikon: "puls" },
    ],
  },
  {
    navn: "finance",
    ikon: "mynt",
    kilder: [
      { navn: "lønn", kort: "lønn", ikon: "person" },
      { navn: "hovedbok", kort: "hovedbok", ikon: "mynt" },
    ],
  },
  {
    navn: "product",
    ikon: "kode",
    kilder: [
      { navn: "bruksdata", kort: "bruksdata", ikon: "soyler" },
      { navn: "apper", kort: "apper", ikon: "vindu" },
    ],
  },
];

const LAG: { navn: string; farge: string }[] = [
  { navn: "bronze", farge: BRONSE },
  { navn: "silver", farge: SOLV },
  { navn: "gold", farge: GULL },
];

const VIEWS: { navn: string; kilde: string }[] = [
  { navn: "sales.customers", kilde: "view → sales.gold.customers" },
  { navn: "sales.orders", kilde: "view → sales.gold.orders" },
  { navn: "operations.deliveries", kilde: "view → operations.gold.deliveries" },
  { navn: "finance.ledger", kilde: "view → finance.gold.ledger" },
  { navn: "product.usage", kilde: "view → product.gold.usage" },
];

const KONSUMENTER: { navn: string; sub: string; ikon: IkonNavn }[] = [
  { navn: "Ledelse", sub: "styrerapporter · KPI", ikon: "person" },
  { navn: "Dashbord og BI", sub: "analytikere i hele virksomheten", ikon: "soyler" },
  { navn: "Apper og API", sub: "utviklere, portaler, integrasjoner", ikon: "kode" },
  { navn: "KI-chat", sub: "spørsmål mot egne data", ikon: "gnist" },
  { navn: "Partnere", sub: "styrt deling ut av huset", ikon: "deling" },
];

const KONTRAKT_KORT: [string, string][] = [
  ["kind:", " DataContract"],
  ["id:", " sales.customers"],
  ["domain:", " sales"],
  ["schema:", " …"],
];

const TREFF = [
  { navn: "sales.customers", sub: "eier sales · v2.1.0 · aktiv" },
  { navn: "sales.orders", sub: "eier sales · v3.0.1 · aktiv" },
];

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
      <ellipse
        cx={cx}
        cy={top}
        rx={rx}
        ry={ry}
        fill="color-mix(in srgb, var(--teal) 72%, var(--mint))"
      />
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
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="rgba(251, 240, 229, 0.08)"
        stroke={MINT_DUS}
        strokeWidth={1}
      />
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
          <text
            x={x + 11 + ikon + 9}
            y={y + h / 2 + 12}
            fontFamily="var(--font-sans)"
            fontSize={fontSize * 0.78}
            fill={KREM_DUS}
          >
            {kilde}
          </text>
        </>
      ) : (
        <text
          x={x + 11 + ikon + 9}
          y={y + h / 2 + fontSize * 0.36}
          fontFamily={MONO}
          fontSize={fontSize}
          fill="var(--cream)"
        >
          {navn}
        </text>
      )}
    </g>
  );
}

function ProduktKatalog({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const cx = x + w / 2;
  const tittelSize = 26;
  const radH = 82;
  const radGap = 18;
  const radStart = 100;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={20} fill="var(--teal)" />
      <text
        x={cx}
        y={y + tittelSize * 1.7}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={tittelSize}
        fill="var(--cream)"
      >
        dataprodukter
      </text>
      <rect x={cx - 18} y={y + tittelSize * 1.7 + 13} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text
        x={cx}
        y={y + tittelSize * 1.7 + 40}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={12.5}
        fill={KREM_DUS}
      >
        kvalitetsdata, klare til bruk
      </text>
      {VIEWS.map((v, i) => (
        <ViewRadKompakt
          key={v.navn}
          x={x + 18}
          y={y + radStart + i * (radH + radGap)}
          w={w - 36}
          h={radH}
          navn={v.navn}
          kilde={v.kilde}
          fontSize={12}
        />
      ))}
    </g>
  );
}

function RepoBrikke({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const ikon = 18;
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
      <text x={14 + ikon + 12} y={h / 2 - 3} fontFamily={MONO} fontSize={10} fill="var(--cream)">
        org/data-contracts
      </text>
      <text x={14 + ikon + 12} y={h / 2 + 15} fontFamily="var(--font-sans)" fontSize={8} fill={KREM_DUS}>
        PR · CI-sjekker
      </text>
    </g>
  );
}

function Utforsker({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const bar = 20;
  const feltH = 22;
  const feltW = w - 24;
  const feltY = y + bar + 10;
  const treffX = x + 12;
  const treffY0 = feltY + feltH + 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <path
        d={`M ${x} ${y + 12} A 12 12 0 0 1 ${x + 12} ${y} H ${x + w - 12} A 12 12 0 0 1 ${x + w} ${y + 12} V ${y + bar} H ${x} Z`}
        fill="var(--cream)"
      />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 14 + i * 12} cy={y + bar / 2} r={3.2} fill={i === 0 ? "var(--red)" : "var(--cream-dark)"} />
      ))}
      <text x={x + w - 10} y={y + bar / 2 + 4} textAnchor="end" fontFamily={MONO} fontSize={9.5} fill={SUB_FARGE}>
        data-explorer
      </text>
      <rect x={x + 12} y={feltY} width={feltW} height={feltH} rx={feltH / 2} fill="var(--cream)" />
      <g fill="none" stroke={SUB_FARGE} strokeWidth={1.8} strokeLinecap="round">
        <circle cx={x + 12 + feltH / 2} cy={feltY + feltH / 2 - 1} r={feltH * 0.2} />
        <path
          d={`M ${x + 12 + feltH / 2 + feltH * 0.15} ${feltY + feltH / 2 + feltH * 0.14} l ${feltH * 0.18} ${feltH * 0.18}`}
        />
      </g>
      <text x={x + 12 + feltH + 4} y={feltY + feltH / 2 + 4.5} fontFamily={MONO} fontSize={11} fill="var(--burgundy)">
        sales
        <tspan fill="var(--red)">|</tspan>
      </text>
      {TREFF.map((t, i) => {
        const ty = treffY0 + i * 24;
        return (
          <g key={t.navn}>
            <g
              fill="none"
              stroke="var(--teal)"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${treffX} ${ty}) scale(0.6)`}
            >
              <IkonView />
            </g>
            <text x={treffX + 20} y={ty + 11} fontFamily={MONO} fontSize={10.5} fill="var(--burgundy)">
              {t.navn}
            </text>
          </g>
        );
      })}
    </g>
  );
}

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

export function HelePlattformen() {
  const step = useStep();
  const salesY = H_DOM_Y(0) + H_DOM_H / 2;
  const katMidtX = H_KAT.x + H_KAT.w / 2;
  const domMidtX = H_DOM_X + H_DOM_W / 2;
  const domBunn = H_DOM_Y(3) + H_DOM_H;
  return (
    <svg
      viewBox={`0 0 ${HP_W} ${HP_H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Hele bildet: kilder inn i domenedatabaser, kontrakter via git og CI inn i dataprodukt-katalogen, konsumenter som leser fra den, og en utforsker bygget på kontraktene"
    >
      <PilDefs id="pil-hel" />
      <PilDefs id="pil-hel-teal" farge={TEAL_LINJE} />

      <Steg at={1}>
        <Pill cx={domMidtX} text="DOMENEDATABASER" w={186} />
      </Steg>
      <Steg at={2}>
        <Pill cx={H_KILDE.x + H_KILDE.w / 2} text="KILDER" w={100} />
      </Steg>
      <Steg at={4}>
        <Pill cx={H_KTR.x + H_KTR.w / 2} text="KONTRAKTER" w={120} />
      </Steg>
      <Steg at={6}>
        <Pill cx={katMidtX} text="DATAPRODUKTER" w={160} />
      </Steg>
      <Steg at={7}>
        <Pill cx={H_KONS_X + H_KONS_W / 2} text="KONSUMENTER" w={130} />
      </Steg>

      <Steg at={1}>
        {DOMENER.map((d, i) => {
          const y = H_DOM_Y(i);
          const top = y + 11;
          return (
            <Sylinder key={d.navn} x={H_DOM_X} y={y} w={H_DOM_W} h={H_DOM_H} ry={13} uthevet={i === 0 && step >= 4}>
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

      <Steg at={2}>
        {DOMENER.map((d, i) => {
          const y = H_DOM_Y(i);
          const midt = y + H_DOM_H / 2;
          return (
            <g key={d.navn}>
              {d.kilder.map((k, j) => {
                const ky = y + 18 + j * 48;
                return (
                  <g key={k.navn}>
                    <rect
                      x={H_KILDE.x}
                      y={ky}
                      width={H_KILDE.w}
                      height={H_KILDE.h}
                      rx={10}
                      fill="#fff"
                      stroke="var(--cream-dark)"
                      strokeWidth={1.3}
                    />
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

      <Steg at={3}>
        {DOMENER.map((d, i) => {
          const top = H_DOM_Y(i) + 11;
          const barX = H_DOM_X + 14;
          const barW = H_DOM_W - 28;
          const barY = top + 64;
          const barH = 22;
          const slotW = barW / LAG.length;
          return (
            <g key={d.navn}>
              <rect
                x={barX}
                y={barY}
                width={barW}
                height={barH}
                rx={barH / 2}
                fill="rgba(251, 240, 229, 0.08)"
                stroke={MINT_DUS}
                strokeWidth={0.8}
              />
              {LAG.map((lag, j) => {
                const labelW = lag.navn.length * 5.85;
                const groupW = 8 + 5 + labelW;
                const gx = barX + slotW * j + (slotW - groupW) / 2;
                return (
                  <g key={lag.navn}>
                    <circle cx={gx + 4} cy={barY + barH / 2} r={3.5} fill={lag.farge} />
                    <text x={gx + 13} y={barY + barH / 2 + 3.6} fontFamily={MONO} fontSize={10} fill={KREM_DUS}>
                      {lag.navn}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </Steg>

      <Steg at={4}>
        <path
          d={`M ${H_DOM_X + H_DOM_W} ${salesY} C 395 ${salesY}, 395 ${H_KTR.y + H_KTR.h / 2}, ${H_KTR.x} ${H_KTR.y + H_KTR.h / 2}`}
          fill="none"
          stroke={LINJE_FARGE}
          strokeWidth={1.5}
          strokeDasharray="1.5 6"
          strokeLinecap="round"
        />
        <g transform={`translate(${H_KTR.x} ${H_KTR.y})`}>
          <rect width={H_KTR.w} height={H_KTR.h} rx={12} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
          <path
            d={`M 0 12 A 12 12 0 0 1 12 0 H ${H_KTR.w - 12} A 12 12 0 0 1 ${H_KTR.w} 12 V 26 H 0 Z`}
            fill="var(--cream)"
          />
          <g
            transform="translate(9 4) scale(0.75)"
            fill="none"
            stroke={SUB_FARGE}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <IkonFil />
          </g>
          <text x={32} y={17.5} fontFamily={MONO} fontSize={10} fill={SUB_FARGE}>
            sales.customers.odcs.yaml
          </text>
          {KONTRAKT_KORT.map(([k, v], i) => (
            <text key={k} x={14} y={44 + i * 16} fontFamily={MONO} fontSize={10.5} style={{ whiteSpace: "pre" }}>
              <tspan fill={SUB_FARGE}>{k}</tspan>
              <tspan fill="var(--burgundy)">{v}</tspan>
            </text>
          ))}
        </g>
      </Steg>

      <Steg at={5}>
        <Pil d={`M ${H_KTR.x + H_KTR.w / 2} ${H_KTR.y + H_KTR.h + 2} V ${H_REPO.y - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={H_KTR.x + H_KTR.w / 2 + 10} y={H_KTR.y + H_KTR.h + 26} fontFamily={MONO} fontSize={10} fill="var(--red)">
          git push
        </text>
        <RepoBrikke x={H_REPO.x} y={H_REPO.y} w={H_REPO.w} h={H_REPO.h} />
      </Steg>

      <Steg at={6}>
        <Pil d={`M ${H_REPO.x + H_REPO.w + 2} ${H_REPO.y + H_REPO.h / 2} H ${H_KAT.x - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text
          x={(H_REPO.x + H_REPO.w + H_KAT.x) / 2}
          y={H_REPO.y + H_REPO.h / 2 - 8}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={9.5}
          fill="var(--red)"
        >
          CI → view
        </text>
        <ProduktKatalog x={H_KAT.x} y={H_KAT.y} w={H_KAT.w} h={H_KAT.h} />
      </Steg>

      <Steg at={7}>
        {KONSUMENTER.map((k, i) => {
          const y = H_KONS_Y(i);
          const midt = y + H_KONS_H / 2;
          return (
            <g key={k.navn}>
              <Pil d={`M ${H_KAT.x + H_KAT.w + 2} ${midt} H ${H_KONS_X - 5}`} marker="pil-hel" strokeWidth={1.6} />
              <rect
                x={H_KONS_X}
                y={y}
                width={H_KONS_W}
                height={H_KONS_H}
                rx={12}
                fill="#fff"
                stroke="var(--cream-dark)"
                strokeWidth={1.5}
              />
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

      <Steg at={8}>
        <Pil
          d={`M ${katMidtX} ${H_KAT.y + H_KAT.h + 2} V 668 H ${domMidtX} V ${domBunn + 5}`}
          marker="pil-hel-teal"
          farge={TEAL_LINJE}
          strokeWidth={1.6}
          dash="2 6"
        />
        <text x={(katMidtX + domMidtX) / 2} y={702} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={SUB_FARGE}>
          domenene leser hverandres produkter tilbake – via katalogen
        </text>
      </Steg>

      <Steg at={9}>
        <Pil d={`M ${H_REPO.x + H_REPO.w / 2} ${H_REPO.y + H_REPO.h + 2} V ${H_UTF.y - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text x={H_REPO.x + H_REPO.w / 2 + 10} y={H_REPO.y + H_REPO.h + 28} fontFamily={MONO} fontSize={10} fill="var(--red)">
          leser
        </text>
        <Utforsker x={H_UTF.x} y={H_UTF.y} w={H_UTF.w} h={H_UTF.h} />
        <Pil d={`M ${H_UTF.x + H_UTF.w + 2} ${H_UTF.y + H_UTF.h / 2} H ${H_KAT.x - 4}`} marker="pil-hel" strokeWidth={1.6} />
        <text
          x={(H_UTF.x + H_UTF.w + H_KAT.x) / 2}
          y={H_UTF.y + H_UTF.h / 2 - 8}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={9.5}
          fill="var(--red)"
        >
          finn → les
        </text>
      </Steg>
    </svg>
  );
}
