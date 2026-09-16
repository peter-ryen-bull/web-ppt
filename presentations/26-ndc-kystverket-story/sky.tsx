import type { ReactNode } from "react";
import { Box, BulletList, ChapterSlide, Img, Reveal, pt } from "../parts";
import {
  DagEn,
  FireSpor,
  Innlesing,
  ManuellVsServerless,
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
          "Integrated well with the rest of the organization",
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
          "Scales compute well, up to many terabytes",
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
      <Box box={[66, 48, 1060, 100]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Deploy and version control
          <br />
          your infrastructure
        </div>
      </Box>
      <Img
        box={[1160, 52, 72, 82]}
        src={`${MEDIA}/terraform.svg`}
        alt="Terraform"
      />
      <Box box={[66, 168, 1100, 40]}>
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
  const lines = [
    "Autoscaling was cheaper than manual scaling",
    "Saved tuning time",
    "Saved startup time",
  ];
  return (
    <>
      <Box
        box={[80, 24, 1120, 62]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
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
        box={[80, 86, 1120, 28]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 2,
            color: "#9a5068",
          }}
        >
          DATABRICKS SERVERLESS
        </div>
      </Box>
      <Box box={[80, 118, 1120, 320]}>
        <ManuellVsServerless />
      </Box>
      {lines.map((text, i) => (
        <Reveal key={text} at={i + 1}>
          <Box
            box={[80, 428 + i * 58, 1120, 48]}
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
