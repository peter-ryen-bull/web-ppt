import { Box, MilesLogo, Reveal, pt, useRevealStyle } from "../parts";

/**
 * TODO (Peter): fyll inn de faktiske volumtallene før presentasjonen.
 * Tallene brukes på volum-sliden og i notes.md.
 */
const VOLUM = {
  perDogn: "?? GB",
  perAar: "?? TB",
  historikk: "?? TB",
};

function SlideTittel({ children }: { children: string }) {
  return (
    <Box box={[48, 42, 900, 60]}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(30),
          color: "var(--burgundy)",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

/* Volumet: strømmen er liten, historikken er stor */
export function SlideStordataVolum() {
  const tall = (
    at: number,
    x: number,
    verdi: string,
    label: string,
    farge: string,
  ) => (
    <Reveal at={at}>
      <Box
        box={[x, 210, 360, 190]}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            color: farge,
          }}
        >
          {verdi}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(15),
            color: "var(--burgundy-2)",
            textAlign: "center",
          }}
        >
          {label}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <MilesLogo />
      <SlideTittel>Strømmen er liten. Historikken er stor.</SlideTittel>
      {tall(1, 80, VOLUM.perDogn, "rådata i døgnet", "var(--burgundy)")}
      {tall(2, 460, VOLUM.perAar, "i året", "var(--burgundy)")}
      {tall(
        3,
        840,
        VOLUM.historikk,
        "AIS-historikk tilbake til 2006",
        "var(--red)",
      )}
      <Reveal at={4}>
        <Box
          box={[120, 450, 1040, 120]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(19),
              lineHeight: 1.5,
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            Å ta imot 1 200 rader i sekundet er ikke det tunge. Det tunge er å
            kjøre gjennom alt vi har samlet – på nytt – hver gang en modell
            endrer seg.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

function Punkt({ at, text }: { at: number; text: string }) {
  const reveal = useRevealStyle(at);
  return (
    <div
      style={{ display: "flex", alignItems: "baseline", gap: 14, ...reveal }}
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

function Kort({
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
      box={[x, 168, 532, 330]}
      style={{
        background: "#fff",
        border: "1.5px solid var(--cream-dark)",
        borderRadius: 14,
        padding: "30px 34px",
      }}
    >
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
      <div style={{ marginTop: 30, display: "grid", gap: 22 }}>
        {punkter.map((p, i) => (
          <Punkt key={p} at={fraSteg + i} text={p} />
        ))}
      </div>
    </Box>
  );
}

/* Klassisk fast compute vs. autoskalering */
export function SlideStordataCompute() {
  return (
    <>
      <MilesLogo />
      <SlideTittel>Døgn med kjøretid, eller timer?</SlideTittel>
      <Kort
        x={80}
        tittel="FAST KLYNGE"
        fraSteg={1}
        punkter={[
          "størrelsen er bestemt før jobben starter",
          "en full reprosessering kan bruke flere døgn",
          "flere slike jobber samtidig, og de står i kø",
        ]}
      />
      <Kort
        x={668}
        tittel="AUTOSKALERING"
        fraSteg={4}
        punkter={[
          "kapasiteten følger datamengden i jobben",
          "døgn blir timer når vi kan bruke bredden",
          "og alt skrus ned igjen når jobben er ferdig",
        ]}
      />
      <Reveal at={7}>
        <Box
          box={[90, 540, 1100, 90]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(17),
              lineHeight: 1.5,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Regningen blir omtrent den samme. Du betaler for arbeidet, ikke for
            tiden det tar. Men du får svaret i dag i stedet for på fredag.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* HAIS – historisk uttrekk på bestilling */
export function SlideHais() {
  const steg = (at: number, x: number, tittel: string, sub: string) => (
    <Reveal at={at}>
      <Box
        box={[x, 250, 300, 160]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 18,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(20),
            color: "var(--cream)",
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            lineHeight: 1.35,
            color: "var(--mint)",
          }}
        >
          {sub}
        </div>
      </Box>
    </Reveal>
  );

  const pil = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 295, 40, 60]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--red)",
          }}
        >
          →
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <MilesLogo />
      <SlideTittel>HAIS: historisk uttrekk på bestilling</SlideTittel>
      {steg(
        1,
        110,
        "Bestilling",
        "tidsrom, område (WKT), skipstype eller MMSI",
      )}
      {pil(2, 425)}
      {steg(2, 480, "Uttrekksjobb", "leser gjennom historikken og filtrerer")}
      {pil(3, 795)}
      {steg(3, 850, "Levering", "GeoParquet eller CSV på e-post")}
      <Reveal at={4}>
        <Box
          box={[100, 460, 1080, 140]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(19),
              lineHeight: 1.5,
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            Vi vet ikke om neste bestilling er ett fartøy i én uke eller alle
            skip i ett år. Det er nettopp derfor serverless passer: jobben
            bestemmer størrelsen, ikke vi.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
