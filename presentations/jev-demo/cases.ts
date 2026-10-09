/*
 * De tre klassifiseringscasene som går igjen på alle live-slidene.
 * Brukes både av slidene (klient) og av app/api/jev (server).
 *
 * Eksempeldataene er oppdiktet for demoen. Datasettene lages deterministisk,
 * så samme kjøring gir samme elementer hver gang.
 */

import type { ChoiceQuestion, PromptMode, Questions, ShapeCheck } from "./jev";

export type CaseId = "haster" | "kjoretoy" | "spam";

export type ClassifyTask = {
  id: CaseId;
  /** Navn på fanen. */
  name: string;
  /** Hva ett element er («henvendelse», «kjøretøy», «bruker»). */
  itemLabel: string;
  /** Navnet på kolonnen klassifiseringen fyller, og JSON-feltet i prompten. */
  column: string;
  question: ChoiceQuestion;
  /** Settes foran hvert element i state til Jev. */
  prefix?: string;
  colors: Record<string, string>;
  /** Fire eksempler til utgangspunkt-slidene. */
  examples: string[];
  /** Datasett til batch-kjøringene (500 elementer). */
  items: string[];
  /** Hele elementet som det står i en prompt. */
  context: (item: string) => string;
  /** Spørsmålet i fritekst-prompten. */
  ask: string;
  /** Forklaring av etikettene i JSON-prompten. */
  legend?: string;
};

export const QUESTION_ID = "kategori";

/* ------------------------------------------------------------------ */
/* Deterministisk tilfeldighet                                          */
/* ------------------------------------------------------------------ */

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickerFor(seed: number) {
  const r = rng(seed);
  return {
    pick: <T,>(xs: readonly T[]): T => xs[Math.floor(r() * xs.length)],
    int: (lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1)),
    chance: (p: number) => r() < p,
  };
}

