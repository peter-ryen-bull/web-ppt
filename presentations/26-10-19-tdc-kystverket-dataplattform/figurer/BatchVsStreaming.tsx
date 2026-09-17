import type { ReactNode } from "react";

/*
 * Gjenbrukbare figurer for batch- og strømmebasert dataflyt, tegnet som ren
 * SVG i samme stil som DataplattformFlyt (Miles-paletten, stiplede baner og
 * baller i bevegelse).
 *
 * - BatchFlytFigur: én bane der data samles opp og flyttes i bolker
 * - StromFlytFigur: én bane der hver hendelse flyter fortløpende
 * - BatchVsStreamingFigur: begge banene samlet til én sammenligningsfigur
 */

const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";

/** Én bane tegnes i lokale koordinater 1200 x 240 */
const LINE_Y = 150;
const SRC_X = 110;
const DST_X = 1090;
const NODE_R = 36;

/* ---------- Ikoner (24x24, strek-stil) ---------- */

function IkonSystem() {
  return (
    <>
      <rect x={3.5} y={5} width={17} height={14.5} rx={2} />
      <path d="M3.5 9.5h17" />
      <circle cx={6.5} cy={7.25} r={0.9} fill="var(--teal)" stroke="none" />
      <circle cx={9.5} cy={7.25} r={0.9} fill="var(--teal)" stroke="none" />
    </>
  );
}

function IkonDatabase() {
  return (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  );
}

function IkonKlokke() {
  return (
    <>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 7.5V12l3 2" />
    </>
  );
}

function IkonPuls() {
  return <path d="M2.5 12h4L9 6l4 12 2.5-6h6" />;
}

/* ---------- Byggeklosser ---------- */

function Node({ cx, label, icon }: { cx: number; label: string; icon: ReactNode }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={LINE_Y}
        r={NODE_R}
        fill="#fff"
        stroke="var(--cream-dark)"
        strokeWidth={1.5}
      />
      <g
        transform={`translate(${cx - 16} ${LINE_Y - 16}) scale(1.333)`}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </g>
      <text
        x={cx}
        y={LINE_Y + NODE_R + 26}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={14}
        fill="var(--burgundy)"
      >
        {label}
      </text>
    </g>
  );
}

function StipletLinje({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <path
      d={`M ${x1} ${LINE_Y} H ${x2}`}
      fill="none"
      stroke={LINJE_FARGE}
      strokeWidth={1.6}
      strokeDasharray="1.5 7"
      strokeLinecap="round"
    />
  );
}

function BaneIkonTekst({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <g>
      <g
        transform="translate(210 72)"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </g>
      <text x={244} y={89} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
        {text}
      </text>
    </g>
  );
}

/** Teal tittel-pille med forklaringstekst ved siden av */
function TittelRad({ tittel, undertekst, w }: { tittel: string; undertekst: string; w: number }) {
  return (
    <g>
      <rect width={w} height={30} rx={15} fill="var(--teal)" />
      <text
        x={w / 2}
        y={19.5}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={11.5}
        letterSpacing={1.5}
        fill="var(--cream)"
      >
        {tittel}
      </text>
      <text x={w + 18} y={20} fontFamily="var(--font-sans)" fontSize={13} fill={SUB_FARGE}>
        {undertekst}
      </text>
    </g>
  );
}

/* ---------- Baner ---------- */

/**
 * Batch: baller dukker opp én og én i oppsamlingsboksen, og hele bolken
 * flyttes samlet over til plattformen med faste intervaller.
 */
