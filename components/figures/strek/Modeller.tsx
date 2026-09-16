import { useStep } from "@/components/steps";
import {
  Bolger,
  DUS,
  Duv,
  Figur,
  KREM,
  MINT,
  Puls,
  ROD,
  Roter,
  sekskant,
  Skute,
  SPLINES,
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
    <Figur w={340} h={120} label="Voyage from port to port with maneuvering and cruising">
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
        maneuvering
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
    <Figur w={300} h={140} label="Hexagon cells: one cell in the middle and the rings around it">
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
        one cell away
      </Tekst>
      <Tekst x={252} y={82} size={11.5} color={STREK} weight={600}>
        ≈ 1,100 m
      </Tekst>
    </Figur>
  );
}

/** H3: hexer inni hexer, tre oppløsninger fra land til ~1 m */
export function HexHierarki() {
  const ring: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [0, -1],
    [1, -1],
  ];
  const pos = (
    q: number,
    r: number,
    size: number,
    ox: number,
    oy: number,
  ): [number, number] => [
    ox + size * Math.sqrt(3) * (q + r / 2),
    oy + size * 1.5 * r,
  ];
  const cluster = (
    cx: number,
    cy: number,
    R: number,
    highlight: "parent" | "child" | "center",
  ) => {
    const childR = R * 0.34;
    const child = (q: number, r: number, fill: string, stroke: string, sw: number) => {
      const [x, y] = pos(q, r, childR, cx, cy);
      return (
        <path
          key={`${q},${r}`}
          d={sekskant(x, y, childR - 1)}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    };
    return (
      <g>
        <path
          d={sekskant(cx, cy, R)}
          fill={highlight === "parent" ? "rgba(255, 48, 59, 0.10)" : "rgba(0, 64, 71, 0.04)"}
          stroke={highlight === "parent" ? ROD : TEAL}
          strokeWidth={highlight === "parent" ? 2.2 : 1.8}
        />
        {ring.map(([q, r], i) =>
          child(
            q,
            r,
            highlight === "child" && i === 0
              ? "rgba(255, 48, 59, 0.22)"
              : "rgba(0, 64, 71, 0.10)",
            highlight === "child" && i === 0 ? ROD : TEAL,
            highlight === "child" && i === 0 ? 2.2 : 1.6,
          ),
        )}
        <path
          d={sekskant(cx, cy, childR - 1)}
          fill={
            highlight === "center" ? "rgba(255, 48, 59, 0.22)" : "rgba(0, 64, 71, 0.10)"
          }
          stroke={highlight === "center" ? ROD : TEAL}
          strokeWidth={highlight === "center" ? 2.2 : 1.6}
        />
      </g>
    );
  };

  const kolonner: {
    x: number;
    R: number;
    highlight: "parent" | "child" | "center";
    id: string;
    res: string;
    storrelse: string;
  }[] = [
    {
      x: 188,
      R: 118,
      highlight: "parent",
      id: "801fffffffff",
      res: "resolution 0",
      storrelse: "~1 100 km",
    },
    {
      x: 560,
      R: 92,
      highlight: "child",
      id: "882a100d2ffffff",
      res: "resolution 8",
      storrelse: "~1 km",
    },
    {
      x: 932,
      R: 70,
      highlight: "center",
      id: "8c2a100d2cb4fff",
      res: "resolution 15",
      storrelse: "~1 m",
    },
  ];

  return (
    <Figur
      w={1120}
      h={360}
      label="H3 hexes inside hexes at three resolutions, from about 1100 kilometres down to about one metre"
    >
      {kolonner.map((k) => (
        <g key={k.res}>
          {cluster(k.x, 148, k.R, k.highlight)}
          <Tekst x={k.x} y={292} size={13} weight={600} color={STREK}>
            {k.id}
          </Tekst>
          <Tekst x={k.x} y={318} size={14} weight={600}>
            {k.res}
          </Tekst>
          <Tekst x={k.x} y={340} size={14} color={ROD}>
            {k.storrelse}
          </Tekst>
        </g>
      ))}
    </Figur>
  );
}

