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

/** Fyr på en holme, med lyskjegler som sveiper rundt den loddrette aksen, og en liten skute i sjøen */
export function Fyr() {
  const W = 420;
  const H = 200;
  const lx = 210;
  const ly = 58;
  /** Halvbredden på tårnet ved høyde y (topp 72, fot 150) */
  const hw = (y: number) => 11 + (11 * (y - 72)) / 78;
  const band = (y1: number, y2: number) =>
    `M ${210 - hw(y1)} ${y1} H ${210 + hw(y1)} L ${210 + hw(y2)} ${y2} H ${210 - hw(y2)} Z`;
  const kjegle = (lengde: number, halv: number, opacity: number) => (
    <path
      d={`M 0 0 L ${lengde} ${-halv} V ${halv} Z`}
      fill={ROD}
      stroke="none"
      opacity={opacity}
    />
  );
  const DUR = "8s";
  const BLENDE_TIDER = "0; 0.18; 0.25; 0.32; 1";
  const blende = (values: string) => (
    <animate
      attributeName="opacity"
      values={values}
      keyTimes={BLENDE_TIDER}
      dur={DUR}
      repeatCount="indefinite"
    />
  );

  return (
    <Figur
      w={W}
      h={H}
      label="Lighthouse on an islet with light beams, and a small boat at sea"
      style={{ overflow: "visible" }}
    >
      <circle cx={lx} cy={ly} r={36} fill={ROD} stroke="none" opacity={0.22} />
      <circle cx={lx} cy={ly} r={18} fill={ROD} stroke="none" opacity={0.45} />

      {/* Én kjegle som yaw-er venstre–høyre. Mot oss (scaleX ≈ 0) tar blendet over. */}
      <g transform={`translate(${lx} ${ly})`}>
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 0 1; -1 1; 0 1; 1 1"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            dur={DUR}
            repeatCount="indefinite"
          />
          {kjegle(186, 32, 0.32)}
          {kjegle(186, 22, 0.62)}
          {kjegle(186, 8, 0.95)}
        </g>
      </g>

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
      <circle cx={lx} cy={ly} r={5} fill={ROD} stroke="none">
        <Puls fra={0.65} til={1} dur={2.2} />
      </circle>

      {/* Blend: når kjeglen peker rett mot oss, flasher lyset over linsa */}
      <g stroke="none">
        <circle cx={lx} cy={ly} r={70} fill={ROD} opacity={0}>
          {blende("0; 0; 0.35; 0; 0")}
        </circle>
        <circle cx={lx} cy={ly} r={38} fill={KREM} opacity={0}>
          {blende("0; 0; 0.85; 0; 0")}
        </circle>
        <circle cx={lx} cy={ly} r={10} fill={KREM} opacity={0}>
          {blende("0; 0; 1; 0; 0")}
        </circle>
        <rect x={lx - 96} y={ly - 2.5} width={192} height={5} rx={2.5} fill={KREM} opacity={0}>
          {blende("0; 0; 0.7; 0; 0")}
        </rect>
        <rect x={lx - 2} y={ly - 28} width={4} height={56} rx={2} fill={KREM} opacity={0}>
          {blende("0; 0; 0.45; 0; 0")}
        </rect>
      </g>
    </Figur>
  );
}

