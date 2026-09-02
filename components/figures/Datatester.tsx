/*
 * Figurer for datatester – "show, don't tell":
 *
 *  - DatatestTabell: ekte AIS-rader strømmer inn, en skanner går rad for rad
 *    og testene svarer PASS/FAIL i et terminalvindu ved siden av.
 *  - DatatestPort: kvalitetsporten i pipelinen – alt tas imot i bronse,
 *    testene er porten, gyldige rader går videre til sølv og avvik havner
 *    i karantene med varsel til teamet.
 *
 * Ren SVG (viewBox 1240x640) i Miles-paletten, animert med SMIL slik at
 * figurene looper så lenge sliden vises.
 */

const W = 1240;
const H = 640;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const MINT = "#78e8db";
const ROD = "#ff303b";
const DUS = "#9a5068";

/** Total looptid for tabell-figuren (sekunder) */
const T = 13;

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

/* ---------- DatatestTabell ---------- */

type Feil = { test: string; celler: string[] };

const KOLONNER = [
  { id: "mmsi", label: "MMSI", x: 26, w: 96 },
  { id: "tid", label: "TID", x: 150, w: 88 },
  { id: "lat", label: "LAT", x: 252, w: 76 },
  { id: "lon", label: "LON", x: 348, w: 76 },
  { id: "fart", label: "FART (KN)", x: 444, w: 64 },
] as const;

const RADER: (Record<(typeof KOLONNER)[number]["id"], string> & {
  feil: Feil | null;
})[] = [
  { mmsi: "257061000", tid: "09:41:02", lat: "62.4721", lon: "6.1549", fart: "12.3", feil: null },
  { mmsi: "259122000", tid: "09:41:03", lat: "58.9701", lon: "5.7331", fart: "8.7", feil: null },
  {
    mmsi: "null", tid: "09:41:03", lat: "60.3913", lon: "5.3221", fart: "14.1",
    feil: { test: "not_null(mmsi)", celler: ["mmsi"] },
  },
  {
    mmsi: "257845000", tid: "09:41:04", lat: "63.4305", lon: "10.3951", fart: "842.0",
    feil: { test: "between(fart, 0, 60)", celler: ["fart"] },
  },
  { mmsi: "258963000", tid: "09:41:04", lat: "59.0442", lon: "4.8871", fart: "6.4", feil: null },
  {
    mmsi: "259122000", tid: "09:41:03", lat: "58.9701", lon: "5.7331", fart: "8.7",
    feil: { test: "unique(mmsi, tid)", celler: ["mmsi", "tid"] },
  },
];

const RAD_H = 64;
const RAD_TOPP = 56;

/** Når skanneren treffer rad i (sekunder inn i loopen) */
const skanStart = (i: number) => 0.3 + i * 0.75;

function ResultatIkon({ cx, cy, ok }: { cx: number; cy: number; ok: boolean }) {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={11}
        fill={ok ? "rgba(120, 232, 219, 0.3)" : "rgba(255, 48, 59, 0.12)"}
        stroke={ok ? "var(--teal)" : "var(--red)"}
        strokeWidth={1.5}
      />
      {ok ? (
        <path
          d={`M ${cx - 5} ${cy} l 3.5 3.5 L ${cx + 5.5} ${cy - 4.5}`}
          fill="none"
          stroke="var(--teal)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d={`M ${cx - 4.5} ${cy - 4.5} l 9 9 M ${cx + 4.5} ${cy - 4.5} l -9 9`}
          stroke="var(--red)"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      )}
    </>
  );
}

