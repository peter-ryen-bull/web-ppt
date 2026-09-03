import {
  bolgelinje,
  BLG,
  DUS,
  Figur,
  KREM,
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
 * governance-trioen og «teknikk vs. organisasjon».
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

/** Verbrekka alle definisjonene lander på: hente inn → lagre → transformere → dele → styre */
export function Verbrekke() {
  const steg: { navn: IkonNavn; tekst: string }[] = [
    { navn: "innboks", tekst: "hente inn" },
    { navn: "database", tekst: "lagre" },
    { navn: "rotasjon", tekst: "transformere" },
    { navn: "deling", tekst: "dele" },
    { navn: "skjold", tekst: "styre" },
  ];
  return (
    <Figur w={1000} h={100} label="Hente inn, lagre, transformere, dele og styre">
      {steg.map((s, i) => {
        const cx = 100 + i * 200;
        return (
          <g key={s.navn}>
            <IkonI navn={s.navn} x={cx - 22} y={6} size={44} color={TEAL} strokeWidth={1.8} />
            <Tekst x={cx} y={82} size={16} color={STREK}>
              {s.tekst}
            </Tekst>
            {i < steg.length - 1 && (
              <path
                d={`M ${cx + 72} 28 H ${cx + 128} M ${cx + 121} 21 L ${cx + 128} 28 L ${cx + 121} 35`}
                stroke={ROD}
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}
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

/** Et datavarehus leverer rapporter – en plattform bærer mange ting samtidig */
export function VarehusVsPlattform() {
  const T = 8;
  const ting: IkonNavn[] = ["soyler", "kode", "gnist"];
  return (
    <Figur w={620} h={200} label="Datavarehus som leverer én rapport, mot en plattform som bærer dashbord, API og ML">
      <path d="M 16 160 H 604" strokeWidth={2} opacity={0.5} />

      {/* Varehuset */}
      <rect x={30} y={70} width={160} height={90} fill={KREM} />
      <path d="M 30 70 L 70 44 V 70 L 110 44 V 70 L 150 44 V 70 L 190 44 V 70" fill={KREM} />
      <rect x={95} y={120} width={30} height={40} rx={2} fill={KREM} />
      <path d="M 46 90 h 30 M 46 100 h 30 M 144 90 h 30 M 144 100 h 30" strokeWidth={1.6} opacity={0.6} />

      {/* Rapporten som kommer ut – én om gangen */}
      <g opacity={0}>
        <animate
          attributeName="opacity"
          values="0; 1; 1; 0"
          keyTimes="0; 0.12; 0.8; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-22 0; 0 0; 0 0"
          keyTimes="0; 0.14; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
        <path d="M 214 102 h 22 l 10 10 v 34 h -32 z" fill={KREM} strokeWidth={2} />
        <path d="M 236 102 v 10 h 10" strokeWidth={2} />
        <path d="M 221 124 h 18 M 221 132 h 18 M 221 140 h 12" strokeWidth={1.6} opacity={0.6} />
      </g>
      <Tekst x={110} y={184} size={12.5}>
        rapport
      </Tekst>

      <path d="M 310 30 V 170" stroke="var(--cream-dark)" strokeWidth={1.5} strokeDasharray="2 7" />

      {/* Plattformen */}
      <rect x={350} y={108} width={240} height={10} rx={2} fill={TEAL} />
      <path d="M 372 118 V 160 M 412 118 V 160 M 528 118 V 160 M 568 118 V 160" strokeWidth={2.2} />
      {ting.map((navn, i) => {
        const x = 395 + i * 75;
        return (
          <g key={navn}>
            <IkonI navn={navn} x={x - 17} y={64} size={34} color={TEAL} strokeWidth={1.8} />
            <circle cx={x} cy={52} r={3} fill={ROD} stroke="none">
              <Puls fra={0.2} til={1} dur={2.4} begin={i * 0.8} />
            </circle>
          </g>
        );
      })}
      <Tekst x={470} y={184} size={12.5}>
        dashbord · API · ML – kontinuerlig
      </Tekst>
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

/** Kontrakt, eier og katalog – de tre bæresøylene i governance */
export function GovernanceTrio() {
  const deler: { navn: IkonNavn; tekst: string }[] = [
    { navn: "kontrakt", tekst: "kontrakt" },
    { navn: "person", tekst: "eierskap" },
    { navn: "bok", tekst: "katalog" },
  ];
  return (
    <Figur w={500} h={130} label="Datakontrakt, dataeierskap og datakatalog">
      {deler.map((d, i) => {
        const cx = 90 + i * 160;
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
