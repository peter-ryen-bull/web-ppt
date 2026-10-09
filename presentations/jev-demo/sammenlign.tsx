"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "@/components/Copy";
import { Box, pt } from "../parts";
import {
  CLASSIFY_TASKS,
  formatInt,
  formatUsd,
  JEV_PRICE_IN,
  MODEL_PRICES,
  type BatchLine,
  type ClassifyTask,
  type DemoStatus,
  type OpenaiChoice,
  type Provider,
} from "./jev";
import { light, median, Pill, QUESTION_ID, questionsFor, seconds, Segmented, stateFor, TaskTabs, taskById } from "./fart";
import { useOpenaiChoice } from "./openai-choice";
import { Body, Button, Card, Header, interactive, Label, MONO, MUTED, OpenaiPicker, sans, serif, Stat, streamBatch, useDemoStatus } from "./ui";

type ItemResult =
  | { ok: true; choice: string | null; input: number; output: number; latencyMs: number }
  | { ok: false; error: string; latencyMs: number };

type Lane = { results: (ItemResult | undefined)[]; end: number | null; error: string | null };

const LANES: { provider: Provider; name: string; bar: string }[] = [
  { provider: "jev", name: "Jev", bar: "var(--teal)" },
  { provider: "openai", name: "OpenAI", bar: "var(--burgundy)" },
];

const SIZES = [10, 25, 50];
const CONCURRENCY = [1, 10, 25];

function emptyLanes(n: number): Record<Provider, Lane> {
  const lane = (): Lane => ({ results: new Array(n).fill(undefined), end: null, error: null });
  return { jev: lane(), openai: lane() };
}

function laneInfo(provider: Provider, status: DemoStatus | null, choice: OpenaiChoice) {
  if (provider === "jev") {
    return { live: Boolean(status?.jev), model: "jev-latest", keyEnv: "API_KEY", effort: null, price: { in: JEV_PRICE_IN, out: 0 } };
  }
  const p = status?.openai;
  return { live: Boolean(p?.configured), model: choice.model, keyEnv: p?.keyEnv ?? "", effort: choice.effort, price: MODEL_PRICES[choice.model] ?? null };
}

/** LLM-en skriver svaret som tekst. Godta det bare hvis det er ett av alternativene. */
function llmChoice(answers: Record<string, unknown> | null, task: ClassifyTask): string | null {
  const v = answers?.[QUESTION_ID];
  if (typeof v !== "string") return null;
  const s = v.trim().toLowerCase();
  return Object.keys(task.question.criteria).find((k) => k.toLowerCase() === s) ?? v.trim();
}

function toResult(line: Extract<BatchLine, { i: number }>, task: ClassifyTask): ItemResult {
  if (!line.ok) return { ok: false, error: line.error, latencyMs: line.latencyMs };
  if ("data" in line) {
    const a = line.data.answers[QUESTION_ID];
    return {
      ok: true,
      choice: a?.type === "choice" ? a.choice : null,
      input: line.data.usage.input_tokens,
      output: 0,
      latencyMs: line.latencyMs,
    };
  }
  return { ok: true, choice: llmChoice(line.llm.answers, task), input: line.llm.input, output: line.llm.output, latencyMs: line.latencyMs };
}

