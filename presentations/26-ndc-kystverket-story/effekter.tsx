import type { ReactNode } from "react";
import { Box, ChapterSlide, Reveal, pt } from "../parts";
import {
  Automatikk,
  BrikkeMedGnist,
  EffektRad,
  Hengelas,
  SkjoldHake,
} from "@/components/figures/strek";

/* Kapittel: Hva får du igjen? */
export function SlideEffekter() {
  return (
    <>
      <ChapterSlide
        title="What do you get out of it?"
        subtitle="Four effects, with examples from the coastline"
      />
      <Box box={[140, 60, 1000, 150]}>
        <EffektRad />
      </Box>
    </>
  );
}

/* Én effekt per slide: nummer, påstand, en liten figur og ett konkret eksempel fra Kystverket */
function Effekt({
  nummer,
  etikett,
  paastand,
  eksempel,
  figur,
}: {
  nummer: string;
  etikett: string;
  paastand: string;
  eksempel: string;
  figur: ReactNode;
}) {
  return (
    <>
      <Box box={[760, 110, 420, 150]}>{figur}</Box>
      <Box box={[80, 120, 300, 200]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(120),
            lineHeight: 1,
            color: "var(--red)",
          }}
        >
          {nummer}
        </div>
      </Box>
      <Box box={[80, 300, 1120, 60]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 2,
            color: "#9a5068",
          }}
        >
          {etikett.toUpperCase()}
        </div>
      </Box>
      {paastand ? (
        <Box box={[80, 335, 1120, 120]}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(46),
              lineHeight: 1.15,
              color: "var(--burgundy)",
            }}
          >
            {paastand}
          </div>
        </Box>
      ) : null}
      <Reveal at={1}>
        <Box
          box={[80, 480, 1100, 130]}
          style={{
            height: "auto",
            borderLeft: "3px solid var(--red)",
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(22),
              lineHeight: 1.35,
              color: "var(--red)",
            }}
          >
            {eksempel}
          </div>
        </Box>
      </Reveal>
    </>
  );
}

export function SlideEffektKvalitet() {
  return (
    <Effekt
      nummer="1"
      etikett="Data quality"
      paastand="Data you can trust"
      eksempel="Data that is tested, quality assured and updated."
      figur={<SkjoldHake />}
    />
  );
}

export function SlideEffektEtterlevelse() {
  return (
    <Effekt
      nummer="2"
      etikett="Compliance"
      paastand="Built-in compliance"
      eksempel="Audit logs. PII masking."
      figur={<Hengelas />}
    />
  );
}

export function SlideEffektEffektivitet() {
  return (
    <Effekt
      nummer="3"
      etikett="Self-service"
      paastand="Self-service data"
      eksempel="Chat with your data. Order it yourself."
      figur={<Automatikk />}
    />
  );
}

export function SlideEffektFremtid() {
  return (
    <Effekt
      nummer="4"
      etikett="Future-ready"
      paastand="AI where the data already lives"
      eksempel="The model runs where the data already lives. Integrated in your pipelines."
      figur={<BrikkeMedGnist />}
    />
  );
}
