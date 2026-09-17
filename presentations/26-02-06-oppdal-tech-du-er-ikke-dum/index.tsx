import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { BildeIkon } from "@/components/icons/BildeIkon";
import { SlideBilde } from "./slides";

function s(n: number, id: string, name: string): SlideDef {
  function Slide() {
    return <SlideBilde n={n} alt={name} />;
  }
  Slide.displayName = `Slide${String(n).padStart(2, "0")}`;
  return { id, name, component: Slide };
}

const APNING: SlideDef[] = [
  s(1, "hjerne", "Hjerne"),
  s(2, "pause", "Pause"),
  s(3, "skriv-ned", "Skriv ned på 40 sekunder"),
  s(4, "svigermor", "Svigermor"),
];

const RETRIEVAL: SlideDef[] = [
  s(5, "teknikk-1", "Teknikk 1"),
  s(6, "gjett-ordet", "R______n"),
  s(7, "andel-tid", "20 40 60 80"),
  s(8, "andel-20", "20 %"),
  s(9, "andel-40", "40 %"),
  s(10, "andel-60", "60 %"),
  s(11, "andel-80", "80 %"),
  s(12, "andel-vinner", "60 % husket mest"),
  s(13, "r-blank", "R_______n"),
  s(14, "repetisjon", "Repetisjon"),
  s(15, "ko-kr", "Ko______ Kr______"),
  s(16, "metoder-liste", "True false til fri husking"),
  s(17, "metoder-kurve", "Kurven"),
  s(18, "mer-krevende", "Mer krevende"),
  s(19, "mer-effektivt", "Mer effektivt"),
  s(20, "husk-for-aa-huske", "Husk for å huske"),
  s(21, "metoder-gpt", "GPT"),
  s(22, "metoder-mer", "Flere metoder"),
  s(23, "konstruktiv-vanskelighet", "Konstruktiv vanskelighet"),
  s(24, "donts", "Don’ts"),
  s(25, "donts-lese", "Bare lese"),
  s(26, "donts-kopiere", "Kopiere"),
  s(27, "ko-kr-igjen", "Ko______ Kr______"),
  s(28, "kognitivt-krevende", "Kognitivt krevende"),
];

const SPACING: SlideDef[] = [
  s(29, "teknikk-2", "Teknikk 2"),
  s(30, "spaced-oppsett", "Samlet eller spredt"),
  s(31, "spaced-samlet", "Samlet"),
  s(32, "spaced-spredt", "Spredt"),
  s(33, "spaced-2x", "2× bedre"),
  s(34, "spacing-effect", "The spacing effect"),
  s(35, "intervaller", "Økende intervaller"),
  s(36, "intervall-z1", "Intervall"),
  s(37, "intervall-z2", "Intervall 2"),
  s(38, "intervall-z3", "Intervall 3"),
  s(39, "intervall-z4", "Intervall 4"),
  s(40, "intervall-z5", "Intervall 5"),
  s(41, "intervall-z6", "Intervall 6"),
  s(42, "intervall-ferdig", "Intervall ferdig"),
  s(43, "anki-dekk", "Anki-dekk"),
  s(44, "anki-kort", "Anki-kort"),
  s(45, "anki", "Anki"),
];

const INTERLEAVING: SlideDef[] = [
  s(46, "teknikk-3", "Teknikk 3"),
  s(47, "blande", "Blande eller bolk"),
  s(48, "underveis", "Underveis: 83 mot 60"),
  s(49, "en-uke-senere", "Én uke senere"),
  s(50, "en-uke-resultat", "20 mot 63"),
  s(51, "blandet-vinner", "Blanding vant"),
  s(52, "traaden", "Kognitivt krevende"),
];

const AVSLUTNING: SlideDef[] = [
  s(53, "bonus", "Bonusteknikk"),
  s(54, "sovn", "Søvn"),
  s(55, "walker-bok", "Hvorfor vi sover"),
  s(56, "walker", "Matthew Walker"),
  s(57, "hva-na", "Hva nå"),
  s(58, "hva-na-2", "Hva nå 2"),
  s(59, "hva-na-3", "Hva nå 3"),
  s(60, "hva-na-4", "Hva nå 4"),
  s(61, "hva-na-5", "Hva nå 5"),
  s(62, "takk", "Takk"),
  s(63, "takk-ansikt", "Takk. Ansikt"),
];

export const oppdalTechDuErIkkeDum = definePresentation({
  id: "26-02-06-oppdal-tech-du-er-ikke-dum",
  title: "Du er ikke dum – En forskningsbasert metode for å lære fort",
  description:
    "Hvorfor du glemmer det du leser, og tre teknikker som faktisk virker. Retrieval, spacing og interleaving, fra Weinstein et al. Oppdal Tech 2026.",
  date: "6. februar 2026",
  place: "Oppdal Tech",
  tags: ["conference"],
  inProgress: true,
  icon: (
    <BildeIkon src="/media/26-02-06-oppdal-tech-du-er-ikke-dum/ikon.png" />
  ),
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Åpningen", slides: APNING },
    { id: "retrieval", title: "Teknikk 1: Husk for å huske", slides: RETRIEVAL },
    { id: "spacing", title: "Teknikk 2: Spredt repetisjon", slides: SPACING },
    { id: "interleaving", title: "Teknikk 3: Bland emnene", slides: INTERLEAVING },
    { id: "avslutning", title: "Bonus og veien videre", slides: AVSLUTNING },
  ],
});
