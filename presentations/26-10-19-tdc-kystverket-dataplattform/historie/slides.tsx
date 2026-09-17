import type { ReactNode } from "react";
import { Box, BulletItem, ChapterSlide, QuotePage, pt } from "../../parts";
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
          Hva den løste – og det nye problemet
        </div>
      </Box>
      {kolonne(60, "var(--teal)", "Dette løste den", loest)}
      {kolonne(660, "var(--red)", "Det nye problemet", nytt)}
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
      title="Historien om dataplattformen"
      subtitle="50 år med samme problem: å gjøre data om til beslutninger"
      titleSize={60}
      showLogo={false}
    />
  );
}

/* 2 – Tidslinjen */
export function SlideTidslinje() {
  return (
    <FigurSlide tittel="Fem faser – ett problem">
      <TidslinjeFigur />
    </FigurSlide>
  );
}

/* ================= 1970 · Databasen ================= */

export function SlideRelasjonsmodellen() {
  return (
    <FigurSlide kicker="1970 · Databasen" tittel="Codd: skill spørsmålet fra lagringen">
      <RelasjonsFigur />
    </FigurSlide>
  );
}

/* 7 – Speil: databasen */
export function SlideDatabasenSpeil() {
  return (
    <SpeilSlide
      kicker="1970 · Databasen"
      loest={[
        "Én delt, konsistent hukommelse for virksomheten",
        "Transaksjoner med garantier – driften kunne stole på dataene",
        "Spørsmål uten å programmere navigasjon: SQL",
      ]}
      nytt={[
        "Bygget for drift, ikke analyse – tunge spørringer satte kassa på kne",
        "Ett system per funksjon: sannheten spredte seg igjen utover mange databaser",
        "Ledelsen fikk fortsatt ikke svar på tvers av systemene",
      ]}
    />
  );
}

/* ================= 1988 · Datavarehuset ================= */

export function SlideVarehuset() {
  return (
    <FigurSlide kicker="1988 · Datavarehuset" tittel="Ett integrert varehus – adskilt fra driften">
      <VarehusFigur />
    </FigurSlide>
  );
}

export function SlideVarehusetSpeil() {
  return (
    <SpeilSlide
      kicker="1988 · Datavarehuset"
      loest={[
        "Én integrert sannhet på tvers av systemene",
        "Historikk: utvikling over tid, ikke bare nå-bildet",
        "Analyse uten å true driften – beslutninger på fakta",
      ]}
      nytt={[
        "Dyrt: spesialisert maskinvare og lange prosjekter",
        "Tregt å endre: skjema først, ny kilde tok måneder – IT ble flaskehals",
        "Bare strukturerte data: rader og kolonner, ikke logger, tekst og bilder",
      ]}
      bunn="Og så kom internett – og gjorde alle tre problemene akutte."
    />
  );
}

/* ================= 2006 · Big data ================= */

export function SlideRegnestykket() {
  return (
    <FigurSlide kicker="2006 · Stordata" tittel="Googles svar: distribuer alt">
      <RegnestykkeFigur />
    </FigurSlide>
  );
}

/* 14 – Datasjøen */
export function SlideDatasjoen() {
  return (
    <FigurSlide kicker="2010 · Datasjøen" tittel="Lagre alt – rått">
      <SjoFigur />
    </FigurSlide>
  );
}

/* 15 – Speil: sjøen */
export function SlideSjoenSpeil() {
  return (
    <SpeilSlide
      kicker="2006–2010 · Stordata og datasjøen"
      loest={[
        "Skalaen: lagre og prosessere alt, billig, på vanlig maskinvare",
        "Alle formater – logger, tekst, bilder, klikkstrømmer",
        "Maskinlæring fikk rådataene den trengte",
      ]}
      nytt={[
        "Datasumpa: uten katalog, eierskap og metadata ble sjøen en fylling",
        "Kompleksitet: Hadoop krevde spesialister – SQL-folket sto utenfor",
        "To parallelle verdener: varehus for BI, sjø for ML – doble kopier, dobbel regning",
      ]}
      bunn="En sjø blir en sump når gjenfinnbarheten svikter – ikke når datakvaliteten gjør det."
    />
  );
}

/* ================= 2012 · Skyen ================= */

export function SlideSkyen() {
  return (
    <FigurSlide kicker="2012 · Skyen" tittel="Skill lagring fra regnekraft">
      <SkyFigur />
    </FigurSlide>
  );
}

/* 18 – Konvergensen */
export function SlideLakehouse() {
  return (
    <FigurSlide kicker="2020 · Lakehouse" tittel="To spor møtes – og blir dataplattformen">
      <KonvergensFigur />
    </FigurSlide>
  );
}

/* ================= Hvorfor vi er der vi er ================= */

const MEDIA = "/media/26-ndc-kystverket";

/* Portrett: Tim Berners-Lee 2023, Dr. Frank Gaeth, CC BY 4.0, Wikimedia Commons */
export function SlideAvslutning() {
  return (
    <QuotePage
      quote={
        <>
          «Data er noe verdifullt, og de vil vare lenger enn systemene
          selv.»
        </>
      }
      attribution="— Tim Berners-Lee"
      imageSrc={`${MEDIA}/tim-berners-lee.jpg`}
      imageAlt="Tim Berners-Lee"
      caption="Tim Berners-Lee. Oppfinneren av World Wide Web."
    />
  );
}
