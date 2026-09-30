"use client";

import type { CSSProperties, ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import { StrekIkon, type IkonNavn } from "./figurer/ikoner";

/*
 * Felles byggeklosser for «Slett meg hvis du kan». Publikumstekst leses fra
 * copy.yaml; små etiketter i figurer (tabellceller, kode) ligger i figurene.
 */

export const ROSA = "#FBE3E0";
export const DEMPET = "#5A4A50";
export const MONO =
  'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export const sans: CSSProperties = { fontFamily: "var(--font-sans)" };
export const serif: CSSProperties = { fontFamily: "var(--font-serif)" };

/** Kicker + tittel øverst, lest fra `kicker` og `title` i copy.yaml */
export function Header({ titleSize = 30 }: { titleSize?: number }) {
  return (
    <>
      <MilesLogo />
      <Box box={[81.3, 48, 900, 29.3]}>
        <Copy
          k="kicker"
          as="div"
          style={{
            ...sans,
            fontSize: pt(14),
            letterSpacing: 1.2,
            color: "var(--red)",
          }}
        />
      </Box>
      <Box box={[81.3, 77.3, 1040, 60]}>
        <Copy
          k="title"
          as="div"
          style={{
            ...serif,
            fontSize: pt(titleSize),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
    </>
  );
}

/** Hvit flate med farget strek på toppen eller til venstre */
export function Kort({
  box,
  bar,
  barSide = "top",
  bg = "#fff",
  style,
  children,
}: {
  box: [number, number, number, number];
  bar?: string;
  barSide?: "top" | "left";
  bg?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <Box box={box} style={{ background: bg, overflow: "hidden", ...style }}>
      {bar && barSide === "top" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: 6,
            background: bar,
          }}
        />
      )}
      {bar && barSide === "left" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: "100%",
            background: bar,
          }}
        />
      )}
      {children}
    </Box>
  );
}

/** Rosa notatlinje nederst, leser `k` (standard `footer`) */
export function Notat({
  box = [81.3, 628, 1117.3, 56],
  k = "footer",
  children,
}: {
  box?: [number, number, number, number];
  k?: string;
  children?: ReactNode;
}) {
  return (
    <Box
      box={box}
      style={{
        background: ROSA,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          ...sans,
          fontSize: pt(15),
          lineHeight: 1.3,
          color: "var(--burgundy)",
        }}
      >
        {children ?? <Copy k={k} as="div" />}
      </div>
    </Box>
  );
}

/** «Tenkt eksempel»-merke – alle konstruerte eksempler skal ha det */
export function Stempel({
  box = [1000, 690, 200, 24],
  k = "tenkt",
}: {
  box?: [number, number, number, number];
  k?: string;
}) {
  return (
    <Box
      box={box}
      style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
    >
      <span
        style={{
          ...sans,
          fontSize: pt(11),
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: "var(--red-deep)",
          border: "1.5px solid var(--red-deep)",
          borderRadius: 3,
          padding: "3px 8px",
        }}
      >
        <Copy k={k} />
      </span>
    </Box>
  );
}

/** Mørk kodeflate i monospace. Linjene ligger i figuren, ikke i copy.yaml. */
export function Kode({
  box,
  linjer,
  size = 17,
  tone = "mork",
}: {
  box: [number, number, number, number];
  linjer: ReactNode[];
  size?: number;
  tone?: "mork" | "lys";
}) {
  const mork = tone === "mork";
  return (
    <Box
      box={box}
      style={{
        background: mork ? "var(--burgundy)" : "#fff",
        border: mork ? undefined : "1.5px solid var(--cream-dark)",
        borderRadius: 10,
        padding: "20px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: pt(size),
          lineHeight: 1.55,
          color: mork ? "var(--mint)" : "var(--burgundy)",
          whiteSpace: "pre",
        }}
      >
        {linjer.map((l, i) => (
          <div key={i}>{l || "\u00A0"}</div>
        ))}
      </div>
    </Box>
  );
}

export type RadTilstand = "normal" | "markert" | "borte" | "svak";

