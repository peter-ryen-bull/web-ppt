import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";
import {
  DataplattformFlyt,
  DataplattformFlytDetaljert,
} from "@/components/figures/DataplattformFlyt";
import { DataproduktAnatomi } from "@/components/figures/Dataprodukt";
import {
  DatakontraktApi,
  DatakontraktBrudd,
} from "@/components/figures/Datakontrakt";
import {
  ArkivOgGit,
  GovernanceTrio,
  PlattformProdukter,
  KontraktArk,
  KatalogKart,
  RolleFigur,
  StrekIkon,
  VarehusVsPlattform,
  type IkonNavn,
  type RolleHvem,
} from "@/components/figures/strek";

/* Kapittel: Hvorfor bygger alle dataplattform? */
export function SlideHvaEr() {
  const sitat = useRevealStyle(1);
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
            fontSize: pt(54),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Why is everyone building data platforms?
        </div>
      </Box>
      <Box
        box={[120, 500, 1040, 90]}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(22),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...sitat,
          }}
        >
          Data is becoming more and more valuable.
        </div>
      </Box>
    </>
  );
}

/* Reid Hoffman: alt er målbart – og det blir rot uten styring */
export function SlideReidHoffman() {
  const quote = useRevealStyle(1);
  const pitch = useRevealStyle(2);
  return (
    <>
      <Box
        box={[688.8, 63, 528.8, 560]}
        style={{ overflow: "hidden", borderRadius: 8 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/reid-hoffman.jpg`}
          alt="Reid Hoffman"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 12%",
          }}
        />
      </Box>
      <Box box={[688.8, 636, 528.8, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(15),
            lineHeight: 1.3,
            color: "var(--burgundy-2)",
          }}
        >
          Reid Hoffman. Co-founder of LinkedIn.
        </div>
      </Box>
      <Box
        box={[66, 140, 580, 300]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          ...quote,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(32),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        >
          &ldquo;In the world of data, everything is measurable, and everything is
          knowable.&rdquo;
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "var(--burgundy-2)",
            whiteSpace: "nowrap",
          }}
        >
          — Reid Hoffman
        </div>
      </Box>
      <Box box={[66, 470, 580, 140]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--red)",
            ...pitch,
          }}
        >
          That becomes very valuable.
          <br />
          And messy if you don&apos;t handle it properly.
        </div>
      </Box>
    </>
  );
}

/* Dataplattformer i hverdagen: du brukte fire av dem i dag */
export function SlideHvorfor() {
  const eksempler: [string, IkonNavn][] = [
    ["The online store that suggests products", "handlekurv"],
    ["The streaming service that gets it right", "spill"],
    ["The taxi with a fixed price up front", "taxi"],
    ["The airfare that's set in a second", "fly"],
  ];
  return (
    <>
      <Box box={[53.7, 210, 540, 200]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          Data platforms are everywhere
        </div>
      </Box>
      <Reveal at={eksempler.length + 1}>
        <Box box={[53.9, 440, 540, 140]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            Behind every one of them: a platform that ingests, stores,
            processes, and delivers data
          </div>
        </Box>
      </Reveal>
      {eksempler.map(([f, ikon], i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[600, 228 + i * 88, 620, 78]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: "var(--font-serif)",
                fontSize: pt(20),
                lineHeight: 1.25,
                color: "var(--burgundy-2)",
              }}
            >
              <StrekIkon navn={ikon} size={34} color="var(--teal)" strokeWidth={1.6} />
              <span>{f}</span>
            </div>
            {i < eksempler.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 72,
                  width: 620,
                  height: 1.5,
                  background: "var(--divider)",
                }}
              />
            )}
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Slide 11 – Dataflyten overordnet: kilder -> plattform -> konsumenter */
export function SlideDataflyt() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlyt />
    </Box>
  );
}

/* Slide 12 – Arkitekturfiguren (detaljert, inkl. governance-laget) */
export function SlideArkitektur() {
  const linjer: [string, string, string][] = [
    ["RAW", "Never deleted", "var(--teal)"],
    ["Transforms", "In source control", "var(--burgundy)"],
    ["Version history", "Of every transform", "var(--red)"],
  ];
  return (
    <>
      <Box box={[20, 42, 1240, 636]}>
        <DataplattformFlytDetaljert />
      </Box>
      <Reveal at={1}>
        <Box
          box={[0, 0, 1280, 720]}
          style={{ background: "var(--cream)" }}
        />
        <Box box={[66, 70, 1100, 70]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(36),
              color: "var(--burgundy)",
            }}
          >
            Raw is archived. Transforms are in git.
          </div>
        </Box>
        <Box box={[780, 150, 440, 380]}>
          <ArkivOgGit />
        </Box>
        {linjer.map(([stor, liten, farge], i) => (
          <Box key={stor} box={[90, 200 + i * 130, 640, 110]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(36),
                lineHeight: 1.1,
                color: farge,
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
        ))}
      </Reveal>
    </>
  );
}

/* Slide 14 – Mer enn et datavarehus */
export function SlideMerEnnVarehus() {
  const lakehouse = [
    "Structured and unstructured",
    "Rollbacks",
    "Rapid iterations",
  ];
  const platform = [
    "Governance",
    "Audit logging",
    "Discoverability",
    "Pipelines",
    "Developer UIs",
    "Code execution",
    "Compute",
    "AI models",
  ];
  const p1 = useRevealStyle(1);
  const p2 = useRevealStyle(2);
  const p3 = useRevealStyle(3);
  const vis = [p1, p2, p3];
  return (
    <>
      <Box box={[66, 52, 700, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Is it just a database?
        </div>
      </Box>
      <Box
        box={[66, 148, 680, 168]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        {lakehouse.map((tekst, i) => (
          <div
            key={tekst}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(26),
              lineHeight: 1.15,
              color: "var(--red)",
              ...vis[i],
            }}
          >
            {tekst}
          </div>
        ))}
      </Box>
      <Reveal at={4}>
        <Box
          box={[66, 340, 640, 1]}
          style={{ background: "var(--divider)" }}
        />
        <Box box={[66, 360, 680, 28]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: pt(12),
              letterSpacing: 2.2,
              color: "#9a5068",
            }}
          >
            THE REST OF THE BUILDING
          </div>
        </Box>
        <Box
          box={[66, 396, 680, 132]}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 28,
            rowGap: 16,
            alignContent: "start",
          }}
        >
          {platform.map((tekst) => (
            <div
              key={tekst}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "var(--teal)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(17),
                  lineHeight: 1.2,
                  color: "var(--burgundy-2)",
                }}
              >
                {tekst}
              </div>
            </div>
          ))}
        </Box>
      </Reveal>
      <Reveal at={5}>
        <Box
          box={[66, 580, 680, 64]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(34),
              lineHeight: 1.15,
              color: "var(--burgundy)",
            }}
          >
            It&apos;s a platform.
          </div>
        </Box>
      </Reveal>
      <Box box={[760, 80, 460, 500]}>
        <VarehusVsPlattform />
      </Box>
    </>
  );
}

function PlattformSkjerm({
  src,
  alt,
  caption,
  position = "left top",
  fit = "cover",
}: {
  src: string;
  alt: string;
  caption: string;
  position?: string;
  fit?: "cover" | "contain";
}) {
  const linje = useRevealStyle(1);
  return (
    <>
      <Box
        box={[20, 16, 1240, 628]}
        style={{
          overflow: "hidden",
          borderRadius: 10,
          background: "#1b1b1b",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
            objectPosition: position,
          }}
        />
      </Box>
      <Box
        box={[66, 654, 1148, 48]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...linje,
          }}
        >
          {caption}
        </div>
      </Box>
    </>
  );
}

/* Katalogen i Databricks – beviset på at det er en plattform */
export function SlideMerEnnVarehusKatalog() {
  return (
    <PlattformSkjerm
      src={`${MEDIA}/databricks-catalog.png`}
      alt="Databricks catalog: catalogs, compute, jobs and discover in one workspace"
      caption="Catalog. Compute. Jobs. Discover."
      position="left top"
    />
  );
}

/* AI-chatten i Databricks – du spør plattformen */
export function SlideMerEnnVarehusAi() {
  return (
    <PlattformSkjerm
      src={`${MEDIA}/databricks-ai-chat.png`}
      alt="Databricks assistant: ask the platform about the data"
      caption="And then you ask."
      position="center top"
    />
  );
}

/* Svaret: Trollfjord på kartet */
export function SlideMerEnnVarehusSvar() {
  return (
    <PlattformSkjerm
      src={`${MEDIA}/databricks-trollfjord.png`}
      alt="Trollfjord positions on a map and in a table, generated from a question"
      caption="And it answers."
      position="center top"
      fit="contain"
    />
  );
}

/* Slide 15 – Dataprodukt: tittel og kjernen i ett */
export function SlideDataprodukt() {
  const linje = useRevealStyle(1);
  return (
    <>
      <Box
        box={[66, 130, 640, 460]}
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
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Data product
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            lineHeight: 1.25,
            color: "var(--red)",
          }}
        >
          A data platform exists
          <br />
          to serve data products.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        >
          A product has users. Users have expectations.
        </div>
      </Box>
      <Box box={[720, 170, 500, 380]}>
        <PlattformProdukter />
      </Box>
    </>
  );
}

/* Slide 15c – Hva som gjør et datasett til et produkt */
const KJENNETEGN: { tittel: string; sub: string; ikon: IkonNavn }[] = [
  { tittel: "A named owner", sub: "who answers, and can improve it", ikon: "person" },
  { tittel: "Documentation", sub: "meaning, origin, and use", ikon: "bok" },
  { tittel: "Quality guarantees", sub: "freshness, tests, a contract", ikon: "skjold" },
  { tittel: "Known consumers", sub: "so a change can be announced", ikon: "deling" },
];

export function SlideDataproduktKjennetegn() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          What makes it a product
        </div>
      </Box>
      {KJENNETEGN.map((k, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={k.tittel} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={k.ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <div
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            >
              {k.tittel}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            >
              {k.sub}
            </div>
          </Box>
        );
        return row === 0 ? (
          cell
        ) : (
          <Reveal key={k.tittel} at={1}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={2}>
        <Box box={[66, 560, 1148, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          >
            Not every dataset. The ones people lean on.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 15d – Dataprodukt: mer enn en tabell */
export function SlideDataproduktAnatomi() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataproduktAnatomi />
    </Box>
  );
}

/* Kapittel: Datakontrakt */
export function SlideDatakontraktKapittel() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <KontraktArk />
      </Box>
      <ChapterSlide
        title="Data contract"
        subtitle="An agreement between those who change a dataset and those who consume it."
        showLogo={false}
      />
    </>
  );
}

/* Hva en datakontrakt er */
export function SlideDatakontraktHva() {
  const linje = useRevealStyle(1);
  return (
    <>
      <Box
        box={[66, 140, 1148, 460]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Clear documentation of your data
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        >
          A human and machine readable document
          <br />
          that clears expectations both ways.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        >
          The schema says speed is a number. The contract says zero to sixty
          knots, fresher than five minutes, and who you wake up when it breaks.
        </div>
      </Box>
    </>
  );
}

/* Hva kontrakten inneholder */
const KONTRAKT_FELT: { tittel: string; sub: string; ikon: IkonNavn }[] = [
  { tittel: "Schema", sub: "fields, types, what's required", ikon: "skjema" },
  { tittel: "Meaning", sub: "what the fields mean, where they come from", ikon: "bok" },
  { tittel: "Validation rules", sub: "min, max, relationships, tests", ikon: "skjold" },
  { tittel: "SLAs and governance", sub: "freshness, sensitivity, who owns it", ikon: "kontrakt" },
];

export function SlideDatakontraktInnhold() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          What&apos;s in a contract
        </div>
      </Box>
      {KONTRAKT_FELT.map((k, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={k.tittel} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={k.ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <div
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            >
              {k.tittel}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            >
              {k.sub}
            </div>
          </Box>
        );
        return row === 0 ? (
          cell
        ) : (
          <Reveal key={k.tittel} at={1}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={2}>
        <Box box={[66, 560, 1148, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          >
            Unlike a wiki page, this one is tested.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Datakontrakt: clear documentation of your data */
export function SlideDatakontrakt() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktApi />
    </Box>
  );
}

/* Slide 15d – Kontrakten stopper feilen tidlig */
export function SlideDatakontraktBrudd() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktBrudd />
    </Box>
  );
}

/* Kapittel: Datakatalog */
export function SlideDatakatalog() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <KatalogKart />
      </Box>
      <ChapterSlide
        title="Data catalog"
        subtitle="The map your organization is missing."
        showLogo={false}
      />
    </>
  );
}

/* Hva en datakatalog er */
export function SlideDatakatalogHva() {
  const linje1 = useRevealStyle(1);
  const linje2 = useRevealStyle(2);
  return (
    <>
      <Box
        box={[66, 130, 1148, 500]}
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
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          What a catalog is
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        >
          An overview of the datasets in an organization.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje1,
          }}
        >
          Search, understand, and assess a dataset without asking around,
          or digging through databases on your own.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          The data stays in the source systems. The catalog describes it
          and points to where it lives.
        </div>
      </Box>
    </>
  );
}

/* DataHub-skjermbilde */
export function SlideDatakatalogDatahub() {
  const caption = useRevealStyle(1);
  return (
    <>
      <Box
        box={[120, 28, 1040, 580]}
        style={{
          overflow: "hidden",
          borderRadius: 12,
          border: "1.5px solid var(--cream-dark)",
          background: "#fff",
        }}
      >
        <Img
          box={[0, 0, 1040, 580]}
          src={`${MEDIA}/datahub.png`}
          alt="DataHub search: 141 datasets across Looker, dbt, Snowflake, Airflow and S3"
          fit="contain"
        />
      </Box>
      <Box box={[66, 624, 1148, 52]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...caption,
          }}
        >
          DataHub. Open source. Search across many systems, not just one cloud.
        </div>
      </Box>
    </>
  );
}

/* Slide 16 – Governance: datakontrakter og katalog */
export function SlideGovernance() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[390, 70, 500, 130]}>
        <GovernanceTrio />
      </Box>
      <Box
        box={[81.5, 226, 1117.1, 268]}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.25,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Data contracts, Data catalog
          <br />
          <span
            style={{
              display: "inline-block",
              ...linje2,
            }}
          >
            Centralize logging, audits, reporting
          </span>
        </div>
      </Box>
      <Reveal at={2}>
        <Box
          box={[802, 568.7, 650.3, 50.4]}
          style={{
            transform: "rotate(-5.24deg)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              color: "var(--red)",
            }}
          >
            Unity Catalog!
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 18 – Roller rundt plattformen */
const ROLLER: {
  at: number;
  hvem: RolleHvem;
  tittel: string;
  sub: string;
}[] = [
  { at: 1, hvem: "plattform", tittel: "Platform", sub: "owns the foundation" },
  {
    at: 2,
    hvem: "byggere",
    tittel: "Engineers and\nanalysts",
    sub: "build on it",
  },
  { at: 3, hvem: "governance", tittel: "Governance", sub: "sets the guardrails" },
  {
    at: 4,
    hvem: "konsumenter",
    tittel: "BI and\nconsumers",
    sub: "use what comes out",
  },
];

export function SlideRoller() {
  return (
    <>
      <Box box={[66, 44, 1148, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Clear roles
        </div>
      </Box>
      <Box box={[66, 100, 1148, 28]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            letterSpacing: 2.2,
            color: "#9a5068",
          }}
        >
          ROLES BEFORE TECHNOLOGY
        </div>
      </Box>

      <Box
        box={[70, 358, 1140, 82]}
        style={{
          background: "var(--cream-dark)",
          borderRadius: "50%",
        }}
      />
      <Box
        box={[140, 384, 1000, 7]}
        style={{
          background: "var(--teal)",
          borderRadius: 8,
        }}
      />

      {ROLLER.map((r, i) => (
        <Reveal key={r.hvem} at={r.at}>
          <Box box={[40 + i * 310, 118, 300, 300]}>
            <RolleFigur hvem={r.hvem} />
          </Box>
          <Box
            box={[40 + i * 310, 458, 300, 120]}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(20),
                lineHeight: 1.15,
                color: "var(--burgundy)",
                whiteSpace: "pre-line",
                minHeight: 62,
              }}
            >
              {r.tittel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                lineHeight: 1.3,
                color: "var(--red)",
              }}
            >
              {r.sub}
            </div>
          </Box>
        </Reveal>
      ))}

      <Reveal at={4}>
        <Box
          box={[80, 598, 1120, 48]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            From data being something IT handles, to being part of each
            domain's own responsibility
          </div>
        </Box>
      </Reveal>
    </>
  );
}
