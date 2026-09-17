import { Box, BulletItem, ChapterSlide, Reveal, pt } from "../parts";
import { BatchVsStreamingFigur } from "./figurer/BatchVsStreaming";

/* Kapittel: Hvordan dataplattform */
export function SlideBatchStreamingKapittel() {
  return (
    <ChapterSlide
      title="Slik fungerer en dataplattform"
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
          Batch vs. streaming
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
          <BulletItem key={p} at={fraSteg + i} size={15} color="var(--burgundy)">
            {p}
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
          "kilder som uansett leverer i bolker, som nattlige eksporter",
        ]}
      />
      <ValgKort
        x={668}
        tittel="STREAMING"
        fraSteg={4}
        punkter={[
          "sanntidsbehov: overvåkning og varsling",
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
            I praksis trenger du som regel begge. Start med batch, og legg til
            streaming der ferske data faktisk endrer noe.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
