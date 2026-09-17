import type { ComponentType, ReactNode } from "react";

export interface SlideDef {
  id: string;
  name: string;
  component: ComponentType;
  /**
   * Antall klikk-steg i sliden. Neste-klikk går gjennom stegene før
   * neste slide. Komponenten leser gjeldende steg med useStep().
   */
  steps?: number;
  /** Speaker notes – vises kun i presentatørvisningen (/presenter) */
  notes?: string;
  /** Settes av definePresentation – aldri vist til publikum */
  chapterId?: string;
}

/** Intern oppdeling. Kapitteltittel vises bare i øvings- og presentatørvisning. */
export interface ChapterDef {
  id: string;
  title: string;
  slides: SlideDef[];
}

export const PRESENTATION_TAGS = ["conference", "pitch", "private"] as const;
export type PresentationTag = (typeof PRESENTATION_TAGS)[number];

export interface PresentationDef {
  /** Brukes i URL-en, f.eks. /26-08-26-stoe-miles-kundeevent-dataplattform-pitch */
  id: string;
  title: string;
  description: string;
  /** Vises øverst på forsiden, f.eks. "19. oktober 2026" */
  date?: string;
  /** Sted eller arrangement, f.eks. "TDC" */
  place?: string;
  /** conference = offentlig foredrag, pitch = kundemøte/salg, private = internt */
  tags?: PresentationTag[];
  /**
   * Ikon i lista på forsiden – typisk en liten SVG-figur fra slidene eller et
   * utsnitt fra et slidebilde (se `components/icons/`). Vises i en ~42 px
   * rute; uten ikon brukes standardikonet.
   */
  icon?: ReactNode;
  /** Intern oppdeling. Publikum ser den ikke. */
  chapters?: ChapterDef[];
  /** Flat liste brukt til avspilling. Avledet fra chapters når de finnes. */
  slides: SlideDef[];
}
