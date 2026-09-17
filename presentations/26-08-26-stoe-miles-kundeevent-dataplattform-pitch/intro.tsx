import { Copy } from "@/components/Copy";
import { Box, ChapterSlide, Img, MilesLogo, PainsLabel, pt } from "../parts";

/* Slide 1 – Forside (layout "Forside Lys") */
export function Slide01Forside() {
  return (
    <>
      <Box box={[39, 49.1, 668.2, 200]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(25),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Img box={[39, 423.2, 822.5, 254.7]} src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image1.svg" alt="Miles" />
    </>
  );
}

/* Slide 2 – Kapittel: Hvorfor bygger 'alle' dataplattform? */
export function Slide02Hvorfor() {
  return (
    <>
      <MilesLogo />
      <Box box={[206.3, 228.9, 867.5, 239.2]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
          }}
        />
      </Box>
    </>
  );
}

/* Slide 3 – Om Peter (layout "Side med tekst og bilde") */
export function Slide03OmPeter() {
  const item = (
    box: [number, number, number, number],
    lineH: number,
    i: number
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
          <Copy k="items" i={i} />
        </div>
      </Box>
    </>
  );

  return (
    <>
      <Img
        box={[688.8, 63, 528.8, 594]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image13.jpeg"
        alt="Peter Bull"
        fit="cover"
      />
      <Box box={[66.7, 150.3, 436.5, 73.8]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        />
      </Box>
      {item([86.6, 268.4, 347.9, 52.9], 40, 0)}
      {item([86.6, 351.1, 575.5, 88.5], 76.5, 1)}
      {item([86.6, 470.5, 425.6, 62.9], 40, 2)}
    </>
  );
}

/* Slide 4 – Tjenesteområde Data og AI (alt innhold fra layouten "Data og AI") */
export function Slide04DataOgAI() {
  return (
    <>
      <MilesLogo />
      <Box box={[28.8, 35.4, 752.7, 58.2]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Img
        box={[50.3, 279, 447.8, 86.2]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image10.svg"
        alt="Data og AI"
      />
      <Img
        box={[878.6, 202.1, 320.5, 315.8]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image9.svg"
        alt="Illustrasjon av chip"
      />
      <Box box={[28.8, 589.5, 693.8, 74.3]}>
        <Copy
          k="body"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.3,
            color: "#FF0000",
          }}
        />
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
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(65),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        />
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
          <Copy k="title_before" />{" "}
          <Copy
            k="title_mid"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}
          />{" "}
          <Copy k="title_after" />
        </div>
      </Box>
    </>
  );
}

/* Slide 7 – Stø har et enormt datagrunnlag */
export function Slide07Stoe() {
  return (
    <>
      <MilesLogo />
      <Box box={[53.7, 278.8, 618, 162.4]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        />
      </Box>
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} box={[628.2, 201.9 + i * 77.5, 582, 66.4]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(28),
              color: "var(--burgundy-2)",
            }}
          >
            <Copy k="items" i={i} />
          </div>
          {i < 4 && (
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
          <Copy k="link" />
        </a>
      </Box>
    </>
  );
}

/* Slide 8 – Kapittel: Hva er en dataplattform */
export function Slide08HvaEr() {
  return <ChapterSlide titleSize={54} />;
}

/* Slide 9 – Logoer: Databricks, Snowflake, Microsoft Fabric */
export function Slide09Logoer() {
  return (
    <>
      <MilesLogo />
      <Img
        box={[85.6, 263.4, 300.6, 157.8]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image14.png"
        alt="Databricks"
      />
      <Img
        box={[470.5, 324.3, 333.2, 87.8]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image15.png"
        alt="Snowflake"
      />
      <Img
        box={[873.1, 273.9, 355.4, 199.9]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image16.png"
        alt="Microsoft Fabric"
      />
    </>
  );
}
