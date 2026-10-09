import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideForside, SlidePrimitiver, SlideProblemet, SlideToModeller } from "./intro";
import {
  SlideConfidence,
  SlideKapittel,
  SlideStegAlle,
  SlideStegChoice,
  SlideStegNoul,
  SlideStegScore,
} from "./tutorial";
import { SlideBatching, SlideForskning, SlideKalkulator } from "./tokens";
import { SlideArbeidsdeling, SlideBegrensninger, SlideOppsummering } from "./avslutning";

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "problemet", name: "Klassifisering med LLM i dag", component: SlideProblemet },
  { id: "to-modeller", name: "Token for token vs. ett pass", component: SlideToModeller, steps: 1 },
  { id: "primitiver", name: "Choice, Score og Noul", component: SlidePrimitiver },
];

const TUTORIAL: SlideDef[] = [
  { id: "kap-tutorial", name: "Kapittel: prøv selv", component: SlideKapittel },
  { id: "steg-noul", name: "Steg 1: Noul", component: SlideStegNoul },
  { id: "steg-choice", name: "Steg 2: Choice", component: SlideStegChoice },
  { id: "steg-score", name: "Steg 3: Score", component: SlideStegScore },
  { id: "steg-alle", name: "Steg 4: alt i ett kall + LLM", component: SlideStegAlle },
  { id: "steg-confidence", name: "Steg 5: confidence-styrt ruting", component: SlideConfidence },
];

const TOKENS: SlideDef[] = [
  { id: "kap-tokens", name: "Kapittel: tokens og kostnad", component: SlideKapittel },
  { id: "batching", name: "Mange spørsmål, ett kall", component: SlideBatching },
  { id: "kalkulator", name: "Kostnadskalkulator", component: SlideKalkulator },
  { id: "forskning", name: "Hva sier forskningen", component: SlideForskning },
];

const AVSLUTNING: SlideDef[] = [
  { id: "begrensninger", name: "Hvor Jev bommer", component: SlideBegrensninger },
  { id: "arbeidsdeling", name: "Jev, kode og LLM", component: SlideArbeidsdeling },
  { id: "oppsummering", name: "Oppsummering og kilder", component: SlideOppsummering },
];

export const jevDemo = definePresentation({
  id: "jev-demo",
  title: "Jev: en modell som ikke skriver",
  description:
    "Interaktiv demo av TypeSafe Jev for klassifisering: hvordan den skiller seg fra vanlige LLM-er, live kall med tokenforbruk og kostnad.",
  date: "Oktober 2026",
  place: "Demo",
  inProgress: true,
  notes: notesRaw,
  copy: copyRaw,
  chapters: [
    { id: "intro", title: "Hva er Jev", slides: INTRO },
    { id: "tutorial", title: "Prøv selv", slides: TUTORIAL },
    { id: "tokens", title: "Tokens og kostnad", slides: TOKENS },
    { id: "avslutning", title: "Begrensninger og bruk", slides: AVSLUTNING },
  ],
});
