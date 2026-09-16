import type { ReactNode } from "react";
import { Box, BulletItem, ChapterSlide, MilesLogo, QuotePage, pt } from "../../parts";
import {
  TidslinjeFigur,
  RelasjonsFigur,
  VarehusFigur,
  RegnestykkeFigur,
  SjoFigur,
  SkyFigur,
  KonvergensFigur,
} from "./figurer";

/* ---------- Felles byggeklosser for denne presentasjonen ---------- */

/** Figur-slide: liten kicker + serif-tittel øverst, SVG-figur under */
function FigurSlide({
  kicker,
  tittel,
  children,
}: {
  kicker?: string;
  tittel?: string;
  children: ReactNode;
}) {
  return (
    <>
      <MilesLogo />
      {kicker && (
        <Box box={[48, 34, 800, 30]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: pt(12),
              letterSpacing: 2,
              color: "var(--red)",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </Box>
      )}
      {tittel && (
        <Box box={[48, 60, 1000, 56]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(28),
              color: "var(--burgundy)",
            }}
          >
            {tittel}
          </div>
        </Box>
      )}
      <Box box={[20, tittel ? 116 : 60, 1240, tittel ? 590 : 640]}>{children}</Box>
    </>
  );
}

/** Speil-slide: hva fasen løste – og det nye problemet den skapte */
function SpeilSlide({
  kicker,
  loest,
  nytt,
  bunn,
}: {
  kicker: string;
  loest: string[];
  nytt: string[];
  bunn?: string;
}) {
  const kolonne = (
    x: number,
    farge: string,
    tittel: string,
    punkter: string[],
  ) => (
    <Box
      box={[x, 190, 560, 400]}
      style={{
        background: "#fff",
        border: "1.5px solid var(--cream-dark)",
        borderRadius: 20,
        padding: "34px 38px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(22),
          color: farge,
          marginBottom: 26,
        }}
      >
        {tittel}
      </div>
      {punkter.map((p) => (
        <div key={p} style={{ marginBottom: 18 }}>
          <BulletItem size={15} color="var(--burgundy)" bar={farge}>
            {p}
          </BulletItem>
        </div>
      ))}
    </Box>
  );

  return (
    <>
      <MilesLogo />
      <Box box={[48, 44, 900, 34]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(12),
            letterSpacing: 2,
            color: "var(--red)",
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
      </Box>
      <Box box={[48, 80, 1100, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(32),
            color: "var(--burgundy)",
          }}
        >
          What it solved – and the new problem
        </div>
      </Box>
      {kolonne(60, "var(--teal)", "What it solved", loest)}
      {kolonne(660, "var(--red)", "The new problem", nytt)}
      {bunn && (
        <Box
          box={[60, 616, 1160, 60]}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(15),
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            {bunn}
          </div>
        </Box>
      )}
    </>
  );
}

/* ================= Intro ================= */

/* 1 – Forside */
export function SlideForside() {
  return (
    <ChapterSlide
      title="The story of the data platform"
      subtitle="50 years of the same problem: turning data into decisions"
      titleSize={60}
      showLogo={false}
    />
  );
}

/* 2 – Tidslinjen */
export function SlideTidslinje() {
  return (
    <FigurSlide tittel="Five phases – one problem">
      <TidslinjeFigur />
    </FigurSlide>
  );
}

/* ================= 1970 · Databasen ================= */

export function SlideRelasjonsmodellen() {
  return (
    <FigurSlide kicker="1970 · The database" tittel="Codd: separate the question from the storage">
      <RelasjonsFigur />
    </FigurSlide>
  );
}

/* 7 – Speil: databasen */
export function SlideDatabasenSpeil() {
  return (
    <SpeilSlide
      kicker="1970 · The database"
      loest={[
        "One shared, consistent memory for the business",
        "Transactions with guarantees – operations could trust the data",
        "Questions without programming navigation: SQL",
      ]}
      nytt={[
        "Built for operations, not analysis – heavy queries brought the checkout to its knees",
        "One system per function: the truth spread out across many databases again",
        "Management still couldn't get answers across systems",
      ]}
      bunn="Memory isn't the same as insight."
    />
  );
}

/* ================= 1988 · Datavarehuset ================= */

export function SlideVarehuset() {
  return (
    <FigurSlide kicker="1988 · The data warehouse" tittel="One integrated warehouse – separate from operations">
      <VarehusFigur />
    </FigurSlide>
  );
}

export function SlideVarehusetSpeil() {
  return (
    <SpeilSlide
      kicker="1988 · The data warehouse"
      loest={[
        "One integrated truth across the systems",
        "History: development over time, not just the current snapshot",
        "Analysis without threatening operations – decisions based on facts",
      ]}
      nytt={[
        "Expensive: specialized hardware and long projects",
        "Slow to change: schema first, a new source took months – IT became the bottleneck",
        "Only structured data: rows and columns, not logs, text, and images",
      ]}
      bunn="And then came the internet – and made all three problems acute."
    />
  );
}

/* ================= 2006 · Big data ================= */

export function SlideRegnestykket() {
  return (
    <FigurSlide kicker="2006 · Big data" tittel="Google's answer: distribute everything">
      <RegnestykkeFigur />
    </FigurSlide>
  );
}

/* 14 – Datasjøen */
export function SlideDatasjoen() {
  return (
    <FigurSlide kicker="2010 · The data lake" tittel="Store everything – raw">
      <SjoFigur />
    </FigurSlide>
  );
}

/* 15 – Speil: sjøen */
export function SlideSjoenSpeil() {
  return (
    <SpeilSlide
      kicker="2006–2010 · Big data and the data lake"
      loest={[
        "The scale: store and process everything, cheaply, on ordinary hardware",
        "All formats – logs, text, images, clickstreams",
        "Machine learning got the raw data it needed",
      ]}
      nytt={[
        "The data swamp: without a catalog, ownership, and metadata, the lake became a landfill",
        "Complexity: Hadoop needed specialists – the SQL people were left outside",
        "Two parallel worlds: warehouse for BI, lake for ML – duplicate copies, double the bill",
      ]}
      bunn="A lake becomes a swamp when findability fails – not when data quality does."
    />
  );
}

/* ================= 2012 · Skyen ================= */

export function SlideSkyen() {
  return (
    <FigurSlide kicker="2012 · The cloud" tittel="Separate storage and compute">
      <SkyFigur />
    </FigurSlide>
  );
}

/* 18 – Konvergensen */
export function SlideLakehouse() {
  return (
    <FigurSlide kicker="2020 · The lakehouse" tittel="Two tracks meet – and become the data platform">
      <KonvergensFigur />
    </FigurSlide>
  );
}

/* ================= Hvorfor vi er der vi er ================= */

const MEDIA = "/media/26-ndc-kystverket";

/* Portrait: Tim Berners-Lee 2023, Dr. Frank Gaeth, CC BY 4.0, Wikimedia Commons */
export function SlideAvslutning() {
  return (
    <QuotePage
      quote={
        <>
          &ldquo;Data is a precious thing and will last longer than the systems
          themselves.&rdquo;
        </>
      }
      attribution="— Tim Berners-Lee"
      imageSrc={`${MEDIA}/tim-berners-lee.jpg`}
      imageAlt="Tim Berners-Lee"
      caption="Tim Berners-Lee. Inventor of the World Wide Web."
    />
  );
}
