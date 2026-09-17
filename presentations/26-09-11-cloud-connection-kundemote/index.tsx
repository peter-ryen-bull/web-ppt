import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import {
  SlideBehovet,
  SlideForside,
  SlideMalbilde,
  SlideMerTid,
  SlideMyeData,
} from "./intro";
import {
  SlideLagring,
  SlideOversikt,
  SlideProsessering,
  SlidePublisering,
  SlideStyring,
} from "./plattform";
import {
  SlideDatadeling,
  SlideDatakontrakter,
  SlideDatakvalitet,
  SlideDataprodukter,
  SlideDeling,
  SlideDomener,
  SlideGovernance,
  SlideSikkerhet,
  SlideTeknologi,
} from "./arkitektur";

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "mye-data", name: "Mye data – for lite innsikt", component: SlideMyeData },
  {
    id: "mer-tid",
    name: "Mer tid på dataarbeid enn på analyse",
    component: SlideMerTid,
  },
  {
    id: "behovet",
    name: "Behovet: ett felles datagrunnlag",
    component: SlideBehovet,
  },
  {
    id: "malbilde",
    name: "Fra ad-hoc uttrekk til dataprodukter",
    component: SlideMalbilde,
  },
];

const PLATTFORM: SlideDef[] = [
  { id: "oversikt", name: "Dataplattformen", component: SlideOversikt },
  {
    id: "lagring",
    name: "Lagring – arkiv, struktur og governance",
    component: SlideLagring,
  },
  {
    id: "prosessering",
    name: "Prosessering – fra rådata til dataprodukt",
    component: SlideProsessering,
  },
  {
    id: "publisering",
    name: "Publisering – til forretning og bruk",
    component: SlidePublisering,
  },
  {
    id: "styring",
    name: "Styring – eierskap, tilgang og etterlevelse",
    component: SlideStyring,
  },
];

const ARKITEKTUR: SlideDef[] = [
  {
    id: "domener",
    name: "Domeneoppdeling og eierskap",
    component: SlideDomener,
  },
  {
    id: "datadeling",
    name: "Datadeling mellom domener",
    component: SlideDatadeling,
  },
  { id: "dataprodukter", name: "Dataprodukter", component: SlideDataprodukter },
  {
    id: "datakontrakter",
    name: "Datakontrakter",
    component: SlideDatakontrakter,
  },
  {
    id: "datakvalitet",
    name: "Datakvalitet og datatester",
    component: SlideDatakvalitet,
  },
  {
    id: "deling",
    name: "Deling, tilgang og kostnadsfordeling",
    component: SlideDeling,
  },
  {
    id: "sikkerhet",
    name: "Sikkerhet og infrastruktur",
    component: SlideSikkerhet,
  },
];

const GOVERNANCE: SlideDef[] = [
  {
    id: "governance",
    name: "Roller, beslutninger og etterlevelse",
    component: SlideGovernance,
  },
];

const TEKNOLOGI: SlideDef[] = [
  {
    id: "teknologi",
    name: "Teknologivalg",
    component: SlideTeknologi,
  },
];

export const cloudConnectionKundemote = definePresentation({
  id: "26-09-11-cloud-connection-kundemote",
  title: "Struktur og oversikt med en moderne dataplattform",
  description:
    "Kundemøte om hvorfor og hvordan bygge en moderne dataplattform – fra spredt data til kvalitetssikrede dataprodukter.",
  date: "11. september 2026",
  place: "Cloud Connection",
  notes: notesRaw,
  chapters: [
    { id: "intro", title: "Bakgrunn og målbilde", slides: INTRO },
    { id: "plattform", title: "Plattformen", slides: PLATTFORM },
    { id: "arkitektur", title: "Arkitektur", slides: ARKITEKTUR },
    { id: "governance", title: "Governance", slides: GOVERNANCE },
    { id: "teknologi", title: "Teknologi", slides: TEKNOLOGI },
  ],
});
