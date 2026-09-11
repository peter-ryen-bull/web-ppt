import type { ReactNode } from "react";
import { Box, ChapterSlide, Reveal, pt, useRevealStyle } from "../parts";
import {
  Bunkring,
  HexRing,
  Propell,
  Registerhull,
  Seilas,
  Soyler,
  SporTilUtslipp,
} from "@/components/figures/strek";

function BarItem({
  box,
  lineH,
  text,
  at,
  size = 22,
}: {
  box: [number, number, number, number];
  lineH: number;
  text: string;
  /** Klikk-steget der punktet dukker opp */
  at: number;
  size?: number;
}) {
  return (
    <Reveal at={at}>
      <Box
        box={[72.4, box[1] - 1.7, 3, lineH]}
        style={{ background: "var(--red)" }}
      />
      <Box box={box}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(size),
            lineHeight: 1.3,
            color: "var(--burgundy-2)",
          }}
        >
          {text}
        </div>
      </Box>
    </Reveal>
  );
}

function SlideTitle({ children, width = 780 }: { children: ReactNode; width?: number }) {
  return (
    <Box box={[66.7, 70, width, 90]}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(44),
          color: "var(--burgundy-2)",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

function SourceLink({ href, top = 662 }: { href: string; top?: number }) {
  return (
    <Box box={[72.4, top, 900, 32.3]}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(13),
          color: "#9A5068",
        }}
      >
        {href}
      </a>
    </Box>
  );
}

/* Kapittel: Modellene oppå strømmen */
export function SlideModeller() {
  return (
    <>
      <Box box={[430, 50, 420, 170]}>
        <SporTilUtslipp />
      </Box>
      <ChapterSlide
        title="From positions to emissions"
        subtitle="MarTraf and MarU: the models that turn AIS points into knowledge"
        titleSize={54}
        showLogo={false}
      />
    </>
  );
}

/* Modulflyt: AIS → MarTraf → MarU → statistikk */
export function SlideModellFlyt() {
  const step = (at: number, x: number, title: string, sub: string) => (
    <Reveal at={at}>
      <Box
        box={[x, 300, 260, 150]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 16,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(20),
            color: "var(--cream)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            lineHeight: 1.3,
            color: "var(--mint)",
          }}
        >
          {sub}
        </div>
      </Box>
    </Reveal>
  );

  const arrow = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 345, 40, 60]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--red)",
          }}
        >
          →
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>Four modules, not one model</SlideTitle>
      {step(1, 40, "Raw AIS data", "static and dynamic messages")}
      {arrow(2, 300)}
      {step(2, 340, "MarTraf", "the traffic model – cleans and enriches")}
      {arrow(3, 600)}
      {step(3, 640, "MarU", "the emissions model – energy and emissions")}
      {arrow(4, 900)}
      {step(4, 940, "Statistics and climate accounts", "municipality, county, sea area")}
      <Reveal at={5}>
        <Box
          box={[100, 520, 1080, 80]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Four modules. Each with its own output others can build on.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Følg ett skip: fra rå punkter til en seilas med faser */
export function SlideFolgEttSkip() {
  const faser: [string, string, string][] = [
    ["At berth", "Bergen, 22:40", "0 knots"],
    ["Maneuvering", "out of Byfjorden", "≤ 3 knots"],
    ["Cruising", "past Stad, 03:14", "9 knots"],
    ["Anchoring", "waiting for a berth", "0.2 knots"],
    ["At berth", "Ålesund, 09:15", "0 knots"],
  ];
  const linje = useRevealStyle(1);
  return (
    <>
      <SlideTitle width={760}>Follow one ship</SlideTitle>
      <Box box={[880, 36, 340, 120]}>
        <Seilas />
      </Box>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          3,800 AIS points become one voyage, port to port
        </div>
      </Box>
      <Box
        box={[110, 372, 1060, 3]}
        style={{ background: "var(--cream-dark)", ...linje }}
      />
      {faser.map(([fase, sted, fart], i) => {
        const x = 110 + i * 265;
        const aktiv = i === 2;
        return (
          <Reveal key={sted} at={i + 1}>
            <Box
              box={[x - 14, 358, 30, 30]}
              style={{
                borderRadius: "50%",
                background: aktiv ? "var(--red)" : "var(--teal)",
                border: "4px solid var(--cream)",
              }}
            />
            <Box box={[x - 100, 270, 230, 70]}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: pt(22),
                  color: aktiv ? "var(--red)" : "var(--burgundy)",
                  textAlign: "center",
                }}
              >
                {fase}
              </div>
            </Box>
            <Box box={[x - 100, 410, 230, 80]}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(15),
                  lineHeight: 1.4,
                  color: "var(--burgundy-2)",
                  textAlign: "center",
                }}
              >
                {sted}
                <br />
                <span style={{ color: "#9a5068" }}>{fart}</span>
              </div>
            </Box>
          </Reveal>
        );
      })}
      <Reveal at={6}>
        <Box box={[100, 560, 1080, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            The phases turn noise into knowledge.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Propellloven: derfor blir hvert punkt en beregning */
export function SlidePropellloven() {
  return (
    <>
      <SlideTitle width={760}>The propeller law</SlideTitle>
      <Box box={[960, 36, 260, 130]}>
        <Propell />
      </Box>
      <Box
        box={[90, 220, 1100, 110]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(46),
            color: "var(--burgundy)",
            whiteSpace: "nowrap",
          }}
        >
          load = (speed / service speed)
          <sup style={{ fontSize: pt(28), color: "var(--red)" }}>3</sup>
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[90, 345, 1100, 60]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(22),
              color: "var(--red)",
            }}
          >
            Double the speed, and you need eight times the power.
          </div>
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box
          box={[90, 430, 1100, 60]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(19),
              color: "var(--burgundy-2)",
            }}
          >
            × installed power × 0.85 × the time since the last AIS message
          </div>
        </Box>
      </Reveal>
      <Reveal at={3}>
        <Box
          box={[90, 530, 1100, 80]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(30),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            Every AIS point becomes an emissions calculation.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Maritim trafikkmodell – MarTraf */
export function SlideMarTraf() {
  const steps = [
    "Geographic enrichment",
    "Eleven operational phases",
    "Voyage segments, five minutes minimum",
    "Complete voyages, port to port",
    "Domestic, international, transit",
  ];
  return (
    <>
      <SlideTitle>The maritime traffic model – MarTraf</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          From raw positions to voyages you can analyze
        </div>
      </Box>
      {steps.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 268 + i * 78, 1080, 66]}
          lineH={54}
          size={20}
          text={text}
        />
      ))}
      <SourceLink href="https://github.com/Kystverket/maru" />
    </>
  );
}

