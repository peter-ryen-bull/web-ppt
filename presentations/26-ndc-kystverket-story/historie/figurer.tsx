import type { ReactNode } from "react";
import { useStep } from "@/components/steps";

/*
 * SVG-figurer for «Historien om dataplattformen» (viewBox 1240x640,
 * skalerer fritt i en Box på 1280x720-lerretet). Miles-paletten:
 * teal, burgunder, mint og rød på krem.
 */

const W = 1240;
const H = 640;

const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const SUB_FARGE = "#9a5068";
const KREM_DUS = "rgba(251, 240, 229, 0.72)";

function Svg({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label={label}
    >
      <defs>
        <marker
          id="flyt-pil"
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          orient="auto"
        >
          <path d="M 0 1.5 L 9 5 L 0 8.5 Z" fill="context-stroke" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/** Stiplet flytlinje med retningspil – statisk, uten animasjon */
function Flyt({ d, stroke = LINJE_FARGE }: { d: string; stroke?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={1.6}
      strokeDasharray="1.5 7"
      strokeLinecap="round"
      markerEnd="url(#flyt-pil)"
    />
  );
}

/** Myk S-kurve fra (x1, y1) til (x2, y2) */
function kurve(x1: number, y1: number, x2: number, y2: number) {
  const k = (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
}

/* ================= Tidslinjen ================= */

const EPOKER = [
  { aar: "1970", navn: "The database", sub: "one shared truth for operations" },
  { aar: "1988", navn: "The data warehouse", sub: "insight across systems – finance first" },
  { aar: "2006", navn: "Big data", sub: "distribute everything – Hadoop" },
  { aar: "2010", navn: "The data lake", sub: "store everything, raw" },
  { aar: "2012", navn: "The cloud", sub: "elastic – pay for use" },
  { aar: "2020", navn: "Lakehouse", sub: "one platform for BI and AI" },
];

/** Antall klikk-steg i tidslinjen: én per epoke + «i dag» */
export const TIDSLINJE_STEG = EPOKER.length + 1;

export function TidslinjeFigur() {
  // Klikk-steg: 0 = bare aksen, 1–6 = epokene, 7 = «i dag + KI»
  const steg = useStep();
  const y = 330;
  const x0 = 80;
  const x1 = 1080;
  const dx = (x1 - x0) / (EPOKER.length - 1);

  return (
    <Svg label="Timeline from the database in 1970 to today's data platform">
      <line x1={x0 - 40} y1={y} x2={1170} y2={y} stroke={LINJE_FARGE} strokeWidth={2} />
      {/* pil mot fremtiden */}
      <path
        d={`M 1170 ${y} l -14 -8 v 16 z`}
        fill="var(--red)"
        stroke="none"
      />

      {EPOKER.map((e, i) => {
        const x = x0 + i * dx;
        const over = i % 2 === 0;
        const ty = over ? y - 118 : y + 62;
        return (
          <g
            key={e.aar}
            style={{
              opacity: steg >= i + 1 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={over ? y - 52 : y + 52}
              stroke={LINJE_FARGE}
              strokeWidth={1.4}
              strokeDasharray="1.5 6"
            />
            <circle cx={x} cy={y} r={9} fill="var(--cream)" stroke="var(--teal)" strokeWidth={2.5} />
            <circle cx={x} cy={y} r={3.5} fill="var(--teal)" />
            <g transform={`translate(${x} ${ty})`}>
              <rect x={-34} y={0} width={68} height={26} rx={13} fill="var(--teal)" />
              <text
                y={17.5}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontWeight={600}
                fontSize={13}
                fill="var(--cream)"
              >
                {e.aar}
              </text>
              <text
                y={52}
                textAnchor="middle"
                fontFamily="var(--font-serif)"
                fontSize={23}
                fill="var(--burgundy)"
              >
                {e.navn}
              </text>
              <text
                y={76}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize={13.5}
                fill={SUB_FARGE}
              >
                {e.sub}
              </text>
            </g>
          </g>
        );
      })}

      {/* du er her */}
      <g
        transform={`translate(1150 ${y - 46})`}
        style={{
          opacity: steg >= EPOKER.length + 1 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <text
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={14}
          fill="var(--red)"
        >
          today
        </text>
        <text
          y={20}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={12.5}
          fill={SUB_FARGE}
        >
          + AI
        </text>
      </g>
    </Svg>
  );
}

/* ================= Mønsteret: problem → løsning → nytt problem ================= */

export function MoensterFigur() {
  const y = 250;
  const boks = (x: number, w: number, tekst: string, fill: string, textFill: string) => (
    <g>
      <rect x={x} y={y} width={w} height={90} rx={20} fill={fill} />
      <text
        x={x + w / 2}
        y={y + 55}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={27}
        fill={textFill}
      >
        {tekst}
      </text>
    </g>
  );

  return (
    <Svg label="The pattern: every problem gets a solution that creates a new problem">
      {boks(100, 300, "A problem", "var(--red)", "var(--cream)")}
      {boks(470, 300, "A solution", "var(--teal)", "var(--cream)")}
      {boks(840, 300, "A new problem", "var(--burgundy)", "var(--cream)")}

      <Flyt d={kurve(400, y + 45, 470, y + 45)} />
      <Flyt d={kurve(770, y + 45, 840, y + 45)} />

      {/* tilbake-sløyfen: det nye problemet blir neste tiårs utgangspunkt */}
      <Flyt
        d={`M 990 ${y + 90} C 990 ${y + 230}, 250 ${y + 230}, 250 ${y + 90}`}
        stroke="rgba(0, 64, 71, 0.3)"
      />
      <text
        x={620}
        y={y + 218}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={16}
        fill="var(--teal)"
      >
        … becomes the next decade's starting point
      </text>
    </Svg>
  );
}

/* ================= 1960-tallet: filer og siloer ================= */

const SILOER = [
  {
    navn: "Accounting",
    fil: "CUST 4711;BULL,P;OSLO",
  },
  {
    navn: "Orders",
    fil: "P.BULL | OSLO | A-4711",
  },
  {
    navn: "Inventory",
    fil: "BULL PETER, 4711X",
  },
];

export function SiloFigur() {
  const kolW = 330;
  const gap = 55;
  const x0 = (W - (3 * kolW + 2 * gap)) / 2;

  return (
    <Svg label="Before the database: every program owned its own files, the same customer three truths">
      {SILOER.map((s, i) => {
        const x = x0 + i * (kolW + gap);
        return (
          <g key={s.navn}>
            {/* programboks */}
            <rect x={x} y={70} width={kolW} height={86} rx={14} fill="var(--teal)" />
            <text
              x={x + kolW / 2}
              y={112}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={20}
              fill="var(--cream)"
            >
              {s.navn}
            </text>
            <text
              x={x + kolW / 2}
              y={138}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize={12.5}
              fill={KREM_DUS}
            >
              own program · own file format
            </text>
            <line
              x1={x + kolW / 2}
              y1={156}
              x2={x + kolW / 2}
              y2={210}
              stroke={LINJE_FARGE}
              strokeWidth={1.6}
              strokeDasharray="1.5 6"
            />
            {/* filstabel (magnetbånd/flate filer) */}
            {[0, 1, 2].map((j) => (
              <rect
                key={j}
                x={x + 18 - j * 5}
                y={218 + j * 46}
                width={kolW - 36 + j * 10}
                height={38}
                rx={8}
                fill="#fff"
                stroke="var(--cream-dark)"
                strokeWidth={1.5}
              />
            ))}
            <text
              x={x + kolW / 2}
              y={243}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={14}
              fill="var(--burgundy)"
            >
              {s.fil}
            </text>
          </g>
        );
      })}

      {/* sprikende sannheter */}
      {[0, 1].map((i) => {
        const xa = x0 + i * (kolW + gap) + kolW;
        const xb = x0 + (i + 1) * (kolW + gap);
        return (
          <g key={i}>
            <path
              d={`M ${xa - 40} 380 C ${xa + 30} 420, ${xb - 30} 420, ${xb + 40} 380`}
              fill="none"
              stroke="var(--red)"
              strokeWidth={1.6}
              strokeDasharray="1.5 6"
            />
            <text
              x={(xa + xb) / 2}
              y={432}
              textAnchor="middle"
              fontFamily="var(--font-serif)"
              fontSize={24}
              fill="var(--red)"
            >
              ≠
            </text>
          </g>
        );
      })}

      <text
        x={W / 2}
        y={530}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={30}
        fill="var(--burgundy)"
      >
        The same customer – three truths
      </text>
      <text
        x={W / 2}
        y={570}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={17}
        fill={SUB_FARGE}
      >
        A new question meant a new program
      </text>
    </Svg>
  );
}

/* ================= 1970: relasjonsmodellen ================= */

function MiniTabell({
  x,
  y,
  tittel,
  kolonner,
  rader,
  w = 240,
}: {
  x: number;
  y: number;
  tittel: string;
  kolonner: string[];
  rader: string[][];
  w?: number;
}) {
  const radH = 34;
  const h = radH * (rader.length + 1);
  return (
    <g>
      <text
        x={x}
        y={y - 14}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={16}
        fill="var(--teal)"
        letterSpacing={1}
      >
        {tittel}
      </text>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <rect x={x} y={y} width={w} height={radH} rx={10} fill="rgba(0, 64, 71, 0.08)" />
      <rect x={x} y={y + radH / 2} width={w} height={radH / 2} fill="rgba(0, 64, 71, 0.08)" />
      {kolonner.map((k, i) => (
        <text
          key={k}
          x={x + 16 + (i * (w - 24)) / kolonner.length}
          y={y + 22.5}
          fontFamily="ui-monospace, monospace"
          fontWeight={600}
          fontSize={13.5}
          fill="var(--teal)"
        >
          {k}
        </text>
      ))}
      {rader.map((rad, r) => (
        <g key={r}>
          {rad.map((c, i) => (
            <text
              key={i}
              x={x + 16 + (i * (w - 24)) / kolonner.length}
              y={y + radH * (r + 1) + 22.5}
              fontFamily="ui-monospace, monospace"
              fontSize={13.5}
              fill="var(--burgundy)"
            >
              {c}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
}

export function RelasjonsFigur() {
  return (
    <Svg label="The relational model: tables joined with SQL, ask about the content not the location">
      <MiniTabell
        x={90}
        y={120}
        tittel="CUSTOMER"
        kolonner={["id", "name"]}
        rader={[
          ["4711", "Bull, P"],
          ["4712", "Nansen, F"],
        ]}
      />
      <MiniTabell
        x={90}
        y={330}
        tittel="ORDERS"
        kolonner={["customer", "amount"]}
        rader={[
          ["4711", "1,200"],
          ["4711", "800"],
          ["4712", "300"],
        ]}
      />

      {/* join-linjen */}
      <Flyt
        d={`M 210 258 C 210 290, 210 300, 210 330`}
        stroke="rgba(255, 48, 59, 0.45)"
      />
      <text
        x={238}
        y={302}
        fontFamily="ui-monospace, monospace"
        fontSize={13}
        fill="var(--red)"
      >
        id = customer
      </text>

      {/* SQL-kortet */}
      <g>
        <rect x={520} y={150} width={430} height={190} rx={16} fill="var(--teal)" />
        <circle cx={550} cy={180} r={5} fill="var(--mint)" />
        <circle cx={568} cy={180} r={5} fill="rgba(251,240,229,0.5)" />
        <circle cx={586} cy={180} r={5} fill="rgba(251,240,229,0.3)" />
        {[
          "SELECT name, SUM(amount)",
          "FROM customer JOIN orders",
          "  ON id = customer",
          "GROUP BY name;",
        ].map((l, i) => (
          <text
            key={l}
            x={550}
            y={226 + i * 27}
            fontFamily="ui-monospace, monospace"
            fontSize={17}
            fill="var(--cream)"
          >
            {l}
          </text>
        ))}
      </g>

      <Flyt d={kurve(340, 300, 520, 245)} />
      <Flyt d={kurve(950, 245, 1050, 245)} />

      {/* svaret */}
      <MiniTabell
        x={1050}
        y={190}
        tittel="ANSWER"
        kolonner={["name", "sum"]}
        rader={[
          ["Bull", "2,000"],
          ["Nansen", "300"],
        ]}
        w={160}
      />

      <text
        x={W / 2}
        y={490}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={30}
        fill="var(--burgundy)"
      >
        Say what you want – not where it lives
      </text>
      <text
        x={W / 2}
        y={532}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={17}
        fill={SUB_FARGE}
      >
        Codd 1970 · System R and SQL · Oracle 1979 · DB2 1983
      </text>
    </Svg>
  );
}

/* ================= 1988: datavarehuset ================= */

const VAREHUS_KILDER = ["Accounts", "Loans", "Cards", "Customers"];
const VAREHUS_UT = ["Reports", "Risk", "Profitability"];

export function VarehusFigur() {
  const kildeYs = [90, 210, 330, 450];
  const utYs = [150, 270, 390];
  const vx = 470;
  const vw = 320;

  return (
    <Svg label="The data warehouse: operational systems are copied into one integrated warehouse that delivers reports and insight">
      {/* kilder */}
      {VAREHUS_KILDER.map((k, i) => (
        <g key={k}>
          <rect x={60} y={kildeYs[i]} width={230} height={80} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
          <text
            x={175}
            y={kildeYs[i] + 38}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={18}
            fill="var(--burgundy)"
          >
            {k}
          </text>
          <text
            x={175}
            y={kildeYs[i] + 61}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize={12.5}
            fill={SUB_FARGE}
          >
            operational system
          </text>
          <Flyt d={kurve(290, kildeYs[i] + 40, vx, 180 + i * 60)} />
        </g>
      ))}

      <text
        x={378}
        y={70}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={13}
        letterSpacing={1.5}
        fill="var(--red)"
      >
        ETL · NIGHTLY JOB
      </text>

      {/* varehuset */}
      <rect x={vx} y={100} width={vw} height={420} rx={20} fill="var(--burgundy)" />
      <text
        x={vx + vw / 2}
        y={190}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={30}
        fill="var(--cream)"
      >
        The data warehouse
      </text>
      <rect x={vx + vw / 2 - 18} y={208} width={36} height={3} rx={1.5} fill="var(--mint)" />
      {["subject-oriented", "integrated", "history", "non-volatile"].map((t, i) => (
        <g key={t}>
          <rect
            x={vx + 60}
            y={248 + i * 52}
            width={vw - 120}
            height={36}
            rx={18}
            fill="rgba(251, 240, 229, 0.1)"
            stroke="rgba(120, 232, 219, 0.4)"
          />
          <text
            x={vx + vw / 2}
            y={271.5 + i * 52}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize={14.5}
            fill="var(--mint)"
          >
            {t}
          </text>
        </g>
      ))}
      <text
        x={vx + vw / 2}
        y={498}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={12.5}
        fill={KREM_DUS}
      >
        Inmon 1992 · Kimball 1996
      </text>

      {/* konsumenter */}
      {VAREHUS_UT.map((k, i) => (
        <g key={k}>
          <rect x={950} y={utYs[i]} width={230} height={80} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
          <text
            x={1065}
            y={utYs[i] + 38}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={18}
            fill="var(--burgundy)"
          >
            {k}
          </text>
          <text
            x={1065}
            y={utYs[i] + 61}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize={12.5}
            fill={SUB_FARGE}
          >
            decisions
          </text>
          <Flyt d={kurve(vx + vw, 220 + i * 80, 950, utYs[i] + 40)} />
        </g>
      ))}

      <text
        x={W / 2}
        y={594}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={16}
        fill={SUB_FARGE}
      >
        One integrated truth – separate from operations, with history
      </text>
    </Svg>
  );
}

/* ================= 2006: regnestykket ================= */

export function RegnestykkeFigur() {
  // rutenett med "1000 maskiner"
  const cols = 25;
  const rows = 8;
  const cell = 16;
  const gx = 700;
  const gy = 170;

  return (
    <Svg label="Google's math: one machine takes four months, a thousand machines under three hours">
      <text
        x={W / 2}
        y={80}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={34}
        fill="var(--burgundy)"
      >
        The entire web in 2006: 400 TB
      </text>

      {/* én maskin */}
      <g>
        <rect x={150} y={170} width={200} height={230} rx={16} fill="var(--teal)" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={175} y={200 + i * 56} width={150} height={36} rx={6} fill="rgba(251,240,229,0.12)" />
            <circle cx={192} cy={218 + i * 56} r={4} fill="var(--mint)" />
          </g>
        ))}
        <text
          x={250}
          y={440}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={18}
          fill="var(--burgundy)"
        >
          1 machine
        </text>
        <text
          x={250}
          y={466}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={14}
          fill={SUB_FARGE}
        >
          reads 30–35 MB/s
        </text>
        <text
          x={250}
          y={540}
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize={40}
          fill="var(--red)"
        >
          4 months
        </text>
      </g>

      <text
        x={520}
        y={300}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={34}
        fill={SUB_FARGE}
      >
        vs
      </text>

      {/* tusen maskiner */}
      <g>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={gx + c * cell}
              y={gy + r * cell}
              width={cell - 4}
              height={cell - 4}
              rx={3}
              fill="var(--teal)"
              opacity={0.85}
            >
              <animate
                attributeName="opacity"
                values="0.45;0.95;0.45"
                dur="3s"
                begin={`${((r * cols + c) % 17) * 0.18}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))
        )}
        <text
          x={gx + (cols * cell) / 2}
          y={440}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={18}
          fill="var(--burgundy)"
        >
          1,000 cheap machines
        </text>
        <text
          x={gx + (cols * cell) / 2}
          y={466}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={14}
          fill={SUB_FARGE}
        >
          failure is the norm – the tolerance lives in the software
        </text>
        <text
          x={gx + (cols * cell) / 2}
          y={540}
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize={40}
          fill="var(--red)"
        >
          &lt; 3 hours
        </text>
      </g>

      <text
        x={W / 2}
        y={608}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15}
        fill={SUB_FARGE}
      >
        GFS 2003 · MapReduce 2004 · Hadoop 2006 (open source – big data for everyone)
      </text>
    </Svg>
  );
}

/* ================= 2010: flaskevann mot sjøen ================= */

export function SjoFigur() {
  return (
    <Svg label="Dixon's analogy: the data mart is bottled water, the data lake is water in its natural state">
      {/* flasken */}
      <g transform="translate(190 90)">
        <rect x={62} y={0} width={56} height={34} rx={8} fill="var(--teal)" />
        <path
          d="M 50 34 L 130 34 L 156 96 L 156 330 Q 156 350 136 350 L 44 350 Q 24 350 24 330 L 24 96 Z"
          fill="#fff"
          stroke="var(--cream-dark)"
          strokeWidth={2}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={44}
            y={130 + i * 40}
            width={92}
            height={26}
            rx={5}
            fill="rgba(0, 64, 71, 0.12)"
            stroke="rgba(0, 64, 71, 0.25)"
          />
        ))}
        <text
          x={90}
          y={402}
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize={25}
          fill="var(--burgundy)"
        >
          The data mart
        </text>
        <text x={90} y={430} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fill={SUB_FARGE}>
          bottled water: cleaned, packaged
        </text>
        <text x={90} y={452} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fill={SUB_FARGE}>
          – answers to known questions
        </text>
      </g>

      {/* sjøen */}
      <g transform="translate(560 110)">
        <path
          d="M 40 190 C 20 120, 120 40, 280 60 C 450 82, 560 60, 580 150 C 600 240, 500 310, 330 315 C 160 320, 60 260, 40 190 Z"
          fill="rgba(0, 64, 71, 0.9)"
        />
        <path
          d="M 90 180 C 130 160, 190 160, 230 180 C 270 200, 330 200, 370 180"
          fill="none"
          stroke="var(--mint)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.7}
        >
          <animate attributeName="d"
            values="M 90 180 C 130 160, 190 160, 230 180 C 270 200, 330 200, 370 180;M 90 185 C 130 205, 190 205, 230 185 C 270 165, 330 165, 370 185;M 90 180 C 130 160, 190 160, 230 180 C 270 200, 330 200, 370 180"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 190 235 C 230 215, 290 215, 330 235 C 370 255, 430 255, 470 235"
          fill="none"
          stroke="var(--mint)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.4}
        >
          <animate attributeName="d"
            values="M 190 235 C 230 215, 290 215, 330 235 C 370 255, 430 255, 470 235;M 190 240 C 230 260, 290 260, 330 240 C 370 220, 430 220, 470 240;M 190 235 C 230 215, 290 215, 330 235 C 370 255, 430 255, 470 235"
            dur="7s"
            repeatCount="indefinite"
          />
        </path>
        {/* rå dataformer som flyter i sjøen */}
        <circle cx={150} cy={120} r={11} fill="none" stroke="var(--mint)" strokeWidth={2} opacity={0.8} />
        <rect x={260} y={100} width={20} height={20} rx={4} fill="none" stroke="var(--mint)" strokeWidth={2} opacity={0.8} />
        <path d="M 390 105 l 12 22 h -24 z" fill="none" stroke="var(--mint)" strokeWidth={2} opacity={0.8} />
        <path d="M 480 130 q 8 -12 16 0 q 8 12 16 0" fill="none" stroke="var(--mint)" strokeWidth={2} opacity={0.8} />

        {/* innløp */}
        <Flyt d="M -60 40 C 0 60, 20 90, 60 120" stroke="rgba(69, 13, 32, 0.3)" />

        <text
          x={310}
          y={382}
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize={25}
          fill="var(--burgundy)"
        >
          The data lake
        </text>
        <text x={310} y={410} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fill={SUB_FARGE}>
          water in its natural state: everything, raw, cheap
        </text>
        <text x={310} y={432} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fill={SUB_FARGE}>
          – for tomorrow's questions
        </text>
      </g>

      <text
        x={W / 2}
        y={600}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={16}
        fill="var(--red)"
      >
        “You store raw data because you don't know tomorrow's questions” – James Dixon, 2010
      </text>
    </Svg>
  );
}

/* ================= 2012: skyen skiller lagring og regnekraft ================= */

export function SkyFigur() {
  const teams = [
    { navn: "BI and reports", x: 150 },
    { navn: "Data science", x: 510 },
    { navn: "Nightly jobs", x: 870 },
  ];

  return (
    <Svg label="The cloud: storage and compute are separate, every team scales independently and pays for use">
      {teams.map((t, i) => (
        <g key={t.navn}>
          <rect x={t.x} y={110} width={220} height={110} rx={16} fill="var(--teal)" />
          <text
            x={t.x + 110}
            y={158}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={17}
            fill="var(--cream)"
          >
            {t.navn}
          </text>
          <text
            x={t.x + 110}
            y={186}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize={12.5}
            fill={KREM_DUS}
          >
            own compute · on/off
          </text>
          {/* skalerings-antydning */}
          <rect
            x={t.x + 232}
            y={122}
            width={64}
            height={86}
            rx={12}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.6}
            strokeDasharray="2 6"
          >
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.5s" begin={`${i * 1.1}s`} repeatCount="indefinite" />
          </rect>
          <text x={t.x + 264} y={172} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={22} fill="var(--teal)" opacity={0.8}>
            +
          </text>
          <Flyt d={`M ${t.x + 110} 220 L ${t.x + 110} 380`} />
        </g>
      ))}

      {/* lagringslaget */}
      <rect x={90} y={380} width={1060} height={120} rx={20} fill="var(--burgundy)" />
      <text
        x={W / 2}
        y={432}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={26}
        fill="var(--cream)"
      >
        Object storage – all the data, one copy
      </text>
      <text
        x={W / 2}
        y={468}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={14}
        fill={KREM_DUS}
      >
        cheap · elastic · grows independently of compute
      </text>

      <text
        x={W / 2}
        y={572}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={16}
        fill={SUB_FARGE}
      >
        Redshift 2012 · Snowflake 2015 · BigQuery – rent instead of buy, scale instead of plan
      </text>
    </Svg>
  );
}

/* ================= 2020: konvergensen til lakehouse ================= */

export function KonvergensFigur() {
  const yTopp = 160;
  const yBunn = 400;
  const yMid = 280;
  const xMerge = 760;

  const stopp = (x: number, y: number, aar: string, navn: string, over: boolean) => (
    <g>
      <circle cx={x} cy={y} r={7} fill="var(--cream)" stroke="var(--teal)" strokeWidth={2.2} />
      <text
        x={x}
        y={over ? y - 40 : y + 34}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={13.5}
        fill="var(--teal)"
      >
        {aar}
      </text>
      <text
        x={x}
        y={over ? y - 20 : y + 54}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={13.5}
        fill={SUB_FARGE}
      >
        {navn}
      </text>
    </g>
  );

  return (
    <Svg label="Two tracks – the warehouse and the lake – meet in the lakehouse and become today's data platform">
      <text x={90} y={100} fontFamily="var(--font-serif)" fontSize={21} fill="var(--burgundy)">
        The warehouse track: order and governance
      </text>
      <text x={90} y={480} fontFamily="var(--font-serif)" fontSize={21} fill="var(--burgundy)">
        The lake track: scale and raw data
      </text>

      <Flyt
        d={`M 80 ${yTopp} L 560 ${yTopp} C 680 ${yTopp}, 660 ${yMid}, ${xMerge} ${yMid}`}
      />
      <Flyt
        d={`M 80 ${yBunn} L 560 ${yBunn} C 680 ${yBunn}, 660 ${yMid}, ${xMerge} ${yMid}`}
      />

      {stopp(160, yTopp, "1983", "Teradata", true)}
      {stopp(340, yTopp, "1992", "Inmon", true)}
      {stopp(520, yTopp, "2012", "cloud warehouse", true)}

      {stopp(160, yBunn, "2006", "Hadoop", false)}
      {stopp(340, yBunn, "2010", "the data lake", false)}
      {stopp(520, yBunn, "2013", "Spark", false)}

      {/* mesh-lappen */}
      <g transform={`translate(620 ${yMid - 122})`}>
        <rect width={290} height={40} rx={20} fill="rgba(120, 232, 219, 0.15)" stroke="var(--mint)" />
        <text
          x={145}
          y={25.5}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13.5}
          fill="var(--teal)"
        >
          2019 · data mesh: ownership out in the domains
        </text>
      </g>

      {/* lakehouse-noden */}
      <g>
        <circle cx={xMerge} cy={yMid} r={14} fill="var(--teal)" />
        <circle cx={xMerge} cy={yMid} r={14} fill="none" stroke="var(--mint)" strokeWidth={2}>
          <animate attributeName="r" values="14;26;14" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
        <text
          x={xMerge}
          y={yMid + 58}
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize={23}
          fill="var(--burgundy)"
        >
          Lakehouse · 2020
        </text>
        <text
          x={xMerge}
          y={yMid + 84}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13.5}
          fill={SUB_FARGE}
        >
          the warehouse's order on the lake's economics
        </text>
      </g>

      <Flyt d={`M ${xMerge + 20} ${yMid} L 950 ${yMid}`} />

      {/* dagens plattform */}
      <rect x={950} y={yMid - 80} width={230} height={160} rx={20} fill="var(--burgundy)" />
      <text
        x={1065}
        y={yMid - 22}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={24}
        fill="var(--cream)"
      >
        Data platform
      </text>
      <rect x={1047} y={yMid - 6} width={36} height={3} rx={1.5} fill="var(--mint)" />
      <text x={1065} y={yMid + 24} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={KREM_DUS}>
        BI · AI · real time
      </text>
      <text x={1065} y={yMid + 46} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13} fill={KREM_DUS}>
        governance at the base
      </text>
    </Svg>
  );
}

/* ================= Arven: dagens plattform lag for lag ================= */

const ARV = [
  { aar: "2020", navn: "Lakehouse", arv: "one governed layer for BI and AI", fill: "var(--teal)" },
  { aar: "2019", navn: "Data mesh", arv: "ownership and data products", fill: "#0e5158" },
  { aar: "2012", navn: "The cloud", arv: "elasticity – pay for use", fill: "#256169" },
  { aar: "2010", navn: "The data lake", arv: "cheap raw storage, all formats", fill: "#3d707a" },
  { aar: "1988", navn: "The data warehouse", arv: "integrated history, modeling", fill: "#5c3a4b" },
  { aar: "1970", navn: "The relational model", arv: "one shared truth – SQL", fill: "var(--burgundy)" },
];

export function ArvFigur() {
  const lagH = 72;
  const x = 200;
  const w = 840;
  const y0 = 120;

  return (
    <Svg label="Today's data platform layer by layer: each layer is the legacy of an era">
      <text
        x={W / 2}
        y={70}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={30}
        fill="var(--burgundy)"
      >
        The data platform = the sum of 50 years of lessons
      </text>

      {ARV.map((l, i) => {
        const y = y0 + i * (lagH + 8);
        return (
          <g key={l.aar}>
            <rect x={x} y={y} width={w} height={lagH} rx={14} fill={l.fill} />
            <rect x={x + 24} y={y + 21} width={68} height={30} rx={15} fill="rgba(251, 240, 229, 0.15)" />
            <text
              x={x + 58}
              y={y + 41.5}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={13.5}
              fill="var(--mint)"
            >
              {l.aar}
            </text>
            <text
              x={x + 118}
              y={y + 44}
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={18}
              fill="var(--cream)"
            >
              {l.navn}
            </text>
            <text
              x={x + w - 32}
              y={y + 44}
              textAnchor="end"
              fontFamily="var(--font-sans)"
              fontSize={15}
              fill={KREM_DUS}
            >
              {l.arv}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}
