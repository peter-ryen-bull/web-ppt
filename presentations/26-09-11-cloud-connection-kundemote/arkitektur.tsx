"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, Img, pt } from "../parts";
import {
  Body,
  Card,
  DarkPanel,
  FooterNote,
  Header,
  Label,
  MEDIA,
  PinkCard,
  Stack,
} from "./ui";

function DomainCard({
  i,
  x,
  y,
}: {
  i: number;
  x: number;
  y: number;
}) {
  const linjer = useCopyCount(`cards.${i}.linjer`);
  return (
    <Card box={[x, y, 333.3, 218.7]} bar="var(--red-deep)">
      <Box box={[24, 29.3, 285.3, 170.7]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label size={16}>
            <Copy k="cards" i={i} field="tittel" />
          </Label>
          {Array.from({ length: linjer }, (_, j) => (
            <Body key={j} size={14}>
              <Copy path={`cards.${i}.linjer.${j}`} />
            </Body>
          ))}
        </div>
      </Box>
    </Card>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Label size={14} color="var(--mint)">
            <Copy k="section" />
          </Label>
          {Array.from({ length: items }, (_, i) => (
            <Body key={i} size={14} color="var(--mint)">
              <Copy k="items" i={i} />
            </Body>
          ))}
        </div>
      </DarkPanel>
      {Array.from({ length: cards }, (_, i) => {
        const [x, y] = positions[i] ?? [505.3, 168];
        return <DomainCard key={i} i={i} x={x} y={y} />;
      })}
      <FooterNote />
    </>
  );
}

function Cylinder({
  box,
  k,
}: {
  box: [number, number, number, number];
  k?: string;
}) {
  const [, , w, h] = box;
  return (
    <Box box={box}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        aria-hidden
        style={{ display: "block" }}
      >
        <ellipse cx={w / 2} cy={16} rx={w / 2 - 2} ry={16} fill="var(--teal)" />
        <rect x={2} y={16} width={w - 4} height={h - 32} fill="var(--teal)" />
        <ellipse
          cx={w / 2}
          cy={h - 16}
          rx={w / 2 - 2}
          ry={16}
          fill="#003238"
        />
      </svg>
      {k && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            padding: 8,
          }}
        >
          <Copy k={k} />
        </div>
      )}
    </Box>
  );
}

export function SlideDatadeling() {
  return (
    <>
      <Header titleSize={28} />
      <Cylinder box={[82.2, 153.8, 95.6, 120.9]} />
      <Box box={[203.6, 199, 213.3, 40]}>
        <Label>
          <Copy k="domains" i={0} />
        </Label>
      </Box>
      <Cylinder box={[81.3, 290.5, 95.6, 120.9]} />
      <Box box={[202.7, 335.7, 213.3, 40]}>
        <Label>
          <Copy k="domains" i={1} />
        </Label>
      </Box>
      <Cylinder box={[82.2, 433.3, 95.6, 120.9]} />
      <Box box={[202.7, 480.5, 257.8, 38.8]}>
        <Label>
          <Copy k="domains" i={2} />
        </Label>
      </Box>
      <Cylinder box={[82.2, 576, 95.6, 120.9]} />
      <Box box={[203.6, 624, 213.3, 40]}>
        <Label>
          <Copy k="domains" i={3} />
        </Label>
      </Box>

      <svg
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
        width={1280}
        height={720}
        aria-hidden
      >
        <line x1={306.7} y1={214} x2={346.7} y2={214} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={351.3} x2={346.7} y2={351.3} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={494} x2={346.7} y2={494} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={636.7} x2={346.7} y2={636.7} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={346.7} y1={214} x2={346.7} y2={636.7} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={346.7} y1={424} x2={507.3} y2={424} stroke="var(--burgundy)" strokeWidth={2} />
        <polygon points="507,419 518,424 507,429" fill="var(--burgundy)" />
        <line x1={682.5} y1={424} x2={845.5} y2={424} stroke="var(--burgundy)" strokeWidth={2} />
        <polygon points="845,419 856,424 845,429" fill="var(--burgundy)" />
      </svg>

      <Box
        box={[529.2, 382.7, 153.3, 85.3]}
        style={{
          background: "var(--red)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
        }}
      >
        <Copy
          k="contract"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(12),
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
          }}
        />
      </Box>

      <Cylinder box={[845.5, 281.2, 225.5, 241.9]} k="products" />
    </>
  );
}

