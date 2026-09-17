import { Box, BulletItem, Img, Reveal, pt, useRevealStyle } from "../parts";
import { Copy } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { BaatSignal } from "./figurer/BaatSignal";
import { Meldingsfyll } from "./figurer/strek";

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

/* Slide 1 – Kald åpning: én scene, én setning om gangen */
export function SlideScene() {
  const linje1 = useRevealStyle(1);
  const linje2 = useRevealStyle(2);
  const linje3 = useRevealStyle(3);
  return (
    <>
      <Box
        box={[80, 150, 1120, 360]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <Copy
          k="line1"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            ...linje1,
          }}
        />
        <Copy
          k="line2"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        />
        <Copy
          k="line3"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--red)",
            ...linje3,
          }}
        />
      </Box>
      <Box box={[430, 520, 420, 170]}>
        <BaatSignal />
      </Box>
    </>
  );
}

/* Slide 2 – Hvert tiende sekund forlater en liten melding skipet */
export function SlideSignal() {
  const rad = (i: number) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 30,
        padding: "10px 0",
        borderBottom: "1px solid var(--divider)",
      }}
    >
      <Copy
        k="rows"
        i={i}
        field="label"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(15),
          color: "#9a5068",
          letterSpacing: 1,
        }}
      />
      <Copy
        k="rows"
        i={i}
        field="value"
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: pt(17),
          color: "var(--burgundy)",
        }}
      />
    </div>
  );

  return (
    <>
      <Box box={[66, 80, 640, 150]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Reveal at={1}>
        <Box
          box={[66, 240, 560, 340]}
          style={{
            background: "#fff",
            border: "1.5px solid var(--cream-dark)",
            borderRadius: 14,
            padding: "22px 30px",
          }}
        >
          {rad(0)}
          {rad(1)}
          {rad(2)}
          {rad(3)}
          {rad(4)}
        </Box>
      </Reveal>
      <Box box={[720, 250, 500, 200]}>
        <BaatSignal />
      </Box>
    </>
  );
}

/* Slide 3 – Noen lytter: NAIS, sanntidsbildet av norskekysten */
export function SlideNais() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/nais.png`}
          alt="NAIS – sanntidskart over skipstrafikken langs norskekysten"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </Box>
      <Reveal at={1}>
        <Box
          box={[0, 656, 1280, 44]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Copy
            k="caption"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              color: "var(--red)",
              background: "var(--cream)",
              padding: "6px 16px",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 4 – 100 000 000 rader hver dag, med et bilde på hvor mye det er */
export function SlideHundreMillioner() {
  return (
    <>
      <Box
        box={[40, 200, 1200, 190]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Copy
          k="number"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(105),
            color: "var(--red)",
            whiteSpace: "nowrap",
          }}
        />
      </Box>
      <Reveal at={1}>
        <Box
          box={[140, 400, 1000, 60]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Copy
            k="caption"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(24),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}

/* Etter tallet: meldingene fyller lerretet */
export function SlideHundreMillionerFyll() {
  return (
    <Box box={[0, 0, 1280, 720]}>
      <Meldingsfyll />
    </Box>
  );
}

/* Slide 5 – Forside (layout "Forside Lys") */
export function SlideForside() {
  return (
    <>
      <Img
        box={[940, 44, 280, 72]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
      <Box box={[39, 49.1, 668.2, 240]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(25),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        >
          <Copy k="title" />
          <br />
          <Copy k="subtitle" style={{ color: "var(--red)" }} />
        </div>
      </Box>
      <Img
        box={[39, 423.2, 822.5, 254.7]}
        src={`${MEDIA}/forside.svg`}
        alt="Miles"
      />
    </>
  );
}

const PETER_FOTO: [number, number, number, number] = [688.8, 63, 528.8, 594];

function FotoOverlay({
  at,
  src,
  alt,
  position = "center",
}: {
  at: number;
  src: string;
  alt: string;
  position?: string;
}) {
  const step = useStep();
  const shown = step >= at;
  return (
    <Box
      box={PETER_FOTO}
      style={{
        overflow: "hidden",
        opacity: shown ? 1 : 0,
        transition: "opacity 260ms ease",
        pointerEvents: shown ? undefined : "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
        }}
      />
    </Box>
  );
}

/* Slide 6 – Om Peter (layout "Side med tekst og bilde") */
export function SlideOmPeter() {
  return (
    <>
      <Img
        box={PETER_FOTO}
        src={`${MEDIA}/peter.jpeg`}
        alt="Peter Bull"
        fit="cover"
      />
      <FotoOverlay
        at={5}
        src={`${MEDIA}/peter-bratt.jpg`}
        alt="Skikjøring ned en bratt linje over kysten"
        position="center 70%"
      />
      <FotoOverlay
        at={6}
        src={`${MEDIA}/hanna-peter.jpg`}
        alt="Peter med Hanna på skulderen på fjellet"
        position="center 45%"
      />
      <Box box={[66.7, 140, 580, 80]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        />
      </Box>
      <Box
        box={[72.4, 232, 580, 420]}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <BulletItem at={1}>
          <Copy k="items" i={0} />
        </BulletItem>
        <BulletItem at={2}>
          <Copy k="items" i={1} />
        </BulletItem>
        <BulletItem at={3}>
          <Copy k="items" i={2} />
        </BulletItem>
        <BulletItem at={4}>
          <Copy k="items" i={3} />
        </BulletItem>
      </Box>
    </>
  );
}