/** Skip som kringkaster AIS – fanget opp av basestasjon på land og satellitt */
export function AisKjede() {
  const W = 420;
  const H = 150;
  return (
    <Figur w={W} h={H} label="Ship sending AIS signals to a base station on land and a satellite">
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
    <Figur w={W} h={H} label="Radar view with ship markers lighting up as the sweep passes">
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
    <Figur w={1280} h={100} label="Waves">
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
    <Figur w={W} h={H} label="AIS track behind a ship that ends in emissions">
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

/**
 * Hundre millioner meldinger om dagen, som kuler som flyr forbi. Ti i
 * sekundet, og hver kule er 100 meldinger – så det du ser er omtrent
 * strømmen i sanntid.
 */
export function Meldingsstrom() {
  const W = 1000;
  const H = 130;
  const n = 21;
  const dur = 1.5;
  const y = 48;
  return (
    <Figur w={W} h={H} label="Fourteen balls a second flying past. Each ball is 100 messages.">
      <path d={`M 16 ${y} H ${W - 16}`} stroke={TEAL} strokeWidth={1.4} opacity={0.28} />
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          r={6.5}
          cy={y}
          fill={KREM}
          stroke={STREK}
          strokeWidth={2.2}
        >
          <animate
            attributeName="cx"
            from="-14"
            to={W + 14}
            dur={`${dur}s`}
            begin={`${((i * dur) / n).toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <Tekst x={W / 2} y={104} size={13.5} color={DUS}>
        each of these is 100 messages
      </Tekst>
    </Figur>
  );
}

/** Side-view boat small enough to tile the fill slide. Origo is mid-hull. */
function MiniBaat({
  x,
  y,
  flip,
  kind,
}: {
  x: number;
  y: number;
  flip: boolean;
  kind: 0 | 1 | 2;
}) {
  const facing = flip ? " scale(-1 1)" : "";
  return (
    <g
      transform={`translate(${x} ${y})${facing}`}
      strokeWidth={1.2}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      {kind === 0 && (
        <>
          <path d="M 0 -5 V -9.2" strokeLinecap="round" />
          <circle cx={0} cy={-9.2} r={1.15} fill={ROD} stroke="none" />
          <rect x={-3.2} y={-5.2} width={7.2} height={5.4} rx={0.8} fill={KREM} />
          <path d="M -11.2 0.4 L -8.2 5.4 H 8.4 L 11.6 0.4 Z" fill={KREM} />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M 3.4 -4.6 V -8.6" strokeLinecap="round" />
          <circle cx={3.4} cy={-8.6} r={1.15} fill={ROD} stroke="none" />
          <rect x={0.3} y={-4.8} width={6.2} height={5} rx={0.8} fill={KREM} />
          <path d="M -10.4 0.4 L -7.5 5 H 8 L 11 0.4 Z" fill={KREM} />
        </>
      )}
      {kind === 2 && (
        <>
          <path d="M -1.4 -5.4 V -9.2" strokeLinecap="round" />
          <circle cx={-1.4} cy={-9.2} r={1.15} fill={ROD} stroke="none" />
          <rect x={-6} y={-5.6} width={12} height={5.2} rx={0.8} fill={KREM} />
          <path d="M -11.6 0.2 L -8.6 5.2 H 8.6 L 11.6 0.2 Z" fill={KREM} />
        </>
      )}
    </g>
  );
}

/**
 * Båtene lander én og én og fyller lerretet. Animasjonen starter på
 * første render og fryser når flaten er full. Hver båt er 100 meldinger,
 * og de kommer i samme tempo som 1 400 meldinger / s
 * (14 båter / s når hver båt er 100 meldinger).
 */
export function Meldingsfyll() {
  const W = 1280;
  const H = 720;
  const gapX = 34;
  const gapY = 26;
  const top = 22;
  const bottom = 62;
  const side = 22;
  const cols = Math.floor((W - side * 2) / gapX);
  const rows = Math.floor((H - top - bottom) / gapY);
  const n = cols * rows;
  const messagesPerSecond = 1400;
  const messagesPerBoat = 100;
  const boatsPerSecond = messagesPerSecond / messagesPerBoat;
  const fillDur = n / boatsPerSecond;
  const x0 = (W - (cols - 1) * gapX) / 2;
  const y0 = top + 12;

  const order = Array.from({ length: n }, (_, i) => i);
  let seed = 16807;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  const beginAt = new Array<number>(n);
  order.forEach((idx, k) => {
    beginAt[idx] = (k / n) * fillDur;
  });

  return (
    <Figur w={W} h={H} strokeWidth={2} label="Messages appearing until they fill the screen. Each boat is 100 messages.">
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols;
        const row = Math.floor(i / cols);
        seed = (seed * 48271) % 2147483647;
        const flip = seed % 2 === 0;
        const kind = (seed % 3) as 0 | 1 | 2;
        return (
          <g key={i} opacity={0}>
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.22s"
              begin={`${beginAt[i].toFixed(3)}s`}
              fill="freeze"
            />
            <MiniBaat
              x={x0 + c * gapX}
              y={y0 + row * gapY}
              flip={flip}
              kind={kind}
            />
          </g>
        );
      })}
      <rect x={W / 2 - 210} y={H - 48} width={420} height={32} rx={16} fill={KREM} stroke="none" />
      <Tekst x={W / 2} y={H - 26} size={15} color={DUS}>
        each of these is 100 messages
      </Tekst>
    </Figur>
  );
}

export type LyttepostType = "base" | "satellitt" | "meldinger";

/** Én lyttepost – basestasjon på land, satellitt over havet, eller bunken med meldinger */
export function Lyttepost({ type }: { type: LyttepostType }) {
  const W = 160;
  const H = 100;
  return (
    <Figur w={W} h={H} label={LYTTEPOST_LABEL[type]}>
      {type === "base" && (
        <>
          <path d="M 10 100 Q 60 70 110 78 Q 140 82 160 96 V 102 H 10 Z" fill={KREM} />
          <path d="M 72 80 L 80 18 L 88 80" strokeWidth={2} />
          <path d="M 75 62 h 10 M 73 72 h 14 M 77 50 h 6" strokeWidth={2} />
          <circle cx={80} cy={15} r={3.5} fill={ROD} stroke="none">
            <Puls fra={0.3} til={1} dur={3} />
          </circle>
          <Signal x={80} y={16} rot={-70} radier={[12, 20, 28]} dur={3} />
          <Signal x={80} y={16} rot={70} radier={[12, 20, 28]} dur={3} />
        </>
      )}
      {type === "satellitt" && (
        <>
          <Bolger y={86} w={W} h={H} amp={5} dur={9} />
          <Duv dy={3} dur={5}>
            <g transform="translate(80 34)">
              <rect x={-11} y={-10} width={22} height={20} rx={2} fill={KREM} />
              <path d="M -11 0 h -9 M 11 0 h 9" strokeWidth={2} />
              <rect x={-40} y={-6} width={20} height={12} rx={1.5} fill={KREM} strokeWidth={2} />
              <rect x={20} y={-6} width={20} height={12} rx={1.5} fill={KREM} strokeWidth={2} />
              <circle cx={0} cy={0} r={3} fill={ROD} stroke="none">
                <Puls fra={0.3} til={1} dur={3} begin={0.8} />
              </circle>
            </g>
          </Duv>
          <Signal x={80} y={54} rot={180} radier={[10, 17, 24]} dur={3} />
        </>
      )}
      {type === "meldinger" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${52 + i * 6} ${64 - i * 12})`}>
              <rect x={0} y={0} width={56} height={34} rx={4} fill={KREM} strokeWidth={2} />
              <path d="M 2 4 L 28 20 L 54 4" strokeWidth={2} />
            </g>
          ))}
          <circle cx={122} cy={24} r={5} fill={ROD} stroke="none">
            <Puls fra={0.3} til={1} dur={2.4} />
          </circle>
        </>
      )}
    </Figur>
  );
}

