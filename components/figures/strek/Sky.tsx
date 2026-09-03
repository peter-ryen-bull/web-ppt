import {
  Bolger,
  Duv,
  Figur,
  KREM,
  ROD,
  SKYFORM,
  SPLINES,
  STREK,
  TEAL,
  Tekst,
} from "./Strek";
import { IkonI, type IkonNavn } from "./Ikoner";

/*
 * Strek-figurer til sky- og stordata-kapitlene: sky med klosser, skyen som
 * hviler på byggeklosser, kapasitetsmåler, isfjell og klyngestørrelser.
 */

/** Sky med en stabel klosser inni – verktøykassa */
export function SkyMedKlosser() {
  const klosser = [
    { y: 88, w: 60 },
    { y: 72, w: 46 },
    { y: 56, w: 32 },
  ];
  return (
    <Figur w={420} h={150} label="En sky med en stabel klosser inni">
      <Duv dy={4} dur={5}>
        <path d={SKYFORM} transform="translate(90 12)" fill={KREM} strokeWidth={3} />
        {klosser.map((k) => (
          <rect key={k.y} x={210 - k.w / 2} y={k.y} width={k.w} height={13} rx={3} fill={TEAL} stroke="none" />
        ))}
      </Duv>
    </Figur>
  );
}

/** Skyen hviler på tre byggeklosser: lagring, nettverk og identitet */
export function SkyFundament() {
  const klosser: { navn: IkonNavn; tekst: string }[] = [
    { navn: "database", tekst: "lagring" },
    { navn: "nettverk", tekst: "nettverk" },
    { navn: "nokkel", tekst: "identitet" },
  ];
  return (
    <Figur w={420} h={160} label="En sky som hviler på klossene lagring, nettverk og identitet">
      <path d="M 40 140 H 380" strokeWidth={2} opacity={0.5} />
      {klosser.map((k, i) => {
        const x = 75 + i * 100;
        return (
          <g key={k.navn}>
            <rect x={x} y={100} width={90} height={40} rx={4} fill={KREM} />
            <IkonI navn={k.navn} x={x + 32} y={107} size={26} color={TEAL} />
            <Tekst x={x + 45} y={157} size={12}>
              {k.tekst}
            </Tekst>
          </g>
        );
      })}
      <path d={SKYFORM} transform="translate(98 -6)" fill={KREM} strokeWidth={3} />
    </Figur>
  );
}

/** Måler der nålen følger trafikken – opp på dagen, ned om natten */
export function Kapasitetsmaaler() {
  const cx = 120;
  const cy = 110;
  const r = 80;
  const ticks = [180, 210, 240, 270, 300, 330, 360];
  return (
    <Figur w={240} h={130} label="Måler der nålen følger belastningen opp og ned">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} strokeWidth={3} />
      {ticks.map((g) => {
        const a = (g * Math.PI) / 180;
        return (
          <path
            key={g}
            d={`M ${cx + (r - 10) * Math.cos(a)} ${cy + (r - 10) * Math.sin(a)} L ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`}
            strokeWidth={2}
            opacity={0.6}
          />
        );
      })}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`-70 ${cx} ${cy}; 35 ${cx} ${cy}; -20 ${cx} ${cy}; 72 ${cx} ${cy}; -70 ${cx} ${cy}`}
          keyTimes="0; 0.3; 0.5; 0.75; 1"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
          dur="10s"
          repeatCount="indefinite"
        />
        <path d={`M ${cx} ${cy} V ${cy - r + 22}`} stroke={ROD} strokeWidth={3} />
      </g>
      <circle cx={cx} cy={cy} r={6} fill={KREM} strokeWidth={2.5} />
      <Tekst x={cx - r + 4} y={cy + 18} size={11}>
        stille natt
      </Tekst>
      <Tekst x={cx + r - 4} y={cy + 18} size={11}>
        trafikktopp
      </Tekst>
    </Figur>
  );
}

/** Isfjell: strømmen er toppen, historikken er alt under vann */
export function Isfjell() {
  const W = 400;
  const H = 140;
  return (
    <Figur w={W} h={H} label="Isfjell – en liten topp over vann og en stor masse under">
      <Bolger y={46} w={W} h={H} amp={7} dur={10} />
      <Duv dy={3} dur={4.4}>
        <path
          d="M 150 46 H 262 L 304 92 L 222 136 L 118 122 L 86 82 Z"
          fill="rgba(0, 64, 71, 0.1)"
          stroke={TEAL}
          strokeWidth={2.2}
        />
        <path d="M 170 46 L 190 12 L 212 30 L 234 46 Z" fill={KREM} strokeWidth={2.5} />
      </Duv>
      <Tekst x={246} y={18} size={12} anchor="start">
        strømmen
      </Tekst>
      <Tekst x={200} y={98} size={13} color={TEAL} weight={600}>
        historikken
      </Tekst>
    </Figur>
  );
}

/** Fast klynge: bestemt størrelse, og jobber som står i kø */
export function KlyngeFast() {
  return (
    <Figur w={200} h={60} label="Fast klynge med jobber i kø">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={8 + i * 22} y={12} width={16} height={16} rx={3} fill={TEAL} stroke="none" />
      ))}
      {[150, 172].map((x, i) => (
        <rect key={x} x={x} y={12} width={16} height={16} rx={3} stroke={STREK} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.4}>
          <animate
            attributeName="opacity"
            values="0.25; 0.8; 0.25"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines={SPLINES}
            dur="2.6s"
            begin={`${i * 0.6}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      <Tekst x={74} y={48} size={10.5}>
        bestemt på forhånd
      </Tekst>
      <Tekst x={169} y={48} size={10.5}>
        i kø
      </Tekst>
    </Figur>
  );
}

/** Autoskalering: antall noder følger jobben opp og ned */
export function KlyngeAuto() {
  const T = 10;
  return (
    <Figur w={200} h={60} label="Autoskalering – antall noder vokser og skrus ned igjen">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const inn = 0.08 + i * 0.05;
        const ut = 0.9 - i * 0.05;
        return (
          <g key={i}>
            <rect x={8 + i * 23} y={12} width={16} height={16} rx={3} stroke={TEAL} strokeWidth={1.5} opacity={0.45} />
            <rect x={8 + i * 23} y={12} width={16} height={16} rx={3} fill={TEAL} stroke="none" opacity={0}>
              <animate
                attributeName="opacity"
                values="0; 0; 1; 1; 0; 0"
                keyTimes={`0; ${inn.toFixed(3)}; ${(inn + 0.04).toFixed(3)}; ${ut.toFixed(3)}; ${(ut + 0.04).toFixed(3)}; 1`}
                dur={`${T}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        );
      })}
      <Tekst x={100} y={48} size={10.5}>
        følger datamengden
      </Tekst>
    </Figur>
  );
}
