import type { ReactNode } from "react";
import { Box, BulletList, ChapterSlide, Reveal, Video, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";
import {
  Bunkring,
  HexRing,
  Propell,
  Registerhull,
  Seilas,
  Soyler,
  SporTilUtslipp,
} from "@/components/figures/strek";

function SlideTitle({ children, width = 1140 }: { children: ReactNode; width?: number }) {
  return (
    <Box box={[66.7, 70, width, 70]}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(34),
          lineHeight: 1.15,
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

/* Modulflyt: AIS → MarTraf → MarU / KystRisk */
export function SlideModellFlyt() {
  const box = (
    at: number,
    frame: [number, number, number, number],
    title: string,
    sub: string,
  ) => (
    <Reveal at={at}>
      <Box
        box={frame}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
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

  const arrowHead = (x: number, y: number) => (
    <path d={`M ${x - 10} ${y - 6} L ${x} ${y} L ${x - 10} ${y + 6}`} stroke="var(--red)" strokeWidth={2.5} fill="none" />
  );

  return (
    <>
      <SlideTitle width={900}>One source, many models</SlideTitle>
      {box(1, [52, 306, 232, 136], "Raw AIS data", "static and dynamic messages")}
      <Reveal at={2}>
        <Box
          box={[284, 344, 64, 60]}
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
      {box(2, [348, 306, 232, 136], "MarTraf", "the traffic model – cleans and enriches")}
      <Reveal at={3}>
        <Box box={[580, 220, 180, 316]}>
          <svg width="180" height="316" viewBox="0 0 180 316" fill="none" aria-hidden>
            <path d="M 0 154 H 90 V 78 H 168" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(168, 78)}
          </svg>
        </Box>
      </Reveal>
      <Reveal at={4}>
        <Box box={[580, 220, 180, 316]}>
          <svg width="180" height="316" viewBox="0 0 180 316" fill="none" aria-hidden>
            <path d="M 90 78 V 230 H 168" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(168, 230)}
          </svg>
        </Box>
      </Reveal>
      {box(3, [760, 242, 460, 112], "MarU", "emissions – energy and climate accounts")}
      {box(4, [760, 394, 460, 112], "KystRisk", "accident risk – collisions and groundings")}
      <Reveal at={5}>
        <Box
          box={[52, 600, 1176, 50]}
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
            One source. Many models. Each with its own output others can build on.
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
        box={[140, 372, 1000, 3]}
        style={{ background: "var(--cream-dark)", ...linje }}
      />
      {faser.map(([fase, sted, fart], i) => {
        const x = 140 + i * 250;
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
            <Box box={[x - 100, 270, 200, 70]}>
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
            <Box box={[x - 100, 410, 200, 80]}>
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

/* Ett skip fra HAIS: Asuka, hele lerretet */
export function SlideAsukaHais() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/asuka-hais.mp4`}
        fit="contain"
      />
    </>
  );
}

/* Punchline: skipet heter Asuka. Wikipedia-artikkelen også. */
export function SlideAsukaHvem() {
  return (
    <>
      <Box box={[66.7, 36, 1146, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            color: "var(--burgundy-2)",
          }}
        >
          Who is Asuka?
        </div>
      </Box>
      <Box
        box={[48, 124, 740, 556]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/asuka-wikipedia.png`}
          alt="Wikipedia article: Asuka (wrestler)"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top left",
          }}
        />
      </Box>
      <Box
        box={[808, 124, 424, 556]}
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/asuka.jpg`}
          alt="Asuka"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </>
  );
}

/* Propellloven: derfor blir hvert punkt en beregning */
export function SlidePropellloven() {
  return (
    <>
      <SlideTitle>The propeller law</SlideTitle>
      <Box box={[72.4, 196, 760, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          load = (speed / service speed)
          <sup style={{ fontSize: "0.8em" }}>3</sup>
        </div>
      </Box>
      <Box box={[880, 200, 360, 360]}>
        <Propell />
      </Box>
      <BulletList
        box={[72.4, 260, 760, 380]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          "Double the speed, and you need eight times the power.",
          "Multiply by installed power, 0.85, and elapsed time.",
          "Every AIS point becomes an emissions calculation.",
        ]}
      />
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
      <BulletList
        box={[72.4, 250, 1100, 400]}
        fromStep={1}
        size={20}
        gap={22}
        items={steps}
      />
      <SourceLink href="https://github.com/Kystverket/maru" />
    </>
  );
}

/* MarTraf – de tekniske valgene */
export function SlideMarTrafValg() {
  const items = [
    "H3 at resolution 8. One cell ≈ 1,100 m",
    "Inside or outside. Not the exact distance.",
  ];
  return (
    <>
      <SlideTitle>The choices that make it possible</SlideTitle>
      <Reveal at={1}>
        <Box box={[900, 160, 300, 140]}>
          <HexRing />
        </Box>
      </Reveal>
      <BulletList
        box={[72.4, 200, 780, 280]}
        fromStep={1}
        size={20}
        gap={36}
        items={items}
      />
    </>
  );
}

/* MarTraf på kartet: heksagonene, hele lerretet */
export function SlideMarTrafVideo() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/martraf-video.mov`}
        fit="contain"
      />
    </>
  );
}

/* Maritim utslippsmodell – MarU */
export function SlideMarU() {
  const items = [
    "Bottom-up. IMO and ICCT. Open source.",
    "Main engine from the propeller law",
    "Around 330 input variables",
    "One ship registry, five sources, versioned",
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
      <BulletList
        box={[72.4, 250, 1100, 380]}
        fromStep={1}
        size={20}
        gap={26}
        items={items}
      />
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
      <BulletList
        box={[72.4, 200, 780, 400]}
        fromStep={1}
        size={20}
        gap={28}
        items={items}
      />
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

function FactRow({
  at,
  box,
  last,
  children,
}: {
  at: number;
  box: [number, number, number, number];
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal at={at}>
      <Box
        box={box}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.25,
            color: "var(--burgundy-2)",
          }}
        >
          {children}
        </div>
        {!last && (
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: 1.5,
              background: "var(--divider)",
            }}
          />
        )}
      </Box>
    </Reveal>
  );
}

