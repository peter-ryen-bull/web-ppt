"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, pt } from "../parts";
import {
  CLASSIFY_TASKS,
  formatInt,
  formatUsd,
  jevCostUsd,
  type BatchLine,
  type ClassifyTask,
  type Questions,
} from "./jev";
import {
  Body,
  Button,
  Card,
  fieldStyle,
  Header,
  interactive,
  Label,
  LiveBadge,
  MONO,
  MUTED,
  ProbBar,
  runJev,
  sans,
  serif,
  Stat,
  streamBatch,
  useDemoStatus,
} from "./ui";

export const QUESTION_ID = "kategori";

export function questionsFor(task: ClassifyTask): Questions {
  return { [QUESTION_ID]: task.question };
}

export function stateFor(task: ClassifyTask, item: string): string {
  return `${task.prefix ?? ""}${item}`;
}

export function taskById(id: string): ClassifyTask {
  return CLASSIFY_TASKS.find((t) => t.id === id) ?? CLASSIFY_TASKS[0];
}

export function seconds(ms: number, digits = 2): string {
  return `${(ms / 1000).toLocaleString("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits })} s`;
}

export function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

const NOT_LIVE = "Ikke live: mangler API_KEY i presentations/jev-demo/.env.";

/* ------------------------------------------------------------------ */
/* Små byggeklosser                                                     */
/* ------------------------------------------------------------------ */

