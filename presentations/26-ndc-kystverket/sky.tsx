import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";

function BarItem({
  box,
  lineH,
  text,
  at,
}: {
  box: [number, number, number, number];
  lineH: number;
  text: string;
  /** Klikk-steget der punktet dukker opp */
  at: number;
}) {
  return (
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
}

/* Slide 19 – Kapittel: Azure + Databricks */
export function SlideAzureDatabricks() {
  return (
    <ChapterSlide
      title="Azure + Databricks"
      subtitle="Verktøykassa vår"
      showLogo={false}
    />
  );
}

/* Slide 20 – Azure: fundamentet */
export function SlideAzure() {
  return (
    <>
      <Box box={[66.7, 130, 700, 73.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          Azure – fundamentet
        </div>
      </Box>
      <BarItem
        at={1}
        box={[86.6, 250, 1050, 52.9]}
        lineH={40}
        text="Microsofts skyplattform"
      />
      <BarItem
        at={2}
        box={[86.6, 340, 1050, 52.9]}
        lineH={40}
        text="Lagring, nettverk og identitet som ferdige byggeklosser"
      />
      <BarItem
        at={3}
        box={[86.6, 430, 1050, 52.9]}
        lineH={40}
        text="Sikkerhet, tilgangsstyring og kostnadskontroll fra dag én"
      />
      <BarItem
        at={4}
        box={[86.6, 520, 1050, 52.9]}
        lineH={40}
        text="Infrastruktur som kode – plattformen kan gjenskapes fra repoet"
      />
    </>
  );
}

/* Slide 21 – Databricks: motoren */
export function SlideDatabricks() {
  return (
    <>
      <Box box={[66.7, 130, 700, 73.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          Databricks – motoren
        </div>
      </Box>
      <Img
        box={[880, 250, 300.6, 157.8]}
        src={`${MEDIA}/databricks.png`}
        alt="Databricks"
      />
      <BarItem
        at={1}
        box={[86.6, 265, 740, 52.9]}
        lineH={40}
        text="Lakehouse – datalake og datavarehus i ett"
      />
      <BarItem
        at={2}
        box={[86.6, 360, 740, 52.9]}
        lineH={40}
        text="Én motor (Spark) for både batch og streaming"
      />
      <BarItem
        at={3}
        box={[86.6, 455, 740, 52.9]}
        lineH={40}
        text="Unity Catalog – tilgang, lineage og datakatalog"
      />
    </>
  );
}

/* Slide 22 – Kapittel: 100 millioner rader. Hver dag. */
export function SlideStrommen() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box
        box={[81.5, 226, 1117.1, 268]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(72),
            lineHeight: 1.15,
            textAlign: "center",
            width: "100%",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>100 millioner rader.</div>
          <div style={{ color: "var(--red)", ...linje2 }}>Hver dag.</div>
        </div>
      </Box>
    </>
  );
}

/* Slide 23 – Regnestykket */
export function SlideRegnestykke() {
  return (
    <>
      <Box
        box={[90, 230, 1100, 90]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            color: "var(--burgundy)",
          }}
        >
          ≈ 1 200 rader i sekundet – døgnet rundt
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[90, 340, 1100, 90]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(44),
              color: "var(--red)",
            }}
          >
            36,5 milliarder rader i året
          </div>
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box
          box={[140, 480, 1000, 60]}
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
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            GPS-posisjoner fra ~90 basestasjoner og 4 satellitter – hvert punkt
            forteller hvor et skip er, hvor fort det går og hvor det skal
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 24 – Fra antenne til innsikt (pipeline) */
export function SlidePipeline() {
  const step = (at: number, x: number, title: string, sub: string) => (
    <Reveal at={at}>
      <Box
        box={[x, 300, 260, 150]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
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

  const arrow = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 345, 40, 60]}
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
  );

  return (
    <>
      <Box box={[48, 120, 800, 60]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Fra antenne til innsikt
        </div>
      </Box>
      {step(1, 40, "AIS-nettverket", "~90 basestasjoner og 4 satellitter")}
      {arrow(2, 300)}
      {step(2, 340, "Strømmende innlesing", "rå AIS-meldinger, døgnet rundt")}
      {arrow(3, 600)}
      {step(3, 640, "Lakehouse", "bronse → sølv → gull i Delta-tabeller")}
      {arrow(4, 900)}
      {step(4, 940, "Deling og innsikt", "API-er, dashbord og analyse")}
      <Reveal at={5}>
        <Box
          box={[140, 520, 1000, 50]}
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
              color: "var(--red)",
            }}
          >
            100 millioner rader i døgnet – uten at vi drifter en eneste klynge
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 25 – Databricks serverless */
export function SlideServerless() {
  const lines = [
    "Ingen klynger å starte, patche eller skalere",
    "Kapasiteten følger strømmen – trafikktopper og stille netter",
    "Vi betaler for det vi bruker, ikke det vi frykter vi trenger",
  ];
  return (
    <>
      <Box
        box={[81.5, 180, 1117.1, 120]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(60),
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Databricks serverless
        </div>
      </Box>
      {lines.map((text, i) => (
        <Reveal key={text} at={i + 1}>
          <Box
            box={[140, 360 + i * 70, 1000, 55]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(20),
                color: i === 2 ? "var(--red)" : "var(--burgundy-2)",
                textAlign: "center",
              }}
            >
              {text}
            </div>
          </Box>
        </Reveal>
      ))}
    </>
  );
}
