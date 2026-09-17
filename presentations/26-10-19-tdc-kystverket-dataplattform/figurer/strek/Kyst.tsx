import {
  Bolger,
  Duv,
  Figur,
  KREM,
  MINT,
  Puls,
  ROD,
  Roter,
  Signal,
  Skute,
  STREK,
  Sving,
  TEAL,
  Tekst,
  DUS,
} from "./Strek";

/*
 * Strek-figurer til kyst- og AIS-slidene: fyr, AIS-kjeden (skip → basestasjon
 * og satellitt), radarbilde med skipsblipper, en ren bølgestripe og et
 * AIS-spor som ender i utslipp.
 */

/**
 * Fyr på en holme, med én lyskjegle som sveiper rundt den loddrette aksen,
 * og en liten skute i sjøen. Første halvdel av omdreiningen kommer kjeglen
 * mot oss: den går foran tårnet, lysner, vider seg ut og dupper ned før
 * blendingen tar over. Andre halvdel peker den fra oss: bak tårnet,
 * dusere, smalere og litt hevet.
 */
export function Fyr() {
  const W = 420;
  const H = 200;
  const lx = 210;
  const ly = 58;
  /** Halvbredden på tårnet ved høyde y (topp 72, fot 150) */
  const hw = (y: number) => 11 + (11 * (y - 72)) / 78;
  const band = (y1: number, y2: number) =>
    `M ${210 - hw(y1)} ${y1} H ${210 + hw(y1)} L ${210 + hw(y2)} ${y2} H ${210 - hw(y2)} Z`;

  const DUR = "8s";
  /** Kvartene i omdreiningen: høyre → mot oss → venstre → fra oss → høyre */
  const KVART = "0; 0.25; 0.5; 0.75; 1";
  /** Sinus-kvarter som easing, så sveipet leser som jevn rotasjon */
  const SIN_INN = "0.12 0 0.39 0";
  const SIN_UT = "0.61 1 0.88 1";
  const LIN = "0 0 1 1";

  const kjegle = (lengde: number, halv: number, opacity: number) => (
    <path
      d={`M 0 0 L ${lengde} ${-halv} V ${halv} Z`}
      fill="url(#fyrlys)"
      stroke="none"
      opacity={opacity}
    />
  );
  const kjegler = (
    <>
      {kjegle(186, 32, 0.32)}
      {kjegle(186, 22, 0.62)}
      {kjegle(186, 8, 0.95)}
    </>
  );

  /** Yaw: kjeglelengden følger cos av rotasjonen rundt den loddrette aksen */
  const yaw = () => (
    <animateTransform
      attributeName="transform"
      type="scale"
      values="1 1; 0 1; -1 1; 0 1; 1 1"
      keyTimes={KVART}
      calcMode="spline"
      keySplines={`${SIN_INN}; ${SIN_UT}; ${SIN_INN}; ${SIN_UT}`}
      dur={DUR}
      repeatCount="indefinite"
    />
  );

  /** Glød i takt med sveipet: sterkest mot oss (0.25), svakest fra oss (0.75) */
  const glod = (fra: number, mot: number, vekk: number) => (
    <animate
      attributeName="opacity"
      values={`${fra}; ${mot}; ${fra}; ${vekk}; ${fra}`}
      keyTimes={KVART}
      calcMode="spline"
      keySplines={`${SIN_UT}; ${SIN_INN}; ${SIN_UT}; ${SIN_INN}`}
      dur={DUR}
      repeatCount="indefinite"
    />
  );

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
      label="Lighthouse on an islet with a rotating light beam, and a small boat at sea"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Kjeglen tynnes ut mot spissen, som lys som spres */}
        <linearGradient id="fyrlys" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={ROD} stopOpacity={1} />
          <stop offset="0.65" stopColor={ROD} stopOpacity={0.6} />
          <stop offset="1" stopColor={ROD} stopOpacity={0} />
        </linearGradient>
      </defs>

      <circle cx={lx} cy={ly} r={36} fill={ROD} stroke="none" opacity={0.22}>
        {glod(0.22, 0.4, 0.08)}
      </circle>
      <circle cx={lx} cy={ly} r={18} fill={ROD} stroke="none" opacity={0.45}>
        {glod(0.45, 0.7, 0.16)}
      </circle>

      {/* Fra oss (andre halvdel): bak tårnet, duset, smalere og litt hevet */}
      <g transform={`translate(${lx} ${ly})`} opacity={0}>
        <animate
          attributeName="opacity"
          values="0; 0; 0.85; 0.3; 0.85"
          keyTimes="0; 0.4995; 0.5; 0.75; 1"
          dur={DUR}
          repeatCount="indefinite"
        />
        <g>
          {yaw()}
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1; 1 1; 0.9 0.65; 1 1"
              keyTimes="0; 0.5; 0.75; 1"
              calcMode="spline"
              keySplines={`${LIN}; ${SIN_UT}; ${SIN_INN}`}
              dur={DUR}
              repeatCount="indefinite"
            />
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0; 0; -9; 0"
                keyTimes="0; 0.5; 0.75; 1"
                calcMode="spline"
                keySplines={`${LIN}; ${SIN_UT}; ${SIN_INN}`}
                dur={DUR}
                repeatCount="indefinite"
              />
              {kjegler}
            </g>
          </g>
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
        {glod(0.75, 1, 0.35)}
      </circle>

      {/* Mot oss (første halvdel): foran tårnet – lysner, videre og dupper ned */}
      <g transform={`translate(${lx} ${ly})`} opacity={0.85}>
        <animate
          attributeName="opacity"
          values="0.85; 1; 0.85; 0; 0"
          keyTimes="0; 0.25; 0.4995; 0.5; 1"
          dur={DUR}
          repeatCount="indefinite"
        />
        <g>
          {yaw()}
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1; 1 1.7; 1 1; 1 1"
              keyTimes="0; 0.25; 0.5; 1"
              calcMode="spline"
              keySplines={`${SIN_UT}; ${SIN_INN}; ${LIN}`}
              dur={DUR}
              repeatCount="indefinite"
            />
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0; 13; 0; 0"
                keyTimes="0; 0.25; 0.5; 1"
                calcMode="spline"
                keySplines={`${SIN_UT}; ${SIN_INN}; ${LIN}`}
                dur={DUR}
                repeatCount="indefinite"
              />
              {kjegler}
            </g>
          </g>
        </g>
      </g>

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
        {/* Utvidende ring idet lyset «treffer» oss */}
        <circle cx={lx} cy={ly} r={14} fill="none" stroke={ROD} strokeWidth={2.4} opacity={0}>
          <animate
            attributeName="r"
            values="14; 14; 96; 96"
            keyTimes="0; 0.2; 0.33; 1"
            dur={DUR}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0; 0; 0.55; 0; 0"
            keyTimes="0; 0.2; 0.25; 0.33; 1"
            dur={DUR}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </Figur>
  );
}

