import type { ReactNode } from "react";
import { Box, ChapterSlide, Reveal, pt, useRevealStyle } from "../parts";

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

function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <Box box={[66.7, 120, 900, 73.8]}>
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
    <ChapterSlide
      title="From positions to emissions"
      subtitle="MarTraf and MarU: the models that turn AIS points into knowledge"
      titleSize={54}
      showLogo={false}
    />
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
            Its predecessor, Havbase, did everything in one model. Now the ship
            registry, geography, traffic and emissions each have their own
            responsibility, and their own output others can build on.
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
      <SlideTitle>Follow one ship</SlideTitle>
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
            Without the phases, everything is just “a ship”. With them, we know
            what the ship was doing at every single point. And that's the
            difference between noise and knowledge.
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
      <SlideTitle>The propeller law</SlideTitle>
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
    "Geographic enrichment: ports, coastline, anchoring areas, oil installations",
    "Operational phase: eleven phases, like cruising, maneuvering, at berth, anchoring, fishing, dynamic positioning",
    "Voyage segments: continuous sequences, never shorter than five minutes",
    "Complete voyages: port to port, handling gaps in the signal",
    "Traffic type: domestic, to and from abroad, transit",
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
    "Full resolution, no downsampling. Downsample first, and you risk keeping the noise and throwing away valid data",
    "H3 indexing on Databricks makes spatial joins fast. At resolution 8, “one cell away” is about 1,100 meters",
    "The loss of precision is a deliberate choice: the model only needs to know inside or outside, not the exact distance",
  ];
  return (
    <>
      <SlideTitle>The choices that make it possible</SlideTitle>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 260 + i * 120, 1080, 100]}
          lineH={88}
          size={20}
          text={text}
        />
      ))}
    </>
  );
}

/* Maritim utslippsmodell – MarU */
export function SlideMarU() {
  const items = [
    "Bottom-up, following IMO's fourth greenhouse gas study and ICCT methodology. Python and PySpark, open source.",
    "Main engine from the propeller law. Auxiliary engines and boilers per operational phase — that's why we needed the phases.",
    "Around 330 input variables: emission factors, low-load adjustments, sulfur limits per zone, GWP factors",
    "A ship registry merged from four sources, with versioning of everything that changes",
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
    "The ship registries are full of holes, especially for the small vessels",
    "Median values per ship type and length interval cover the easy cases",
    "Neural nets estimate service speed, engine RPM and stroke type",
    "Around 70 percent were missing fuel type in 2022 and 2023. We fill it using IMO's method",
  ];
  return (
    <>
      <SlideTitle>ML as a data quality tool</SlideTitle>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 250 + i * 95, 1080, 82]}
          lineH={70}
          size={20}
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
            The model is open — you can read the whole calculation on GitHub
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
          The Norwegian Environment Agency plans to use the MarU numbers in the
          municipalities' climate accounts
        </div>
      </Box>
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
      <BarItem
        at={1}
        box={[86.6, 250, 1080, 100]}
        lineH={88}
        size={20}
        text="Emissions from shipping are traditionally calculated from how much fuel is sold in Norway"
      />
      <BarItem
        at={2}
        box={[86.6, 370, 1080, 100]}
        lineH={88}
        size={20}
        text="But ships bunker abroad and sail here. And bunker here and sail out. The numbers don't match Norwegian waters"
      />
      <BarItem
        at={3}
        box={[86.6, 490, 1080, 100]}
        lineH={88}
        size={20}
        text="MarU calculates from observed activity instead, and separates domestic traffic from transit"
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
            The time series starts in 2016. We built a lot of new base stations
            in 2015, and better coverage would have looked like rising emissions
          </div>
        </Box>
      </Reveal>
    </>
  );
}