function Chip({
  active,
  onClick,
  disabled,
  mono,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  mono?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.currentTarget.blur();
        e.stopPropagation();
        onClick();
      }}
      style={{
        ...(mono ? { fontFamily: MONO } : sans),
        fontSize: pt(10.5),
        fontWeight: active ? 700 : 400,
        padding: "4px 9px",
        border: active ? "1px solid var(--teal)" : "1px solid var(--divider)",
        background: active ? "var(--teal)" : "#fff",
        color: active ? "#fff" : "var(--burgundy)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled && !active ? 0.5 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

export function TaskTabs({ value, onChange, disabled }: { value: string; onChange: (id: string) => void; disabled?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {CLASSIFY_TASKS.map((t) => (
        <Chip key={t.id} active={t.id === value} onClick={() => onChange(t.id)} disabled={disabled}>
          {t.name}
        </Chip>
      ))}
    </div>
  );
}

export function Segmented<T extends number>({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ ...sans, fontSize: pt(10), color: MUTED, marginRight: 4, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
        {label}
      </span>
      {options.map((o) => (
        <Chip key={o} mono active={o === value} onClick={() => onChange(o)} disabled={disabled}>
          {formatInt(o)}
        </Chip>
      ))}
    </div>
  );
}

export function Pill({ label, color, size = 10.5 }: { label: string; color: string; size?: number }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: pt(size),
        fontWeight: 700,
        color: "#fff",
        background: color,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export function light(children: ReactNode, color = "#fff") {
  return <span style={{ color }}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Klassifiser hva som helst                                            */
/* ------------------------------------------------------------------ */

type Classified = {
  id: number;
  task: ClassifyTask;
  item: string;
  choice: string;
  confidence: number;
  probabilities: Record<string, number>;
  tokens: number;
  latencyMs: number;
};

/** Så mange eksempler som får plass i feltet. */
function examples(task: ClassifyTask): string[] {
  const out: string[] = [];
  let chars = 0;
  for (const item of task.items) {
    chars += item.length + 5;
    if (chars > 330) break;
    out.push(item);
  }
  return out;
}

export function SlideKlassifiser() {
  const status = useDemoStatus();
  const [taskId, setTaskId] = useState(CLASSIFY_TASKS[0].id);
  const task = taskById(taskId);
  const [text, setText] = useState("");
  const [history, setHistory] = useState<Classified[]>([]);
  const [inFlight, setInFlight] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const seq = useRef(0);

  const classify = async (raw: string) => {
    const item = raw.trim();
    if (!item) return;
    setNote(null);
    if (status && !status.jev) {
      setNote(NOT_LIVE);
      return;
    }
    setInFlight((n) => n + 1);
    const res = await runJev(stateFor(task, item), questionsFor(task));
    setInFlight((n) => n - 1);
    if (!res.ok) {
      setNote(res.error);
      return;
    }
    const a = res.data.answers[QUESTION_ID];
    if (a?.type !== "choice") {
      setNote("Uventet svar fra Jev.");
      return;
    }
    const row: Classified = {
      id: ++seq.current,
      task,
      item,
      choice: a.choice,
      confidence: a.confidence,
      probabilities: a.probabilities,
      tokens: res.data.usage.input_tokens,
      latencyMs: res.latencyMs,
    };
    setHistory((h) => [row, ...h].slice(0, 60));
  };

  const last = history[0];
  const avgLatency = history.length ? history.reduce((s, r) => s + r.latencyMs, 0) / history.length : 0;
  const avgTokens = history.length ? history.reduce((s, r) => s + r.tokens, 0) / history.length : 0;
  const perCall = jevCostUsd(avgTokens);

  return (
    <>
      <Header />
      <Box box={[81, 170, 560, 295]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} {...interactive}>
          <TaskTabs value={taskId} onChange={setTaskId} />
          <div style={{ display: "flex", gap: 8, height: 40 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") {
                  void classify(text);
                  setText("");
                }
              }}
              placeholder="Skriv noe og trykk Enter …"
              spellCheck={false}
              style={{ ...fieldStyle, ...sans, fontSize: pt(15), flex: 1, padding: "6px 12px" }}
            />
            <Button
              onClick={() => {
                void classify(text);
                setText("");
              }}
            >
              {inFlight > 0 ? "Spør Jev …" : "Klassifiser"}
            </Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {examples(task).map((item) => (
              <Chip key={item} onClick={() => void classify(item)}>
                {item}
              </Chip>
            ))}
          </div>
          <div style={{ fontFamily: MONO, fontSize: pt(9.5), lineHeight: 1.45, color: MUTED }}>
            <div>state: &quot;{task.prefix ?? ""}…&quot;</div>
            <div>
              {QUESTION_ID}: choice · {Object.keys(task.question.criteria).join(" | ")}
            </div>
          </div>
          {note && <Body size={11} color="var(--red-deep)">{note}</Body>}
        </div>
      </Box>

      <Card box={[81, 480, 560, 190]} bg="var(--burgundy)">
        <Box box={[22, 18, 516, 160]}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 16, columnGap: 12 }}>
            <Stat label={light("siste ventetid", "var(--mint)")} value={light(last ? seconds(last.latencyMs) : "–")} sub={light("klikk → svar via proxy", "var(--cream-dark)")} />
            <Stat label={light("snitt ventetid", "var(--mint)")} value={light(history.length ? seconds(avgLatency) : "–")} sub={light(`${formatInt(history.length)} kall`, "var(--cream-dark)")} />
            <Stat label={light("tokens per kall", "var(--mint)")} value={light(history.length ? formatInt(avgTokens) : "–")} sub={light("bare input faktureres", "var(--cream-dark)")} />
            <Stat label={light("kostnad per kall", "var(--mint)")} value={light(history.length ? formatUsd(perCall) : "–")} sub={light("$0,042 per mill. tokens", "var(--cream-dark)")} />
            <Stat label={light("kostnad så langt", "var(--mint)")} value={light(history.length ? formatUsd(perCall * history.length) : "–")} sub={light(`${formatInt(history.length)} kall i dag`, "var(--cream-dark)")} />
            <div style={{ alignSelf: "end" }}>
              {last && <LiveBadge />}
            </div>
          </div>
        </Box>
      </Card>

      <Card box={[665, 170, 535, 500]} bar="var(--teal)">
        <Box box={[22, 22, 491, 210]}>
          {last ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div style={{ ...serif, fontSize: pt(24), color: "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {last.item}
                </div>
                <div style={{ fontFamily: MONO, fontSize: pt(22), fontWeight: 700, color: "var(--red)", whiteSpace: "nowrap" }}>
                  {seconds(last.latencyMs)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Pill label={last.choice} color={last.task.colors[last.choice] ?? "var(--teal)"} size={13} />
                <span style={{ fontFamily: MONO, fontSize: pt(11), color: MUTED }}>confidence {last.confidence.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
                {Object.entries(last.probabilities)
                  .sort((a, b) => b[1] - a[1])
                  .map(([k, v]) => (
                    <ProbBar key={k} label={k} value={v} highlight={k === last.choice} color={last.task.colors[k]} />
                  ))}
              </div>
            </div>
          ) : (
            <Body size={15} color={MUTED}>
              <Copy k="hint" />
            </Body>
          )}
        </Box>
        <Box box={[22, 245, 491, 240]}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Label size={10}>historikk</Label>
            <div {...interactive} style={{ marginTop: 6, overflow: "auto", flex: 1 }}>
              {history.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 44px 58px",
                    gap: 10,
                    alignItems: "center",
                    padding: "4px 0",
                    borderBottom: "1px solid var(--cream)",
                  }}
                >
                  <span style={{ ...sans, fontSize: pt(11.5), color: "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.item}
                  </span>
                  <Pill label={r.choice} color={r.task.colors[r.choice] ?? "var(--teal)"} size={9.5} />
                  <span style={{ fontFamily: MONO, fontSize: pt(10), color: MUTED, textAlign: "right" }}>{r.confidence.toFixed(2)}</span>
                  <span style={{ fontFamily: MONO, fontSize: pt(10), color: "var(--red-deep)", textAlign: "right" }}>
                    {Math.round(r.latencyMs)} ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Mange på en gang                                                     */
/* ------------------------------------------------------------------ */

type Tile =
  | { ok: true; choice: string; confidence: number; tokens: number; latencyMs: number }
  | { ok: false; error: string; latencyMs: number };

const SIZES = [25, 100, 500];
const CONCURRENCY = [1, 10, 50, 100];
const GRID_W = 712;
const GRID_H = 392;

function gridLayout(n: number) {
  const gap = n > 200 ? 2 : 4;
  const cols = Math.ceil(Math.sqrt((n * GRID_W) / GRID_H / 2));
  const rows = Math.ceil(n / cols);
  return {
    gap,
    cols,
    w: Math.floor((GRID_W - gap * (cols - 1)) / cols),
    h: Math.floor((GRID_H - gap * (rows - 1)) / rows),
  };
}

export function SlideFart() {
  const status = useDemoStatus();
  const [taskId, setTaskId] = useState(CLASSIFY_TASKS[0].id);
  const task = taskById(taskId);
  const [size, setSize] = useState(100);
  const [concurrency, setConcurrency] = useState(50);
  const [items, setItems] = useState<string[]>([]);
  const [tiles, setTiles] = useState<(Tile | undefined)[]>([]);
  const [runTask, setRunTask] = useState<ClassifyTask>(task);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef(0);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const tick = () => {
      setElapsed(performance.now() - startedRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const reset = () => {
    abortRef.current?.abort();
    setRunning(false);
    setItems([]);
    setTiles([]);
    setElapsed(null);
    setNote(null);
  };

  const run = async () => {
    abortRef.current?.abort();
    setNote(null);
    if (status && !status.jev) {
      setNote(NOT_LIVE);
      return;
    }
    const ac = new AbortController();
    abortRef.current = ac;
    const batch = Array.from({ length: size }, (_, i) => task.items[i % task.items.length]);
    const acc: (Tile | undefined)[] = new Array(size).fill(undefined);
    let lastAt = 0;
    setRunTask(task);
    setItems(batch);
    setTiles([...acc]);
    setElapsed(0);
    startedRef.current = performance.now();
    setRunning(true);

    const onLines = (lines: BatchLine[]) => {
      for (const line of lines) {
        if ("i" in line) {
          if (line.ok && !("data" in line)) continue;
          const a = line.ok ? line.data.answers[QUESTION_ID] : undefined;
          acc[line.i] = line.ok
            ? a?.type === "choice"
              ? { ok: true, choice: a.choice, confidence: a.confidence, tokens: line.data.usage.input_tokens, latencyMs: line.latencyMs }
              : { ok: false, error: "Uventet svar", latencyMs: line.latencyMs }
            : { ok: false, error: line.error, latencyMs: line.latencyMs };
          lastAt = performance.now();
        } else if ("fatal" in line) {
          setNote(line.fatal);
        }
      }
      setTiles([...acc]);
    };

    const error = await streamBatch(
      batch.map((s) => stateFor(task, s)),
      questionsFor(task),
      concurrency,
      onLines,
      ac.signal
    );
    if (ac.signal.aborted) return;
    setRunning(false);
    setElapsed((lastAt || performance.now()) - startedRef.current);
    if (error) setNote(error);
  };

  const done = tiles.filter(Boolean) as Tile[];
  const ok = done.filter((t): t is Extract<Tile, { ok: true }> => t.ok);
  const errors = done.length - ok.length;
  const firstError = done.find((t): t is Extract<Tile, { ok: false }> => !t.ok);
  const tokens = ok.reduce((s, t) => s + t.tokens, 0);
  const cost = jevCostUsd(tokens);
  const sequential = done.reduce((s, t) => s + t.latencyMs, 0);
  const perSecond = elapsed && done.length ? done.length / (elapsed / 1000) : 0;
  const counts = Object.keys(runTask.question.criteria).map((k) => [k, ok.filter((t) => t.choice === k).length] as const);
  const layout = gridLayout(items.length || size);
  const showText = layout.w >= 60 && layout.h >= 26;

  return (
    <>
      <Header />
      <Box box={[81, 166, 1119, 34]}>
        <div {...interactive} style={{ display: "flex", alignItems: "center", gap: 18, height: "100%" }}>
          <TaskTabs value={taskId} onChange={setTaskId} disabled={running} />
          <Segmented label="antall" options={SIZES} value={size} onChange={setSize} disabled={running} />
          <Segmented label="samtidig" options={CONCURRENCY} value={concurrency} onChange={setConcurrency} disabled={running} />
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <Button onClick={run} disabled={running}>
              {running ? "Kjører …" : "Kjør"}
            </Button>
            <Button tone="ghost" onClick={reset}>
              Nullstill
            </Button>
          </div>
        </div>
      </Box>

      <Card box={[81, 215, 740, 420]}>
        <Box box={[14, 14, GRID_W, GRID_H]}>
          {items.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${layout.cols}, ${layout.w}px)`,
                gridAutoRows: `${layout.h}px`,
                gap: layout.gap,
              }}
            >
              {items.map((item, i) => {
                const t = tiles[i];
                const bg = !t ? "var(--cream)" : t.ok ? runTask.colors[t.choice] ?? "var(--teal)" : "#fff";
                const title = !t
                  ? item
                  : t.ok
                    ? `${item} → ${t.choice} (${t.confidence.toFixed(2)}) · ${Math.round(t.latencyMs)} ms`
                    : `${item} → feil: ${t.error}`;
                return (
                  <div
                    key={i}
                    title={title}
                    style={{
                      background: bg,
                      border: t && !t.ok ? "1.5px solid var(--red)" : "none",
                      boxSizing: "border-box",
                      transition: "background 180ms ease",
                      overflow: "hidden",
                      padding: showText ? "3px 5px" : 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {showText && (
                      <>
                        <span style={{ ...sans, fontSize: pt(layout.h > 60 ? 11 : 8.5), lineHeight: 1.15, color: t?.ok ? "#fff" : "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: layout.h > 60 ? "normal" : "nowrap" }}>
                          {item}
                        </span>
                        {t?.ok && layout.h > 30 && (
                          <span style={{ fontFamily: MONO, fontSize: pt(layout.h > 60 ? 10 : 7.5), color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", overflow: "hidden" }}>
                            {t.choice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Body size={15} color={MUTED}>
                <Copy k="hint" />
              </Body>
            </div>
          )}
        </Box>
      </Card>
      <Box box={[81, 643, 740, 30]}>
        <Copy k="footnote" as="div" style={{ ...sans, fontSize: pt(10.5), lineHeight: 1.3, color: MUTED }} />
      </Box>

      <Card box={[845, 215, 355, 455]} bg="var(--burgundy)">
        <Box box={[22, 18, 311, 425]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <Label size={9.5} color="var(--mint)">tid fra klikk</Label>
                <div style={{ fontFamily: MONO, fontSize: pt(36), fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                  {elapsed != null ? seconds(elapsed) : "–"}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Label size={9.5} color="var(--mint)">ferdig</Label>
                <div style={{ fontFamily: MONO, fontSize: pt(18), fontWeight: 600, color: "#fff" }}>
                  {formatInt(done.length)}/{formatInt(items.length || size)}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, columnGap: 10 }}>
              <Stat label={light("per sekund", "var(--mint)")} value={light(perSecond ? formatInt(perSecond) : "–")} sub={light(`${formatInt(concurrency)} samtidige kall`, "var(--cream-dark)")} />
              <Stat label={light("median per kall", "var(--mint)")} value={light(done.length ? seconds(median(done.map((t) => t.latencyMs))) : "–")} sub={light("server → Jev", "var(--cream-dark)")} />
              <Stat label={light("sum ventetid", "var(--mint)")} value={light(done.length ? seconds(sequential, 1) : "–")} sub={light("alle kall lagt sammen", "var(--cream-dark)")} />
              <Stat label={light("input-tokens", "var(--mint)")} value={light(tokens ? formatInt(tokens) : "–")} sub={light(ok.length ? `${formatInt(tokens / ok.length)} per element` : "output er gratis", "var(--cream-dark)")} />
              <Stat label={light("kostnad", "var(--mint)")} value={light(tokens ? formatUsd(cost) : "–")} sub={light("for hele kjøringen", "var(--cream-dark)")} />
              <Stat label={light("per element", "var(--mint)")} value={light(ok.length ? formatUsd(cost / ok.length) : "–")} sub={light("snitt i denne kjøringen", "var(--cream-dark)")} />
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 10, display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
              {counts.map(([k, n]) => (
                <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, ...sans, fontSize: pt(10.5), color: "#fff" }}>
                  <span style={{ width: 10, height: 10, background: runTask.colors[k], outline: "1px solid rgba(255,255,255,0.45)" }} />
                  {k} <span style={{ fontFamily: MONO, color: "var(--cream-dark)" }}>{n}</span>
                </span>
              ))}
            </div>
            {(note || errors > 0) && (
              <Body size={10.5} color="var(--red)">
                {note ?? `${formatInt(errors)} feil: ${firstError?.error ?? ""}`}
              </Body>
            )}
          </div>
        </Box>
      </Card>
    </>
  );
}
