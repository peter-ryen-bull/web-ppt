import type { ReactNode } from "react";
import { Box, BulletItem, BulletList, MilesLogo, Reveal, pt } from "../parts";
import { Isfjell, KlyngeAuto, KlyngeFast } from "@/components/figures/strek";

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
      <MilesLogo />
      <SlideTittel>The stream is small. The history is big.</SlideTittel>
      {tall(1, 40, VOLUM.perDogn, "of raw data per day", "var(--burgundy)")}
      {tall(2, 340, VOLUM.perAar, "per year", "var(--burgundy)")}
      {tall(
        3,
        640,
        VOLUM.historikk,
        "of AIS history back to 2005",
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
            Daily processing is easy. Replaying twenty-one years is the hard part.
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
      <MilesLogo />
      <SlideTittel>Databricks compute</SlideTittel>
      <Box box={[48, 108, 900, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Clusters are managed VMs in Azure
        </div>
      </Box>
      <BulletList
        box={[48, 200, 1180, 380]}
        fromStep={1}
        gap={36}
        size={22}
        items={[
          "You scale the cluster to the volume",
          "1 TB processed? You need a fairly big VM",
          "Data is chunked. It doesn't all have to fit in memory.",
          "The VM size decides how long the job takes",
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
      <MilesLogo />
      <SlideTittel>Days of compute, or hours?</SlideTittel>
      <Kort
        x={80}
        tittel="FIXED CLUSTER"
        fraSteg={1}
        figur={<KlyngeFast />}
        punkter={[
          "the size is decided before the job starts",
          "a full reprocessing can take several days",
          "run a few of those at once, and they queue up",
        ]}
      />
      <Kort
        x={668}
        tittel="AUTOSCALING"
        fraSteg={4}
        figur={<KlyngeAuto />}
        punkter={[
          "capacity follows the amount of data in the job",
          "days become hours when we can go wide",
          "and everything scales back down when the job is done",
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
            Same bill. The answer today, not on Friday.
          </div>
        </Box>
      </Reveal>
    </>
  );
}
