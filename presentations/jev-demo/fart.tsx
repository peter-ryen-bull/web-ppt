"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, pt } from "../parts";
import { formatInt, formatUsd, jevCostUsd, llmCostUsd, modelPrice, type BatchLine, type Provider } from "./jev";
import { QUESTION_ID, questionsFor, shortLabel, splitRecord, stateFor, type ClassifyTask } from "./cases";
import { useCase } from "./case-choice";
import { getOpenaiChoice } from "./openai-choice";
import { recordFartRun } from "./results";
import {
  Body,
  Button,
  Card,
  CaseTabs,
  Chip,
  fieldStyle,
  Header,
  interactive,
  Label,
  LiveBadge,
  MONO,
  MUTED,
  OpenaiPicker,
  ProbBar,
  sans,
  serif,
  Stat,
  streamBatch,
  useDemoStatus,
} from "./ui";

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
/* Berik en tabell: Jev fyller en ny kolonne                            */
/* ------------------------------------------------------------------ */

type Row = {
  id: number;
  item: string;
  status: "idle" | "running" | "done" | "error";
  choice?: string;
  confidence?: number;
  probabilities?: Record<string, number>;
  tokens?: number;
  latencyMs?: number;
  error?: string;
  doneAt?: number;
};

const START_ROWS = 10;

function startRows(task: ClassifyTask): Row[] {
  const items = [...task.examples, ...task.items.filter((i) => !task.examples.includes(i))].slice(0, START_ROWS);
  return items.map((item, id) => ({ id, item, status: "idle" }));
}

/** Kolonnene elementet vises i: feltene i en brukerpost, ellers én kolonne. */
function itemColumns(task: ClassifyTask, item: string): [string, string][] {
  const rec = splitRecord(item);
  if (rec) return rec;
  const head = splitRecord(task.examples[0]);
  return head ? head.map(([k], i) => [k, i === 0 ? item : ""]) : [[task.itemLabel, item]];
}

function columnWidths(task: ClassifyTask): string {
  if (task.id === "spam") return "1.5fr 1fr 0.7fr 1fr";
  return "1fr";
}

