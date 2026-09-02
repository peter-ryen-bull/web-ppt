import type { ReactNode } from "react";

/*
 * Figurer for datakontrakter – "show, don't tell":
 *
 *  - DatakontraktApi: selve kontrakten som et YAML-dokument midt mellom
 *    produsent og konsumenter – et API, men for data. Databallene flyter
 *    fra produsenten, gjennom kontrakten, ut til konsumentene.
 *  - DatakontraktBrudd: to parallelle løp for samme skjemaendring. Uten
 *    kontrakt sklir endringen stille gjennom og knekker dashbordet uker
 *    senere. Med kontrakt stoppes den høylytt i pull requesten – før den
 *    når produksjon.
 *
 * Ren SVG (viewBox 1240x640) i Miles-paletten, animert med SMIL.
 */

const W = 1240;
const H = 640;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SUB_FARGE = "#9a5068";
const LINJE_FARGE = "rgba(69, 13, 32, 0.25)";
const DUS = "#9a5068";
const ROD = "#ff303b";

function Pill({ cx, y = 8, text, w }: { cx: number; y?: number; text: string; w: number }) {
  return (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={30} rx={15} fill="var(--teal)" />
      <text
        x={cx}
        y={y + 19.5}
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

function IkonDatabase() {
  return (
    <>
      <ellipse cx={12} cy={5.5} rx={7.5} ry={3} />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
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

function IkonKode() {
  return (
    <>
      <path d="M8.5 6.5 3.5 12l5 5.5" />
      <path d="M15.5 6.5l5 5.5-5 5.5" />
    </>
  );
}

/* ---------- Felles kort ---------- */

function Kort({
  x,
  y,
  w = 280,
  h = 104,
  title,
  sub,
  icon,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub: string;
  icon: ReactNode;
}) {
  const cy = h / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <rect
        x={18}
        y={cy - 22}
        width={44}
        height={44}
        rx={12}
        fill="rgba(0, 64, 71, 0.06)"
        stroke="rgba(0, 64, 71, 0.12)"
      />
      <g
        transform={`translate(28 ${cy - 12})`}
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
        y={cy - 3}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={17}
        fill="var(--burgundy)"
      >
        {title}
      </text>
      <text x={78} y={cy + 20} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
        {sub}
      </text>
    </g>
  );
}

/** Stiplet linje med baller som flyter langs den */
function Flyt({
  d,
  dur,
  begins,
  color,
}: {
  d: string;
  dur: number;
  begins: number[];
  color: string;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={LINJE_FARGE}
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

/** Myk S-kurve fra (x1, y1) til (x2, y2) */
function kurve(x1: number, y1: number, x2: number, y2: number) {
  const k = (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
}

/* ---------- DatakontraktApi ---------- */

type Seg = { t: string; nokkel?: boolean };

/** Kontraktinnholdet – nøkler i teal, verdier i burgunder */
const KONTRAKT_LINJER: Seg[][] = [
  [{ t: "dataprodukt:", nokkel: true }, { t: " ais_tracks" }],
  [{ t: "versjon:", nokkel: true }, { t: "     2.1.0" }],
  [{ t: "eier:", nokkel: true }, { t: "        team-hav" }],
  [],
  [{ t: "skjema:", nokkel: true }],
  [{ t: "  mmsi:", nokkel: true }, { t: "      heltall · ikke null" }],
  [{ t: "  posisjon:", nokkel: true }, { t: "  gyldig lat/lon" }],
  [{ t: "  fart:", nokkel: true }, { t: "      0–60 knop" }],
  [],
  [{ t: "kvalitet:", nokkel: true }],
  [{ t: "  ferskhet:", nokkel: true }, { t: "  < 5 minutter" }],
  [{ t: "  dubletter:", nokkel: true }, { t: " ingen" }],
  [],
  [{ t: "vilkår:", nokkel: true }],
  [{ t: "  bruk:", nokkel: true }, { t: "      åpne data (NLOD)" }],
  [{ t: "  varsling:", nokkel: true }, { t: "  #vakt-hav" }],
];

const KONSUMENTER = [
  { title: "Dashbord", sub: "innsikt & analyse", icon: <IkonSoyler /> },
  { title: "ML-modell", sub: "ankomstprediksjon", icon: <IkonGnist /> },
  { title: "Åpne data", sub: "API · BarentsWatch", icon: <IkonDeling /> },
];

export function DatakontraktApi() {
  const konsumentYs = [110, 256, 402];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Datakontrakt: et YAML-dokument mellom produsent og konsumenter – et API for data"
    >
      <Pill cx={620} text="ET API – MEN FOR DATA" w={250} />

      {/* Produsenten lover – konsumentene kan stole på */}
      <text x={395} y={284} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--red)">
        forplikter seg
      </text>
      <text x={845} y={284} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--red)">
        kan stole på
      </text>

      <Flyt d="M 340 302 H 450" dur={5} begins={[0, -2.5]} color="var(--red)" />
      {konsumentYs.map((y, i) => (
        <Flyt
          key={y}
          d={kurve(790, 302, 900, y + 44)}
          dur={5}
          begins={[-(i * 1.6 + 0.8), -(i * 1.6 + 3.3)]}
          color="var(--teal)"
        />
      ))}

      <Kort
        x={60}
        y={250}
        title="Produsent"
        sub="team-hav – eier dataproduktet"
        icon={<IkonDatabase />}
      />
      {KONSUMENTER.map((k, i) => (
        <Kort key={k.title} x={900} y={konsumentYs[i]} h={88} {...k} />
      ))}

      {/* Selve kontrakten – et dokument mennesker og maskiner kan lese */}
      <g transform="translate(450 64)">
        <rect width={340} height={470} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
        <path
          d="M 0 14 A 14 14 0 0 1 14 0 H 326 A 14 14 0 0 1 340 14 V 36 H 0 Z"
          fill="var(--teal)"
        />
        <text
          x={170}
          y={23}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={11.5}
          fill="rgba(251, 240, 229, 0.85)"
        >
          ais_tracks · datakontrakt.yaml
        </text>
        {KONTRAKT_LINJER.map((linje, i) => (
          <text key={i} x={22} y={68 + i * 25.5} fontFamily={MONO} fontSize={13.5} xmlSpace="preserve">
            {linje.map((seg, j) => (
              <tspan
                key={j}
                fill={seg.nokkel ? "var(--teal)" : "var(--burgundy)"}
                fontWeight={seg.nokkel ? 600 : 400}
              >
                {seg.t}
              </tspan>
            ))}
          </text>
        ))}
      </g>

      <text
        x={620}
        y={618}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fill="var(--red)"
      >
        Én avtale begge sider forholder seg til – lesbar for mennesker, håndhevbar for maskiner
      </text>
    </svg>
  );
}

/* ---------- DatakontraktBrudd ---------- */

/** Total looptid (sekunder) */
const T = 12;

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

/** Ball som beveger seg langs `path` mellom `fra` og `til` sekunder inn i loopen */
function EngangsBall({
  path,
  fra,
  til,
  blirRodVed,
}: {
  path: string;
  fra: number;
  til: number;
  blirRodVed?: number;
}) {
  const k = (s: number) => (s / T).toFixed(4);
  return (
    <circle r={5} fill={DUS}>
      <animateMotion
        dur={`${T}s`}
        repeatCount="indefinite"
        path={path}
        calcMode="linear"
        keyPoints={`0;0;1;1`}
        keyTimes={`0;${k(fra)};${k(til)};1`}
      />
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes={`0;${k(fra)};${k(fra + 0.2)};${k(til)};${k(til + 0.3)};1`}
        dur={`${T}s`}
        repeatCount="indefinite"
      />
      {blirRodVed !== undefined && (
        <animate
          attributeName="fill"
          calcMode="discrete"
          values={`${DUS};${ROD};${DUS}`}
          keyTimes={`0;${k(blirRodVed)};0.99`}
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>
  );
}

/** Kortet som viser skjemaendringen produsenten gjør */
function EndringKort({ y }: { y: number }) {
  return (
    <g transform={`translate(40 ${y})`}>
      <rect width={270} height={90} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <g
        transform="translate(18 33)"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonKode />
      </g>
      <text x={56} y={34} fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
        produsenten endrer skjema
      </text>
      <text x={56} y={62} fontFamily={MONO} fontSize={15} xmlSpace="preserve">
        <tspan fill="var(--teal)" fontWeight={600}>
          fart:{" "}
        </tspan>
        <tspan fill={SUB_FARGE} textDecoration="line-through">
          tall
        </tspan>
        <tspan fill="var(--burgundy)"> → </tspan>
        <tspan fill="var(--red)" fontWeight={600}>
          tekst
        </tspan>
      </text>
    </g>
  );
}

/** Dashbord-kortet i enden av hvert løp */
function DashbordKort({ y, sub }: { y: number; sub: string }) {
  return (
    <g transform={`translate(940 ${y})`}>
      <rect width={260} height={90} rx={14} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      <rect x={16} y={23} width={44} height={44} rx={12} fill="rgba(0, 64, 71, 0.06)" stroke="rgba(0, 64, 71, 0.12)" />
      <g
        transform="translate(26 33)"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IkonSoyler />
      </g>
      <text x={74} y={41} fontFamily="var(--font-sans)" fontWeight={600} fontSize={16} fill="var(--burgundy)">
        Dashbord
      </text>
      <text x={74} y={63} fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
        {sub}
      </text>
    </g>
  );
}

export function DatakontraktBrudd() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Samme skjemaendring uten og med datakontrakt: uten kontrakt knekker dashbordet stille, med kontrakt stoppes endringen i pull requesten"
    >
      {/* ---------- Løp 1: uten kontrakt ---------- */}
      <Pill cx={135} y={40} text="UTEN KONTRAKT" w={190} />

      <path
        d="M 310 130 H 940"
        fill="none"
        stroke={LINJE_FARGE}
        strokeWidth={1.6}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      <EngangsBall path="M 310 130 L 940 130" fra={1} til={5} blirRodVed={4.9} />
      <EndringKort y={85} />
      <DashbordKort y={85} sub="i produksjon" />

      <g opacity={0}>
        <Appear at={3.0} />
        <text x={625} y={114} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill={SUB_FARGE}>
          ingen varsel – avhengigheten er skjult
        </text>
      </g>

      {/* Dashbordet knekker stille */}
      <g opacity={0}>
        <Appear at={5.2} />
        <rect x={940} y={85} width={260} height={90} rx={14} fill="rgba(255, 48, 59, 0.07)" stroke="var(--red)" strokeWidth={1.5} />
        <circle cx={1178} cy={107} r={11} fill="rgba(255, 48, 59, 0.12)" stroke="var(--red)" strokeWidth={1.5} />
        <path d="M 1173.5 102.5 l 9 9 M 1182.5 102.5 l -9 9" stroke="var(--red)" strokeWidth={2.2} strokeLinecap="round" />
      </g>
      <g opacity={0}>
        <Appear at={5.6} />
        <text x={1070} y={202} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={600} fontSize={13.5} fill="var(--red)">
          knekker stille
        </text>
        <text x={1070} y={222} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill={SUB_FARGE}>
          feilen oppdages uker senere – nedstrøms
        </text>
      </g>

      {/* ---------- Løp 2: med kontrakt ---------- */}
      <Pill cx={135} y={250} text="MED KONTRAKT" w={190} />

      <path
        d="M 310 380 H 560"
        fill="none"
        stroke={LINJE_FARGE}
        strokeWidth={1.6}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      <path
        d="M 740 380 H 940"
        fill="none"
        stroke={LINJE_FARGE}
        strokeWidth={1.6}
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      <EngangsBall path="M 310 380 L 552 380" fra={1} til={2.8} blirRodVed={2.7} />
      <EndringKort y={335} />
      <DashbordKort y={335} sub="fortsatt friskt" />

      {/* Grønn hake: produksjon er uberørt */}
      <circle cx={1178} cy={357} r={11} fill="rgba(120, 232, 219, 0.3)" stroke="var(--teal)" strokeWidth={1.5} />
      <path
        d="M 1173 357 l 3.5 3.5 L 1183.5 352.5"
        fill="none"
        stroke="var(--teal)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Porten: kontraktsjekken i pull requesten */}
      <g>
        <rect x={560} y={290} width={180} height={180} rx={16} fill="var(--teal)" />
        <g
          transform="translate(634.4 306) scale(1.3)"
          fill="none"
          stroke="var(--mint)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IkonSkjold />
        </g>
        <text x={650} y={368} textAnchor="middle" fontFamily="var(--font-serif)" fontSize={19} fill="var(--cream)">
          Kontraktsjekk
        </text>
        <rect x={632} y={379} width={36} height={3} rx={1.5} fill="var(--mint)" />
        <rect x={584} y={396} width={132} height={26} rx={13} fill="rgba(120, 232, 219, 0.12)" stroke="var(--mint)" strokeWidth={1} />
        <text
          x={650}
          y={413}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={11}
          letterSpacing={0.5}
          fill="var(--mint)"
        >
          i pull requesten
        </text>
      </g>

      {/* Bruddet stoppes – høylytt og tidlig */}
      <g opacity={0}>
        <Appear at={3.0} />
        <text x={560} y={502} fontFamily={MONO} fontSize={13.5} fill="var(--red)" xmlSpace="preserve">
          <tspan fontWeight={700}>FAIL  </tspan>
          <tspan>skjema: fart må være tall (0–60)</tspan>
        </text>
      </g>
      <g opacity={0}>
        <Appear at={3.8} />
        <g
          transform="translate(560 516)"
          fill="none"
          stroke="var(--red)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IkonBjelle />
        </g>
        <text x={592} y={533} fontFamily="var(--font-sans)" fontSize={13} fill="var(--red)">
          varsel til produsenten – før noe når produksjon
        </text>
      </g>

      <text
        x={620}
        y={618}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fill="var(--red)"
      >
        Et stille brudd nedstrøms blir en høylytt og tidlig feil
      </text>
    </svg>
  );
}
