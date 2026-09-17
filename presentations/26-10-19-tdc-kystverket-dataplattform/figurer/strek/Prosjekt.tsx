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
    <Figur w={W} h={H} label="Én AIS-mast, to personer, og én strøm som aldri stopper">
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
          én kilde
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
          ett lite team
        </Tekst>
      </Steg>

      <Steg at={3}>
        <Tekst x={318} y={vann + 46} size={12}>
          én strøm
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
    <Figur w={W} h={H} label="Fire separate Terraform-stater, hver med sin egen pipeline">
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

/** Et rør med albue: tykk kappe, hul kjerne, og en stille strøm inni */
function Ror({ d }: { d: string }) {
  return (
    <g>
      <path d={d} stroke={TEAL} strokeWidth={8} />
      <path d={d} stroke={KREM} strokeWidth={3.6} />
      <path d={d} stroke={TEAL} strokeWidth={1.6} strokeDasharray="5 7">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2.2s" repeatCount="indefinite" />
      </path>
    </g>
  );
}

/**
 * Innlesingen som rørledning: Prefect henter, dumper i raw, lakehuset leser.
 * Tre stasjoner på ett rør, avslørt i takt med sliden.
 */
export function Innlesing() {
  const W = 400;
  const H = 400;
  return (
    <Figur w={W} h={H} label="Prefect dumper filer i raw-lagring; lakehouset leser derfra">
      {/* Prefect: jobben utenfor Databricks */}
      <Steg at={1}>
        <Ror d="M 16 92 H 36" />
        <rect x={36} y={52} width={120} height={80} rx={10} fill={KREM} />
        <path d="M 62 78 L 80 92 L 62 106 Z" fill={ROD} stroke="none">
          <Puls fra={0.35} til={1} dur={2.6} />
        </path>
        <path d="M 96 76 h 40 M 96 88 h 28 M 96 100 h 36" stroke={TEAL} strokeWidth={1.8} />
        <Tekst x={96} y={40} size={12}>
          Prefect henter
        </Tekst>
      </Steg>

      {/* Røret ned i raw, og containeren filene lander i */}
      <Steg at={2}>
        <Ror d="M 156 92 H 200 V 176" />
        <circle cx={200} cy={92} r={5} fill={KREM} stroke={TEAL} strokeWidth={2} />
        <path d="M 148 176 V 248 H 252 V 176" fill={KREM} />
        <path d="M 148 200 H 252" strokeWidth={1.6} opacity={0.45} />
        <rect x={164} y={210} width={72} height={6} rx={1} fill={KREM} strokeWidth={1.4} />
        <rect x={168} y={222} width={64} height={6} rx={1} fill={KREM} strokeWidth={1.4} />
        <rect x={160} y={234} width={80} height={6} rx={1} fill={KREM} strokeWidth={1.4} />
        <Tekst x={200} y={270} size={11.5} color={TEAL} weight={600}>
          raw
        </Tekst>
      </Steg>

      {/* Røret videre inn i taket på lakehuset */}
      <Steg at={3}>
        <Ror d="M 252 212 H 308 V 258" />
        <circle cx={308} cy={212} r={5} fill={KREM} stroke={TEAL} strokeWidth={2} />
        <rect x={250} y={300} width={116} height={58} fill={KREM} />
        <path d="M 240 302 L 308 258 L 376 302" fill={KREM} />
        <rect x={296} y={324} width={24} height={34} rx={2} fill={KREM} />
        <rect x={262} y={314} width={22} height={18} rx={2} fill={KREM} strokeWidth={2} />
        <rect x={332} y={314} width={22} height={18} rx={2} fill={KREM} strokeWidth={2} />
        <rect x={264} y={316} width={18} height={14} fill={ROD} stroke="none" opacity={0.6}>
          <Puls fra={0.15} til={0.7} dur={3.4} />
        </rect>
        <Tekst x={308} y={382} size={12}>
          lakehouse
        </Tekst>
      </Steg>
    </Figur>
  );
}
