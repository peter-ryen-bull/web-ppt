import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideBilde } from "./slides";

function s(n: number, id: string, name: string): SlideDef {
  function Slide() {
    return <SlideBilde n={n} alt={name} />;
  }
  Slide.displayName = `Slide${String(n).padStart(2, "0")}`;
  return { id, name, component: Slide };
}

const APNING: SlideDef[] = [
  s(1, "bea-cue", "Bea"),
  s(2, "forside", "Dataplattform for et datadrevet politi"),
  s(3, "jonas", "Lastebil-Jonas"),
  s(4, "anmeldelser-14", "14 anmeldelser"),
  s(5, "anmeldelser-systemer", "14 anmeldelser til ulike IT-systemer"),
  s(6, "anmeldelser-sammenheng", "Ingen så sakene i sammenheng"),
  s(7, "oss", "Beatrice og Peter"),
];

const BEHOV: SlideDef[] = [
  s(8, "ssb", "1000 anmeldelser om dagen"),
  s(9, "organisasjon", "Politiet som organisasjon"),
  s(10, "datalandskap", "Dagens datalandskap"),
  s(11, "sitater", "Sitater fra organisasjonen"),
  s(12, "peter-cue-barn", "Peter"),
  s(13, "barn-forsvunnet", "Et barn er forsvunnet"),
];

const PLATTFORM: SlideDef[] = [
  s(14, "hva-er-dataplattform", "Dataplattform – hva er det?"),
  s(15, "anmeldelse", "Anmeldelse"),
  s(16, "anmeldelse-henlegg", "Anmeldelse – henleggelse"),
  s(17, "anmeldelse-produkt", "Anmeldelse som produkt"),
  s(18, "dataprodukter", "Dataprodukter"),
  s(19, "dataprodukter-effekter", "Dataprodukter – effekter"),
  s(20, "databricks", "Databricks"),
  s(21, "databricks-workspace", "Databricks workspace"),
  s(22, "london-notebook", "London Police-notebook"),
  s(23, "jobs-pipelines", "Jobs og pipelines"),
  s(24, "unity-catalog", "Unity Catalog"),
  s(25, "london-kart", "London-kart"),
];

const BYGGING: SlideDef[] = [
  s(26, "piloter", "Piloter"),
  s(27, "teamstruktur", "Teamstruktur"),
  s(28, "vending-machine", "Self-service, vending machine"),
  s(29, "datakatalog", "Datakatalog"),
  s(30, "bea-cue-katalog", "Bea"),
  s(31, "datakatalog-sokbar", "Datakatalogen gjør dataene søkbare"),
  s(32, "flyt-1", "Datakilder og konsumenter"),
  s(33, "flyt-2", "Søke om data"),
  s(34, "datahub", "DataHub"),
  s(35, "datahub-arkitektur", "DataHub-arkitektur"),
];

const STRATEGI: SlideDef[] = [
  s(36, "peter-cue-utfordringer", "Peter"),
  s(37, "utfordringer", "Utfordringer"),
  s(38, "veien", "Veien videre"),
  s(39, "top-down", "Datastrategi – top down"),
  s(40, "bottom-up", "Datastrategi – bottom up"),
  s(41, "parallelt", "Top down og bottom up"),
];

const AVSLUTNING: SlideDef[] = [
  s(42, "bea-cue-fremtid", "Bea"),
  s(43, "fremtiden", "Fremtidens datadrevne politiarbeid"),
  s(44, "fremtiden-plattform", "Politiplattform"),
  s(45, "takk", "Takk"),
];

const EKSTRA: SlideDef[] = [
  s(46, "visjon-1", "Visjon 1"),
  s(47, "visjon-2", "Visjon 2"),
  s(48, "oss-alt", "Beatrice og Peter (alt)"),
  s(49, "kilder", "Datakilder"),
  s(50, "plattform-kilder", "Plattform og kilder"),
  s(51, "trakt", "Dataprodukter i trakten"),
  s(52, "katalog-kilder", "Katalog og kilder"),
  s(53, "konsumenter", "Datakonsumenter"),
  s(54, "katalog-konsumenter", "Katalog og konsumenter"),
];

export const offentligPaas = definePresentation({
  id: "26-05-26-offentlig-paas",
  title: "Dataplattform for et datadrevet politi",
  description:
    "Utfordringer, hindringer og store muligheter i politiets dataplattform. Offentlig PaaS-fagdag 2026, sammen med Beatrice Kiær.",
  date: "26. mai 2026",
  place: "Offentlig PaaS, Forskningsparken",
  tags: ["conference"],
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Lastebil-Jonas", slides: APNING },
    { id: "behov", title: "Behovet", slides: BEHOV },
    { id: "plattform", title: "Hva er en dataplattform", slides: PLATTFORM },
    { id: "bygging", title: "Slik bygger vi", slides: BYGGING },
    { id: "strategi", title: "Utfordringer og strategi", slides: STRATEGI },
    { id: "avslutning", title: "Fremtiden", slides: AVSLUTNING },
    { id: "ekstra", title: "Ekstra (skjult i originalen)", slides: EKSTRA },
  ],
});