const LYTTEPOST_LABEL: Record<LyttepostType, string> = {
  base: "Base station on land receiving AIS",
  satellitt: "Satellite listening over the ocean",
  meldinger: "A growing pile of AIS messages",
};

/** Oljevern: en liten skute legger lense rundt et oljeflak */
export function Oljevern() {
  const W = 420;
  const H = 200;
  return (
    <Figur w={W} h={H} label="A boat laying an oil boom around a slick">
      <Duv dy={3} dur={3.6}>
        <Skute x={320} y={160} s={0.55} signal={false} />
      </Duv>

      <Bolger y={160} w={W} h={H} amp={8} dur={9} />

      {/* Oljeflaket ligger oppå vannet */}
      <path
        d="M 120 150 C 130 128 190 122 226 134 C 262 146 252 170 216 172 C 176 176 112 172 120 150 Z"
        fill={DUS}
        stroke="none"
        opacity={0.35}
      >
        <Puls fra={0.25} til={0.4} dur={5} />
      </path>

      {/* Lensa – en flytende kjede fra skuta rundt flaket */}
      <path
        d="M 306 152 C 290 106 200 100 140 118 C 92 132 88 176 132 184 C 176 192 230 188 262 176"
        strokeWidth={3.2}
        stroke={ROD}
        strokeDasharray="10 5"
      />
    </Figur>
  );
}
