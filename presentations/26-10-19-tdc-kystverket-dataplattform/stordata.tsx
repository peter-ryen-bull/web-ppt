import type { ReactNode } from "react";
import { Box, BulletItem, BulletList, Reveal, pt } from "../parts";
import { Isfjell, KlyngeAuto, KlyngeFast } from "./figurer/strek";

const VOLUM = {
  perDogn: "~5 GB",
  perAar: "~1.8 TB",
  historikk: "~40 TB",
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
        box={[x, 210, 300, 190]}
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
      <SlideTittel>Strømmen er liten. Historikken er stor.</SlideTittel>
      {tall(1, 40, VOLUM.perDogn, "rådata i døgnet", "var(--burgundy)")}
      {tall(2, 340, VOLUM.perAar, "i året", "var(--burgundy)")}
      {tall(
        3,
        640,
        VOLUM.historikk,
        "AIS-historikk tilbake til 2005",
        "var(--red)",
      )}
      <Reveal at={3}>
        <Box box={[940, 250, 320, 112]}>
          <Isfjell />
        </Box>
      </Reveal>
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
            Døgnet er enkelt. Det tunge er å kjøre gjennom tjueen år på nytt.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Databricks-compute: klynger er administrerte VM-er i Azure */
export function SlideDatabricksCompute() {
  return (
    <>
      <SlideTittel>Databricks-compute</SlideTittel>
      <Box box={[48, 108, 900, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Klynger er administrerte VM-er i Azure
        </div>
      </Box>
      <BulletList
        box={[48, 200, 1180, 380]}
        fromStep={1}
        gap={36}
        size={22}
        items={[
          "Du skalerer klyngen etter volumet",
          "1 TB som skal prosesseres? Da trenger du en ganske stor VM",
          "Dataene deles opp. Alt trenger ikke å få plass i minnet.",
          "VM-størrelsen bestemmer hvor lang tid jobben tar",
        ]}
      />
    </>
  );
}

function Kort({
  x,
  tittel,
  punkter,
  fraSteg,
  figur,
}: {
  x: number;
  tittel: string;
  punkter: string[];
  /** Klikk-steget der første punkt dukker opp */
  fraSteg: number;
  figur: ReactNode;
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
      <div style={{ position: "absolute", right: 30, top: 18, width: 200, height: 60 }}>
        {figur}
      </div>
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
          <BulletItem key={p} at={fraSteg + i} size={15} color="var(--burgundy)">
            {p}
          </BulletItem>
        ))}
      </div>
    </Box>
  );
}

/* Klassisk fast compute vs. autoskalering */
export function SlideStordataCompute() {
  return (
    <>
      <SlideTittel>Døgn med kjøretid, eller timer?</SlideTittel>
      <Kort
        x={80}
        tittel="FAST KLYNGE"
        fraSteg={1}
        figur={<KlyngeFast />}
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
        figur={<KlyngeAuto />}
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
            Samme regning. Svaret i dag, ikke på fredag.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