/** Kvadrat mot heksagon: hvorfor «én celle unna» bare gir mening på hex */
export function HexVsRute() {
  const kvadrat = () => {
    const s = 56;
    const cx = 280;
    const cy = 150;
    const celler: { dx: number; dy: number }[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) celler.push({ dx, dy });
    }
    return (
      <g>
        {celler.map(({ dx, dy }) => {
          const x = cx + dx * s - s / 2;
          const y = cy + dy * s - s / 2;
          const senter = dx === 0 && dy === 0;
          const hjorne = dx !== 0 && dy !== 0;
          return (
            <rect
              key={`${dx},${dy}`}
              x={x}
              y={y}
              width={s}
              height={s}
              fill={
                senter
                  ? "rgba(255, 48, 59, 0.22)"
                  : hjorne
                    ? "rgba(0, 64, 71, 0.05)"
                    : "rgba(0, 64, 71, 0.12)"
              }
              stroke={senter ? ROD : TEAL}
              strokeWidth={senter ? 2.2 : 1.8}
              opacity={hjorne ? 0.55 : 1}
            />
          );
        })}
        <path d={`M ${cx} ${cy} H ${cx + s}`} stroke={ROD} strokeWidth={1.8} />
        <path
          d={`M ${cx} ${cy} L ${cx + s} ${cy - s}`}
          stroke={ROD}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.7}
        />
        <Tekst x={cx + s + 22} y={cy + 5} size={16} color={ROD}>
          d
        </Tekst>
        <Tekst x={cx + s + 10} y={cy - s + 4} size={16} color={DUS}>
          1.4·d
        </Tekst>
        <Tekst x={280} y={292} size={16} weight={600}>
          8 neighbours, 2 distances
        </Tekst>
      </g>
    );
  };

  const hex = () => {
    const cx = 840;
    const cy = 150;
    const R = 38;
    const pos = (q: number, r: number): [number, number] => [
      cx + R * Math.sqrt(3) * (q + r / 2),
      cy + R * 1.5 * r,
    ];
    const ring: [number, number][] = [
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [0, -1],
      [1, -1],
    ];
    const [nx] = pos(1, 0);
    return (
      <g>
        {ring.map(([q, r]) => {
          const [x, y] = pos(q, r);
          return (
            <path
              key={`${q},${r}`}
              d={sekskant(x, y, R - 1)}
              fill="rgba(0, 64, 71, 0.12)"
              stroke={TEAL}
              strokeWidth={1.8}
            />
          );
        })}
        <path
          d={sekskant(cx, cy, R - 1)}
          fill="rgba(255, 48, 59, 0.22)"
          stroke={ROD}
          strokeWidth={2.2}
        />
        <path d={`M ${cx} ${cy} H ${nx}`} stroke={ROD} strokeWidth={1.8} />
        <Tekst x={(cx + nx) / 2} y={cy - 12} size={16} color={ROD}>
          d
        </Tekst>
        <Tekst x={840} y={292} size={16} weight={600}>
          6 neighbours, 1 distance
        </Tekst>
      </g>
    );
  };

  return (
    <Figur w={1120} h={320} label="A square grid has two neighbour distances. A hex grid has one.">
      {kvadrat()}
      {hex()}
    </Figur>
  );
}

