import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import {
  BATCH_MAX_CONCURRENCY,
  BATCH_MAX_ITEMS,
  buildLiveMessages,
  buildLlmMessages,
  DEFAULT_OPENAI_MODEL,
  type BatchLine,
  type JevResponse,
  type LlmItem,
  type Questions,
  type StreamLine,
} from "@/presentations/jev-demo/jev";

/*
 * Proxy for Jev-demoen. Nøklene blir på serveren. Hver variabel leses fra
 * miljøet (.env / .env.local i web-ppt/) og ellers fra
 * presentations/jev-demo/.env (ikke i git, leses ved hvert kall).
 *
 *   API_KEY / TYPESAFE_API_KEY   live Jev-kall
 *   OPENAI_API_KEY               valgfri: sammenligning med GPT
 *   OPENAI_MODEL                 standard gpt-6.1-sol
 *   OPENAI_REASONING_EFFORT      standard low
 *   LLM_API_KEY / LLM_MODEL / LLM_BASE_URL
 *                                valgfri: «Samme med LLM» i steg 4
 */

const TYPESAFE_URL = "https://api.typesafe.ai/v1/systemone";
const OPENAI_URL = "https://api.openai.com/v1/responses";
const MAX_STATE_CHARS = 60_000;
const MAX_ITEM_CHARS = 2_000;
const MAX_QUESTIONS = 50;
const DECK_ENV = join(process.cwd(), "presentations", "jev-demo", ".env");

function deckEnv(): Record<string, string> {
  try {
    const out: Record<string, string> = {};
    for (const line of readFileSync(DECK_ENV, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
    return out;
  } catch {
    return {};
  }
}

function envValue(name: string, local = deckEnv()): string | null {
  return process.env[name] || local[name] || null;
}

function jevKey(): string | null {
  const local = deckEnv();
  return envValue("TYPESAFE_API_KEY", local) ?? envValue("API_KEY", local);
}

function openaiConfig() {
  const local = deckEnv();
  return {
    keyEnv: "OPENAI_API_KEY",
    key: envValue("OPENAI_API_KEY", local),
    model: envValue("OPENAI_MODEL", local) ?? DEFAULT_OPENAI_MODEL,
    effort: envValue("OPENAI_REASONING_EFFORT", local) ?? "low",
  };
}

function llmConfig() {
  const key = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;
  if (!key || !model) return null;
  const base = (process.env.LLM_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  return { key, model, base };
}

export async function GET() {
  const llm = llmConfig();
  const openai = openaiConfig();
  return NextResponse.json({
    jev: Boolean(jevKey()),
    llm: { configured: Boolean(llm), model: llm?.model ?? null },
    openai: { configured: Boolean(openai.key), model: openai.model, keyEnv: openai.keyEnv, effort: openai.effort },
  });
}

type Body = {
  kind?: unknown;
  state?: unknown;
  items?: unknown;
  questions?: unknown;
  model?: unknown;
  concurrency?: unknown;
  provider?: unknown;
  promptMode?: unknown;
};

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

function validQuestions(questions: unknown): questions is Questions {
  return (
    !!questions &&
    typeof questions === "object" &&
    !Array.isArray(questions) &&
    Object.keys(questions).length > 0 &&
    Object.keys(questions).length <= MAX_QUESTIONS
  );
}

type JevCall =
  | { ok: true; data: JevResponse; latencyMs: number }
  | { ok: false; error: string; latencyMs: number };

async function callJev(
  key: string,
  state: string,
  questions: Questions,
  model: string,
  signal?: AbortSignal
): Promise<JevCall> {
  const started = performance.now();
  try {
    const res = await fetch(TYPESAFE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ state, model, questions }),
      signal,
    });
    const text = await res.text();
    const latencyMs = performance.now() - started;
    if (!res.ok) return { ok: false, error: errorText(res.status, text), latencyMs };
    return { ok: true, data: JSON.parse(text) as JevResponse, latencyMs };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e), latencyMs: performance.now() - started };
  }
}

type LlmCall = { ok: true; llm: LlmItem; latencyMs: number } | { ok: false; error: string; latencyMs: number };

