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

/* Kapittel: Historien om prosjektet */
export function SlideProsjekt() {
  return (
    <ChapterSlide
      title="Historien om prosjektet"
      subtitle="Fra én kilde til en plattform"
      titleSize={60}
      showLogo={false}
    />
  );
}

/* Dag én: hva vi hadde å starte med */
export function SlideDagEn() {
  const linjer = [
    ["Én kilde.", "AIS. Ikke noe annet."],
    ["Ett lite team.", "Som også skulle sove om natta."],
    ["Én strøm.", "Som aldri stopper. Ikke i jula, ikke i kuling, ikke når vi deployer."],
  ];
  return (
    <>
      <Box box={[66, 70, 1100, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Dag én
        </div>
      </Box>
      {linjer.map(([stor, liten], i) => (
        <Reveal key={stor} at={i + 1}>
          <Box box={[90, 180 + i * 140, 1100, 110]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(40),
                lineHeight: 1.1,
                color: i === 2 ? "var(--red)" : "var(--burgundy)",
              }}
            >
              {stor}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(20),
                color: "var(--burgundy-2)",
              }}
            >
              {liten}
            </div>
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Kapittel: Azure + Databricks */
export function SlideAzureDatabricks() {
  return (
    <ChapterSlide
      title="Azure + Databricks"
      subtitle="Verktøykassa vi valgte"
      showLogo={false}
    />
  );
}

/* Azure: fundamentet */
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
          Azure: grunnmuren
        </div>
      </Box>
      <BarItem
        at={1}
        box={[86.6, 250, 1050, 52.9]}
        lineH={40}
        text="Lagring, nettverk og identitet som ferdige byggeklosser"
      />
      <BarItem
        at={2}
        box={[86.6, 340, 1050, 52.9]}
        lineH={40}
        text="Sikkerhet, tilgangsstyring og kostnadskontroll fra dag én"
      />
      <BarItem
        at={3}
        box={[86.6, 430, 1050, 52.9]}
        lineH={40}
        text="Alt som infrastruktur som kode. Plattformen kan gjenskapes fra repoet."
      />
      <BarItem
        at={4}
        box={[86.6, 520, 1050, 52.9]}
        lineH={40}
        text="Kjedelig med vilje. Grunnmurer skal være kjedelige."
      />
    </>
  );
}

/* Databricks: motoren */
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
          Databricks: motoren
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
        text="Lakehouse: datasjø og datavarehus i ett"
      />
      <BarItem
        at={2}
        box={[86.6, 360, 740, 52.9]}
        lineH={40}
        text="Én motor (Spark) for både batch og streaming. Samme kode, samme tabeller."
      />
      <BarItem
        at={3}
        box={[86.6, 455, 740, 52.9]}
        lineH={40}
        text="Unity Catalog: tilgang, lineage og katalog. Governance-laget i praksis."
      />
    </>
  );
}

function FlytBoks({
  at,
  x,
  y = 300,
  w = 260,
  title,
  sub,
}: {
  at: number;
  x: number;
  y?: number;
  w?: number;
  title: string;
  sub: string;
}) {
  return (
    <Reveal at={at}>
      <Box
        box={[x, y, w, 150]}
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
}

function FlytPil({ at, x, y = 345 }: { at: number; x: number; y?: number }) {
  return (
    <Reveal at={at}>
      <Box
        box={[x, y, 40, 60]}
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
}

function Punchline({ at, y, text }: { at: number; y: number; text: string }) {
  return (
    <Reveal at={at}>
      <Box
        box={[140, y, 1000, 50]}
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
            textAlign: "center",
          }}
        >
          {text}
        </div>
      </Box>
    </Reveal>
  );
}

