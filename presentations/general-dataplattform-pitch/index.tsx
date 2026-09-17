import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideForside, SlideKonsekvenser, SlideMalbilde, SlidePains } from "./intro";
import { SlideArkitektur, SlideDataflyt, SlideEvner } from "./plattform";
import {
  SlideDatakontrakter,
  SlideDataprodukter,
  SlideDomener,
  SlideKontraktBrudd,
} from "./produkt";
import { SlideAvslutning, SlideGevinster, SlideHvordan } from "./verdi";

function PlattformIkon() {
  return (
    <svg viewBox="0 0 48 48" width="42" height="42" aria-hidden>
      <rect x="8" y="10" width="32" height="28" rx="5" fill="#004047" />
      <rect x="14" y="16" width="20" height="4" rx="2" fill="#78E8DB" opacity="0.85" />
      <rect x="14" y="23" width="14" height="4" rx="2" fill="#FBF0E5" opacity="0.7" />
      <rect x="14" y="30" width="17" height="4" rx="2" fill="#78E8DB" opacity="0.45" />
    </svg>
  );
}

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "pains", name: "Mye data – for lite innsikt", component: SlidePains },
  {
    id: "konsekvenser",
    name: "Mer tid på dataarbeid enn på analyse",
    component: SlideKonsekvenser,
  },
  {
    id: "malbilde",
    name: "Fra ad-hoc uttrekk til dataprodukter",
    component: SlideMalbilde,
  },
];

const PLATTFORM: SlideDef[] = [
  {
    id: "dataflyt",
    name: "Dataplattformen",
    component: SlideDataflyt,
    steps: 4,
  },
  {
    id: "arkitektur",
    name: "Lagring, transformasjon, eksponering",
    component: SlideArkitektur,
  },
  { id: "evner", name: "Fire evner – og hva de gir", component: SlideEvner },
];

const PRODUKT: SlideDef[] = [
  {
    id: "dataprodukter",
    name: "Mer enn en tabell",
    component: SlideDataprodukter,
    steps: 2,
  },
  {
    id: "datakontrakter",
    name: "Datakontrakt: et API for data",
    component: SlideDatakontrakter,
  },
  {
    id: "kontrakt-brudd",
    name: "Kontrakten stopper feilen tidlig",
    component: SlideKontraktBrudd,
  },
  {
    id: "domener",
    name: "Domeneoppdeling og eierskap",
    component: SlideDomener,
  },
];

const VERDI: SlideDef[] = [
  { id: "gevinster", name: "Hva får du igjen?", component: SlideGevinster },
  { id: "hvordan", name: "Hvordan begynner man?", component: SlideHvordan },
  {
    id: "avslutning",
    name: "Tydelige effekter",
    component: SlideAvslutning,
  },
];

export const generalDataplattformPitch = definePresentation({
  id: "general-dataplattform-pitch",
  title: "Mer innsikt med en moderne dataplattform",
  description:
    "Generell pitch om hvorfor og hvordan bygge en moderne dataplattform – fra spredt data til kvalitetssikrede dataprodukter.",
  tags: ["pitch"],
  inProgress: true,
  icon: <PlattformIkon />,
  notes: notesRaw,
  copy: copyRaw,
  chapters: [
    { id: "intro", title: "Utfordringen", slides: INTRO },
    { id: "plattform", title: "Arkitekturen", slides: PLATTFORM },
    { id: "produkt", title: "Data som produkt", slides: PRODUKT },
    { id: "verdi", title: "Gevinst og veien dit", slides: VERDI },
  ],
});
