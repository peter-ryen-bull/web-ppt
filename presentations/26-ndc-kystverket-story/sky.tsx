import type { ReactNode } from "react";
import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import {
  Bolgestripe,
  DagEn,
  FireSpor,
  Grunnmur,
  Innlesing,
  Kapasitetsmaaler,
  Pakke,
  SkyFundament,
  SkyMedKlosser,
} from "@/components/figures/strek";

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
      title="The story of the project"
      subtitle="From one source to a platform"
      titleSize={60}
      showLogo={false}
    />
  );
}

/* Dag én: hva vi hadde å starte med */
export function SlideDagEn() {
  const linjer = [
    ["One source.", "AIS"],
    ["One small team.", "Who also needed to sleep"],
    ["One stream.", "It never stops"],
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
          Day one
        </div>
      </Box>
      <Box box={[800, 170, 400, 400]}>
        <DagEn />
      </Box>
      {linjer.map(([stor, liten], i) => (
        <Reveal key={stor} at={i + 1}>
          <Box box={[90, 180 + i * 140, 680, 110]}>
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
    <>
      <Box box={[430, 60, 420, 150]}>
        <SkyMedKlosser />
      </Box>
      <ChapterSlide
        title="Azure + Databricks"
        subtitle="The toolbox we picked"
        showLogo={false}
      />
    </>
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
          Azure: the foundation
        </div>
      </Box>
      <Box box={[800, 250, 420, 160]}>
        <SkyFundament />
      </Box>
      <BarItem
        at={1}
        box={[86.6, 250, 680, 88.5]}
        lineH={76.5}
        text="Storage, networking, identity"
      />
      <BarItem
        at={2}
        box={[86.6, 350, 680, 52.9]}
        lineH={40}
        text="Security and cost from day one"
      />
      <BarItem
        at={3}
        box={[86.6, 430, 680, 52.9]}
        lineH={40}
        text="Rebuild from the repo"
      />
      <BarItem
        at={4}
        box={[86.6, 510, 680, 52.9]}
        lineH={40}
        text="Boring on purpose"
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
          Databricks: the engine
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
        text="Lakehouse: lake and warehouse in one"
      />
      <BarItem
        at={2}
        box={[86.6, 360, 740, 52.9]}
        lineH={40}
        text="One engine for batch and streaming"
      />
      <BarItem
        at={3}
        box={[86.6, 455, 740, 52.9]}
        lineH={40}
        text="Unity Catalog: access, lineage, catalog"
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
          We don&apos;t click. We commit.
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
          Infrastructure as code. Terraform. Through CI/CD.
        </div>
      </Box>
      <FlytBoks at={1} x={80} y={230} w={300} title="Pull request" sub="the change lives in git" />
      <FlytPil at={1} x={390} y={270} />
      <FlytBoks at={2} x={440} y={230} w={300} title="terraform plan" sub="what will happen" />
      <FlytPil at={2} x={750} y={270} />
      <FlytBoks at={3} x={800} y={230} w={300} title="apply" sub="merge, and it becomes real" />
      <Punchline at={4} y={460} text="The whole platform can be rebuilt from the repo." />
    </>
  );
}

/* Fire Terraform-states */
export function SlideFireStates() {
  const states: [string, string][] = [
    ["workspace", "the team logs in here"],
    ["storage accounts", "including raw"],
    ["unity catalog", "access as code"],
    ["databricks_account", "identity, above the workspace"],
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
          Four states. Four pipelines.
        </div>
      </Box>
      <Box box={[820, 130, 400, 420]}>
        <FireSpor />
      </Box>
      {states.map(([navn, tekst], i) => (
        <Reveal key={navn} at={i + 1}>
          <Box box={[90, 140 + i * 110, 700, 95]}>
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
        text="A change to storage doesn't tear down the catalog."
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
    figur: ReactNode,
  ) => (
    <Reveal at={at}>
      <Box box={[x + 120, 420, 280, 120]}>{figur}</Box>
      <Box box={[x, 160, 520, 260]}>
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
          Infrastructure and logic. Two tools.
        </div>
      </Box>
      {kolonne(
        1,
        80,
        "TERRAFORM",
        "infrastructure",
        ["workspaces, storage, containers", "Unity Catalog", "when the platform changes"],
        <Grunnmur />,
      )}
      {kolonne(
        2,
        680,
        "DABS",
        "logic",
        ["schemas, tables, jobs", "Databricks Asset Bundles", "when the code changes"],
        <Pakke />,
      )}
      <Punchline
        at={3}
        y={580}
        text="The infrastructure should be boring. The logic should be easy to change often."
      />
    </>
  );
}

/* Innlesing utenfor Databricks */
export function SlideIngest() {
  const linjer = [
    ["Prefect.", "Python jobs, outside Databricks"],
    ["Dumps into raw.", "Then it's done"],
    ["Databricks reads from there.", "The platform starts when the file lands"],
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
          Ingest happens outside Databricks.
        </div>
      </Box>
      <Box box={[820, 150, 400, 400]}>
        <Innlesing />
      </Box>
      {linjer.map(([stor, liten], i) => (
        <Reveal key={stor} at={i + 1}>
          <Box box={[90, 170 + i * 140, 700, 120]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(30),
                lineHeight: 1.15,
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
          Fetch. Dump. Then lakehouse.
        </div>
      </Box>
      <FlytBoks at={1} x={40} title="Sources" sub="AIS and the other things we fetch" />
      <FlytPil at={2} x={300} />
      <FlytBoks at={2} x={340} title="Prefect" sub="Python jobs, outside Databricks" />
      <FlytPil at={3} x={600} />
      <FlytBoks at={3} x={640} title="Storage, raw" sub="containers Terraform created" />
      <FlytPil at={4} x={900} />
      <FlytBoks at={4} x={940} title="Databricks" sub="reads raw, writes bronze" />
      <Punchline
        at={5}
        y={520}
        text="Prefect gets it in. Databricks makes it usable."
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
          <div style={{ color: "var(--burgundy)" }}>100 million rows.</div>
          <div style={{ color: "var(--red)", ...linje2 }}>Every day.</div>
        </div>
      </Box>
      <Box box={[0, 600, 1280, 100]}>
        <Bolgestripe />
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
          ≈ 1,200 rows per second. Around the clock.
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
            36.5 billion rows per year
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
            Every row is a ship. And in that row, there are people.
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
          From antenna to insight
        </div>
      </Box>
      <FlytBoks at={1} x={40} title="The AIS network" sub="~90 base stations and 4 satellites" />
      <FlytPil at={2} x={300} />
      <FlytBoks at={2} x={340} title="Prefect" sub="jobs outside Databricks, dumping to raw" />
      <FlytPil at={3} x={600} />
      <FlytBoks at={3} x={640} title="Lakehouse" sub="bronze → silver → gold in Delta tables" />
      <FlytPil at={4} x={900} />
      <FlytBoks at={4} x={940} title="Sharing and insight" sub="APIs, dashboards, and analytics" />
      <Punchline
        at={5}
        y={520}
        text="100 million rows a day. No clusters to run."
      />
    </>
  );
}

/* Databricks serverless */
export function SlideServerless() {
  const lines = [
    "No clusters to start, patch, or scale",
    "Capacity follows the stream",
    "Pay for what we use",
  ];
  return (
    <>
      <Box box={[520, 30, 240, 130]}>
        <Kapasitetsmaaler />
      </Box>
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
          No clusters to wake up at night
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
