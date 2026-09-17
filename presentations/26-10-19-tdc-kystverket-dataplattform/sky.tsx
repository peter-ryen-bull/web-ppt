import type { ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, BulletList, ChapterSlide, Img, Reveal, pt } from "../parts";
import {
  DagEn,
  FireSpor,
  Innlesing,
  ManuellVsServerless,
  SkyFundament,
  SkyMedKlosser,
} from "./figurer/strek";

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

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
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
        titleSize={60}
        showLogo={false}
      />
    </>
  );
}

/* Dag én: hva vi hadde å starte med */
export function SlideDagEn() {
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
          <Copy k="title" />
        </div>
      </Box>
      <Box box={[800, 170, 400, 400]}>
        <DagEn />
      </Box>
      {[0, 1, 2].map((i) => (
        <Reveal key={i} at={i + 1}>
          <Box box={[90, 180 + i * 140, 680, 110]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(40),
                lineHeight: 1.1,
                color: i === 2 ? "var(--red)" : "var(--burgundy)",
              }}
            >
              <Copy k="rows" i={i} field="label" />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(20),
                color: "var(--burgundy-2)",
              }}
            >
              <Copy k="rows" i={i} field="value" />
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
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
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
          <Copy k="title" />
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
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
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
          <Copy k="title" />
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
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
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
  title: ReactNode;
  sub: ReactNode;
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

function Punchline({ at, y, text }: { at: number; y: number; text: ReactNode }) {
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
          <Copy k="title" as="div" style={{ whiteSpace: "pre-line" }} />
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
          <Copy k="lead" />
        </div>
      </Box>
      <FlytBoks
        at={1}
        x={80}
        y={230}
        w={300}
        title={<Copy k="cards" i={0} field="tittel" />}
        sub={<Copy k="cards" i={0} field="tekst" />}
      />
      <FlytPil at={1} x={390} y={270} />
      <FlytBoks
        at={2}
        x={440}
        y={230}
        w={300}
        title={<Copy k="cards" i={1} field="tittel" />}
        sub={<Copy k="cards" i={1} field="tekst" />}
      />
      <FlytPil at={2} x={750} y={270} />
      <FlytBoks
        at={3}
        x={800}
        y={230}
        w={300}
        title={<Copy k="cards" i={2} field="tittel" />}
        sub={<Copy k="cards" i={2} field="tekst" />}
      />
      <Punchline at={4} y={460} text={<Copy k="punchline" />} />
    </>
  );
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

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
          <Copy k="title" />
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
        <Copy
          k="code"
          as="div"
          style={{ whiteSpace: "pre", color: "var(--cream)" }}
        />
      </Box>
      <Punchline
        at={1}
        y={620}
        text={<Copy k="punchline" />}
      />
    </>
  );
}

/* Fire Terraform-states */
export function SlideFireStates() {
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
          <Copy k="title" />
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
      {[0, 1, 2, 3].map((i) => (
        <Reveal key={i} at={i + 1}>
          <Box box={[90, 140 + i * 110, 700, 95]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(32),
                lineHeight: 1.1,
                color: "var(--burgundy)",
              }}
            >
              <Copy k="rows" i={i} field="label" />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(18),
                color: "var(--burgundy-2)",
              }}
            >
              <Copy k="rows" i={i} field="value" />
            </div>
          </Box>
        </Reveal>
      ))}
      <Punchline
        at={5}
        y={580}
        text={<Copy k="punchline" />}
      />
    </>
  );
}

/* Kapittel: Slik gjør vi det */
export function SlideTekniskImplementasjon() {
  return (
    <ChapterSlide
      title={<Copy k="title" />}
      subtitle={<Copy k="subtitle" />}
      titleSize={54}
      showLogo={false}
    />
  );
}

/* Innlesing utenfor Databricks */
export function SlideIngest() {
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
          <Copy k="title" />
        </div>
      </Box>
      <Box box={[820, 150, 400, 400]}>
        <Innlesing />
      </Box>
      {[0, 1, 2].map((i) => (
        <Reveal key={i} at={i + 1}>
          <Box box={[90, 170 + i * 140, 700, 120]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(30),
                lineHeight: 1.15,
                color: i === 2 ? "var(--red)" : "var(--burgundy)",
              }}
            >
              <Copy k="rows" i={i} field="label" />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: pt(18),
                color: "var(--burgundy-2)",
              }}
            >
              <Copy k="rows" i={i} field="value" />
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
        alt="AIS-orkestreringsjobb i Databricks: fra import til gull"
        fit="contain"
      />
    </>
  );
}

/* Databricks serverless */
export function SlideServerless() {
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
          <Copy k="title" />
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
          <Copy k="kicker" />
        </div>
      </Box>
      <Box box={[80, 118, 1120, 320]}>
        <ManuellVsServerless />
      </Box>
      {[0, 1, 2].map((i) => (
        <Reveal key={i} at={i + 1}>
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
              <Copy k="items" i={i} />
            </div>
          </Box>
        </Reveal>
      ))}
    </>
  );
}
