import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { SlideHej, SlideOppdrag } from "./intro";
import {
  SlideGiAndre,
  SlideSmartOcean,
  SlideJocko,
  SlideTruman,
  SlideGiAndreIgjen,
  SlideGiAndreAeren,
  SlideFuld,
  SlideTeamwork,
  SlideGallup,
} from "./aeren";
import {
  SlideLaerA,
  SlideSvigermor,
  SlideLaerAIgjen,
  SlideLaerAlleNavn,
  SlideVarme,
} from "./navn";
import {
  SlideSnakkI,
  SlideJonas,
  SlideSnakkIBilder,
  SlideIteam,
  SlideMlk,
  SlideJobs,
  SlideStanford,
} from "./bilder";
import {
  SlideEliminer,
  SlideBowling,
  SlideEliminerIgjen,
  SlideEliminerDistraksjoner,
  SlideSkjermtid,
  SlideEliminerDistraksjonerIgjen,
} from "./distraksjoner";
import {
  SlideVaerSulten,
  SlideHjernen,
  SlideLaringsmetoder,
  SlideVaerSultenIgjen,
  SlideVaerSultenLaere,
  SlideZlatan,
  SlideFagligAutoritet,
} from "./laere";
import {
  SlideRepetisjonBlank,
  SlideProsent,
  SlideProsent20,
  SlideProsent40,
  SlideProsent60,
  SlideProsent80,
  SlideProsentSvar,
  SlideRepetisjonBlank2,
  SlideRepetisjon,
  SlideKognitivtBlank,
  SlideHuskForAaHuske,
  SlideGraf,
  SlideMerKrevende,
  SlideMerEffektivt,
  SlideKognitivtBlank2,
  SlideKognitivtKrevende,
} from "./repetisjon";
import {
  SlideSamletSpredt,
  SlideSamletSpredtPeace,
  SlideSamletSpredtHeart,
  SlideSamletSpredtPeek,
  SlideToGangerBedre,
  SlideIntervaller1,
  SlideIntervaller2,
  SlideIntervaller3,
  SlideIntervaller4,
  SlideIntervaller5,
  SlideIntervaller6,
  SlideIntervaller7,
  SlideIntervaller8,
  SlideAnki,
  SlideAnkiKort,
  SlideAnkiKortAapent,
} from "./spacing";
import { Box, pt } from "../parts";
import { Chrome, CUTIVE } from "./chrome";

function SlideOppsummert() {
  return (
    <>
      <Chrome badge="🧠♥️" />
      <Box box={[93.3, 97.1, 1100, 575.2]}>
        <div style={{ ...CUTIVE, fontSize: pt(50), lineHeight: 1.45 }}>
          Oppsummert:
          <br />
          ♥️ Gi andre æren
          <br />
          ♥️ Lær alle navn
          <br />
          🧠 Snakk i bilder
          <br />
          🧠 Eliminer distraksjoner
          <br />
          🧠 Vær sulten på å lære
        </div>
      </Box>
    </>
  );
}

const INTRO: SlideDef[] = [
  { id: "hej", name: "Hej", component: SlideHej },
  { id: "oppdrag", name: "Oppdragene", component: SlideOppdrag },
];

const AEREN: SlideDef[] = [
  { id: "gi-andre", name: "Gi andre æ____", component: SlideGiAndre },
  { id: "smart-ocean", name: "Smart Ocean", component: SlideSmartOcean },
  { id: "jocko", name: "Jocko Willink: tillit", component: SlideJocko },
  { id: "truman", name: "Harry Truman", component: SlideTruman },
  { id: "gi-andre-2", name: "Gi andre æ____", component: SlideGiAndreIgjen },
  { id: "gi-andre-aeren", name: "Gi andre æren", component: SlideGiAndreAeren },
  { id: "fuld", name: "Richard Fuld", component: SlideFuld },
  { id: "teamwork", name: "Extreme teamwork", component: SlideTeamwork },
  { id: "gallup", name: "Gallup: recognition", component: SlideGallup },
];

const NAVN: SlideDef[] = [
  { id: "laer-a", name: "Lær a____", component: SlideLaerA },
  { id: "svigermor", name: "Første middag", component: SlideSvigermor },
  { id: "laer-a-2", name: "Lær a____", component: SlideLaerAIgjen },
  { id: "laer-alle-navn", name: "Lær alle navn", component: SlideLaerAlleNavn },
  { id: "varme", name: "Varme", component: SlideVarme },
];

const BILDER: SlideDef[] = [
  { id: "snakk-i", name: "S_____k i b______", component: SlideSnakkI },
  { id: "jonas", name: "Lastebil-Jonas", component: SlideJonas },
  { id: "snakk-i-bilder", name: "Snakk i bilder", component: SlideSnakkIBilder },
  { id: "iteam", name: "iteam / godstoget", component: SlideIteam },
  { id: "mlk", name: "Martin Luther King", component: SlideMlk },
  { id: "jobs", name: "Steve Jobs", component: SlideJobs },
  { id: "stanford", name: "Stanford-studien", component: SlideStanford },
];

const DISTRAKSJONER: SlideDef[] = [
  { id: "eliminer", name: "Eliminer d_______r", component: SlideEliminer },
  { id: "bowling", name: "Bowling", component: SlideBowling },
  { id: "eliminer-2", name: "Eliminer d_______r", component: SlideEliminerIgjen },
  {
    id: "eliminer-distraksjoner",
    name: "Eliminer distraksjoner",
    component: SlideEliminerDistraksjoner,
  },
  { id: "skjermtid", name: "Skjermtid", component: SlideSkjermtid },
  {
    id: "eliminer-distraksjoner-2",
    name: "Eliminer distraksjoner",
    component: SlideEliminerDistraksjonerIgjen,
  },
];

