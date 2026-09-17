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
  s(1, "hjerne", "Hjerne"),
  s(2, "pause", "Pause"),
  s(3, "weinstein", "Teaching the science of learning"),
  s(4, "skriv-ned", "Skriv ned på 40 sekunder"),
  s(5, "ansikt", "Ansikt"),
];

const RETRIEVAL: SlideDef[] = [
  s(6, "teknikk-1", "Teknikk 1"),
  s(7, "repetisjon", "Repetisjon"),
  s(8, "andel-tid", "20 40 60 80"),
  s(9, "andel-20", "20 %"),
  s(10, "andel-20b", "20 % nede"),
  s(11, "andel-40", "40 %"),
  s(12, "andel-60", "60 %"),
  s(13, "andel-80", "80 %"),
  s(14, "andel-80b", "80 % flere"),
  s(15, "andel-alle", "Alle hender"),
  s(16, "andel-vinner", "60 % husket mest"),
  s(17, "repetisjon-2", "Repetisjon"),
  s(18, "ko-kr", "Ko______ Kr______"),
  s(19, "metoder-liste", "True false til fri husking"),
  s(20, "metoder-kurve", "Kurven"),
  s(21, "mer-effektivt", "Mer effektivt"),
  s(22, "mer-krevende", "Mer krevende"),
  s(23, "metoder-gpt", "GPT"),
  s(24, "metoder-gpt-2", "GPT 2"),
  s(25, "metoder-gpt-3", "GPT 3"),
  s(26, "metoder-papir", "Fri husking på papir"),
  s(27, "donts", "Alle gjør dette"),
  s(28, "donts-lese", "Bare lese"),
  s(29, "donts-kopiere", "Kopiere"),
  s(30, "ko-kr-igjen", "Ko______ Kr______"),
  s(31, "kognitivt-krevende", "Kognitivt krevende"),
];

const SPACING: SlideDef[] = [
  s(32, "teknikk-2", "Teknikk 2"),
  s(33, "spaced-oppsett", "Samlet eller spredt"),
  s(34, "spaced-samlet", "Samlet"),
  s(35, "spaced-spredt", "Spredt"),
  s(36, "spaced-2x", "2× bedre"),
  s(37, "spaced-2x-hjerter", "2× bedre, hjerter"),
  s(38, "anki", "Anki"),
  s(39, "intervaller", "Økende intervaller"),
];

const INTERLEAVING: SlideDef[] = [
  s(40, "teknikk-3", "Teknikk 3"),
  s(41, "blande", "Blande eller bolk"),
  s(42, "underveis", "Underveis: 83 mot 60"),
  s(43, "en-uke-senere", "Én uke senere"),
  s(44, "en-uke-spredt", "Spredt 63 %"),
  s(45, "en-uke-resultat", "20 mot 63"),
  s(46, "sammenveving", "Sammenveving"),
  s(47, "sammenveving-kr", "Sammenveving, kognitivt krevende"),
  s(48, "traaden", "Kognitivt krevende"),
];

const AVSLUTNING: SlideDef[] = [
  s(49, "bonus", "Bonusteknikk"),
  s(50, "sovn", "Søvn"),
  s(51, "hva-na", "Hva nå"),
  s(52, "hva-na-penn", "Penn og papir"),
  s(53, "hva-na-anki", "Anki"),
  s(54, "hva-na-prov", "Prøv før du slår opp"),
  s(55, "hva-na-gpt", "ChatGPT"),
  s(56, "hva-na-weinstein", "Weinstein et al."),
  s(57, "takk", "Takk. Ansikt"),
];

export const tdcDuErIkkeDum = definePresentation({
  id: "24-10-22-tdc-du-er-ikke-dum",
  title: "Du er ikke dum – En forskningsbasert metode for å lære fort",
  description:
    "Hvorfor du glemmer det du leser, og tre teknikker som faktisk virker. Retrieval, spacing og interleaving, fra Weinstein et al. TDC 2024.",
  date: "22. oktober 2024",
  place: "TDC",
  tags: ["conference"],
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Åpningen", slides: APNING },
    { id: "retrieval", title: "Teknikk 1: Husk for å huske", slides: RETRIEVAL },
    { id: "spacing", title: "Teknikk 2: Spredt repetisjon", slides: SPACING },
    { id: "interleaving", title: "Teknikk 3: Bland emnene", slides: INTERLEAVING },
    { id: "avslutning", title: "Bonus og veien videre", slides: AVSLUTNING },
  ],
});
