"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { Box, pt } from "../parts";
import {
  DEFAULT_OPENAI_MODEL,
  formatInt,
  formatUsd,
  jevCostUsd,
  JEV_PRICE_IN,
  llmCostUsd,
  MODEL_PRICES,
  TERMS_DOC,
  TERMS_QUESTIONS,
  type Answer,
} from "./jev";
import { Body, Button, Card, Header, interactive, Label, MONO, MUTED, PINK, runJev, sans, serif, streamSplit, useDemoStatus } from "./ui";

function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = formatInt,
  log = false,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  log?: boolean;
}) {
  const toPos = (v: number) => (log ? Math.log10(v) : v);
  const fromPos = (p: number) => (log ? Math.round(10 ** p) : p);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "190px 1fr 90px", alignItems: "center", gap: 10 }}>
      <span style={{ ...sans, fontSize: pt(12), color: "var(--burgundy)" }}>{label}</span>
      <input
        type="range"
        min={toPos(min)}
        max={toPos(max)}
        step={log ? 0.01 : step}
        value={toPos(value)}
        onChange={(e) => onChange(fromPos(Number(e.target.value)))}
        style={{ accentColor: "var(--red)", width: "100%" }}
      />
      <span style={{ fontFamily: MONO, fontSize: pt(12), color: "var(--burgundy)", textAlign: "right" }}>{format(value)}</span>
    </div>
  );
}

