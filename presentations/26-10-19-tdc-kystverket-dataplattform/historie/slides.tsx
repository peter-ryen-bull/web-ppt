import type { ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, BulletItem, ChapterSlide, QuotePage, pt } from "../../parts";
import {
  TidslinjeFigur,
  RelasjonsFigur,
  VarehusFigur,
  RegnestykkeFigur,
  SjoFigur,
  SkyFigur,
  KonvergensFigur,
} from "./figurer";

/* ---------- Felles byggeklosser for denne presentasjonen ---------- */

/** Figur-slide: liten kicker + serif-tittel øverst, SVG-figur under */
function FigurSlide({
  kicker,
  tittel,
  children,
}: {
  kicker?: ReactNode;
  tittel?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {kicker && (
        <Box box={[48, 34, 800, 30]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: pt(12),
              letterSpacing: 2,
              color: "var(--red)",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </Box>
      )}
      {tittel && (
        <Box box={[48, 60, 1000, 56]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(28),
              color: "var(--burgundy)",
            }}
          >
            {tittel}
          </div>
        </Box>
      )}
      <Box box={[20, tittel ? 116 : 60, 1240, tittel ? 590 : 640]}>{children}</Box>
    </>
  );
}

/** Speil-slide: hva fasen løste – og det nye problemet den skapte */
function SpeilSlide({ footer }: { footer?: boolean }) {
  const kolonne = (x: number, farge: string, col: number) => (
    <Box
      box={[x, 190, 560, 400]}
      style={{
        background: "#fff",
        border: "1.5px solid var(--cream-dark)",
        borderRadius: 20,
        padding: "34px 38px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(22),
          color: farge,
          marginBottom: 26,
        }}
      >
        <Copy k="columns" i={col} field="tittel" />
      </div>
      {[0, 1, 2].map((j) => (
        <div key={j} style={{ marginBottom: 18 }}>
          <BulletItem size={15} color="var(--burgundy)" bar={farge}>
            <Copy k={`columns.${col}.items`} i={j} />
          </BulletItem>
        </div>
      ))}
    </Box>
  );

  return (
    <>
      <Box box={[48, 44, 900, 34]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(12),
            letterSpacing: 2,
            color: "var(--red)",
            textTransform: "uppercase",
          }}
        >
          <Copy k="kicker" />
        </div>
      </Box>
      <Box box={[48, 80, 1100, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(32),
            color: "var(--burgundy)",
          }}
        >
          <Copy k="title" />
        </div>
      </Box>
      {kolonne(60, "var(--teal)", 0)}
      {kolonne(660, "var(--red)", 1)}
      {footer && (
        <Box
          box={[60, 616, 1160, 60]}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Copy
            k="footer"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(15),
              color: "var(--red)",
              textAlign: "center",
            }}
          />
        </Box>
      )}
    </>
  );
}

/* ================= Intro ================= */

/* 1 – Forside */
export function SlideForside() {
  return (
    <ChapterSlide
      title={<Copy k="title" />}
      subtitle={<Copy k="subtitle" />}
      titleSize={60}
      showLogo={false}
    />
  );
}

/* 2 – Tidslinjen */
export function SlideTidslinje() {
  return (
    <FigurSlide tittel={<Copy k="title" />}>
      <TidslinjeFigur />
    </FigurSlide>
  );
}

/* ================= 1970 · Databasen ================= */

export function SlideRelasjonsmodellen() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <RelasjonsFigur />
    </FigurSlide>
  );
}

/* 7 – Speil: databasen */
export function SlideDatabasenSpeil() {
  return (
    <SpeilSlide />
  );
}

/* ================= 1988 · Datavarehuset ================= */

export function SlideVarehuset() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <VarehusFigur />
    </FigurSlide>
  );
}

export function SlideVarehusetSpeil() {
  return (
    <SpeilSlide footer />
  );
}

/* ================= 2006 · Big data ================= */

export function SlideRegnestykket() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <RegnestykkeFigur />
    </FigurSlide>
  );
}

/* 14 – Datasjøen */
export function SlideDatasjoen() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <SjoFigur />
    </FigurSlide>
  );
}

/* 15 – Speil: sjøen */
export function SlideSjoenSpeil() {
  return (
    <SpeilSlide footer />
  );
}

/* ================= 2012 · Skyen ================= */

export function SlideSkyen() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <SkyFigur />
    </FigurSlide>
  );
}

/* 18 – Konvergensen */
export function SlideLakehouse() {
  return (
    <FigurSlide kicker={<Copy k="kicker" />} tittel={<Copy k="title" />}>
      <KonvergensFigur />
    </FigurSlide>
  );
}

/* ================= Hvorfor vi er der vi er ================= */

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

/* Portrett: Tim Berners-Lee 2023, Dr. Frank Gaeth, CC BY 4.0, Wikimedia Commons */
export function SlideAvslutning() {
  return (
    <QuotePage
      quote={<Copy k="quote" />}
      attribution={<Copy k="attribution" />}
      imageSrc={`${MEDIA}/tim-berners-lee.jpg`}
      imageAlt="Tim Berners-Lee"
      caption={<Copy k="caption" />}
    />
  );
}