/** Terminallinjer: [tid, segmenter]. PASS/FAIL farges hver for seg. */
const TERMINAL_LINJER: {
  at: number;
  slot: number;
  deler: { t: string; farge: string; vekt?: number }[];
  hoyre?: string;
}[] = [
  {
    at: 0.5, slot: 0,
    deler: [
      { t: "$ ", farge: MINT },
      { t: "kjør datatester ais_posisjoner", farge: "var(--cream)" },
    ],
  },
  {
    at: 5.4, slot: 2,
    deler: [
      { t: "PASS  ", farge: MINT, vekt: 700 },
      { t: "valid_position(lat, lon)", farge: "rgba(251, 240, 229, 0.85)" },
    ],
  },
  {
    at: 5.9, slot: 3,
    deler: [
      { t: "PASS  ", farge: MINT, vekt: 700 },
      { t: "freshness(tid) < 5 min", farge: "rgba(251, 240, 229, 0.85)" },
    ],
  },
  {
    at: 6.4, slot: 4,
    deler: [
      { t: "FAIL  ", farge: ROD, vekt: 700 },
      { t: "not_null(mmsi)", farge: "rgba(251, 240, 229, 0.85)" },
    ],
    hoyre: "1 rad",
  },
  {
    at: 6.9, slot: 5,
    deler: [
      { t: "FAIL  ", farge: ROD, vekt: 700 },
      { t: "between(fart, 0, 60)", farge: "rgba(251, 240, 229, 0.85)" },
    ],
    hoyre: "1 rad",
  },
  {
    at: 7.4, slot: 6,
    deler: [
      { t: "FAIL  ", farge: ROD, vekt: 700 },
      { t: "unique(mmsi, tid)", farge: "rgba(251, 240, 229, 0.85)" },
    ],
    hoyre: "1 rad",
  },
  {
    at: 8.4, slot: 8,
    deler: [{ t: "✔ 3 rader levert videre", farge: MINT, vekt: 600 }],
  },
  {
    at: 8.9, slot: 9,
    deler: [{ t: "✖ 3 rader i karantene", farge: ROD, vekt: 600 }],
  },
];

