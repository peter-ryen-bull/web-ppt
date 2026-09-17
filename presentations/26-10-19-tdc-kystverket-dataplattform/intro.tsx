import { Box, BulletItem, Img, Reveal, pt, useRevealStyle } from "../parts";
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
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            ...linje1,
          }}
        >
          Klokka er 03:14.
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
          Stadhavet. Februar. Nordvest kuling.
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
          Et lasteskip går nordover i ni knop.
        </div>
      </Box>
      <Box box={[430, 520, 420, 170]}>
        <BaatSignal />
      </Box>
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
          Hvert tiende sekund sier skipet:
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
          {rad("HVEM", "MMSI 257 123 000")}
          {rad("HVOR", "62,19° N  5,08° Ø")}
          {rad("HVOR FORT", "9,2 knop")}
          {rad("KURS", "021°")}
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
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              color: "var(--red)",
            }}
          >
            nais.kystverket.no. Åpent for alle.
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
          100 000 000
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
            slike meldinger. Hver eneste dag.
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
          100 millioner rader om dagen
          <br />
          <span style={{ color: "var(--red)" }}>
            Historien om dataplattformen bak kysten
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
          Designer dataplattformer for store organisasjoner
        </BulletItem>
        <BulletItem at={2}>
          Tidligere tech lead for dataplattformen i politiet
        </BulletItem>
        <BulletItem at={3}>Azure, Databricks, Terraform</BulletItem>
        <BulletItem at={4}>Klatrer og toppturskiløper</BulletItem>
      </Box>
    </>
  );
}
