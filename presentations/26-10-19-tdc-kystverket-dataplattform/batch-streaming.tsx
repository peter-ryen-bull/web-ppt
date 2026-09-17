import { Copy } from "@/components/Copy";
import { Box, BulletItem, ChapterSlide, Reveal, pt } from "../parts";
import { BatchVsStreamingFigur } from "./figurer/BatchVsStreaming";

/* Kapittel: Hvordan dataplattform */
export function SlideBatchStreamingKapittel() {
  return (
    <ChapterSlide
      title={<Copy k="title" />}
      titleSize={54}
      showLogo={false}
    />
  );
}

/* Animert sammenligning av de to flytmåtene */
export function SlideBatchVsStreaming() {
  return (
    <>
      <Box box={[48, 42, 700, 44]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        >
          <Copy k="title" />
        </div>
      </Box>
      <Box box={[20, 100, 1240, 606]}>
        <BatchVsStreamingFigur />
      </Box>
    </>
  );
}

/* Når velger du hva? – to kort med punkter */
function ValgKort({
  x,
  side,
  fraSteg,
}: {
  x: number;
  side: "batch" | "streaming";
  /** Klikk-steget der første punkt dukker opp */
  fraSteg: number;
}) {
  return (
    <Box
      box={[x, 168, 532, 356]}
      style={{
        background: "#fff",
        border: "1.5px solid var(--cream-dark)",
        borderRadius: 14,
        padding: "30px 34px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            background: "var(--teal)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(11),
            letterSpacing: 1.5,
          }}
        >
          <Copy k={side} field="tittel" />
        </span>
        <Copy
          k="passer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            color: "#9a5068",
          }}
        />
      </div>
      <div style={{ marginTop: 30, display: "grid", gap: 22 }}>
        {[0, 1, 2].map((i) => (
          <BulletItem key={i} at={fraSteg + i} size={15} color="var(--burgundy)">
            <Copy k={`${side}.punkter`} i={i} />
          </BulletItem>
        ))}
      </div>
    </Box>
  );
}

export function SlideBatchStreamingValg() {
  return (
    <>
      <Box box={[48, 42, 700, 60]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--burgundy)",
          }}
        >
          <Copy k="title" />
        </div>
      </Box>
      <ValgKort x={80} side="batch" fraSteg={1} />
      <ValgKort x={668} side="streaming" fraSteg={4} />
      <Reveal at={7}>
        <Box
          box={[90, 574, 1100, 50]}
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
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}
