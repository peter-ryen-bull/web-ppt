/*
 * Delte typer, priser og forhåndsoppsett for Jev-demoen.
 * Brukes både av slidene (klient) og av app/api/jev (server).
 *
 * Kilder (hentet 2. okt 2026):
 * - API og eksempelsvar: https://docs.typesafe.ai/api.md og /introduction/quickstart.md
 * - Pris og grenser: https://docs.typesafe.ai/models.md
 * - LLM-priser og ventetid: arXiv 2609.29769 (Jev vs. LLMs as Rubric Judges)
 */

export type NoulQuestion = {
  type: "noul";
  instructions: string;
  criteria?: { true?: string; false?: string };
};
export type ChoiceQuestion = {
  type: "choice";
  instructions: string;
  criteria: Record<string, string | null>;
};
export type ScoreQuestion = {
  type: "score";
  instructions: string;
  criteria: string[];
};
export type Question = NoulQuestion | ChoiceQuestion | ScoreQuestion;
export type Questions = Record<string, Question>;

export type NoulAnswer = { type: "noul"; noul: number };
export type ChoiceAnswer = {
  type: "choice";
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
};
export type ScoreAnswer = {
  type: "score";
  score: number;
  legend: Record<string, string>;
  probabilities: Record<string, number>;
  confidence: number;
};
export type Answer = NoulAnswer | ChoiceAnswer | ScoreAnswer;

export type JevResponse = {
  model: string;
  answers: Record<string, Answer>;
  usage: { input_tokens: number; output_tokens: number };
};

/** Svar fra /api/jev, uansett om kallet gikk live eller ble avvist. */
export type JevRunResult =
  | { ok: true; data: JevResponse; latencyMs: number }
  | { ok: false; error: string };

export type LlmRunResult =
  | {
      ok: true;
      model: string;
      text: string;
      usage: { input: number; output: number; reasoning: number };
      latencyMs: number;
    }
  | { ok: false; error: string };

/* ------------------------------------------------------------------ */
/* Sammenligning med OpenAI (samme elementer, samme prompt).           */
/* ------------------------------------------------------------------ */

export type Provider = "jev" | "openai";
export type ProviderStatus = { configured: boolean; model: string; keyEnv: string; effort: string };

export type DemoStatus = {
  jev: boolean;
  llm: { configured: boolean; model: string | null };
  openai?: ProviderStatus;
};

/** Når OPENAI_MODEL ikke er satt. */
export const DEFAULT_OPENAI_MODEL = "gpt-6.1-sol";

/**
 * Listepris i $ per million tokens (standard, ikke batch/cache).
 * Hentet 9. okt 2026 fra platform.openai.com/docs/pricing.
 * Modeller som mangler her vises uten pris.
 */
export const MODEL_PRICES: Record<string, { in: number; out: number }> = {
  "gpt-6-astra": { in: 10, out: 50 },
  "gpt-6.1-sol": { in: 2, out: 10 },
  "gpt-6-sol": { in: 2, out: 10 },
  "gpt-6-luna": { in: 0.1, out: 0.5 },
  "gpt-5.6-sol": { in: 4, out: 20 },
  "gpt-5.6-terra": { in: 2, out: 12 },
  "gpt-5.6-luna": { in: 0.2, out: 1.2 },
};

/** Svar fra en LLM for ett element. `answers` er JSON-en modellen skrev, om den kunne leses. */
export type LlmItem = {
  answers: Record<string, unknown> | null;
  text: string;
  input: number;
  output: number;
  reasoning: number;
};

/** Én linje i NDJSON-strømmen fra /api/jev med kind «batch». */
export type BatchLine =
  | { i: number; ok: true; data: JevResponse; latencyMs: number }
  | { i: number; ok: true; llm: LlmItem; latencyMs: number }
  | { i: number; ok: false; error: string; latencyMs: number }
  | { done: true; wallMs: number }
  | { fatal: string };

export const BATCH_MAX_ITEMS = 1000;
export const BATCH_MAX_CONCURRENCY = 100;

/** $ per million tokens. Jev: kun input. Output er gratis. */
export const JEV_PRICE_IN = 0.042;
/** Gemini 3.8 Flash slik prisen ble gjengitt i arXiv 2609.29769 (tabell B1). */
export const FLASH_PRICE_IN = 0.75;
export const FLASH_PRICE_OUT = 3.75;
/** Median ventetid per Jev-kall i arXiv 2609.29769, vedlegg A. */
export const JEV_MEDIAN_LATENCY_S = 0.19;