/**
 * Lasteskip med baug mot høyre. Origo er midt på vannlinjen.
 * Superstruktur og antenne sitter akter, så retningen leses tydelig.
 */
function Lasteskip({ x, y, s, flip }: { x: number; y: number; s: number; flip: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M -42 -46 V -90" />
      <path d="M -48 -78 h 12" strokeWidth={2} />
      <circle cx={-42} cy={-92} r={3.2} fill={ROD} stroke="none" />
      <rect x={-62} y={-48} width={42} height={28} rx={4} fill={KREM} />
      <circle cx={-42} cy={-34} r={3.6} strokeWidth={2} />
      <path
        d="M -86 -12 L -78 10 H 46 L 98 -24 Q 74 -12 50 -12 Z"
        fill={KREM}
        strokeWidth={3}
      />
    </g>
  );
}

/** Smal signalbue som peker i `rot` grader (0 = opp), holdt over vannlinjen */
function SignalMot({
  x,
  y,
  rot,
  radier,
  dur,
  begin = 0,
  hvil = 40,
}: {
  x: number;
  y: number;
  rot: number;
  radier: number[];
  dur: number;
  begin?: number;
  hvil?: number;
}) {
  const sveip = 56;
  const pt = (r: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [x + r * Math.cos(a), y + r * Math.sin(a)] as const;
  };
  const bue = (r: number) => {
    const [x1, y1] = pt(r, rot - sveip / 2);
    const [x2, y2] = pt(r, rot + sveip / 2);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <g>
      <path d={bue(hvil)} stroke={ROD} strokeWidth={2.4} opacity={0.34} />
      {radier.map((r, i) => (
        <path key={r} d={bue(r)} stroke={ROD} strokeWidth={2.4} opacity={0}>
          <animate
            attributeName="opacity"
            values="0; 1; 1; 0; 0"
            keyTimes="0; 0.15; 0.45; 0.7; 1"
            dur={`${dur}s`}
            begin={`${begin + i * 0.35}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  );
}

/** To skip som sender AIS til hverandre – slik systemet ble bygd for */
export function AisKjede() {
  const W = 1280;
  const H = 240;
  const vann = 178;
  const s = 1.08;
  const antX = 42 * s;
  const antY = vann - 92 * s;
  const venstre = 300;
  const hoyre = 980;
  const buer = [30, 52, 78];

  return (
    <Figur w={W} h={H} label="Two ships sending AIS signals to each other">
      <Duv dy={3} dur={3.4}>
        <Lasteskip x={venstre} y={vann} s={s} flip={false} />
        <SignalMot
          x={venstre - antX}
          y={antY}
          rot={62}
          radier={buer}
          dur={3}
          begin={-0.8}
        />
      </Duv>

      <Duv dy={3} dur={4.1}>
        <Lasteskip x={hoyre} y={vann} s={s} flip />
        <SignalMot
          x={hoyre + antX}
          y={antY}
          rot={-62}
          radier={buer}
          dur={3}
          begin={0.6}
        />
      </Duv>

      <Bolger y={vann} w={W} h={H} amp={11} dur={9} />
    </Figur>
  );
}

/** Radarbilde: en sakte sveip lyser opp små skipsmarkører etter hvert som den passerer */
export function Skipsradar() {
  const W = 320;
  const H = 320;
  const cx = 160;
  const cy = 160;
  const r = 148;
  const dur = 12;
  const rad = (g: number) => (g * Math.PI) / 180;
  const skip: [number, number, number][] = [
    [22, 104, 200],
    [96, 60, 120],
    [158, 128, 40],
    [232, 92, 300],
    [318, 124, 250],
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
            d="M 0 -10 L 7 8.5 L 0 4.6 L -7 8.5 Z"
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
      <circle cx={cx} cy={cy} r={4.5} fill={ROD} stroke="none" />
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

/** Én røykslør som stiger fra (x, y), tones inn og ut. `s` skalerer lengden. */
function Royk({
  x,
  y,
  begin,
  s = 1,
  dur = 4,
}: {
  x: number;
  y: number;
  begin: number;
  s?: number;
  dur?: number;
}) {
  const a = 18 * s;
  return (
    <path
      d={`M ${x} ${y} q ${7 * s} ${-9 * s} 0 ${-a} t 0 ${-a} t 0 ${-16 * s}`}
      stroke={DUS}
      strokeWidth={2 * s}
      opacity={0}
    >
      <animate
        attributeName="opacity"
        values="0; 0.7; 0"
        keyTimes="0; 0.4; 1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        from={`0 ${4 * s}`}
        to={`0 ${-10 * s}`}
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </path>
  );
}

/** AIS-punkter danner et spor bak skipet – og skipet ender i en utslippsberegning */
export function SporTilUtslipp() {
  const W = 420;
  const H = 170;

  return (
    <Figur w={W} h={H} label="AIS track behind a ship that ends in emissions">
      <Duv dy={3} dur={3.6}>
        <Skute x={296} y={124} s={0.6} signal={false} />
        <Royk x={311} y={78} begin={0} />
        <Royk x={318} y={82} begin={2} />
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
 * Stort containerskip i full bredde, baug mot høyre, stablet med containere
 * fra bro til baug. Duver og ruller sakte, røyk fra skorsteinen akter.
 */
export function Containerskip() {
  const W = 1280;
  const H = 290;
  const VANN = 228;
  const DEKK = 176;
  const CW = 32;
  const CH = 18;
  const PX = 35;
  const PY = 20;
  const forsteKol = 236;
  const stabler = [
    4, 5, 6, 6, 5, 6, 6, 6, 5, 4, 5, 6, 6, 6, 5, 6, 6, 5, 6, 5, 5, 4, 4, 3, 2,
  ];

  const fyll = (kol: number, rad: number) => {
    const k = (kol * 7 + rad * 3) % 11;
    if (k === 0) return MINT;
    if (k === 5) return DUS;
    return KREM;
  };

  return (
    <Figur w={W} h={H} label="A large container ship stacked with containers, riding the waves">
      <Sving grader={0.6} cx={W / 2} cy={VANN} dur={7.5}>
        <Duv dy={4} dur={4.4}>
          {/* Skrog */}
          <path
            d={`M 62 ${DEKK} L 92 ${VANN + 34} H 1104 L 1232 ${DEKK - 22} Q 1196 ${DEKK} 1150 ${DEKK} Z`}
            fill={KREM}
            strokeWidth={3}
          />
          <path d={`M 84 ${VANN - 9} H 1118`} strokeWidth={1.4} opacity={0.4} />
          <path d={`M 1204 ${DEKK - 6} V ${DEKK - 34}`} strokeWidth={2} />

          {/* Skorstein akter */}
          <rect x={78} y={136} width={24} height={40} rx={2} fill={KREM} />
          <path d="M 78 146 H 102" strokeWidth={1.6} opacity={0.6} />
          <Royk x={90} y={136} begin={0} s={1.7} dur={5} />
          <Royk x={96} y={140} begin={2.4} s={1.7} dur={5} />

          {/* Overbygg og bro */}
          <rect x={112} y={112} width={102} height={64} rx={3} fill={KREM} />
          <path d="M 126 132 H 200 M 126 152 H 200" strokeWidth={1.4} opacity={0.5} />
          <rect x={102} y={90} width={122} height={24} rx={3} fill={KREM} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={110 + i * 18}
              y={97}
              width={12}
              height={9}
              rx={1}
              strokeWidth={1.4}
            />
          ))}
          <path d="M 163 90 V 46" />
          <path d="M 152 60 h 22" strokeWidth={2} />
          <circle cx={163} cy={43} r={3.6} fill={ROD} stroke="none">
            <Puls fra={0.4} til={1} dur={2.4} />
          </circle>

          {/* Containere */}
          <g strokeWidth={1.6} strokeLinejoin="miter" strokeLinecap="butt">
            {stabler.map((hoyde, kol) =>
              Array.from({ length: hoyde }, (_, rad) => {
                const x = forsteKol + kol * PX;
                const y = DEKK - (rad + 1) * PY;
                const f = fyll(kol, rad);
                return (
                  <g key={`${kol}-${rad}`}>
                    <rect
                      x={x}
                      y={y}
                      width={CW}
                      height={CH}
                      rx={1.5}
                      fill={f}
                      fillOpacity={f === DUS ? 0.3 : 1}
                    />
                    <path
                      d={`M ${x + 11} ${y + 3} V ${y + CH - 3} M ${x + 21} ${y + 3} V ${y + CH - 3}`}
                      strokeWidth={1}
                      opacity={0.35}
                    />
                  </g>
                );
              }),
            )}
          </g>
        </Duv>
      </Sving>

      <Bolger y={VANN} w={W} h={H} amp={12} dur={10} />
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
  s = 1,
}: {
  x: number;
  y: number;
  flip: boolean;
  kind: 0 | 1 | 2;
  s?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
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
  const gapX = 48;
  const gapY = 37;
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
              s={1.45}
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
