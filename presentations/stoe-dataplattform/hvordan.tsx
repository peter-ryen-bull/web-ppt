import { Box, ChapterSlide, Img, MilesLogo, pt } from "../parts";

/* Slide 26 – Kapittel: Hvordan begynner man å bygge dataplattform */
export function Slide26Hvordan() {
  return <ChapterSlide title="Hvordan begynner man å bygge dataplattform" />;
}

/* Slide 27 – 1. Definere roller (ellipse med roller) */
export function Slide27Roller() {
  const label = (
    center: [number, number],
    text: string
  ) => (
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
  );

  return (
    <>
      <MilesLogo />
      <Box
        box={[49.5, 352.7, 788.8, 311.2]}
        style={{
          background: "var(--cream-dark)",
          borderRadius: "50%",
          transform: "rotate(-5.4deg)",
        }}
      />
      <Box box={[81.5, 120, 1117.1, 180]} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(65),
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          1. Definere roller
        </div>
      </Box>
      {label([248.5, 433.6], "Plattform")}
      {label([640, 491.6], "Engineers/analytikere")}
      {label([302.2, 609.5], "Governance")}
      {label([977.8, 596.9], "BI- og konsumbrukere")}
    </>
  );
}

/* Slide 28 – 2. Bygge dataprodukter først */
export function Slide28Dataprodukter() {
  return (
    <ChapterSlide
      title={
        <>
          2. Bygge dataprodukter først –{" "}
          <span style={{ fontSize: pt(40) }}>
            bygge infrastruktur etter behov
          </span>
        </>
      }
    />
  );
}

/* Slide 29 – 3. Forvalte metadata og informasjonssikkerhet */
export function Slide29Metadata() {
  return <ChapterSlide title="3. Forvalte metadata og informasjonssikkerhet" />;
}

/* Slide 30 – Datakontrakter, Dataeierskap, Datakatalog + Purview! */
export function Slide30Forvaltning() {
  return (
    <>
      <MilesLogo />
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
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}>
            Sentralisere logging, audits, rapportering
          </span>
        </div>
      </Box>
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
          Purview!
        </div>
      </Box>
    </>
  );
}

/* Slide 31 – 4. Skalér og fjern flaskehalser (gigantisk tekst) */
export function Slide31Skaler() {
  /* 176 pt autokrympet til 52,5 % i PowerPoint ≈ 92,4 pt */
  return (
    <>
      <MilesLogo />
      <Box
        box={[92.7, 250.4, 1117.1, 268]}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(92.4),
            lineHeight: 0.95,
            color: "var(--burgundy)",
          }}
        >
          4. Skalér og fjern flaskehalser
        </div>
      </Box>
    </>
  );
}

/* Slide 32 – Oppsummering */
export function Slide32Oppsummering() {
  return (
    <>
      <MilesLogo />
      <Box
        box={[63.8, 278.4, 1117.1, 268]}
        style={{ display: "flex", alignItems: "flex-start" }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(62),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Hvorfor bygger “alle” dataplattform?
        </div>
      </Box>
      <Box box={[367.1, 507.7, 640.3, 38.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(18),
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Tydelige effekter - Men det må gjøres riktig
        </div>
      </Box>
    </>
  );
}

/* Slide 33 – Vi elsker å løse utfordringer! (layout "Vi elsker utfordringer") */
export function Slide33Avslutning() {
  return (
    <>
      <Img box={[33.1, 40.7, 182.5, 56.5]} src="/media/miles-logo.svg" alt="Miles" />
      <Img
        box={[522.9, 11.9, 851.5, 708.1]}
        src="/media/stoe-dataplattform/image12.svg"
        alt="Illustrasjon: person som fanger skyer med håv"
      />
      <Img
        box={[39, 311.6, 634, 191]}
        src="/media/stoe-dataplattform/image11.svg"
        alt="Vi elsker å løse utfordringer!"
      />
    </>
  );
}
