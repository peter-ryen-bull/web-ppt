import type { ChapterDef, PresentationDef, SlideDef } from "./types";
import { tdcStrings } from "./25-10-20-tdc-strings";
import { stoeDataplattform } from "./26-08-26-stoe-miles-kundeevent-dataplattform-pitch";
import { cloudConnectionKundemote } from "./26-09-11-cloud-connection-kundemote";
import { ndcKystverketStory } from "./26-09-17-ndc-kystverket-dataplatform";
import { tdcKystverketDataplattform } from "./26-10-19-tdc-kystverket-dataplattform";
import { oppdalTechDuErIkkeDum } from "./26-02-06-oppdal-tech-du-er-ikke-dum";

export { definePresentation, embedAsChapter } from "./chapters";

/**
 * Registeret over alle presentasjoner i appen.
 * Legg til nye presentasjoner her – de dukker automatisk opp på forsiden.
 * Se AGENTS.md for hvilke som er aktive og hvilke som er arkiverte.
 */
export const PRESENTATIONS: PresentationDef[] = [
  tdcStrings,
  oppdalTechDuErIkkeDum,
  stoeDataplattform,
  cloudConnectionKundemote,
  ndcKystverketStory,
  tdcKystverketDataplattform,
];

export function getPresentation(id: string): PresentationDef | undefined {
  return PRESENTATIONS.find((p) => p.id === id);
}

export { PRESENTATION_TAGS } from "./types";
export type {
  PresentationDef,
  SlideDef,
  ChapterDef,
  PresentationTag,
} from "./types";
