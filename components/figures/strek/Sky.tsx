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
 * hviler på byggeklosser, kapasitetsmåler, isfjell, klyngestørrelser og
 * manuell tuning mot serverless.
 */

/** Sky med en stabel klosser inni – verktøykassa */
export function SkyMedKlosser() {
  const klosser = [
    { y: 88, w: 60 },
    { y: 72, w: 46 },
    { y: 56, w: 32 },
  ];
  return (
    <Figur w={420} h={150} label="A cloud with a stack of blocks inside">
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
    { navn: "database", tekst: "storage" },
    { navn: "nettverk", tekst: "network" },
    { navn: "nokkel", tekst: "identity" },
  ];
  return (
    <Figur w={420} h={160} label="A cloud resting on the blocks storage, network and identity">
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
    <Figur w={240} h={130} label="Gauge where the needle follows the load up and down">
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
        quiet night
      </Tekst>
      <Tekst x={cx + r - 4} y={cy + 18} size={11}>
        traffic peak
      </Tekst>
    </Figur>
  );
}

/** Isfjell: strømmen er toppen, historikken er alt under vann */
export function Isfjell() {
  const W = 400;
  const H = 140;
  return (
    <Figur w={W} h={H} label="Iceberg – a small tip above water and a huge mass below">
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
        the stream
      </Tekst>
      <Tekst x={200} y={98} size={13} color={TEAL} weight={600}>
        the history
      </Tekst>
    </Figur>
  );
}

/** Fast klynge: bestemt størrelse, og jobber som står i kø */
export function KlyngeFast() {
  return (
    <Figur w={200} h={60} label="Fixed cluster with jobs in a queue">
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
        decided up front
      </Tekst>
      <Tekst x={169} y={48} size={10.5}>
        queued
      </Tekst>
    </Figur>
  );
}

/** Autoskalering: antall noder følger jobben opp og ned */
export function KlyngeAuto() {
  const T = 10;
  return (
    <Figur w={200} h={60} label="Autoscaling – the number of nodes grows and shrinks again">
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
        follows the data volume
      </Tekst>
    </Figur>
  );
}

/** Samme lastkurve på begge sider – venstre gjetter for sent, høyre følger */
const LASTKURVE =
  "M 0 50 C 55 50 95 46 140 32 S 210 6 248 4 S 305 22 342 42 S 375 50 400 52";

function LastMedHode({ x, y, T }: { x: number; y: number; T: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={LASTKURVE} strokeWidth={2.2} />
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 400 0"
          keyTimes="0; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
        <path d="M 0 0 V 56" stroke={ROD} strokeWidth={1.8} />
        <circle cx={0} cy={0} r={4.5} fill={ROD} stroke="none" />
      </g>
    </g>
  );
}

function nodeFade(inn: number, ut: number, on = 1) {
  const innOn = Math.min(inn + 0.03, ut);
  if (inn <= 0 && ut >= 1) {
    return { values: `${on}`, keyTimes: "0; 1" as const };
  }
  if (ut >= 1) {
    return {
      values: `0; 0; ${on}; ${on}`,
      keyTimes: `0; ${inn.toFixed(3)}; ${innOn.toFixed(3)}; 1`,
    };
  }
  const utOff = Math.min(ut + 0.03, 1);
  return {
    values: `0; 0; ${on}; ${on}; 0; 0`,
    keyTimes: `0; ${inn.toFixed(3)}; ${innOn.toFixed(3)}; ${ut.toFixed(3)}; ${utOff.toFixed(3)}; 1`,
  };
}

