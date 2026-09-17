"use client";

import { Copy, useCopyCount, useHasCopy } from "@/components/Copy";
import { Box, pt } from "../parts";
import {
  Body,
  Caption,
  Card,
  DarkPanel,
  Header,
  Label,
  MUTED,
  Pill,
  RowLabel,
  WhyList,
} from "./ui";

function SourceCard({
  box,
  k,
  i,
}: {
  box: [number, number, number, number];
  k: string;
  i: number;
}) {
  return (
    <Card box={box}>
      <Box
        box={[21.4, 21.4, 34.7, 34.7]}
        style={{ background: "var(--teal)" }}
      />
      <Box
        box={[21.4, 58.7, 13.3, 5.3]}
        style={{ background: "var(--mint)" }}
      />
      <Box box={[69.4, 18.7, 197.3, 64]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label size={15}>
            <Copy k={k} i={i} field="tittel" />
          </Label>
          <Body size={14}>
            <Copy k={k} i={i} field="tekst" />
          </Body>
        </div>
      </Box>
    </Card>
  );
}

function Connector({
  box,
}: {
  box: [number, number, number, number];
}) {
  return (
    <Box
      box={box}
      style={{
        borderTop: "1.5px solid #A8907C",
      }}
    />
  );
}

export function SlideOversikt() {
  return (
    <>
      <Header titleSize={24} />
      <Box box={[53.3, 122.7, 285.3, 40]}>
        <Label size={14} color="var(--teal)">
          <Copy k="kilder_label" />
        </Label>
      </Box>
      <Box box={[984, 122.7, 242.7, 40]} style={{ textAlign: "right" }}>
        <Label size={14} color="var(--teal)">
          <Copy k="bruk_label" />
        </Label>
      </Box>

      <SourceCard box={[53.3, 181.3, 285.3, 96]} k="kilder" i={0} />
      <SourceCard box={[53.3, 293.3, 285.3, 96]} k="kilder" i={1} />
      <SourceCard box={[53.3, 405.3, 285.3, 96]} k="kilder" i={2} />
      <SourceCard box={[53.3, 517.3, 285.3, 96]} k="kilder" i={3} />

      <Connector box={[341.3, 228, 56, 1]} />
      <Connector box={[341.3, 340, 56, 1]} />
      <Connector box={[341.3, 452, 56, 1]} />
      <Connector box={[341.3, 564, 56, 1]} />

      <Box
        box={[400, 181.3, 480, 432]}
        style={{
          background: "var(--teal)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "61.4px 26.7px 26.7px",
        }}
      >
        <Copy
          k="platform_title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(32),
            color: "#fff",
            textAlign: "center",
          }}
        />
        <div
          style={{
            width: 66.7,
            height: 4,
            background: "var(--mint)",
            margin: "20px 0 20px",
          }}
        />
        <Copy
          k="platform_lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "#D8EDEA",
            textAlign: "center",
            marginBottom: 50,
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14.7,
            width: "100%",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "rgba(120, 232, 219, 0.18)",
                color: "var(--mint)",
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                letterSpacing: 0.6,
                height: 42.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Copy k="capabilities" i={i} />
            </div>
          ))}
        </div>
      </Box>

      <Connector box={[882.7, 228, 56, 1]} />
      <Connector box={[882.7, 340, 56, 1]} />
      <Connector box={[882.7, 452, 56, 1]} />
      <Connector box={[882.7, 564, 56, 1]} />

      <SourceCard box={[941.3, 181.3, 285.3, 96]} k="bruk" i={0} />
      <SourceCard box={[941.3, 293.3, 285.3, 96]} k="bruk" i={1} />
      <SourceCard box={[941.3, 405.3, 285.3, 96]} k="bruk" i={2} />
      <SourceCard box={[941.3, 517.3, 285.3, 96]} k="bruk" i={3} />

      {([53.3, 453.3, 853.3] as const).map((x, i) => (
        <Box
          key={i}
          box={[x, 640, 373.3, 48]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Label size={14} color="var(--burgundy)">
            <Copy k="layers" i={i} />
          </Label>
        </Box>
      ))}
    </>
  );
}

function CapabilityRow({
  y,
  bar,
  row,
  pillXs,
  left = 81.3,
}: {
  y: number;
  bar: string;
  row: number;
  pillXs: number[];
  left?: number;
}) {
  const hasCaption = useHasCopy(`rows.${row}.caption`);
  const h = hasCaption ? 116 : 77.3;
  return (
    <>
      <Card box={[left, y, 840, h]} bar={bar} barSide="left">
        <RowLabel box={[24, 0, 173.3, h]}>
          <Copy k="rows" i={row} field="label" />
        </RowLabel>
      </Card>
      {pillXs.map((x, i) => (
        <Pill key={i} box={[x, y + (hasCaption ? 13.4 : 16), 196, 45.3]}>
          <Copy path={`rows.${row}.pills.${i}`} />
        </Pill>
      ))}
      {hasCaption && (
        <Caption box={[left + 205.4, y + 66.7, 614.7, 37.3]}>
          <Copy k="rows" i={row} field="caption" />
        </Caption>
      )}
    </>
  );
}

