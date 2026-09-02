import type { ReactNode } from "react";
import type { PresentationDef, SlideDef } from "../types";
import { Box, pt } from "../parts";
import {
  DataplattformFlyt,
  DataplattformFlytDetaljert,
} from "@/components/figures/DataplattformFlyt";
import {
  BatchFlytFigur,
  StromFlytFigur,
  BatchVsStreamingFigur,
} from "@/components/figures/BatchVsStreaming";

/*
 * 00_resources – intern samlepresentasjon for gjenbrukbare figurer og
 * komponenter, slik at vi kan se dem i full størrelse i nettleseren.
 */

function FigurSlide({
  tittel,
  fil,
  children,
}: {
  tittel: string;
  fil: string;
  children: ReactNode;
}) {
  return (
    <>
      <Box
        box={[40, 24, 1200, 36]}
        style={{ display: "flex", alignItems: "baseline", gap: 16 }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(16),
            color: "var(--burgundy)",
          }}
        >
          {tittel}
        </span>
        <span
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: pt(10),
            color: "#9a5068",
          }}
        >
          {fil}
        </span>
      </Box>
      <Box box={[20, 68, 1240, 636]}>{children}</Box>
    </>
  );
}

function SlideDataplattformFlyt() {
  return (
    <FigurSlide
      tittel="Dataplattform – dataflyt"
      fil="components/figures/DataplattformFlyt.tsx"
    >
      <DataplattformFlyt />
    </FigurSlide>
  );
}

function SlideDataplattformFlytDetaljert() {
  return (
    <FigurSlide
      tittel="Dataplattform – tre lag"
      fil="components/figures/DataplattformFlyt.tsx (detaljert)"
    >
      <DataplattformFlytDetaljert />
    </FigurSlide>
  );
}

function SlideBatchVsStreaming() {
  return (
    <FigurSlide
      tittel="Batch vs. streaming"
      fil="components/figures/BatchVsStreaming.tsx (BatchVsStreamingFigur)"
    >
      <BatchVsStreamingFigur />
    </FigurSlide>
  );
}

function SlideBatchFlyt() {
  return (
    <FigurSlide
      tittel="Batch-flyt"
      fil="components/figures/BatchVsStreaming.tsx (BatchFlytFigur)"
    >
      <BatchFlytFigur />
    </FigurSlide>
  );
}

function SlideStromFlyt() {
  return (
    <FigurSlide
      tittel="Strømme-flyt"
      fil="components/figures/BatchVsStreaming.tsx (StromFlytFigur)"
    >
      <StromFlytFigur />
    </FigurSlide>
  );
}

const SLIDES: SlideDef[] = [
  {
    id: "dataplattform-flyt",
    name: "Dataplattform – dataflyt",
    component: SlideDataplattformFlyt,
  },
  {
    id: "dataplattform-tre-lag",
    name: "Dataplattform – tre lag",
    component: SlideDataplattformFlytDetaljert,
  },
  {
    id: "batch-vs-streaming",
    name: "Batch vs. streaming",
    component: SlideBatchVsStreaming,
  },
  {
    id: "batch-flyt",
    name: "Batch-flyt",
    component: SlideBatchFlyt,
  },
  {
    id: "strom-flyt",
    name: "Strømme-flyt",
    component: SlideStromFlyt,
  },
];

export const resources: PresentationDef = {
  id: "00-resources",
  title: "00_resources",
  description: "Gjenbrukbare figurer og komponenter – intern visningsside.",
  slides: SLIDES,
};
