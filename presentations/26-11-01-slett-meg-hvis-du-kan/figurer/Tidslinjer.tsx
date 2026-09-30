"use client";

import { useStep } from "@/components/steps";
import {
  Pil,
  Ramme,
  Tekst,
  Vis,
  DUS,
  MONO,
  RODDYP,
  ROSA,
  STREK,
  TEAL,
} from "./svg";

/*
 * Tre tidsfigurer: versjoner i en tabell (tidsreise og VACUUM), backup-tidslinjen
 * og lesere som er i gang når en sletting kommer.
 */

/** Versjon 1 og 2 av kundetabellen. Steg 1 DELETE, 2 tidsreise, 3 VACUUM. */
export function Versjoner() {
  const step = useStep();
  const v1Borte = step >= 3;
  const rad = (y: number, navn: string, kari = false) => (
    <g key={navn + y}>
      <rect
        x={0}
        y={y}
        width={260}
        height={38}
        fill={kari ? ROSA : "transparent"}
      />
      <Tekst
        x={18}
        y={y + 25}
        size={17}
        farge={kari ? RODDYP : STREK}
        vekt={kari ? 700 : 400}
      >
        {navn}
      </Tekst>
    </g>
  );
  return (
    <Ramme w={660} h={380} label="Versjon 1 har Kari, versjon 2 har ikke. Tidsreise leser versjon 1. VACUUM fjerner versjon 1.">
      {/* Versjon 1 */}
      <g style={{ opacity: v1Borte ? 0.3 : 1, transition: "opacity 400ms ease" }}>
        <g transform="translate(0 40)">
          <rect
            x={0}
            y={0}
            width={260}
            height={200}
            rx={8}
            fill="#fff"
            stroke={v1Borte ? DUS : STREK}
            strokeWidth={1.8}
            strokeDasharray={v1Borte ? "6 5" : undefined}
          />
          <rect x={0} y={0} width={260} height={44} rx={8} fill="#F5EBE1" />
          <Tekst x={18} y={28} size={15} vekt={700} farge={TEAL} spacing={1}>
            VERSJON 1
          </Tekst>
          <g transform="translate(0 44)">
            {rad(0, "Ola Hansen")}
            {rad(38, "Kari Nordmann", true)}
            {rad(76, "Per Olsen")}
          </g>
        </g>
      </g>

      {/* Versjon 2 */}
      <Vis at={1}>
        <Pil x1={272} y1={140} x2={376} y2={140} farge={RODDYP} />
        <Tekst x={324} y={122} size={15} vekt={700} anchor="middle" mono farge={RODDYP}>
          DELETE
        </Tekst>
        <g transform="translate(390 40)">
          <rect x={0} y={0} width={260} height={200} rx={8} fill="#fff" stroke={STREK} strokeWidth={1.8} />
          <rect x={0} y={0} width={260} height={44} rx={8} fill="#F5EBE1" />
          <Tekst x={18} y={28} size={15} vekt={700} farge={TEAL} spacing={1}>
            VERSJON 2 · NÅ
          </Tekst>
          <g transform="translate(0 44)">
            {rad(0, "Ola Hansen")}
            {rad(38, "Per Olsen")}
          </g>
        </g>
      </Vis>

      {/* Tidsreise */}
      <Vis at={2}>
        <path
          d="M 520 250 C 520 330, 130 330, 130 250"
          fill="none"
          stroke={RODDYP}
          strokeWidth={1.8}
          strokeDasharray="6 5"
        />
        <Pil x1={131} y1={290} x2={130} y2={246} farge={RODDYP} />
        <g transform="translate(150 316)">
          <rect x={0} y={0} width={340} height={40} rx={6} fill="var(--burgundy)" />
          <text x={170} y={26} textAnchor="middle" fontFamily={MONO} fontSize={15} fill="var(--mint)">
            … VERSION AS OF 1
          </text>
        </g>
      </Vis>

      {/* VACUUM */}
      <Vis at={3}>
        <Tekst x={130} y={30} size={15} vekt={700} anchor="middle" mono farge={RODDYP}>
          VACUUM
        </Tekst>
      </Vis>
    </Ramme>
  );
}

