"use client";

import { useMemo, useState } from "react";
import { Box, pt } from "../parts";
import {
  formatInt,
  formatUsd,
  jevCostUsd,
  llmCostUsd,
  modelPrice,
  PRESETS,
  type Answer,
  type JevResponse,
  type Questions,
} from "./jev";
import {
  Body,
  Button,
  Card,
  fieldStyle,
  Label,
  LiveBadge,
  MONO,
  MUTED,
  ProbBar,
  runJev,
  runLlm,
  sans,
  Stat,
  interactive,
  useDemoStatus,
} from "./ui";

type Shown = { data: JevResponse; latencyMs: number };
type LlmShown = {
  model: string;
  input: number;
  output: number;
  reasoning: number;
  latencyMs: number;
  text: string;
};

function AnswerView({ id, answer }: { id: string; answer: Answer }) {
  const head = (extra?: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
      <span style={{ fontFamily: MONO, fontSize: pt(11.5), fontWeight: 700, color: "var(--burgundy)" }}>
        {id} <span style={{ color: MUTED, fontWeight: 400 }}>· {answer.type}</span>
      </span>
      {extra && <span style={{ fontFamily: MONO, fontSize: pt(11), color: "var(--red-deep)" }}>{extra}</span>}
    </div>
  );
  if (answer.type === "noul") {
    return (
      <div>
        {head(`noul ${answer.noul.toFixed(2)}`)}
        <ProbBar label="p(ja)" value={answer.noul} highlight color="var(--red)" />
      </div>
    );
  }
  if (answer.type === "choice") {
    const entries = Object.entries(answer.probabilities).sort((a, b) => b[1] - a[1]);
    return (
      <div>
        {head(`confidence ${answer.confidence.toFixed(2)}`)}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {entries.map(([k, v]) => (
            <ProbBar key={k} label={k} value={v} highlight={k === answer.choice} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      {head(`score ${answer.score.toFixed(2)} · conf ${answer.confidence.toFixed(2)}`)}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.entries(answer.legend).map(([k, label]) => (
          <ProbBar
            key={k}
            label={`${k} ${label}`}
            value={answer.probabilities[k] ?? 0}
            highlight={Math.round(answer.score) === Number(k)}
            color="var(--red-deep)"
          />
        ))}
      </div>
    </div>
  );
}

export function Playground({
  presetId,
  compare = false,
  questionsHeight = 230,
}: {
  presetId: keyof typeof PRESETS;
  /** Vis knapp for å kjøre samme oppgave mot en vanlig LLM. */
  compare?: boolean;
  questionsHeight?: number;
}) {
  const preset = PRESETS[presetId];
  const initialQuestions = useMemo(() => JSON.stringify(preset.questions, null, 2), [preset]);
  const status = useDemoStatus();
  const [state, setState] = useState(preset.state);
  const [questionsText, setQuestionsText] = useState(initialQuestions);
  const [shown, setShown] = useState<Shown | null>(null);
  const [llm, setLlm] = useState<LlmShown | null>(null);
  const [busy, setBusy] = useState<"jev" | "llm" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [raw, setRaw] = useState(false);

  const parseQuestions = (): Questions | null => {
    try {
      const q = JSON.parse(questionsText) as Questions;
      if (!q || typeof q !== "object" || Array.isArray(q)) throw new Error("questions må være et objekt");
      return q;
    } catch (e) {
      setNote(`Ugyldig JSON i questions: ${e instanceof Error ? e.message : e}`);
      return null;
    }
  };


  const onRun = async () => {
    setNote(null);
    const q = parseQuestions();
    if (!q) return;
    if (!status?.jev) {
      setNote("Ingen Jev-nøkkel: legg API_KEY i presentations/jev-demo/.env.");
      return;
    }
    setBusy("jev");
    const res = await runJev(state, q);
    setBusy(null);
    if (res.ok) setShown({ data: res.data, latencyMs: res.latencyMs });
    else setNote(res.error);
  };

  const onLlm = async () => {
    setNote(null);
    const q = parseQuestions();
    if (!q) return;
    if (!status?.openai?.configured) {
      setNote(`Ingen OpenAI-nøkkel: legg ${status?.openai?.keyEnv ?? "OPENAI_API_KEY"} i presentations/jev-demo/.env.`);
      return;
    }
    setBusy("llm");
    const res = await runLlm(state, q);
    setBusy(null);
    if (res.ok) setLlm({ model: res.model, ...res.usage, latencyMs: res.latencyMs, text: res.text });
    else setNote(res.error);
  };

  const reset = () => {
    setState(preset.state);
    setQuestionsText(initialQuestions);
    setShown(null);
    setLlm(null);
    setNote(null);
  };

  const usage = shown?.data.usage;
  const jevCost = usage ? jevCostUsd(usage.input_tokens) : null;
  const llmPrice = modelPrice(llm?.model);
  const stateHeight = 74;
  const leftH = 500;

  return (
    <>
      {/* Venstre: request */}
      <Box box={[81, 170, 540, leftH]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, height: "100%" }} {...interactive}>
          <Label>state</Label>
          <div style={{ height: stateHeight }}>
            <textarea
              value={state}
              onChange={(e) => setState(e.target.value)}
              spellCheck={false}
              style={{ ...fieldStyle, ...sans, fontSize: pt(12.5), lineHeight: 1.35 }}
            />
          </div>
          <Label>questions</Label>
          <div style={{ height: questionsHeight }}>
            <textarea
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              spellCheck={false}
              style={{ ...fieldStyle, fontFamily: MONO, fontSize: pt(10), lineHeight: 1.35 }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
            <Button onClick={onRun} disabled={busy !== null}>
              {busy === "jev" ? "Spør Jev …" : "Kjør Jev"}
            </Button>
            {compare && (
              <Button tone="teal" onClick={onLlm} disabled={busy !== null}>
                {busy === "llm" ? "Spør OpenAI …" : "Samme med OpenAI"}
              </Button>
            )}
            <Button tone="ghost" onClick={reset} disabled={busy !== null}>
              Nullstill
            </Button>
          </div>
          {note && <Body size={11} color="var(--red-deep)">{note}</Body>}
        </div>
      </Box>

      {/* Høyre: svar */}
      <Card box={[645, 170, 555, compare ? 300 : 360]} bar="var(--teal)">
        <Box box={[18, 16, 519, compare ? 270 : 330]}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Label>answers</Label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {shown && <LiveBadge />}
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  e.stopPropagation();
                  setRaw((r) => !r);
                }}
                style={{ ...sans, fontSize: pt(10), border: "none", background: "none", color: "var(--teal)", cursor: "pointer", textDecoration: "underline" }}
              >
                {raw ? "visuelt" : "rå JSON"}
              </button>
            </div>
          </div>
          {!shown ? (
            <Body size={12} color={MUTED}>
              Ingen svar ennå. Trykk «Kjør Jev» – svaret og forbruket kommer rett fra API-et.
            </Body>
          ) : raw ? (
            <pre
              {...interactive}
              style={{ margin: 0, fontFamily: MONO, fontSize: pt(9.5), lineHeight: 1.3, color: "var(--burgundy)", overflow: "auto", height: compare ? 225 : 285 }}
            >
              {JSON.stringify(shown.data, null, 2)}
            </pre>
          ) : (
            <div {...interactive} style={{ display: "flex", flexDirection: "column", gap: 8, overflow: "auto", height: compare ? 228 : 285 }}>
              {Object.entries(shown.data.answers).map(([id, a]) => (
                <AnswerView key={id} id={id} answer={a} />
              ))}
            </div>
          )}
        </Box>
      </Card>

      {/* Høyre: forbruk */}
      <Card box={[645, compare ? 482 : 542, 555, compare ? 188 : 128]} bg="var(--burgundy)">
        <Box box={[18, 14, 519, 100]}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <Stat label={<span style={{ color: "var(--mint)" }}>input tokens</span>} value={<span style={{ color: "#fff" }}>{usage ? formatInt(usage.input_tokens) : "–"}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>faktureres</span>} />
            <Stat label={<span style={{ color: "var(--mint)" }}>output tokens</span>} value={<span style={{ color: "#fff" }}>{usage ? formatInt(usage.output_tokens) : "–"}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>gratis</span>} />
            <Stat label={<span style={{ color: "var(--mint)" }}>kostnad</span>} value={<span style={{ color: "#fff" }}>{jevCost !== null ? formatUsd(jevCost) : "–"}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>dette kallet</span>} />
            <Stat
              label={<span style={{ color: "var(--mint)" }}>ventetid</span>}
              value={<span style={{ color: "#fff" }}>{shown ? `${(shown.latencyMs / 1000).toFixed(2)} s` : "–"}</span>}
              sub={<span style={{ color: "var(--cream-dark)" }}>målt på serveren</span>}
            />
          </div>
        </Box>
        {compare && (
          <Box box={[18, 104, 519, 74]}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 10 }}>
              {llm ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                  <Stat label={<span style={{ color: "var(--red)" }}>OpenAI input</span>} value={<span style={{ color: "#fff" }}>{formatInt(llm.input)}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>{llm.model}</span>} />
                  <Stat label={<span style={{ color: "var(--red)" }}>OpenAI output</span>} value={<span style={{ color: "#fff" }}>{formatInt(llm.output)}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>{llm.reasoning ? `${formatInt(llm.reasoning)} resonnering` : "betales"}</span>} />
                  <Stat label={<span style={{ color: "var(--red)" }}>kostnad</span>} value={<span style={{ color: "#fff" }}>{llmPrice ? formatUsd(llmCostUsd(llm.input, llm.output, llmPrice.in, llmPrice.out)) : "–"}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>{llmPrice ? `listepris ${llmPrice.in}/${llmPrice.out}` : "ukjent pris"}</span>} />
                  <Stat label={<span style={{ color: "var(--red)" }}>ventetid</span>} value={<span style={{ color: "#fff" }}>{`${(llm.latencyMs / 1000).toFixed(2)} s`}</span>} sub={<span style={{ color: "var(--cream-dark)" }}>målt på serveren</span>} />
                </div>
              ) : (
                <Body size={11.5} color="var(--cream-dark)">
                  Trykk «Samme med OpenAI» for å sende samme oppgave som en vanlig prompt og se tokenene side om side.
                </Body>
              )}
            </div>
          </Box>
        )}
      </Card>
    </>
  );
}
