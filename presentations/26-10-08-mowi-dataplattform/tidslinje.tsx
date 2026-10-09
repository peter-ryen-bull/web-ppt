"use client";

import type { CSSProperties } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { Box, Reveal } from "../parts";
import { Body, Card, CREAM_PINK, FooterNote, Header, Label, MUTED } from "./ui";

const X0 = 81.3;
const W = 1117.3;
const GUTTER = 6;

const kolonnetittel: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1.4,
};

/** x og bredde for et spenn av måneder, med luft mellom nabospenn. */
function spenn(
  start: number,
  lengde: number,
  antall: number,
  x0 = X0,
  bredde = W,
): [number, number] {
  const mw = bredde / antall;
  const venstre = x0 + start * mw + (start === 0 ? 0 : GUTTER);
  const hoyre = x0 + (start + lengde) * mw - (start + lengde === antall ? 0 : GUTTER);
  return [venstre, hoyre - venstre];
}

export function SlideLeveranse() {
  const sporsmal = useCopyCount("sporsmal");
  const leveranser = useCopyCount("leveranser");
  const PANEL: [number, number, number, number] = [X0, 218, 400, 408];
  const RX = 505.3;
  const CW = (X0 + W - RX - 24) / 2;
  const CH = (PANEL[3] - 24) / 2;
  return (
    <>
      <Header titleSize={30} />

      <Box box={[X0, 190, PANEL[2], 20]}>
        <Copy k="sporsmal_tittel" as="div" style={{ ...kolonnetittel, color: "var(--teal)" }} />
      </Box>
      <Box box={PANEL} style={{ background: "var(--teal)" }}>
        <Box box={[32, 32, PANEL[2] - 64, PANEL[3] - 64]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {Array.from({ length: sporsmal }, (_, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div
                  style={{
                    width: 3,
                    background: "var(--mint)",
                    flexShrink: 0,
                  }}
                />
                <Body size={16} color="var(--cream)">
                  <Copy k="sporsmal" i={i} />
                </Body>
              </div>
            ))}
          </div>
        </Box>
      </Box>

      <Box box={[RX, 190, X0 + W - RX, 20]}>
        <Copy k="leveranser_tittel" as="div" style={{ ...kolonnetittel, color: "var(--teal)" }} />
      </Box>
      {Array.from({ length: leveranser }, (_, i) => {
        const x = RX + (i % 2) * (CW + 24);
        const y = PANEL[1] + Math.floor(i / 2) * (CH + 24);
        return (
          <Card
            key={i}
            box={[x, y, CW, CH]}
            bar={i === 3 ? "var(--burgundy)" : "var(--teal)"}
          >
            <Box box={[24, 30, CW - 48, CH - 44]}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label size={17}>
                  <Copy k="leveranser" i={i} field="tittel" />
                </Label>
                <Body size={13.5} color={MUTED}>
                  <Copy k="leveranser" i={i} field="tekst" />
                </Body>
              </div>
            </Box>
          </Card>
        );
      })}

      <FooterNote />
    </>
  );
}

/** Måned-start og varighet for hver fase i `faser`. */
const FASER: [number, number][] = [
  [0, 2],
  [2, 1],
  [3, 1],
  [4, 1],
];
const FASE_FARGER = [
  "var(--burgundy)",
  "var(--teal)",
  "var(--teal)",
  "var(--red-deep)",
];
const FEM = 5;
const FASE_W = 420;
const GRID_X = X0 + FASE_W + 20;
const GRID_W = X0 + W - GRID_X;
const FASE_Y = 234;
const FASE_H = 86;
const FASE_GAP = 12;

export function SlideFemManeder() {
  const faser = Math.min(useCopyCount("faser"), FASER.length);
  const maneder = Math.min(useCopyCount("maneder"), FEM);
  const mw = GRID_W / FEM;
  const bunn = FASE_Y + FASER.length * (FASE_H + FASE_GAP) - FASE_GAP;
  return (
    <>
      <Header titleSize={30} />

      <Box box={[X0, 196, FASE_W, 20]}>
        <Copy k="fase_tittel" as="div" style={{ ...kolonnetittel, color: "var(--teal)" }} />
      </Box>
      {Array.from({ length: maneder }, (_, m) => (
        <Box key={m} box={[GRID_X + m * mw, 196, mw, 20]}>
          <Copy
            k="maneder"
            i={m}
            as="div"
            style={{ ...kolonnetittel, color: "var(--teal)", textAlign: "center" }}
          />
        </Box>
      ))}
      <Box box={[X0, 222, W, 2]} style={{ background: "var(--divider)" }} />
      {Array.from({ length: FEM - 1 }, (_, m) => (
        <Box
          key={m}
          box={[GRID_X + (m + 1) * mw, 224, 1, bunn - 224]}
          style={{ background: "var(--divider)", opacity: 0.6 }}
        />
      ))}

      {Array.from({ length: faser }, (_, i) => {
        const [start, lengde] = FASER[i];
        const [x, w] = spenn(start, lengde, FEM, GRID_X, GRID_W);
        const y = FASE_Y + i * (FASE_H + FASE_GAP);
        return (
          <Reveal key={i} at={i}>
            <Box
              box={[X0, y, FASE_W, FASE_H]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Label size={17}>
                  <Copy k="faser" i={i} field="tittel" />
                </Label>
                <Body size={13.5} color={MUTED}>
                  <Copy k="faser" i={i} field="tekst" />
                </Body>
              </div>
            </Box>
            <Box
              box={[x, y + 14, w, FASE_H - 28]}
              style={{
                background: FASE_FARGER[i],
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
              }}
            >
              <Label size={13} color="var(--cream)">
                <Copy k="faser" i={i} field="varighet" />
              </Label>
            </Box>
          </Reveal>
        );
      })}

      <Reveal at={FASER.length - 1}>
        <FooterNote />
      </Reveal>
    </>
  );
}

const SEKS = 6;
const RAD_H = 100;
const RADER = [
  { y: 228, start: 0, lengde: 2, farge: "var(--burgundy)", tekstInni: true },
  { y: 340, start: 2, lengde: 1, farge: "var(--red)", tekstInni: false },
  { y: 452, start: 3, lengde: 3, farge: "var(--teal)", tekstInni: true },
];

function Fasetekst({
  i,
  lys,
  box,
}: {
  i: number;
  lys: boolean;
  box: [number, number, number, number];
}) {
  return (
    <Box box={box} style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            ...kolonnetittel,
            fontSize: 11,
            color: lys ? "var(--mint)" : "var(--red)",
          }}
        >
          <Copy k="faser" i={i} field="periode" />
        </div>
        <Label size={16} color={lys ? "var(--cream)" : "var(--burgundy)"}>
          <Copy k="faser" i={i} field="tittel" />
        </Label>
        <Body size={12.5} color={lys ? "#E6D9DC" : MUTED}>
          <Copy k="faser" i={i} field="tekst" />
        </Body>
      </div>
    </Box>
  );
}

