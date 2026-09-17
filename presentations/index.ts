import type { ChapterDef, PresentationDef, SlideDef } from "./types";
import { boosterSmartOcean } from "./22-03-23-booster-smart-ocean";
import { tdcDuErIkkeDum } from "./24-10-22-tdc-du-er-ikke-dum";
import { tdcStrings } from "./25-10-20-tdc-strings";
import { oppdalTechDuErIkkeDum } from "./26-02-06-oppdal-tech-du-er-ikke-dum";
import { boosterDuErIkkeDum } from "./26-03-11-booster-du-er-ikke-dum";
import { offentligPaas } from "./26-05-26-offentlig-paas";
import { stoeDataplattform } from "./26-08-26-stoe-miles-kundeevent-dataplattform-pitch";
import { cloudConnectionKundemote } from "./26-09-11-cloud-connection-kundemote";
import { ndcKystverketStory } from "./26-09-17-ndc-kystverket-dataplatform";
import { tdcKystverketDataplattform } from "./26-10-19-tdc-kystverket-dataplattform";

export { definePresentation, embedAsChapter } from "./chapters";
export { eventDateFromId, isInProgress } from "./status";

/**
 * Registeret over alle presentasjoner i appen.
 * Legg til nye presentasjoner her – de dukker automatisk opp på forsiden.
 * Under arbeid: `inProgress: true` eller fremtidig `YY-MM-DD` i id-en.
 * Resten er arkiv (se AGENTS.md).
 */
export const PRESENTATIONS: PresentationDef[] = [
  boosterSmartOcean,
  tdcDuErIkkeDum,
  tdcStrings,
  oppdalTechDuErIkkeDum,
  boosterDuErIkkeDum,
  offentligPaas,
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
  SlideCopy,
  DeckCopy,
  CopyField,
  CopyMap,
} from "./types";
