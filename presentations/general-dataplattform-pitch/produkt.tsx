"use client";

import type { ReactNode } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { Box } from "../parts";
import { DatakontraktApi, DatakontraktBrudd } from "./figurer/Datakontrakt";
import { DataproduktAnatomi } from "./figurer/Dataprodukt";
import { Body, Card, FooterNote, Header, Label } from "./ui";

function DarkPanel({
  box,
  children,
}: {
  box: [number, number, number, number];
  children?: ReactNode;
}) {
  return (
    <Box
      box={box}
      style={{
        background: "var(--burgundy)",
        padding: "24px 24px",
      }}
    >
      {children}
    </Box>
  );
}

export function SlideDataprodukter() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataproduktAnatomi />
    </Box>
  );
}

export function SlideDatakontrakter() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktApi />
    </Box>
  );
}

export function SlideKontraktBrudd() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktBrudd />
    </Box>
  );
}

export function SlideDomener() {
  const items = useCopyCount("items");
  const cards = useCopyCount("cards");
  const positions = [
    [505.3, 168],
    [865.3, 168],
    [505.3, 402.7],
    [865.3, 402.7],
  ] as const;
  return (
    <>
      <Header titleSize={28} />
      <DarkPanel box={[81.3, 168, 400, 453.3]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Label size={14} color="var(--mint)">
            <Copy k="section" />
          </Label>
          {Array.from({ length: items }, (_, i) => (
            <Body key={i} size={15} color="var(--mint)">
              <Copy k="items" i={i} />
            </Body>
          ))}
        </div>
      </DarkPanel>
      {Array.from({ length: cards }, (_, i) => {
        const [x, y] = positions[i] ?? [505.3, 168];
        return (
          <Card key={i} box={[x, y, 333.3, 218.7]} bar="var(--red-deep)">
            <Box box={[24, 29.3, 285.3, 170.7]}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Label size={16}>
                  <Copy k="cards" i={i} field="tittel" />
                </Label>
                <Body size={14}>
                  <Copy k="cards" i={i} field="tekst" />
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
