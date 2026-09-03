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

/* Kapittel: Hvorfor bygger alle dataplattform? */
export function SlideHvaEr() {
  return (
    <ChapterSlide
      title="Hvorfor bygger alle dataplattform?"
      subtitle="Grunnmuren under alt som skal bruke data"
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
            width: 150,
            flexShrink: 0,
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
        "Starten",
        "Noen terabyte fordelt på MySQL og Postgres. Ingeniørene skrev skript som limte kildene sammen. Det funket helt fint.",
        "var(--teal)",
      )}
      {akt(
        2,
        300,
        "Veksten",
        "Så eksploderte selskapet. Hvert team hadde sin database, sitt skript, sin sannhet. Ingen kunne svare på enkle spørsmål om hele selskapet.",
        "var(--burgundy)",
      )}
      {akt(
        3,
        420,
        "Vendepunktet",
        "Siloene sto i veien for alt de ville gjøre med dataene. Svaret ble én felles plattform. Av nødvendighet, ikke av prinsipp.",
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
            Du trenger ikke dataplattform fra dag én. Men fra en viss mengde
            finnes det ikke noe alternativ.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Dataplattformer i hverdagen: du brukte fire av dem i dag */
export function SlideHvorfor() {
  const eksempler = [
    "Nettbutikken som foreslår varer",
    "Strømmetjenesten som treffer",
    "Taxien med fastpris på forhånd",
    "Flyprisen som settes på et sekund",
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
          Du brukte fire dataplattformer før du kom hit
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
            Bak alle sammen: en plattform som henter inn, lagrer, prosesserer og
            leverer data
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
            Samle data fra kildesystemer
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            Analyser den, og dele videre
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
            hente inn → lagre → transformere → dele → styre
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
            Et datavarehus leverer rapporter
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            En dataplattform skaper verdi
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
            kontinuerlig, ikke bare til månedsrapporten
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
      title="Dataprodukt"
      subtitle="Kvalitetssikret, forvaltet, dokumentert. Og med en eier som svarer."
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
          Datakontrakter, Dataeierskap, Datakatalog
          <br />
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              ...linje2,
            }}
          >
            Sentralisere logging, audits, rapportering
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
            Dataplattformer feiler sjelden på teknologi
          </div>
          <div style={{ color: "var(--red)", ...linje2 }}>
            De feiler på mennesker
          </div>
        </div>
      </Box>
    </>
  );
}

/* Slide 18 – Roller rundt plattformen (ellipsen) */
export function SlideRoller() {
  const label = (at: number, center: [number, number], text: string) => (
    <Reveal at={at}>
      <div
        style={{
          position: "absolute",
          left: center[0],
          top: center[1],
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-sans)",
          fontSize: pt(16),
          color: "var(--burgundy)",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </Reveal>
  );

  return (
    <>
      <Box
        box={[49.5, 352.7, 788.8, 311.2]}
        style={{
          background: "var(--cream-dark)",
          borderRadius: "50%",
          transform: "rotate(-5.4deg)",
        }}
      />
      <Box
        box={[81.5, 120, 1117.1, 180]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(65),
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Tydelige roller
        </div>
      </Box>
      {label(1, [248.5, 433.6], "Plattform")}
      {label(2, [640, 491.6], "Engineers/analytikere")}
      {label(3, [302.2, 609.5], "Governance")}
      {label(4, [977.8, 596.9], "BI- og konsumbrukere")}
    </>
  );
}