function uniqueFill(n: number, make: () => string, start: string[] = []): string[] {
  const seen = new Set(start);
  const out = [...start];
  for (let guard = 0; out.length < n && guard < n * 50; guard++) {
    const s = make();
    if (!seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 1. Kundehenvendelse → hastegrad                                      */
/* ------------------------------------------------------------------ */

const HASTER_EXAMPLES = [
  "Appen har vært nede siden i morges, og ingen av oss får logget inn. Vi taper salg hvert minutt.",
  "Fakturaen for september har feil organisasjonsnummer. Kan dere sende en ny før fredag?",
  "Hei! Har dere planer om mørk modus i appen? Hadde vært fint.",
  "Noen har logget inn på kontoen min fra et annet land i natt. Jeg har ikke vært der.",
];

const PROBLEMS = [
  "Appen har vært nede siden i morges, og ingen av oss får logget inn.",
  "Betalingsløsningen i nettbutikken feiler for alle kunder akkurat nå.",
  "Noen har logget inn på kontoen min fra et ukjent land i natt.",
  "Lønnskjøringen stoppet med feilmelding, og lønna skal ut i dag.",
  "Kassasystemet i alle butikkene våre er nede.",
  "Vi har fått tilsendt en fil med kundenes personnummer. Det ser ut som en lekkasje.",
  "Integrasjonen mot Vipps har sluttet å virke, og ingen ordre kommer gjennom.",
  "Nettsiden vår viser bare en feilmelding.",
  "Kortet mitt er trukket tre ganger for samme kjøp i dag.",
  "Alle ordrene fra i går er borte fra systemet.",
  "Fakturaen for september har feil organisasjonsnummer.",
  "Jeg trenger tilgang til en ny ansatt som starter i morgen.",
  "Rapporten vi skal levere i morgen henter ikke tallene fra forrige uke.",
  "Eksporten til regnskapssystemet ga dobbelt opp med linjer.",
  "Passordet mitt er låst etter for mange forsøk.",
  "Vi må endre leveringsadressen på en ordre som sendes i morgen.",
  "Kan dere bekrefte at oppsigelsen er registrert før fristen i morgen?",
  "Leveransen vi fikk i dag manglet to esker.",
  "Systemet er veldig tregt i dag, men det fungerer.",
  "Jeg ble trukket feil beløp på siste faktura.",
  "Har dere planer om mørk modus i appen?",
  "Hvordan bytter jeg profilbilde?",
  "Takk for god hjelp sist!",
  "Kan dere sende meg prislisten for neste år?",
  "Er det mulig å få fakturaen på engelsk fra neste måned?",
  "Har dere et kurs for nye brukere?",
  "Det er en skrivefeil på kontaktsiden deres.",
  "Vi vurderer å oppgradere til Pro en gang neste år.",
  "Kan dere lage eksport til Excel?",
  "Hvor finner jeg brukermanualen?",
];
const OPENERS = ["", "Hei! ", "Hei, ", "God morgen. ", "Hallo. ", "Hei der. "];
const CLOSERS = ["", " Takk.", " Hjelp ASAP!", " Mvh Kari", " Ring meg på 912 34 567.", " Haster!!", " Ingen hast.", " Ha en fin dag."];

function hasterItems(): string[] {
  const p = pickerFor(1);
  return uniqueFill(500, () => `${p.pick(OPENERS)}${p.pick(PROBLEMS)}${p.pick(CLOSERS)}`.trim(), HASTER_EXAMPLES);
}

/* ------------------------------------------------------------------ */
/* 2. Databerikelse → kjøretøytype                                      */
/* ------------------------------------------------------------------ */

const KJORETOY_EXAMPLES = ["Volvo FH16", "Toyota Corolla", "Yamaha MT-07", "Solaris Urbino"];

const VEHICLES = [
  // personbiler
  "Tesla Model Y", "Volkswagen ID.4", "Volvo XC60", "Skoda Octavia", "Toyota RAV4", "Nissan Leaf", "Audi Q4 e-tron",
  "BMW i3", "Hyundai Kona", "Kia Niro", "Ford Mondeo", "Peugeot 208", "Mercedes-Benz E-Klasse", "Volvo V90", "Polestar 2",
  "MG4", "BYD Atto 3", "Subaru Outback", "Mazda CX-5", "Renault Zoe", "Opel Corsa", "Honda Civic", "Volkswagen Golf",
  "Toyota Yaris", "Audi A4", "BMW 3-serie", "Ford Mustang Mach-E", "Skoda Enyaq", "Hyundai Ioniq 5", "Kia EV6",
  "Volvo EX30", "Tesla Model 3", "Citroën C3", "Fiat 500", "Mitsubishi Outlander", "Suzuki Swift", "Dacia Duster",
  "Jaguar I-Pace", "Porsche Taycan", "Toyota Hilux", "Volkswagen Transporter", "Ford Transit Custom",
  // lastebiler
  "Volvo FM", "Scania R 500", "Scania S 730", "Mercedes-Benz Actros", "MAN TGX", "MAN TGS", "DAF XF", "DAF CF",
  "Iveco S-Way", "Renault Trucks T", "Volvo FMX", "Scania P 280", "Mercedes-Benz Arocs", "Volvo FL Electric",
  "Scania G 410", "Iveco Eurocargo", "Isuzu N-serie", "Mitsubishi Fuso Canter", "Tesla Semi", "MAN TGL", "DAF LF",
  "Renault Trucks D", "Volvo FE",
  // busser
  "Volvo 7900 Electric", "Mercedes-Benz Citaro", "MAN Lion's City", "Scania Citywide", "Iveco Crossway",
  "Setra S 516 HD", "VDL Citea", "BYD K9", "Yutong E12", "Volvo 9700", "Neoplan Tourliner", "Irizar i6",
  "Mercedes-Benz Tourismo", "Scania Interlink", "Ebusco 3.0", "Van Hool Exqui.City", "Heuliez GX 337", "Otokar Kent",
  "Temsa HD 12", "Mercedes-Benz Sprinter City",
  // motorsykler
  "Honda CB500F", "Kawasaki Z900", "BMW R 1250 GS", "Harley-Davidson Sportster S", "Ducati Monster", "KTM 390 Duke",
  "Triumph Street Triple", "Suzuki V-Strom 650", "Honda Africa Twin", "Yamaha Ténéré 700", "Kawasaki Ninja 650",
  "Royal Enfield Classic 350", "Husqvarna Svartpilen 401", "Aprilia Tuono V4", "Indian Scout", "Moto Guzzi V7",
  "Honda Gold Wing", "Zero SR/F", "Vespa GTS 300", "Yamaha XMAX 300", "Piaggio MP3", "Energica Ego", "BMW CE 04",
];

function kjoretoyItems(): string[] {
  const p = pickerFor(2);
  const rest = VEHICLES.filter((v) => !KJORETOY_EXAMPLES.includes(v));
  for (let i = rest.length - 1; i > 0; i--) {
    const j = p.int(0, i);
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const base = [...KJORETOY_EXAMPLES, ...rest];
  const all = [...base, ...KJORETOY_EXAMPLES];
  return uniqueFill(500, () => `${p.pick(all)} ${p.int(2008, 2025)}`, base);
}

/* ------------------------------------------------------------------ */
/* 3. Spam/bot-bruker → ekte eller spam/bot                             */
/* ------------------------------------------------------------------ */

const SPAM_EXAMPLES = [
  "E-post: ingrid.haugen@online.no · Navn: Ingrid Haugen · Sted: Bergen · IP: 84.215.71.20",
  "E-post: xk9q2v7@mailinator.com · Navn: asdf qwer · Sted: Oslo · IP: 185.220.101.47",
  "E-post: crypto.profit.9921@gmail.com · Navn: BEST CRYPTO PROFIT · Sted: Lagos · IP: 45.146.164.110",
  "E-post: ole.m@proton.me · Navn: Ole M · Sted: Tromsø · IP: 104.28.60.3",
];

const FIRST = ["Kari", "Ola", "Ingrid", "Lars", "Emma", "Jonas", "Nora", "Henrik", "Sofie", "Magnus", "Thea", "Sindre", "Maja", "Even", "Ida", "Sander", "Hanna", "Eirik", "Sara", "Martin", "Aisha", "Mohammed", "Zofia", "Piotr", "Linh", "Ahmed", "Leah", "Tobias", "Marte", "Kristian"];
const LAST = ["Nordmann", "Hansen", "Johansen", "Olsen", "Larsen", "Andersen", "Pedersen", "Nilsen", "Kristiansen", "Jensen", "Karlsen", "Johnsen", "Pettersen", "Eriksen", "Berg", "Haugen", "Hagen", "Johannessen", "Andreassen", "Jacobsen", "Dahl", "Lie", "Ali", "Nowak", "Nguyen", "Khan", "Solberg", "Moen", "Bakken", "Strand"];
const DOMAINS = ["gmail.com", "online.no", "hotmail.com", "outlook.com", "icloud.com", "live.no", "yahoo.no", "uio.no", "ntnu.no", "proton.me"];
const CITIES = ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø", "Kristiansand", "Drammen", "Fredrikstad", "Bodø", "Ålesund", "Hamar", "Lillehammer", "Molde", "Haugesund", "Sandnes", "Arendal", "Harstad", "Gjøvik"];
const HOME_NETS = ["84.208", "84.212", "84.215", "46.9", "46.66", "85.164", "85.165", "77.16", "77.18", "88.88", "89.10", "109.247"];
const VPN_NETS = ["104.28", "146.70", "185.195"];
const BAD_NETS = ["185.220.101", "45.146.164", "103.152.220", "193.32.162", "194.26.192", "5.188.62", "91.240.118", "141.98.10"];
const TRASH_DOMAINS = ["mailinator.com", "guerrillamail.com", "10minutemail.com", "yopmail.com", "tempmail.dev", "sharklasers.com", "gmail.com"];
const SPAM_HANDLES = ["crypto.profit", "seo.rank.boost", "cheap.followers", "win.bonus.casino", "loan.fast.approve", "best.deals.now", "free.giftcard"];
const SPAM_NAMES = ["BEST CRYPTO PROFIT", "SEO Expert 24/7", "Casino Bonus", "Hot Singles", "Fast Loan Approval", "asdf qwer", "Test Test", "xxxx", "Ghjk Ljkh", "John Smith"];
const FAR_CITIES = ["Lagos", "Ho Chi Minh City", "Moskva", "Unknown", "Oslo", "Bergen", "-"];

function lower(s: string) {
  return s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a");
}

function spamItems(): string[] {
  const p = pickerFor(3);
  const record = (email: string, name: string, city: string, ip: string) => `E-post: ${email} · Navn: ${name} · Sted: ${city} · IP: ${ip}`;
  const real = () => {
    const f = p.pick(FIRST);
    const l = p.pick(LAST);
    const local = p.pick([`${lower(f)}.${lower(l)}`, `${lower(f)}${lower(l)}`, `${lower(f)}.${lower(l)[0]}`, `${lower(f)}${p.int(70, 99)}`, `${lower(f)[0]}.${lower(l)}`]);
    return record(`${local}@${p.pick(DOMAINS)}`, `${f} ${l}`, p.pick(CITIES), `${p.pick(HOME_NETS)}.${p.int(1, 254)}.${p.int(1, 254)}`);
  };
  const vpn = () => {
    const f = p.pick(FIRST);
    const l = p.pick(LAST);
    return record(`${lower(f)}.${lower(l)[0]}@${p.pick(["proton.me", "gmail.com", "outlook.com"])}`, `${f} ${l[0]}`, p.pick(CITIES), `${p.pick(VPN_NETS)}.${p.int(1, 254)}.${p.int(1, 254)}`);
  };
  const spam = () => {
    const random = Array.from({ length: p.int(6, 9) }, () => p.pick([..."abcdefghijklmnopqrstuvwxyz0123456789"])).join("");
    const local = p.chance(0.5) ? random : `${p.pick(SPAM_HANDLES)}.${p.int(100, 9999)}`;
    return record(`${local}@${p.pick(TRASH_DOMAINS)}`, p.pick(SPAM_NAMES), p.pick(FAR_CITIES), `${p.pick(BAD_NETS)}.${p.int(1, 254)}`);
  };
  return uniqueFill(500, () => {
    const x = p.int(1, 20);
    return x <= 13 ? real() : x <= 18 ? spam() : vpn();
  }, SPAM_EXAMPLES);
}

/** «E-post: … · Navn: …» → kolonner til tabellvisning. */
export function splitRecord(item: string): [string, string][] | null {
  const parts = item.split(" · ").map((s) => s.match(/^([^:]+):\s*(.*)$/));
  return parts.every(Boolean) ? parts.map((m) => [m![1], m![2]]) : null;
}

/** Kort visning av et element i ruter og lister: e-posten for brukerposter, ellers hele teksten. */
export function shortLabel(item: string): string {
  const rec = splitRecord(item);
  return rec ? rec[0][1] : item;
}

/* ------------------------------------------------------------------ */
/* Casene                                                               */
/* ------------------------------------------------------------------ */

const PALETTE = ["#B72318", "#C98A2B", "#2E8B7F", "#004047", "#450D20", "#FF303B"];

function withColors(t: Omit<ClassifyTask, "colors">, colors?: string[]): ClassifyTask {
  const keys = Object.keys(t.question.criteria);
  return { ...t, colors: Object.fromEntries(keys.map((k, i) => [k, (colors ?? PALETTE)[i % (colors ?? PALETTE).length]])) };
}

export const CLASSIFY_TASKS: ClassifyTask[] = [
  withColors({
    id: "haster",
    name: "Kundehenvendelse",
    itemLabel: "henvendelse",
    column: "hastegrad",
    question: {
      type: "choice",
      instructions: "How urgent is this customer message?",
      criteria: {
        akutt: "Needs action now: outage, money being lost, security or safety problem",
        "i dag": "Should be handled today, but nothing is on fire",
        "kan vente": "No time pressure: questions, feedback, small requests",
      },
    },
    examples: HASTER_EXAMPLES,
    items: hasterItems(),
    context: (item) => `Kundehenvendelse:\n"""\n${item}\n"""`,
    ask: "Hvor mye haster denne henvendelsen?",
    legend: "akutt = må tas nå (nedetid, penger tapes, sikkerhet); i dag = bør løses i dag; kan vente = ingen tidspress.",
  }),
  withColors(
    {
      id: "kjoretoy",
      name: "Databerikelse",
      itemLabel: "kjøretøy",
      column: "kategori",
      question: {
        type: "choice",
        instructions: "What type of vehicle is this make and model?",
        criteria: {
          personbil: "Passenger car, SUV, pickup or small van",
          lastebil: "Truck or lorry",
          buss: "Bus or coach",
          motorsykkel: "Motorcycle or scooter",
        },
      },
      prefix: "Vehicle make and model: ",
      examples: KJORETOY_EXAMPLES,
      items: kjoretoyItems(),
      context: (item) => `Kjøretøy: ${item}`,
      ask: "Hva slags kjøretøy er dette?",
    },
    ["#004047", "#B72318", "#C98A2B", "#2E8B7F"]
  ),
  withColors(
    {
      id: "spam",
      name: "Spam/bot-bruker",
      itemLabel: "bruker",
      column: "vurdering",
      question: {
        type: "choice",
        instructions: "Is this new user sign-up a real person or a spam/bot account?",
        criteria: {
          ekte: "A real person signing up",
          "spam/bot": "Spam, fake or automated bot account",
        },
      },
      prefix: "New user sign-up. ",
      examples: SPAM_EXAMPLES,
      items: spamItems(),
      context: (item) => `Ny brukerregistrering:\n${item.split(" · ").join("\n")}`,
      ask: "Er dette en ekte bruker eller spam/bot?",
      legend: "ekte = en ekte person; spam/bot = spam, falsk eller automatisert konto.",
    },
    ["#2E8B7F", "#B72318"]
  ),
];

export function taskById(id: string | null | undefined): ClassifyTask {
  return CLASSIFY_TASKS.find((t) => t.id === id) ?? CLASSIFY_TASKS[0];
}

export function questionsFor(task: ClassifyTask): Questions {
  return { [QUESTION_ID]: task.question };
}

export function stateFor(task: ClassifyTask, item: string): string {
  return `${task.prefix ?? ""}${item}`;
}

export function labelsOf(task: ClassifyTask): string[] {
  return Object.keys(task.question.criteria);
}

/* ------------------------------------------------------------------ */
/* Tutorial-stegene: spørsmålene per steg og case                       */
/* ------------------------------------------------------------------ */

export type StepId = "noul" | "choice" | "score" | "alle";

const HASTER_SCALE = [
  "No time pressure: questions, feedback, small requests",
  "Should be handled today, but nothing is on fire",
  "Needs action now: outage, money being lost, security or safety problem",
];
const STORRELSE_SCALE = ["Small: motorcycle or scooter", "Medium: passenger car, SUV or van", "Large: truck or bus"];
const RISIKO_SCALE = [
  "Low risk: looks like a normal person",
  "Some warning signs: VPN, short name or unusual e-mail",
  "High risk: disposable e-mail, fake name or known bad IP",
];

const task = (id: CaseId) => CLASSIFY_TASKS.find((t) => t.id === id)!;

export const STEP_QUESTIONS: Record<StepId, Record<CaseId, Questions>> = {
  noul: {
    haster: { haster: { type: "noul", instructions: "Does this message need action right now?" } },
    kjoretoy: { tungt: { type: "noul", instructions: "This is a heavy vehicle over 3.5 tonnes, such as a truck or a bus" } },
    spam: { spam: { type: "noul", instructions: "This sign-up is a spam or bot account" } },
  },
  choice: {
    haster: { hastegrad: task("haster").question },
    kjoretoy: { kategori: task("kjoretoy").question },
    spam: { vurdering: task("spam").question },
  },
  score: {
    haster: { hastegrad: { type: "score", instructions: "How urgent is this customer message?", criteria: HASTER_SCALE } },
    kjoretoy: { storrelse: { type: "score", instructions: "How large is this vehicle?", criteria: STORRELSE_SCALE } },
    spam: { risiko: { type: "score", instructions: "How risky is this new user sign-up?", criteria: RISIKO_SCALE } },
  },
  alle: {
    haster: {
      hastegrad: task("haster").question,
      frustrasjon: { type: "score", instructions: "How frustrated is the customer?", criteria: ["Calm, just stating facts", "Frustrated but civil", "Very angry, strong language"] },
      sikkerhet: { type: "noul", instructions: "The message reports a possible security or privacy problem" },
    },
    kjoretoy: {
      kategori: task("kjoretoy").question,
      storrelse: { type: "score", instructions: "How large is this vehicle?", criteria: STORRELSE_SCALE },
      elektrisk: { type: "noul", instructions: "This make and model is a fully electric vehicle" },
    },
    spam: {
      vurdering: task("spam").question,
      risiko: { type: "score", instructions: "How risky is this new user sign-up?", criteria: RISIKO_SCALE },
      engangsadresse: { type: "noul", instructions: "The e-mail address is from a disposable or temporary e-mail service" },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Prompter til OpenAI: fritekst og JSON bestilt i prompten             */
/* ------------------------------------------------------------------ */

export function buildLiveMessages(mode: PromptMode, task: ClassifyTask, item: string) {
  if (mode === "fritekst") {
    return [{ role: "user" as const, content: `${task.context(item)}\n\n${task.ask}` }];
  }
  const shape = `{"${task.column}": ${labelsOf(task)
    .map((l) => JSON.stringify(l))
    .join(" | ")}}`;
  return [
    { role: "developer" as const, content: "Du er en klassifiserer. Svar bare med ett JSON-objekt og ingenting annet." },
    {
      role: "user" as const,
      content: `${task.context(item)}\n\nSvar med JSON på denne formen:\n${shape}${task.legend ? `\n\n${task.legend}` : ""}`,
    },
  ];
}

/** Sjekker svaret slik koden din måtte gjort før den kan bruke det. */
export function checkJsonShape(raw: string, task: ClassifyTask): { parsed: Record<string, unknown> | null; checks: ShapeCheck[] } {
  const checks: ShapeCheck[] = [];
  let parsed: unknown = null;
  let strict = true;
  try {
    parsed = JSON.parse(raw);
  } catch {
    strict = false;
    const stripped = raw.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
    try {
      parsed = JSON.parse(stripped);
    } catch {
      parsed = null;
    }
  }
  checks.push({
    label: "JSON.parse på råsvaret",
    short: "parser",
    ok: strict,
    detail: strict ? undefined : parsed ? "gikk først etter at ``` ble fjernet" : "ikke gyldig JSON",
  });
  const obj = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  const keys = obj ? Object.keys(obj).join(", ") : "";
  checks.push({
    label: `ett felt: ${task.column}`,
    short: "felt",
    ok: keys === task.column,
    detail: obj && keys !== task.column ? `fikk: ${keys || "ingen"}` : undefined,
  });
  const value = obj?.[task.column];
  const labels = labelsOf(task);
  checks.push({
    label: `${task.column} er ${labels.join(" | ")}`,
    short: "verdi",
    ok: typeof value === "string" && labels.includes(value),
    detail: obj && value !== undefined ? `fikk: ${JSON.stringify(value)}` : undefined,
  });
  return { parsed: obj, checks };
}
