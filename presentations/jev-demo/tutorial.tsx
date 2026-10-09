"use client";

import { useState } from "react";
import { Copy } from "@/components/Copy";
import { Box, ChapterSlide, pt } from "../parts";
import { QUESTION_ID, questionsFor, shortLabel, stateFor, taskById } from "./cases";
import { Playground } from "./playground";
import {
  Body,
  Button,
  Card,
  fieldStyle,
  Header,
  Label,
  LiveBadge,
  MONO,
  MUTED,
  ProbBar,
  runJev,
  sans,
  interactive,
  useDemoStatus,
} from "./ui";

export function SlideKapittel() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

export function SlideStegNoul() {
  return (
    <>
      <Header />
      <Playground presetId="noul" questionsHeight={120} />
    </>
  );
}

export function SlideStegChoice() {
  return (
    <>
      <Header />
      <Playground presetId="choice" questionsHeight={230} />
    </>
  );
}

export function SlideStegScore() {
  return (
    <>
      <Header />
      <Playground presetId="score" questionsHeight={200} />
    </>
  );
}

export function SlideStegAlle() {
  return (
    <>
      <Header />
      <Playground presetId="alle" compare questionsHeight={270} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Confidence-gated routing på nye brukere (spam/bot-casen)             */
/* ------------------------------------------------------------------ */

const SPAM = taskById("spam");
const REAL = "ekte";
const SPAM_LABEL = "spam/bot";

type Branch = "human" | "allow" | "verify" | "block";

function route(choice: string, confidence: number, floor: number, high: number): Branch {
  if (confidence < floor) return "human";
  if (choice === REAL) return "allow";
  return confidence > high ? "block" : "verify";
}

export function SlideConfidence() {
  const status = useDemoStatus();
  const [text, setText] = useState(SPAM.examples[3]);
  const [answer, setAnswer] = useState<{ choice: string; confidence: number; probs: Record<string, number>; ms: number } | null>(null);
  const [floor, setFloor] = useState(0.6);
  const [high, setHigh] = useState(0.85);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setNote(null);
    if (!status?.jev) {
      setNote("Ingen Jev-nøkkel: legg API_KEY i presentations/jev-demo/.env.");
      return;
    }
    setBusy(true);
    const res = await runJev(stateFor(SPAM, text), questionsFor(SPAM));
    setBusy(false);
    if (!res.ok) {
      setNote(res.error);
      return;
    }
    const a = res.data.answers[QUESTION_ID];
    if (a?.type === "choice" && (a.choice === REAL || a.choice === SPAM_LABEL)) {
      setAnswer({ choice: a.choice, confidence: a.confidence, probs: a.probabilities, ms: res.latencyMs });
    } else {
      setNote("Uventet svar fra Jev.");
    }
  };

  const branch = answer ? route(answer.choice, answer.confidence, floor, high) : null;
  const branches: Branch[] = ["human", "allow", "verify", "block"];

  return (
    <>
      <Header />
      <Box box={[81, 170, 540, 500]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }} {...interactive}>
          <Label>ny bruker (state)</Label>
          <div style={{ height: 70 }}>
            <textarea value={text} onChange={(e) => {
                setText(e.target.value);
                setAnswer(null);
              }} spellCheck={false} style={{ ...fieldStyle, fontFamily: MONO, fontSize: pt(10.5), lineHeight: 1.4 }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {SPAM.examples.map((u) => (
              <button
                key={u}
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  setText(u);
                  setAnswer(null);
                }}
                style={{ ...sans, fontSize: pt(10), border: "1px solid var(--divider)", background: text === u ? "var(--cream)" : "#fff", color: "var(--burgundy)", padding: "3px 8px", cursor: "pointer" }}
              >
                {shortLabel(u)}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button onClick={ask} disabled={busy}>
              {busy ? "Spør Jev …" : "Spør Jev"}
            </Button>
            {answer && <LiveBadge />}
            {answer && <span style={{ fontFamily: MONO, fontSize: pt(10.5), color: MUTED }}>{(answer.ms / 1000).toFixed(2)} s</span>}
          </div>
          {note && <Body size={11} color="var(--red-deep)">{note}</Body>}

          <div style={{ marginTop: 6, minHeight: 110 }}>
            <Label>svar fra jev: {SPAM.column} · choice</Label>
            {answer ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 6 }}>
                {Object.entries(answer.probs).map(([k, v]) => (
                  <ProbBar key={k} label={k} value={v} highlight={k === answer.choice} color={SPAM.colors[k]} />
                ))}
                <div style={{ fontFamily: MONO, fontSize: pt(12), color: "var(--teal)", marginTop: 4 }}>
                  confidence {answer.confidence.toFixed(2)}
                </div>
              </div>
            ) : (
              <Body size={11.5} color={MUTED} style={{ marginTop: 6 }}>
                Ingen svar ennå. Velg en bruker og spør Jev.
              </Body>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--divider)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            <Label>terskler i koden din</Label>
            <Slider label="gulv (alt)" value={floor} onChange={setFloor} color="var(--red-deep)" />
            <Slider label="blokker auto" value={high} onChange={setHigh} color="var(--red-deep)" />
          </div>
        </div>
      </Box>

      <Box box={[645, 170, 555, 500]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>kode bestemmer – modellen gir svar og sikkerhet</Label>
          {branches.map((b) => {
            const active = b === branch;
            return (
              <Card
                key={b}
                box={[0, 0, 555, 78]}
                bg={active ? "var(--teal)" : "#fff"}
                style={{ position: "relative", transition: "background 200ms" }}
              >
                <Box box={[18, 12, 520, 60]}>
                  <Copy k={`${b}_rule`} as="div" style={{ fontFamily: MONO, fontSize: pt(11), color: active ? "var(--mint)" : MUTED }} />
                  <Copy k={`${b}_action`} as="div" style={{ ...sans, fontSize: pt(17), fontWeight: 700, color: active ? "#fff" : "var(--burgundy)", marginTop: 4 }} />
                </Box>
              </Card>
            );
          })}
          <Body size={12} color={MUTED}>
            <Copy k="footer" />
          </Body>
        </div>
      </Box>
    </>
  );
}

function Slider({ label, value, onChange, color }: { label: string; value: number; onChange: (v: number) => void; color: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 44px", alignItems: "center", gap: 10 }}>
      <span style={{ ...sans, fontSize: pt(11.5), color: "var(--burgundy)" }}>{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: color, width: "100%" }}
      />
      <span style={{ fontFamily: MONO, fontSize: pt(11.5), color, textAlign: "right" }}>{value.toFixed(2)}</span>
    </div>
  );
}
