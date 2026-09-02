import type { ReactNode } from "react";
import { Box, ChapterSlide, MilesLogo, pt } from "../parts";
import {
  TidslinjeFigur,
  MoensterFigur,
  SiloFigur,
  RelasjonsFigur,
  VarehusFigur,
  RegnestykkeFigur,
  SjoFigur,
  SkyFigur,
  KonvergensFigur,
  ArvFigur,
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
    prefiks: string
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
        <div
          key={p}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "baseline",
            fontFamily: "var(--font-sans)",
            fontSize: pt(15),
            lineHeight: 1.4,
            color: "var(--burgundy)",
            marginBottom: 18,
          }}
        >
          <span style={{ color: farge, fontWeight: 700, flexShrink: 0 }}>{prefiks}</span>
          <span>{p}</span>
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
          Hva den løste – og det nye problemet
        </div>
      </Box>
      {kolonne(60, "var(--teal)", "Dette løste den", loest, "✓")}
      {kolonne(660, "var(--red)", "Det nye problemet", nytt, "→")}
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
      subtitle="Seks tiår med samme problem: å gjøre data om til beslutninger"
      titleSize={60}
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

/* 3 – Mønsteret */
export function SlideMoensteret() {
  return (
    <FigurSlide tittel="Mønsteret som driver historien">
      <MoensterFigur />
    </FigurSlide>
  );
}

/* ================= 1970 · Databasen ================= */

/* 4 – Kapittel */
export function SlideKapDatabasen() {
  return (
    <ChapterSlide
      title="1970 · Databasen"
      subtitle="Problemet: data var fanget i applikasjonene sine"
    />
  );
}

/* 5 – Siloene før databasen */
export function SlideSiloer() {
  return (
    <FigurSlide kicker="1960-tallet" tittel="Hvert program eide sine egne filer">
      <SiloFigur />
    </FigurSlide>
  );
}

/* 6 – Relasjonsmodellen */
export function SlideRelasjonsmodellen() {
  return (
    <FigurSlide kicker="Løsningen · 1970" tittel="Codd: skill spørsmålet fra lagringen">
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
        "Ledelsen fikk fortsatt ikke svar på tvers",
      ]}
      bunn="Hukommelse er ikke det samme som innsikt."
    />
  );
}

/* ================= 1988 · Datavarehuset ================= */

/* 8 – Kapittel */
export function SlideKapVarehuset() {
  return (
    <ChapterSlide
      title="1988 · Datavarehuset"
      subtitle="Problemet: svar på tvers – uten å true driften"
    />
  );
}

/* 9 – Varehuset */
export function SlideVarehuset() {
  return (
    <FigurSlide kicker="Løsningen · 1983–1996" tittel="Ett integrert varehus – adskilt fra driften">
      <VarehusFigur />
    </FigurSlide>
  );
}

/* 10 – Finans var først */
export function SlideFinans() {
  const punkt = (y: number, tittel: string, tekst: string) => (
    <>
      <Box box={[72.4, y, 3, 62]} style={{ background: "var(--red)" }} />
      <Box box={[92, y - 4, 520, 80]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(17),
            color: "var(--burgundy)",
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13.5),
            color: "#9a5068",
            marginTop: 4,
          }}
        >
          {tekst}
        </div>
      </Box>
    </>
  );

  return (
    <>
      <MilesLogo />
      <Box box={[66, 90, 700, 160]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Bankene var først –<br />
          <span style={{ color: "var(--red)" }}>fordi penger er data</span>
        </div>
      </Box>
      {punkt(280, "Risikostyring", "samlet eksponering krever konto, lån og kort sett under ett")}
      {punkt(370, "Svindel og lønnsomhet", "mønstre på tvers av systemene – hvem taper vi penger på?")}
      {punkt(460, "Regulering", "rapporteringskrav tvang frem historikk og sporbarhet")}
      {punkt(550, "…og de hadde råd", "Teradata-prislappen var «eye-watering» – men fortrinnet målbart")}

      <Box
        box={[700, 280, 500, 330]}
        style={{
          background: "var(--teal)",
          borderRadius: 20,
          padding: "38px 42px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(12),
            letterSpacing: 2,
            color: "var(--mint)",
            marginBottom: 18,
          }}
        >
          MILEPÆLER
        </div>
        {[
          ["1983", "Teradata DBC/1012 – parallell «database computer» for beslutningsstøtte"],
          ["1988", "Devlin & Murphy beskriver datavarehus-arkitekturen (IBM)"],
          ["1991", "First Interstate Bancorp bygger varehus – før begrepet var kjent"],
          ["1992/96", "Inmon og Kimball skriver lærebøkene"],
        ].map(([aar, tekst]) => (
          <div
            key={aar}
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 16,
              fontFamily: "var(--font-sans)",
              fontSize: pt(13),
              lineHeight: 1.35,
              color: "rgba(251, 240, 229, 0.85)",
            }}
          >
            <span style={{ color: "var(--mint)", fontWeight: 700, flexShrink: 0, width: 62 }}>
              {aar}
            </span>
            <span>{tekst}</span>
          </div>
        ))}
      </Box>
    </>
  );
}

/* 11 – Speil: varehuset */
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

/* 12 – Kapittel */
export function SlideKapBigdata() {
  return (
    <ChapterSlide
      title="2006 · Big data"
      subtitle="Problemet: internett endret premisset – volum, variasjon, maskinfeil"
    />
  );
}

/* 13 – Regnestykket */
export function SlideRegnestykket() {
  return (
    <FigurSlide kicker="Løsningen · 2003–2006" tittel="Googles svar: distribuer alt">
      <RegnestykkeFigur />
    </FigurSlide>
  );
}

/* 14 – Datasjøen */
export function SlideDatasjoen() {
  return (
    <FigurSlide kicker="2010" tittel="Datasjøen: lagre alt – rått">
      <SjoFigur />
    </FigurSlide>
  );
}

/* 15 – Speil: sjøen */
export function SlideSjoenSpeil() {
  return (
    <SpeilSlide
      kicker="2006–2010 · Big data og datasjøen"
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

/* 16 – Kapittel */
export function SlideKapSkyen() {
  return (
    <ChapterSlide
      title="2012 · Skyen"
      subtitle="Problemet: kjøpe og drifte jernet selv, dimensjonert for toppene"
    />
  );
}

/* 17 – Skyen */
export function SlideSkyen() {
  return (
    <FigurSlide kicker="Løsningen · 2012–2016" tittel="Skill lagring fra regnekraft">
      <SkyFigur />
    </FigurSlide>
  );
}

/* 18 – Konvergensen */
export function SlideLakehouse() {
  return (
    <FigurSlide kicker="2019–2020" tittel="To spor møtes – og blir dataplattformen">
      <KonvergensFigur />
    </FigurSlide>
  );
}

/* ================= Hvorfor vi er der vi er ================= */

/* 19 – Arven */
export function SlideArven() {
  return (
    <Box box={[20, 40, 1240, 640]}>
      <ArvFigur />
    </Box>
  );
}

/* 20 – Avslutning */
export function SlideAvslutning() {
  return (
    <>
      <MilesLogo />
      <Box
        box={[80, 230, 1120, 200]}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>Teknologien skifter.</div>
          <div style={{ color: "var(--red)" }}>
            Problemet består: å gjøre data om til beslutninger.
          </div>
        </div>
      </Box>
      <Box
        box={[240, 480, 800, 80]}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--burgundy)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          KI er neste kapittel – og hever innsatsen:
          <br />
          modellene blir aldri bedre enn dataene plattformen serverer dem.
        </div>
      </Box>
    </>
  );
}