export function DatatestTabell() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Datatester: innkommende AIS-rader sjekkes rad for rad mot testene"
    >
      <Pill cx={382} text="INNKOMMENDE RADER" w={210} />
      <Pill cx={990} text="TESTKJØRING" w={160} />

      {/* Tabellkort */}
      <g transform="translate(32 48)">
        <rect width={700} height={470} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />

        {/* Skanner-bånd som går rad for rad */}
        <rect x={12} width={676} height={RAD_H} rx={8} fill="rgba(120, 232, 219, 0.18)" opacity={0}>
          <animate
            attributeName="y"
            calcMode="discrete"
            values={[RAD_TOPP, ...RADER.map((_, i) => RAD_TOPP + i * RAD_H)].join(";")}
            keyTimes={`0;${RADER.map((_, i) => (skanStart(i) / T).toFixed(4)).join(";")}`}
            dur={`${T}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes={`0;${(skanStart(0) / T).toFixed(4)};${((skanStart(0) + 0.15) / T).toFixed(4)};${((skanStart(5) + 0.75) / T).toFixed(4)};${((skanStart(5) + 1.05) / T).toFixed(4)};1`}
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </rect>

        {/* Kolonneoverskrifter */}
        {KOLONNER.map((k) => (
          <text
            key={k.id}
            x={k.x}
            y={36}
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize={12}
            letterSpacing={1}
            fill={SUB_FARGE}
          >
            {k.label}
          </text>
        ))}
        <text
          x={560}
          y={36}
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={12}
          letterSpacing={1}
          fill={SUB_FARGE}
        >
          RESULTAT
        </text>
        <path d={`M 16 ${RAD_TOPP - 8} H 684`} stroke="var(--cream-dark)" strokeWidth={1.5} />

        {/* Rader */}
        {RADER.map((rad, i) => {
          const topp = RAD_TOPP + i * RAD_H;
          const baseline = topp + 37;
          return (
            <g key={i}>
              {/* Uthev cellene som feiler */}
              {rad.feil && (
                <g opacity={0}>
                  <Appear at={skanStart(i) + 0.5} />
                  {rad.feil.celler.map((c) => {
                    const kol = KOLONNER.find((k) => k.id === c)!;
                    return (
                      <rect
                        key={c}
                        x={kol.x - 8}
                        y={topp + 10}
                        width={kol.w}
                        height={44}
                        rx={7}
                        fill="rgba(255, 48, 59, 0.1)"
                        stroke="rgba(255, 48, 59, 0.4)"
                      />
                    );
                  })}
                </g>
              )}
              {/* Verdier */}
              {KOLONNER.map((k) => (
                <text
                  key={k.id}
                  x={k.x}
                  y={baseline}
                  fontFamily={MONO}
                  fontSize={15}
                  fill={rad.feil?.celler.includes(k.id) ? "var(--red-deep)" : "var(--burgundy)"}
                >
                  {rad[k.id]}
                </text>
              ))}
              {/* Resultat: ikon + hvilken test som slo ut */}
              <g opacity={0}>
                <Appear at={skanStart(i) + 0.55} />
                <ResultatIkon cx={542} cy={topp + 32} ok={!rad.feil} />
                {rad.feil && (
                  <text x={562} y={baseline} fontFamily={MONO} fontSize={11} fill="var(--red-deep)">
                    {rad.feil.test}
                  </text>
                )}
              </g>
              {i < RADER.length - 1 && (
                <path
                  d={`M 16 ${topp + RAD_H} H 684`}
                  stroke="rgba(69, 13, 32, 0.08)"
                  strokeWidth={1}
                />
              )}
            </g>
          );
        })}

        <text
          x={350}
          y={458}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={11.5}
          fill={SUB_FARGE}
        >
          … og ≈ 1 200 nye rader hvert sekund
        </text>
      </g>

      {/* Terminalvindu med testkjøringen */}
      <g transform="translate(772 48)">
        <rect width={436} height={470} rx={14} fill="var(--teal)" />
        <path
          d="M 0 14 A 14 14 0 0 1 14 0 H 422 A 14 14 0 0 1 436 14 V 36 H 0 Z"
          fill="rgba(0, 0, 0, 0.22)"
        />
        <circle cx={22} cy={18} r={5.5} fill="#ff5f57" />
        <circle cx={40} cy={18} r={5.5} fill="#febc2e" />
        <circle cx={58} cy={18} r={5.5} fill="#28c840" />
        <text
          x={218}
          y={22.5}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={11}
          fill="rgba(251, 240, 229, 0.6)"
        >
          datatester — ais_posisjoner
        </text>

        {TERMINAL_LINJER.map((linje, i) => {
          const y = 78 + linje.slot * 33;
          return (
            <g key={i} opacity={0}>
              <Appear at={linje.at} />
              <text x={24} y={y} fontFamily={MONO} fontSize={14}>
                {linje.deler.map((del, j) => (
                  <tspan key={j} fill={del.farge} fontWeight={del.vekt ?? 400}>
                    {del.t}
                  </tspan>
                ))}
              </text>
              {linje.hoyre && (
                <text
                  x={412}
                  y={y}
                  textAnchor="end"
                  fontFamily={MONO}
                  fontSize={12.5}
                  fill="rgba(251, 240, 229, 0.55)"
                >
                  {linje.hoyre}
                </text>
              )}
            </g>
          );
        })}
      </g>

      <text
        x={620}
        y={580}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fill="var(--red)"
      >
        Testene er kode – kjørt automatisk på hver eneste rad
      </text>
    </svg>
  );
}

/* ---------- DatatestPort ---------- */

function IkonDatabase() {
  return (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  );
}

function IkonGnist() {
  return <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />;
}

function IkonSkjold() {
  return (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6z" />
      <path d="M8.7 12l2.2 2.2 4.4-4.4" />
    </>
  );
}

function IkonBjelle() {
  return (
    <>
      <path d="M12 4a5 5 0 0 1 5 5v3.5l1.5 2.5H5.5L7 12.5V9a5 5 0 0 1 5-5z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  );
}

function LagKort({
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
  icon: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={270} height={120} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <rect x={18} y={38} width={44} height={44} rx={12} fill="rgba(0, 64, 71, 0.06)" stroke="rgba(0, 64, 71, 0.12)" />
      <g
        transform="translate(28 48)"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </g>
      <text x={78} y={57} fontFamily="var(--font-sans)" fontWeight={600} fontSize={18} fill="var(--burgundy)">
        {title}
      </text>
      <text x={78} y={80} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
        {sub}
      </text>
    </g>
  );
}

/** Ball som skifter farge idet den passerer testporten */
function TestBall({
  path,
  dur,
  begin,
  tilFarge,
  bytteTid,
}: {
  path: string;
  dur: number;
  begin: number;
  tilFarge: string;
  bytteTid: number;
}) {
  return (
    <circle r={5} fill={DUS}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      <animate
        attributeName="fill"
        calcMode="discrete"
        values={`${DUS};${tilFarge}`}
        keyTimes={`0;${bytteTid}`}
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.92;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

const CHIPS = ["skjema", "gyldige verdier", "duplikater", "ferskhet"];

export function DatatestPort() {
  const grontSpor = "M 310 260 H 930";
  const rodtSpor = "M 310 260 H 575 C 615 260 620 292 620 330 V 498";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Kvalitetsport: rådata fra bronse testes – gyldige rader går til sølv, avvik til karantene"
    >
      <Pill cx={620} text="TESTENE BOR I PIPELINEN" w={260} />

      {/* Stiplede spor */}
      <path d="M 310 260 H 500" fill="none" stroke={LINJE_FARGE} strokeWidth={1.6} strokeDasharray="1.5 7" strokeLinecap="round" />
      <path d="M 740 260 H 930" fill="none" stroke={LINJE_FARGE} strokeWidth={1.6} strokeDasharray="1.5 7" strokeLinecap="round" />
      <path d="M 620 450 V 500" fill="none" stroke="rgba(255, 48, 59, 0.45)" strokeWidth={1.6} strokeDasharray="1.5 7" strokeLinecap="round" />

      {/* Andeler som passerer / stoppes */}
      <text x={835} y={243} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={SUB_FARGE}>
        ≈ 99,7 %
      </text>
      <text x={650} y={484} fontFamily={MONO} fontSize={12} fill="var(--red)">
        ≈ 0,3 %
      </text>

      {/* Baller: de fleste slipper gjennom, noen avvises */}
      {[0, -1.5, -3, -4.5].map((b) => (
        <TestBall key={`ok-${b}`} path={grontSpor} dur={6} begin={b} tilFarge={MINT} bytteTid={0.5} />
      ))}
      {[-0.75, -3.75].map((b) => (
        <TestBall key={`avvik-${b}`} path={rodtSpor} dur={6} begin={b} tilFarge={ROD} bytteTid={0.52} />
      ))}

      <LagKort x={40} y={200} title="Bronse" sub="rådata – alt tas imot" icon={<IkonDatabase />} />
      <LagKort x={930} y={200} title="Sølv" sub="kvalitetssikret – klar til bruk" icon={<IkonGnist />} />

      {/* Testporten */}
      <g>
        <rect x={500} y={110} width={240} height={340} rx={18} fill="var(--teal)" />
        <g
          transform="translate(603.2 132) scale(1.4)"
          fill="none"
          stroke="var(--mint)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IkonSkjold />
        </g>
        <text x={620} y={200} textAnchor="middle" fontFamily="var(--font-serif)" fontSize={26} fill="var(--cream)">
          Datatester
        </text>
        <rect x={602} y={212} width={36} height={3} rx={1.5} fill="var(--mint)" />
        {CHIPS.map((chip, i) => {
          const w = 30 + chip.length * 7.4;
          const y = 236 + i * 46;
          return (
            <g key={chip}>
              <rect
                x={620 - w / 2}
                y={y}
                width={w}
                height={30}
                rx={15}
                fill="rgba(120, 232, 219, 0.12)"
                stroke="var(--mint)"
                strokeWidth={1}
              />
              <text
                x={620}
                y={y + 19.5}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontWeight={600}
                fontSize={12}
                letterSpacing={0.5}
                fill="var(--mint)"
              >
                {chip}
              </text>
            </g>
          );
        })}
      </g>

      {/* Karantene med varsling */}
      <rect
        x={505}
        y={505}
        width={230}
        height={78}
        rx={14}
        fill="rgba(255, 48, 59, 0.07)"
        stroke="var(--red)"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <text x={620} y={539} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={600} fontSize={15} fill="var(--red)">
        Karantene
      </text>
      <text x={620} y={560} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill={SUB_FARGE}>
        avvik holdes tilbake
      </text>
      <path d="M 735 544 H 768" fill="none" stroke="rgba(255, 48, 59, 0.45)" strokeWidth={1.6} strokeDasharray="1.5 7" strokeLinecap="round" />
      <g
        transform="translate(776 532)"
        fill="none"
        stroke="var(--red)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonBjelle />
      </g>
      <text x={808} y={549} fontFamily="var(--font-sans)" fontSize={13} fill="var(--red)">
        varsel til teamet
      </text>

      <text
        x={620}
        y={620}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fill="var(--red)"
      >
        Alt tas imot – men bare kvalitetssikrede rader slipper videre
      </text>
    </svg>
  );
}
