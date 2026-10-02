"use client";

import { useState, type ReactNode } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { Box, pt } from "../parts";
import { FLASH_PRICE_IN, FLASH_PRICE_OUT, formatInt, formatUsd, jevCostUsd, JEV_PRICE_IN, llmCostUsd } from "./jev";
import { Body, Card, Header, Label, MONO, MUTED, PINK, sans, serif, interactive } from "./ui";

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
/* Mange spørsmål i ett kall                                            */
/* ------------------------------------------------------------------ */

/*
 * Anslått fra cookbooken «Parallel questions» (GDPR-artikkelen, 13 spørsmål):
 * $0.000497 for ett kall og $0.006090 for 13 kall ved $0.042/Mtok gir
 * ≈ 11 100 tokens dokument og ≈ 57 tokens per spørsmål.
 */
const DOC_TOKENS = 11_100;
const Q_TOKENS = 57;

export function SlideBatching() {
  const [doc, setDoc] = useState(DOC_TOKENS);
  const [n, setN] = useState(13);
  const batched = doc + n * Q_TOKENS;
  const separate = n * (doc + Q_TOKENS);
  const facts = useCopyCount("facts");
  return (
    <>
      <Header />
      <Card box={[81, 175, 690, 495]} bar="var(--red)">
        <Box box={[22, 26, 646, 460]}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }} {...interactive}>
            <Range label="Tokens i dokumentet (state)" value={doc} min={200} max={30_000} step={100} onChange={setDoc} />
            <Range label="Antall spørsmål" value={n} min={1} max={40} onChange={setN} />
            <div style={{ height: 8 }} />
            <Bar label="Ett kall med alle spørsmålene" value={batched} max={separate} color="var(--teal)" right={`${formatInt(batched)} tok · ${formatUsd(jevCostUsd(batched))}`} />
            <Bar label={`${n} kall med ett spørsmål hver`} value={separate} max={separate} color="var(--red-deep)" right={`${formatInt(separate)} tok · ${formatUsd(jevCostUsd(separate))}`} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 10 }}>
              <span style={{ ...serif, fontSize: pt(54), color: "var(--red)" }}>{(separate / batched).toFixed(1)}×</span>
              <Body size={14}>
                <Copy k="ratio_text" />
              </Body>
            </div>
            <Body size={11} color={MUTED}>
              <Copy k="assumption" />
            </Body>
          </div>
        </Box>
      </Card>
      <Card box={[795, 175, 405, 495]} bg="var(--burgundy)">
        <Box box={[24, 26, 357, 450]}>
          <Label color="var(--mint)">
            <Copy k="facts_label" />
          </Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 14 }}>
            {Array.from({ length: facts }, (_, i) => (
              <div key={i}>
                <Copy k="facts" i={i} field="tall" as="div" style={{ fontFamily: MONO, fontSize: pt(20), color: "#fff", fontWeight: 600 }} />
                <Copy k="facts" i={i} field="tekst" as="div" style={{ ...sans, fontSize: pt(12), color: "var(--cream-dark)", marginTop: 2 }} />
              </div>
            ))}
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
  const [priceIn, setPriceIn] = useState(FLASH_PRICE_IN);
  const [priceOut, setPriceOut] = useState(FLASH_PRICE_OUT);

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
            <Bar label="LLM (Flash-nivå)" value={llmMonth} max={max} color="var(--red-deep)" right={formatUsd(llmMonth)} />
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
