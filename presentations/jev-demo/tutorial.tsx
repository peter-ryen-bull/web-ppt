"use client";

import { useState } from "react";
import { Copy } from "@/components/Copy";
import { Box, ChapterSlide, pt } from "../parts";
import { BANK_QUESTIONS } from "./jev";
import { Playground } from "./playground";
import {
  Body,
  Button,
  Card,
  fieldStyle,
  Header,
  Label,
  ModeBadge,
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
      <Playground presetId="alle" compare questionsHeight={300} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Confidence-gated routing (bank-eksempelet fra TypeSafe-docs)         */
/* ------------------------------------------------------------------ */

const INTENTS = ["check_balance", "approve_transfer", "other"] as const;
type Intent = (typeof INTENTS)[number];

const UTTERANCES = [
  "What's my balance right now?",
  "Yes, please approve the transfer to my landlord.",
  "Uh, the transfer thing, maybe? I'm not really sure.",
];

type Branch = "human" | "balance" | "confirm" | "approve";

function route(intent: Intent, confidence: number, floor: number, high: number): Branch {
  if (confidence < floor) return "human";
  if (intent === "check_balance") return "balance";
  if (intent === "approve_transfer") return confidence > high ? "approve" : "confirm";
  return "human";
}

export function SlideConfidence() {
  const status = useDemoStatus();
  const [text, setText] = useState(UTTERANCES[1]);
  const [intent, setIntent] = useState<Intent>("approve_transfer");
  const [confidence, setConfidence] = useState(0.72);
  const [probs, setProbs] = useState<Record<string, number> | null>(null);
  const [live, setLive] = useState(false);
  const [floor, setFloor] = useState(0.6);
  const [high, setHigh] = useState(0.85);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setNote(null);
    if (!status?.jev) {
      setNote("Ikke live – juster svar og confidence for hånd under.");
      return;
    }
    setBusy(true);
    const res = await runJev(text, BANK_QUESTIONS);
    setBusy(false);
    if (!res.ok) {
      setNote(res.error);
      return;
    }
    const a = res.data.answers.intent;
    if (a?.type === "choice" && (INTENTS as readonly string[]).includes(a.choice)) {
      setIntent(a.choice as Intent);
      setConfidence(a.confidence);
      setProbs(a.probabilities);
      setLive(true);
    }
  };

  const branch = route(intent, confidence, floor, high);
  const branches: { id: Branch; k: string }[] = [
    { id: "human", k: "human" },
    { id: "balance", k: "balance" },
    { id: "confirm", k: "confirm" },
    { id: "approve", k: "approve" },
  ];

  return (
    <>
      <Header />
      <Box box={[81, 170, 540, 500]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }} {...interactive}>
          <Label>kunden sier (state)</Label>
          <div style={{ height: 58 }}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} style={{ ...fieldStyle, ...sans, fontSize: pt(13) }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {UTTERANCES.map((u) => (
              <button
                key={u}
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  setText(u);
                }}
                style={{ ...sans, fontSize: pt(10), border: "1px solid var(--divider)", background: text === u ? "var(--cream)" : "#fff", color: "var(--burgundy)", padding: "3px 8px", cursor: "pointer" }}
              >
                {u}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button onClick={ask} disabled={busy}>
              {busy ? "Spør Jev …" : "Spør Jev om intent"}
            </Button>
            <ModeBadge live={live} offline="MANUELT" />
          </div>
          {note && <Body size={11} color="var(--red-deep)">{note}</Body>}

          <div style={{ marginTop: 6 }}>
            <Label>svar: choice</Label>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              {INTENTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setIntent(i);
                    setLive(false);
                    setProbs(null);
                  }}
                  style={{ fontFamily: MONO, fontSize: pt(10.5), padding: "4px 8px", cursor: "pointer", border: "none", background: intent === i ? "var(--teal)" : "#fff", color: intent === i ? "#fff" : "var(--burgundy)" }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          {probs && (
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Object.entries(probs).map(([k, v]) => (
                <ProbBar key={k} label={k} value={v} highlight={k === intent} />
              ))}
            </div>
          )}
          <Slider label="confidence" value={confidence} onChange={(v) => { setConfidence(v); setLive(false); }} color="var(--teal)" />
          <div style={{ borderTop: "1px solid var(--divider)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            <Label>terskler i koden din</Label>
            <Slider label="gulv (alt)" value={floor} onChange={setFloor} color="var(--red-deep)" />
            <Slider label="overføring auto" value={high} onChange={setHigh} color="var(--red-deep)" />
          </div>
        </div>
      </Box>

      <Box box={[645, 170, 555, 500]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>kode bestemmer – modellen gir svar og sikkerhet</Label>
          {branches.map((b) => {
            const active = b.id === branch;
            return (
              <Card
                key={b.id}
                box={[0, 0, 555, 78]}
                bg={active ? "var(--teal)" : "#fff"}
                style={{ position: "relative", transition: "background 200ms" }}
              >
                <Box box={[18, 12, 520, 60]}>
                  <Copy k={`${b.k}_rule`} as="div" style={{ fontFamily: MONO, fontSize: pt(11), color: active ? "var(--mint)" : MUTED }} />
                  <Copy k={`${b.k}_action`} as="div" style={{ ...sans, fontSize: pt(17), fontWeight: 700, color: active ? "#fff" : "var(--burgundy)", marginTop: 4 }} />
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
