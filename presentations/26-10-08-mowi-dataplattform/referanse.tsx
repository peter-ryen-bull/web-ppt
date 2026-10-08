"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, Img } from "../parts";
import { AquaPlatformLogo } from "./figurer/AquaPlatformLogo";
import { Body, Card, FooterNote, Header, Label, MEDIA } from "./ui";

const KILDE_X = 81.3;
const KILDE_W = 300;
const KILDE_Y = 222;
const KILDE_H = 60;
const KILDE_GAP = 9;

const SKY: [number, number, number, number] = [470, 222, 340, 405];
const AQUA: [number, number, number, number] = [900, 222, 300.7, 230];
const POWERBI: [number, number, number, number] = [900, 471, 300.7, 156];

const AQUA_BG = "#061917";

function Kolonnetittel({ box, k }: { box: [number, number, number, number]; k: string }) {
  return (
    <Box box={box}>
      <Copy
        k={k}
        as="div"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.4,
          color: "var(--teal)",
        }}
      />
    </Box>
  );
}

function Piler({ antall }: { antall: number }) {
  const skyMidt = SKY[1] + SKY[3] / 2;
  const fraKilde = Array.from({ length: antall }, (_, i) => {
    const y = KILDE_Y + i * (KILDE_H + KILDE_GAP) + KILDE_H / 2;
    const x1 = KILDE_X + KILDE_W;
    const x2 = SKY[0];
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y} C${mx} ${y} ${mx} ${skyMidt} ${x2 - 6} ${skyMidt}`;
  });
  const tilBruk = [AQUA, POWERBI].map((b) => {
    const y = b[1] + b[3] / 2;
    const x1 = SKY[0] + SKY[2];
    const x2 = b[0];
    const mx = (x1 + x2) / 2;
    return `M${x1} ${skyMidt} C${mx} ${skyMidt} ${mx} ${y} ${x2 - 6} ${y}`;
  });
  return (
    <svg
      width={1280}
      height={720}
      viewBox="0 0 1280 720"
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <marker
          id="referanse-pil"
          viewBox="0 0 10 10"
          refX="2"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--teal)" />
        </marker>
      </defs>
      {[...fraKilde, ...tilBruk].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--teal)"
          strokeWidth={2}
          strokeOpacity={0.7}
          markerEnd="url(#referanse-pil)"
        />
      ))}
    </svg>
  );
}

export function SlideReferanse() {
  const antall = useCopyCount("kilder");
  return (
    <>
      <Header titleSize={30} />
      <Box box={[1030, 51.5, 92, 24]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/kleri-logo.svg`}
          alt="Kleri"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Piler antall={antall} />

      <Kolonnetittel box={[KILDE_X, 194, KILDE_W, 20]} k="kilder_tittel" />
      {Array.from({ length: antall }, (_, i) => (
        <Card
          key={i}
          box={[KILDE_X, KILDE_Y + i * (KILDE_H + KILDE_GAP), KILDE_W, KILDE_H]}
          bar="var(--teal)"
          barSide="left"
        >
          <Box box={[22, 9, KILDE_W - 34, KILDE_H - 14]}>
            <Label size={13}>
              <Copy k="kilder" i={i} field="navn" />
            </Label>
            <Body size={10.5} color="#5A4A50">
              <Copy k="kilder" i={i} field="tekst" />
            </Body>
          </Box>
        </Card>
      ))}

      <Kolonnetittel box={[SKY[0], 194, SKY[2], 20]} k="plattform_tittel" />
      <Box
        box={SKY}
        style={{
          border: "2px dashed #3A96DD",
          borderRadius: 10,
          background: "rgba(255,255,255,0.45)",
        }}
      />
      <Img box={[SKY[0] + 2, SKY[1] - 6, 230, 112]} src={`${MEDIA}/azure.png`} alt="Microsoft Azure" />
      <Card box={[SKY[0] + 40, SKY[1] + 110, SKY[2] - 80, 200]}>
        <Img box={[30, 22, SKY[2] - 140, 110]} src={`${MEDIA}/databricks.png`} alt="Databricks" />
        <Box box={[16, 146, SKY[2] - 112, 44]}>
          <Body size={12} color="#5A4A50">
            <Copy k="plattform_tekst" as="div" style={{ textAlign: "center" }} />
          </Body>
        </Box>
      </Card>
      <Box box={[SKY[0] + 20, SKY[1] + SKY[3] - 70, SKY[2] - 40, 56]}>
        <Body size={12} color="var(--teal)">
          <Copy k="inn" as="div" style={{ textAlign: "center" }} />
        </Body>
      </Box>

      <Kolonnetittel box={[AQUA[0], 194, AQUA[2], 20]} k="bruk_tittel" />
      <Box box={AQUA} style={{ background: AQUA_BG, borderRadius: 6 }}>
        <Box box={[24, 44, AQUA[2] - 48, 70]}>
          <AquaPlatformLogo size={52} />
        </Box>
        <Box box={[24, 136, AQUA[2] - 48, 80]}>
          <Body size={12.5} color="#CFE3DF">
            <Copy k="aqua_tekst" />
          </Body>
        </Box>
      </Box>
      <Card box={POWERBI}>
        <Img box={[4, 2, 190, 104]} src={`${MEDIA}/powerbi.png`} alt="Power BI" />
        <Box box={[24, 104, POWERBI[2] - 48, 44]}>
          <Body size={12.5} color="#5A4A50">
            <Copy k="powerbi_tekst" />
          </Body>
        </Box>
      </Card>
      <FooterNote box={[81.3, 642, 1117.3, 60]} />
    </>
  );
}