function parseAnswers(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

type OpenaiMessage = { role: "developer" | "system" | "user"; content: string };

function openaiBody(cfg: { model: string; effort: string }, input: OpenaiMessage[], jsonMode: boolean, stream = false) {
  return JSON.stringify({
    model: cfg.model,
    input,
    reasoning: { effort: cfg.effort },
    ...(jsonMode ? { text: { format: { type: "json_object" } } } : {}),
    ...(stream ? { stream: true } : {}),
  });
}

/** Klassifiseringsprompten fra steg 4 med JSON-modus. */
function classifierMessages(state: string, questions: Questions): OpenaiMessage[] {
  // json_object krever ordet «JSON» i input-meldingene; `instructions` teller ikke.
  const [system, user] = buildLlmMessages(state, questions);
  return [
    { role: "developer", content: system.content },
    { role: "user", content: user.content },
  ];
}

async function callOpenai(
  cfg: { key: string; model: string; effort: string },
  input: OpenaiMessage[],
  jsonMode: boolean,
  signal?: AbortSignal
): Promise<LlmCall> {
  const started = performance.now();
  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.key}`, "Content-Type": "application/json" },
      body: openaiBody(cfg, input, jsonMode),
      signal,
    });
    const raw = await res.text();
    const latencyMs = performance.now() - started;
    if (!res.ok) return { ok: false, error: errorText(res.status, raw), latencyMs };
    const data = JSON.parse(raw) as {
      output?: { type: string; content?: { type: string; text?: string }[] }[];
      usage?: { input_tokens?: number; output_tokens?: number; output_tokens_details?: { reasoning_tokens?: number } };
    };
    const text = (data.output ?? [])
      .filter((o) => o.type === "message")
      .flatMap((o) => o.content ?? [])
      .filter((c) => c.type === "output_text")
      .map((c) => c.text ?? "")
      .join("");
    return {
      ok: true,
      llm: {
        answers: parseAnswers(text),
        text,
        input: data.usage?.input_tokens ?? 0,
        output: data.usage?.output_tokens ?? 0,
        reasoning: data.usage?.output_tokens_details?.reasoning_tokens ?? 0,
      },
      latencyMs,
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e), latencyMs: performance.now() - started };
  }
}

/** Videresender OpenAIs SSE-strøm som NDJSON: tekstbiter, så tokenbruk og tider fra svaret. */
function streamOpenai(req: Request, cfg: { key: string; model: string; effort: string }, input: OpenaiMessage[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (line: StreamLine) => controller.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));
      const started = performance.now();
      let firstMs: number | null = null;
      try {
        const res = await fetch(OPENAI_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${cfg.key}`, "Content-Type": "application/json" },
          body: openaiBody(cfg, input, false, true),
          signal: req.signal,
        });
        if (!res.ok || !res.body) {
          send({ t: "error", error: errorText(res.status, await res.text()) });
          controller.close();
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let finished = false;
        while (!finished) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const ev of events) {
            const data = ev
              .split("\n")
              .filter((l) => l.startsWith("data:"))
              .map((l) => l.slice(5).trim())
              .join("");
            if (!data || data === "[DONE]") continue;
            const msg = JSON.parse(data) as {
              type?: string;
              delta?: string;
              message?: string;
              response?: {
                model?: string;
                error?: { message?: string } | null;
                usage?: { input_tokens?: number; output_tokens?: number; output_tokens_details?: { reasoning_tokens?: number } };
              };
            };
            if (msg.type === "response.output_text.delta" && msg.delta) {
              firstMs ??= performance.now() - started;
              send({ t: "delta", text: msg.delta });
            } else if (msg.type === "response.completed") {
              const u = msg.response?.usage;
              send({
                t: "done",
                model: msg.response?.model ?? cfg.model,
                usage: { input: u?.input_tokens ?? 0, output: u?.output_tokens ?? 0, reasoning: u?.output_tokens_details?.reasoning_tokens ?? 0 },
                latencyMs: performance.now() - started,
                firstMs,
              });
              finished = true;
            } else if (msg.type === "response.failed" || msg.type === "error") {
              send({ t: "error", error: msg.response?.error?.message ?? msg.message ?? "OpenAI-feil" });
              finished = true;
            }
          }
        }
      } catch (e) {
        if (!req.signal.aborted) send({ t: "error", error: e instanceof Error ? e.message : String(e) });
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
  });
}