/* Infrastruktur som kode: vi klikker ikke, vi committer */
export function SlideTerraform() {
  return (
    <>
      <Box box={[66, 70, 1100, 90]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            color: "var(--burgundy)",
          }}
        >
          Vi klikker ikke. Vi committer.
        </div>
      </Box>
      <Box box={[66, 160, 1100, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            color: "var(--red)",
          }}
        >
          Infrastruktur som kode. Terraform. Gjennom CI/CD.
        </div>
      </Box>
      <FlytBoks at={1} x={80} y={230} w={300} title="Pull request" sub="endringen ligger i git" />
      <FlytPil at={1} x={390} y={270} />
      <FlytBoks at={2} x={440} y={230} w={300} title="terraform plan" sub="pipelinen viser hva som skjer" />
      <FlytPil at={2} x={750} y={270} />
      <FlytBoks at={3} x={800} y={230} w={300} title="apply" sub="merge, så blir det virkelighet" />
      <Punchline
        at={4}
        y={430}
        text="Terraform beskriver Azure og Databricks. Ned til kataloger og storage-containere."
      />
      <Punchline
        at={4}
        y={500}
        text="Hele plattformen kan gjenskapes fra repoet. Også om noen sletter den."
      />
    </>
  );
}

/* Fire Terraform-states */
export function SlideFireStates() {
  const states: [string, string][] = [
    ["workspace", "Databricks-arbeidsområdet. Det teamet logger inn i."],
    ["storage accounts", "Lagring og containere. Inkludert raw."],
    ["unity catalog", "Katalogene. Tilgangsstyring. Governance som kode."],
    ["databricks_account", "Konto-nivå. Identitet, grupper, over workspace."],
  ];
  return (
    <>
      <Box box={[66, 50, 1100, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            color: "var(--burgundy)",
          }}
        >
          Fire states. Fire pipelines.
        </div>
      </Box>
      {states.map(([navn, tekst], i) => (
        <Reveal key={navn} at={i + 1}>
          <Box box={[90, 140 + i * 110, 1100, 95]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(32),
                lineHeight: 1.1,
                color: "var(--burgundy)",
              }}
            >
              {navn}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(18),
                color: "var(--burgundy-2)",
              }}
            >
              {tekst}
            </div>
          </Box>
        </Reveal>
      ))}
      <Punchline
        at={5}
        y={580}
        text="En endring i lagring river ikke ned katalogen. Det er poenget med å splitte."
      />
    </>
  );
}

