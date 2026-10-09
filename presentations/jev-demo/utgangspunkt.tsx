"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Copy } from "@/components/Copy";
import { Box, pt } from "../parts";
import {
  buildLiveMessages,
  checkJsonShape,
  formatUsd,
  jevCostUsd,
  LIVE_INPUTS,
  LIVE_QUESTIONS,
  llmCostUsd,
  modelPrice,
  type Answer,
  type BatchLine,
  type JevResponse,
  type PromptMode,
  type ShapeCheck,
  type StreamLine,
} from "./jev";
import { getOpenaiChoice } from "./openai-choice";
import { apiBody, Body, Button, Card, Header, interactive, Label, MONO, MUTED, OpenaiPicker, PINK, ProbBar, runJev, sans, serif, Stat, streamBatch, useDemoStatus } from "./ui";

/*
 * Utgangspunktet: tre slides på de samme henvendelsene. Valget deles mellom
 * slidene, så neste slide starter på samme tekst.
 */

let selectedInput = 0;
const inputListeners = new Set<() => void>();

function subscribeInput(fn: () => void) {
  inputListeners.add(fn);
  return () => {
    inputListeners.delete(fn);
  };
}

function useLiveInput(): [number, (i: number) => void] {
  const i = useSyncExternalStore(subscribeInput, () => selectedInput, () => 0);
  const set = useCallback((n: number) => {
    selectedInput = n;
    inputListeners.forEach((l) => l());
  }, []);
  return [i, set];
}

function InputPicker({ disabled }: { disabled?: boolean }) {
  const [i, setI] = useLiveInput();
  return (
    <div {...interactive} style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Copy k="input_label" as="span" style={{ ...sans, fontSize: pt(10.5), fontWeight: 700, letterSpacing: 1, color: MUTED, marginRight: 6 }} />
      {LIVE_INPUTS.map((_, n) => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.currentTarget.blur();
            setI(n);
          }}
          style={{
            ...sans,
            width: 30,
            height: 26,
            fontSize: pt(12),
            fontWeight: 700,
            border: "1.5px solid var(--burgundy)",
            background: n === i ? "var(--burgundy)" : "transparent",
            color: n === i ? "#fff" : "var(--burgundy)",
            cursor: disabled ? "default" : "pointer",
            opacity: disabled && n !== i ? 0.4 : 1,
          }}
        >
          {n + 1}
        </button>
      ))}
    </div>
  );
}

function PromptView({ mode, input, size = 10 }: { mode: PromptMode; input: string; size?: number }) {
  return (
    <pre
      style={{
        margin: "6px 0 0",
        fontFamily: MONO,
        fontSize: pt(size),
        lineHeight: 1.35,
        whiteSpace: "pre-wrap",
        color: "var(--burgundy)",
      }}
    >
      {buildLiveMessages(mode, input).map((m, i) => (
        <span key={i}>
          {i > 0 && "\n\n"}
          <span style={{ color: MUTED }}>{m.role}: </span>
          {m.content}
        </span>
      ))}
    </pre>
  );
}

function SectionLabel({ k, style }: { k: string; style?: CSSProperties }) {
  return <Copy k={k} as="div" style={{ ...sans, fontSize: pt(10.5), fontWeight: 700, letterSpacing: 1, color: MUTED, ...style }} />;
}

/* ------------------------------------------------------------------ */
/* Strømmet OpenAI-kall                                                 */
/* ------------------------------------------------------------------ */

type Usage = { input: number; output: number; reasoning: number };

type Stream = {
  status: "idle" | "waiting" | "streaming" | "done" | "error";
  text: string;
  t0: number;
  firstMs: number | null;
  totalMs: number | null;
  usage: Usage | null;
  model: string | null;
  error: string | null;
};

const IDLE: Stream = { status: "idle", text: "", t0: 0, firstMs: null, totalMs: null, usage: null, model: null, error: null };

