import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideForside, SlideKonsekvenser, SlideMalbilde, SlidePains } from "./intro";
import { SlideArkitektur, SlideDataflyt, SlideEvner } from "./plattform";
import {
  SlideDatakontrakter,
  SlideDomener,
  SlideHelhet,
  SlideKontraktBrudd,
} from "./produkt";
import { SlideAvslutning, SlideGevinster, SlideHvordan } from "./verdi";
import { BildeIkon } from "@/components/icons/BildeIkon";

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
    steps: 3,
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
  {
    id: "helhet",
    name: "Hele bildet: domener, kontrakter, produkter",
    component: SlideHelhet,
    steps: 8,
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

export const mowiDataplattform = definePresentation({
  id: "26-10-08-mowi-dataplattform",
  title: "Mowi dataplattform",
  date: "8. oktober 2026",
  place: "Mowi",
  description:
    "Dataplattform-pitch for Mowi – fra spredt data til kvalitetssikrede dataprodukter. Startet som kopi av den generelle pitchen.",
  tags: ["pitch"],
  inProgress: true,
  icon: (
    <BildeIkon
      src="/media/26-10-08-mowi-dataplattform/mowi-logo.svg"
      alt="Mowi"
    />
  ),
  notes: notesRaw,
  copy: copyRaw,
  chapters: [
    { id: "intro", title: "Utfordringen", slides: INTRO },
    { id: "plattform", title: "Arkitekturen", slides: PLATTFORM },
    { id: "produkt", title: "Data som produkt", slides: PRODUKT },
    { id: "verdi", title: "Gevinst og veien dit", slides: VERDI },
  ],
});
