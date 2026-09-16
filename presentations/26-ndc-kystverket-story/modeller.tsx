import type { ReactNode } from "react";
import { Box, BulletItem, BulletList, ChapterSlide, Reveal, Video, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";
import {
  Bunkring,
  Containerskip,
  HexHierarki,
  Propell,
  Registerhull,
  RisikoSektorer,
  Seilas,
  Soyler,
  SporTilUtslipp,
} from "@/components/figures/strek";

function SlideTitle({
  children,
  width = 1140,
  height = 70,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <Box box={[66.7, 70, width, height]}>
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

/* Kapittel: Produktene oppå strømmen */
export function SlideModeller() {
  return (
    <>
      <Box box={[0, 430, 1280, 290]}>
        <Containerskip />
      </Box>
      <ChapterSlide
        title={
          <>
            What products have we built
            <br />
            on top of this?
          </>
        }
        titleSize={54}
        showLogo={false}
      />
    </>
  );
}

/* Modulflyt: AIS → HAIS | MarTraf → MarU / KystRisk */
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
      <SlideTitle width={900}>One source, many data products</SlideTitle>
      {box(1, [36, 292, 210, 136], "Raw AIS data", "static and dynamic messages")}
      <Reveal at={2}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 0 172 H 40 V 64 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 64)}
          </svg>
        </Box>
      </Reveal>
      {box(2, [350, 188, 250, 128], "HAIS", "historical extracts on demand")}
      <Reveal at={3}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 40 172 V 268 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 268)}
          </svg>
        </Box>
      </Reveal>
      {box(3, [350, 392, 250, 128], "MarTraf", "the traffic product – cleans and enriches")}
      <Reveal at={4}>
        <Box box={[600, 328, 160, 256]}>
          <svg width="160" height="256" viewBox="0 0 160 256" fill="none" aria-hidden>
            <path d="M 0 128 H 70 V 58 H 148" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(148, 58)}
          </svg>
        </Box>
      </Reveal>
      <Reveal at={5}>
        <Box box={[600, 328, 160, 256]}>
          <svg width="160" height="256" viewBox="0 0 160 256" fill="none" aria-hidden>
            <path d="M 70 58 V 202 H 148" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(148, 202)}
          </svg>
        </Box>
      </Reveal>
      {box(4, [760, 330, 480, 112], "MarU", "emissions – energy and climate accounts")}
      {box(5, [760, 474, 480, 112], "KystRisk", "accident risk – collisions and groundings")}
    </>
  );
}