function BatchBane() {
  const slots = [230, 252, 274, 296, 318];
  const dur = 9;
  /* Bolken flyttes slik at siste ball lander rett foran plattform-noden */
  const dx = DST_X - NODE_R - 24 - slots[slots.length - 1];

  return (
    <g>
      <StipletLinje x1={SRC_X + NODE_R + 8} x2={206} />
      <StipletLinje x1={348} x2={DST_X - NODE_R - 8} />
      <rect
        x={206}
        y={118}
        width={142}
        height={64}
        rx={14}
        fill="rgba(0, 64, 71, 0.04)"
        stroke="var(--teal)"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        opacity={0.55}
      />
      <BaneIkonTekst icon={<IkonKlokke />} text="fast intervall – f.eks. hver time eller hver natt" />

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`0 0; 0 0; ${dx} 0; ${dx} 0`}
          keyTimes="0;0.55;0.82;1"
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
        {slots.map((cx, i) => {
          const inn = 0.05 + i * 0.1;
          return (
            <circle key={cx} cx={cx} cy={LINE_Y} r={6} fill="var(--red)" opacity={0}>
              <animate
                attributeName="opacity"
                values="0;0;1;1;0;0"
                keyTimes={`0;${inn.toFixed(2)};${(inn + 0.05).toFixed(2)};0.84;0.92;1`}
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>

      <Node cx={SRC_X} label="Kilde" icon={<IkonSystem />} />
      <Node cx={DST_X} label="Plattform" icon={<IkonDatabase />} />
    </g>
  );
}

/** Streaming: hver hendelse flyter fortløpende, jevnt fordelt langs banen */
function StromBane() {
  const d = `M ${SRC_X + NODE_R + 12} ${LINE_Y} L ${DST_X - NODE_R - 12} ${LINE_Y}`;
  const dur = 6;

  return (
    <g>
      <StipletLinje x1={SRC_X + NODE_R + 8} x2={DST_X - NODE_R - 8} />
      <BaneIkonTekst icon={<IkonPuls />} text="kontinuerlig – forsinkelse på sekunder" />

      {[0, -1.2, -2.4, -3.6, -4.8].map((b) => (
        <circle key={b} r={6} fill="var(--red)" opacity={0}>
          <animateMotion dur={`${dur}s`} begin={`${b}s`} repeatCount="indefinite" path={d} />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.08;0.92;1"
            dur={`${dur}s`}
            begin={`${b}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <Node cx={SRC_X} label="Kilde" icon={<IkonSystem />} />
      <Node cx={DST_X} label="Plattform" icon={<IkonDatabase />} />
    </g>
  );
}

/* ---------- Eksporterte figurer ---------- */

export function BatchFlytFigur({
  undertekst = "data samles opp og flyttes i bolker",
}: {
  undertekst?: string;
}) {
  return (
    <svg
      viewBox="0 0 1240 300"
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Batch: data samles opp og flyttes i bolker med faste intervaller"
    >
      <g transform="translate(20 16)">
        <TittelRad tittel="BATCH" undertekst={undertekst} w={110} />
        <g transform="translate(0 14)">
          <BatchBane />
        </g>
      </g>
    </svg>
  );
}

export function StromFlytFigur({
  undertekst = "hver hendelse flyter videre med en gang den skjer",
}: {
  undertekst?: string;
}) {
  return (
    <svg
      viewBox="0 0 1240 300"
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Streaming: hver hendelse flyter videre med en gang den skjer"
    >
      <g transform="translate(20 16)">
        <TittelRad tittel="STREAMING" undertekst={undertekst} w={150} />
        <g transform="translate(0 14)">
          <StromBane />
        </g>
      </g>
    </svg>
  );
}

export function BatchVsStreamingFigur() {
  return (
    <svg
      viewBox="0 0 1240 640"
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Batch og streaming sammenlignet: bolker med faste intervaller mot kontinuerlig strøm av hendelser"
    >
      <g transform="translate(20 28)">
        <TittelRad tittel="BATCH" undertekst="data samles opp og flyttes i bolker" w={110} />
        <g transform="translate(0 14)">
          <BatchBane />
        </g>
      </g>

      <path
        d="M 40 326 H 1200"
        fill="none"
        stroke="var(--cream-dark)"
        strokeWidth={1.5}
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      <g transform="translate(20 350)">
        <TittelRad
          tittel="STREAMING"
          undertekst="hver hendelse flyter videre med en gang den skjer"
          w={150}
        />
        <g transform="translate(0 14)">
          <StromBane />
        </g>
      </g>
    </svg>
  );
}
