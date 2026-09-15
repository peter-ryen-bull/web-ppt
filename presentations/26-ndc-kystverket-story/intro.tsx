import { Box, BulletItem, Img, Reveal, pt, useRevealStyle } from "../parts";
import { useStep } from "@/components/steps";
import { BaatSignal } from "@/components/figures/BaatSignal";
import { Meldingsfyll } from "@/components/figures/strek";

const MEDIA = "/media/26-ndc-kystverket";

/* Slide 1 – Kald åpning: én scene, én setning om gangen */
export function SlideScene() {
  const linje2 = useRevealStyle(1);
  const linje3 = useRevealStyle(2);
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
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        >
          It&apos;s 03:14.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          The sea off Stad. February. A gale from the northwest.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--red)",
            ...linje3,
          }}
        >
          A cargo ship heading north at nine knots.
        </div>
      </Box>
      <Reveal at={3}>
        <Box box={[430, 520, 420, 170]}>
          <BaatSignal />
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 2 – Hvert tiende sekund forlater en liten melding skipet */
export function SlideSignal() {
  const rad = (label: string, verdi: string) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 30,
        padding: "10px 0",
        borderBottom: "1px solid var(--divider)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(15),
          color: "#9a5068",
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: pt(17),
          color: "var(--burgundy)",
        }}
      >
        {verdi}
      </span>
    </div>
  );

  return (
    <>
      <Box box={[66, 80, 640, 150]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Every ten seconds, the ship says:
        </div>
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
          {rad("WHO", "MMSI 257 123 000")}
          {rad("WHERE", "62.19° N  5.08° E")}
          {rad("HOW FAST", "9.2 knots")}
          {rad("HEADING", "021°")}
          {rad("STATUS", "under way using engine")}
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
      <Img
        box={[168, 40, 944, 590]}
        src={`${MEDIA}/nais.png`}
        alt="NAIS – real-time map of ship traffic along the Norwegian coast"
      />
      <Reveal at={1}>
        <Box
          box={[168, 648, 944, 40]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              color: "var(--red)",
            }}
          >
            nais.kystverket.no. Open to everyone.
          </div>
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
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(105),
            color: "var(--red)",
            whiteSpace: "nowrap",
          }}
        >
          100,000,000
        </div>
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
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(24),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            messages like that. Every single day.
          </div>
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
          100 million rows a day
          <br />
          <span style={{ color: "var(--red)" }}>
            The story of the data platform behind the coastline
          </span>
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
        alt="Ski touring down a steep line above the coast"
        position="center 70%"
      />
      <FotoOverlay
        at={6}
        src={`${MEDIA}/hanna-peter.jpg`}
        alt="Peter carrying Hanna on his shoulder in the mountains"
        position="center 45%"
      />
      <Box box={[66.7, 140, 580, 80]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          Peter Bull
        </div>
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
          Designs data platforms for large organizations
        </BulletItem>
        <BulletItem at={2}>
          Previously tech lead for the data platform for the Norwegian Police
        </BulletItem>
        <BulletItem at={3}>Azure, Databricks, Terraform</BulletItem>
        <BulletItem at={4}>Rock climber and backcountry skiier</BulletItem>
      </Box>
    </>
  );
}
