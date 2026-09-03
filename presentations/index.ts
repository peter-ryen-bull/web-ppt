import type { PresentationDef, SlideDef } from "./types";
import { resources } from "./00-resources";
import { historienOmDataplattform } from "./01_historien_om_dataplattform";
import { stoeDataplattform } from "./stoe-dataplattform";
import { ndcKystverketStory } from "./26-ndc-kystverket-story";

/**
 * Registeret over alle presentasjoner i appen.
 * Legg til nye presentasjoner her – de dukker automatisk opp på forsiden.
 */
export const PRESENTATIONS: PresentationDef[] = [
  resources,
  historienOmDataplattform,
  stoeDataplattform,
  ndcKystverketStory,
];

export function getPresentation(id: string): PresentationDef | undefined {
  return PRESENTATIONS.find((p) => p.id === id);
}

export type { PresentationDef, SlideDef };
