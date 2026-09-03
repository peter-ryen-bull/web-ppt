import {
  Bolger,
  Duv,
  Figur,
  KREM,
  Puls,
  ROD,
  Roter,
  Signal,
  Skute,
  STREK,
  TEAL,
  Tekst,
  DUS,
} from "./Strek";

/*
 * Strek-figurer til kyst- og AIS-slidene: fyr, AIS-kjeden (skip → basestasjon
 * og satellitt), radarbilde med skipsblipper, en ren bølgestripe og et
 * AIS-spor som ender i utslipp.
 */

/** Fyr på en holme, med lyskjegler som veksler side, og en liten skute i sjøen */
export function Fyr() {
  const W = 420;
  const H = 200;
  /** Halvbredden på tårnet ved høyde y (topp 72, fot 150) */
  const hw = (y: number) => 11 + (11 * (y - 72)) / 78;
  const band = (y1: number, y2: number) =>
    `M ${210 - hw(y1)} ${y1} H ${210 + hw(y1)} L ${210 + hw(y2)} ${y2} H ${210 - hw(y2)} Z`;

  return (
    <Figur w={W} h={H} label="Fyr på en holme med lyskjegler, og en liten skute i sjøen">
      {/* Lyskjegler – veksler mellom venstre og høyre som en roterende linse */}
      <path d="M 199 58 L 24 38 V 78 Z" fill={ROD} stroke="none" opacity={0}>
        <animate
          attributeName="opacity"
          values="0; 0.2; 0; 0"
          keyTimes="0; 0.25; 0.5; 1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M 221 58 L 396 38 V 78 Z" fill={ROD} stroke="none" opacity={0}>
        <animate
          attributeName="opacity"
          values="0; 0; 0.2; 0"
          keyTimes="0; 0.5; 0.75; 1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      <Duv dy={3} dur={3.6}>
        <Skute x={72} y={172} s={0.5} signal={false} />
      </Duv>

      <Bolger y={172} w={W} h={H} amp={9} dur={9} />

      {/* Holmen */}
      <path d="M 108 178 Q 160 136 210 140 Q 262 136 312 178 Z" fill={KREM} />

      {/* Tårnet */}
      <path d="M 188 150 L 199 72 H 221 L 232 150 Z" fill={KREM} />
      <path d={band(100, 112)} fill={ROD} stroke="none" opacity={0.85} />
      <path d={band(128, 140)} fill={ROD} stroke="none" opacity={0.85} />
      <rect x={193} y={67} width={34} height={6} rx={2} fill={KREM} />
      <rect x={199} y={48} width={22} height={19} rx={2} fill={KREM} />
      <path d="M 195 48 L 210 34 L 225 48 Z" fill={KREM} />
      <circle cx={210} cy={58} r={4} fill={ROD} stroke="none">
        <Puls fra={0.4} til={1} dur={2.5} />
      </circle>
    </Figur>
  );
}

/** Skip som kringkaster AIS – fanget opp av basestasjon på land og satellitt */
export function AisKjede() {
  const W = 420;
  const H = 150;
  return (
    <Figur w={W} h={H} label="Skip som sender AIS-signal til basestasjon på land og satellitt">
      <Duv dy={3} dur={3.4}>
        <Skute x={92} y={118} s={0.55} signal={false} />
        <Signal x={91} y={68} rot={70} radier={[14, 24, 34]} dur={3} />
      </Duv>

      <Bolger y={118} w={W} h={H} amp={8} dur={9} />

      {/* Land med basestasjon */}
      <path d="M 236 126 Q 290 98 350 102 Q 398 104 420 122 V 152 H 236 Z" fill={KREM} />
      <path d="M 322 104 L 330 30 L 338 104" strokeWidth={2} />
      <path d="M 325 78 h 10 M 323 92 h 14 M 327 62 h 6" strokeWidth={2} />
      <circle cx={330} cy={27} r={3.5} fill={ROD} stroke="none">
        <Puls fra={0.3} til={1} dur={3} begin={1.1} />
      </circle>

      {/* Satellitt */}
      <Duv dy={3} dur={5}>
        <g transform="translate(372 30)">
          <rect x={-9} y={-8} width={18} height={16} rx={2} fill={KREM} />
          <path d="M -9 0 h -8 M 9 0 h 8" strokeWidth={2} />
          <rect x={-33} y={-5} width={16} height={10} rx={1.5} fill={KREM} strokeWidth={2} />
          <rect x={17} y={-5} width={16} height={10} rx={1.5} fill={KREM} strokeWidth={2} />
          <circle cx={0} cy={0} r={2.5} fill={ROD} stroke="none">
            <Puls fra={0.3} til={1} dur={3} begin={1.6} />
          </circle>
        </g>
      </Duv>
    </Figur>
  );
}

