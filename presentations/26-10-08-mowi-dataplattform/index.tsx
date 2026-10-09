import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideForside, SlideKonsekvenser, SlideMalbilde, SlidePains } from "./intro";
import {
  SlideArkitektur,
  SlideDataflyt,
  SlideEvner,
  SlideKiChat,
} from "./plattform";
import {
  SlideDatakontrakter,
  SlideDomener,
  SlideKontraktBrudd,
} from "./produkt";
import { SlideAvslutning, SlideGevinster, SlideHvordan } from "./verdi";
import {
  SlideBunnbelastning,
  SlideLaserplassering,
  SlideOperasjonsvindu,
} from "./aquaplatform";
import { SlideReferanse } from "./referanse";
import {
  SlideFemManeder,
  SlideLeveranse,
  SlideTolvManeder,
} from "./tidslinje";
import { SlideTeam } from "./team";
import { REFERANSER } from "./referanser";
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
  {
    id: "ki-chat",
    name: "KI i plattformen: chat med dataene",
    component: SlideKiChat,
  },
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

const AQUAPLATFORM: SlideDef[] = [
  {
    id: "aquaplatform-referanse",
    name: "Referanseprosjekt: AquaPlatform",
    component: SlideReferanse,
  },
  {
    id: "aquaplatform-operasjonsvindu",
    name: "AquaPlatform: operasjonsvindu",
    component: SlideOperasjonsvindu,
  },
  {
    id: "aquaplatform-laserplassering",
    name: "AquaPlatform: laserplassering",
    component: SlideLaserplassering,
  },
  {
    id: "aquaplatform-bunnbelastning",
    name: "AquaPlatform: bunnbelastning",
    component: SlideBunnbelastning,
  },
];

const TIDSLINJE: SlideDef[] = [
  {
    id: "leveranse",
    name: "Foreslått første leveranse",
    component: SlideLeveranse,
  },
  {
    id: "tidslinje-fem",
    name: "Seks måneder: tre analyser",
    component: SlideFemManeder,
    steps: 2,
  },
  {
    id: "tidslinje-tolv",
    name: "Seks måneder: fra MVP til tre analyser",
    component: SlideTolvManeder,
    steps: 3,
  },
  { id: "team", name: "Foreslått team", component: SlideTeam },
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
    {
      id: "aquaplatform",
      title: "KLERI/MILES aquaplatform",
      slides: AQUAPLATFORM,
    },
    { id: "referanser", title: "Miles-referanser", slides: REFERANSER },
    { id: "tidslinje", title: "Forslag og tidslinje", slides: TIDSLINJE },
  ],
});
