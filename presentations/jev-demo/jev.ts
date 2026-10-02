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

export type DemoStatus = { jev: boolean; llm: { configured: boolean; model: string | null } };

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