/** Radarbilde: en sakte sveip lyser opp små skipsmarkører etter hvert som den passerer */
export function Skipsradar() {
  const W = 420;
  const H = 170;
  const cx = 210;
  const cy = 86;
  const r = 74;
  const dur = 12;
  const rad = (g: number) => (g * Math.PI) / 180;
  const skip: [number, number, number][] = [
    [22, 52, 200],
    [96, 30, 120],
    [158, 64, 40],
    [232, 46, 300],
    [318, 62, 250],
  ];
  const sveipStart = -42;
  const sx = cx + r * Math.cos(rad(sveipStart));
  const sy = cy + r * Math.sin(rad(sveipStart));

  return (
    <Figur w={W} h={H} label="Radarbilde med skipsmarkører som lyser opp når sveipen passerer">
      <circle cx={cx} cy={cy} r={r} fill={KREM} stroke={TEAL} strokeWidth={2} />
      {[r / 3, (2 * r) / 3].map((rr) => (
        <circle key={rr} cx={cx} cy={cy} r={rr} stroke={TEAL} strokeWidth={1.2} opacity={0.5} />
      ))}
      <path
        d={`M ${cx - r} ${cy} H ${cx + r} M ${cx} ${cy - r} V ${cy + r}`}
        stroke={TEAL}
        strokeWidth={1}
        opacity={0.35}
      />

      <Roter cx={cx} cy={cy} dur={dur}>
        <path
          d={`M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`}
          fill={TEAL}
          stroke="none"
          opacity={0.13}
        />
        <path d={`M ${cx} ${cy} L ${cx + r} ${cy}`} stroke={TEAL} strokeWidth={1.8} />
      </Roter>

      {skip.map(([vinkel, avst, kurs]) => {
        const px = cx + avst * Math.cos(rad(vinkel));
        const py = cy + avst * Math.sin(rad(vinkel));
        const begin = (vinkel / 360) * dur - dur;
        return (
          <path
            key={vinkel}
            d="M 0 -6.5 L 4.5 5.5 L 0 3 L -4.5 5.5 Z"
            transform={`translate(${px} ${py}) rotate(${kurs})`}
            fill={STREK}
            stroke="none"
            opacity={0.25}
          >
            <animate
              attributeName="opacity"
              values="1; 1; 0.25; 0.25"
              keyTimes="0; 0.06; 0.4; 1"
              dur={`${dur}s`}
              begin={`${begin.toFixed(2)}s`}
              repeatCount="indefinite"
            />
          </path>
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill={ROD} stroke="none" />
    </Figur>
  );
}

/** Ren bølgestripe i full bredde – «strømmen» */
export function Bolgestripe() {
  return (
    <Figur w={1280} h={100} label="Bølger">
      <Bolger y={52} w={1280} h={100} amp={12} dur={11} />
    </Figur>
  );
}

/** AIS-punkter danner et spor bak skipet – og skipet ender i en utslippsberegning */
export function SporTilUtslipp() {
  const W = 420;
  const H = 170;
  const royk = (x: number, y: number, begin: number) => (
    <path
      d={`M ${x} ${y} q 7 -9 0 -18 t 0 -18 t 0 -16`}
      stroke={DUS}
      strokeWidth={2}
      opacity={0}
    >
      <animate
        attributeName="opacity"
        values="0; 0.7; 0"
        keyTimes="0; 0.4; 1"
        dur="4s"
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        from="0 4"
        to="0 -10"
        dur="4s"
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </path>
  );

  return (
    <Figur w={W} h={H} label="AIS-spor bak et skip som ender i et utslipp">
      <Duv dy={3} dur={3.6}>
        <Skute x={296} y={124} s={0.6} signal={false} />
        {royk(311, 78, 0)}
        {royk(318, 82, 2)}
      </Duv>

      <Bolger y={124} w={W} h={H} amp={8} dur={9} />

      {/* Sporet av AIS-punkter – der skipet har vært */}
      <path
        d="M 14 146 C 70 150 110 120 170 128 S 240 140 258 128"
        stroke={STREK}
        strokeWidth={3.2}
        strokeDasharray="0 10"
        opacity={0.55}
      />
      <Tekst x={348} y={30} size={13} color={DUS}>
        CO₂
      </Tekst>
    </Figur>
  );
}