function NodeRad({
  x,
  y,
  T,
  noder,
}: {
  x: number;
  y: number;
  T: number;
  noder: { inn: number; ut: number; queue?: boolean }[];
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {noder.map((n, i) => {
        const bx = i * 28;
        const fade = nodeFade(n.inn, n.ut, n.queue ? 0.85 : 1);
        if (n.queue) {
          return (
            <rect
              key={i}
              x={bx}
              y={0}
              width={20}
              height={20}
              rx={3}
              stroke={STREK}
              strokeWidth={1.5}
              strokeDasharray="3 3"
              opacity={0}
            >
              <animate
                attributeName="opacity"
                values={fade.values}
                keyTimes={fade.keyTimes}
                dur={`${T}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        }
        return (
          <g key={i}>
            <rect
              x={bx}
              y={0}
              width={20}
              height={20}
              rx={3}
              stroke={TEAL}
              strokeWidth={1.5}
              opacity={0.35}
            />
            <rect
              x={bx}
              y={0}
              width={20}
              height={20}
              rx={3}
              fill={TEAL}
              stroke="none"
              opacity={n.inn <= 0 && n.ut >= 1 ? 1 : 0}
            >
              {!(n.inn <= 0 && n.ut >= 1) && (
                <animate
                  attributeName="opacity"
                  values={fade.values}
                  keyTimes={fade.keyTimes}
                  dur={`${T}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </g>
        );
      })}
    </g>
  );
}

/**
 * Manuell tuning mot serverless. Samme last, samme klokke: venstre side
 * våkner sent og hopper i steg, høyre følger jobben.
 */
export function ManuellVsServerless() {
  const T = 10;
  const manuell = [
    { inn: 0.14, ut: 1 },
    { inn: 0.14, ut: 1 },
    { inn: 0.14, ut: 1 },
    { inn: 0.56, ut: 1 },
    { inn: 0.56, ut: 1 },
    { inn: 0.56, ut: 1 },
    { inn: 0.56, ut: 1 },
    { inn: 0.42, ut: 0.56, queue: true },
  ];
  const serverless = [
    { inn: 0, ut: 1 },
    { inn: 0.12, ut: 0.92 },
    { inn: 0.28, ut: 0.84 },
    { inn: 0.34, ut: 0.78 },
    { inn: 0.4, ut: 0.7 },
    { inn: 0.44, ut: 0.66 },
    { inn: 0.48, ut: 0.6 },
    { inn: 0.5, ut: 0.57 },
  ];
  return (
    <Figur
      w={1040}
      h={300}
      label="Manual tuning guesses a cluster size and wakes up late. Serverless follows the job."
    >
      <path
        d="M 520 36 V 272"
        stroke="var(--cream-dark)"
        strokeWidth={1.5}
        strokeDasharray="2 7"
      />

      <IkonI navn="verktoy" x={70} y={18} size={26} color={TEAL} />
      <Tekst x={106} y={36} size={14} color={TEAL} weight={600} anchor="start">
        MANUAL
      </Tekst>
      <LastMedHode x={70} y={58} T={T} />
      <path d="M 86 148 V 228" strokeWidth={2.2} />
      <circle cx={86} cy={210} r={7} fill={KREM} strokeWidth={2.2}>
        <animate
          attributeName="cy"
          values="210; 210; 156; 156; 210"
          keyTimes="0; 0.54; 0.58; 0.97; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      </circle>
      <NodeRad x={130} y={176} T={T} noder={manuell} />
      <Tekst x={242} y={226} size={13}>
        you guess · then you wait
      </Tekst>
      <Tekst x={430} y={190} size={12} color={ROD} anchor="end">
        waking up
        <animate
          attributeName="opacity"
          values="1; 1; 0; 0"
          keyTimes="0; 0.12; 0.16; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      </Tekst>
      <Tekst x={430} y={190} size={12} color={ROD} anchor="end">
        queued
        <animate
          attributeName="opacity"
          values="0; 0; 1; 1; 0; 0"
          keyTimes="0; 0.42; 0.45; 0.54; 0.58; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      </Tekst>
      <Tekst x={430} y={190} size={12} anchor="end">
        idle
        <animate
          attributeName="opacity"
          values="0; 0; 1; 1; 0"
          keyTimes="0; 0.78; 0.82; 0.97; 1"
          dur={`${T}s`}
          repeatCount="indefinite"
        />
      </Tekst>

      <IkonI navn="gnist" x={590} y={18} size={26} color={TEAL} />
      <Tekst x={626} y={36} size={14} color={TEAL} weight={600} anchor="start">
        SERVERLESS
      </Tekst>
      <LastMedHode x={590} y={58} T={T} />
      <NodeRad x={650} y={176} T={T} noder={serverless} />
      <Tekst x={762} y={226} size={13}>
        the job decides
      </Tekst>
    </Figur>
  );
}