function Bar({ label, value, max, color, right }: { label: ReactNode; value: number; max: number; color: string; right: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ ...sans, fontSize: pt(12.5), fontWeight: 700, color: "var(--burgundy)" }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: pt(12), color }}>{right}</span>
      </div>
      <div style={{ height: 22, background: "var(--cream)" }}>
        <div style={{ height: "100%", width: `${Math.max(0.4, (value / max) * 100)}%`, background: color, transition: "width 300ms ease" }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mange spørsmål i ett kall – målt live                                */
/* ------------------------------------------------------------------ */

const COUNTS = [1, 3, 5, 10];

type Side = { status: "idle" | "running" | "done" | "error"; ms: number | null; tokens: number; answers: Record<string, number>; error: string | null };
const IDLE_SIDE: Side = { status: "idle", ms: null, tokens: 0, answers: {}, error: null };

function noulOf(a: Answer | undefined): number | null {
  return a?.type === "noul" ? a.noul : null;
}

export function SlideBatching() {
  const status = useDemoStatus();
  const [n, setN] = useState(10);
  const [one, setOne] = useState<Side>(IDLE_SIDE);
  const [many, setMany] = useState<Side>(IDLE_SIDE);
  const [ranN, setRanN] = useState<number | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  const ids = Object.keys(TERMS_QUESTIONS).slice(0, ranN ?? n);
  const busy = one.status === "running" || many.status === "running";

  const run = () => {
    abort.current?.abort();
    const ac = new AbortController();
    abort.current = ac;
    const qIds = Object.keys(TERMS_QUESTIONS).slice(0, n);
    const questions = Object.fromEntries(qIds.map((id) => [id, TERMS_QUESTIONS[id]]));
    setRanN(n);
    const t0 = performance.now();
    setOne({ ...IDLE_SIDE, status: "running" });
    setMany({ ...IDLE_SIDE, status: "running" });

    runJev(TERMS_DOC, questions).then((r) => {
      if (ac.signal.aborted) return;
      if (!r.ok) return setOne({ ...IDLE_SIDE, status: "error", error: r.error });
      const answers: Record<string, number> = {};
      for (const id of qIds) {
        const v = noulOf(r.data.answers[id]);
        if (v !== null) answers[id] = v;
      }
      setOne({ status: "done", ms: performance.now() - t0, tokens: r.data.usage.input_tokens, answers, error: null });
    });

    let tokens = 0;
    const answers: Record<string, number> = {};
    streamSplit(
      TERMS_DOC,
      questions,
      (lines) => {
        for (const line of lines) {
          if ("i" in line && line.ok && "data" in line) {
            tokens += line.data.usage.input_tokens;
            const v = noulOf(line.data.answers[qIds[line.i]]);
            if (v !== null) answers[qIds[line.i]] = v;
          } else if ("i" in line && !line.ok) {
            setMany((m) => ({ ...m, error: line.error }));
          }
        }
        const finished = lines.some((l) => "done" in l);
        setMany((m) => ({ ...m, status: finished ? "done" : "running", tokens, answers: { ...answers }, ms: finished ? performance.now() - t0 : null }));
      },
      ac.signal
    ).then((err) => {
      if (err && !ac.signal.aborted) setMany((m) => ({ ...m, status: "error", error: err }));
    });
  };

  const bothDone = one.status === "done" && many.status === "done";
  const max = Math.max(one.tokens, many.tokens, 1);
  const agree = ids.filter((id) => id in one.answers && id in many.answers && one.answers[id] >= 0.5 === many.answers[id] >= 0.5).length;
  const maxDiff = Math.max(0, ...ids.filter((id) => id in one.answers && id in many.answers).map((id) => Math.abs(one.answers[id] - many.answers[id])));
  const sideText = (side: Side) =>
    side.status === "idle"
      ? "–"
      : side.status === "error"
        ? side.error ?? "feil"
        : `${formatInt(side.tokens)} tok · ${formatUsd(jevCostUsd(side.tokens))} · ${side.ms !== null ? `${(side.ms / 1000).toFixed(2)} s` : "…"}`;

  return (
    <>
      <Header />
      <Card box={[81, 175, 600, 495]} bar="var(--red)">
        <Box box={[22, 18, 556, 465]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }} {...interactive}>
            <Label>
              <Copy k="doc_label" />
            </Label>
            <pre style={{ margin: 0, height: 150, overflow: "auto", padding: "8px 10px", background: "var(--cream)", fontFamily: MONO, fontSize: pt(8.5), lineHeight: 1.35, whiteSpace: "pre-wrap", color: "var(--burgundy)" }}>
              {TERMS_DOC}
            </pre>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Label>
                <Copy k="count_label" />
              </Label>
              {COUNTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={busy}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setN(c);
                  }}
                  style={{ ...sans, width: 34, height: 26, fontSize: pt(12), fontWeight: 700, border: "1.5px solid var(--burgundy)", background: c === n ? "var(--burgundy)" : "transparent", color: c === n ? "#fff" : "var(--burgundy)", cursor: busy ? "default" : "pointer" }}
                >
                  {c}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <Button onClick={run} disabled={busy || !status?.jev}>
                {busy ? "Kjører …" : "Kjør begge"}
              </Button>
            </div>
            <Bar label={`Ett kall med ${ranN ?? n} spørsmål`} value={one.tokens} max={max} color="var(--teal)" right={sideText(one)} />
            <Bar label={`${ranN ?? n} kall med ett spørsmål hver, samtidig`} value={many.tokens} max={max} color="var(--red-deep)" right={sideText(many)} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 4 }}>
              <span style={{ ...serif, fontSize: pt(48), color: "var(--red)" }}>{bothDone && one.tokens ? `${(many.tokens / one.tokens).toFixed(1)}×` : "–"}</span>
              <Body size={14}>
                <Copy k="ratio_text" />
              </Body>
            </div>
          </div>
        </Box>
      </Card>
      <Card box={[705, 175, 495, 495]} bg="var(--burgundy)">
        <Box box={[24, 20, 447, 460]}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", columnGap: 10, rowGap: 6, alignItems: "center" }}>
            <Label color="var(--mint)">
              <Copy k="table_label" />
            </Label>
            <Label color="var(--mint)">ett kall</Label>
            <Label color="var(--mint)">eget kall</Label>
            {ids.map((id) => {
              const a = one.answers[id];
              const b = many.answers[id];
              const differ = a !== undefined && b !== undefined && a >= 0.5 !== b >= 0.5;
              const cell = (v: number | undefined) => (
                <span style={{ fontFamily: MONO, fontSize: pt(11.5), color: v === undefined ? "var(--cream-dark)" : v >= 0.5 ? "var(--mint)" : "#fff", textAlign: "right" }}>
                  {v === undefined ? "–" : v.toFixed(2)}
                </span>
              );
              return (
                <Fragment key={id}>
                  <span style={{ fontFamily: MONO, fontSize: pt(10.5), color: differ ? "var(--red)" : "var(--cream-dark)" }}>{id}</span>
                  {cell(a)}
                  {cell(b)}
                </Fragment>
              );
            })}
          </div>
          <div style={{ ...sans, fontSize: pt(12), color: "#fff", marginTop: 14 }}>
            {bothDone ? `Samme ja/nei på ${agree} av ${ids.length}. Største forskjell i p(ja): ${maxDiff.toFixed(2)}.` : <Copy k="table_hint" />}
          </div>
        </Box>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Kostnadskalkulator                                                   */