export function SlideTolvManeder() {
  const faser = Math.min(useCopyCount("faser"), RADER.length);
  const resultat = useCopyCount("resultat");
  const mw = W / SEKS;
  return (
    <>
      <Header titleSize={30} />

      {Array.from({ length: SEKS }, (_, m) => (
        <Box key={m} box={[X0 + m * mw, 192, mw, 20]}>
          <div style={{ ...kolonnetittel, color: "var(--teal)", textAlign: "center" }}>
            {m + 1}
          </div>
        </Box>
      ))}
      <Box box={[X0, 216, W, 2]} style={{ background: "var(--divider)" }} />
      {Array.from({ length: SEKS - 1 }, (_, m) => (
        <Box
          key={m}
          box={[X0 + (m + 1) * mw, 218, 1, RADER[2].y + RAD_H - 218]}
          style={{ background: "var(--divider)", opacity: 0.6 }}
        />
      ))}

      {Array.from({ length: faser }, (_, i) => {
        const rad = RADER[i];
        const [x, w] = spenn(rad.start, rad.lengde, SEKS);
        return (
          <Reveal key={i} at={i}>
            <Box box={[x, rad.y, w, RAD_H]} style={{ background: rad.farge }}>
              {rad.tekstInni && (
                <Fasetekst i={i} lys box={[22, 0, w - 44, RAD_H]} />
              )}
            </Box>
            {!rad.tekstInni && (
              <Fasetekst i={i} lys={false} box={[x + w + 20, rad.y, 520, RAD_H]} />
            )}
          </Reveal>
        );
      })}

      <Reveal at={RADER.length}>
        <Box
          box={[X0, 570, W, 128]}
          style={{ background: CREAM_PINK, padding: "20px 28px" }}
        >
          <Copy
            k="resultat_tittel"
            as="div"
            style={{ ...kolonnetittel, color: "var(--red)", marginBottom: 12 }}
          />
          <div style={{ display: "flex", gap: 40 }}>
            {Array.from({ length: resultat }, (_, i) => (
              <div key={i} style={{ flex: 1, display: "flex", gap: 14 }}>
                <div style={{ width: 3, background: "var(--red)", flexShrink: 0 }} />
                <Body size={15}>
                  <Copy k="resultat" i={i} />
                </Body>
              </div>
            ))}
          </div>
        </Box>
      </Reveal>
    </>
  );
}
