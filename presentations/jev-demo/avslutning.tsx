"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, pt } from "../parts";
import { Body, Card, Header, Label, MONO, MUTED, PINK, sans, serif } from "./ui";

export function SlideBegrensninger() {
  const items = useCopyCount("items");
  return (
    <>
      <Header />
      {Array.from({ length: items }, (_, i) => (
        <Card key={i} box={[81 + (i % 2) * 565, 175 + Math.floor(i / 2) * 104, 552, 92]}>
          <Box box={[20, 14, 512, 70]}>
            <Copy k="items" i={i} field="tittel" as="div" style={{ ...sans, fontSize: pt(15), fontWeight: 700, color: "var(--red-deep)" }} />
            <Copy k="items" i={i} field="tekst" as="div" style={{ ...sans, fontSize: pt(13), lineHeight: 1.3, color: "var(--burgundy)", marginTop: 4 }} />
          </Box>
        </Card>
      ))}
    </>
  );
}

const FLOW = ["request", "jev", "kode", "ut"] as const;

export function SlideArbeidsdeling() {
  const roller = useCopyCount("roller");
  const colors = ["var(--teal)", "var(--burgundy)", "var(--red-deep)"];
  return (
    <>
      <Header />
      {/* Flyt */}
      <Box box={[81, 180, 1117, 90]} style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {FLOW.map((k, i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, height: 74, background: i === 1 ? "var(--teal)" : i === 2 ? "var(--burgundy)" : PINK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 16px" }}>
              <Copy k={`flow_${k}`} as="div" style={{ ...sans, fontSize: pt(14), fontWeight: 700, color: i === 1 || i === 2 ? "#fff" : "var(--burgundy)" }} />
              <Copy k={`flow_${k}_sub`} as="div" style={{ fontFamily: MONO, fontSize: pt(10), color: i === 1 ? "var(--mint)" : i === 2 ? "var(--cream-dark)" : MUTED, marginTop: 3 }} />
            </div>
            {i < FLOW.length - 1 && <div style={{ ...sans, fontSize: pt(22), color: "var(--burgundy)", padding: "0 10px" }}>→</div>}
          </div>
        ))}
      </Box>
      {/* Roller */}
      {Array.from({ length: roller }, (_, i) => (
        <Card key={i} box={[81 + i * 380, 310, 357, 250]} bar={colors[i]}>
          <Box box={[22, 26, 313, 210]}>
            <Copy k="roller" i={i} field="navn" as="div" style={{ ...serif, fontSize: pt(26), color: colors[i] }} />
            <Label size={10}>
              <span style={{ display: "block", marginTop: 10 }}>
                <Copy k="roller" i={i} field="label" />
              </span>
            </Label>
            <Body size={13.5} style={{ marginTop: 8 }}>
              <Copy k="roller" i={i} field="tekst" />
            </Body>
          </Box>
        </Card>
      ))}
    </>
  );
}

export function SlideOppsummering() {
  const items = useCopyCount("items");
  return (
    <>
      <Header />
      <Box box={[81, 180, 640, 460]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {Array.from({ length: items }, (_, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ ...serif, fontSize: pt(26), color: "var(--red)", width: 30, lineHeight: 1 }}>{i + 1}</div>
              <Body size={16}>
                <Copy k="items" i={i} />
              </Body>
            </div>
          ))}
        </div>
      </Box>
      <Card box={[760, 180, 440, 330]} bar="var(--teal)">
        <Box box={[22, 26, 396, 290]}>
          <Label>
            <Copy k="kilder_label" />
          </Label>
          <KildeListe />
        </Box>
      </Card>
    </>
  );
}

function KildeListe() {
  const n = useCopyCount("kilder");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i}>
          <Copy k="kilder" i={i} field="navn" as="div" style={{ ...sans, fontSize: pt(12), fontWeight: 700, color: "var(--burgundy)" }} />
          <Copy k="kilder" i={i} field="url" as="div" style={{ fontFamily: MONO, fontSize: pt(9.5), color: MUTED, wordBreak: "break-all" }} />
        </div>
      ))}
    </div>
  );
}