/* HAIS – historisk uttrekk på bestilling */
export function SlideHais() {
  const steg = (at: number, x: number, tittel: string, sub: string) => (
    <Reveal at={at}>
      <Box
        box={[x, 500, 280, 118]}
        style={{
          background: "var(--teal)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: 14,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(18),
            color: "var(--cream)",
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(12),
            lineHeight: 1.3,
            color: "var(--mint)",
          }}
        >
          {sub}
        </div>
      </Box>
    </Reveal>
  );

  const pil = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 528, 36, 60]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
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
      <SlideTitle width={760}>HAIS: historical extracts on demand</SlideTitle>
      <Box
        box={[860, 78, 354, 48]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <a
          href="https://hais.kystverket.no/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "var(--red)",
          }}
        >
          hais.kystverket.no
        </a>
      </Box>
      <Box
        box={[66, 156, 1148, 326]}
        style={{
          overflow: "hidden",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 8px 28px rgba(45, 20, 30, 0.12)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/hais.png`}
          alt="HAIS – order historical AIS extracts on hais.kystverket.no"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </Box>
      {steg(
        1,
        90,
        "Request",
        "time range, area (WKT), ship type, or MMSI",
      )}
      {pil(2, 384)}
      {steg(2, 434, "Extract job", "reads through the history and filters")}
      {pil(3, 728)}
      {steg(3, 778, "Delivery", "GeoParquet or CSV by email")}
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
      <SlideTitle width={760}>MarTraf – Maritime traffic model</SlideTitle>
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
          Follow one ship. 3,800 AIS points become one voyage, port to port
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

/* Propellloven: AIS-fart → skipstype → utslipp */
export function SlidePropellloven() {
  const steg: { tittel: string; body: string }[] = [
    {
      tittel: "Two AIS points give us the speed",
      body: "Distance over time. That's how fast the ship is going.",
    },
    {
      tittel: "We know what kind of ship it is",
      body: "The registry. Type, size, how it was built to sail.",
    },
    {
      tittel: "Then we estimate what it burned",
      body: "At this speed. Double the speed, eight times the power.",
    },
  ];
  return (
    <>
      <SlideTitle>MarU – maritime Emissions model</SlideTitle>
      <Box box={[880, 200, 360, 360]}>
        <Propell />
      </Box>
      {steg.map(({ tittel, body }, i) => (
        <Reveal key={tittel} at={i + 1}>
          <Box
            box={[72.4, 188 + i * 128, 760, 112]}
            style={{ display: "flex", gap: 22, alignItems: "flex-start" }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                lineHeight: 1,
                color: "var(--red)",
                width: 36,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: pt(22),
                  lineHeight: 1.25,
                  color: "var(--burgundy-2)",
                }}
              >
                {tittel}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(16),
                  lineHeight: 1.35,
                  color: "var(--burgundy-2)",
                }}
              >
                {body}
              </div>
            </div>
          </Box>
        </Reveal>
      ))}
      <Reveal at={4}>
        <Box box={[72.4, 590, 1100, 70]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            Every AIS point becomes an emissions calculation.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Romlig analyse i denne skalaen: contains-within og nærhet */
export function SlideMathOpt() {
  const kort = (
    at: number,
    x: number,
    kicker: string,
    tittel: string,
    tekst: string,
  ) => (
    <Reveal at={at}>
      <Box
        box={[x, 196, 520, 220]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 14,
          padding: "30px 34px",
        }}
      >
        <span
          style={{
            background: "var(--teal)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(11),
            letterSpacing: 1.5,
          }}
        >
          {kicker}
        </span>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.4,
            color: "var(--burgundy)",
          }}
        >
          {tekst}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>Mathematical optimizations</SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Spatial analysis keeps asking two questions.
        </div>
      </Box>
      {kort(
        0,
        80,
        "CONTAINS",
        "Is this point inside this area?",
        "A port. A fish farm. The economic zone.",
      )}
      {kort(
        0,
        680,
        "NEAR",
        "Which points sit close to each other?",
        "Near shore. Near a platform. Near our ship.",
      )}
      <Reveal at={1}>
        <Box
          box={[72.4, 450, 1136, 70]}
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
              lineHeight: 1.45,
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            Over billions of points, that becomes every point against every other
            point.
          </div>
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box
          box={[72.4, 540, 1136, 80]}
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
              lineHeight: 1.45,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            So we group the points into hexes. Uber&apos;s H3.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* H3: hexer inni hexer, unike id-er, oppløsninger ned til ~1 m */
export function SlideH3Hexes() {
  return (
    <>
      <SlideTitle>Hexes within hexes</SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Uber&apos;s H3. Every hex has a unique id.
        </div>
      </Box>
      <Box box={[80, 196, 1120, 360]}>
        <HexHierarki />
      </Box>
      <Reveal at={1}>
        <Box
          box={[72.4, 570, 1136, 70]}
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
              lineHeight: 1.45,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Sixteen resolutions. From huge hexes down to about one metre.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hvorfor hex skalerer: join på et tall, ikke et polygon */
export function SlideHexJoin() {
  const kort = (
    at: number,
    x: number,
    kicker: string,
    tittel: string,
    punkter: string[],
  ) => (
    <Reveal at={at}>
      <Box
        box={[x, 168, 520, 300]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 14,
          padding: "30px 34px",
        }}
      >
        <span
          style={{
            background: "var(--teal)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(11),
            letterSpacing: 1.5,
          }}
        >
          {kicker}
        </span>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          {tittel}
        </div>
        <div style={{ marginTop: 22, display: "grid", gap: 18 }}>
          {punkter.map((p) => (
            <BulletItem key={p} size={16} color="var(--burgundy)">
              {p}
            </BulletItem>
          ))}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>A join on a number</SlideTitle>
      {kort(0, 80, "GEOMETRY", "Point in polygon", [
        "Math on every row",
        "Fine for a thousand points",
      ])}
      {kort(1, 680, "H3", "A BIGINT already on the table", [
        "A hash join. Then you can prune",
        "Fine for a hundred million",
      ])}
      <Reveal at={1}>
        <Box
          box={[72.4, 490, 1136, 40]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(17),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            MarTraf, MarU, KystRisk.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Ett skip på H3-rutenettet, hele lerretet */
export function SlideH3Ship() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/h3-ship.mp4`}
        fit="contain"
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
    "Python and PySpark, computed on Databricks",
    "Main engine from the propeller law",
    "Around 330 input variables",
    "One ship registry",
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
        box={[72.4, 250, 640, 380]}
        fromStep={1}
        size={20}
        gap={26}
        items={items}
      />
      <Box box={[740, 240, 440, 178]}>
        <SporTilUtslipp />
      </Box>
      <SourceLink href="https://www.kystverket.no/klima-og-barekraft/maru/" />
    </>
  );
}

/* MarU – ML for å fylle hull i registerdata */
export function SlideMarUHull() {
  const items = [
    "The ship register we need to estimate emissions is full of holes",
    "Medians cover the easy cases",
    "Neural nets for speed, RPM, stroke",
    "70% missing fuel type. We fill it.",
  ];
  return (
    <>
      <SlideTitle height={90}>
        Filling the missing ship register data with ML
      </SlideTitle>
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
    { text: "Domestic, international, transit", box: [628, 444, 590, 78] },
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
          "MarU uses observed activity.",
        ]}
      />
    </>
  );
}

/* Risikomodell – KystRisk */
export function SlideKystRisk() {
  return (
    <>
      <SlideTitle>The maritime risk model – KystRisk</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Same voyages. A risk score. Every time sample.
        </div>
      </Box>
      <BulletList
        box={[72.4, 250, 1100, 300]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          "Each ship gets a score at every AIS point",
          "Then we find the fjords where the risk stays too high",
          "Redraw coastal maps. Give or deny ships permission to sail.",
        ]}
      />
      <Reveal at={4}>
        <Box box={[86.6, 620, 1080, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            Still in development. We expect to publish it by the end of the year.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* TTI: tid til inntreff per sektor, risiko 0–1 */
export function SlideKystRiskTti() {
  return (
    <>
      <Box box={[66.7, 48, 1140, 130]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(34),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          Kystrisk: What&apos;s the probability of impact?
          <br />
          If you keep going, how long until you hit?
        </div>
      </Box>
      <Box box={[72.4, 186, 720, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          TTI. Time to impact. One number per sector.
        </div>
      </Box>
      <Box box={[40, 250, 700, 430]}>
        <RisikoSektorer />
      </Box>
      <Reveal at={1}>
        <Box box={[760, 280, 460, 320]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(32),
              lineHeight: 1.25,
              color: "var(--burgundy-2)",
            }}
          >
            Risk is 0 to 1.
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.45,
              color: "var(--burgundy)",
            }}
          >
            0 is infinitely small.
            <br />
            Based on the heading you have now.
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.45,
              color: "var(--red)",
            }}
          >
            High TTI, and the risk fades toward zero.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