/** Ett kall per element, med begrenset parallellitet. Svarene strømmes som NDJSON. */
function runBatch(
  req: Request,
  call: (state: string, signal: AbortSignal) => Promise<JevCall | LlmCall>,
  items: string[],
  concurrency: number
): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (line: BatchLine) => controller.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));
      const started = performance.now();
      let next = 0;
      const worker = async () => {
        while (next < items.length && !req.signal.aborted) {
          const i = next++;
          const res = await call(items[i], req.signal);
          if (req.signal.aborted) return;
          send({ i, ...res });
        }
      };
      try {
        await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
        if (!req.signal.aborted) send({ done: true, wallMs: performance.now() - started });
      } catch (e) {
        send({ fatal: e instanceof Error ? e.message : String(e) });
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
  });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Ugyldig JSON." }, { status: 400 });
  }

  const questions = body.questions;
  const model = typeof body.model === "string" ? body.model : "jev-latest";

  if (body.kind === "openai-stream") {
    const mode = body.promptMode === "json" ? "json" : "fritekst";
    const input = body.state;
    if (typeof input !== "string" || !input.trim() || input.length > MAX_ITEM_CHARS) {
      return NextResponse.json({ ok: false, error: "Mangler gyldig tekst." }, { status: 400 });
    }
    const cfg = openaiConfig();
    const key = cfg.key;
    if (!key) return NextResponse.json({ ok: false, error: `Ingen nøkkel: ${cfg.keyEnv} er ikke satt.` });
    return streamOpenai(req, { ...cfg, key }, buildLiveMessages(mode, input));
  }

  if (body.kind === "batch") {
    const items = body.items;
    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > BATCH_MAX_ITEMS ||
      !items.every((s) => typeof s === "string" && s.length > 0 && s.length <= MAX_ITEM_CHARS) ||
      (!validQuestions(questions) && !(body.provider === "openai" && body.promptMode))
    ) {
      return NextResponse.json({ ok: false, error: "Mangler gyldige items eller questions." }, { status: 400 });
    }
    const requested = typeof body.concurrency === "number" ? Math.floor(body.concurrency) : 50;
    const concurrency = Math.max(1, Math.min(BATCH_MAX_CONCURRENCY, requested));
    if (body.provider === "openai") {
      const cfg = openaiConfig();
      const key = cfg.key;
      if (!key) return NextResponse.json({ ok: false, error: `Ingen nøkkel: ${cfg.keyEnv} er ikke satt.` });
      const live = body.promptMode === "json" || body.promptMode === "fritekst" ? body.promptMode : null;
      return runBatch(
        req,
        (state, signal) =>
          live
            ? callOpenai({ ...cfg, key }, buildLiveMessages(live, state), false, signal)
            : callOpenai({ ...cfg, key }, classifierMessages(state, questions as Questions), true, signal),
        items as string[],
        concurrency
      );
    }
    const key = jevKey();
    if (!key) {
      return NextResponse.json({ ok: false, error: "Mangler Jev-nøkkel (API_KEY i presentations/jev-demo/.env)." });
    }
    if (!validQuestions(questions)) {
      return NextResponse.json({ ok: false, error: "Mangler gyldige questions." }, { status: 400 });
    }
    return runBatch(req, (state, signal) => callJev(key, state, questions, model, signal), items as string[], concurrency);
  }

  const state = body.state;
  if (typeof state !== "string" || state.length > MAX_STATE_CHARS || !validQuestions(questions)) {
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
        messages: buildLlmMessages(state, questions),
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

  const key = jevKey();
  if (!key) {
    return NextResponse.json({
      ok: false,
      error: "Mangler Jev-nøkkel (API_KEY i presentations/jev-demo/.env) – viser innspilt svar.",
    });
  }
  const res = await callJev(key, state, questions, model);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error });
  return NextResponse.json(res);
}
