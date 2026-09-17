import { Copy } from "@/components/Copy";
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
          <Copy k="line1" as="div" style={{ color: "var(--burgundy)" }} />
          <Copy k="line2" as="div" style={{ color: "var(--red)" }} />
        </div>
      </Box>
    </>
  );
}

/* Slide 17 – Kapittel: Data som produkt */
export function Slide17DataSomProdukt() {
  return <ChapterSlide />;
}

/* Slide 18 – Dataprodukt + undertittel */
export function Slide18Dataprodukt() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* Slide 19 – Datakontrakt-diagram */
export function Slide19Datakontrakt() {
  return (
    <>
      <MilesLogo />
      <Box box={[48, 42, 700, 60]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Img
        box={[232, 192.7, 816, 334.5]}
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image19.png"
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
        src="/media/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/image20.png"
        alt="Eksempel på datakontrakt i YAML (ODCS)"
      />
    </>
  );
}
