import { Box, ChapterSlide, Reveal, pt, useRevealStyle } from "../parts";
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
  Automatikk,
  GovernanceTrio,
  Grunnmur,
  Pakke,
  RolleFigur,
  SiloTilPlattform,
  StrekIkon,
  VarehusVsPlattform,
  Verbrekke,
  type IkonNavn,
  type RolleHvem,
} from "@/components/figures/strek";

/* Kapittel: Hvorfor bygger alle dataplattform? */
export function SlideHvaEr() {
  return (
    <ChapterSlide
      title="Why is everyone building data platforms?"
      subtitle="The foundation under everything that uses data"
      titleSize={54}
      showLogo={false}
    />
  );
}

/* Bro etter historien: rådata i arkiv, transformasjoner i git */
export function SlideArkivGit() {
  const linje = (
    at: number,
    y: number,
    stor: string,
    liten: string,
    farge: string,
  ) => (
    <Reveal at={at}>
      <Box box={[90, y, 640, 110]}>
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
    </Reveal>
  );
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
          Raw is archived. Transforms are in git.
        </div>
      </Box>
      <Box box={[780, 150, 440, 380]}>
        <ArkivOgGit />
      </Box>
      {linje(1, 200, "RAW", "Never deleted", "var(--teal)")}
      {linje(2, 330, "Transforms", "In source control", "var(--burgundy)")}
      {linje(3, 460, "Version history", "Of every transform", "var(--red)")}
    </>
  );
}

/* Uber-historien: det funket fint, helt til det ikke gjorde det */
export function SlideUber() {
  const akt = (at: number, y: number, aar: string, farge: string) => (
    <Reveal at={at}>
      <Box box={[90, y, 780, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.1,
            color: farge,
            whiteSpace: "nowrap",
          }}
        >
          {aar}
        </div>
      </Box>
    </Reveal>
  );
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
          Uber, 2014
        </div>
      </Box>
      <Box box={[900, 160, 320, 352]}>
        <SiloTilPlattform />
      </Box>
      {akt(1, 200, "The start", "var(--teal)")}
      {akt(2, 320, "The growth", "var(--burgundy)")}
      {akt(3, 440, "The turning point", "var(--red)")}
      <Reveal at={4}>
        <Box box={[90, 575, 780, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            Past a certain scale, there&apos;s no alternative.
          </div>
        </Box>
      </Reveal>
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
          You used four data platforms before you got here
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
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlytDetaljert />
    </Box>
  );
}

/* Slide 13 – Essensen i én setning */
export function SlideSamleData() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[140, 70, 1000, 170]}>
        <Verbrekke />
      </Box>
      <Box box={[48.4, 300, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            Store, transform, deliver
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            Govern the whole pipe
          </div>
        </div>
      </Box>
    </>
  );
}

/* Lakehouse: datasjø og varehus i ett */
export function SlideLakehouseHva() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[430, 48, 420, 170]}>
        <Grunnmur />
      </Box>
      <Box box={[48.4, 267.9, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>Lakehouse</div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            Data lake + data warehouse
          </div>
        </div>
      </Box>
      <Reveal at={2}>
        <Box
          box={[802, 520, 650.3, 50.4]}
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
            store and serve, in one place
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Pipelines som kjører uten et menneske i loopen */
export function SlideAutomatisertePipelines() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[430, 48, 420, 150]}>
        <Automatikk />
      </Box>
      <Box box={[48.4, 267.9, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>Automated pipelines</div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            Jobs that run without a person in the loop
          </div>
        </div>
      </Box>
    </>
  );
}

/* Slide 14 – Mer enn et datavarehus */
export function SlideMerEnnVarehus() {
  const punkter = [
    "Structured and unstructured",
    "Rollbacks",
    "Rapid iterations",
  ];
  return (
    <>
      <Box box={[330, 48, 620, 180]}>
        <VarehusVsPlattform />
      </Box>
      <Box box={[48.4, 250, 1183.1, 80]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
            color: "var(--burgundy)",
          }}
        >
          Is it just a database?
        </div>
      </Box>
      {punkter.map((tekst, i) => (
        <Reveal key={tekst} at={i + 1}>
          <Box
            box={[340, 360 + i * 70, 600, 56]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                color: "var(--red)",
                textAlign: "center",
              }}
            >
              {tekst}
            </div>
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Slide 15 – Dataprodukt */
export function SlideDataprodukt() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <Pakke />
      </Box>
      <ChapterSlide
        title="Data product"
        subtitle="Quality-assured, managed, documented. And with an owner who answers."
        showLogo={false}
      />
    </>
  );
}

/* Slide 15b – Dataprodukt: mer enn en tabell */
export function SlideDataproduktAnatomi() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataproduktAnatomi />
    </Box>
  );
}

/* Slide 15c – Datakontrakt: et API for data */
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

/* Slide 16 – Governance: datakontrakter, eierskap, katalog */
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
          Data contracts, Data ownership, Data catalog
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