function useOpenaiStream() {
  const [s, setS] = useState<Stream>(IDLE);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  const start = useCallback(async (mode: PromptMode, input: string) => {
    abort.current?.abort();
    const ac = new AbortController();
    abort.current = ac;
    const t0 = performance.now();
    setS({ ...IDLE, status: "waiting", t0 });
    const fail = (error: string) => {
      if (!ac.signal.aborted) setS((p) => ({ ...p, status: "error", error, totalMs: performance.now() - t0 }));
    };
    try {
      const res = await fetch("/api/jev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: apiBody({ kind: "openai-stream", promptMode: mode, state: input }),
        signal: ac.signal,
      });
      if (!res.headers.get("content-type")?.includes("ndjson") || !res.body) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        return fail(body?.error ?? `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          if (!part) continue;
          const line = JSON.parse(part) as StreamLine;
          const now = performance.now() - t0;
          if (line.t === "delta") {
            setS((p) => ({ ...p, status: "streaming", text: p.text + line.text, firstMs: p.firstMs ?? now }));
          } else if (line.t === "done") {
            setS((p) => ({ ...p, status: "done", totalMs: now, usage: line.usage, model: line.model }));
          } else {
            fail(line.error);
          }
        }
      }
      if (!ac.signal.aborted) {
        setS((p) =>
          p.status === "waiting" || p.status === "streaming"
            ? { ...p, status: "error", error: "Strømmen stoppet uten svar.", totalMs: performance.now() - t0 }
            : p
        );
      }
    } catch (e) {
      fail(e instanceof Error ? e.message : String(e));
    }
  }, []);

  return { s, start };
}

function useNow(running: boolean): number {
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!running) return;
    let id = requestAnimationFrame(function tick() {
      setNow(performance.now());
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [running]);
  return now;
}

function isRunning(s: Stream) {
  return s.status === "waiting" || s.status === "streaming";
}

function elapsedMs(s: Stream, now: number): number {
  if (s.totalMs !== null) return s.totalMs;
  if (!isRunning(s)) return 0;
  return Math.max(0, now - s.t0);
}

function secs(ms: number | null): string {
  return ms === null ? "–" : `${(ms / 1000).toFixed(2)} s`;
}

function openaiCost(model: string | null, input: number, output: number): string {
  const p = modelPrice(model);
  return p ? formatUsd(llmCostUsd(input, output, p.in, p.out)) : "–";
}

/** Råteksten slik den kommer, med markør mens den skrives. */
function RawBox({ s, height, size = 11 }: { s: Stream; height: number; size?: number }) {
  const ref = useRef<HTMLPreElement>(null);
  const now = useNow(s.status === "waiting");
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [s.text]);
  return (
    <pre
      ref={ref}
      {...interactive}
      style={{
        margin: "6px 0 0",
        height,
        overflow: "auto",
        boxSizing: "border-box",
        padding: "10px 12px",
        background: "#fff",
        border: "1.5px solid var(--divider)",
        fontFamily: MONO,
        fontSize: pt(size),
        lineHeight: 1.4,
        whiteSpace: "pre-wrap",
        color: "var(--burgundy)",
      }}
    >
      {s.status === "idle" && <span style={{ color: MUTED }}>Ingen kall ennå.</span>}
      {s.status === "waiting" && (
        <span style={{ color: MUTED }}>venter på første token … {secs(Math.max(0, now - s.t0))}</span>
      )}
      {s.text}
      {s.status === "streaming" && <span style={{ background: "var(--red)", color: "var(--red)" }}>▍</span>}
      {s.status === "error" && <span style={{ color: "var(--red-deep)" }}>{`\n${s.error}`}</span>}
    </pre>
  );
}

function StreamStats({ s, color = "var(--burgundy)" }: { s: Stream; color?: string }) {
  const now = useNow(isRunning(s));
  const u = s.usage;
  return (
    <div style={{ display: "flex", gap: 26, marginTop: 14 }}>
      <Stat label="første token" value={secs(s.firstMs)} color={color} />
      <Stat label="totalt" value={s.status === "idle" ? "–" : secs(elapsedMs(s, now))} color={color} />
      <Stat label="output-tokens" value={u ? u.output : "–"} sub={u && u.reasoning ? `${u.reasoning} resonnering` : undefined} color={color} />
      <Stat label="kostnad" value={u ? openaiCost(s.model, u.input, u.output) : "–"} sub={u ? `${u.input} inn` : undefined} color={color} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Fritekst                                                          */
/* ------------------------------------------------------------------ */

export function SlideProblemet() {
  const [i] = useLiveInput();
  const { s, start } = useOpenaiStream();
  const status = useDemoStatus();
  const running = isRunning(s);
  return (
    <>
      <Header />
      <Card box={[81, 175, 520, 495]} bar="var(--red-deep)">
        <Box box={[20, 20, 480, 455]}>
          <InputPicker disabled={running} />
          <SectionLabel k="prompt_label" style={{ marginTop: 18 }} />
          <PromptView mode="fritekst" input={LIVE_INPUTS[i]} size={11} />
          <div {...interactive} style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "center" }}>
            <Button onClick={() => start("fritekst", LIVE_INPUTS[i])} disabled={running || !status?.openai?.configured}>
              Send til OpenAI
            </Button>
            <OpenaiPicker disabled={running} />
          </div>
        </Box>
      </Card>
      <Card box={[625, 175, 575, 495]} bar="var(--burgundy)">
        <Box box={[20, 20, 535, 455]}>
          <SectionLabel k="answer_label" />
          <RawBox s={s} height={340} size={11} />
          <StreamStats s={s} />
        </Box>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Be om JSON, én gang og 100 ganger                                 */
/* ------------------------------------------------------------------ */

const BATCH_N = 100;

type FormatResult =
  | { ok: true; text: string; latencyMs: number; answer: string; input: number; output: number }
  | { ok: false; reason: string; text: string; failed: ShapeCheck[]; latencyMs: number; input: number; output: number };

function failReason(checks: ShapeCheck[], parsed: Record<string, unknown> | null): string {
  if (!checks[0].ok) return parsed ? "JSON i ```-blokk" : "ikke gyldig JSON";
  if (!checks[1].ok) return "feil felt";
  return "verdi utenfor listen";
}

function toFormatResult(line: Extract<BatchLine, { i: number }>): FormatResult {
  if (!line.ok) return { ok: false, reason: "API-feil", text: line.error, failed: [], latencyMs: line.latencyMs, input: 0, output: 0 };
  if (!("llm" in line)) return { ok: false, reason: "API-feil", text: "uventet svar", failed: [], latencyMs: line.latencyMs, input: 0, output: 0 };
  const { text, input, output } = line.llm;
  const { parsed, checks } = checkJsonShape(text);
  const failed = checks.filter((c) => !c.ok);
  if (failed.length === 0 && parsed) {
    return { ok: true, text, latencyMs: line.latencyMs, answer: `${parsed.team} · ${parsed.frustrasjon} · ${parsed.haster}`, input, output };
  }
  return { ok: false, reason: failReason(checks, parsed), text, failed, latencyMs: line.latencyMs, input, output };
}

function CheckList({ checks }: { checks: ShapeCheck[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 6 }}>
      {checks.map((c) => (
        <div key={c.label} style={{ display: "flex", gap: 8, ...sans, fontSize: pt(11), color: "var(--burgundy)" }}>
          <span style={{ width: 16, fontWeight: 700, color: c.ok ? "var(--teal)" : "var(--red)" }}>{c.ok ? "✓" : "✗"}</span>
          <span style={{ fontFamily: MONO, fontSize: pt(10.5) }}>{c.label}</span>
          {!c.ok && c.detail && <span style={{ color: "var(--red-deep)" }}>{c.detail}</span>}
        </div>
      ))}
    </div>
  );
}

function CheckChips({ checks }: { checks: ShapeCheck[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
      {checks.map((c) => (
        <span
          key={c.label}
          title={c.detail ? `${c.label}: ${c.detail}` : c.label}
          style={{
            ...sans,
            fontSize: pt(10.5),
            fontWeight: 700,
            padding: "2px 8px",
            background: c.ok ? "var(--teal)" : "var(--red)",
            color: c.ok ? "var(--mint)" : "#fff",
          }}
        >
          {c.ok ? "✓" : "✗"} {c.short}
        </span>
      ))}
    </div>
  );
}

export function SlideJsonForsok() {
  const [i] = useLiveInput();
  const { s, start } = useOpenaiStream();
  const status = useDemoStatus();
  const single = s.status === "done" ? checkJsonShape(s.text) : null;
  const live = Boolean(status?.openai?.configured);

  const [results, setResults] = useState<(FormatResult | undefined)[]>([]);
  const [wallMs, setWallMs] = useState<number | null>(null);
  const [batchT0, setBatchT0] = useState(0);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchModel, setBatchModel] = useState<string | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  const now = useNow(batchRunning);

  const runBatch = async () => {
    abort.current?.abort();
    const ac = new AbortController();
    abort.current = ac;
    const input = LIVE_INPUTS[i];
    const t0 = performance.now();
    setResults(new Array(BATCH_N).fill(undefined));
    setWallMs(null);
    setBatchT0(t0);
    setBatchModel(getOpenaiChoice().model);
    setBatchError(null);
    setPicked(null);
    setBatchRunning(true);
    const err = await streamBatch(
      new Array(BATCH_N).fill(input),
      LIVE_QUESTIONS,
      BATCH_N,
      (lines) => {
        setResults((prev) => {
          const next = prev.slice();
          for (const line of lines) {
            if ("i" in line) next[line.i] = toFormatResult(line);
          }
          return next;
        });
        if (lines.some((l) => "done" in l)) setWallMs(performance.now() - t0);
        const fatal = lines.find((l): l is { fatal: string } => "fatal" in l);
        if (fatal) setBatchError(fatal.fatal);
      },
      ac.signal,
      "openai",
      "json"
    );
    if (!ac.signal.aborted) {
      if (err) setBatchError(err);
      setBatchRunning(false);
    }
  };

  const done = results.filter((r): r is FormatResult => r !== undefined);
  const okCount = done.filter((r) => r.ok).length;
  const fails = done.filter((r): r is Extract<FormatResult, { ok: false }> => !r.ok);
  const reasons = new Map<string, number>();
  for (const f of fails) reasons.set(f.reason, (reasons.get(f.reason) ?? 0) + 1);
  const answers = new Map<string, number>();
  for (const r of done) if (r.ok) answers.set(r.answer, (answers.get(r.answer) ?? 0) + 1);
  const topAnswers = [...answers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const inTok = done.reduce((a, r) => a + r.input, 0);
  const outTok = done.reduce((a, r) => a + r.output, 0);
  const firstFail = results.findIndex((r) => r && !r.ok);
  const shown = picked ?? (firstFail >= 0 ? firstFail : null);
  const shownResult = shown !== null ? results[shown] : undefined;
  const elapsed = wallMs ?? (batchRunning ? Math.max(0, now - batchT0) : null);

  return (
    <>
      <Header />
      <Card box={[81, 175, 500, 495]} bar="var(--red-deep)">
        <Box box={[18, 16, 464, 465]}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <InputPicker disabled={isRunning(s) || batchRunning} />
            <div {...interactive}>
              <Button onClick={() => start("json", LIVE_INPUTS[i])} disabled={isRunning(s) || !live}>
                Send én
              </Button>
            </div>
          </div>
          <SectionLabel k="prompt_label" style={{ marginTop: 12 }} />
          <PromptView mode="json" input={LIVE_INPUTS[i]} size={9} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
            <SectionLabel k="answer_label" />
            <OpenaiPicker disabled={isRunning(s) || batchRunning} />
          </div>
          <RawBox s={s} height={44} size={10.5} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {single ? <CheckChips checks={single.checks} /> : <span />}
            {s.status === "done" && (
              <span style={{ fontFamily: MONO, fontSize: pt(10), color: MUTED, marginTop: 8 }}>
                {secs(s.totalMs)} · {s.usage?.output ?? 0} ut · {s.usage ? openaiCost(s.model, s.usage.input, s.usage.output) : ""}
              </span>
            )}
          </div>
        </Box>
      </Card>

      <Card box={[605, 175, 595, 495]} bar="var(--burgundy)">
        <Box box={[20, 16, 555, 465]}>
          <SectionLabel k="batch_label" />
          <div {...interactive} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Button onClick={runBatch} disabled={batchRunning || !live}>
                Kjør {BATCH_N} parallelt
              </Button>
              <span style={{ fontFamily: MONO, fontSize: pt(9.5), color: MUTED }}>{batchModel ?? " "}</span>
            </div>
            <Stat label="riktig form" value={`${okCount}/${BATCH_N}`} color="var(--teal)" />
            <Stat label="feil form" value={`${fails.length}`} color={fails.length ? "var(--red)" : "var(--burgundy)"} />
            <Stat label="tid" value={secs(elapsed)} />
            <Stat label="kostnad" value={done.length ? openaiCost(batchModel, inTok, outTok) : "–"} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 4, marginTop: 14 }}>
            {Array.from({ length: BATCH_N }, (_, n) => {
              const r = results[n];
              const bg = !r ? (batchRunning ? "var(--cream-dark)" : "var(--cream)") : r.ok ? "var(--teal)" : "var(--red)";
              return (
                <button
                  key={n}
                  type="button"
                  disabled={!r}
                  title={r ? `#${n + 1} · ${secs(r.latencyMs)}` : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.blur();
                    setPicked(n);
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  style={{
                    height: 22,
                    padding: 0,
                    border: shown === n ? "2px solid var(--burgundy)" : "none",
                    background: bg,
                    cursor: r ? "pointer" : "default",
                  }}
                />
              );
            })}
          </div>
          <div style={{ ...sans, fontSize: pt(10.5), color: MUTED, marginTop: 8, minHeight: 18 }}>
            {batchError ? (
              <span style={{ color: "var(--red-deep)" }}>{batchError}</span>
            ) : done.length ? (
              <>
                {[...reasons.entries()].map(([k, v]) => (
                  <span key={k} style={{ color: "var(--red-deep)", marginRight: 14 }}>
                    {k}: {v}
                  </span>
                ))}
                {topAnswers.length > 0 && (
                  <span>
                    svarene:
                    {topAnswers.map(([k, v]) => (
                      <span key={k} style={{ marginLeft: 12 }}>
                        <span style={{ fontFamily: MONO }}>{k}</span> ×{v}
                      </span>
                    ))}
                    {answers.size > 3 && <span style={{ marginLeft: 12 }}>(+{answers.size - 3} til)</span>}
                  </span>
                )}
              </>
            ) : (
              <Copy k="batch_lead" />
            )}
          </div>
          <div
            {...interactive}
            style={{ marginTop: 10, height: 160, boxSizing: "border-box", padding: "10px 12px", background: shownResult && !shownResult.ok ? PINK : "var(--cream)", overflow: "auto" }}
          >
            {shownResult ? (
              <>
                <Label size={9.5}>
                  kall #{(shown ?? 0) + 1} · {secs(shownResult.latencyMs)} · {shownResult.ok ? "riktig form" : shownResult.reason}
                </Label>
                <pre style={{ margin: "6px 0 0", fontFamily: MONO, fontSize: pt(10.5), whiteSpace: "pre-wrap", color: "var(--burgundy)" }}>
                  {shownResult.text || "(tomt svar)"}
                </pre>
                {!shownResult.ok && shownResult.failed.length > 0 && <CheckList checks={shownResult.failed} />}
              </>
            ) : (
              <Body size={11} color={MUTED}>
                <Copy k="detail_hint" />
              </Body>
            )}
          </div>
        </Box>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Samme henvendelse: OpenAI skriver, Jev svarer                     */
/* ------------------------------------------------------------------ */

type JevState =
  | { status: "idle" }
  | { status: "running"; t0: number }
  | { status: "done"; ms: number; data: JevResponse }
  | { status: "error"; error: string };

function JevAnswer({ id, answer }: { id: string; answer: Answer | undefined }) {
  if (!answer) return null;
  if (answer.type === "noul") {
    return (
      <>
        <Label size={10}>{id} · noul</Label>
        <ProbBar label="p(ja)" value={answer.noul} highlight={answer.noul >= 0.5} color="var(--red)" />
      </>
    );
  }
  const top = answer.type === "choice" ? answer.choice : String(answer.score);
  return (
    <>
      <Label size={10}>
        {id} · {answer.type}
      </Label>
      {Object.entries(answer.probabilities).map(([k, v]) => (
        <ProbBar
          key={k}
          label={answer.type === "score" ? `${k} ${answer.legend[k] ?? ""}` : k}
          value={v}
          highlight={k === top}
          color={answer.type === "score" ? "var(--red-deep)" : "var(--teal)"}
        />
      ))}
    </>
  );
}

function BigTimer({ value, color }: { value: number | null; color: string }) {
  return (
    <div style={{ position: "absolute", right: 0, top: -4, fontFamily: MONO, fontSize: pt(30), fontWeight: 700, color }}>
      {value === null ? "–" : secs(value)}
    </div>
  );
}

export function SlideToModeller() {
  const [i] = useLiveInput();
  const { s, start } = useOpenaiStream();
  const status = useDemoStatus();
  const [jev, setJev] = useState<JevState>({ status: "idle" });
  const now = useNow(isRunning(s) || jev.status === "running");
  const busy = isRunning(s) || jev.status === "running";
  const ready = Boolean(status?.openai?.configured && status?.jev);
  const single = s.status === "done" ? checkJsonShape(s.text) : null;

  const race = () => {
    const input = LIVE_INPUTS[i];
    start("json", input);
    const t0 = performance.now();
    setJev({ status: "running", t0 });
    runJev(input, LIVE_QUESTIONS).then((r) => {
      setJev(r.ok ? { status: "done", ms: performance.now() - t0, data: r.data } : { status: "error", error: r.error });
    });
  };

  const jevMs = jev.status === "done" ? jev.ms : jev.status === "running" ? Math.max(0, now - jev.t0) : null;
  const jevIn = jev.status === "done" ? jev.data.usage.input_tokens : null;

  return (
    <>
      <Header />
      <Card box={[81, 175, 545, 440]} bar="var(--red-deep)">
        <Box box={[22, 20, 501, 405]}>
          <BigTimer value={s.status === "idle" ? null : elapsedMs(s, now)} color="var(--red-deep)" />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <Copy k="llm_title" as="div" style={{ ...serif, fontSize: pt(22), color: "var(--burgundy)" }} />
            <OpenaiPicker disabled={busy} />
          </div>
          <Body size={12} color={MUTED} style={{ marginTop: 2, width: 330 }}>
            <Copy k="llm_lead" />
          </Body>
          <RawBox s={s} height={190} size={11} />
          <div style={{ minHeight: 20, marginTop: 4 }}>
            {single && (
              <span style={{ ...sans, fontSize: pt(10.5), color: single.checks.every((c) => c.ok) ? "var(--teal)" : "var(--red-deep)" }}>
                {single.checks.every((c) => c.ok) ? "✓ gyldig JSON med riktig form" : `✗ ${single.checks.filter((c) => !c.ok).map((c) => c.label).join(", ")}`}
              </span>
            )}
          </div>
          <StreamStats s={s} color="var(--red-deep)" />
        </Box>
      </Card>
      <Card box={[655, 175, 545, 440]} bar="var(--teal)">
        <Box box={[22, 20, 501, 405]}>
          <BigTimer value={jevMs} color="var(--teal)" />
          <Copy k="jev_title" as="div" style={{ ...serif, fontSize: pt(22), color: "var(--burgundy)" }} />
          <Body size={12} color={MUTED} style={{ marginTop: 2, width: 330 }}>
            <Copy k="jev_lead" />
          </Body>
          <div style={{ height: 238, marginTop: 8, display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
            {jev.status === "done" ? (
              Object.keys(LIVE_QUESTIONS).map((id) => <JevAnswer key={id} id={id} answer={jev.data.answers[id]} />)
            ) : jev.status === "error" ? (
              <Body size={11} color="var(--red-deep)">
                {jev.error}
              </Body>
            ) : (
              <Body size={11} color={MUTED}>
                {jev.status === "running" ? "venter på svar …" : "Ingen kall ennå."}
              </Body>
            )}
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 8 }}>
            <Stat
              label="output-tokens"
              value={jev.status === "done" ? jev.data.usage.output_tokens : "–"}
              sub={jev.status === "done" ? "gratis" : undefined}
              color="var(--teal)"
            />
            <Stat label="kostnad" value={jevIn !== null ? formatUsd(jevCostUsd(jevIn)) : "–"} sub={jevIn !== null ? `${jevIn} inn` : undefined} color="var(--teal)" />
          </div>
        </Box>
      </Card>
      <Box box={[81, 630, 1117, 40]} style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <InputPicker disabled={busy} />
        <div {...interactive}>
          <Button onClick={race} disabled={busy || !ready}>
            Kjør begge samtidig
          </Button>
        </div>
        <Body size={11} color={MUTED}>
          <Copy k="footnote" />
        </Body>
      </Box>
    </>
  );
}
