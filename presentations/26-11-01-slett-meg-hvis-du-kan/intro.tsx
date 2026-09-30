"use client";

import { Copy } from "@/components/Copy";
import { Box, MilesLogo, Reveal, pt } from "../parts";
import { Kode, Kort, Stempel, sans, serif } from "./ui";

/* Forside */
export function SlideForside() {
  return (
    <>
      <MilesLogo />
      <Box box={[81.3, 170, 1000, 150]}>
        <Copy
          k="title"
          as="div"
          style={{
            ...serif,
            fontSize: pt(66),
            lineHeight: 1.08,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Box box={[81.3, 330, 1000, 80]}>
        <Copy
          k="subtitle"
          as="div"
          style={{
            ...sans,
            fontSize: pt(22),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        />
      </Box>
      <Kode
        box={[81.3, 470, 560, 132]}
        tone="lys"
        size={20}
        linjer={["DELETE FROM kunde", "WHERE id = 42;"]}
      />
      <Box box={[81.3, 630, 800, 40]}>
        <Copy
          k="speaker"
          as="div"
          style={{ ...sans, fontSize: pt(16), color: "var(--burgundy)" }}
        />
      </Box>
    </>
  );
}

/* Åpning: e-posten fra Kari (tenkt eksempel) */
export function SlideScene() {
  return (
    <>
      <Box box={[160, 60, 960, 40]}>
        <Copy
          k="kicker"
          as="div"
          style={{
            ...sans,
            fontSize: pt(16),
            letterSpacing: 1.4,
            color: "var(--red)",
          }}
        />
      </Box>
      <Kort box={[160, 120, 960, 300]} bar="var(--red)" barSide="left">
        <div style={{ padding: "30px 40px" }}>
          <div
            style={{
              ...sans,
              fontSize: pt(15),
              lineHeight: 1.6,
              color: "var(--burgundy)",
              paddingBottom: 14,
              marginBottom: 20,
              borderBottom: "1.5px solid var(--cream-dark)",
            }}
          >
            <div>
              <strong>Fra: </strong>
              <Copy k="fra" />
            </div>
            <div>
              <strong>Emne: </strong>
              <Copy k="emne" />
            </div>
          </div>
          <Copy
            k="tekst"
            as="div"
            style={{
              ...serif,
              fontSize: pt(26),
              lineHeight: 1.35,
              color: "var(--burgundy)",
            }}
          />
        </div>
      </Kort>
      <Reveal at={1}>
        <Box box={[160, 460, 960, 70]}>
          <Copy
            k="frist"
            as="div"
            style={{ ...serif, fontSize: pt(44), color: "var(--red)" }}
          />
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box box={[160, 550, 960, 70]}>
          <Copy
            k="sporsmal"
            as="div"
            style={{ ...serif, fontSize: pt(34), color: "var(--burgundy)" }}
          />
        </Box>
      </Reveal>
      <Stempel box={[920, 430, 200, 24]} />
    </>
  );
}