export function SlideKlassifiser() {
  const status = useDemoStatus();
  const { task } = useCase();
  const [rows, setRows] = useState<Row[]>(() => startRows(task));
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const seq = useRef(START_ROWS);
  const inFlight = useRef(new Set<AbortController>());
  const tableTask = useRef(task);

  useEffect(() => {
    const set = inFlight.current;
    return () => set.forEach((ac) => ac.abort());
  }, []);
  useEffect(() => {
    if (tableTask.current === task) return;
    tableTask.current = task;
    inFlight.current.forEach((ac) => ac.abort());
    inFlight.current.clear();
    seq.current = START_ROWS;
    setRows(startRows(task));
    setSelected(null);
    setNote(null);
  }, [task]);

  const patch = (id: number, p: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r)));

  /** Ett Jev-kall per rad, sendt samtidig fra serveren. */
  const classify = async (targets: Row[]) => {
    if (!targets.length) return;
    setNote(null);
    if (status && !status.jev) {
      setNote(NOT_LIVE);
      return;
    }
    const runTask = task;
    const ac = new AbortController();
    inFlight.current.add(ac);
    const ids = targets.map((r) => r.id);
    setRows((rs) => rs.map((r) => (ids.includes(r.id) ? { ...r, status: "running", error: undefined } : r)));
    const onLines = (lines: BatchLine[]) => {
      if (ac.signal.aborted) return;
      for (const line of lines) {
        if ("fatal" in line) setNote(line.fatal);
        if (!("i" in line)) continue;
        const id = ids[line.i];
        if (!line.ok) {
          patch(id, { status: "error", error: line.error, latencyMs: line.latencyMs });
          continue;
        }
        const a = "data" in line ? line.data.answers[QUESTION_ID] : undefined;
        if (a?.type !== "choice" || !("data" in line)) {
          patch(id, { status: "error", error: "Uventet svar fra Jev.", latencyMs: line.latencyMs });
          continue;
        }
        patch(id, {
          status: "done",
          choice: a.choice,
          confidence: a.confidence,
          probabilities: a.probabilities,
          tokens: line.data.usage.input_tokens,
          latencyMs: line.latencyMs,
          doneAt: performance.now(),
        });
      }
    };
    const err = await streamBatch(
      targets.map((r) => stateFor(runTask, r.item)),
      questionsFor(runTask),
      targets.length,
      onLines,
      ac.signal
    );
    inFlight.current.delete(ac);
    if (err && !ac.signal.aborted) {
      setNote(err);
      setRows((rs) => rs.map((r) => (ids.includes(r.id) && r.status === "running" ? { ...r, status: "error", error: err } : r)));
    }
  };

  const addRow = () => {
    const item = text.trim();
    if (!item) return;
    setText("");
    const row: Row = { id: seq.current++, item, status: "idle" };
    setRows((rs) => [row, ...rs].slice(0, 40));
    setSelected(row.id);
    void classify([row]);
  };

  const done = rows.filter((r): r is Row & Required<Pick<Row, "choice" | "confidence" | "probabilities" | "tokens" | "latencyMs">> => r.status === "done");
  const lastDone = done.reduce<Row | null>((a, r) => (!a || (r.doneAt ?? 0) > (a.doneAt ?? 0) ? r : a), null);
  const shown = rows.find((r) => r.id === selected && r.status === "done") ?? lastDone;
  const avgLatency = done.length ? done.reduce((s, r) => s + r.latencyMs, 0) / done.length : 0;
  const avgTokens = done.length ? done.reduce((s, r) => s + r.tokens, 0) / done.length : 0;
  const perCall = jevCostUsd(avgTokens);
  const pending = rows.filter((r) => r.status === "idle" || r.status === "error");
  const running = rows.some((r) => r.status === "running");
  const headCols = itemColumns(task, task.examples[0]).map(([k]) => k.toLowerCase());
  const grid = `${columnWidths(task)} 118px 40px`;

  return (
    <>
      <Header />
      <Box box={[81, 170, 560, 120]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} {...interactive}>
          <CaseTabs disabled={running} />
          <div style={{ display: "flex", gap: 8, height: 40 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") addRow();
              }}
              placeholder={`Ny rad: skriv ${task.itemLabel === "bruker" ? "en brukerpost" : `en ${task.itemLabel}`} og trykk Enter …`}
              spellCheck={false}
              style={{ ...fieldStyle, ...sans, fontSize: pt(13), flex: 1, padding: "6px 12px" }}
            />
            <Button onClick={addRow}>Legg til</Button>
          </div>
          <div style={{ fontFamily: MONO, fontSize: pt(9.5), lineHeight: 1.45, color: MUTED }}>
            <div>state: &quot;{task.prefix ?? ""}…&quot;</div>
            <div>
              {QUESTION_ID}: choice · {Object.keys(task.question.criteria).join(" | ")}
            </div>
          </div>
        </div>
      </Box>

      <Box box={[81, 305, 560, 165]}>
        {shown ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <div style={{ ...serif, fontSize: pt(17), color: "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {shortLabel(shown.item)}
              </div>
              <div style={{ fontFamily: MONO, fontSize: pt(18), fontWeight: 700, color: "var(--red)", whiteSpace: "nowrap" }}>
                {seconds(shown.latencyMs ?? 0)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Pill label={shown.choice ?? ""} color={task.colors[shown.choice ?? ""] ?? "var(--teal)"} size={12} />
              <span style={{ fontFamily: MONO, fontSize: pt(10.5), color: MUTED }}>confidence {shown.confidence?.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Object.entries(shown.probabilities ?? {})
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <ProbBar key={k} label={k} value={v} highlight={k === shown.choice} color={task.colors[k]} />
                ))}
            </div>
          </div>
        ) : (
          <Body size={13} color={MUTED}>
            <Copy k="hint" />
          </Body>
        )}
        {note && (
          <Body size={11} color="var(--red-deep)" style={{ marginTop: 6 }}>
            {note}
          </Body>
        )}
      </Box>

      <Card box={[81, 480, 560, 190]} bg="var(--burgundy)">
        <Box box={[22, 18, 516, 160]}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 16, columnGap: 12 }}>
            <Stat label={light("siste ventetid", "var(--mint)")} value={light(lastDone ? seconds(lastDone.latencyMs ?? 0) : "–")} sub={light("server → Jev", "var(--cream-dark)")} />
            <Stat label={light("snitt ventetid", "var(--mint)")} value={light(done.length ? seconds(avgLatency) : "–")} sub={light(`${formatInt(done.length)} kall`, "var(--cream-dark)")} />
            <Stat label={light("tokens per kall", "var(--mint)")} value={light(done.length ? formatInt(avgTokens) : "–")} sub={light("bare input faktureres", "var(--cream-dark)")} />
            <Stat label={light("kostnad per kall", "var(--mint)")} value={light(done.length ? formatUsd(perCall) : "–")} sub={light("$0,042 per mill. tokens", "var(--cream-dark)")} />
            <Stat label={light("kostnad så langt", "var(--mint)")} value={light(done.length ? formatUsd(perCall * done.length) : "–")} sub={light(`${formatInt(done.length)} rader fylt`, "var(--cream-dark)")} />
            <div style={{ alignSelf: "end" }}>{lastDone && <LiveBadge />}</div>
          </div>
        </Box>
      </Card>

      <Card box={[665, 170, 535, 500]} bar="var(--teal)">
        <Box box={[18, 18, 499, 470]}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }} {...interactive}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Copy k="table_label" as="div" style={{ ...sans, fontSize: pt(10.5), fontWeight: 700, letterSpacing: 1, color: MUTED }} />
              <Button tone="teal" onClick={() => void classify(pending)} disabled={running || !pending.length}>
                {running ? "Fyller …" : `Fyll ${task.column}`}
              </Button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: grid,
                gap: 8,
                marginTop: 10,
                padding: "5px 6px",
                borderBottom: "1.5px solid var(--burgundy)",
                ...sans,
                fontSize: pt(9.5),
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {headCols.map((c) => (
                <span key={c}>{c}</span>
              ))}
              <span style={{ color: "var(--teal)" }}>
                {task.column} <span style={{ background: "var(--mint)", color: "var(--teal)", padding: "0 4px", marginLeft: 2 }}>ny</span>
              </span>
              <span style={{ textAlign: "right" }}>conf</span>
            </div>
            <div style={{ overflow: "auto", flex: 1 }}>
              {rows.map((r) => {
                const cells = itemColumns(task, r.item);
                const active = shown?.id === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    title={r.error ?? r.item}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      e.stopPropagation();
                      setSelected(r.id);
                      if (r.status === "idle" || r.status === "error") void classify([r]);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    style={{
                      display: "grid",
                      gridTemplateColumns: grid,
                      gap: 8,
                      alignItems: "center",
                      width: "100%",
                      padding: "5px 6px",
                      border: "none",
                      borderBottom: "1px solid var(--cream)",
                      background: active ? "var(--cream)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {cells.map(([k, v]) => (
                      <span
                        key={k}
                        style={{ ...sans, fontSize: pt(cells.length > 1 ? 9.5 : 11), color: "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      >
                        {v}
                      </span>
                    ))}
                    <span style={{ background: "rgba(120, 232, 219, 0.18)", margin: "-5px 0", padding: "5px 4px", minHeight: 18 }}>
                      {r.status === "done" ? (
                        <Pill label={r.choice ?? ""} color={task.colors[r.choice ?? ""] ?? "var(--teal)"} size={9.5} />
                      ) : r.status === "running" ? (
                        <span style={{ fontFamily: MONO, fontSize: pt(9.5), color: MUTED }}>spør Jev …</span>
                      ) : r.status === "error" ? (
                        <span style={{ fontFamily: MONO, fontSize: pt(9.5), color: "var(--red-deep)" }}>feil</span>
                      ) : (
                        <span style={{ fontFamily: MONO, fontSize: pt(9.5), color: "var(--divider)" }}>—</span>
                      )}
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: pt(9.5), color: MUTED, textAlign: "right" }}>
                      {r.status === "done" ? r.confidence?.toFixed(2) : ""}
                    </span>
                  </button>
                );
              })}
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
  | { ok: true; choice: string; confidence: number | null; input: number; output: number; latencyMs: number }
  | { ok: false; error: string; latencyMs: number };

