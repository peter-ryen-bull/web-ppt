import {
  DUS,
  Figur,
  KREM,
  Puls,
  ROD,
  Roter,
  sekskant,
  STREK,
  Sving,
  TEAL,
  Tekst,
} from "./Strek";
import { IkonI, type IkonNavn } from "./Ikoner";

/*
 * Strek-figurer til modell- og veien-videre-kapitlene: seilas havn til havn,
 * H3-sekskanter, propell, utslippssøyler, kompass og domenekataloger.
 */

/** Seilas havn til havn – manøvrering (stiplet) og cruising (heltrukket) */
export function Seilas() {
  const ut = "M 60 70 C 80 50 96 46 112 56";
  const cruising = "M 112 56 C 142 76 162 90 190 60 S 232 36 250 58";
  const inn = "M 250 58 C 262 66 272 68 280 70";
  const havn = (x: number) => (
    <g>
      <path d={`M ${x - 24} 78 H ${x + 24}`} strokeWidth={2.5} />
      <path d={`M ${x - 20} 78 V 84 M ${x - 6} 78 V 84 M ${x + 8} 78 V 84 M ${x + 20} 78 V 84`} strokeWidth={2} />
      <rect x={x - 12} y={58} width={24} height={18} fill={KREM} strokeWidth={2} />
      <path d={`M ${x - 15} 58 L ${x} 46 L ${x + 15} 58`} fill={KREM} strokeWidth={2} />
    </g>
  );
  return (
    <Figur w={340} h={120} label="Seilas fra havn til havn med manøvrering og cruising">
      <path d={ut} strokeDasharray="4 6" strokeWidth={2.2} />
      <path d={cruising} stroke={TEAL} strokeWidth={3} />
      <path d={inn} strokeDasharray="4 6" strokeWidth={2.2} />
      {havn(48)}
      {havn(292)}

      <path d="M 0 -6 L 12 0 L 0 6 Z" fill={STREK} stroke="none">
        <animateMotion
          dur="14s"
          begin="0s"
          repeatCount="indefinite"
          rotate="auto"
          path={`${ut} ${cruising.replace(/^M [^C]+/, "")} ${inn.replace(/^M [^C]+/, "")}`}
        />
      </path>

      <path d="M 92 110 h 18" stroke={TEAL} strokeWidth={3} />
      <Tekst x={116} y={114} size={10.5} anchor="start">
        cruising
      </Tekst>
      <path d="M 186 110 h 18" strokeDasharray="4 5" strokeWidth={2.2} />
      <Tekst x={210} y={114} size={10.5} anchor="start">
        manøvrering
      </Tekst>
    </Figur>
  );
}

/** H3: en celle og ringene rundt – «én celle unna» */
export function HexRing() {
  const cx = 150;
  const cy = 70;
  const R = 17;
  const pos = (q: number, r: number): [number, number] => [
    cx + R * Math.sqrt(3) * (q + r / 2),
    cy + R * 1.5 * r,
  ];
  const celler: { q: number; r: number; d: number }[] = [];
  for (let q = -2; q <= 2; q++) {
    for (let r = -2; r <= 2; r++) {
      const d = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
      if (d <= 2) celler.push({ q, r, d });
    }
  }
  const [nx] = pos(1, 0);
  return (
    <Figur w={300} h={140} label="Sekskantceller: én celle i midten og ringene rundt">
      {celler.map(({ q, r, d }) => {
        const [x, y] = pos(q, r);
        if (d === 2) {
          return <path key={`${q},${r}`} d={sekskant(x, y, R - 1)} strokeWidth={1.4} opacity={0.3} />;
        }
        if (d === 1) {
          return (
            <path key={`${q},${r}`} d={sekskant(x, y, R - 1)} fill="rgba(0, 64, 71, 0.12)" stroke={TEAL} strokeWidth={1.8}>
              <Puls fra={0.45} til={1} dur={3.6} />
            </path>
          );
        }
        return (
          <path key="senter" d={sekskant(x, y, R - 1)} fill="rgba(255, 48, 59, 0.22)" stroke={ROD} strokeWidth={2} />
        );
      })}
      <path d={`M ${cx} ${cy} H ${nx}`} stroke={ROD} strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={2.2} fill={ROD} stroke="none" />
      <circle cx={nx} cy={cy} r={2.2} fill={ROD} stroke="none" />
      <Tekst x={252} y={66} size={11.5}>
        én celle unna
      </Tekst>
      <Tekst x={252} y={82} size={11.5} color={STREK} weight={600}>
        ≈ 1 100 m
      </Tekst>
    </Figur>
  );
}

