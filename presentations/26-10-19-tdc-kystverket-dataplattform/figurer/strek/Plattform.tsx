import {
  bolgelinje,
  BLG,
  DUS,
  Duv,
  Figur,
  KREM,
  Menneske,
  MINT,
  Puls,
  ROD,
  Roter,
  STREK,
  Sving,
  tannhjul,
  TEAL,
  Tekst,
} from "./Strek";
import { IkonI, type IkonNavn } from "./Ikoner";

/*
 * Strek-figurer til dataplattform-kapittelet: grunnmuren, verbrekka,
 * bolk vs. strøm, varehus vs. plattform, dataproduktet som pakke,
 * governance-trioen, «teknikk vs. organisasjon» og de fire rollene.
 */

/** Hus på en grunnmur – grunnmuren er dataplattformen */
export function Grunnmur() {
  return (
    <Figur w={420} h={170} label="Et hus som står på en grunnmur">
      <path d="M 40 150 H 380" strokeWidth={2} opacity={0.5} />

      {/* Huset */}
      <rect x={150} y={62} width={120} height={60} fill={KREM} />
      <rect x={246} y={26} width={14} height={22} fill={KREM} />
      <path d="M 138 64 L 210 18 L 282 64" fill={KREM} />
      <rect x={198} y={92} width={24} height={30} rx={2} fill={KREM} />
      <rect x={162} y={76} width={22} height={20} rx={2} fill={KREM} strokeWidth={2} />
      <rect x={236} y={76} width={22} height={20} rx={2} fill={KREM} strokeWidth={2} />

      {/* Grunnmuren */}
      <rect x={130} y={122} width={160} height={28} rx={3} fill={TEAL} />
      <rect x={126} y={118} width={168} height={36} rx={6} stroke={ROD} strokeWidth={2} opacity={0}>
        <Puls fra={0} til={0.9} dur={3.4} />
      </rect>
      <Tekst x={210} y={140} size={11} color={MINT} weight={600}>
        DATAPLATTFORM
      </Tekst>
    </Figur>
  );
}