/* Hva kommer ut av MarU */
export function SlideMarUUt() {
  const facts: { text: ReactNode; box: [number, number, number, number] }[] = [
    {
      text: (
        <>
          CO₂, methane, NOx, SOx,
          <br />
          particulate matter
        </>
      ),
      box: [628, 176, 590, 112],
    },
    { text: "14 ship types, 9 sizes", box: [628, 288, 590, 78] },
    { text: "Municipality, county, sea area", box: [628, 366, 590, 78] },
    { text: "Energy demand and shore power", box: [628, 444, 590, 78] },
    { text: "Domestic, international, transit", box: [628, 522, 590, 78] },
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
          <Soyler at={1} />
        </Box>
      </Reveal>
      {facts.map(({ text, box }, i) => (
        <FactRow
          key={i}
          at={i + 1}
          box={box}
          last={i === facts.length - 1}
        >
          {text}
        </FactRow>
      ))}
    </>
  );
}

/* Hvorfor observert aktivitet slår salgstall */
export function SlideMarUHvorfor() {
  return (
    <>
      <SlideTitle>How was it done earlier?</SlideTitle>
      <Reveal at={2}>
        <Box box={[880, 210, 360, 260]}>
          <Bunkring />
        </Box>
      </Reveal>
      <BulletList
        box={[72.4, 200, 760, 380]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          "Traditionally: how much fuel was sold in Norway",
          "Ships bunker abroad and sail here. The numbers don't match.",
          "MarU uses observed activity. Domestic vs transit.",
        ]}
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
