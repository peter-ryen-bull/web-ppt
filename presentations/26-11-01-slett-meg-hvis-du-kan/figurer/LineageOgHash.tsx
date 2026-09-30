"use client";

import {
  Node,
  Pil,
  Ramme,
  Tekst,
  Vis,
  MINT,
  MONO,
  RODDYP,
  ROSA,
  TEAL,
} from "./svg";

/** Lineage: det verktøyet ser, og det det ikke ser. Steg 1 kjeden, 2 merking, 3 utenfor. */
export function LineageKart() {
  const xs = [20, 175, 330, 485];
  const navn = ["Kundesystem", "Rådata", "Renset", "Dataprodukt"];
  return (
    <Ramme w={1117} h={360} label="Lineage viser kjeden fra kundesystem til dashboard, men ikke Excel, e-post og Slack">
      <Vis at={1}>
        <rect
          x={0}
          y={10}
          width={765}
          height={330}
          rx={12}
          fill="none"
          stroke={TEAL}
          strokeWidth={1.6}
          strokeDasharray="7 6"
        />
        <Tekst x={20} y={38} size={14} vekt={700} farge={TEAL} spacing={1}>
          SYNLIG I LINEAGE
        </Tekst>
        {xs.map((x, i) => (
          <g key={x}>
            <Node x={x} y={70} w={125} h={64} label={navn[i]} tone={i === 0 ? "hvit" : "teal"} size={16} />
            <Pil x1={x + 127} y1={102} x2={x + 153} y2={102} />
          </g>
        ))}
        <Node x={635} y={70} w={115} h={64} label="Dashboard" size={16} />
      </Vis>

      <Vis at={2}>
        {xs.map((x) => (
          <g key={x}>
            <rect x={x} y={158} width={125} height={30} rx={6} fill={ROSA} />
            <Tekst x={x + 62} y={178} size={13} vekt={700} anchor="middle" farge={RODDYP}>
              navn · e-post
            </Tekst>
          </g>
        ))}
        <rect x={635} y={158} width={115} height={30} rx={6} fill={ROSA} />
        <Tekst x={692} y={178} size={13} vekt={700} anchor="middle" farge={RODDYP}>
          navn
        </Tekst>
      </Vis>

      <Vis at={3}>
        <rect
          x={800}
          y={10}
          width={317}
          height={330}
          rx={12}
          fill="none"
          stroke={RODDYP}
          strokeWidth={1.6}
          strokeDasharray="7 6"
        />
        <Tekst x={820} y={38} size={14} vekt={700} farge={RODDYP} spacing={1}>
          UTENFOR LINEAGE
        </Tekst>
        <Pil x1={752} y1={102} x2={796} y2={102} farge={RODDYP} stiplet />
        <Node x={822} y={70} w={273} h={52} label="Excel-filer" ikon="skjema" tone="rod" size={16} />
        <Node x={822} y={134} w={273} h={52} label="E-postvedlegg" ikon="konvolutt" tone="rod" size={16} />
        <Node x={822} y={198} w={273} h={52} label="Slack-meldinger" ikon="innboks" tone="rod" size={16} />
        <Node x={822} y={262} w={273} h={52} label="Skjermbilder" ikon="sok" tone="rod" size={16} />
      </Vis>
    </Ramme>
  );
}

/** Hashing er ikke sletting. Steg 1: angriperen prøver alle numre. */
export function HashFigur() {
  return (
    <Ramme w={1117} h={330} label="Et mobilnummer hashet med SHA-256 kan gjettes ved å prøve alle åtte-sifrede numre">
      <Node x={0} y={20} w={250} h={70} label="91234567" sub="mobilnummer" mono size={22} />
      <Pil x1={262} y1={55} x2={432} y2={55} />
      <Tekst x={347} y={42} size={15} vekt={700} anchor="middle" mono>
        SHA-256
      </Tekst>
      <Node x={444} y={20} w={400} h={70} label="41a6be0d6872…" sub="«anonymt»?" mono size={22} tone="teal" />

      <Vis at={1}>
        <rect x={0} y={130} width={1117} height={190} rx={10} fill="var(--burgundy)" />
        <Tekst x={28} y={168} size={17} vekt={700} farge={MINT}>
          Angriperen prøver alle numre fra 00000000 til 99999999:
        </Tekst>
        <text fontFamily={MONO} fontSize={20} fill={MINT}>
          <tspan x={28} y={214}>91234565 → 990d19e6e8b1…   ikke lik</tspan>
          <tspan x={28} y={248}>91234566 → a06d559b37f2…   ikke lik</tspan>
          <tspan x={28} y={282} fill="#FF8A90" fontWeight={700}>
            91234567 → 41a6be0d6872…   treff!
          </tspan>
        </text>
      </Vis>
    </Ramme>
  );
}