/** Liten båt med propell som seiler fram og tilbake i vannet – propellloven */
export function Propell() {
  const W = 360;
  const H = 360;
  const vann = 198;
  const dur = 14;
  const blad =
    "M 0 -7 C 10 -13 16 -28 7 -46 C 3 -50 -3 -50 -7 -46 C -16 -28 -10 -13 0 -7 Z";
  return (
    <Figur
      w={W}
      h={H}
      label="Small boat with a spinning propeller sailing through water"
      style={{ overflow: "hidden" }}
    >
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`268 ${vann}; 92 ${vann}; 268 ${vann}`}
          keyTimes="0; 0.5; 1"
          calcMode="spline"
          keySplines={SPLINES}
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 1 1; -1 1; -1 1; 1 1"
            keyTimes="0; 0.48; 0.5; 0.98; 1"
            calcMode="discrete"
            dur={`${dur}s`}
            repeatCount="indefinite"
          />
          <Duv dy={5} dur={3.2}>
            <Sving grader={2.6} cx={0} cy={0} dur={4.6}>
              <Skute x={0} y={0} s={0.78} signal={false} />
              <path d="M 42 3 L 50 8" strokeWidth={2.2} />
              <g transform="translate(52 9)">
                <Roter cx={0} cy={0} dur={1.4}>
                  {[0, 120, 240].map((g) => (
                    <path
                      key={g}
                      d={blad}
                      transform={`rotate(${g})`}
                      fill="rgba(0, 64, 71, 0.16)"
                      strokeWidth={2.2}
                    />
                  ))}
                </Roter>
                <circle r={6.5} fill={KREM} strokeWidth={2.2} />
                <circle r={2.2} fill={KREM} strokeWidth={1.6} />
              </g>
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={62 + i * 10}
                  cy={12 + (i % 2) * 4}
                  r={2.4 - i * 0.35}
                  stroke={TEAL}
                  strokeWidth={1.5}
                  opacity={0}
                >
                  <animate
                    attributeName="opacity"
                    values="0; 0.5; 0"
                    keyTimes="0; 0.35; 1"
                    dur="1.5s"
                    begin={`${i * 0.32}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </Sving>
          </Duv>
        </g>
      </g>
      <Bolger y={vann} w={W} h={H} amp={11} dur={9} />
    </Figur>
  );
}

/**
 * Utslippssøyler som vokser opp fra null når klikk-steget `at` er nådd.
 * CSS-transform (scaleY) i stedet for SMIL, så animasjonen starter idet
 * søylene faktisk vises – ikke idet sliden monteres.
 */
export function Soyler({ at = 0 }: { at?: number }) {
  const steg = useStep();
  const vist = steg >= at;
  const data: { navn: string; h: number }[] = [
    { navn: "CO₂", h: 116 },
    { navn: "CH₄", h: 38 },
    { navn: "NOx", h: 74 },
    { navn: "SOx", h: 30 },
    { navn: "PM", h: 24 },
  ];
  const base = 140;
  return (
    <Figur w={560} h={180} label="Bars for CO₂, methane, NOx, SOx and particulate matter">
      <path d={`M 20 ${base} H 540`} strokeWidth={2} opacity={0.5} />
      {data.map((d, i) => {
        const cx = 70 + i * 110;
        return (
          <g key={d.navn}>
            <rect
              x={cx - 22}
              y={base - d.h}
              width={44}
              height={d.h}
              rx={3}
              fill={i === 0 ? ROD : TEAL}
              stroke="none"
              style={{
                transform: vist ? "scaleY(1)" : "scaleY(0)",
                transformBox: "fill-box",
                transformOrigin: "center bottom",
                transition: `transform 1.1s cubic-bezier(0.2, 0, 0.2, 1) ${(i * 0.15).toFixed(2)}s`,
              }}
            />
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
    <Figur w={420} h={150} label="Compass with a swinging needle">
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

/** Tre domenedatabaser – hver med sin eier, sin regning og sitt forvaltningsansvar */
export function TreKataloger() {
  const kataloger: { navn: string; ikon: IkonNavn; tekst: string }[] = [
    { navn: "customs", ikon: "person", tekst: "its own owner" },
    { navn: "ais", ikon: "mynt", tekst: "its own bill" },
    { navn: "hr", ikon: "verktoy", tekst: "its own stewardship" },
  ];
  return (
    <Figur w={540} h={180} label="Three databases, each with its own owner, its own bill and its own stewardship">
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

/**
 * Skipsregisteret er fullt av hull. Cellene som mangler er stiplet røde, og
 * fylles én og én av modellen – median først, nevrale nett for de vanskelige.
 */
export function Registerhull() {
  const W = 340;
  const H = 300;
  const kol = ["type", "length", "speed", "rpm", "fuel"];
  const x0 = 40;
  const y0 = 64;
  const cw = 52;
  const ch = 30;
  const rader = 5;
  /** [rad, kolonne] for cellene som mangler, i fyll-rekkefølge */
  const hull: [number, number][] = [
    [0, 2],
    [1, 4],
    [2, 3],
    [3, 4],
    [4, 2],
    [2, 1],
    [4, 4],
  ];
  const dur = 9;
  const erHull = (r: number, c: number) => hull.some(([hr, hc]) => hr === r && hc === c);

  return (
    <Figur w={W} h={H} label="A ship registry with holes that the model fills in, one cell at a time">
      {/* Kolonneoverskrifter */}
      {kol.map((k, c) => (
        <Tekst key={k} x={x0 + c * cw + cw / 2} y={y0 - 10} size={11} weight={600}>
          {k}
        </Tekst>
      ))}

      {/* Rutenettet */}
      {Array.from({ length: rader }, (_, r) =>
        kol.map((_, c) => {
          const x = x0 + c * cw;
          const y = y0 + r * ch;
          if (erHull(r, c)) {
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={cw}
                height={ch}
                fill={KREM}
                stroke={ROD}
                strokeWidth={1.6}
                strokeDasharray="3 4"
              />
            );
          }
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={cw} height={ch} fill={KREM} strokeWidth={1.4} />
              <path
                d={`M ${x + 12} ${y + ch / 2} h ${cw - 24 - ((r * 3 + c * 5) % 12)}`}
                strokeWidth={2}
                opacity={0.5}
              />
            </g>
          );
        }),
      )}

      {/* Hullene fylles etter tur */}
      {hull.map(([r, c], i) => {
        const x = x0 + c * cw;
        const y = y0 + r * ch;
        const start = 0.08 + i * 0.11;
        return (
          <g key={`fyll-${r}-${c}`} opacity={0}>
            <animate
              attributeName="opacity"
              values="0; 0; 1; 1; 0"
              keyTimes={`0; ${start.toFixed(2)}; ${(start + 0.01).toFixed(2)}; 0.95; 1`}
              calcMode="discrete"
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
            <rect x={x} y={y} width={cw} height={ch} fill={MINT} stroke={TEAL} strokeWidth={1.6} />
            <path d={`M ${x + 12} ${y + ch / 2} h ${cw - 30}`} stroke={TEAL} strokeWidth={2} />
          </g>
        );
      })}

      {/* Modellen som fyller: et lite nett som lyser */}
      <g transform="translate(150 236)">
        <circle cx={0} cy={0} r={26} fill={KREM} stroke={TEAL} strokeWidth={2} />
        <IkonI navn="nettverk" x={-15} y={-15} size={30} color={TEAL} strokeWidth={2} />
        <circle cx={0} cy={0} r={31} stroke={TEAL} strokeWidth={1.4} opacity={0}>
          <Puls fra={0} til={0.7} dur={3} />
        </circle>
      </g>
      <Tekst x={150} y={290} size={12}>
        medians and neural nets fill the holes
      </Tekst>
    </Figur>
  );
}

/** En liten drivstoffpumpe med origo nederst midt på */
function Pumpe({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-11} y={-40} width={22} height={40} rx={3} fill={KREM} strokeWidth={2} />
      <rect x={-6} y={-34} width={12} height={10} rx={1} fill={KREM} strokeWidth={1.6} />
      <path d="M 11 -30 h 8 v 22" strokeWidth={2} />
      <circle cx={0} cy={-14} r={2} fill={ROD} stroke="none" />
    </g>
  );
}

/**
 * Bunkring: skip fyller drivstoff i utlandet og seiler til Norge, eller fyller
 * i Norge og seiler ut. Salgstallene treffer ikke norske farvann.
 */
export function Bunkring() {
  const W = 360;
  const H = 260;
  const vann = 190;
  const grense = 180;
  const pil = (fra: number, til: number, y: number) => {
    const retning = til > fra ? 1 : -1;
    return (
      <g stroke={ROD} strokeWidth={2.2}>
        <path d={`M ${fra} ${y} H ${til}`} strokeDasharray="6 5" />
        <path d={`M ${til - 8 * retning} ${y - 6} L ${til} ${y} L ${til - 8 * retning} ${y + 6}`} />
      </g>
    );
  };

  return (
    <Figur w={W} h={H} label="Ships bunkering on one side of the border and sailing to the other">
      {/* Grensa mellom norske farvann og utlandet */}
      <path d={`M ${grense} 24 V ${vann + 40}`} strokeDasharray="3 8" strokeWidth={2} opacity={0.6} />
      <Tekst x={grense - 12} y={22} size={12} anchor="end" weight={600}>
        Norwegian waters
      </Tekst>
      <Tekst x={grense + 12} y={22} size={12} anchor="start" weight={600}>
        abroad
      </Tekst>

      {/* Kaia og pumpa på hver side */}
      <path d={`M -4 ${vann + 14} H 60 V ${vann - 4} H -4 Z`} fill={KREM} />
      <Pumpe x={30} y={vann - 4} />
      <path d={`M 300 ${vann - 4} H 364 V ${vann + 14} H 300 Z`} fill={KREM} />
      <Pumpe x={330} y={vann - 4} />

      {/* Skipene: det til venstre har fylt her og seiler ut (baugen mot høyre),
          det til høyre har fylt i utlandet og seiler hit */}
      <Duv dy={3} dur={3.8}>
        <g transform={`translate(126 ${vann}) scale(-1 1)`}>
          <Skute x={0} y={0} s={0.5} signal={false} />
        </g>
      </Duv>
      <Duv dy={3} dur={4.3}>
        <Skute x={236} y={vann} s={0.5} signal={false} />
      </Duv>

      <Bolger y={vann} w={W} h={H} amp={7} dur={9} />

      {pil(52, 250, 68)}
      <Tekst x={150} y={56} size={11}>
        bunkers here, sails out
      </Tekst>

      {pil(308, 110, 116)}
      <Tekst x={210} y={138} size={11}>
        bunkers abroad, sails here
      </Tekst>
    </Figur>
  );
}

/** KystRisk: eget skip, sektorer forover, andre skip og skjær, TTI per sektor */
export function RisikoSektorer() {
  const cx = 280;
  const cy = 300;
  const r = 200;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const at = (deg: number, rad: number): [number, number] => [
    cx + rad * Math.cos(toRad(deg)),
    cy + rad * Math.sin(toRad(deg)),
  ];
  const wedge = (a0: number, a1: number) => {
    const [x0, y0] = at(a0, r);
    const [x1, y1] = at(a1, r);
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`;
  };

  const sektorer: {
    a0: number;
    a1: number;
    tti: string;
    fill: string;
    stroke: string;
  }[] = [
    { a0: -70, a1: -42, tti: "24 min", fill: "rgba(0, 64, 71, 0.06)", stroke: TEAL },
    { a0: -42, a1: -14, tti: "11 min", fill: "rgba(0, 64, 71, 0.10)", stroke: TEAL },
    { a0: -14, a1: 14, tti: "2 min", fill: "rgba(255, 48, 59, 0.16)", stroke: ROD },
    { a0: 14, a1: 42, tti: "5 min", fill: "rgba(255, 48, 59, 0.10)", stroke: ROD },
    { a0: 42, a1: 70, tti: "18 min", fill: "rgba(0, 64, 71, 0.06)", stroke: TEAL },
  ];

  const [sx, sy] = at(0, 92);
  const [rx, ry] = at(28, 100);

  return (
    <Figur w={560} h={400} label="Forward sectors from a ship, with time to impact to another ship and a skerry">
      {sektorer.map((s) => (
        <path key={s.tti} d={wedge(s.a0, s.a1)} fill={s.fill} stroke={s.stroke} strokeWidth={1.6} />
      ))}

      {sektorer.map((s) => {
        const mid = (s.a0 + s.a1) / 2;
        const [tx, ty] = at(mid, r + 18);
        return (
          <Tekst key={`t-${s.tti}`} x={tx} y={ty} size={13} weight={600} color={s.stroke}>
            {s.tti}
          </Tekst>
        );
      })}

      <g transform={`translate(${sx} ${sy})`}>
        <path d="M 0 -14 L -8 12 L 8 12 Z" fill={KREM} stroke={ROD} strokeWidth={2} />
      </g>
      <Tekst x={sx - 18} y={sy + 4} size={12} color={ROD} anchor="end">
        ship
      </Tekst>

      <path
        d={`M ${rx - 9} ${ry + 7} L ${rx - 1} ${ry - 9} L ${rx + 8} ${ry - 1} L ${rx + 11} ${ry + 8} L ${rx} ${ry + 10} Z`}
        fill={KREM}
        stroke={ROD}
        strokeWidth={2}
      />
      <Tekst x={rx + 18} y={ry + 18} size={12} color={ROD} anchor="start">
        skerry
      </Tekst>

      <path
        d={`M ${cx} ${cy - 34} L ${cx - 15} ${cy + 24} Q ${cx} ${cy + 32} ${cx + 15} ${cy + 24} Z`}
        fill={KREM}
        strokeWidth={2.6}
      />
      <path d={`M ${cx} ${cy - 6} L ${cx} ${cy - 46}`} stroke={ROD} strokeWidth={2} />
    </Figur>
  );
}