export function jevCostUsd(inputTokens: number): number {
  return (inputTokens / 1e6) * JEV_PRICE_IN;
}

export function llmCostUsd(
  inputTokens: number,
  outputTokens: number,
  priceIn = FLASH_PRICE_IN,
  priceOut = FLASH_PRICE_OUT
): number {
  return (inputTokens / 1e6) * priceIn + (outputTokens / 1e6) * priceOut;
}

export function formatUsd(v: number): string {
  if (v === 0) return "$0";
  if (v < 1) return `$${v.toFixed(Math.min(10, 2 - Math.floor(Math.log10(v))))}`;
  if (v < 100) return `$${v.toFixed(2)}`;
  return `$${Math.round(v).toLocaleString("nb-NO")}`;
}

export function formatInt(v: number): string {
  return Math.round(v).toLocaleString("nb-NO");
}

/* ------------------------------------------------------------------ */
/* Forhåndsoppsett. Innspilte svar er eksemplene fra TypeSafe-docs.    */
/* ------------------------------------------------------------------ */

export type Preset = {
  id: string;
  state: string;
  questions: Questions;
  /** Svar slik de står i dokumentasjonen – vises når vi ikke kjører live. */
  recorded: JevResponse;
};

const PAYOUTS = "Help! My payouts have been failing for 3 days.";
const STRIPE =
  "Hi, I've been trying to connect my Stripe account for 3 days and the integration keeps failing. I'm losing sales. Please help ASAP.";

export const PRESETS: Record<string, Preset> = {
  noul: {
    id: "noul",
    state: PAYOUTS,
    questions: {
      is_urgent: { type: "noul", instructions: "Does this convey urgency?" },
    },
    recorded: {
      model: "jev-1.13.0",
      answers: { is_urgent: { type: "noul", noul: 0.95 } },
      usage: { input_tokens: 296, output_tokens: 20 },
    },
  },
  choice: {
    id: "choice",
    state: PAYOUTS,
    questions: {
      department: {
        type: "choice",
        instructions: "Which team should handle this?",
        criteria: {
          billing: "Payments, invoicing, refunds",
          technical: "Bugs, outages, integrations",
          sales: "Pricing, upgrades, new accounts",
        },
      },
    },
    recorded: {
      model: "jev-1.13.0",
      answers: {
        department: {
          type: "choice",
          choice: "billing",
          probabilities: { billing: 0.88, technical: 0.12, sales: 0.0 },
          confidence: 0.81,
        },
      },
      usage: { input_tokens: 318, output_tokens: 34 },
    },
  },
  score: {
    id: "score",
    state: PAYOUTS,
    questions: {
      frustration: {
        type: "score",
        instructions: "How frustrated is the customer?",
        criteria: ["Calm", "Frustrated", "Very angry"],
      },
    },
    recorded: {
      model: "jev-1.13.0",
      answers: {
        frustration: {
          type: "score",
          score: 1.05,
          legend: { "0": "Calm", "1": "Frustrated", "2": "Very angry" },
          probabilities: { "0": 0.0, "1": 0.95, "2": 0.05 },
          confidence: 0.92,
        },
      },
      usage: { input_tokens: 304, output_tokens: 18 },
    },
  },
  alle: {
    id: "alle",
    state: STRIPE,
    questions: {
      department: {
        type: "choice",
        instructions: "Which team should handle this",
        criteria: {
          billing: "Payment or subscription issues",
          technical: "Bugs or integration problems",
          sales: "Pricing or account questions",
        },
      },
      frustration: {
        type: "score",
        instructions: "How frustrated the customer appears",
        criteria: [
          "Calm, just stating facts",
          "Frustrated but civil",
          "Very angry, strong language",
        ],
      },
      is_urgent: {
        type: "noul",
        instructions: "The message conveys urgency or time-sensitivity",
      },
    },
    recorded: {
      model: "jev-1.13.0",
      answers: {
        department: {
          type: "choice",
          choice: "technical",
          confidence: 0.78,
          probabilities: { technical: 0.85, sales: 0.0, billing: 0.15 },
        },
        frustration: {
          type: "score",
          score: 1.0,
          confidence: 1.0,
          legend: {
            "0": "Calm, just stating facts",
            "1": "Frustrated but civil",
            "2": "Very angry, strong language",
          },
          probabilities: { "0": 0.0, "1": 1.0, "2": 0.0 },
        },
        is_urgent: { type: "noul", noul: 1.0 },
      },
      usage: { input_tokens: 392, output_tokens: 65 },
    },
  },
};

