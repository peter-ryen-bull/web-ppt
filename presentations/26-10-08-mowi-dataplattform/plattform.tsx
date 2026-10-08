"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box } from "../parts";
import {
  DataplattformFlyt,
  DataplattformFlytDetaljert,
} from "./figurer/DataplattformFlyt";
import { Body, Card, Header, Label } from "./ui";

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
