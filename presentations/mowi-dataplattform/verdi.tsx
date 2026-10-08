"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import { Body, Card, Header, Label } from "./ui";

export function SlideGevinster() {
  const cards = useCopyCount("cards");
  const positions = [
    [81.3, 168, "var(--teal)"],
    [652, 168, "var(--burgundy)"],
    [81.3, 430, "var(--burgundy)"],
    [652, 430, "var(--teal)"],
  ] as const;
  return (
    <>
      <Header titleSize={28} />
      {Array.from({ length: cards }, (_, i) => {
        const [x, y, bar] = positions[i] ?? [81.3, 168, "var(--teal)"];
        return (
          <Card key={i} box={[x, y, 546.7, 234]} bar={bar}>
            <Box box={[28, 28, 490, 182]}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Label size={14} color="var(--red)">
                  <Copy k="cards" i={i} field="nummer" />
                </Label>
                <Label size={20}>
                  <Copy k="cards" i={i} field="tittel" />
                </Label>
                <Body size={16}>
                  <Copy k="cards" i={i} field="tekst" />
                </Body>
              </div>
            </Box>
          </Card>
        );
      })}
    </>
  );
}

export function SlideHvordan() {
  const steps = useCopyCount("steps");
  return (
    <>
      <Header titleSize={28} />
      {Array.from({ length: steps }, (_, i) => (
        <Card
          key={i}
          box={[81.3, 168 + i * 126, 1117.3, 110]}
          bar={i === 0 ? "var(--burgundy)" : "var(--teal)"}
          barSide="left"
        >
          <Box
            box={[28, 0, 1060, 110]}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: i === 0 ? "var(--burgundy)" : "var(--teal)",
                color: "var(--cream)",
                fontFamily: "var(--font-serif)",
                fontSize: pt(22),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label size={18}>
                <Copy k="steps" i={i} field="tittel" />
              </Label>
              <Body size={15}>
                <Copy k="steps" i={i} field="tekst" />
              </Body>
            </div>
          </Box>
        </Card>
      ))}
    </>
  );
}

export function SlideAvslutning() {
  const items = useCopyCount("items");
  return (
    <>
      <MilesLogo />
      <Box box={[81.3, 80, 1117.3, 120]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      {Array.from({ length: items }, (_, i) => (
        <Box key={i} box={[81.3, 230 + i * 88, 1117.3, 72]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 3,
                height: 48,
                background: "var(--red)",
                flexShrink: 0,
              }}
            />
            <Copy
              k="items"
              i={i}
              as="div"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(22),
                lineHeight: 1.3,
                color: "var(--burgundy)",
              }}
            />
          </div>
        </Box>
      ))}
      <Box box={[81.3, 610, 1117.3, 50]}>
        <Copy
          k="footer"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            color: "var(--red)",
          }}
        />
      </Box>
    </>
  );
}
