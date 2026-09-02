import type { ComponentType } from "react";

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
}

export interface PresentationDef {
  /** Brukes i URL-en, f.eks. /stoe-dataplattform */
  id: string;
  title: string;
  description: string;
  /** Vises på forsiden, f.eks. "August 2026" */
  date?: string;
  slides: SlideDef[];
}
