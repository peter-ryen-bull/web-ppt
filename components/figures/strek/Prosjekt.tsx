import type { ReactNode } from "react";
import { useStep } from "@/components/steps";
import {
  Bolger,
  DUS,
  Duv,
  Figur,
  KREM,
  Menneske,
  Puls,
  ROD,
  Signal,
  Skute,
  TEAL,
  Tekst,
} from "./Strek";
import { IkonI, type IkonNavn } from "./Ikoner";

/*
 * Strek-figurer til prosjekt-kapittelet: dag én, de fire Terraform-statene og
 * innlesingen utenfor Databricks. Figurene leser klikk-steget og avslører
 * delene sine i takt med teksten på sliden.
 */

/** Gruppe som fades inn når klikk-steget `at` er nådd */
function Steg({ at, children }: { at: number; children: ReactNode }) {
  const steg = useStep();
  return (
    <g style={{ opacity: steg >= at ? 1 : 0, transition: "opacity 0.5s ease" }}>
      {children}
    </g>
  );
}

/** Dag én: én kilde (AIS-masten), ett lite team, én strøm som aldri stopper */
export function DagEn() {
  const W = 400;
  const H = 400;
  const vann = 318;
  return (
    <Figur w={W} h={H} label="One AIS mast, two people, and one stream that never stops">
      {/* Strømmen – skuta i sjøen til høyre */}
      <Steg at={3}>
        <Duv dy={3} dur={3.6}>
          <Skute x={318} y={vann} s={0.6} signal={false} />
          <Signal x={317} y={vann - 56} rot={-60} radier={[12, 20, 28]} dur={3} />
        </Duv>
        <Bolger y={vann} w={W} h={H} amp={9} dur={9} />
      </Steg>

      {/* Landet alle står på */}
      <path d={`M -4 ${vann + 14} Q 60 ${vann - 22} 140 ${vann - 10} Q 210 ${vann} 236 ${vann + 18} V ${H + 4} H -4 Z`} fill={KREM} />

      {/* Kilden: masten som lytter */}
      <Steg at={1}>
        <path d={`M 62 ${vann - 8} L 74 120 L 86 ${vann - 8}`} strokeWidth={2} />
        <path d="M 66 200 h 16 M 64 240 h 20 M 68 165 h 12 M 62 280 h 24" strokeWidth={2} />
        <circle cx={74} cy={116} r={4} fill={ROD} stroke="none">
          <Puls fra={0.3} til={1} dur={3} />
        </circle>
        <Signal x={74} y={118} rot={60} radier={[14, 24, 34]} dur={3} />
        <Tekst x={74} y={vann + 40} size={12}>
          one source
        </Tekst>
      </Steg>

      {/* Teamet */}
      <Steg at={2}>
        <Duv dy={2.5} dur={4.2}>
          <Menneske x={150} y={vann - 4} s={1} arms="foran" />
          <g transform="translate(160 246)">
            <rect x={0} y={0} width={38} height={26} rx={2.5} fill={KREM} />
            <path d="M 7 8 h 12 M 7 14 h 20 M 7 20 h 14" stroke={TEAL} strokeWidth={1.6} />
            <path d="M -5 26 L 43 26 L 48 32 H -10 Z" fill={KREM} />
          </g>
        </Duv>
        <Duv dy={3} dur={3.7}>
          <Menneske x={206} y={vann + 2} s={1} arms="akimbo" />
        </Duv>
        <Tekst x={178} y={vann + 40} size={12}>
          one small team
        </Tekst>
      </Steg>

      <Steg at={3}>
        <Tekst x={318} y={vann + 46} size={12}>
          one stream
        </Tekst>
      </Steg>
    </Figur>
  );
}

const STATER: { navn: string; ikon: IkonNavn }[] = [
  { navn: "workspace", ikon: "server" },
  { navn: "storage accounts", ikon: "database" },
  { navn: "unity catalog", ikon: "bok" },
  { navn: "databricks_account", ikon: "nokkel" },
];

/**
 * Fire Terraform-stater, hver med sin egen pipeline fra commit til sky. Sporene
 * er skilt med stiplede linjer – en endring i ett spor rører ikke de andre.
 */
export function FireSpor() {
  const W = 400;
  const H = 420;
  const radH = 100;
  return (
    <Figur w={W} h={H} label="Four separate Terraform states, each with its own pipeline">
      {STATER.map((s, i) => {
        const y = 52 + i * radH;
        return (
          <Steg key={s.navn} at={i + 1}>
            {i > 0 && (
              <path d={`M 20 ${y - 50} H 380`} stroke="var(--cream-dark)" strokeWidth={1.5} strokeDasharray="2 7" />
            )}

            {/* Commit-prikken */}
            <circle cx={46} cy={y} r={7} fill={KREM} stroke={TEAL} strokeWidth={2.4} />
            <circle cx={46} cy={y} r={2.5} fill={TEAL} stroke="none" />
            <path d={`M 56 ${y} H 118`} strokeWidth={1.8} strokeDasharray="2 6" opacity={0.6} />

            {/* Pipelinen – en liten boks med en spillknapp som lyser */}
            <rect x={122} y={y - 20} width={92} height={40} rx={8} fill={KREM} />
            <path d={`M 150 ${y - 8} L 166 ${y} L 150 ${y + 8} Z`} fill={ROD} stroke="none">
              <Puls fra={0.35} til={1} dur={2.6} begin={i * 0.6} />
            </path>
            <path d={`M 176 ${y - 6} h 22 M 176 ${y + 2} h 16 M 176 ${y + 10} h 20`} stroke={TEAL} strokeWidth={1.6} />
            <path d={`M 220 ${y} H 274`} strokeWidth={1.8} strokeDasharray="2 6" opacity={0.6} />
            <path d={`M 266 ${y - 6} L 274 ${y} L 266 ${y + 6}`} strokeWidth={1.8} />

            {/* Målet: det staten eier */}
            <circle cx={320} cy={y} r={28} fill={KREM} />
            <IkonI navn={s.ikon} x={304} y={y - 16} size={32} strokeWidth={2} />

            <Tekst x={200} y={y + 40} size={12.5} color={DUS}>
              {s.navn}
            </Tekst>
          </Steg>
        );
      })}
    </Figur>
  );
}