/* ------------------------------------------------------------------ */

/* Faste tillegg per kall, anslått fra eksemplene i docs (296 input-tokens for et kort spørsmål). */
const JEV_OVERHEAD = 260;
const JEV_PER_Q = 40;
const LLM_OVERHEAD = 60;
const LLM_PER_Q = 30;

export function SlideKalkulator() {
  const [calls, setCalls] = useState(100_000);
  const [stateTok, setStateTok] = useState(300);
  const [nq, setNq] = useState(3);
  const [outPerQ, setOutPerQ] = useState(150);
  const [perQuestion, setPerQuestion] = useState(false);
  const [priceIn, setPriceIn] = useState(MODEL_PRICES[DEFAULT_OPENAI_MODEL].in);
  const [priceOut, setPriceOut] = useState(MODEL_PRICES[DEFAULT_OPENAI_MODEL].out);

  const days = 30;
  const jevIn = JEV_OVERHEAD + stateTok + nq * JEV_PER_Q;
  const llmCallsPer = perQuestion ? nq : 1;
  const llmIn = llmCallsPer * (LLM_OVERHEAD + stateTok + (perQuestion ? LLM_PER_Q : nq * LLM_PER_Q));
  const llmOut = nq * outPerQ;
  const jevMonth = jevCostUsd(jevIn) * calls * days;
  const llmMonth = llmCostUsd(llmIn, llmOut, priceIn, priceOut) * calls * days;
  const max = Math.max(jevMonth, llmMonth);

  return (
    <>
      <Header />
      <Card box={[81, 175, 600, 495]} bar="var(--red)">
        <Box box={[22, 26, 556, 460]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }} {...interactive}>
            <Label>volum</Label>
            <Range label="Kall per dag" value={calls} min={1_000} max={10_000_000} log onChange={setCalls} />
            <Range label="Tokens tekst per kall" value={stateTok} min={20} max={20_000} log onChange={setStateTok} />
            <Range label="Spørsmål per kall" value={nq} min={1} max={20} onChange={setNq} />
            <Label>llm-en</Label>
            <Range label="Output per spørsmål (inkl. resonnering)" value={outPerQ} min={5} max={2_000} log onChange={setOutPerQ} />
            <Range label="Pris input $/Mtok" value={priceIn} min={0.05} max={5} step={0.05} onChange={setPriceIn} format={(v) => v.toFixed(2)} />
            <Range label="Pris output $/Mtok" value={priceOut} min={0.1} max={20} step={0.05} onChange={setPriceOut} format={(v) => v.toFixed(2)} />
            <label style={{ ...sans, fontSize: pt(12), color: "var(--burgundy)", display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={perQuestion} onChange={(e) => setPerQuestion(e.target.checked)} style={{ accentColor: "var(--red)" }} />
              <Copy k="per_question" />
            </label>
            <Body size={10.5} color={MUTED}>
              <Copy k="assumption" />
            </Body>
          </div>
        </Box>
      </Card>
      <Card box={[705, 175, 495, 495]}>
        <Box box={[24, 26, 447, 450]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Label>kostnad per måned (30 dager)</Label>
            <Bar label={`Jev · $${JEV_PRICE_IN}/Mtok, output gratis`} value={jevMonth} max={max} color="var(--teal)" right={formatUsd(jevMonth)} />
            <Bar label={`LLM (${DEFAULT_OPENAI_MODEL}-pris)`} value={llmMonth} max={max} color="var(--red-deep)" right={formatUsd(llmMonth)} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ ...serif, fontSize: pt(54), color: "var(--red)" }}>{(llmMonth / jevMonth).toFixed(0)}×</span>
              <Body size={13}>
                <Copy k="ratio_text" />
              </Body>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, background: "var(--cream)", padding: 12 }}>
              <Mini label="Jev tokens / kall" value={`${formatInt(jevIn)} inn`} />
              <Mini label="LLM tokens / kall" value={`${formatInt(llmIn)} inn · ${formatInt(llmOut)} ut`} />
              <Mini label="Jev per kall" value={formatUsd(jevCostUsd(jevIn))} />
              <Mini label="LLM per kall" value={formatUsd(llmCostUsd(llmIn, llmOut, priceIn, priceOut))} />
            </div>
          </div>
        </Box>
      </Card>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label size={9}>{label}</Label>
      <div style={{ fontFamily: MONO, fontSize: pt(12), color: "var(--burgundy)", marginTop: 2 }}>{value}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hva sier forskningen                                                 */
