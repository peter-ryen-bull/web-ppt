import type { ReactNode } from "react";

/*
 * Arkitekturfigur for en dataplattform, tegnet som ren SVG (viewBox 1240x640)
 * slik at den skalerer fritt inne i en Box på 1280x720-lerretet.
 *
 * Dataflyten visualiseres med små "baller" som beveger seg sakte langs
 * stiplede kurver: kilder -> plattform -> konsumenter. Den detaljerte
 * varianten deler plattformen i tre lag (lagring/arkiv, transformasjon,
 * eksponering) med en egen flyt gjennom lagene.
 *
 * Designet bruker Miles-paletten (teal, burgunder, mint, rød på krem).
 */

const W = 1240;
const H = 640;

const CARD_W = 280;
const CARD_H = 104;
const CARD_YS = [64, 186, 308, 430];
const LEFT_X = 20;
const RIGHT_X = 940;

/** Y-posisjoner der flytlinjene treffer plattformens kant */
const EDGE_YS = [224, 274, 324, 374];

const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const SUB_FARGE = "#9a5068";
const KREM_DUS = "rgba(251, 240, 229, 0.72)";

/* ---------- Ikoner (24x24, strek-stil) ---------- */

function IkonDatabase() {
  return (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  );
}

function IkonKode() {
  return (
    <>
      <path d="M8.5 6.5 3.5 12l5 5.5" />
      <path d="M15.5 6.5l5 5.5-5 5.5" />
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

function IkonSignal() {
  return (
    <>
      <path d="M4.5 11.5a10.5 10.5 0 0 1 15 0" />
      <path d="M7.5 15a6.5 6.5 0 0 1 9 0" />
      <circle cx={12} cy={18.5} r={1.7} fill="var(--teal)" stroke="none" />
    </>
  );
}

function IkonLyn() {
  return <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12z" />;
}

function IkonVindu() {
  return (
    <>
      <rect x={3.5} y={5} width={17} height={14.5} rx={2} />
      <path d="M3.5 9.5h17" />
      <circle cx={6.5} cy={7.25} r={0.9} fill="var(--teal)" stroke="none" />
      <circle cx={9.5} cy={7.25} r={0.9} fill="var(--teal)" stroke="none" />
    </>
  );
}

function IkonSoyler() {
  return (
    <>
      <path d="M4 20.5h16" />
      <path d="M7.5 20.5v-6" />
      <path d="M12 20.5V9" />
      <path d="M16.5 20.5v-9.5" />
    </>
  );
}

function IkonGnist() {
  return <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />;
}

/** To buede piler i sirkel – data som bearbeides/transformeres */
function IkonRotasjon() {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="16s"
        repeatCount="indefinite"
      />
      <path d="M3.5 12a8.5 8.5 0 0 1 8.5-8.5 9 9 0 0 1 6.3 2.6L20.5 8" />
      <path d="M20.5 3.5V8h-4.5" />
      <path d="M20.5 12a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-6.3-2.6L3.5 16" />
      <path d="M3.5 20.5V16H8" />
    </g>
  );
}

/** Node som deler til flere – dataprodukter eksponert ut */
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

const KILDER = [
  { title: "Driftssystemer", sub: "ERP · CRM · fagsystem", icon: <IkonDatabase /> },
  { title: "API", sub: "tjenester · integrasjoner", icon: <IkonKode /> },
  { title: "Filer", sub: "dokumenter · eksporter", icon: <IkonFil /> },
  { title: "Sensor / IoT", sub: "målinger · telemetri", icon: <IkonSignal /> },
];

const KONSUMENTER = [
  { title: "Automatisering", sub: "agenter · integrasjoner", icon: <IkonLyn /> },
  { title: "Applikasjoner", sub: "app · minside", icon: <IkonVindu /> },
  { title: "Innsikt & analyse", sub: "dashboard · KI-chat", icon: <IkonSoyler /> },
  { title: "Maskinlæring", sub: "prediksjon · modeller", icon: <IkonGnist /> },
];

const BUNNBARER = [
  "OVERVÅKNING & FORVALTNING",
  "INFRASTRUKTUR & SIKKERHET",
  "SAMHANDLING & METODIKK",
];

const LAG: { title: string; cap: string[]; icon?: ReactNode }[] = [
  { title: "Lagring / arkiv", cap: ["rådata", "full historikk"], icon: <IkonDatabase /> },
  { title: "Transformasjon", cap: ["vasking", "modellering"], icon: <IkonRotasjon /> },
  { title: "Eksponering", cap: ["dataprodukter", "API · SQL · BI"], icon: <IkonDeling /> },
];

/* ---------- Byggeklosser ---------- */

function Kort({
  x,
  y,
  title,
  sub,
  icon,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  icon: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={CARD_W}
        height={CARD_H}
        rx={14}
        fill="#fff"
        stroke="var(--cream-dark)"
        strokeWidth={1.5}
      />
      <rect
        x={18}
        y={30}
        width={44}
        height={44}
        rx={12}
        fill="rgba(0, 64, 71, 0.06)"
        stroke="rgba(0, 64, 71, 0.12)"
      />
      <g
        transform="translate(28 40)"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </g>
      <text
        x={78}
        y={49}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={17}
        fill="var(--burgundy)"
      >
        {title}
      </text>
      <text x={78} y={72} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
        {sub}
      </text>
    </g>
  );
}

function Kolonnetittel({ cx, text, w }: { cx: number; text: string; w: number }) {
  return (
    <g>
      <rect x={cx - w / 2} y={10} width={w} height={30} rx={15} fill="var(--teal)" />
      <text
        x={cx}
        y={29.5}
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

function BunnBar({ x, text }: { x: number; text: string }) {
  const w = 384;
  return (
    <g>
      <rect x={x} y={578} width={w} height={36} rx={18} fill="var(--burgundy)" />
      <circle cx={x + 26} cy={596} r={3} fill="var(--mint)" />
      <text
        x={x + w / 2 + 8}
        y={600.5}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={12}
        letterSpacing={1.5}
        fill="var(--cream)"
      >
        {text}
      </text>
    </g>
  );
}

/** Stiplet kurve med baller som beveger seg sakte langs den */
function Flyt({
  d,
  dur,
  begins,
  color,
  stroke = LINJE_FARGE,
}: {
  d: string;
  dur: number;
  begins: number[];
  color: string;
  stroke?: string;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      {begins.map((b) => (
        <circle key={b} r={5} fill={color}>
          <animateMotion dur={`${dur}s`} begin={`${b}s`} repeatCount="indefinite" path={d} />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.88;1"
            dur={`${dur}s`}
            begin={`${b}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </>
  );
}

/** Kurve fra (x1, y1) til (x2, y2) med myk S-form */
function kurve(x1: number, y1: number, x2: number, y2: number) {
  const k = (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
}

/* ---------- Plattform-bokser ---------- */

function PlattformEnkel({ x, w }: { x: number; w: number }) {
  const cx = x + w / 2;
  const tags = ["LAKEHOUSE", "STRØMMING", "KATALOG", "SQL"];
  const tagW = tags.map((t) => 24 + t.length * 7.9);
  const totalW = tagW.reduce((a, b) => a + b, 0) + (tags.length - 1) * 12;
  let tx = cx - totalW / 2;

  return (
    <g>
      <rect x={x} y={64} width={w} height={470} rx={20} fill="var(--teal)" />
      <text
        x={cx}
        y={240}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={34}
        fill="var(--cream)"
      >
        Dataplattform
      </text>
      <rect x={cx - 18} y={258} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text
        x={cx}
        y={296}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={14.5}
        fill={KREM_DUS}
      >
        Lagring, prosessering og styring –
      </text>
      <text
        x={cx}
        y={318}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={14.5}
        fill={KREM_DUS}
      >
        ett felles sannhetslag for hele virksomheten.
      </text>
      {tags.map((t, i) => {
        const wi = tagW[i];
        const rx = tx;
        tx += wi + 12;
        return (
          <g key={t}>
            <rect
              x={rx}
              y={369}
              width={wi}
              height={26}
              rx={13}
              fill="rgba(120, 232, 219, 0.12)"
              stroke="var(--mint)"
              strokeWidth={1}
            />
            <text
              x={rx + wi / 2}
              y={386}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={11}
              letterSpacing={1}
              fill="var(--mint)"
            >
              {t}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function PlattformDetaljert({ x, w }: { x: number; w: number }) {
  const cx = x + w / 2;
  const kolW = 140;
  const gap = 30;
  const kolXs = [x + 20, x + 20 + kolW + gap, x + 20 + 2 * (kolW + gap)];
  const kolY = 200;
  const kolH = 280;
  const flytY = 430;

  return (
    <g>
      <rect x={x} y={64} width={w} height={470} rx={20} fill="var(--teal)" />
      <text
        x={cx}
        y={124}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={28}
        fill="var(--cream)"
      >
        Dataplattform
      </text>
      <rect x={cx - 18} y={140} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text
        x={cx}
        y={172}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={13}
        fill={KREM_DUS}
      >
        rådata inn – kvalitetssikrede og delbare data ut
      </text>

      {LAG.map((lag, i) => {
        const kx = kolXs[i];
        const kcx = kx + kolW / 2;
        return (
          <g key={lag.title}>
            <rect
              x={kx}
              y={kolY}
              width={kolW}
              height={kolH}
              rx={12}
              fill="rgba(251, 240, 229, 0.08)"
              stroke="rgba(120, 232, 219, 0.35)"
              strokeWidth={1}
            />
            <text
              x={kcx}
              y={kolY + 40}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={15.5}
              fill="var(--cream)"
            >
              {lag.title}
            </text>
            {lag.cap.map((c, j) => (
              <text
                key={c}
                x={kcx}
                y={kolY + 68 + j * 18}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize={11.5}
                fill="rgba(251, 240, 229, 0.65)"
              >
                {c}
              </text>
            ))}
            {lag.icon && (
              <g
                transform={`translate(${kcx - 14.4} ${kolY + 130}) scale(1.2)`}
                fill="none"
                stroke="var(--mint)"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {lag.icon}
              </g>
            )}
          </g>
        );
      })}

      {/* Korte stiplede segmenter der flyten passerer mellom lagene */}
      {[
        [x + 6, 14],
        [kolXs[0] + kolW + 2, gap - 4],
        [kolXs[1] + kolW + 2, gap - 4],
        [kolXs[2] + kolW + 2, 12],
      ].map(([sx, len]) => (
        <path
          key={sx}
          d={`M ${sx} ${flytY} h ${len}`}
          fill="none"
          stroke="rgba(120, 232, 219, 0.6)"
          strokeWidth={1.6}
          strokeDasharray="1.5 6"
          strokeLinecap="round"
        />
      ))}

      {/* Baller som flyter gjennom de tre lagene */}
      {[0, -3.7, -7.3].map((b) => (
        <circle key={b} r={5} fill="var(--mint)">
          <animateMotion
            dur="11s"
            begin={`${b}s`}
            repeatCount="indefinite"
            path={`M ${x + 12} ${flytY} L ${x + w - 12} ${flytY}`}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.06;0.94;1"
            dur="11s"
            begin={`${b}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
}

/* ---------- Hovedfigur ---------- */

export function DataplattformFlyt({ detaljert = false }: { detaljert?: boolean }) {
  const px = detaljert ? 360 : 400;
  const pw = detaljert ? 520 : 440;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Dataplattform: dataflyt fra kilder, gjennom plattformen, ut til konsumenter"
    >
      <Kolonnetittel cx={LEFT_X + CARD_W / 2} text="KILDER & INNHENTING" w={200} />
      <Kolonnetittel cx={RIGHT_X + CARD_W / 2} text="VERDI & BRUK" w={140} />

      {/* Flytlinjer med baller: kilder -> plattform */}
      {CARD_YS.map((y, i) => (
        <Flyt
          key={`inn-${y}`}
          d={kurve(LEFT_X + CARD_W, y + CARD_H / 2, px, EDGE_YS[i])}
          dur={6}
          begins={[-(i * 1.5), -(i * 1.5 + 3)]}
          color="var(--red)"
        />
      ))}

      {/* Flytlinjer med baller: plattform -> konsumenter */}
      {CARD_YS.map((y, i) => (
        <Flyt
          key={`ut-${y}`}
          d={kurve(px + pw, EDGE_YS[i], RIGHT_X, y + CARD_H / 2)}
          dur={6}
          begins={[-(i * 1.5 + 0.8), -(i * 1.5 + 3.8)]}
          color="var(--red)"
        />
      ))}

      {KILDER.map((k, i) => (
        <Kort key={k.title} x={LEFT_X} y={CARD_YS[i]} {...k} />
      ))}
      {KONSUMENTER.map((k, i) => (
        <Kort key={k.title} x={RIGHT_X} y={CARD_YS[i]} {...k} />
      ))}

      {detaljert ? <PlattformDetaljert x={px} w={pw} /> : <PlattformEnkel x={px} w={pw} />}

      {BUNNBARER.map((t, i) => (
        <BunnBar key={t} x={20 + i * 408} text={t} />
      ))}
    </svg>
  );
}

/** Detaljert variant: plattformen delt i lagring/arkiv, transformasjon og eksponering */
export function DataplattformFlytDetaljert() {
  return <DataplattformFlyt detaljert />;
}
