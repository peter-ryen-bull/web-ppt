import { Box, ChapterSlide, MilesLogo, Reveal, pt, useRevealStyle } from "../parts";
import { BatchVsStreamingFigur } from "@/components/figures/BatchVsStreaming";

/* Kapittel: Hvordan dataplattform */
export function SlideBatchStreamingKapittel() {
  return (
    <ChapterSlide
      title="How a data platform works"
      subtitle="Batch or streaming?"
      titleSize={54}
    />
  );
}

/* Animert sammenligning av de to flytmåtene */
export function SlideBatchVsStreaming() {
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
          Batch vs. streaming
        </div>
      </Box>
      <Box box={[20, 100, 1240, 606]}>
        <BatchVsStreamingFigur />
      </Box>
    </>
  );
}

/* Ett punkt i et valgkort – fades inn på sitt eget klikk-steg */
function ValgPunkt({ at, text }: { at: number; text: string }) {
  const reveal = useRevealStyle(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        ...reveal,
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "var(--red)",
          flexShrink: 0,
          transform: "translateY(-1px)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(15),
          lineHeight: 1.45,
          color: "var(--burgundy)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* Når velger du hva? – to kort med punkter */
function ValgKort({
  x,
  tittel,
  punkter,
  fraSteg,
}: {
  x: number;
  tittel: string;
  punkter: string[];
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
          {tittel}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            color: "#9a5068",
          }}
        >
          works when …
        </span>
      </div>
      <div style={{ marginTop: 30, display: "grid", gap: 22 }}>
        {punkter.map((p, i) => (
          <ValgPunkt key={p} at={fraSteg + i} text={p} />
        ))}
      </div>
    </Box>
  );
}

export function SlideBatchStreamingValg() {
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
          When do you pick which?
        </div>
      </Box>
      <ValgKort
        x={80}
        tittel="BATCH"
        fraSteg={1}
        punkter={[
          "reports and historical analysis",
          "big volumes at low cost",
          "sources that deliver in chunks anyway, like nightly exports",
        ]}
      />
      <ValgKort
        x={668}
        tittel="STREAMING"
        fraSteg={4}
        punkter={[
          "real-time needs – monitoring and alerting",
          "event-driven automation",
          "when freshness matters more than cost",
        ]}
      />
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
            In practice you usually need both. Start with batch, and add
            streaming where fresh data actually changes something.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
