"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, MilesLogo, pt } from "../parts";
import { buildLlmMessages, PRESETS } from "./jev";
import { Body, Button, Card, Header, Label, MONO, MUTED, PINK, ProbBar, sans, serif } from "./ui";

export function SlideForside() {
  return (
    <>
      <MilesLogo />
      <Box box={[81, 180, 1000, 60]}>
        <Copy k="kicker" as="div" style={{ ...sans, fontSize: pt(16), letterSpacing: 2, color: "var(--red)" }} />
      </Box>
      <Box box={[81, 230, 1100, 200]}>
        <Copy k="title" as="div" style={{ ...serif, fontSize: pt(66), lineHeight: 1.05, color: "var(--burgundy)" }} />
      </Box>
      <Box box={[81, 440, 900, 80]}>
        <Copy k="subtitle" as="div" style={{ ...sans, fontSize: pt(20), lineHeight: 1.35, color: MUTED }} />
      </Box>
      <Box box={[81, 620, 900, 40]}>
        <Copy k="byline" as="div" style={{ ...sans, fontSize: pt(14), color: "var(--burgundy)" }} />
      </Box>
    </>
  );
}

export function SlideProblemet() {
  const items = useCopyCount("items");
  const [system, user] = buildLlmMessages(PRESETS.alle.state, PRESETS.alle.questions);
  return (
    <>
      <Header />
      <Card box={[81, 175, 640, 495]} bar="var(--red-deep)">
        <Box box={[20, 22, 600, 460]}>
          <Label>prompt til en chat-modell</Label>
          <pre
            style={{
              margin: "8px 0 0",
              fontFamily: MONO,
              fontSize: pt(9.5),
              lineHeight: 1.35,
              whiteSpace: "pre-wrap",
              color: "var(--burgundy)",
            }}
          >
            <span style={{ color: MUTED }}>system: </span>
            {system.content}
            {"\n\n"}
            <span style={{ color: MUTED }}>user: </span>
            {user.content}
          </pre>
          <div style={{ marginTop: 14 }}>
            <Label>modellen skriver tilbake</Label>
            <pre style={{ margin: "6px 0 0", fontFamily: MONO, fontSize: pt(10.5), color: "var(--red-deep)", whiteSpace: "pre-wrap" }}>
              {'```json\n{"department": "technical", "frustration": 1, "is_urgent": 0.95}\n```'}
            </pre>
          </div>
        </Box>
      </Card>
      <Box box={[750, 175, 450, 495]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Copy k="section" as="div" style={{ ...sans, fontSize: pt(13), letterSpacing: 1.2, color: "var(--red)" }} />
          {Array.from({ length: items }, (_, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 6, background: "var(--red)", flexShrink: 0 }} />
              <Body size={15}>
                <Copy k="items" i={i} />
              </Body>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* LLM skriver token for token, Jev svarer i ett pass                   */
/* ------------------------------------------------------------------ */

const LLM_TOKENS = [
  "{", '"', "department", '":', ' "', "technical", '",', ' "', "frustr", "ation", '":', " 1", ",", ' "', "is", "_ur", "gent", '":', " 0", ".", "95", "}",
];
const REASONING_TOKENS = 48;
const TICK_MS = 70;

export function SlideToModeller() {
  const step = useStep();
  const startStep = useRef(step);
  // Montert rett på steg ≥ 1 (miniatyr, PDF, tilbake-navigering): vis sluttbildet.
  const total = REASONING_TOKENS + LLM_TOKENS.length;
  const [tick, setTick] = useState(startStep.current >= 1 ? total : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (step < 1) {
      startStep.current = 0;
      setTick(0);
      return;
    }
    if (startStep.current >= 1 && run === 0) return;
    setTick(0);
    const id = window.setInterval(() => {
      setTick((t) => {
        if (t >= total) {
          window.clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [step, run, total]);

  const reasoning = Math.min(tick, REASONING_TOKENS);
  const written = Math.max(0, tick - REASONING_TOKENS);
  const jevDone = step >= 1 && (tick >= 3 || startStep.current >= 1);
  const ms = tick * TICK_MS;
  const ans = PRESETS.alle.recorded.answers;
  const dept = ans.department.type === "choice" ? ans.department : null;

  return (
    <>
      <Header />
      {/* LLM */}
      <Card box={[81, 175, 545, 440]} bar="var(--red-deep)">
        <Box box={[22, 24, 501, 400]}>
          <Copy k="llm_title" as="div" style={{ ...serif, fontSize: pt(22), color: "var(--burgundy)" }} />
          <Body size={12} color={MUTED} style={{ marginTop: 4 }}>
            <Copy k="llm_lead" />
          </Body>
          <div style={{ marginTop: 18 }}>
            <Label size={10}>skjult resonnering</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6, height: 44 }}>
              {Array.from({ length: REASONING_TOKENS }, (_, i) => (
                <div key={i} style={{ width: 16, height: 10, background: i < reasoning ? "var(--cream-dark)" : "transparent", border: "1px solid var(--cream-dark)" }} />
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <Label size={10}>synlig svar, ett token om gangen</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6, minHeight: 90 }}>
              {LLM_TOKENS.slice(0, written).map((t, i) => (
                <span
                  key={i}
                  style={{ fontFamily: MONO, fontSize: pt(12), padding: "2px 3px", background: i % 2 ? PINK : "#F6D3CE", color: "var(--burgundy)", whiteSpace: "pre" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 10 }}>
            <Counter label="output-tokens" value={reasoning + written} color="var(--red-deep)" />
            <Counter label="tid (illustrasjon)" value={`${(ms / 1000).toFixed(1)} s`} color="var(--red-deep)" />
          </div>
        </Box>
      </Card>
      {/* Jev */}
      <Card box={[655, 175, 545, 440]} bar="var(--teal)">
        <Box box={[22, 24, 501, 400]}>
          <Copy k="jev_title" as="div" style={{ ...serif, fontSize: pt(22), color: "var(--burgundy)" }} />
          <Body size={12} color={MUTED} style={{ marginTop: 4 }}>
            <Copy k="jev_lead" />
          </Body>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 6, opacity: jevDone ? 1 : 0.15, transition: "opacity 200ms" }}>
            <Label size={10}>department · choice</Label>
            {dept &&
              Object.entries(dept.probabilities).map(([k, v]) => (
                <ProbBar key={k} label={k} value={jevDone ? v : 0} highlight={k === dept.choice} />
              ))}
            <div style={{ height: 6 }} />
            <Label size={10}>frustration · score</Label>
            <ProbBar label="1 Frustrated but civil" value={jevDone ? 1 : 0} highlight color="var(--red-deep)" />
            <div style={{ height: 6 }} />
            <Label size={10}>is_urgent · noul</Label>
            <ProbBar label="p(ja)" value={jevDone ? 1 : 0} highlight color="var(--red)" />
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 22 }}>
            <Counter label="output-tokens" value={jevDone ? "65 (gratis)" : "0"} color="var(--teal)" />
            <Counter label="kall" value="1" color="var(--teal)" />
          </div>
        </Box>
      </Card>
      <Box box={[81, 630, 900, 40]} style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button tone="ghost" onClick={() => setRun((r) => r + 1)} disabled={step < 1}>
          Spill av igjen
        </Button>
        <Body size={11} color={MUTED}>
          <Copy k="footnote" />
        </Body>
      </Box>
    </>
  );
}

function Counter({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div>
      <Label size={9.5}>{label}</Label>
      <div style={{ fontFamily: MONO, fontSize: pt(20), fontWeight: 600, color }}>{value}</div>
    </div>
  );
}

export function SlidePrimitiver() {
  const cards = useCopyCount("cards");
  const colors = ["var(--teal)", "var(--red-deep)", "var(--red)"];
  return (
    <>
      <Header />
      {Array.from({ length: cards }, (_, i) => (
        <Card key={i} box={[81 + i * 380, 180, 357, 340]} bar={colors[i]}>
          <Box box={[22, 26, 313, 300]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Copy k="cards" i={i} field="navn" as="div" style={{ ...serif, fontSize: pt(30), color: "var(--burgundy)" }} />
              <Body size={14}>
                <Copy k="cards" i={i} field="sporsmal" />
              </Body>
              <div>
                <Label size={10}>returnerer</Label>
                <Copy k="cards" i={i} field="svar" as="div" style={{ fontFamily: MONO, fontSize: pt(12), color: colors[i], marginTop: 4 }} />
              </div>
              <div>
                <Label size={10}>eksempel</Label>
                <Body size={13} color={MUTED} style={{ marginTop: 4 }}>
                  <Copy k="cards" i={i} field="eksempel" />
                </Body>
              </div>
            </div>
          </Box>
        </Card>
      ))}
      <Box box={[81, 545, 1117, 60]} style={{ background: PINK, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box" }}>
        <Copy k="footer" as="div" style={{ ...sans, fontSize: pt(15), color: "var(--burgundy)" }} />
      </Box>
    </>
  );
}