/* Terraform vs DABs */
export function SlideTerraformDabs() {
  const kolonne = (
    at: number,
    x: number,
    etikett: string,
    under: string,
    punkter: string[],
  ) => (
    <Reveal at={at}>
      <Box box={[x, 160, 520, 380]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(12),
            letterSpacing: 2,
            color: "var(--cream)",
            background: "var(--teal)",
            borderRadius: 999,
            padding: "7px 18px",
            display: "inline-block",
          }}
        >
          {etikett}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "#9a5068",
          }}
        >
          {under}
        </div>
        <div style={{ marginTop: 28, display: "grid", gap: 22 }}>
          {punkter.map((p) => (
            <div
              key={p}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(24),
                lineHeight: 1.25,
                color: "var(--burgundy)",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </Box>
    </Reveal>
  );
  return (
    <>
      <Box box={[66, 50, 1100, 80]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Infrastruktur og logikk. To verktøy.
        </div>
      </Box>
      {kolonne(1, 80, "TERRAFORM", "infrastruktur", [
        "workspaces, lagring, containere",
        "Unity Catalog, ned til katalog",
        "når plattformen endrer seg",
      ])}
      {kolonne(2, 680, "DABS", "logikk", [
        "schemas, tabeller, jobs",
        "Databricks Asset Bundles",
        "når koden endrer seg",
      ])}
      <Punchline
        at={3}
        y={580}
        text="Infrastrukturen skal være kjedelig. Logikken skal kunne endres ofte."
      />
    </>
  );
}

/* Innlesing utenfor Databricks */
export function SlideIngest() {
  const linjer = [
    ["Prefect.", "Et Python-bibliotek for å orkestrere jobber. Ikke Databricks-jobs."],
    ["Dumper i raw.", "Jobbene henter data og legger den i storage. Ferdig."],
    ["Databricks leser derfra.", "Plattformen begynner når filen ligger der. Ikke når skipet sender."],
  ];
  return (
    <>
      <Box box={[66, 50, 1150, 90]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Innlesingen skjer utenfor Databricks.
        </div>
      </Box>
      {linjer.map(([stor, liten], i) => (
        <Reveal key={stor} at={i + 1}>
          <Box box={[90, 170 + i * 140, 1100, 120]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(36),
                lineHeight: 1.1,
                color: i === 2 ? "var(--red)" : "var(--burgundy)",
              }}
            >
              {stor}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(18),
                color: "var(--burgundy-2)",
              }}
            >
              {liten}
            </div>
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Flyt: kilder → Prefect → raw → Databricks */
export function SlideIngestFlyt() {
  return (
    <>
      <Box box={[48, 120, 900, 60]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Hente. Dumpe. Så lakehouse.
        </div>
      </Box>
      <FlytBoks at={1} x={40} title="Kilder" sub="AIS og det andre vi henter" />
      <FlytPil at={2} x={300} />
      <FlytBoks at={2} x={340} title="Prefect" sub="Python-jobber, utenfor Databricks" />
      <FlytPil at={3} x={600} />
      <FlytBoks at={3} x={640} title="Storage, raw" sub="containere Terraform har laget" />
      <FlytPil at={4} x={900} />
      <FlytBoks at={4} x={940} title="Databricks" sub="leser raw, skriver bronze" />
      <Punchline
        at={5}
        y={520}
        text="To ansvar. Prefect får dataen inn. Databricks gjør den til noe noen kan bruke."
      />
    </>
  );
}

/* Kapittel: 100 millioner rader. Hver dag. */
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

/* Regnestykket */
export function SlideRegnestykke() {
  return (
    <>
      <Box
        box={[90, 210, 1100, 90]}
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
          ≈ 1 200 rader i sekundet. Døgnet rundt.
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[90, 320, 1100, 90]}
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
          box={[140, 460, 1000, 90]}
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
            Hver rad er ett skip som sier: her er jeg, så fort går jeg, dit skal
            jeg. Og i den raden er det mennesker.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Fra antenne til innsikt (pipeline) */
export function SlidePipeline() {
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
      <FlytBoks at={1} x={40} title="AIS-nettverket" sub="~90 basestasjoner og 4 satellitter" />
      <FlytPil at={2} x={300} />
      <FlytBoks at={2} x={340} title="Prefect" sub="jobber utenfor Databricks, dumper til raw" />
      <FlytPil at={3} x={600} />
      <FlytBoks at={3} x={640} title="Lakehouse" sub="bronse → sølv → gull i Delta-tabeller" />
      <FlytPil at={4} x={900} />
      <FlytBoks at={4} x={940} title="Deling og innsikt" sub="API-er, dashbord og analyse" />
      <Punchline
        at={5}
        y={520}
        text="100 millioner rader i døgnet, uten at vi drifter en eneste klynge"
      />
    </>
  );
}

/* Databricks serverless */
export function SlideServerless() {
  const lines = [
    "Ingen klynger å starte, patche eller skalere",
    "Kapasiteten følger strømmen: trafikktopper om dagen, stille netter",
    "Vi betaler for det vi bruker, ikke for det vi frykter vi trenger",
  ];
  return (
    <>
      <Box
        box={[81.5, 160, 1117.1, 140]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Ingen klynger å vekke om natta
        </div>
      </Box>
      <Box
        box={[81.5, 300, 1117.1, 40]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            letterSpacing: 2,
            color: "#9a5068",
          }}
        >
          DATABRICKS SERVERLESS
        </div>
      </Box>
      {lines.map((text, i) => (
        <Reveal key={text} at={i + 1}>
          <Box
            box={[140, 380 + i * 70, 1000, 55]}
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
