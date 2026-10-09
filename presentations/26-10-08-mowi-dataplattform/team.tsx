"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box } from "../parts";
import { Body, Card, Header, Label, MEDIA, MUTED } from "./ui";

const X0 = 81.3;
const W = 1117.3;
const GAP = 24;
const Y = 220;
const H = 476;
const FOTO_D = 104;

/** Bilde og fokuspunkt per person, i samme rekkefølge som `personer`. */
const FOTO: { src: string; posisjon: string }[] = [
  { src: `${MEDIA}/peter.webp`, posisjon: "50% 30%" },
  { src: `${MEDIA}/kestutis.png`, posisjon: "50% 35%" },
  { src: `${MEDIA}/iver.png`, posisjon: "50% 40%" },
];
const FARGER = ["var(--burgundy)", "var(--teal)", "var(--teal)"];

function Person({ i, box }: { i: number; box: [number, number, number, number] }) {
  const punkter = useCopyCount(`personer.${i}.punkter`);
  const foto = FOTO[i];
  const [, , w, h] = box;
  return (
    <Card box={box} bar={FARGER[i] ?? "var(--teal)"}>
      <Box box={[24, 34, w - 48, h - 58]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {foto && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={foto.src}
                alt=""
                style={{
                  width: FOTO_D,
                  height: FOTO_D,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: foto.posisjon,
                  filter: "grayscale(1)",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Label size={17}>
                <Copy k="personer" i={i} field="navn" />
              </Label>
              <Body size={12.5} color={MUTED}>
                <Copy k="personer" i={i} field="tittel" />
              </Body>
              <Label size={11.5} color={FARGER[i] ?? "var(--teal)"}>
                <Copy k="personer" i={i} field="rolle" />
              </Label>
            </div>
          </div>
          <Body size={13} color="var(--burgundy)">
            <Copy k="personer" i={i} field="tekst" />
          </Body>
          <div style={{ height: 1, background: "var(--divider)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Array.from({ length: punkter }, (_, p) => (
              <div key={p} style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    width: 3,
                    background: FARGER[i] ?? "var(--teal)",
                    flexShrink: 0,
                  }}
                />
                <Body size={12} color={MUTED}>
                  <Copy path={`personer.${i}.punkter.${p}`} />
                </Body>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Card>
  );
}

export function SlideTeam() {
  const antall = useCopyCount("personer");
  const cw = (W - GAP * (antall - 1)) / Math.max(antall, 1);
  return (
    <>
      <Header titleSize={30} leadWidth={W} leadHeight={68} />
      {Array.from({ length: antall }, (_, i) => (
        <Person key={i} i={i} box={[X0 + i * (cw + GAP), Y, cw, H]} />
      ))}
    </>
  );
}
