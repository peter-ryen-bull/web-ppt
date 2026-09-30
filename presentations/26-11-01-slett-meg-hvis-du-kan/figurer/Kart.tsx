"use client";

import { useStep } from "@/components/steps";
import { Node, Pil, Ramme, Tekst, Vis, DUS, RODDYP, SANS, TEAL } from "./svg";

/*
 * «Der Kari bor»: fra kundesystemet og utover i organisasjonen.
 * Steg 1 plattformen, 2 rapporten, 3 uttrekk og meldinger, 4 kopier og spor.
 * Tallet til høyre teller boksene som er avdekket (tenkt eksempel).
 */
export function KariSpredning() {
  const step = useStep();
  const tall = step >= 4 ? 10 : step >= 3 ? 7 : step >= 2 ? 5 : step >= 1 ? 4 : 1;
  return (
    <Ramme w={1117} h={440} label="Kari finnes i kundesystemet, plattformen, rapporter, uttrekk, sikkerhetskopier og logger">
      <Node x={0} y={150} w={170} h={80} label="Kundesystem" ikon="database" kari />

      <Vis at={1}>
        <rect
          x={215}
          y={30}
          width={400}
          height={310}
          rx={12}
          fill="none"
          stroke={TEAL}
          strokeWidth={1.6}
          strokeDasharray="7 6"
        />
        <Tekst x={235} y={56} size={14} farge={TEAL} vekt={700} spacing={1}>
          DATAPLATTFORM
        </Tekst>
        <Pil x1={170} y1={190} x2={240} y2={112} />
        <Node x={240} y={82} w={350} h={52} label="Rådata" tone="teal" kari />
        <Pil x1={415} y1={134} x2={415} y2={166} />
        <Node x={240} y={166} w={350} h={52} label="Renset" tone="teal" kari />
        <Pil x1={415} y1={218} x2={415} y2={250} />
        <Node x={240} y={250} w={350} h={52} label="Dataprodukt: kundetall" tone="teal" kari />
      </Vis>

      <Vis at={2}>
        <Pil x1={590} y1={276} x2={660} y2={89} />
        <Node x={660} y={60} w={230} h={58} label="Power BI-rapport" ikon="kart" kari />
      </Vis>

      <Vis at={3}>
        <Pil x1={590} y1={276} x2={660} y2={169} />
        <Node x={660} y={140} w={230} h={58} label="Excel-uttrekk" ikon="skjema" kari />
        <Pil x1={590} y1={276} x2={660} y2={249} />
        <Node x={660} y={220} w={230} h={58} label="E-post og Slack" ikon="konvolutt" kari />
      </Vis>

      <Vis at={4}>
        <Node x={215} y={372} w={190} h={58} label="Sikkerhetskopi" ikon="lag" kari stiplet />
        <Node x={422} y={372} w={190} h={58} label="Logger" sub="og spørrehistorikk" ikon="bok" kari stiplet size={16} />
        <Node x={660} y={372} w={230} h={58} label="Testmiljø" ikon="server" kari stiplet />
      </Vis>

      {/* Telleren */}
      <text
        x={1010}
        y={200}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize={110}
        fill={RODDYP}
      >
        {tall}
      </text>
      <text x={1010} y={248} textAnchor="middle" fontFamily={SANS} fontSize={17} fill={DUS}>
        {tall === 1 ? "sted med Kari" : "steder med Kari"}
      </text>
    </Ramme>
  );
}

/** Rapporten har sin egen kopi, og folk eksporterer den videre. */
export function RapportFigur() {
  return (
    <Ramme w={1117} h={150} label="Dataproduktet importeres som en kopi i rapportens datasett, og rapporten eksporteres til Excel og PDF på e-post">
      <Node x={0} y={40} w={220} h={70} label="Dataprodukt" tone="teal" />
      <Pil x1={230} y1={75} x2={310} y2={75} />
      <Node x={320} y={40} w={290} h={70} label="Datasett i rapporten" sub="importert kopi" tone="rod" kari />
      <Pil x1={620} y1={75} x2={700} y2={75} />
      <Node x={710} y={40} w={190} h={70} label="Rapport" ikon="kart" kari />
      <Pil x1={910} y1={60} x2={950} y2={30} />
      <Node x={950} y={4} w={167} h={44} label="Excel" size={16} kari />
      <Pil x1={910} y1={90} x2={950} y2={122} />
      <Node x={950} y={100} w={167} h={44} label="PDF på e-post" size={16} kari />
    </Ramme>
  );
}