export function SlideLagring() {
  const side = useCopyCount("side");
  return (
    <>
      <Header titleSize={24} />
      <DarkPanel box={[49.3, 224.9, 261.3, 357.3]}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          {Array.from({ length: side }, (_, i) => (
            <Body key={i} size={15} color="#fff">
              <Copy k="side" i={i} />
            </Body>
          ))}
        </div>
      </DarkPanel>
      <CapabilityRow
        y={224.9}
        left={358.7}
        bar="var(--burgundy)"
        row={0}
        pillXs={[564, 773.3, 982.7]}
      />
      <CapabilityRow
        y={365.8}
        left={358.7}
        bar="var(--teal)"
        row={1}
        pillXs={[564, 773.3, 982.7]}
      />
      <CapabilityRow
        y={504.9}
        left={358.7}
        bar="var(--teal)"
        row={2}
        pillXs={[564, 773.3, 982.7]}
      />
    </>
  );
}

export function SlideProsessering() {
  const side = useCopyCount("side");
  return (
    <>
      <Header titleSize={24} />
      <CapabilityRow
        y={189.3}
        bar="var(--burgundy)"
        row={0}
        pillXs={[286.7, 496, 705.3]}
      />
      <CapabilityRow
        y={316}
        bar="var(--teal)"
        row={1}
        pillXs={[286.7, 496, 705.3]}
      />
      <CapabilityRow
        y={442.7}
        bar="var(--teal)"
        row={2}
        pillXs={[286.7, 496, 705.3]}
      />
      <DarkPanel box={[937.3, 189.3, 261.3, 496]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 200 }}>
          {Array.from({ length: side }, (_, i) => (
            <Body key={i} size={14} color="#fff">
              <Copy k="side" i={i} />
            </Body>
          ))}
        </div>
      </DarkPanel>
    </>
  );
}

export function SlidePublisering() {
  const kanaler = useCopyCount("kanaler");
  const statistikk = useCopyCount("statistikk");
  return (
    <>
      <Header titleSize={24} />
      <WhyList box={[58.4, 185.9, 320, 496]} />
      <Card box={[405.8, 185.3, 840, 263.1]} bar="var(--teal)" barSide="left">
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: 18,
            padding: "36px 28px 24px 28px",
          }}
        >
          <div
            style={{
              width: 130,
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              fontWeight: 700,
              letterSpacing: 0.4,
              color: "var(--burgundy)",
            }}
          >
            <Copy k="kanaler_label" />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {Array.from({ length: kanaler }, (_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--cream)",
                    minHeight: 45,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 10px",
                    fontFamily: "var(--font-sans)",
                    fontSize: pt(14),
                    color: "var(--burgundy)",
                    textAlign: "center",
                  }}
                >
                  <Copy k="kanaler" i={i} />
                </div>
              ))}
            </div>
            <Copy
              k="kanaler_caption"
              as="div"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                color: MUTED,
              }}
            />
          </div>
        </div>
      </Card>
      <Card box={[405.8, 460.4, 840, 220.9]} bar="var(--teal)" barSide="left">
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: 18,
            padding: "36px 28px 24px 28px",
          }}
        >
          <div
            style={{
              width: 130,
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              fontWeight: 700,
              letterSpacing: 0.4,
              color: "var(--burgundy)",
            }}
          >
            <Copy k="statistikk_label" />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {Array.from({ length: statistikk }, (_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--cream)",
                    minHeight: 45,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 10px",
                    fontFamily: "var(--font-sans)",
                    fontSize: pt(14),
                    color: "var(--burgundy)",
                    textAlign: "center",
                  }}
                >
                  <Copy k="statistikk" i={i} />
                </div>
              ))}
            </div>
            <Copy
              k="statistikk_caption"
              as="div"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                color: MUTED,
              }}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export function SlideStyring() {
  return (
    <>
      <Header titleSize={24} />
      <CapabilityRow
        y={189.3}
        bar="var(--burgundy)"
        row={0}
        pillXs={[286.7, 496, 705.3]}
      />
      <CapabilityRow
        y={316}
        bar="var(--teal)"
        row={1}
        pillXs={[286.7, 496, 705.3]}
      />
      <CapabilityRow
        y={442.7}
        bar="var(--red-deep)"
        row={2}
        pillXs={[286.7, 496, 705.3]}
      />
      <CapabilityRow
        y={569.3}
        bar="var(--teal)"
        row={3}
        pillXs={[286.7, 496, 705.3]}
      />
      <WhyList box={[937.3, 189.3, 261.3, 496]} />
    </>
  );
}
