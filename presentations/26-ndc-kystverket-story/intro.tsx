import { Box, Img, Reveal, pt, useRevealStyle } from "../parts";
import { BaatSignal } from "@/components/figures/BaatSignal";

const MEDIA = "/media/26-ndc-kystverket";

/* Slide 1 – Kald åpning: én scene, én setning om gangen */
export function SlideScene() {
  const linje2 = useRevealStyle(1);
  const linje3 = useRevealStyle(2);
  return (
    <>
      <Box
        box={[80, 150, 1120, 360]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        >
          It&apos;s 03:14.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          The sea off Stad. February. A gale from the northwest.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--red)",
            ...linje3,
          }}
        >
          A cargo ship heading north at nine knots.
        </div>
      </Box>
      <Reveal at={3}>
        <Box box={[430, 520, 420, 170]}>
          <BaatSignal />
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 2 – Hvert tiende sekund forlater en liten melding skipet */
export function SlideSignal() {
  const rad = (label: string, verdi: string) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 30,
        padding: "10px 0",
        borderBottom: "1px solid var(--divider)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(15),
          color: "#9a5068",
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: pt(17),
          color: "var(--burgundy)",
        }}
      >
        {verdi}
      </span>
    </div>
  );

  return (
    <>
      <Box box={[66, 90, 620, 120]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Every ten seconds, the ship says:
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[66, 240, 560, 340]}
          style={{
            background: "#fff",
            border: "1.5px solid var(--cream-dark)",
            borderRadius: 14,
            padding: "22px 30px",
          }}
        >
          {rad("WHO", "MMSI 257 123 000")}
          {rad("WHERE", "62.19° N  5.08° E")}
          {rad("HOW FAST", "9.2 knots")}
          {rad("WHERE TO", "course 021°")}
          {rad("STATUS", "under way using engine")}
        </Box>
      </Reveal>
      <Box box={[720, 250, 500, 200]}>
        <BaatSignal />
      </Box>
      <Reveal at={2}>
        <Box box={[720, 480, 500, 120]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            Nobody on board thinks about it. The message just goes.
            <br />
            Out into the dark, over VHF.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 3 – Noen lytter: NAIS, sanntidsbildet av norskekysten */
export function SlideNais() {
  return (
    <>
      <Img
        box={[168, 40, 944, 590]}
        src={`${MEDIA}/nais.png`}
        alt="NAIS – real-time map of ship traffic along the Norwegian coast"
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
            nais.kystverket.no. The Norwegian coast right now. Open to everyone.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 4 – 100 000 000 rader hver dag, med et bilde på hvor mye det er */
export function SlideHundreMillioner() {
  return (
    <>
      <Box
        box={[40, 200, 1200, 190]}
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
          100,000,000
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[140, 400, 1000, 60]}
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
            messages like that. Every single day.
          </div>
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box
          box={[140, 490, 1000, 90]}
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
              lineHeight: 1.45,
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            If you read one message per second, without a break, you&apos;d spend
            over three years on one day&apos;s data. And tomorrow there&apos;s a new day.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 5 – Forside (layout "Forside Lys") */
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
      <Box box={[39, 49.1, 668.2, 240]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(25),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        >
          100 million rows a day
          <br />
          <span style={{ color: "var(--red)" }}>
            The story of the data platform behind the sea route
          </span>
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

/* Slide 6 – Om Peter (layout "Side med tekst og bilde") */
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
      {item(1, [86.6, 268.4, 500, 52.9], 40, "Data platform developer at Miles")}
      {item(
        2,
        [86.6, 351.1, 575.5, 88.5],
        76.5,
        "Building the data platform for the Norwegian Coastal Administration. Has built for both the public and private sector"
      )}
      {item(3, [86.6, 470.5, 425.6, 62.9], 40, "Azure and Databricks, every day")}
    </>
  );
}
