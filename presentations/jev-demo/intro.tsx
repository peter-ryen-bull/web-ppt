"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import { Body, Card, Header, Label, MONO, MUTED, PINK, sans, serif } from "./ui";

export function SlideForside() {
  return (
    <>
      <MilesLogo />
      <Box box={[81, 180, 1000, 60]}>
        <Copy k="kicker" as="div" style={{ ...sans, fontSize: pt(16), letterSpacing: 2, color: "var(--red)" }} />
      </Box>
      <Box box={[81, 230, 1100, 200]}>
        <Copy k="title" as="div" style={{ ...serif, fontSize: pt(66), lineHeight: 1.05, color: "var(--burgundy)" }} />
      </Box>
      <Box box={[81, 440, 900, 80]}>
        <Copy k="subtitle" as="div" style={{ ...sans, fontSize: pt(20), lineHeight: 1.35, color: MUTED }} />
      </Box>
      <Box box={[81, 620, 900, 40]}>
        <Copy k="byline" as="div" style={{ ...sans, fontSize: pt(14), color: "var(--burgundy)" }} />
      </Box>
    </>
  );
}

export function SlidePrimitiver() {
  const cards = useCopyCount("cards");
  const colors = ["var(--teal)", "var(--red-deep)", "var(--red)"];
  return (
    <>
      <Header />
      {Array.from({ length: cards }, (_, i) => (
        <Card key={i} box={[81 + i * 380, 180, 357, 340]} bar={colors[i]}>
          <Box box={[22, 26, 313, 300]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Copy k="cards" i={i} field="navn" as="div" style={{ ...serif, fontSize: pt(30), color: "var(--burgundy)" }} />
              <Body size={14}>
                <Copy k="cards" i={i} field="sporsmal" />
              </Body>
              <div>
                <Label size={10}>returnerer</Label>
                <Copy k="cards" i={i} field="svar" as="div" style={{ fontFamily: MONO, fontSize: pt(12), color: colors[i], marginTop: 4 }} />
              </div>
              <div>
                <Label size={10}>eksempel</Label>
                <Body size={13} color={MUTED} style={{ marginTop: 4 }}>
                  <Copy k="cards" i={i} field="eksempel" />
                </Body>
              </div>
            </div>
          </Box>
        </Card>
      ))}
      <Box box={[81, 545, 1117, 60]} style={{ background: PINK, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box" }}>
        <Copy k="footer" as="div" style={{ ...sans, fontSize: pt(15), color: "var(--burgundy)" }} />
      </Box>
    </>
  );
}
