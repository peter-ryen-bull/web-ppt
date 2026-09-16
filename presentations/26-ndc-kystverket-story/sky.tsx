import type { ReactNode } from "react";
import { Box, BulletItem, BulletList, ChapterSlide, Img, Reveal, pt } from "../parts";
import {
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

/* Kapittel: Historien om prosjektet */
export function SlideProsjekt() {
  return (
    <>
      <Img
        box={[490, 112, 300, 77]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
      <ChapterSlide
        title="The story of the project"
        subtitle="From one source to a platform"
        titleSize={60}
        showLogo={false}
      />
    </>
  );
}

/* Dag én: hva vi hadde å starte med */
export function SlideDagEn() {
  const linjer = [
    ["One source.", "AIS"],
    ["One small team."],
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

/* Kapittel: Azure + Databricks + Terraform */
export function SlideAzureDatabricks() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <SkyMedKlosser />
      </Box>
      <ChapterSlide
        title="Azure + Databricks + Terraform"
        subtitle="The toolbox we picked"
        titleSize={52}
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
      <BulletList
        box={[72.4, 250, 700, 380]}
        fromStep={1}
        gap={32}
        items={[
          "Storage, networking, identity",
          "Security and cost from day one",
          "Rebuild from the repo",
          "Boring on purpose",
        ]}
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
      <BulletList
        box={[72.4, 260, 760, 320]}
        fromStep={1}
        gap={36}
        items={[
          "Lakehouse: lake and warehouse in one",
          "One engine for batch and streaming",
          "Unity Catalog: access, lineage, catalog",
        ]}
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
      <Box box={[66, 70, 1040, 90]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            color: "var(--burgundy)",
          }}
        >
          Terraform: the infrastructure
        </div>
      </Box>
      <Img
        box={[1160, 52, 72, 82]}
        src={`${MEDIA}/terraform.svg`}
        alt="Terraform"
      />
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

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function TfKw({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--mint)" }}>{children}</span>;
}

function TfStr({ children }: { children: ReactNode }) {
  return <span style={{ color: "#f4b8a0" }}>{children}</span>;
}

function TfLine({ children }: { children?: ReactNode }) {
  return (
    <div style={{ whiteSpace: "pre", color: "var(--cream)" }}>
      {children ?? " "}
    </div>
  );
}

/* Ett utdrag: workspace-ressursen, tre miljøer */
export function SlideTerraformKode() {
  return (
    <>
      <Box box={[66, 40, 1040, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          One resource. Three environments.
        </div>
      </Box>
      <Img
        box={[1160, 28, 72, 82]}
        src={`${MEDIA}/terraform.svg`}
        alt="Terraform"
      />
      <Box
        box={[66, 128, 1148, 460]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          boxShadow: "0 12px 28px rgba(28, 12, 20, 0.18), 0 28px 56px rgba(28, 12, 20, 0.22)",
          padding: "36px 52px",
          fontFamily: MONO,
          fontSize: pt(20),
          lineHeight: 1.62,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TfLine>
          <TfKw>resource</TfKw> <TfStr>&quot;azurerm_databricks_workspace&quot;</TfStr>{" "}
          <TfStr>&quot;this&quot;</TfStr> {"{"}
        </TfLine>
        <TfLine>
          {"  "}
          <TfKw>for_each</TfKw>
          {" = "}
          <TfKw>toset</TfKw>
          {"(["}
          <TfStr>&quot;dev&quot;</TfStr>
          {", "}
          <TfStr>&quot;test&quot;</TfStr>
          {", "}
          <TfStr>&quot;prod&quot;</TfStr>
          {"])"}
        </TfLine>
        <TfLine />
        <TfLine>
          {"  name                = "}
          <TfStr>&quot;dbw-kystverket-${"{"}each.key{"}"}&quot;</TfStr>
        </TfLine>
        <TfLine>
          {"  resource_group_name = "}
          <TfStr>&quot;rg-kystverket-${"{"}each.key{"}"}&quot;</TfStr>
        </TfLine>
        <TfLine>
          {"  location            = "}
          <TfStr>&quot;norwayeast&quot;</TfStr>
        </TfLine>
        <TfLine>
          {"  sku                 = "}
          <TfStr>&quot;premium&quot;</TfStr>
        </TfLine>
        <TfLine>{"}"}</TfLine>
      </Box>
      <Punchline
        at={1}
        y={620}
        text="Same block. Three Databricks workspaces."
      />
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
      <Box box={[66, 50, 1040, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            color: "var(--burgundy)",
          }}
        >
          Terraform: four states. Four pipelines.
        </div>
      </Box>
      <Img
        box={[1160, 36, 72, 82]}
        src={`${MEDIA}/terraform.svg`}
        alt="Terraform"
      />
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

/* Kapittel: How it's done */
export function SlideTekniskImplementasjon() {
  return (
    <ChapterSlide
      title="How it's done"
      subtitle="Ingest, the jobs, the bundles"
      titleSize={54}
      showLogo={false}
    />
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
        <div style={{ marginTop: 28, display: "grid", gap: 18 }}>
          {punkter.map((p) => (
            <BulletItem key={p} size={20} color="var(--burgundy)">
              {p}
            </BulletItem>
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
    </>
  );
}

/* PySpark → compute → DABs: modellene blir jobber */
export function SlidePysparkDabs() {
  const steg = (
    at: number,
    x: number,
    nr: string,
    kicker: string,
    title: string,
    sub: string,
  ) => (
    <Reveal at={at}>
      <Box
        box={[x, 210, 340, 300]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 12,
          padding: "28px 26px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            lineHeight: 1,
            color: "var(--mint)",
          }}
        >
          {nr}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(12),
            letterSpacing: 1.8,
            color: "var(--mint)",
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(24),
            lineHeight: 1.2,
            color: "var(--cream)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(15),
            lineHeight: 1.4,
            color: "var(--mint)",
          }}
        >
          {sub}
        </div>
      </Box>
    </Reveal>
  );

  const pil = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 330, 40, 60]}
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
      <Box box={[66, 50, 1150, 80]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          From PySpark to a pipeline
        </div>
      </Box>
      <Box box={[66, 130, 1150, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Write the model. Deploy it. Let the bundle run it.
        </div>
      </Box>
      {steg(
        1,
        66,
        "1",
        "WRITE",
        "PySpark",
        "MarTraf, MarU. Python and Spark. The models are just code.",
      )}
      {pil(2, 416)}
      {steg(
        2,
        466,
        "2",
        "DEPLOY",
        "Databricks compute",
        "Same code. Serverless Spark, where the data already lives.",
      )}
      {pil(3, 816)}
      {steg(
        3,
        866,
        "3",
        "AUTOMATE",
        "Asset Bundles",
        "A job in git. Schedule, environments, every night.",
      )}
      <Punchline at={4} y={560} text="They run as automated pipelines." />
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

/* Flyt: kilder → Prefect → raw → lakehouse → innsikt */
export function SlideIngestFlyt() {
  return (
    <>
      <Box box={[48, 80, 1100, 60]}>
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
      <FlytBoks
        at={1}
        x={28}
        w={216}
        title="Sources"
        sub="AIS, and the other things we fetch"
      />
      <FlytPil at={2} x={244} />
      <FlytBoks
        at={2}
        x={280}
        w={216}
        title="Prefect"
        sub="Python jobs, outside Databricks"
      />
      <FlytPil at={3} x={496} />
      <FlytBoks
        at={3}
        x={532}
        w={216}
        title="Storage, raw"
        sub="containers Terraform created"
      />
      <FlytPil at={4} x={748} />
      <FlytBoks
        at={4}
        x={784}
        w={216}
        title="Lakehouse"
        sub="bronze → silver → gold in Delta tables"
      />
      <FlytPil at={5} x={1000} />
      <FlytBoks
        at={5}
        x={1036}
        w={216}
        title="Sharing"
        sub="APIs, dashboards, and analytics"
      />
      <Punchline
        at={6}
        y={520}
        text="100 million rows a day. No clusters to run."
      />
    </>
  );
}

/* Databricks-jobben bak flyten: AIS-orkestrering, hele lerretet */
export function SlideAisPipeline() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#1b1d21" }} />
      <Img
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/ais-pipeline.png`}
        alt="AIS orchestration job in Databricks: from import to gold"
        fit="contain"
      />
    </>
  );
}

/* Databricks serverless */
export function SlideServerless() {
  const jobs = [
    { title: "Historical load", sub: "the huge job" },
    { title: "Last 7 days", sub: "the weekly job" },
    { title: "One ship", sub: "the tiny job" },
  ];
  return (
    <>
      <Box box={[520, 30, 240, 130]}>
        <Kapasitetsmaaler />
      </Box>
      <Box
        box={[81.5, 160, 1117.1, 110]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          serverless vs manual tuning
        </div>
      </Box>
      <Box
        box={[81.5, 274, 1117.1, 32]}
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
      {jobs.map((job, i) => (
        <Reveal key={job.title} at={1}>
          <Box
            box={[90 + i * 380, 330, 350, 110]}
            style={{
              background: "#fff",
              border: "1.5px solid var(--cream-dark)",
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(22),
                color: "var(--burgundy)",
              }}
            >
              {job.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                color: "var(--burgundy-2)",
              }}
            >
              {job.sub}
            </div>
          </Box>
        </Reveal>
      ))}
      <Reveal at={2}>
        <Box
          box={[90, 460, 1100, 50]}
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
            We spent a lot of time getting those sizes right. Then we stopped guessing.
          </div>
        </Box>
      </Reveal>
      <Reveal at={3}>
        <Box
          box={[90, 530, 1100, 130]}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(40),
              color: "var(--red)",
            }}
          >
            36 hours became 4
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            Serverless costs more. The time it saved was worth it.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
