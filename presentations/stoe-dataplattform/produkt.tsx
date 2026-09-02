import { Box, ChapterSlide, Img, MilesLogo, pt } from "../parts";

/* Slide 16 – Samle data / analyser den */
export function Slide16Samle() {
  return (
    <>
      <MilesLogo />
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
          <div style={{ color: "var(--red)" }}>Analyser den, og dele videre</div>
        </div>
      </Box>
    </>
  );
}

/* Slide 17 – Kapittel: Data som produkt */
export function Slide17DataSomProdukt() {
  return <ChapterSlide title="Data som produkt" />;
}

/* Slide 18 – Dataprodukt + undertittel */
export function Slide18Dataprodukt() {
  return (
    <ChapterSlide
      title="Dataprodukt"
      subtitle="Kvalitetssikret, forvaltet, dokumentert"
    />
  );
}

/* Slide 19 – Datakontrakt-diagram */
export function Slide19Datakontrakt() {
  return (
    <>
      <MilesLogo />
      <Box box={[48, 42, 700, 60]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        >
          Datakontrakt
        </div>
      </Box>
      <Img
        box={[232, 192.7, 816, 334.5]}
        src="/media/stoe-dataplattform/image19.png"
        alt="Data Producer, Data Contract og Data Consumer"
      />
    </>
  );
}

/* Slide 20 – Datakontrakt som YAML */
export function Slide20Yaml() {
  return (
    <>
      <MilesLogo />
      <Img
        box={[376.9, 88.9, 445.3, 562.7]}
        src="/media/stoe-dataplattform/image20.png"
        alt="Eksempel på datakontrakt i YAML (ODCS)"
      />
    </>
  );
}