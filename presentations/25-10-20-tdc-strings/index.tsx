import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { BildeIkon } from "@/components/icons/BildeIkon";
import * as S from "./slides";

const INTRO: SlideDef[] = [
  { id: "forside", name: "We’re Obsessed with Strings", component: S.Slide01 },
  { id: "om-peter", name: "Peter Bull Hove", component: S.Slide02 },
  { id: "trust-issues", name: "Trust Issues", component: S.Slide03 },
  {
    id: "trust-issues-string",
    name: "Trust Issues + string",
    component: S.Slide04,
  },
  { id: "sources", name: "Sources", component: S.Slide05 },
  { id: "sources-stringly", name: "Stringly Typed", component: S.Slide06 },
];

const STORY: SlideDef[] = [
  { id: "bank-user", name: "User + PhoneNumber", component: S.Slide07 },
  { id: "bank-smirk", name: "Bank-historien", component: S.Slide08 },
  { id: "bank-sms", name: "StartsWith +47", component: S.Slide09 },
  { id: "bank-email", name: "Ellers e-post", component: S.Slide10 },
  { id: "lgtm", name: "LGTM", component: S.Slide11 },
  { id: "lgtm2", name: "LGTM2", component: S.Slide12 },
  { id: "melt", name: "Mandag morgen", component: S.Slide13 },
];

const PHONE: SlideDef[] = [
  { id: "pause", name: "Pause", component: S.Slide14 },
  { id: "phonenumber-1", name: "PhoneNumber-record", component: S.Slide15 },
  { id: "phonenumber-2", name: "PhoneNumber", component: S.Slide16 },
  { id: "phonenumber-3", name: "PhoneNumber", component: S.Slide17 },
  { id: "phonenumber-4", name: "PhoneNumber", component: S.Slide18 },
  { id: "phonenumber-5", name: "PhoneNumber", component: S.Slide19 },
  { id: "phonenumber-6", name: "PhoneNumber", component: S.Slide20 },
  { id: "phonenumber-7", name: "PhoneNumber", component: S.Slide21 },
  { id: "phonenumber-8", name: "PhoneNumber", component: S.Slide22 },
  { id: "user-string", name: "User med string", component: S.Slide23 },
  { id: "user-vo", name: "User med PhoneNumber", component: S.Slide24 },
  {
    id: "benefit-1",
    name: "Benefit 1: validated on create",
    component: S.Slide25,
  },
  { id: "ivalidator", name: "What about IValidator", component: S.Slide26 },
];

const ABSTRACTIONS: SlideDef[] = [
  { id: "abstractions", name: "Abstractions", component: S.Slide27 },
  { id: "abstractions-bad", name: "Bad abstractions", component: S.Slide28 },
  {
    id: "abstractions-bad-2",
    name: "Nested complexity",
    component: S.Slide29,
  },
  { id: "abstractions-good", name: "Good abstractions", component: S.Slide30 },
  {
    id: "abstractions-good-2",
    name: "One thing in your mind",
    component: S.Slide31,
  },
  {
    id: "benefit-2",
    name: "Benefit 2: abstractions",
    component: S.Slide32,
  },
  {
    id: "what-are-vo",
    name: "What really are Value Objects",
    component: S.Slide33,
  },
  { id: "entity-vs-vo", name: "Entity vs Value Object", component: S.Slide34 },
];

const MONEY: SlideDef[] = [
  { id: "payment", name: "Payment-entity", component: S.Slide35 },
  { id: "payment-record", name: "MonetaryAmount", component: S.Slide36 },
  {
    id: "payment-vo",
    name: "Payment med MonetaryAmount",
    component: S.Slide37,
  },
  {
    id: "monetary-1",
    name: "Validering av MonetaryAmount",
    component: S.Slide38,
  },
  { id: "monetary-2", name: "MonetaryAmount", component: S.Slide39 },
  { id: "monetary-3", name: "MonetaryAmount", component: S.Slide40 },
  { id: "monetary-4", name: "MonetaryAmount", component: S.Slide41 },
  { id: "monetary-5", name: "MonetaryAmount", component: S.Slide42 },
  {
    id: "benefit-3",
    name: "Benefit 3: bind primitives",
    component: S.Slide43,
  },
];

const IMPLEMENT: SlideDef[] = [
  { id: "how-to-implement", name: "How to implement", component: S.Slide44 },
  { id: "signature", name: "PhoneNumber-signatur", component: S.Slide45 },
  { id: "options-a", name: "A) Class", component: S.Slide46 },
  { id: "options-b", name: "B) Struct", component: S.Slide47 },
  { id: "options-c", name: "C) Record class", component: S.Slide48 },
  { id: "options-d", name: "D) Record struct", component: S.Slide49 },
  { id: "options-answer", name: "Record class", component: S.Slide50 },
];

const PERSISTENCE: SlideDef[] = [
  { id: "apis-orms", name: "APIs and ORMs", component: S.Slide51 },
  { id: "ef", name: "Entity Framework", component: S.Slide52 },
  { id: "ef-phone", name: "EF + PhoneNumber", component: S.Slide53 },
  { id: "ef-map-1", name: "EF-mapping", component: S.Slide54 },
  { id: "ef-map-2", name: "EF-mapping", component: S.Slide55 },
  { id: "ef-map-3", name: "EF-mapping", component: S.Slide56 },
  { id: "ef-map-4", name: "EF-mapping", component: S.Slide57 },
  { id: "ef-map-5", name: "EF-mapping", component: S.Slide58 },
  { id: "ef-map-6", name: "EF-mapping", component: S.Slide59 },
  { id: "ef-owned", name: "Owned types", component: S.Slide60 },
  {
    id: "api-serialization",
    name: "API Serialization",
    component: S.Slide61,
  },
  { id: "api-1", name: "JSON-binding", component: S.Slide62 },
  { id: "api-2", name: "JSON-binding", component: S.Slide63 },
  { id: "api-3", name: "JSON-binding", component: S.Slide64 },
  {
    id: "benefit-4",
    name: "Benefit 4: parse in one place",
    component: S.Slide65,
  },
];

const CLOSE: SlideDef[] = [
  { id: "pitfalls-1", name: "Overusage", component: S.Slide66 },
  { id: "pitfalls-2", name: "Mutability", component: S.Slide67 },
  { id: "pitfalls-3", name: "Serialization / ORM", component: S.Slide68 },
  { id: "pitfalls-4", name: "Team and coding", component: S.Slide69 },
  { id: "go-forth", name: "Go Forth and code on", component: S.Slide70 },
];

export const tdcStrings = definePresentation({
  id: "25-10-20-tdc-strings",
  title: "We’re Obsessed with Strings: Is there an Alternative?",
  description:
    "Hvorfor strenger er farlige, og hvordan value objects i C# gir deg typer du kan stole på. TDC 2025.",
  date: "20. oktober 2025",
  place: "TDC",
  tags: ["conference"],
  icon: <BildeIkon src="/media/tdc-logo.svg" alt="TDC" />,
  notes: notesRaw,
  chapters: [
    { id: "intro", title: "Trust issues", slides: INTRO },
    { id: "story", title: "Bank-historien", slides: STORY },
    { id: "phonenumber", title: "PhoneNumber", slides: PHONE },
    { id: "abstractions", title: "Abstraksjoner", slides: ABSTRACTIONS },
    { id: "money", title: "MonetaryAmount", slides: MONEY },
    { id: "implement", title: "Hvordan implementere", slides: IMPLEMENT },
    { id: "persistence", title: "EF og API", slides: PERSISTENCE },
    { id: "close", title: "Fallgruver", slides: CLOSE },
  ],
});