/** En liten database-sylinder med origo øverst til venstre */
function Sylinder({ x, y, w = 44, h = 50 }: { x: number; y: number; w?: number; h?: number }) {
  const ry = w * 0.16;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 ${ry} V ${h - ry} A ${w / 2} ${ry} 0 0 0 ${w} ${h - ry} V ${ry}`} fill={KREM} />
      <ellipse cx={w / 2} cy={ry} rx={w / 2} ry={ry} fill={KREM} />
      <path d={`M 0 ${h / 2} A ${w / 2} ${ry} 0 0 0 ${w} ${h / 2}`} strokeWidth={1.6} opacity={0.6} />
    </g>
  );
}

/**
 * Uber-historien i én figur: tre databaser med skript i kryss og tvers oppå,
 * og én felles plattform under. Skriptene glimter urolig; plattformen ligger rolig.
 */
export function SiloTilPlattform() {
  const W = 300;
  const H = 330;
  const skript = [
    "M 62 78 C 110 40 180 120 232 66",
    "M 82 92 C 120 150 200 30 246 90",
    "M 58 60 C 140 130 160 20 240 100",
    "M 150 96 C 100 40 220 40 150 30",
  ];
  return (
    <Figur w={W} h={H} label="Tre separate databaser floket sammen, som blir én felles plattform">
      {/* Siloene */}
      <Sylinder x={40} y={40} />
      <Sylinder x={128} y={40} />
      <Sylinder x={216} y={40} />

      {/* Skriptene som limer dem sammen */}
      {skript.map((d, i) => (
        <path key={d} d={d} stroke={ROD} strokeWidth={1.6} strokeDasharray="3 5" opacity={0.5}>
          <Puls fra={0.25} til={0.8} dur={3 + i * 0.7} begin={i * 0.4} />
        </path>
      ))}
      <Tekst x={150} y={128} size={12}>
        hvert team sin egen sannhet
      </Tekst>

      {/* Pilen ned */}
      <path d="M 150 148 V 186" stroke={ROD} strokeWidth={2.4} />
      <path d="M 141 178 L 150 188 L 159 178" stroke={ROD} strokeWidth={2.4} />

      {/* Plattformen */}
      <rect x={30} y={206} width={240} height={94} rx={12} fill={KREM} />
      <Sylinder x={64} y={224} w={36} h={44} />
      <Sylinder x={132} y={224} w={36} h={44} />
      <Sylinder x={200} y={224} w={36} h={44} />
      <path d="M 100 246 H 132 M 168 246 H 200" stroke={TEAL} strokeWidth={2} />
      <rect x={30} y={290} width={240} height={10} rx={3} fill={TEAL} stroke="none" />
      <Tekst x={150} y={322} size={12}>
        én felles plattform
      </Tekst>
    </Figur>
  );
}

/** Verbrekka: hente inn → lagre → transformere → dele, med styring som lag under hele røret */
export function Verbrekke() {
  const steg: { navn: IkonNavn; tekst: string }[] = [
    { navn: "innboks", tekst: "hente inn" },
    { navn: "database", tekst: "lagre" },
    { navn: "rotasjon", tekst: "transformere" },
    { navn: "deling", tekst: "dele" },
  ];
  const first = 125;
  const gap = 250;
  const barX = first - 45;
  const barW = (steg.length - 1) * gap + 90;
  return (
    <Figur
      w={1000}
      h={168}
      label="Hente inn, lagre, transformere og dele, med styring som lag under hele pipelinen"
    >
      {steg.map((s, i) => {
        const cx = first + i * gap;
        const next = first + (i + 1) * gap;
        return (
          <g key={s.navn}>
            <IkonI navn={s.navn} x={cx - 22} y={6} size={44} color={TEAL} strokeWidth={1.8} />
            <Tekst x={cx} y={82} size={16} color={STREK}>
              {s.tekst}
            </Tekst>
            {i < steg.length - 1 && (
              <path
                d={`M ${cx + 72} 28 H ${next - 72} M ${next - 79} 21 L ${next - 72} 28 L ${next - 79} 35`}
                stroke={ROD}
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}
      <rect x={barX} y={108} width={barW} height={10} rx={3} fill={TEAL} stroke="none" />
      <IkonI navn="skjold" x={430} y={124} size={26} color={TEAL} strokeWidth={1.8} />
      <Tekst x={500} y={144} size={16} color={STREK}>
        styre
      </Tekst>
    </Figur>
  );
}

/** Batch (klokke og bolk som samles opp) mot streaming (jevn bølge) */
export function BolkOgStrom() {
  const T = 8;
  const blokker = [116, 134, 152, 170];
  return (
    <Figur w={420} h={150} label="Batch: bolker med faste intervaller. Streaming: en jevn strøm.">
      <defs>
        <clipPath id="bolk-strom-clip">
          <rect x={232} y={20} width={176} height={110} />
        </clipPath>
      </defs>

      {/* Klokke */}
      <circle cx={60} cy={62} r={24} fill={KREM} />
      <path d="M 60 62 h 13" strokeWidth={2} />
      <Roter cx={60} cy={62} dur={T}>
        <path d="M 60 62 V 44" stroke={ROD} strokeWidth={2.2} />
      </Roter>
      <circle cx={60} cy={62} r={2} fill={STREK} stroke="none" />

      {/* Oppsamlingsbrettet – fylles opp og tømmes i én bolk */}
      <path d="M 108 66 V 92 H 194 V 66" />
      {blokker.map((x, i) => {
        const inn = (0.6 + i * 1.5) / T;
        return (
          <rect key={x} x={x} y={74} width={16} height={14} rx={2} fill={TEAL} stroke="none" opacity={0}>
            <animate
              attributeName="opacity"
              calcMode="discrete"
              values="0; 1; 0"
              keyTimes={`0; ${inn.toFixed(3)}; 0.9`}
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </rect>
        );
      })}
      <path d="M 200 81 h 14 M 208 75 l 6 6 -6 6" stroke={ROD} strokeWidth={2} opacity={0}>
        <animate
          attributeName="opacity"
          values="0; 0; 1; 0"
          keyTimes="0; 0.88; 0.92; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      </path>
      <Tekst x={130} y={126} size={11} color={TEAL} weight={600}>
        BATCH
      </Tekst>

      <path d="M 218 22 V 128" stroke="var(--cream-dark)" strokeWidth={1.5} strokeDasharray="2 7" />

      {/* Strømmen – en bølge som aldri stopper */}
      <g clipPath="url(#bolk-strom-clip)">
        <path d={bolgelinje(72, 10, 420)} stroke={TEAL} strokeWidth={2.5}>
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`${-BLG} 0`}
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      <Tekst x={320} y={126} size={11} color={TEAL} weight={600}>
        STREAMING
      </Tekst>
    </Figur>
  );
}

/** En database er et skjema du migrerer – en plattform er hele arbeidsbenken */
export function VarehusVsPlattform() {
  const ting: IkonNavn[] = ["skjold", "bok", "server", "kode", "gnist"];
  return (
    <Figur w={420} h={400} label="En database låst til ett skjema, mot en plattform du styrer, regner og bygger på">
      {/* Databasen */}
      <Sylinder x={146} y={8} w={128} h={140} />
      <ellipse cx={210} cy={28.5} rx={64} ry={20.5} fill="none" stroke={TEAL} strokeWidth={2} opacity={0}>
        <Puls fra={0.15} til={0.85} dur={3.2} />
      </ellipse>
      <Tekst x={210} y={176} size={13}>
        skjema · migrere
      </Tekst>

      <path d="M 48 198 H 372" stroke="var(--cream-dark)" strokeWidth={1.5} strokeDasharray="2 7" />

      {/* Plattformen */}
      <rect x={36} y={286} width={348} height={10} rx={2} fill={TEAL} />
      <path d="M 62 296 V 340 M 118 296 V 340 M 302 296 V 340 M 358 296 V 340" strokeWidth={2.2} />
      {ting.map((navn, i) => {
        const x = 70 + i * 70;
        return (
          <g key={navn}>
            <IkonI navn={navn} x={x - 18} y={222} size={36} color={TEAL} strokeWidth={1.8} />
            <circle cx={x} cy={208} r={3.5} fill={ROD} stroke="none">
              <Puls fra={0.2} til={1} dur={2.4} begin={i * 0.55} />
            </circle>
          </g>
        );
      })}
      <Tekst x={210} y={372} size={13}>
        styre · regne · kjøre
      </Tekst>
    </Figur>
  );
}

/** En liten merket pakke, brukt som output fra plattformen */
function MiniPakke({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 0 18 L 18 2 H 78 L 60 18 Z" fill={KREM} />
      <path d="M 60 18 L 78 2 V 52 L 60 68 Z" fill={KREM} />
      <rect x={0} y={18} width={60} height={50} fill={KREM} />
      <path d="M 30 18 V 68 M 30 18 L 48 2" strokeWidth={1.8} opacity={0.55} />
      <circle cx={44} cy={54} r={9} fill={KREM} stroke={ROD} strokeWidth={1.8} />
      <path d="M 40 54 l 3 3 6.5 -7" stroke={ROD} strokeWidth={1.8} />
    </g>
  );
}

/** Plattformen som en boks: det som kommer ut er dataprodukter */
export function PlattformProdukter() {
  const produkter = ["AIS-spor", "fartøy", "utslipp"];
  return (
    <Figur
      w={460}
      h={340}
      label="En dataplattform med dataprodukter som kommer ut på den andre siden"
    >
      <rect x={16} y={70} width={176} height={200} rx={18} fill={TEAL} />
      <Tekst x={104} y={158} size={14} color={MINT} weight={600}>
        DATA
      </Tekst>
      <Tekst x={104} y={180} size={14} color={MINT} weight={600}>
        PLATTFORM
      </Tekst>

      <path
        d="M 204 170 H 248"
        stroke={ROD}
        strokeWidth={1.8}
        strokeDasharray="2 6"
        opacity={0.7}
      />
      <path d="M 240 163 L 252 170 L 240 177" stroke={ROD} strokeWidth={2} />

      {produkter.map((navn, i) => {
        const y = 36 + i * 98;
        return (
          <Duv key={navn} dy={3} dur={3.4 + i * 0.5}>
            <MiniPakke x={268} y={y} />
            <Tekst x={360} y={y + 48} size={13} anchor="start">
              {navn}
            </Tekst>
          </Duv>
        );
      })}
    </Figur>
  );
}

/** Dataproduktet som en pakke: merket, forseglet og med kvalitetsstempel */
export function Pakke() {
  return (
    <Figur w={420} h={150} label="En pakke med merkelapp og kvalitetsstempel">
      <path d="M 150 60 L 180 36 H 280 L 250 60 Z" fill={KREM} />
      <path d="M 250 60 L 280 36 V 106 L 250 130 Z" fill={KREM} />
      <rect x={150} y={60} width={100} height={70} fill={KREM} />
      <path d="M 200 60 V 130 M 200 60 L 230 36" strokeWidth={2} opacity={0.6} />

      {/* Merkelappen svinger fra hjørnet */}
      <Sving grader={5} cx={150} cy={62} dur={4.2}>
        <path d="M 150 62 L 128 82" strokeWidth={1.8} />
        <path d="M 128 82 l -20 11 l -9 -16 l 20 -11 z" fill={KREM} strokeWidth={2} />
        <circle cx={123} cy={81} r={1.8} fill={STREK} stroke="none" />
      </Sving>

      {/* Kvalitetsstempelet */}
      <circle cx={232} cy={112} r={14} fill={KREM} stroke={ROD} strokeWidth={2} />
      <path d="M 225.5 112 l 4.5 4.5 L 239 107.5" stroke={ROD} strokeWidth={2.4} />
    </Figur>
  );
}

/** Datakontrakten som et merket dokument */
export function KontraktArk() {
  return (
    <Figur w={420} h={150} label="Et signert dokument med kvalitetsstempel">
      <rect x={150} y={18} width={120} height={118} rx={8} fill={KREM} />
      <path d="M 168 48 H 252 M 168 68 H 252 M 168 88 H 228" strokeWidth={2} opacity={0.55} />
      <circle cx={246} cy={112} r={14} fill={KREM} stroke={ROD} strokeWidth={2} />
      <path d="M 239.5 112 l 4.5 4.5 L 253 107.5" stroke={ROD} strokeWidth={2.4} />
    </Figur>
  );
}

/** Katalogen som kartet organisasjonen mangler */
export function KatalogKart() {
  return (
    <Figur w={420} h={150} label="Et brettet kart med en nål i midten">
      <path d="M 130 38 L 186 50 L 242 36 L 298 50 V 128 L 242 114 L 186 128 L 130 114 Z" fill={KREM} />
      <path d="M 186 50 V 128 M 242 36 V 114" strokeWidth={1.8} opacity={0.45} />
      <path d="M 214 58 C 214 48 226 48 226 58 C 226 70 220 78 220 78 S 214 70 214 58" fill={KREM} stroke={ROD} strokeWidth={2} />
      <circle cx={220} cy={58} r={3.2} fill={ROD} stroke="none" />
    </Figur>
  );
}

/** Kontrakt og katalog – governance etter at eierskap er dekket i dataprodukt */
export function GovernanceTrio() {
  const deler: { navn: IkonNavn; tekst: string }[] = [
    { navn: "kontrakt", tekst: "kontrakt" },
    { navn: "bok", tekst: "katalog" },
  ];
  return (
    <Figur w={500} h={130} label="Datakontrakt og datakatalog">
      {deler.map((d, i) => {
        const cx = 160 + i * 180;
        return (
          <g key={d.navn}>
            <circle cx={cx} cy={56} r={40} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
            <IkonI navn={d.navn} x={cx - 20} y={36} size={40} color={TEAL} strokeWidth={1.8} />
            <Tekst x={cx} y={122} size={12.5}>
              {d.tekst}
            </Tekst>
          </g>
        );
      })}
    </Figur>
  );
}

/** Tannhjulene går som de skal – folkene drar i ulike retninger */
export function TeknikkVsOrganisasjon() {
  const person = (x: number) => (
    <g>
      <circle cx={x} cy={82} r={12} fill={KREM} />
      <path d={`M ${x} 94 V 128`} />
      <path d={`M ${x - 17} 114 L ${x} 100 L ${x + 17} 114`} />
      <path d={`M ${x - 15} 154 L ${x} 128 L ${x + 15} 154`} />
    </g>
  );
  const pil = (d: string) => <path d={d} stroke={ROD} strokeWidth={2.2} />;

  return (
    <Figur w={800} h={200} label="Tannhjul som går rundt, og tre personer som peker i ulike retninger">
      {/* Teknikken */}
      <Roter cx={150} cy={104} dur={16}>
        <path d={tannhjul(150, 104, 46, 10)} fill={KREM} />
      </Roter>
      <circle cx={150} cy={104} r={12} fill={KREM} />
      <Roter cx={232} cy={70} dur={11.2} retning={-1}>
        <path d={tannhjul(232, 70, 32, 7)} fill={KREM} />
      </Roter>
      <circle cx={232} cy={70} r={9} fill={KREM} />
      <circle cx={262} cy={134} r={14} fill={KREM} stroke={TEAL} strokeWidth={2} />
      <path d="M 255.5 134 l 4.5 4.5 L 269 129.5" stroke={TEAL} strokeWidth={2.4} />
      <Tekst x={190} y={186} size={12.5}>
        teknikken går rundt
      </Tekst>

      <path d="M 400 30 V 170" stroke="var(--cream-dark)" strokeWidth={1.5} strokeDasharray="2 7" />

      {/* Organisasjonen */}
      {person(500)}
      {person(610)}
      {person(720)}
      <Sving grader={6} cx={500} cy={50} dur={4}>
        {pil("M 516 50 H 484 M 492 42 L 484 50 L 492 58")}
      </Sving>
      <Sving grader={6} cx={610} cy={50} dur={5.2}>
        {pil("M 610 64 V 36 M 602 44 L 610 36 L 618 44")}
      </Sving>
      <Sving grader={6} cx={720} cy={50} dur={4.6}>
        {pil("M 704 50 H 736 M 728 42 L 736 50 L 728 58")}
      </Sving>
      <Tekst x={610} y={186} size={12.5} color={DUS}>
        folkene drar i ulike retninger
      </Tekst>
    </Figur>
  );
}

export type RolleHvem = "plattform" | "byggere" | "governance" | "konsumenter";

function Skygge({ cx, cy = 258, rx = 54 }: { cx: number; cy?: number; rx?: number }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={9} fill="var(--cream-dark)" stroke="none" />
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={54} height={36} rx={3} fill={KREM} />
      <path d="M 10 10 h 16 M 10 18 h 28 M 10 26 h 20" stroke={TEAL} strokeWidth={1.8} />
      <path d="M -6 36 L 60 36 L 66 44 H -12 Z" fill={KREM} />
      <circle cx={48} cy={12} r={2.2} fill={ROD} stroke="none">
        <Puls fra={0.25} til={1} dur={2.2} />
      </circle>
    </g>
  );
}

function Skjold({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 -38 L 26 -26 V 2 C 26 22 12 36 0 46 C -12 36 -26 22 -26 2 V -26 Z"
        fill={KREM}
        stroke={TEAL}
        strokeWidth={2.6}
      />
      <path d="M -11 2 l 8 8 16 -16" stroke={ROD} strokeWidth={3} />
    </g>
  );
}

function Nettbrett({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={44} height={56} rx={5} fill={KREM} />
      <path d="M 8 42 H 36" strokeWidth={1.5} />
      <rect x={10} y={24} width={6} height={18} rx={1} fill={TEAL} stroke="none" />
      <rect x={19} y={14} width={6} height={28} rx={1} fill={ROD} stroke="none" />
      <rect x={28} y={20} width={6} height={22} rx={1} fill={TEAL} stroke="none" />
    </g>
  );
}

const ROLLE_LABEL: Record<RolleHvem, string> = {
  plattform: "Plattformteamet som eier grunnmuren",
  byggere: "Utviklere og analytikere som bygger på plattformen",
  governance: "Governance som setter rammene",
  konsumenter: "BI og konsumenter som bruker det som kommer ut",
};

/** Én rolle som strekfigurer – brukes fire ganger på «Tydelige roller»-sliden */
export function RolleFigur({ hvem }: { hvem: RolleHvem }) {
  return (
    <Figur w={300} h={300} strokeWidth={2.7} label={ROLLE_LABEL[hvem]}>
      <g transform="translate(20 18)">
        {hvem === "plattform" && (
          <>
            <Skygge cx={150} rx={52} />
            <Duv dy={3.5} dur={3.6}>
              <g>
                <Roter cx={78} cy={176} dur={18}>
                  <path d={tannhjul(78, 176, 32, 8)} fill={KREM} />
                </Roter>
                <circle cx={78} cy={176} r={9} fill={KREM} />
              </g>
              <Menneske x={162} y={250} s={1.38} arms="holdV" />
            </Duv>
          </>
        )}

        {hvem === "byggere" && (
          <>
            <Skygge cx={86} rx={40} />
            <Skygge cx={178} rx={40} />
            <Duv dy={3} dur={3.9}>
              <Menneske x={78} y={250} s={1.12} arms="foran" />
              <Laptop x={96} y={168} />
            </Duv>
            <Duv dy={3.5} dur={4.4}>
              <Menneske x={184} y={250} s={1.12} arms="foran" />
              <g transform="translate(198 170)">
                <path d="M 0 0 h 28 l 10 10 v 32 h -38 z" fill={KREM} />
                <path d="M 28 0 v 10 h 10" />
                <path
                  d="M 8 22 h 18 M 8 30 h 18 M 8 38 h 12"
                  stroke={TEAL}
                  strokeWidth={1.7}
                />
              </g>
            </Duv>
          </>
        )}

        {hvem === "governance" && (
          <>
            <Skygge cx={130} rx={50} />
            <Duv dy={3} dur={4.1}>
              <Menneske x={130} y={250} s={1.38} arms="foran" />
              <Skjold x={140} y={184} />
            </Duv>
          </>
        )}

        {hvem === "konsumenter" && (
          <>
            <Skygge cx={86} rx={40} />
            <Skygge cx={178} rx={40} />
            <Duv dy={3.2} dur={3.7}>
              <Menneske x={78} y={250} s={1.12} arms="foran" />
              <Nettbrett x={100} y={156} />
            </Duv>
            <Duv dy={3.8} dur={4.5}>
              <Menneske x={184} y={250} s={1.12} arms="heng" />
            </Duv>
          </>
        )}
      </g>
    </Figur>
  );
}

/** Råarkivet som aldri slettes, og transformasjonene som commits i git */
export function ArkivOgGit() {
  const commits = [
    { y: 268, r: 7 },
    { y: 208, r: 7 },
    { y: 148, r: 8 },
    { y: 88, r: 7 },
  ];
  return (
    <Figur
      w={420}
      h={360}
      label="Et hvelv med rådata som aldri slettes, og en git-ryggrad av commits for transformasjonene"
    >
      {/* Hvelvet */}
      <rect x={28} y={58} width={168} height={214} rx={18} fill={KREM} />
      <circle cx={112} cy={148} r={52} fill={KREM} />
      <circle cx={112} cy={148} r={34} fill={KREM} strokeWidth={2} />
      <circle cx={112} cy={148} r={8} fill={ROD} stroke="none">
        <Puls fra={0.45} til={1} dur={3.2} />
      </circle>
      <path d="M 112 156 V 168" stroke={KREM} strokeWidth={2} />
      <path d="M 104 176 H 120" stroke={KREM} strokeWidth={2} />
      <Sylinder x={52} y={232} w={32} h={28} />
      <Sylinder x={96} y={228} w={32} h={32} />
      <Sylinder x={140} y={232} w={32} h={28} />
      <Tekst x={112} y={304} size={13} weight={600}>
        RAW
      </Tekst>
      <Tekst x={112} y={322} size={11}>
        slettes aldri
      </Tekst>

      {/* Git-ryggraden */}
      <path d="M 318 300 V 62" stroke={TEAL} strokeWidth={2.4} />
      <path d="M 318 148 C 318 128, 356 128, 356 108" stroke={TEAL} strokeWidth={2} />
      <circle cx={356} cy={100} r={6} fill={KREM} stroke={TEAL} />
      {commits.map((c, i) => (
        <g key={c.y}>
          <circle cx={318} cy={c.y} r={c.r} fill={KREM} stroke={i === 2 ? ROD : TEAL} />
          <path
            d={`M ${318 + c.r + 8} ${c.y} h 22`}
            stroke={STREK}
            strokeWidth={1.6}
            opacity={0.45}
          />
        </g>
      ))}
      <Tekst x={318} y={334} size={13} weight={600}>
        git
      </Tekst>

      {/* Leser fra arkivet, skriver aldri tilbake */}
      <path
        d="M 196 148 H 268"
        stroke={ROD}
        strokeWidth={2}
        strokeDasharray="4 6"
        opacity={0.7}
      />
      <path d="M 258 140 L 270 148 L 258 156" stroke={ROD} strokeWidth={2} />
    </Figur>
  );
}