/** Motoren og modellen en kjøring faktisk brukte. */
type RunEngine = { provider: Provider; model: string; effort: string | null };

type RunSummary = RunEngine & { taskId: string; n: number; wallMs: number; perSecond: number; cost: number | null; errors: number };

function rate(perSecond: number): string {
  return perSecond < 10 ? perSecond.toLocaleString("nb-NO", { maximumFractionDigits: 1 }) : formatInt(perSecond);
}

function engineName(e: RunEngine): string {
  return e.provider === "jev" ? "Jev" : `${e.model} · ${e.effort}`;
}

function runCost(e: RunEngine, input: number, output: number): number | null {
  if (e.provider === "jev") return jevCostUsd(input);
  const p = modelPrice(e.model);
  return p ? llmCostUsd(input, output, p.in, p.out) : null;
}

/** Ett svar fra batch-strømmen som en rute. OpenAI-svaret godtas bare hvis det er ett av alternativene. */
function toTile(line: Extract<BatchLine, { i: number }>, task: ClassifyTask): Tile {
  if (!line.ok) return { ok: false, error: line.error, latencyMs: line.latencyMs };
  if ("data" in line) {
    const a = line.data.answers[QUESTION_ID];
    return a?.type === "choice"
      ? { ok: true, choice: a.choice, confidence: a.confidence, input: line.data.usage.input_tokens, output: 0, latencyMs: line.latencyMs }
      : { ok: false, error: "Uventet svar", latencyMs: line.latencyMs };
  }
  const v = line.llm.answers?.[QUESTION_ID];
  if (typeof v !== "string") return { ok: false, error: line.llm.answers ? `mangler ${QUESTION_ID}` : "ikke gyldig JSON", latencyMs: line.latencyMs };
  const choice = Object.keys(task.question.criteria).find((k) => k.toLowerCase() === v.trim().toLowerCase());
  if (!choice) return { ok: false, error: `utenfor listen: ${JSON.stringify(v)}`, latencyMs: line.latencyMs };
  return { ok: true, choice, confidence: null, input: line.llm.input, output: line.llm.output, latencyMs: line.latencyMs };
}

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
  const { task } = useCase();
  const [size, setSize] = useState(100);
  const [concurrency, setConcurrency] = useState(50);
  const [items, setItems] = useState<string[]>([]);
  const [tiles, setTiles] = useState<(Tile | undefined)[]>([]);
  const [runTask, setRunTask] = useState<ClassifyTask>(task);
  const [engine, setEngine] = useState<Provider>("jev");
  const [runEngine, setRunEngine] = useState<RunEngine>({ provider: "jev", model: "jev-latest", effort: null });
  const [summaries, setSummaries] = useState<Partial<Record<Provider, RunSummary>>>({});
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
    setSummaries({});
  };

  const shownTask = useRef(task);
  useEffect(() => {
    if (shownTask.current === task) return;
    shownTask.current = task;
    abortRef.current?.abort();
    setRunning(false);
    setItems([]);
    setTiles([]);
    setElapsed(null);
    setNote(null);
    setSummaries({});
  }, [task]);

  const run = async () => {
    abortRef.current?.abort();
    setNote(null);
    if (engine === "jev" && status && !status.jev) {
      setNote(NOT_LIVE);
      return;
    }
    if (engine === "openai" && status && !status.openai?.configured) {
      setNote(`Ikke live: mangler ${status.openai?.keyEnv ?? "OPENAI_API_KEY"} i presentations/jev-demo/.env.`);
      return;
    }
    const oc = getOpenaiChoice();
    const thisRun: RunEngine = engine === "jev" ? { provider: "jev", model: "jev-latest", effort: null } : { provider: "openai", model: oc.model, effort: oc.effort };
    const ac = new AbortController();
    abortRef.current = ac;
    const batch = Array.from({ length: size }, (_, i) => task.items[i % task.items.length]);
    const acc: (Tile | undefined)[] = new Array(size).fill(undefined);
    let lastAt = 0;
    setRunTask(task);
    setRunEngine(thisRun);
    setItems(batch);
    setTiles([...acc]);
    setElapsed(0);
    startedRef.current = performance.now();
    setRunning(true);

    const onLines = (lines: BatchLine[]) => {
      for (const line of lines) {
        if ("i" in line) {
          acc[line.i] = toTile(line, task);
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
      ac.signal,
      thisRun.provider
    );
    if (ac.signal.aborted) return;
    const wallMs = (lastAt || performance.now()) - startedRef.current;
    setRunning(false);
    setElapsed(wallMs);
    if (error) setNote(error);
    const finished = acc.filter((t): t is Tile => t !== undefined);
    const good = finished.filter((t): t is Extract<Tile, { ok: true }> => t.ok);
    if (finished.length) {
      const total = runCost(thisRun, good.reduce((s, t) => s + t.input, 0), good.reduce((s, t) => s + t.output, 0));
      recordFartRun(
        {
          ...thisRun,
          n: size,
          errors: finished.length - good.length,
          wallMs,
          medianMs: median(finished.map((t) => t.latencyMs)),
          costPerItem: total !== null && good.length ? total / good.length : null,
          choices: acc.map((t) => (t?.ok ? t.choice : null)),
        },
        task.id,
        concurrency
      );
      setSummaries((prev) => ({
        ...prev,
        [thisRun.provider]: {
          ...thisRun,
          taskId: task.id,
          n: finished.length,
          wallMs,
          perSecond: finished.length / (wallMs / 1000),
          cost: runCost(thisRun, good.reduce((s, t) => s + t.input, 0), good.reduce((s, t) => s + t.output, 0)),
          errors: finished.length - good.length,
        },
      }));
    }
  };

  const done = tiles.filter(Boolean) as Tile[];
  const ok = done.filter((t): t is Extract<Tile, { ok: true }> => t.ok);
  const errors = done.length - ok.length;
  const firstError = done.find((t): t is Extract<Tile, { ok: false }> => !t.ok);
  const inputTokens = ok.reduce((s, t) => s + t.input, 0);
  const outputTokens = ok.reduce((s, t) => s + t.output, 0);
  const tokens = inputTokens + outputTokens;
  const cost = runCost(runEngine, inputTokens, outputTokens);
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
          <CaseTabs disabled={running} />
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
                    ? `${shortLabel(item)} → ${t.choice}${t.confidence !== null ? ` (${t.confidence.toFixed(2)})` : ""} · ${Math.round(t.latencyMs)} ms`
                    : `${shortLabel(item)} → feil: ${t.error}`;
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
                          {shortLabel(item)}
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

      <Box box={[845, 215, 355, 34]}>
        <div {...interactive} style={{ display: "flex", alignItems: "center", gap: 6, height: "100%" }}>
          <span style={{ ...sans, fontSize: pt(10), color: MUTED, marginRight: 4, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>motor</span>
          <Chip active={engine === "jev"} onClick={() => setEngine("jev")} disabled={running}>
            Jev
          </Chip>
          <Chip active={engine === "openai"} onClick={() => setEngine("openai")} disabled={running}>
            OpenAI
          </Chip>
          {engine === "openai" && (
            <span style={{ marginLeft: 6 }}>
              <OpenaiPicker disabled={running} />
            </span>
          )}
        </div>
      </Box>

      <Card box={[845, 257, 355, 413]} bg="var(--burgundy)">
        <Box box={[22, 14, 311, 393]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <Label size={9.5} color="var(--mint)">{items.length ? engineName(runEngine) : "tid fra klikk"}</Label>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 9, columnGap: 10 }}>
              <Stat label={light("per sekund", "var(--mint)")} value={light(perSecond ? rate(perSecond) : "–")} sub={light(`${formatInt(concurrency)} samtidige kall`, "var(--cream-dark)")} />
              <Stat label={light("median per kall", "var(--mint)")} value={light(done.length ? seconds(median(done.map((t) => t.latencyMs))) : "–")} sub={light(`server → ${runEngine.provider === "jev" ? "Jev" : "OpenAI"}`, "var(--cream-dark)")} />
              <Stat label={light("sum ventetid", "var(--mint)")} value={light(done.length ? seconds(sequential, 1) : "–")} sub={light("alle kall lagt sammen", "var(--cream-dark)")} />
              <Stat
                label={light("tokens", "var(--mint)")}
                value={light(tokens ? formatInt(tokens) : "–")}
                sub={light(
                  !ok.length ? "inn + ut" : runEngine.provider === "jev" ? `${formatInt(inputTokens / ok.length)} inn per element, ut gratis` : `${formatInt(inputTokens)} inn · ${formatInt(outputTokens)} ut`,
                  "var(--cream-dark)"
                )}
              />
              <Stat label={light("kostnad", "var(--mint)")} value={light(tokens && cost !== null ? formatUsd(cost) : "–")} sub={light(cost === null && tokens ? "ukjent pris" : "for hele kjøringen", "var(--cream-dark)")} />
              <Stat label={light("per element", "var(--mint)")} value={light(ok.length && cost !== null ? formatUsd(cost / ok.length) : "–")} sub={light("snitt i denne kjøringen", "var(--cream-dark)")} />
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 8, display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
              {counts.map(([k, n]) => (
                <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, ...sans, fontSize: pt(10.5), color: "#fff" }}>
                  <span style={{ width: 10, height: 10, background: runTask.colors[k], outline: "1px solid rgba(255,255,255,0.45)" }} />
                  {k} <span style={{ fontFamily: MONO, color: "var(--cream-dark)" }}>{n}</span>
                </span>
              ))}
            </div>
            {(summaries.jev || summaries.openai) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Label size={9} color="var(--mint)">siste kjøring per motor</Label>
                {(["jev", "openai"] as const).map((k) => {
                  const r = summaries[k];
                  if (!r) return null;
                  return (
                    <div key={k} style={{ fontFamily: MONO, fontSize: pt(9.5), color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{ color: k === "jev" ? "var(--mint)" : "var(--red)", fontWeight: 700 }}>{k === "jev" ? "Jev" : "OpenAI"}</span> {formatInt(r.n)} stk · {seconds(r.wallMs)} ·{" "}
                      {rate(r.perSecond)}/s · {r.cost !== null ? formatUsd(r.cost) : "–"}
                      {r.errors > 0 && <span style={{ color: "var(--red)" }}> · {r.errors} feil</span>}
                    </div>
                  );
                })}
              </div>
            )}
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