/**
 * Liten tabell i div-er. Høyde = (rader + 1) * radH. `tilstand` styrer hver
 * rad: markert (rosa, den vi bryr oss om), borte (tom, stiplet) og svak.
 */
export function Tabell({
  x,
  y,
  w,
  kolonner,
  rader,
  tilstand = [],
  bredder,
  radH = 38,
  size = 15,
  mono = false,
  tittel,
}: {
  x: number;
  y: number;
  w: number;
  kolonner: string[];
  rader: string[][];
  tilstand?: RadTilstand[];
  /** Relative kolonnebredder, f.eks. [1, 2, 3] */
  bredder?: number[];
  radH?: number;
  size?: number;
  mono?: boolean;
  tittel?: string;
}) {
  const fr = (bredder ?? kolonner.map(() => 1)).map((b) => `${b}fr`).join(" ");
  const tittelH = tittel ? 30 : 0;
  const font: CSSProperties = mono ? { fontFamily: MONO } : sans;
  return (
    <Box
      box={[x, y, w, tittelH + (rader.length + 1) * radH + 2]}
      style={{ background: "#fff", border: "1.5px solid var(--cream-dark)" }}
    >
      {tittel && (
        <div
          style={{
            ...sans,
            height: tittelH,
            lineHeight: `${tittelH}px`,
            padding: "0 14px",
            fontSize: pt(12),
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "var(--teal)",
            borderBottom: "1.5px solid var(--cream-dark)",
          }}
        >
          {tittel}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: fr,
          height: radH,
          alignItems: "center",
          padding: "0 14px",
          background: "var(--cream)",
          ...sans,
          fontSize: pt(11),
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: DEMPET,
        }}
      >
        {kolonner.map((k) => (
          <div key={k}>{k}</div>
        ))}
      </div>
      {rader.map((rad, i) => {
        const t = tilstand[i] ?? "normal";
        const borte = t === "borte";
        return (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: fr,
              height: radH,
              alignItems: "center",
              padding: "0 14px",
              borderTop: borte
                ? "1.5px dashed var(--divider)"
                : "1px solid var(--cream-dark)",
              background: t === "markert" ? ROSA : "transparent",
              color: t === "markert" ? "var(--red-deep)" : "var(--burgundy)",
              fontWeight: t === "markert" ? 700 : 400,
              opacity: t === "svak" ? 0.4 : 1,
              textDecoration: t === "svak" ? "line-through" : "none",
              transition: "background 260ms ease, opacity 260ms ease",
              ...font,
              fontSize: pt(size),
            }}
          >
            {borte
              ? rad.map((_, c) => (
                  <div key={c} style={{ color: "var(--divider)" }}>
                    {c === 0 ? "—" : ""}
                  </div>
                ))
              : rad.map((celle, c) => <div key={c}>{celle}</div>)}
          </div>
        );
      })}
    </Box>
  );
}

/** Ikon + tittel + tekst fra en `cards`-liste i copy.yaml */
export function IkonKort({
  box,
  k = "cards",
  i,
  ikon,
  bar = "var(--burgundy)",
  titleSize = 22,
  textSize = 15,
}: {
  box: [number, number, number, number];
  k?: string;
  i: number;
  ikon?: IkonNavn;
  bar?: string;
  titleSize?: number;
  textSize?: number;
}) {
  return (
    <Kort box={box} bar={bar}>
      <div style={{ padding: "26px 26px 0" }}>
        {ikon && (
          <div style={{ marginBottom: 14 }}>
            <StrekIkon navn={ikon} size={38} />
          </div>
        )}
        <Copy
          k={k}
          i={i}
          field="tittel"
          as="div"
          style={{
            ...serif,
            fontSize: pt(titleSize),
            lineHeight: 1.15,
            color: "var(--burgundy)",
            marginBottom: 12,
          }}
        />
        <Copy
          k={k}
          i={i}
          field="tekst"
          as="div"
          style={{
            ...sans,
            fontSize: pt(textSize),
            lineHeight: 1.4,
            color: "var(--burgundy)",
          }}
        />
      </div>
    </Kort>
  );
}
