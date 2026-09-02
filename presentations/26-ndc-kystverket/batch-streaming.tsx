import { Box, ChapterSlide, MilesLogo, Reveal, pt, useRevealStyle } from "../parts";
import { BatchVsStreamingFigur } from "@/components/figures/BatchVsStreaming";

/* Kapittel: Batch eller streaming? */
export function SlideBatchStreamingKapittel() {
  return (
    <ChapterSlide
      title="Batch eller streaming?"
      subtitle="To måter å flytte data på"
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
          passer når …
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
          Når velger du hva?
        </div>
      </Box>
      <ValgKort
        x={80}
        tittel="BATCH"
        fraSteg={1}
        punkter={[
          "rapporter og historiske analyser",
          "store volumer til lav kostnad",
          "kilder som uansett leverer i bolker – f.eks. nattlige eksporter",
        ]}
      />
      <ValgKort
        x={668}
        tittel="STREAMING"
        fraSteg={4}
        punkter={[
          "sanntidsbehov – overvåkning og varsling",
          "hendelsesdrevet automatisering",
          "når ferskhet er viktigere enn kostnad",
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
            I praksis trenger du som regel begge – start med batch, og legg til
            streaming der ferske data faktisk endrer noe.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