const LAERE: SlideDef[] = [
  { id: "vaer-sulten", name: "Vær s_______ på å l____", component: SlideVaerSulten },
  { id: "hjernen", name: "Hjernen", component: SlideHjernen },
  { id: "laringsmetoder", name: "Læringsmetoder", component: SlideLaringsmetoder },
  {
    id: "vaer-sulten-2",
    name: "Vær s_______ på å l____",
    component: SlideVaerSultenIgjen,
  },
  { id: "vaer-sulten-laere", name: "Vær sulten på å lære", component: SlideVaerSultenLaere },
  { id: "zlatan", name: "Zlatan", component: SlideZlatan },
];

const REPETISJON: SlideDef[] = [
  { id: "r-blank", name: "R______n", component: SlideRepetisjonBlank },
  { id: "prosent", name: "20 40 60 80", component: SlideProsent },
  { id: "prosent-20", name: "20%", component: SlideProsent20 },
  { id: "prosent-40", name: "40%", component: SlideProsent40 },
  { id: "prosent-60", name: "60%", component: SlideProsent60 },
  { id: "prosent-80", name: "80%", component: SlideProsent80 },
  { id: "prosent-svar", name: "Svaret: 60%", component: SlideProsentSvar },
  { id: "r-blank-2", name: "R_______n", component: SlideRepetisjonBlank2 },
  { id: "repetisjon", name: "Repetisjon", component: SlideRepetisjon },
  { id: "kognitivt-blank", name: "Ko______ Kr______", component: SlideKognitivtBlank },
  { id: "husk-for-aa-huske", name: "Husk for å huske", component: SlideHuskForAaHuske },
  { id: "graf", name: "Graf", component: SlideGraf },
  { id: "mer-krevende", name: "Mer krevende", component: SlideMerKrevende },
  { id: "mer-effektivt", name: "Mer effektivt", component: SlideMerEffektivt },
  {
    id: "kognitivt-blank-2",
    name: "Ko______ Kr______",
    component: SlideKognitivtBlank2,
  },
  {
    id: "kognitivt-krevende",
    name: "Kognitivt krevende",
    component: SlideKognitivtKrevende,
  },
];

const SPACING: SlideDef[] = [
  { id: "samlet-spredt", name: "Samlet vs spredt", component: SlideSamletSpredt },
  { id: "samlet-spredt-1", name: "Samlet ✌️", component: SlideSamletSpredtPeace },
  { id: "samlet-spredt-2", name: "Spredt 🫶", component: SlideSamletSpredtHeart },
  { id: "samlet-spredt-3", name: "2x bedre", component: SlideSamletSpredtPeek },
  { id: "to-ganger-bedre", name: "2x bedre!", component: SlideToGangerBedre },
  { id: "intervaller-1", name: "Spredt repetisjon", component: SlideIntervaller1 },
  { id: "intervaller-2", name: "1 dag", component: SlideIntervaller2 },
  { id: "intervaller-3", name: "3 dager", component: SlideIntervaller3 },
  { id: "intervaller-4", name: "7 dager", component: SlideIntervaller4 },
  { id: "intervaller-5", name: "30 dager", component: SlideIntervaller5 },
  { id: "intervaller-6", name: "90 dager", component: SlideIntervaller6 },
  { id: "intervaller-7", name: "Anki vises", component: SlideIntervaller7 },
  { id: "intervaller-8", name: "Hele tidslinjen", component: SlideIntervaller8 },
  { id: "anki", name: "Anki", component: SlideAnki },
  { id: "anki-kort", name: "Anki-kort", component: SlideAnkiKort },
  { id: "anki-kort-aapent", name: "Anki-kort åpent", component: SlideAnkiKortAapent },
];

const AVSLUTNING: SlideDef[] = [
  { id: "faglig-autoritet", name: "Faglig autoritet", component: SlideFagligAutoritet },
  { id: "oppsummert", name: "Oppsummert", component: SlideOppsummert },
];

export const konsulentlivetMilesOnboarding = definePresentation({
  id: "26-03-04-konsulentlivet-miles-onboarding",
  title: "Å være konsulent i Miles",
  description:
    "Miles-verdier i bruk: gi andre æren, lær alle navn, snakk i bilder, eliminer distraksjoner, vær sulten på å lære.",
  date: "4. mars 2026",
  place: "Miles onboarding",
  notes: notesRaw,
  chapters: [
    { id: "intro", title: "Hej", slides: INTRO },
    { id: "aeren", title: "Gi andre æren", slides: AEREN },
    { id: "navn", title: "Lær alle navn", slides: NAVN },
    { id: "bilder", title: "Snakk i bilder", slides: BILDER },
    { id: "distraksjoner", title: "Eliminer distraksjoner", slides: DISTRAKSJONER },
    { id: "laere", title: "Vær sulten på å lære", slides: LAERE },
    { id: "repetisjon", title: "Repetisjon", slides: REPETISJON },
    { id: "spacing", title: "Spredt repetisjon", slides: SPACING },
    { id: "avslutning", title: "Oppsummert", slides: AVSLUTNING },
  ],
});