/** 1. mars backup, 12. mars sletting, 20. mars gjenoppretting. Steg 1–2. */
export function BackupTidslinje() {
  const punkt = (x: number, dato: string, hva: string, rod = false) => (
    <g>
      <circle cx={x} cy={90} r={11} fill={rod ? RODDYP : "#fff"} stroke={rod ? RODDYP : STREK} strokeWidth={2} />
      <Tekst x={x} y={50} size={20} vekt={700} anchor="middle" farge={rod ? RODDYP : STREK}>
        {dato}
      </Tekst>
      <Tekst x={x} y={132} size={17} anchor="middle">
        {hva}
      </Tekst>
    </g>
  );
  return (
    <Ramme w={1117} h={190} label="Backup 1. mars, sletting 12. mars, gjenoppretting 20. mars – da er Kari tilbake">
      <line x1={40} y1={90} x2={1077} y2={90} stroke={STREK} strokeWidth={2} strokeLinecap="round" />
      {punkt(180, "1. mars", "Backup tas. Kari er med.")}
      <Vis at={1}>{punkt(560, "12. mars", "Kari slettes i produksjon")}</Vis>
      <Vis at={2}>
        {punkt(940, "20. mars", "Backup gjenopprettes", true)}
        <rect x={800} y={146} width={280} height={34} rx={6} fill={ROSA} />
        <Tekst x={940} y={169} size={17} vekt={700} anchor="middle" farge={RODDYP}>
          Kari er tilbake
        </Tekst>
      </Vis>
    </Ramme>
  );
}

/** Lesere som er i gang når slettingen kommer. Steg 1 lesere, 2 DELETE, 3 VACUUM. */
export function Lesere() {
  const bar = (
    x1: number,
    x2: number,
    y: number,
    navn: string,
    versjon: string,
    kari: boolean,
  ) => (
    <g>
      <rect
        x={x1}
        y={y}
        width={x2 - x1}
        height={44}
        rx={8}
        fill={kari ? ROSA : "#E3F7F4"}
        stroke={kari ? RODDYP : TEAL}
        strokeWidth={1.8}
      />
      <Tekst x={x1 + 14} y={y + 19} size={15} vekt={700} farge={kari ? RODDYP : TEAL}>
        {navn}
      </Tekst>
      <Tekst x={x1 + 14} y={y + 36} size={13} farge={DUS}>
        {versjon}
      </Tekst>
    </g>
  );
  return (
    <Ramme w={680} h={360} label="Lesere som startet før slettingen ser Kari. Lesere som startet etter ser henne ikke.">
      <Tekst x={0} y={18} size={13} vekt={700} farge={DUS} spacing={1.2}>
        TID →
      </Tekst>
      <Vis at={1}>
        {bar(20, 560, 40, "Nattjobb", "leser versjon 6, ser Kari", true)}
        {bar(20, 250, 100, "Analytiker", "versjon 6, ser Kari", true)}
      </Vis>
      <Vis at={2}>
        <line x1={330} y1={30} x2={330} y2={300} stroke={RODDYP} strokeWidth={2.2} strokeDasharray="7 5" />
        <Tekst x={330} y={322} size={15} vekt={700} anchor="middle" mono farge={RODDYP}>
          DELETE → versjon 7
        </Tekst>
        {bar(370, 640, 160, "Rapport", "leser versjon 7, ser ikke Kari", false)}
        {bar(410, 620, 220, "Ny spørring", "versjon 7", false)}
      </Vis>
      <Vis at={3}>
        <line x1={560} y1={290} x2={560} y2={350} stroke={STREK} strokeWidth={1.6} strokeDasharray="4 4" />
        <Tekst x={572} y={344} size={15} vekt={700} mono farge={STREK}>
          VACUUM må vente
        </Tekst>
      </Vis>
    </Ramme>
  );
}
