import { Box, ChapterSlide, Img, MilesLogo, PainsLabel, pt } from "../parts";

/* Slide 1 – Forside (layout "Forside Lys") */
export function Slide01Forside() {
  return (
    <>
      <Box box={[39, 49.1, 668.2, 200]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(25),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        >
          Mer innsikt med en moderne dataplattform
        </div>
      </Box>
      <Img box={[39, 423.2, 822.5, 254.7]} src="/media/stoe-dataplattform/image1.svg" alt="Miles" />
    </>
  );
}

/* Slide 2 – Kapittel: Hvorfor bygger 'alle' dataplattform? */
export function Slide02Hvorfor() {
  return (
    <>
      <MilesLogo />
      <Box box={[206.3, 228.9, 867.5, 239.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
          }}
        >
          Hvorfor bygger &apos;alle&apos; dataplattform?
        </div>
      </Box>
    </>
  );
}

/* Slide 3 – Om Peter (layout "Side med tekst og bilde") */
export function Slide03OmPeter() {
  const item = (
    box: [number, number, number, number],
    lineH: number,
    text: string
  ) => (
    <>
      <Box
        box={[72.4, box[1] - 1.7, 3, lineH]}
        style={{ background: "var(--red)" }}
      />
      <Box box={box}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(22),
            lineHeight: 1.3,
            color: "var(--burgundy-2)",
          }}
        >
          {text}
        </div>
      </Box>
    </>
  );

  return (
    <>
      <Img
        box={[688.8, 63, 528.8, 594]}
        src="/media/stoe-dataplattform/image13.jpeg"
        alt="Peter Bull"
        fit="cover"
      />
      <Box box={[66.7, 150.3, 436.5, 73.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          Peter Bull
        </div>
      </Box>
      {item([86.6, 268.4, 347.9, 52.9], 40, "Dataplattformutvikler")}
      {item(
        [86.6, 351.1, 575.5, 88.5],
        76.5,
        "Bred erfaring med å bygge dataplattform i offentlig og privat virksomhet"
      )}
      {item([86.6, 470.5, 425.6, 62.9], 40, "Azure og Databricks-ekspert")}
    </>
  );
}

/* Slide 4 – Tjenesteområde Data og AI (alt innhold fra layouten "Data og AI") */
export function Slide04DataOgAI() {
  return (
    <>
      <MilesLogo />
      <Box box={[28.8, 35.4, 752.7, 58.2]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        >
          Tjenesteområde
        </div>
      </Box>
      <Img
        box={[50.3, 279, 447.8, 86.2]}
        src="/media/stoe-dataplattform/image10.svg"
        alt="Data og AI"
      />
      <Img
        box={[878.6, 202.1, 320.5, 315.8]}
        src="/media/stoe-dataplattform/image9.svg"
        alt="Illustrasjon av chip"
      />
      <Box box={[28.8, 589.5, 693.8, 74.3]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.3,
            color: "#FF0000",
          }}
        >
          Dataplattform, dataanalyse, AI, maskinlæring, data engineering, data
          scientist, big data, RAG
        </div>
      </Box>
    </>
  );
}

/* Slide 5 – Pains: Excelarket, Eposten, ... */
export function Slide05Pains1() {
  return (
    <>
      <MilesLogo />
      <PainsLabel />
      <Box
        box={[81.5, 226, 1117.1, 268]}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(65),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        >
          Excelarket, Eposten, Rapporten, Datauttrekket
        </div>
      </Box>
    </>
  );
}

/* Slide 6 – Pains: Dokumentering, Rapportering, GDPR, ... */
export function Slide06Pains2() {
  return (
    <>
      <MilesLogo />
      <PainsLabel />
      <Box
        box={[80.1, 226, 1140, 268]}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(65),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        >
          Dokumentering, Rapportering,{" "}
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}>
            GDPR, sletting,
          </span>{" "}
          loggføring
        </div>
      </Box>
    </>
  );
}

/* Slide 7 – Stø har et enormt datagrunnlag */
export function Slide07Stoe() {
  const facts = [
    "2,3 milliarder transaksjoner i året",
    "5 millioner brukere",
    "1500+ bedrifter under KYC",
    "3 separate domener",
    "Flere oppkjøp de siste årene",
  ];
  return (
    <>
      <MilesLogo />
      <Box box={[53.7, 278.8, 618, 162.4]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          Stø har et enormt datagrunnalg
        </div>
      </Box>
      {facts.map((f, i) => (
        <Box key={f} box={[628.2, 201.9 + i * 77.5, 582, 66.4]}>
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
      ))}
      <Box box={[53.9, 655.2, 640.5, 32.3]}>
        <a
          href="https://stoe.no/en/about-the-company"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "#9A5068",
          }}
        >
          https://stoe.no/en/about-the-company
        </a>
      </Box>
    </>
  );
}

/* Slide 8 – Kapittel: Hva er en dataplattform */
export function Slide08HvaEr() {
  return <ChapterSlide title="Hva er en dataplattform" titleSize={54} />;
}

/* Slide 9 – Logoer: Databricks, Snowflake, Microsoft Fabric */
export function Slide09Logoer() {
  return (
    <>
      <MilesLogo />
      <Img
        box={[85.6, 263.4, 300.6, 157.8]}
        src="/media/stoe-dataplattform/image14.png"
        alt="Databricks"
      />
      <Img
        box={[470.5, 324.3, 333.2, 87.8]}
        src="/media/stoe-dataplattform/image15.png"
        alt="Snowflake"
      />
      <Img
        box={[873.1, 273.9, 355.4, 199.9]}
        src="/media/stoe-dataplattform/image16.png"
        alt="Microsoft Fabric"
      />
    </>
  );
}
