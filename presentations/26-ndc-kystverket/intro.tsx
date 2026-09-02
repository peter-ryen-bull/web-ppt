import { Box, ChapterSlide, Img, Reveal, pt } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";

/* Slide 1 – Trigger: vi live-tracker alle skip i norske farvann */
export function SlideTrigger() {
  return (
    <ChapterSlide
      title="Vi live-tracker alle skip i norske farvann"
      titleSize={60}
      showLogo={false}
    />
  );
}

/* Slide 2 – NAIS: sanntidsbildet av norskekysten */
export function SlideNais() {
  return (
    <>
      <Img
        box={[168, 40, 944, 590]}
        src={`${MEDIA}/nais.png`}
        alt="NAIS – sanntidskart over skipstrafikken langs norskekysten"
      />
      <Reveal at={1}>
        <Box
          box={[168, 648, 944, 40]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              color: "var(--red)",
            }}
          >
            nais.kystverket.no – sanntidsbildet, åpent for alle
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 3 – 100 000 000 rader hver dag */
export function SlideHundreMillioner() {
  return (
    <>
      <Box
        box={[40, 230, 1200, 190]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(105),
            color: "var(--red)",
            whiteSpace: "nowrap",
          }}
        >
          100 000 000
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[140, 445, 1000, 80]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(24),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            rader med posisjonsdata gjennom systemet vårt – hver eneste dag
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 4 – Forside (layout "Forside Lys") */
export function SlideForside() {
  return (
    <>
      <Box box={[816.2, 47.9, 424.8, 157.8]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(25),
            color: "var(--red)",
            textAlign: "left",
          }}
        >
          NDC 2026 · Oslo
        </div>
      </Box>
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
          100 millioner rader om dagen – dataplattformen bak sjøveien
        </div>
      </Box>
      <Img box={[39, 423.2, 822.5, 254.7]} src={`${MEDIA}/forside.svg`} alt="Miles" />
      <Img
        box={[901.6, 512, 300, 77]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
    </>
  );
}

/* Slide 5 – Om Peter (layout "Side med tekst og bilde") */
export function SlideOmPeter() {
  const item = (
    at: number,
    box: [number, number, number, number],
    lineH: number,
    text: string
  ) => (
    <Reveal at={at}>
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
    </Reveal>
  );

  return (
    <>
      <Img
        box={[688.8, 63, 528.8, 594]}
        src={`${MEDIA}/peter.jpeg`}
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
      {item(1, [86.6, 268.4, 500, 52.9], 40, "Dataplattformutvikler i Miles")}
      {item(
        2,
        [86.6, 351.1, 575.5, 88.5],
        76.5,
        "Bygger dataplattform for Kystverket – erfaring fra offentlig og privat sektor"
      )}
      {item(3, [86.6, 470.5, 425.6, 62.9], 40, "Azure- og Databricks-ekspert")}
    </>
  );
}