/**
 * Innlesingen: en trakt (Prefect) tømmer filer i en åpen container (raw),
 * og lakehuset til høyre leser derfra. Filene faller som korte streker, ikke kuler.
 */
export function Innlesing() {
  const W = 400;
  const H = 400;
  const vann = 326;
  const dur = 4.5;
  return (
    <Figur w={W} h={H} label="Prefect drops files into raw storage; the lakehouse reads from there">
      {/* Lakehuset står på pæler i vannet */}
      <Steg at={3}>
        <g>
          <path d={`M 262 ${vann + 10} V 226 M 300 ${vann + 10} V 226 M 338 ${vann + 10} V 226`} strokeWidth={2} />
          <rect x={246} y={172} width={108} height={56} fill={KREM} />
          <path d="M 236 174 L 300 126 L 364 174" fill={KREM} />
          <rect x={288} y={196} width={24} height={32} rx={2} fill={KREM} />
          <rect x={256} y={186} width={20} height={18} rx={2} fill={KREM} strokeWidth={2} />
          <rect x={324} y={186} width={20} height={18} rx={2} fill={KREM} strokeWidth={2} />
          <rect x={258} y={188} width={16} height={14} fill={ROD} stroke="none" opacity={0.6}>
            <Puls fra={0.15} til={0.7} dur={3.4} />
          </rect>
        </g>
        <Bolger y={vann} w={W} h={H} amp={8} dur={9} />
        <Tekst x={300} y={vann + 46} size={12}>
          lakehouse
        </Tekst>
      </Steg>

      {/* Landet til venstre */}
      <path d={`M -4 ${vann + 12} Q 90 ${vann - 24} 180 ${vann - 6} Q 210 ${vann} 222 ${vann + 20} V ${H + 4} H -4 Z`} fill={KREM} />

      {/* Trakta: Prefect henter */}
      <Steg at={1}>
        <path d="M 40 44 H 180 L 122 118 V 156 L 98 168 V 118 Z" fill={KREM} />
        <path d="M 60 66 H 160" stroke={TEAL} strokeWidth={2} />
        <path d="M 74 84 H 146" stroke={TEAL} strokeWidth={2} opacity={0.6} />
        <Tekst x={110} y={30} size={12}>
          Prefect fetches
        </Tekst>
      </Steg>

      {/* Filene som faller, og containeren de lander i */}
      <Steg at={2}>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${104 + i * 6} 176 v 12`}
            stroke={ROD}
            strokeWidth={2.4}
            opacity={0}
          >
            <animate
              attributeName="opacity"
              values="0; 0; 1; 1; 0; 0"
              keyTimes={`0; ${(0.1 + i * 0.22).toFixed(2)}; ${(0.11 + i * 0.22).toFixed(2)}; ${(0.28 + i * 0.22).toFixed(2)}; ${(0.29 + i * 0.22).toFixed(2)}; 1`}
              calcMode="discrete"
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; 0 0; 0 0; 0 26; 0 26; 0 26`}
              keyTimes={`0; ${(0.1 + i * 0.22).toFixed(2)}; ${(0.11 + i * 0.22).toFixed(2)}; ${(0.28 + i * 0.22).toFixed(2)}; ${(0.29 + i * 0.22).toFixed(2)}; 1`}
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
        <path d={`M 56 214 V ${vann - 14} H 166 V 214`} fill={KREM} />
        <path d={`M 56 ${vann - 46} H 166`} strokeWidth={1.6} opacity={0.5} />
        <rect x={68} y={262} width={86} height={5} rx={1} fill={KREM} strokeWidth={1.4} />
        <rect x={70} y={272} width={82} height={5} rx={1} fill={KREM} strokeWidth={1.4} />
        <rect x={66} y={282} width={90} height={5} rx={1} fill={KREM} strokeWidth={1.4} />
        <Tekst x={111} y={vann + 8} size={11.5} color={TEAL} weight={600}>
          raw
        </Tekst>
      </Steg>

      {/* Røret fra raw til lakehuset */}
      <Steg at={3}>
        <path d={`M 168 292 H 300 V 230`} stroke={TEAL} strokeWidth={2.4} strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2.4s" repeatCount="indefinite" />
        </path>
      </Steg>
    </Figur>
  );
}
