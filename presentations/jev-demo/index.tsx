import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideCasene, SlideForside, SlidePrimitiver } from "./intro";
import { SlideJsonForsok, SlideProblemet, SlideToModeller } from "./utgangspunkt";
import {
  SlideConfidence,
  SlideKapittel,
  SlideStegAlle,
  SlideStegChoice,
  SlideStegNoul,
  SlideStegScore,
} from "./tutorial";
import { SlideBatching, SlideForskning, SlideForskningJaNei, SlideKalkulator } from "./tokens";
import { SlideFart, SlideKlassifiser } from "./fart";
import { SlideSammenlign } from "./sammenlign";
import { SlideArbeidsdeling, SlideBegrensninger, SlideKonklusjon } from "./avslutning";

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "casene", name: "De tre casene", component: SlideCasene },
  { id: "problemet", name: "Utgangspunktet: fritekst fra OpenAI", component: SlideProblemet },
  { id: "json-forsok", name: "Be om JSON – 100 ganger", component: SlideJsonForsok },
  { id: "to-modeller", name: "OpenAI og Jev på samme tekst", component: SlideToModeller },
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

const FART: SlideDef[] = [
  { id: "kap-fart", name: "Kapittel: fart", component: SlideKapittel },
  { id: "klassifiser", name: "Klassifiser hva som helst", component: SlideKlassifiser },
  { id: "fart", name: "Hundrevis på et sekund", component: SlideFart },
  { id: "sammenlign", name: "Jev mot OpenAI", component: SlideSammenlign },
];

const TOKENS: SlideDef[] = [
  { id: "kap-tokens", name: "Kapittel: tokens og kostnad", component: SlideKapittel },
  { id: "batching", name: "Mange spørsmål, ett kall", component: SlideBatching },
  { id: "kalkulator", name: "Kostnadskalkulator", component: SlideKalkulator },
  { id: "forskning", name: "Hva sier forskningen", component: SlideForskning },
  { id: "forskning-janei", name: "Studien: ja/nei mot skala", component: SlideForskningJaNei },
];

const AVSLUTNING: SlideDef[] = [
  { id: "begrensninger", name: "Hvor Jev bommer", component: SlideBegrensninger },
  { id: "arbeidsdeling", name: "Jev, kode og LLM", component: SlideArbeidsdeling },
  { id: "konklusjon", name: "Konklusjon: ikke bedre, men raskere og billigere", component: SlideKonklusjon },
];

export const jevDemo = definePresentation({
  id: "jev-demo",
  title: "Jev: en modell som ikke skriver",
  description:
    "Interaktiv demo av TypeSafe Jev for klassifisering: hvordan den skiller seg fra vanlige LLM-er, live kall med tokenforbruk og kostnad.",
  date: "Oktober 2026",
  place: "Demo",
  inProgress: true,
  clickToProceed: false,
  notes: notesRaw,
  copy: copyRaw,
  chapters: [
    { id: "intro", title: "Hva er Jev", slides: INTRO },
    { id: "tutorial", title: "Prøv selv", slides: TUTORIAL },
    { id: "fart", title: "Fart", slides: FART },
    { id: "tokens", title: "Tokens og kostnad", slides: TOKENS },
    { id: "avslutning", title: "Begrensninger og bruk", slides: AVSLUTNING },
  ],
});
