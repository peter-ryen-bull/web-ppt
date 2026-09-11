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
        subtitle="Four effects, with examples from the sea route"
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
      <Reveal at={1}>
        <Box
          box={[80, 480, 1100, 130]}
          style={{
            borderLeft: "3px solid var(--red)",
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(22),
              lineHeight: 1.35,
              color: "var(--burgundy-2)",
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
      etikett="Quality"
      paastand="Data you dare to make decisions on"
      eksempel="The time series starts in 2016. On purpose."
      figur={<SkjoldHake />}
    />
  );
}

export function SlideEffektEtterlevelse() {
  return (
    <Effekt
      nummer="2"
      etikett="Compliance"
      paastand="The rules are built in once, in one place"
      eksempel="The privacy filter lives in one place."
      figur={<Hengelas />}
    />
  );
}

export function SlideEffektEffektivitet() {
  return (
    <Effekt
      nummer="3"
      etikett="Efficiency"
      paastand="Self-service instead of requests"
      eksempel="hais.kystverket.no. Order history yourself."
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
      eksempel="The model runs where the data already lives."
      figur={<BrikkeMedGnist />}
    />
  );
}
