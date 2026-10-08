"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, Img, pt } from "../parts";
import { Body, Card, Header, Label, MEDIA, Stack } from "./ui";

export function SlideForside() {
  return (
    <>
      <Box box={[39, 49.1, 900, 200]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(32),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.4,
            color: "var(--red)",
            marginTop: 18,
          }}
        />
      </Box>
      <Img
        box={[39, 423.2, 822.5, 254.7]}
        src={`${MEDIA}/miles-wordmark.svg`}
        alt="Miles"
      />
    </>
  );
}

export function SlidePains() {
  return (
    <>
      <Header />
      <Card box={[81.3, 168, 1117.3, 480]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 1066.7, 420]}>
          <Stack titleK="section" itemsK="items" gap={18} size={20} />
        </Box>
      </Card>
    </>
  );
}

export function SlideKonsekvenser() {
  return (
    <>
      <Header />
      <Card box={[81.3, 168, 1117.3, 480]} bar="var(--red-deep)">
        <Box box={[24, 29.3, 1066.7, 420]}>
          <Stack
            titleK="section"
            itemsK="items"
            titleColor="var(--red-deep)"
            gap={18}
            size={20}
          />
        </Box>
      </Card>
    </>
  );
}

export function SlideMalbilde() {
  const prinsipper = useCopyCount("prinsipper");
  const xs = [81.3, 365.3, 649.3, 933.3];
  return (
    <>
      <Header />
      <Card box={[81.3, 168, 546.7, 306.7]} bar="var(--red-deep)">
        <Box box={[24, 29.3, 498.7, 261.3]}>
          <Stack
            titleK="idag_tittel"
            itemsK="idag"
            titleColor="var(--red-deep)"
            gap={8}
            size={14}
          />
        </Box>
      </Card>
      <Box
        box={[624, 296, 32, 42.7]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--burgundy)",
          fontSize: pt(22),
        }}
      >
        →
      </Box>
      <Card box={[652, 168, 546.7, 306.7]} bar="var(--teal)">
        <Box box={[24, 29.3, 498.7, 261.3]}>
          <Stack
            titleK="malbilde_tittel"
            itemsK="malbilde"
            titleColor="var(--teal)"
            gap={6}
            size={14}
          />
        </Box>
      </Card>
      <Box box={[81.3, 501.3, 800, 29.3]}>
        <Copy
          k="prinsipper_label"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 1.2,
            color: "var(--red)",
          }}
        />
      </Box>
      {Array.from({ length: prinsipper }, (_, i) => (
        <Card key={i} box={[xs[i] ?? 81.3, 538.7, 262.7, 138.7]}>
          <Box box={[21.4, 18.6, 220, 101.3]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label size={15}>
                <Copy k="prinsipper" i={i} field="tittel" />
              </Label>
              <Body size={14}>
                <Copy k="prinsipper" i={i} field="tekst" />
              </Body>
            </div>
          </Box>
        </Card>
      ))}
    </>
  );
}
