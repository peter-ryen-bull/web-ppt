import { NextResponse } from "next/server";
import { buildLlmMessages, type Questions } from "@/presentations/jev-demo/jev";

/*
 * Proxy for Jev-demoen. Nøklene blir på serveren.
 *
 *   TYPESAFE_API_KEY   påkrevd for live Jev-kall
 *   LLM_API_KEY        valgfri: sammenligning med en OpenAI-kompatibel chat-modell
 *   LLM_BASE_URL       valgfri, standard https://api.openai.com/v1
 *   LLM_MODEL          påkrevd sammen med LLM_API_KEY
 */

const TYPESAFE_URL = "https://api.typesafe.ai/v1/systemone";
const MAX_STATE_CHARS = 60_000;
const MAX_QUESTIONS = 50;

function llmConfig() {
  const key = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;
  if (!key || !model) return null;
  const base = (process.env.LLM_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  return { key, model, base };
}

export async function GET() {
  const llm = llmConfig();
  return NextResponse.json({
    jev: Boolean(process.env.TYPESAFE_API_KEY),
    llm: { configured: Boolean(llm), model: llm?.model ?? null },
  });
}

type Body = { kind?: unknown; state?: unknown; questions?: unknown; model?: unknown };

function errorText(status: number, body: string): string {
  try {
    const parsed = JSON.parse(body) as { error?: unknown; detail?: unknown };
    const detail = parsed.error ?? parsed.detail;
    if (detail) return `HTTP ${status}: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`;
  } catch {
    /* ikke JSON */
  }
  return `HTTP ${status}: ${body.slice(0, 300)}`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Ugyldig JSON." }, { status: 400 });
  }

  const state = body.state;
  const questions = body.questions;
  if (
    typeof state !== "string" ||
    state.length > MAX_STATE_CHARS ||
    !questions ||
    typeof questions !== "object" ||
    Array.isArray(questions) ||
    Object.keys(questions).length === 0 ||
    Object.keys(questions).length > MAX_QUESTIONS
  ) {
    return NextResponse.json(
      { ok: false, error: "Mangler gyldig state eller questions." },
      { status: 400 }
    );
  }

  if (body.kind === "llm") {
    const llm = llmConfig();
    if (!llm) {
      return NextResponse.json({
        ok: false,
        error: "LLM-sammenligning er ikke satt opp (LLM_API_KEY og LLM_MODEL).",
      });
    }
    const started = performance.now();
    const res = await fetch(`${llm.base}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${llm.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: llm.model,
        messages: buildLlmMessages(state, questions as Questions),
        response_format: { type: "json_object" },
      }),
    });
    const latencyMs = performance.now() - started;
    const text = await res.text();
    if (!res.ok) return NextResponse.json({ ok: false, error: errorText(res.status, text) });
    const data = JSON.parse(text) as {
      model?: string;
      choices?: { message?: { content?: string } }[];
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        completion_tokens_details?: { reasoning_tokens?: number };
      };
    };
    return NextResponse.json({
      ok: true,
      model: data.model ?? llm.model,
      text: data.choices?.[0]?.message?.content ?? "",
      usage: {
        input: data.usage?.prompt_tokens ?? 0,
        output: data.usage?.completion_tokens ?? 0,
        reasoning: data.usage?.completion_tokens_details?.reasoning_tokens ?? 0,
      },
      latencyMs,
    });
  }

  const key = process.env.TYPESAFE_API_KEY;
  if (!key) {
    return NextResponse.json({
      ok: false,
      error: "TYPESAFE_API_KEY mangler i .env.local – viser innspilt svar.",
    });
  }
  const model = typeof body.model === "string" ? body.model : "jev-latest";
  const started = performance.now();
  const res = await fetch(TYPESAFE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ state, model, questions }),
  });
  const latencyMs = performance.now() - started;
  const text = await res.text();
  if (!res.ok) return NextResponse.json({ ok: false, error: errorText(res.status, text) });
  return NextResponse.json({ ok: true, data: JSON.parse(text), latencyMs });
}
