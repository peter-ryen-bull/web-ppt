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
import { RolleFigur, type RolleHvem } from "@/components/figures/strek";

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

/* Uber-historien: det funket fint, helt til det ikke gjorde det */
export function SlideUber() {
  const akt = (
    at: number,
    y: number,
    aar: string,
    tekst: string,
    farge: string,
  ) => (
    <Reveal at={at}>
      <Box box={[90, y, 1100, 90]} style={{ display: "flex", gap: 40 }}>
        <div
          style={{
            width: 280,
            flexShrink: 0,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: farge,
          }}
        >
          {aar}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(21),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
          }}
        >
          {tekst}
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
      {akt(
        1,
        180,
        "The start",
        "A few terabytes spread across MySQL and Postgres. Engineers wrote scripts that glued the sources together. It worked just fine.",
        "var(--teal)",
      )}
      {akt(
        2,
        300,
        "The growth",
        "Then the company exploded. Every team had its own database, its own scripts, its own truth. Nobody could answer simple questions about the company as a whole.",
        "var(--burgundy)",
      )}
      {akt(
        3,
        420,
        "The turning point",
        "The silos got in the way of everything they wanted to do with the data. The answer was one shared platform. Out of necessity, not principle.",
        "var(--red)",
      )}
      <Reveal at={4}>
        <Box box={[90, 570, 1100, 60]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            You don't need a data platform from day one. But past a certain
            scale, there's no alternative.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Dataplattformer i hverdagen: du brukte fire av dem i dag */
export function SlideHvorfor() {
  const eksempler = [
    "The online store that suggests products",
    "The streaming service that gets it right",
    "The taxi with a fixed price up front",
    "The airfare that's set in a second",
  ];
  return (
    <>
      <Box box={[53.7, 240, 560, 162.4]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          You used four data platforms before you got here
        </div>
      </Box>
      <Reveal at={eksempler.length + 1}>
        <Box box={[53.9, 460, 540, 120]}>
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
      {eksempler.map((f, i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[628.2, 240.7 + i * 77.5, 582, 66.4]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                color: "var(--burgundy-2)",
              }}
            >
              {f}
            </div>
            {i < eksempler.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 61,
                  width: 582,
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
      <Box box={[48.4, 267.9, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            Collect data from source systems
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            Analyze it, and share it
          </div>
        </div>
      </Box>
      <Reveal at={2}>
        <Box
          box={[140, 490, 1000, 40]}
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
            }}
          >
            ingest → store → transform → share → govern
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 14 – Mer enn et datavarehus */
export function SlideMerEnnVarehus() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[48.4, 267.9, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            A data warehouse delivers reports
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            A data platform creates value
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
            continuously, not just for the monthly report
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 15 – Dataprodukt */
export function SlideDataprodukt() {
  return (
    <ChapterSlide
      title="Data product"
      subtitle="Quality-assured, managed, documented. And with an owner who answers."
      showLogo={false}
    />
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

/* Slide 17 – Plattformer feiler organisatorisk, ikke teknisk */
export function SlideFeilerOrganisatorisk() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[48.4, 267.9, 1183.1, 184.2]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            Data platforms rarely fail on technology
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            They fail on people
          </div>
        </div>
      </Box>
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
