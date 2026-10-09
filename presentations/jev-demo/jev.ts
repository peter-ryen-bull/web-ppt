/*
 * Delte typer, priser og batching-teksten for Jev-demoen. Casene ligger i cases.ts.
 * Brukes både av slidene (klient) og av app/api/jev (server).
 *
 * Kilder (hentet 2. okt 2026):
 * - API og eksempelsvar: https://docs.typesafe.ai/api.md og /introduction/quickstart.md
 * - Pris og grenser: https://docs.typesafe.ai/models.md
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
  openai?: ProviderStatus;
};

/** Når verken presentatøren eller OPENAI_MODEL har valgt noe. */
export const DEFAULT_OPENAI_MODEL = "gpt-6.1-sol";
export const DEFAULT_OPENAI_EFFORT = "low";

export type OpenaiModel = { id: string; name: string; efforts: string[]; price: { in: number; out: number } };

/*
 * Modeller og listepris ($ per million tokens, standard) fra
 * platform.openai.com/docs/models og /docs/pricing, hentet 9. okt 2026.
 * Effort-nivåene er de API-et godtar per modell (testet 9. okt 2026);
 * ingen av dem godtar «minimal».
 */
const FULL = ["none", "low", "medium", "high", "xhigh", "max"];
export const OPENAI_MODELS: OpenaiModel[] = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", efforts: FULL.slice(1), price: { in: 10, out: 50 } },
  { id: "gpt-6.1-sol", name: "GPT-6.1 Sol", efforts: FULL.slice(1), price: { in: 2, out: 10 } },
  { id: "gpt-6-luna", name: "GPT-6 Luna", efforts: FULL, price: { in: 0.1, out: 0.5 } },
  { id: "gpt-6-sol", name: "GPT-6 Sol", efforts: FULL, price: { in: 2, out: 10 } },
  { id: "gpt-5.6-sol", name: "GPT-5.6 Sol", efforts: FULL, price: { in: 4, out: 20 } },
  { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", efforts: FULL, price: { in: 2, out: 12 } },
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", efforts: FULL, price: { in: 0.2, out: 1.2 } },
  { id: "gpt-5.5", name: "GPT-5.5", efforts: FULL.slice(0, -1), price: { in: 5, out: 30 } },
];

export const MODEL_PRICES: Record<string, { in: number; out: number }> = Object.fromEntries(
  OPENAI_MODELS.map((m) => [m.id, m.price])
);

export type OpenaiChoice = { model: string; effort: string };

/** Gyldig modell og effort. Ukjent modell gir standard; effort faller til «low» eller laveste nivå modellen har. */
export function normalizeOpenaiChoice(c: Partial<OpenaiChoice> | null | undefined): OpenaiChoice {
  const m = OPENAI_MODELS.find((x) => x.id === c?.model) ?? OPENAI_MODELS.find((x) => x.id === DEFAULT_OPENAI_MODEL)!;
  const effort = c?.effort && m.efforts.includes(c.effort) ? c.effort : m.efforts.includes(DEFAULT_OPENAI_EFFORT) ? DEFAULT_OPENAI_EFFORT : m.efforts[0];
  return { model: m.id, effort };
}

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

/** Listepris for modellen, også når API-et svarer med en datert variant (gpt-6.1-sol-2026-…). */
export function modelPrice(model: string | null | undefined): { in: number; out: number } | null {
  if (!model) return null;
  if (MODEL_PRICES[model]) return MODEL_PRICES[model];
  const key = Object.keys(MODEL_PRICES)
    .filter((k) => model.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return key ? MODEL_PRICES[key] : null;
}

export function jevCostUsd(inputTokens: number): number {
  return (inputTokens / 1e6) * JEV_PRICE_IN;
}

export function llmCostUsd(inputTokens: number, outputTokens: number, priceIn: number, priceOut: number): number {
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

/** Oppdiktet vilkårstekst til batching-sliden. Spørsmålene under har blandede svar. */
export const TERMS_DOC = `Nordlys Cloud AS – Terms of Service (excerpt)

1. Term and renewal. The subscription runs for twelve months from the start date and renews automatically for another twelve months unless either party cancels in writing at least 60 days before the renewal date.

2. Fees. Fees are invoiced annually in advance. Nordlys Cloud may adjust prices once per year by giving the customer at least 90 days written notice. Prepaid fees are non-refundable, including for unused time, except where required by law.

3. Customer data. Customer data is stored in data centres in Norway and Sweden and is not transferred outside the EU/EEA. Nordlys Cloud processes customer data only to provide the service and does not sell or share it with third parties for marketing purposes. Customer data is not used to train machine learning models.

4. Availability. Nordlys Cloud targets 99.9% monthly uptime. If the target is missed, the customer receives service credits of 5% of the monthly fee for each full 0.1% below target, up to 30% of the monthly fee.

5. Liability. Each party's total liability under this agreement is limited to the fees paid in the twelve months before the claim. Neither party is liable for indirect or consequential losses.

6. Termination. The customer may terminate for convenience at the end of the current term. Either party may terminate immediately if the other party materially breaches the agreement and fails to remedy the breach within 30 days of notice.

7. Governing law. This agreement is governed by Norwegian law. Disputes shall be resolved by the Oslo District Court.`;

export const TERMS_QUESTIONS: Questions = {
  auto_renewal: { type: "noul", instructions: "The subscription renews automatically unless cancelled" },
  refund_unused: { type: "noul", instructions: "The customer can get a refund for unused prepaid time" },
  eu_only: { type: "noul", instructions: "Customer data stays within the EU/EEA" },
  short_price_notice: { type: "noul", instructions: "Prices can be changed with less than 30 days notice" },
  liability_cap: { type: "noul", instructions: "The provider's liability is capped" },
  marketing_sharing: { type: "noul", instructions: "Customer data may be shared with third parties for marketing" },
  sla_credits: { type: "noul", instructions: "The customer gets compensation if uptime targets are missed" },
  norwegian_law: { type: "noul", instructions: "Disputes are governed by Norwegian law" },
  ai_training: { type: "noul", instructions: "Customer data may be used to train AI models" },
  quick_exit: { type: "noul", instructions: "The customer can cancel at any time with 30 days notice or less" },
};

export type PromptMode = "fritekst" | "json";

export type ShapeCheck = { label: string; short: string; ok: boolean; detail?: string };

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