/* ------------------------------------------------------------------ */

export function SlideForskning() {
  const stats = useCopyCount("stats");
  return (
    <>
      <Header />
      {Array.from({ length: stats }, (_, i) => (
        <Card key={i} box={[81 + (i % 2) * 565, 180 + Math.floor(i / 2) * 175, 552, 160]} bar={i === 3 ? "var(--red)" : "var(--teal)"}>
          <Box box={[22, 24, 508, 125]}>
            <Copy k="stats" i={i} field="tall" as="div" style={{ ...serif, fontSize: pt(36), color: i === 3 ? "var(--red)" : "var(--teal)" }} />
            <Copy k="stats" i={i} field="tekst" as="div" style={{ ...sans, fontSize: pt(13.5), lineHeight: 1.35, color: "var(--burgundy)", marginTop: 6 }} />
          </Box>
        </Card>
      ))}
      <Box box={[81, 540, 1117, 70]} style={{ background: PINK, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box" }}>
        <Copy k="takeaway" as="div" style={{ ...sans, fontSize: pt(15), color: "var(--burgundy)" }} />
      </Box>
      <Box box={[81, 625, 1117, 40]}>
        <Copy k="source" as="div" style={{ ...sans, fontSize: pt(11), color: MUTED }} />
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Studien: ja/nei mot skala                                            */
/* ------------------------------------------------------------------ */

/*
 * Treffsikkerhet (%) på de to ja/nei-panelene, per-kriterium-oppsett.
 * Rao og Callison-Burch, arXiv 2609.29769, tabell 2. `sig`: signifikant
 * forskjellig fra Jev (95 %-intervall uten null).
 */
const BINARY_PANELS: { name: string; info: string; scores: { judge: string; value: number; sig?: boolean }[] }[] = [
  {
    name: "RiceChem",
    info: "kjemisvar · 27 kriterier · 819 vurderinger",
    scores: [
      { judge: "Jev", value: 81.0 },
      { judge: "GPT-5.6 Luna", value: 77.8, sig: true },
      { judge: "Gemini 3.8 Flash", value: 76.1, sig: true },
      { judge: "DeepSeek V4.1 Flash", value: 79.2 },
    ],
  },
  {
    name: "HealthBench",
    info: "chatbot-svar · 34 kriterier · 406 vurderinger",
    scores: [
      { judge: "Jev", value: 77.1 },
      { judge: "GPT-5.6 Luna", value: 70.4, sig: true },
      { judge: "Gemini 3.8 Flash", value: 79.6 },
      { judge: "DeepSeek V4.1 Flash", value: 76.4 },
    ],
  },
];
const AXIS_MIN = 60;
const AXIS_MAX = 85;

function pct(v: number): string {
  return v.toLocaleString("nb-NO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function SlideForskningJaNei() {
  const scaleItems = useCopyCount("scale_items");
  return (
    <>
      <Header />
      <Card box={[81, 175, 640, 375]} bar="var(--teal)">
        <Box box={[22, 22, 596, 340]}>
          <Label size={10}>
            <Copy k="binary_label" />
          </Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
            {BINARY_PANELS.map((p) => {
              const jev = p.scores[0].value;
              return (
                <div key={p.name}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ ...serif, fontSize: pt(17), color: "var(--burgundy)" }}>{p.name}</span>
                    <span style={{ ...sans, fontSize: pt(10.5), color: MUTED }}>{p.info}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
                    {p.scores.map((s, i) => {
                      const w = ((s.value - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
                      const diff = jev - s.value;
                      return (
                        <div key={s.judge} style={{ display: "grid", gridTemplateColumns: "150px 1fr 54px 82px", alignItems: "center", gap: 10 }}>
                          <span style={{ ...sans, fontSize: pt(11), fontWeight: i === 0 ? 700 : 400, color: "var(--burgundy)" }}>{s.judge}</span>
                          <div style={{ height: 14, background: "var(--cream)" }}>
                            <div style={{ width: `${w}%`, height: "100%", background: i === 0 ? "var(--teal)" : "var(--cream-dark)" }} />
                          </div>
                          <span style={{ fontFamily: MONO, fontSize: pt(11), fontWeight: i === 0 ? 700 : 400, color: "var(--burgundy)", textAlign: "right" }}>{pct(s.value)}</span>
                          <span style={{ fontFamily: MONO, fontSize: pt(10), color: i === 0 ? MUTED : diff > 0 ? "var(--teal)" : "var(--red-deep)" }}>
                            {i === 0 ? "" : `Jev ${diff > 0 ? "+" : "−"}${pct(Math.abs(diff))}${s.sig ? " *" : ""}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <Copy k="binary_note" as="div" style={{ ...sans, fontSize: pt(10), color: MUTED, marginTop: 12 }} />
        </Box>
      </Card>

      <Card box={[745, 175, 455, 375]} bar="var(--red-deep)">
        <Box box={[22, 22, 411, 340]}>
          <Label size={10}>
            <Copy k="scale_label" />
          </Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            {Array.from({ length: scaleItems }, (_, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "92px 1fr", alignItems: "baseline", gap: 10 }}>
                <Copy k="scale_items" i={i} field="tall" as="span" style={{ ...serif, fontSize: pt(i === 0 ? 28 : 24), color: i === 1 ? "var(--red-deep)" : "var(--teal)" }} />
                <Copy k="scale_items" i={i} field="tekst" as="span" style={{ ...sans, fontSize: pt(12.5), lineHeight: 1.3, color: "var(--burgundy)" }} />
              </div>
            ))}
          </div>
          <Copy k="scale_tip" as="div" style={{ ...sans, fontSize: pt(12), lineHeight: 1.35, color: MUTED, marginTop: 14, borderTop: "1px solid var(--divider)", paddingTop: 10 }} />
        </Box>
      </Card>

      <Box box={[81, 565, 1117, 60]} style={{ background: PINK, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box" }}>
        <Copy k="takeaway" as="div" style={{ ...sans, fontSize: pt(14), color: "var(--burgundy)" }} />
      </Box>
      <Box box={[81, 635, 1117, 40]}>
        <Copy k="source" as="div" style={{ ...sans, fontSize: pt(10.5), lineHeight: 1.3, color: MUTED }} />
      </Box>
    </>
  );
}
