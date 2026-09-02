import { Box, Img } from "../parts";

/*
 * Slides 10–15: samme arkitekturdiagram (image17.png) der stadig mer
 * avdekkes. I PowerPoint var dette løst med kremfargede rektangler
 * (image18.png) lagt oppå diagrammet – vi gjør det samme med div-er.
 * Maskeposisjonene er hentet rett fra slide-XML-en.
 */

/* Samme farge som bakgrunnen i diagram-PNG-en, så maskene blir usynlige */
const MASK_COLOR = "rgb(248, 238, 227)";

function Mask({ box }: { box: [number, number, number, number] }) {
  return <Box box={box} style={{ background: MASK_COLOR }} />;
}

function DiagramSlide({
  masks,
}: {
  masks: [number, number, number, number][];
}) {
  return (
    <>
      <Img
        box={[22.2, 39.5, 1221.4, 640.9]}
        src="/media/stoe-dataplattform/image17.png"
        alt="Arkitekturdiagram for dataplattform"
      />
      {masks.map((m, i) => (
        <Mask key={i} box={m} />
      ))}
    </>
  );
}

/* Slide 10 – kun kildene synlige */
export function Slide10Diagram() {
  return <DiagramSlide masks={[[342.9, 17.3, 900.7, 652.6]]} />;
}

/* Slide 11 – + Lagring/Arkiv */
export function Slide11Diagram() {
  return (
    <DiagramSlide
      masks={[
        [536.3, 17.3, 707.2, 652.6],
        [340.7, 460.9, 727.6, 149.9],
      ]}
    />
  );
}

/* Slide 12 – + Transformering */
export function Slide12Diagram() {
  return (
    <DiagramSlide
      masks={[
        [733.4, 17.3, 510.2, 652.6],
        [340.7, 460.9, 727.6, 149.9],
        [481.6, 395.3, 727.6, 149.9],
      ]}
    />
  );
}

/* Slide 13 – + Eksponering og Gjenbruk */
export function Slide13Diagram() {
  return (
    <DiagramSlide
      masks={[
        [996.8, 17.3, 246.7, 652.6],
        [340.7, 508.2, 727.6, 102.7],
      ]}
    />
  );
}

/* Slide 14 – + konsumenter */
export function Slide14Diagram() {
  return <DiagramSlide masks={[[340.7, 508.2, 727.6, 102.7]]} />;
}

/* Slide 15 – hele diagrammet, inkl. governance-laget */
export function Slide15Diagram() {
  return <DiagramSlide masks={[]} />;
}