/* MarTraf – de tekniske valgene */
export function SlideMarTrafValg() {
  const items = [
    "Full resolution. No downsampling.",
    "H3 at resolution 8. One cell ≈ 1,100 m",
    "Inside or outside. Not the exact distance.",
  ];
  return (
    <>
      <SlideTitle>The choices that make it possible</SlideTitle>
      <Reveal at={2}>
        <Box box={[900, 280, 300, 140]}>
          <HexRing />
        </Box>
      </Reveal>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 200 + i * 140, 780, 120]}
          lineH={108}
          size={19}
          text={text}
        />
      ))}
    </>
  );
}

/* Maritim utslippsmodell – MarU */
export function SlideMarU() {
  const items = [
    "Bottom-up. IMO and ICCT. Open source.",
    "Main engine from the propeller law",
    "Around 330 input variables",
    "One ship registry, four sources, versioned",
  ];
  return (
    <>
      <SlideTitle>The maritime emissions model – MarU</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          This is where the volume meets the method
        </div>
      </Box>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 268 + i * 90, 1080, 78]}
          lineH={66}
          size={20}
          text={text}
        />
      ))}
      <SourceLink href="https://www.kystverket.no/klima-og-barekraft/maru/" />
    </>
  );
}

/* MarU – ML for å fylle hull i registerdata */
export function SlideMarUHull() {
  const items = [
    "The registries are full of holes",
    "Medians cover the easy cases",
    "Neural nets for speed, RPM, stroke",
    "70% missing fuel type. We fill it.",
  ];
  return (
    <>
      <SlideTitle>ML as a data quality tool</SlideTitle>
      <Box box={[900, 200, 320, 282]}>
        <Registerhull />
      </Box>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 200 + i * 100, 780, 88]}
          lineH={76}
          size={19}
          text={text}
        />
      ))}
      <Reveal at={5}>
        <Box box={[86.6, 630, 1080, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            The model is open. github.com/Kystverket/maru
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hva kommer ut av MarU */
export function SlideMarUUt() {
  const facts = [
    "CO₂, methane, NOx, SOx, particulate matter",
    "14 ship types, 9 sizes",
    "Municipality, county, sea area",
    "Energy demand and shore power",
    "Domestic, international, transit",
  ];
  return (
    <>
      <Box box={[53.7, 258, 560, 220]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          What comes out?
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.4,
            color: "var(--red)",
          }}
        >
          Into the municipalities&apos; climate accounts
        </div>
      </Box>
      <Reveal at={1}>
        <Box box={[40, 480, 560, 180]}>
          <Soyler />
        </Box>
      </Reveal>
      {facts.map((f, i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[628.2, 201.9 + i * 77.5, 582, 66.4]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                color: "var(--burgundy-2)",
              }}
            >
              {f}
            </div>
            {i < facts.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 61,
                  width: 582,
                  height: 1.5,
                  background: "var(--divider)",
                }}
              />
            )}
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Hvorfor observert aktivitet slår salgstall */
export function SlideMarUHvorfor() {
  return (
    <>
      <SlideTitle>Why not just use sales numbers?</SlideTitle>
      <Reveal at={2}>
        <Box box={[880, 210, 360, 260]}>
          <Bunkring />
        </Box>
      </Reveal>
      <BarItem
        at={1}
        box={[86.6, 200, 760, 100]}
        lineH={88}
        size={19}
        text="Traditionally: how much fuel was sold in Norway"
      />
      <BarItem
        at={2}
        box={[86.6, 330, 760, 100]}
        lineH={88}
        size={19}
        text="Ships bunker abroad and sail here. The numbers don't match."
      />
      <BarItem
        at={3}
        box={[86.6, 460, 760, 100]}
        lineH={88}
        size={19}
        text="MarU uses observed activity. Domestic vs transit."
      />
      <Reveal at={4}>
        <Box box={[86.6, 620, 1080, 60]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            The time series starts in 2016. Better coverage is not more emissions.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