/** Propell som går rundt – propellloven */
export function Propell() {
  const cx = 130;
  const cy = 60;
  const blad =
    "M 0 -10 C 14 -26 22 -42 10 -54 C -2 -58 -11 -42 -7 -28 C -5 -20 -3 -14 0 -10 Z";
  return (
    <Figur w={260} h={130} label="Propell som roterer">
      <Roter cx={cx} cy={cy} dur={6}>
        {[0, 120, 240].map((g) => (
          <path key={g} d={blad} transform={`translate(${cx} ${cy}) rotate(${g})`} fill={KREM} strokeWidth={2.4} />
        ))}
      </Roter>
      <circle cx={cx} cy={cy} r={10} fill={KREM} strokeWidth={2.4} />
      <Tekst x={cx} y={124} size={12.5}>
        lastfaktor ∝ (fart / servicefart)³
      </Tekst>
    </Figur>
  );
}

/** Utslippssøyler som vokser opp når sliden vises */
export function Soyler() {
  const data: { navn: string; h: number }[] = [
    { navn: "CO₂", h: 116 },
    { navn: "CH₄", h: 38 },
    { navn: "NOx", h: 74 },
    { navn: "SOx", h: 30 },
    { navn: "PM", h: 24 },
  ];
  const base = 140;
  return (
    <Figur w={560} h={180} label="Søyler for CO₂, metan, NOx, SOx og svevestøv">
      <path d={`M 20 ${base} H 540`} strokeWidth={2} opacity={0.5} />
      {data.map((d, i) => {
        const cx = 70 + i * 110;
        return (
          <g key={d.navn}>
            <rect x={cx - 22} y={base - d.h} width={44} height={d.h} rx={3} fill={i === 0 ? ROD : TEAL} stroke="none">
              <animate
                attributeName="height"
                from="0"
                to={d.h}
                dur="1.4s"
                begin={`${i * 0.15}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.2 0 0.2 1"
                keyTimes="0; 1"
              />
              <animate
                attributeName="y"
                from={base}
                to={base - d.h}
                dur="1.4s"
                begin={`${i * 0.15}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.2 0 0.2 1"
                keyTimes="0; 1"
              />
            </rect>
            <Tekst x={cx} y={base + 24} size={13.5} color={STREK}>
              {d.navn}
            </Tekst>
          </g>
        );
      })}
    </Figur>
  );
}

/** Kompass med nål som søker seg inn */
export function Kompass() {
  const cx = 210;
  const cy = 78;
  const r = 56;
  return (
    <Figur w={420} h={150} label="Kompass med nål som svinger">
      <circle cx={cx} cy={cy} r={r} fill={KREM} strokeWidth={3} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((g) => {
        const a = ((g - 90) * Math.PI) / 180;
        const lang = g % 90 === 0;
        const r1 = r - (lang ? 12 : 7);
        return (
          <path
            key={g}
            d={`M ${cx + r1 * Math.cos(a)} ${cy + r1 * Math.sin(a)} L ${cx + (r - 3) * Math.cos(a)} ${cy + (r - 3) * Math.sin(a)}`}
            strokeWidth={lang ? 2.4 : 1.6}
            opacity={lang ? 1 : 0.5}
          />
        );
      })}
      <Tekst x={cx} y={cy - r - 8} size={13} color={STREK} weight={600}>
        N
      </Tekst>
      <Sving grader={9} cx={cx} cy={cy} dur={5.4}>
        <path d={`M ${cx - 9} ${cy} L ${cx} ${cy - 40} L ${cx + 9} ${cy} Z`} fill={ROD} stroke={ROD} strokeWidth={2} />
        <path d={`M ${cx - 9} ${cy} L ${cx} ${cy + 40} L ${cx + 9} ${cy} Z`} fill={KREM} strokeWidth={2} />
      </Sving>
      <circle cx={cx} cy={cy} r={4} fill={KREM} strokeWidth={2} />
    </Figur>
  );
}

/** Tre domenekataloger – hver med sin eier, sin regning og sitt forvaltningsansvar */
export function TreKataloger() {
  const kataloger: { navn: string; ikon: IkonNavn; tekst: string }[] = [
    { navn: "toll", ikon: "person", tekst: "egen eier" },
    { navn: "ais", ikon: "mynt", tekst: "egen regning" },
    { navn: "hr", ikon: "verktoy", tekst: "eget forvaltningsansvar" },
  ];
  return (
    <Figur w={540} h={180} label="Tre kataloger med egen eier, egen regning og eget forvaltningsansvar">
      {kataloger.map((k, i) => {
        const x = 30 + i * 170;
        return (
          <g key={k.navn}>
            <rect x={x} y={32} width={62} height={26} rx={4} fill={KREM} strokeWidth={2} />
            <rect x={x} y={52} width={140} height={88} rx={8} fill={KREM} />
            <Tekst x={x + 31} y={48} size={11} color={STREK} weight={600}>
              {k.navn}
            </Tekst>
            <circle cx={x + 70} cy={98} r={22} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
            <IkonI navn={k.ikon} x={x + 57} y={85} size={26} color={TEAL} />
            <Tekst x={x + 70} y={166} size={12.5} color={DUS}>
              {k.tekst}
            </Tekst>
          </g>
        );
      })}
    </Figur>
  );
}
