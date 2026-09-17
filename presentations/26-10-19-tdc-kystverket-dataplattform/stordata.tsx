import type { ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, BulletItem, BulletList, Reveal, pt } from "../parts";
import { Isfjell, KlyngeAuto, KlyngeFast } from "./figurer/strek";

function SlideTittel({ children }: { children: ReactNode }) {
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
    i: number,
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
          <Copy k="stats" i={i} field="value" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(15),
            color: "var(--burgundy-2)",
            textAlign: "center",
          }}
        >
          <Copy k="stats" i={i} field="label" />
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTittel>
        <Copy k="title" />
      </SlideTittel>
      {tall(1, 40, 0, "var(--burgundy)")}
      {tall(2, 340, 1, "var(--burgundy)")}
      {tall(3, 640, 2, "var(--red)")}
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
            <Copy k="lead" />
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
      <SlideTittel>
        <Copy k="title" />
      </SlideTittel>
      <Box box={[48, 108, 900, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <BulletList
        box={[48, 200, 1180, 380]}
        fromStep={1}
        gap={36}
        size={22}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
          <Copy k="items" i={3} />,
        ]}
      />
    </>
  );
}

function Kort({
  x,
  card,
  fraSteg,
  figur,
}: {
  x: number;
  card: number;
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
        <Copy k="cards" i={card} field="label" />
      </span>
      <div style={{ marginTop: 30, display: "grid", gap: 22 }}>
        {[0, 1, 2].map((i) => (
          <BulletItem key={i} at={fraSteg + i} size={15} color="var(--burgundy)">
            <Copy k={`cards.${card}.items`} i={i} />
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
      <SlideTittel>
        <Copy k="title" />
      </SlideTittel>
      <Kort
        x={80}
        card={0}
        fraSteg={1}
        figur={<KlyngeFast />}
      />
      <Kort
        x={668}
        card={1}
        fraSteg={4}
        figur={<KlyngeAuto />}
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
            <Copy k="punchline" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}
