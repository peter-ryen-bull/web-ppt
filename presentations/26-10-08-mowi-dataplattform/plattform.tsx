"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, Img, pt } from "../parts";
import {
  DataplattformFlyt,
  DataplattformFlytDetaljert,
} from "./figurer/DataplattformFlyt";
import { Body, Card, FooterNote, Header, Label, MEDIA, MUTED } from "./ui";

export function SlideDataflyt() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlyt />
    </Box>
  );
}

export function SlideArkitektur() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlytDetaljert />
    </Box>
  );
}

export function SlideEvner() {
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
            <Box box={[28, 32, 490, 178]}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Label size={18} color={bar}>
                  <Copy k="cards" i={i} field="tittel" />
                </Label>
                <Body size={16}>
                  <Copy k="cards" i={i} field="tekst" />
                </Body>
                <Body size={14} color="#9a5068">
                  <Copy k="cards" i={i} field="gevinst" />
                </Body>
              </div>
            </Box>
          </Card>
        );
      })}
    </>
  );
}

export function SlideKiChat() {
  const punkter = useCopyCount("punkter");
  const shot: [number, number, number, number] = [418.6, 196, 780, 375.3];
  const colH = shot[3];
  const gap = 12;
  const cardH = (colH - gap * (punkter - 1)) / Math.max(punkter, 1);
  return (
    <>
      <Header titleSize={28} />
      {Array.from({ length: punkter }, (_, i) => (
        <Card
          key={i}
          box={[81.3, shot[1] + i * (cardH + gap), 313.3, cardH]}
          bar={i % 2 === 0 ? "var(--teal)" : "var(--burgundy)"}
          barSide="left"
        >
          <Box
            box={[28, 0, 268, cardH]}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Label size={16}>
              <Copy k="punkter" i={i} field="tittel" />
            </Label>
            <Body size={14}>
              <Copy k="punkter" i={i} field="tekst" />
            </Body>
          </Box>
        </Card>
      ))}
      <Box
        box={shot}
        style={{
          background: "#fff",
          border: "1px solid var(--divider)",
          boxShadow: "0 6px 24px rgba(69, 13, 32, 0.12)",
          overflow: "hidden",
        }}
      >
        <Img
          box={[0, 0, shot[2], shot[3]]}
          src={`${MEDIA}/genie-chat.png`}
          alt="Chat i Genie One: spørsmålet «who are my biggest customers globally?» besvart med tekst og graf"
        />
      </Box>
      <Box box={[shot[0], shot[1] + shot[3] + 10, shot[2], 24]}>
        <Copy
          k="bildetekst"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(11),
            color: MUTED,
            textAlign: "right",
          }}
        />
      </Box>
      <FooterNote />
    </>
  );
}