/** Spørsmålet til bank-eksempelet (confidence-gated routing i TypeSafe-docs). */
export const BANK_QUESTIONS: Questions = {
  intent: {
    type: "choice",
    instructions: "What does the customer want to do?",
    criteria: {
      check_balance: "Hear the current account balance",
      approve_transfer: "Approve a pending money transfer",
      other: "Anything else, or unclear",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Klassifiseringsoppgaver til fart-demoen. Ett kall per element.      */
/* ------------------------------------------------------------------ */

export type ClassifyTask = {
  id: string;
  /** Kort navn på knappen. */
  name: string;
  /** Ett choice-spørsmål. Nøklene vises som etiketter på flisene. */
  question: ChoiceQuestion;
  /**
   * Settes foran hvert element i state. Enkeltord som «Fly», «Tog» og «Rev»
   * leses ellers som engelske ord.
   */
  prefix?: string;
  colors: Record<string, string>;
  items: string[];
};

const PALETTE = ["#004047", "#FF303B", "#C98A2B", "#2E8B7F", "#450D20", "#B72318"];

function colorsFor(criteria: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(Object.keys(criteria).map((k, i) => [k, PALETTE[i % PALETTE.length]]));
}

function task(t: Omit<ClassifyTask, "colors">): ClassifyTask {
  return { ...t, colors: colorsFor(t.question.criteria) };
}

export const CLASSIFY_TASKS: ClassifyTask[] = [
  task({
    id: "ting",
    name: "Hva er det?",
    question: {
      type: "choice",
      instructions: "What kind of thing is this?",
      criteria: {
        frukt: "Fruit or berry",
        grønnsak: "Vegetable",
        dyr: "Animal",
        kjøretøy: "Vehicle, vessel or aircraft",
        verktøy: "Tool or device",
      },
    },
    prefix: "Norwegian word: ",
    items: [
      "Banan", "Gulrot", "Elg", "Traktor", "Hammer", "Jordbær", "Brokkoli", "Laks", "Sparkesykkel", "Drill",
      "Eple", "Potet", "Hval", "Helikopter", "Skrutrekker", "Blåbær", "Løk", "Ørn", "Hurtigruta", "Sag",
      "Mango", "Kålrot", "Ku", "Tesla Model Y", "Tang", "Tyttebær", "Purre", "Rein", "Ferje", "Vater",
      "Ananas", "Spinat", "Sjøstjerne", "Elsparkesykkel", "Skiftenøkkel", "Kiwi", "Blomkål", "Hest", "Snøscooter", "Stikksag",
      "Appelsin", "Agurk", "Isbjørn", "Seilbåt", "Loddebolt", "Moltebær", "Hvitløk", "Måke", "Trikk", "Høvel",
      "Plomme", "Paprika", "Torsk", "Gravemaskin", "Meisel", "Rips", "Squash", "Ekorn", "Tankskip", "Multimeter",
      "Pære", "Selleri", "Lemen", "Fly", "Øks", "Bringebær", "Rødbete", "Krabbe", "Motorsykkel", "Tommestokk",
      "Sitron", "Asparges", "Gaupe", "Kajakk", "Vinkelsliper", "Druer", "Grønnkål", "Spekkhogger", "Lastebil", "Limpistol",
      "Fersken", "Pastinakk", "Ulv", "Ubåt", "Hullsag", "Vannmelon", "Reddik", "Lundefugl", "Tog", "Avbiter",
      "Granateple", "Erter", "Hummer", "Buss", "Skrustikke", "Kirsebær", "Aubergine", "Rev", "Redningsskøyte", "Fil",
    ],
  }),
  task({
    id: "kundeservice",
    name: "Kundeservice",
    question: {
      type: "choice",
      instructions: "Which team should handle this customer message?",
      criteria: {
        faktura: "Invoices, payments, charges or refunds",
        teknisk: "Bugs, outages, login or integration problems",
        salg: "Pricing, upgrades, new products or new customers",
        oppsigelse: "The customer wants to cancel or leave",
      },
    },
    items: [
      "Jeg har fått to fakturaer for samme måned.",
      "Appen krasjer hver gang jeg åpner den.",
      "Hva koster det å oppgradere til Pro?",
      "Jeg vil si opp abonnementet mitt fra neste måned.",
      "Hvorfor ble jeg trukket 499 kr i går?",
      "Får ikke logget inn, passordet virker ikke.",
      "Har dere rabatt for organisasjoner med 50 brukere?",
      "Takk for nå, jeg går over til en konkurrent.",
      "Kan jeg få refusjon for feil trekk?",
      "Integrasjonen mot Visma har sluttet å virke.",
      "Vi vurderer å kjøpe lisenser til hele avdelingen.",
      "Avslutt kontoen min, takk.",
      "Fakturaen har feil organisasjonsnummer.",
      "Siden laster ikke i Safari.",
      "Finnes det en årsplan som er billigere?",
      "Jeg ønsker ikke å fornye avtalen.",
      "Betalingen min ble avvist, men pengene er trukket.",
      "Eksporten til Excel gir bare tomme rader.",
      "Kan dere sende et tilbud på 200 lisenser?",
      "Hvordan sier jeg opp? Finner ikke knappen.",
      "Kan jeg få fakturaen på e-post i stedet for papir?",
      "Vi får feilmelding 500 når vi kaller API-et.",
      "Hva er forskjellen på Basis og Pro?",
      "Dette fungerer ikke for oss lenger, vi avslutter.",
      "Momsen på fakturaen ser feil ut.",
      "Varslene kommer ikke på telefonen lenger.",
      "Vi vil gjerne ha en demo for ledergruppen.",
      "Slett meg fra tjenesten.",
      "Kortet mitt er utløpt, hvordan oppdaterer jeg det?",
      "SSO mot Entra ID feiler etter siste oppdatering.",
      "Har dere en prøveperiode?",
      "Jeg har bestemt meg for å avslutte medlemskapet.",
      "Purring på en faktura jeg allerede har betalt?!",
      "Synkroniseringen stopper på 99 %.",
      "Kan vi legge til ti brukere til på avtalen?",
      "Ikke forny, vi bytter leverandør.",
      "Jeg trenger kvittering for mars.",
      "To-faktor-koden kommer aldri frem.",
      "Tilbyr dere studentpris?",
      "Avbestill alt, takk.",
    ],
  }),
  task({
    id: "anmeldelser",
    name: "Anmeldelser",
    question: {
      type: "choice",
      instructions: "What is the sentiment of this product review?",
      criteria: {
        positiv: "Positive, satisfied",
        nøytral: "Neutral or mixed",
        negativ: "Negative, dissatisfied",
      },
    },
    items: [
      "Helt fantastisk, kjøper igjen!",
      "Kom i stykker etter to dager.",
      "Grei nok for prisen.",
      "Rask levering og god kvalitet.",
      "Elendig kundeservice, svarte aldri.",
      "Gjør jobben, verken mer eller mindre.",
      "Beste kjøpet jeg har gjort i år.",
      "Fargen var helt annerledes enn på bildet.",
      "Som forventet.",
      "Barna elsker den!",
      "Batteriet holder i to timer. Skuffende.",
      "Fin, men litt dyr.",
      "Anbefales på det sterkeste.",
      "Returnerte den samme dag.",
      "Helt ok. Ingenting å skrive hjem om.",
      "Overgikk alle forventninger.",
      "Luktet rart og føltes billig.",
      "Leveringen tok tre uker, men produktet er bra.",
      "Perfekt passform.",
      "Pengene ut av vinduet.",
      "Fungerer. Bruksanvisningen er dårlig.",
      "Kjempefornøyd med alt.",
      "Sluttet å virke etter en uke.",
      "Gjennomsnittlig.",
      "Nydelig design og solid bygget.",
      "Aldri mer.",
      "Litt mindre enn jeg trodde, ellers fin.",
      "Veldig god lyd for prisen!",
      "Defekt ved levering.",
      "Kan brukes.",
      "Fem stjerner fra meg.",
      "Tok lang tid å få refusjon.",
      "Middels kvalitet, middels pris.",
      "Endelig en som holder hele vinteren.",
      "Ikke verdt pengene.",
      "Den er grå.",
      "Gleder meg hver gang jeg bruker den.",
      "Ødela hele helgen.",
      "Både bra og dårlig.",
      "Akkurat det jeg trengte.",
    ],
  }),
  task({
    id: "sjo",
    name: "Meldinger fra sjøen",
    question: {
      type: "choice",
      instructions: "What kind of maritime incident does this message report?",
      criteria: {
        grunnstøting: "Grounding: the vessel has run aground on rocks, a shoal or the seabed",
        kollisjon: "Collision with another vessel, a quay, a fish farm or another object",
        motorstans: "Engine failure, loss of propulsion, or rudder or steering failure",
        forurensning: "Oil, fuel, hydraulic oil, plastic or other pollution",
        "person i sjøen": "Person overboard or in the water",
      },
    },
    items: [
      "Vi har gått på et skjær ved Bremanger, tar inn vann.",
      "Mann over bord, sørvest for Utsira.",
      "Motoren har stoppet, vi driver mot land.",
      "Oljeflak observert ved kaia i Florø.",
      "Kolliderte med en fritidsbåt i innseilingen.",
      "Sitter fast på grunna utenfor Ålesund.",
      "Mistet styringen i stormen.",
      "Diesel lekker fra tanken ombord.",
      "Traff kaia under tillegging, skade på baugen.",
      "En passasjer falt i sjøen fra ferja.",
      "Vi har grunnstøtt ved fyret, ingen skadde.",
      "Propellen har fått tau i seg, ingen fremdrift.",
      "Regnbuefarget film på vannet bak fiskebåten.",
      "To fartøy har kollidert i tåka.",
      "Kajakkpadler har kantret og er i vannet.",
      "Har berørt bunnen, sjekker skrogskader.",
      "Black-out i maskinrommet, ankrer opp.",
      "Hydraulikkolje rant ut i havna.",
      "Seilbåt traff en merd i oppdrettsanlegget.",
      "Person observert i vannet ved moloen.",
      "Tråleren står på land ved Hustadvika.",
      "Hovedmaskin havarert, ber om slep.",
      "Skipet slipper ut olje etter skade.",
      "Kontainerskip og slepebåt kolliderte.",
      "Fisker falt over bord under trekking av garn.",
      "Rørt bunnen i sundet, ingen lekkasje.",
      "Roret sitter fast hardt styrbord.",
      "Store mengder plast og olje i fjæra.",
      "Rygget inn i en annen båt i gjestehavna.",
      "Barn falt fra brygga, henter opp nå.",
    ],
  }),
];

/* ------------------------------------------------------------------ */
/* Utgangspunktet: samme henvendelser til OpenAI, først fritekst, så    */
/* JSON bestilt i prompten, så Jev på samme tekst.                      */
/* ------------------------------------------------------------------ */

export const LIVE_INPUTS = [
  "Hei, jeg har prøvd å koble til Stripe-kontoen min i tre dager, og integrasjonen feiler hele tiden. Jeg taper salg. Hjelp ASAP!",
  "Hvorfor er jeg trukket to ganger for oktober? Vil ha pengene tilbake.",
  "Hei! Vi vurderer å oppgradere til Pro for hele avdelingen. Hva koster det for 40 brukere?",
  "Appen har vært nede siden i morges, og ingen av oss får logget inn. Dette er helt uakseptabelt.",
];

export type PromptMode = "fritekst" | "json";

export const LIVE_TEAMS = ["faktura", "teknisk", "salg"] as const;

export function buildLiveMessages(mode: PromptMode, input: string) {
  const ticket = `Kundehenvendelse:\n"""\n${input}\n"""`;
  if (mode === "fritekst") {
    return [
      {
        role: "user" as const,
        content: `${ticket}\n\nHvilket team bør ta denne: faktura, teknisk eller salg? Hvor frustrert er kunden, og haster det?`,
      },
    ];
  }
  return [
    { role: "developer" as const, content: "Du er en klassifiserer. Svar bare med ett JSON-objekt og ingenting annet." },
    {
      role: "user" as const,
      content:
        `${ticket}\n\nSvar med JSON på denne formen:\n` +
        `{"team": "faktura" | "teknisk" | "salg", "frustrasjon": 0 | 1 | 2, "haster": true | false}\n\n` +
        `frustrasjon: 0 = rolig, 1 = frustrert men høflig, 2 = svært sint.`,
    },
  ];
}

export type ShapeCheck = { label: string; short: string; ok: boolean; detail?: string };

/** Sjekker svaret slik koden din måtte gjort før den kan bruke det. */
export function checkJsonShape(raw: string): { parsed: Record<string, unknown> | null; checks: ShapeCheck[] } {
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
  const keys = obj ? Object.keys(obj).sort().join(", ") : "";
  checks.push({
    label: "nøkler: frustrasjon, haster, team",
    short: "felt",
    ok: keys === "frustrasjon, haster, team",
    detail: obj && keys !== "frustrasjon, haster, team" ? `fikk: ${keys || "ingen"}` : undefined,
  });
  const team = obj?.team;
  checks.push({
    label: "team er faktura | teknisk | salg",
    short: "team",
    ok: typeof team === "string" && (LIVE_TEAMS as readonly string[]).includes(team),
    detail: obj && team !== undefined ? `fikk: ${JSON.stringify(team)}` : undefined,
  });
  const f = obj?.frustrasjon;
  checks.push({
    label: "frustrasjon er 0, 1 eller 2",
    short: "frustrasjon",
    ok: f === 0 || f === 1 || f === 2,
    detail: obj && f !== undefined ? `fikk: ${JSON.stringify(f)}` : undefined,
  });
  const h = obj?.haster;
  checks.push({
    label: "haster er true eller false",
    short: "haster",
    ok: typeof h === "boolean",
    detail: obj && h !== undefined ? `fikk: ${JSON.stringify(h)}` : undefined,
  });
  return { parsed: obj, checks };
}

/** Jev-spørsmålene til samme henvendelser. Nøklene matcher JSON-formen over. */
export const LIVE_QUESTIONS: Questions = {
  team: {
    type: "choice",
    instructions: "Which team should handle this customer message?",
    criteria: {
      faktura: "Invoices, payments, charges or refunds",
      teknisk: "Bugs, outages, login or integration problems",
      salg: "Pricing, upgrades or new customers",
    },
  },
  frustrasjon: {
    type: "score",
    instructions: "How frustrated is the customer?",
    criteria: ["Calm, just stating facts", "Frustrated but civil", "Very angry, strong language"],
  },
  haster: { type: "noul", instructions: "The message conveys urgency or time-sensitivity" },
};

/** Linjer fra /api/jev med kind «openai-stream». */
export type StreamLine =
  | { t: "delta"; text: string }
  | { t: "done"; model: string; usage: { input: number; output: number; reasoning: number }; latencyMs: number; firstMs: number | null }
  | { t: "error"; error: string };

/* ------------------------------------------------------------------ */
/* Samme oppgave som en vanlig LLM-prompt.                             */
/* ------------------------------------------------------------------ */

function describeQuestion(id: string, q: Question): string {
  const ask = /[.?!]$/.test(q.instructions.trim()) ? q.instructions.trim() : `${q.instructions.trim()}?`;
  if (q.type === "noul") {
    return `- "${id}": ${ask} Answer with the probability (0 to 1) that the answer is yes.`;
  }
  if (q.type === "choice") {
    const opts = Object.entries(q.criteria)
      .map(([k, v]) => (v ? `"${k}" (${v})` : `"${k}"`))
      .join(", ");
    return `- "${id}": ${ask} Pick exactly one of: ${opts}.`;
  }
  const levels = q.criteria.map((c, i) => `${i} = ${c}`).join("; ");
  return `- "${id}": ${ask} Answer with a level number: ${levels}.`;
}

/**
 * Bygger en vanlig klassifiseringsprompt med samme innhold som Jev-kallet.
 * Slik ville mange løst oppgaven med en chat-modell i dag.
 */
export function buildLlmMessages(state: string, questions: Questions) {
  const system =
    "You are a classifier. Read the input and answer every question. " +
    "Reply with a single JSON object, one key per question id, and nothing else.";
  const user =
    `Input:\n"""\n${state}\n"""\n\nQuestions:\n` +
    Object.entries(questions)
      .map(([id, q]) => describeQuestion(id, q))
      .join("\n");
  return [
    { role: "system" as const, content: system },
    { role: "user" as const, content: user },
  ];
}

/** Grovt anslag: ~4 tegn per token for engelsk tekst. */
export function roughTokens(text: string): number {
  return Math.max(1, Math.round(text.length / 4));
}
