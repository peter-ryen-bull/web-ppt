import type { ReactNode } from "react";
import { Box, BulletItem, BulletList, ChapterSlide, Reveal, Video, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";
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
} from "./figurer/strek";

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
            Hvilke produkter har vi bygget
            <br />
            oppå dette?
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
      <SlideTitle width={900}>Én kilde, mange dataprodukter</SlideTitle>
      {box(1, [36, 292, 210, 136], "AIS-rådata", "statiske og dynamiske meldinger")}
      <Reveal at={2}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 0 172 H 40 V 64 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 64)}
          </svg>
        </Box>
      </Reveal>
      {box(2, [350, 188, 250, 128], "HAIS", "historiske uttrekk på bestilling")}
      <Reveal at={3}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 40 172 V 268 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 268)}
          </svg>
        </Box>
      </Reveal>
      {box(3, [350, 392, 250, 128], "MarTraf", "trafikkproduktet – vasker og beriker")}
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
      {box(4, [760, 330, 480, 112], "MarU", "utslipp – energi og klimaregnskap")}
      {box(5, [760, 474, 480, 112], "KystRisk", "ulykkesrisiko – kollisjoner og grunnstøtinger")}
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
      <SlideTitle width={760}>HAIS: historiske uttrekk på bestilling</SlideTitle>
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
          alt="HAIS – bestill historiske AIS-uttrekk på hais.kystverket.no"
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
        "Bestilling",
        "tidsrom, område (WKT), skipstype eller MMSI",
      )}
      {pil(2, 384)}
      {steg(2, 434, "Uttrekksjobb", "leser gjennom historikken og filtrerer")}
      {pil(3, 728)}
      {steg(3, 778, "Levering", "GeoParquet eller CSV på e-post")}
    </>
  );
}

/* Følg ett skip: fra rå punkter til en seilas med faser */
export function SlideFolgEttSkip() {
  const faser: [string, string, string][] = [
    ["Ved kai", "Bergen, 22:40", "0 knop"],
    ["Manøvrering", "ut Byfjorden", "≤ 3 knop"],
    ["Cruising", "forbi Stad, 03:14", "9 knop"],
    ["Ankring", "venter på kaiplass", "0,2 knop"],
    ["Ved kai", "Ålesund, 09:15", "0 knop"],
  ];
  const linje = useRevealStyle(1);
  return (
    <>
      <SlideTitle width={760}>MarTraf – Maritim trafikkmodell</SlideTitle>
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
          Følg ett skip. 3 800 AIS-punkter blir én seilas, havn til havn
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
            Fasene gjør støy til kunnskap.
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
          Hvem er Asuka?
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
          alt="Wikipedia-artikkel: Asuka (fribryter)"
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
      tittel: "To AIS-punkter gir oss farten",
      body: "Avstand delt på tid. Så fort går skipet.",
    },
    {
      tittel: "Vi vet hva slags skip det er",
      body: "Registeret. Type, størrelse, hvordan det er bygd for å seile.",
    },
    {
      tittel: "Så anslår vi hva det brente",
      body: "Ved denne farten. Dobler du farten, åttedobler du effektbehovet.",
    },
  ];
  return (
    <>
      <SlideTitle>MarU – Maritim utslippsmodell</SlideTitle>
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
            Hvert AIS-punkt blir en utslippsberegning.
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
      <SlideTitle>Matematiske optimaliseringer</SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Romlig analyse stiller alltid to spørsmål.
        </div>
      </Box>
      {kort(
        0,
        80,
        "INNENFOR",
        "Er dette punktet inni dette området?",
        "En havn. Et oppdrettsanlegg. Økonomisk sone.",
      )}
      {kort(
        0,
        680,
        "NÆR",
        "Hvilke punkter ligger nær hverandre?",
        "Nær land. Nær en plattform. Nær vårt skip.",
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
            Over milliarder av punkter blir det hvert punkt mot alle andre
            punkter.
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
            Så vi grupperer punktene i heksagoner. Ubers H3.
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
      <SlideTitle>Heksagoner inni heksagoner</SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Ubers H3. Hvert heksagon har en unik id.
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
            Seksten oppløsninger. Fra enorme heksagoner ned til rundt én meter.
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
      <SlideTitle>En join på et tall</SlideTitle>
      {kort(0, 80, "GEOMETRI", "Punkt i polygon", [
        "Matematikk på hver rad",
        "Greit for tusen punkter",
      ])}
      {kort(1, 680, "H3", "En BIGINT som alt ligger på tabellen", [
        "En hash join. Så kan du prune",
        "Greit for hundre millioner",
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
    "Python og PySpark, beregnet på Databricks",
    "Hovedmotor fra propellloven",
    "Rundt 330 inputvariabler",
    "Ett skipsregister",
  ];
  return (
    <>
      <SlideTitle>Maritim utslippsmodell – MarU</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Her møter volumet metoden
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
    "Skipsregisteret vi trenger for å anslå utslipp er fullt av hull",
    "Medianverdier dekker det enkleste",
    "Nevrale nett for servicefart, turtall og slagtype",
    "70 % mangler drivstofftype. Vi fyller det.",
  ];
  return (
    <>
      <SlideTitle height={90}>
        Fyller hullene i skipsregisteret med ML
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
            Modellen er åpen. github.com/Kystverket/maru
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
          CO₂, metan, NOx, SOx,
          <br />
          svevestøv
        </>
      ),
      box: [628, 176, 590, 112],
    },
    { text: "14 skipstyper, 9 størrelser", box: [628, 288, 590, 78] },
    { text: "Kommune, fylke, havområde", box: [628, 366, 590, 78] },
    { text: "Innenriks, utenriks, gjennomfart", box: [628, 444, 590, 78] },
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
          Hva kommer ut?
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
          Inn i kommunenes klimaregnskap
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
      <SlideTitle>Hvordan ble det gjort før?</SlideTitle>
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
          "Tradisjonelt: hvor mye drivstoff som ble solgt i Norge",
          "Skip bunkrer i utlandet og seiler her. Tallene stemmer ikke.",
          "MarU bruker observert aktivitet.",
        ]}
      />
    </>
  );
}

/* Risikomodell – KystRisk */
export function SlideKystRisk() {
  return (
    <>
      <SlideTitle>Maritim risikomodell – KystRisk</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Samme seilaser. En risikoscore. Hvert tidspunkt.
        </div>
      </Box>
      <BulletList
        box={[72.4, 250, 1100, 300]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          "Hvert skip får en score i hvert AIS-punkt",
          "Så finner vi fjordene der risikoen blir for høy",
          "Tegne kystkart på nytt. Gi eller nekte skip seilingstillatelse.",
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
            Fortsatt under utvikling. Vi regner med å publisere den før nyttår.
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
          KystRisk: Hva er sannsynligheten for å treffe?
          <br />
          Holder du kursen, hvor lenge til du treffer?
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
          TTI. Time to impact. Ett tall per sektor.
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
            Risiko er 0 til 1.
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
            0 er uendelig liten.
            <br />
            Basert på kursen du har nå.
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
            Høy TTI, og risikoen går mot null.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