export function SlideDataprodukter() {
  const cards = useCopyCount("cards");
  const example = useCopyCount("example");
  const positions = [
    [81.3, 189.3, "var(--teal)"],
    [462.7, 189.3, "var(--red-deep)"],
    [844, 189.3, "var(--teal)"],
    [81.3, 362.7, "var(--red-deep)"],
    [462.7, 362.7, "var(--teal)"],
    [844, 362.7, "var(--red-deep)"],
  ] as const;
  return (
    <>
      <Header titleSize={28} />
      <Box box={[81.3, 133.3, 1117.3, 32]}>
        <Body size={15}>
          <Copy k="lead" />
        </Body>
      </Box>
      {Array.from({ length: cards }, (_, i) => {
        const [x, y, bar] = positions[i] ?? [81.3, 189.3, "var(--teal)"];
        return (
          <Card key={i} box={[x, y, 354.7, 157.3]} bar={bar}>
            <Box box={[24, 26.7, 306.7, 117.3]}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label size={15}>
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
      <Box
        box={[81.3, 546.7, 1117.3, 157.3]}
        style={{ background: "var(--burgundy)", padding: "18.6px 24px" }}
      >
        <Label size={14} color="var(--mint)">
          <Copy k="example_label" />
        </Label>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 12,
            marginTop: 14,
          }}
        >
          {Array.from({ length: example }, (_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(14),
                  lineHeight: 1.3,
                  padding: "12px 14px",
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Copy k="example" i={i} />
              </div>
              {i < example - 1 && (
                <div style={{ color: "var(--mint)", fontSize: pt(18) }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

export function SlideDatakontrakter() {
  return (
    <>
      <Header titleSize={28} />
      <Card box={[81.3, 168, 533.3, 394.7]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 485.3, 346.7]}>
          <Stack titleK="section" itemsK="items" gap={12} size={14} />
        </Box>
      </Card>
      <Box
        box={[652, 168, 546.7, 394.7]}
        style={{ background: "var(--teal)", padding: "29.3px 26.7px" }}
      >
        <Label size={14} color="var(--mint)">
          <Copy k="example_label" />
        </Label>
        <Copy
          k="example"
          as="div"
          style={{
            marginTop: 16,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: pt(14),
            lineHeight: 1.55,
            color: "var(--mint)",
            whiteSpace: "pre-wrap",
          }}
        />
      </Box>
      <PinkCard box={[81.3, 589.3, 354.7, 114.7]} i={0} />
      <PinkCard box={[462.7, 589.3, 354.7, 114.7]} i={1} />
      <PinkCard box={[844, 589.3, 354.7, 114.7]} i={2} />
    </>
  );
}

export function SlideDatakvalitet() {
  const tester = useCopyCount("tester");
  const feil = useCopyCount("feil");
  const testerY = [189.3, 290.7, 392, 493.3];
  return (
    <>
      <Header titleSize={28} />
      <Box box={[81.3, 149.3, 613.3, 29.3]}>
        <Label size={14}>
          <Copy k="tester_label" />
        </Label>
      </Box>
      {Array.from({ length: tester }, (_, i) => (
        <Card key={i} box={[81.3, testerY[i] ?? 189.3, 613.3, 88]} bar="var(--teal)" barSide="left">
          <Box box={[29.4, 16, 560, 61.3]}>
            <Label size={15}>
              <Copy k="tester" i={i} field="tittel" />
            </Label>
            <Body size={14}>
              <Copy k="tester" i={i} field="tekst" />
            </Body>
          </Box>
        </Card>
      ))}
      <Box box={[732, 149.3, 466.7, 29.3]}>
        <Label size={14}>
          <Copy k="feil_label" />
        </Label>
      </Box>
      <DarkPanel box={[732, 189.3, 466.7, 405.3]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {Array.from({ length: feil }, (_, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 42.7,
                  height: 42.7,
                  borderRadius: 21,
                  background: "var(--mint)",
                  color: "var(--teal)",
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(15),
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <Body size={14} color="#fff">
                <Copy k="feil" i={i} />
              </Body>
            </div>
          ))}
        </div>
      </DarkPanel>
      <PinkCard box={[81.3, 616, 354.7, 88]} i={0} />
      <PinkCard box={[462.7, 616, 354.7, 88]} i={1} />
      <PinkCard box={[844, 616, 354.7, 88]} i={2} />
    </>
  );
}

export function SlideDeling() {
  return (
    <>
      <Header titleSize={28} />
      <Card box={[81.3, 168, 533.3, 386.7]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 485.3, 338.7]}>
          <Stack titleK="deling_tittel" itemsK="deling" gap={12} size={14} />
        </Box>
      </Card>
      <Card box={[652, 168, 546.7, 386.7]} bar="var(--teal)">
        <Box box={[24, 29.3, 498.7, 338.7]}>
          <Stack
            titleK="kostnad_tittel"
            itemsK="kostnad"
            titleColor="var(--teal)"
            gap={12}
            size={14}
          />
        </Box>
      </Card>
      <PinkCard box={[81.3, 581.3, 354.7, 122.7]} i={0} />
      <PinkCard box={[462.7, 581.3, 354.7, 122.7]} i={1} />
      <PinkCard box={[844, 581.3, 354.7, 122.7]} i={2} />
    </>
  );
}

export function SlideSikkerhet() {
  const sikkerhet = useCopyCount("sikkerhet");
  const infrastruktur = useCopyCount("infrastruktur");
  const positions = [
    [638.7, 184],
    [924, 184],
    [638.7, 309.3],
    [924, 309.3],
    [638.7, 434.7],
    [924, 434.7],
  ] as const;
  return (
    <>
      <Header titleSize={28} />
      <Box box={[81.3, 149.3, 520, 29.3]}>
        <Label size={14}>
          <Copy k="sikkerhet_label" />
        </Label>
      </Box>
      <DarkPanel box={[81.3, 184, 520, 370.7]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: sikkerhet }, (_, i) => (
            <Body key={i} size={14} color="var(--mint)">
              <Copy k="sikkerhet" i={i} />
            </Body>
          ))}
        </div>
      </DarkPanel>
      <Box box={[638.7, 149.3, 560, 29.3]}>
        <Label size={14}>
          <Copy k="infrastruktur_label" />
        </Label>
      </Box>
      {Array.from({ length: infrastruktur }, (_, i) => {
        const [x, y] = positions[i] ?? [638.7, 184];
        return (
          <Card key={i} box={[x, y, 272, 112]} bar="var(--teal)">
            <Box box={[21.3, 18.7, 229.3, 82.7]}>
              <Label size={15}>
                <Copy k="infrastruktur" i={i} field="tittel" />
              </Label>
              <Body size={14}>
                <Copy k="infrastruktur" i={i} field="tekst" />
              </Body>
            </Box>
          </Card>
        );
      })}
      <FooterNote box={[81.3, 586.7, 1117.3, 90.7]} />
    </>
  );
}

export function SlideGovernance() {
  const roller = useCopyCount("roller");
  const rollerX = [81.3, 366.7, 652, 937.3];
  const rollerBar = [
    "var(--red-deep)",
    "var(--red-deep)",
    "var(--teal)",
    "var(--teal)",
  ];
  return (
    <>
      <Header titleSize={28} />
      {Array.from({ length: roller }, (_, i) => (
        <Card key={i} box={[rollerX[i] ?? 81.3, 160, 258.7, 194.7]} bar={rollerBar[i]}>
          <Box box={[21.4, 24, 216, 154.7]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Label size={15}>
                <Copy k="roller" i={i} field="tittel" />
              </Label>
              <Body size={14}>
                <Copy k="roller" i={i} field="tekst" />
              </Body>
            </div>
          </Box>
        </Card>
      ))}
      <DarkPanel box={[81.3, 381.3, 533.3, 240]}>
        <Stack
          titleK="beslutninger_tittel"
          itemsK="beslutninger"
          titleColor="var(--mint)"
          color="var(--mint)"
          gap={12}
          size={14}
        />
      </DarkPanel>
      <Card box={[652, 381.3, 546.7, 240]} bar="var(--teal)">
        <Box box={[24, 26.7, 498.7, 194.7]}>
          <Stack
            titleK="etterlevelse_tittel"
            itemsK="etterlevelse"
            titleColor="var(--teal)"
            gap={12}
            size={14}
          />
        </Box>
      </Card>
      <FooterNote />
    </>
  );
}

export function SlideTeknologi() {
  return (
    <>
      <Header titleSize={28} />
      <Img box={[90.9, 299.4, 185.4, 152.5]} src={`${MEDIA}/fabric.png`} alt="Microsoft Fabric" />
      <Img box={[487.6, 302.2, 304.9, 127.4]} src={`${MEDIA}/databricks.png`} alt="Databricks" />
      <Img box={[937.8, 346, 305.8, 73.2]} src={`${MEDIA}/snowflake.png`} alt="Snowflake" />
      <Img box={[73.4, 556.7, 220.4, 124]} src={`${MEDIA}/azure.png`} alt="Microsoft Azure" />
      <Img box={[389.4, 544.2, 264.9, 149]} src={`${MEDIA}/delta-lake.png`} alt="Delta Lake" />
      <Img box={[743.8, 590.9, 136.2, 51.8]} src={`${MEDIA}/dbt.png`} alt="dbt" />
      <Img box={[958.2, 538.4, 285.3, 160.5]} src={`${MEDIA}/powerbi.png`} alt="Power BI" />
    </>
  );
}