export function SlideSammenlign() {
  const status = useDemoStatus();
  const choice = useOpenaiChoice();
  const [taskId, setTaskId] = useState(CLASSIFY_TASKS[1].id);
  const task = taskById(taskId);
  const [size, setSize] = useState(25);
  const [concurrency, setConcurrency] = useState(10);
  const [items, setItems] = useState<string[]>([]);
  const [runTask, setRunTask] = useState<ClassifyTask>(task);
  const [lanes, setLanes] = useState<Record<Provider, Lane>>(() => emptyLanes(0));
  const [started, setStarted] = useState(0);
  const [now, setNow] = useState(0);
  const [running, setRunning] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const tick = () => {
      setNow(performance.now());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const reset = () => {
    abortRef.current?.abort();
    setRunning(false);
    setItems([]);
    setLanes(emptyLanes(0));
  };

  // Tallene skal alltid høre til modellen som står i banen.
  useEffect(() => {
    abortRef.current?.abort();
    setRunning(false);
    setItems([]);
    setLanes(emptyLanes(0));
  }, [choice.model, choice.effort]);

  const run = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const batch = Array.from({ length: size }, (_, i) => task.items[i % task.items.length]);
    const states = batch.map((s) => stateFor(task, s));
    const t0 = performance.now();
    setRunTask(task);
    setItems(batch);
    setLanes(emptyLanes(size));
    setStarted(t0);
    setNow(t0);
    setRunning(true);

    const live = LANES.filter((l) => laneInfo(l.provider, status, choice).live);
    await Promise.all(
      live.map(async ({ provider }) => {
        let lastAt = 0;
        const error = await streamBatch(
          states,
          questionsFor(task),
          concurrency,
          (lines) => {
            lastAt = performance.now();
            setLanes((prev) => {
              const results = [...prev[provider].results];
              let error = prev[provider].error;
              for (const line of lines) {
                if ("i" in line) results[line.i] = toResult(line, task);
                else if ("fatal" in line) error = line.fatal;
              }
              return { ...prev, [provider]: { ...prev[provider], results, error } };
            });
          },
          ac.signal,
          provider
        );
        if (ac.signal.aborted) return;
        setLanes((prev) => ({
          ...prev,
          [provider]: { ...prev[provider], end: lastAt || performance.now(), error: error ?? prev[provider].error },
        }));
      })
    );
    if (!ac.signal.aborted) setRunning(false);
  };

  const jevChoices = lanes.jev.results.map((r) => (r?.ok ? r.choice : null));
  const disagreements = items
    .map((item, i) => ({
      item,
      jev: jevChoices[i],
      openai: lanes.openai.results[i],
    }))
    .filter((d) => d.jev && d.openai?.ok && d.openai.choice !== d.jev);

  return (
    <>
      <Header />
      <Box box={[81, 166, 1119, 34]}>
        <div {...interactive} style={{ display: "flex", alignItems: "center", gap: 18, height: "100%" }}>
          <TaskTabs value={taskId} onChange={setTaskId} disabled={running} />
          <Segmented label="antall" options={SIZES} value={size} onChange={setSize} disabled={running} />
          <Segmented label="samtidig" options={CONCURRENCY} value={concurrency} onChange={setConcurrency} disabled={running} />
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <Button onClick={run} disabled={running || !status}>
              {running ? "Kjører …" : "Kjør alle"}
            </Button>
            <Button tone="ghost" onClick={reset}>
              Nullstill
            </Button>
          </div>
        </div>
      </Box>

      {LANES.map((l, idx) => (
        <LaneCard
          key={l.provider}
          x={81 + idx * 570}
          name={l.name}
          bar={l.bar}
          info={laneInfo(l.provider, status, choice)}
          lane={lanes[l.provider]}
          items={items}
          task={runTask}
          started={started}
          now={now}
          running={running}
          reference={l.provider === "jev" ? null : jevChoices}
        />
      ))}

      <Box box={[81, 582, 1119, 56]}>
        <div {...interactive} style={{ display: "flex", flexDirection: "column", gap: 3, height: "100%", overflow: "auto" }}>
          {disagreements.length ? (
            <>
              <Label size={9.5}>uenige med jev ({formatInt(disagreements.length)})</Label>
              {disagreements.slice(0, 2).map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", ...sans, fontSize: pt(11), color: "var(--burgundy)" }}>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.item}</span>
                  <span style={{ color: MUTED }}>Jev</span>
                  <Pill label={d.jev ?? "–"} color={runTask.colors[d.jev ?? ""] ?? MUTED} size={9.5} />
                  {d.openai?.ok && (
                    <>
                      <span style={{ color: MUTED }}>OpenAI</span>
                      <Pill label={d.openai.choice ?? "?"} color={runTask.colors[d.openai.choice ?? ""] ?? MUTED} size={9.5} />
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <Body size={12} color={MUTED}>
              <Copy k="hint" />
            </Body>
          )}
        </div>
      </Box>
      <Box box={[81, 645, 1119, 28]}>
        <Copy k="footnote" as="div" style={{ ...sans, fontSize: pt(10), lineHeight: 1.3, color: MUTED }} />
      </Box>
    </>
  );
}

function LaneCard({
  x,
  name,
  bar,
  info,
  lane,
  items,
  task,
  started,
  now,
  running,
  reference,
}: {
  x: number;
  name: string;
  bar: string;
  info: ReturnType<typeof laneInfo>;
  lane: Lane;
  items: string[];
  task: ClassifyTask;
  started: number;
  now: number;
  running: boolean;
  /** Jevs svar per element. Null for Jev-banen selv. */
  reference: (string | null)[] | null;
}) {
  const W = 513;
  const done = lane.results.filter(Boolean) as ItemResult[];
  const ok = done.filter((r): r is Extract<ItemResult, { ok: true }> => r.ok);
  const errors = done.filter((r): r is Extract<ItemResult, { ok: false }> => !r.ok);
  const elapsed = done.length ? (lane.end ?? (running ? now : started)) - started : null;
  const perSecond = elapsed ? done.length / (elapsed / 1000) : 0;
  const avgIn = ok.length ? ok.reduce((s, r) => s + r.input, 0) / ok.length : 0;
  const avgOut = ok.length ? ok.reduce((s, r) => s + r.output, 0) / ok.length : 0;
  const perItem = info.price ? (avgIn * info.price.in + avgOut * info.price.out) / 1e6 : null;
  const compared = reference ? lane.results.filter((r, i) => r?.ok && reference[i]) : [];
  const agree = reference ? lane.results.filter((r, i) => r?.ok && reference[i] && r.choice === reference[i]).length : 0;

  const cols = Math.min(25, Math.max(10, Math.ceil(items.length / 2)));
  const rows = Math.max(1, Math.ceil(items.length / cols));
  const tileW = Math.floor((W - 3 * (cols - 1)) / cols);
  const tileH = Math.min(22, Math.floor((80 - 3 * (rows - 1)) / rows));

  return (
    <Card box={[x, 215, 549, 355]} bar={bar}>
      <Box box={[18, 20, W, 44]}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ ...serif, fontSize: pt(20), color: "var(--burgundy)", lineHeight: 1.1 }}>{name}</div>
            {info.effort ? (
              <div style={{ marginTop: 2 }}>
                <OpenaiPicker disabled={running} />
              </div>
            ) : (
              <div style={{ fontFamily: MONO, fontSize: pt(8.5), color: MUTED, marginTop: 2, whiteSpace: "nowrap" }}>{info.model}</div>
            )}
          </div>
          <span
            style={{
              ...sans,
              fontSize: pt(9.5),
              fontWeight: 700,
              letterSpacing: 1,
              padding: "3px 8px",
              whiteSpace: "nowrap",
              background: info.live ? "var(--teal)" : "var(--cream-dark)",
              color: info.live ? "var(--mint)" : "var(--burgundy)",
            }}
          >
            {info.live ? "LIVE" : "INGEN NØKKEL"}
          </span>
        </div>
      </Box>

      {info.live ? (
        <>
          <Box box={[18, 74, W, 80]}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${tileW}px)`, gridAutoRows: `${tileH}px`, gap: 3 }}>
              {items.map((item, i) => {
                const r = lane.results[i];
                const differs = reference && r?.ok && reference[i] && r.choice !== reference[i];
                return (
                  <div
                    key={i}
                    title={r ? (r.ok ? `${item} → ${r.choice} · ${Math.round(r.latencyMs)} ms` : `${item} → ${r.error}`) : item}
                    style={{
                      background: !r ? "var(--cream)" : r.ok ? task.colors[r.choice ?? ""] ?? MUTED : "#fff",
                      border: r && !r.ok ? "1.5px solid var(--red)" : differs ? "2px solid var(--burgundy)" : "none",
                      boxSizing: "border-box",
                      transition: "background 180ms ease",
                    }}
                  />
                );
              })}
            </div>
          </Box>
          <Box box={[18, 166, W, 180]}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 12, columnGap: 12 }}>
              <Stat label="tid totalt" value={elapsed != null ? seconds(elapsed) : "–"} sub={`${formatInt(done.length)}/${formatInt(items.length)} ferdig`} />
              <Stat label="per sekund" value={perSecond ? perSecond.toLocaleString("nb-NO", { maximumFractionDigits: 1 }) : "–"} sub="elementer" />
              <Stat label="median per kall" value={done.length ? seconds(median(done.map((r) => r.latencyMs))) : "–"} sub="server → modell" />
              <Stat
                label="tokens per element"
                value={ok.length ? `${formatInt(avgIn)} / ${formatInt(avgOut)}` : "–"}
                sub={info.price ? `inn / ut · $${info.price.in} / $${info.price.out} per Mtok` : "ukjent pris for modellen"}
              />
              <Stat label="per element" value={perItem != null && ok.length ? formatUsd(perItem) : "–"} sub="listepris × tokens" />
              <Stat label="per 1000 elementer" value={perItem != null && ok.length ? formatUsd(perItem * 1000) : "–"} sub={"\u00a0"} />
            </div>
            <div style={{ marginTop: 10, ...sans, fontSize: pt(11.5), color: "var(--burgundy)" }}>
              {reference ? (
                compared.length ? (
                  <>
                    enig med Jev: <b style={{ fontFamily: MONO }}>{formatInt(agree)}/{formatInt(compared.length)}</b>
                  </>
                ) : (
                  <span style={{ color: MUTED }}>enig med Jev: –</span>
                )
              ) : (
                <span style={{ color: MUTED }}>Referanse for «enig». Ingen av dem er fasit.</span>
              )}
            </div>
            {(lane.error || errors.length > 0) && (
              <Body size={10} color="var(--red)" style={{ marginTop: 4 }}>
                {lane.error ?? `${formatInt(errors.length)} feil: ${errors[0].error}`}
              </Body>
            )}
          </Box>
        </>
      ) : (
        <Box box={[18, 90, W, 250]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Body size={13} color={MUTED}>
              <Copy k="nokey" />
            </Body>
            <div style={{ fontFamily: MONO, fontSize: pt(12), color: "var(--burgundy)", background: "var(--cream)", padding: "6px 10px" }}>
              {info.keyEnv}=…
            </div>
            {info.price && (
              <Body size={11} color={MUTED}>
                Listepris {info.model}: ${info.price.in} inn / ${info.price.out} ut per million tokens. Ingen tall uten live kjøring.
              </Body>
            )}
          </div>
        </Box>
      )}
    </Card>
  );
}
