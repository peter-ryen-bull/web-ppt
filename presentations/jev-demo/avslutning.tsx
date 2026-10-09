"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, pt } from "../parts";
import { formatInt, formatUsd } from "./jev";
import { taskById } from "./cases";
import { seconds } from "./fart";
import { agreement, clearResults, useLatestComparison, type Comparison } from "./results";
import { Body, Card, Header, interactive, Label, MONO, MUTED, PINK, sans, serif } from "./ui";

export function SlideBegrensninger() {
  const items = useCopyCount("items");
  return (
    <>
      <Header />
      {Array.from({ length: items }, (_, i) => (
        <Card key={i} box={[81 + (i % 2) * 565, 175 + Math.floor(i / 2) * 104, 552, 92]}>
          <Box box={[20, 14, 512, 70]}>
            <Copy k="items" i={i} field="tittel" as="div" style={{ ...sans, fontSize: pt(15), fontWeight: 700, color: "var(--red-deep)" }} />
            <Copy k="items" i={i} field="tekst" as="div" style={{ ...sans, fontSize: pt(13), lineHeight: 1.3, color: "var(--burgundy)", marginTop: 4 }} />
          </Box>
        </Card>
      ))}
    </>
  );
}

const FLOW = ["request", "jev", "kode", "ut"] as const;

export function SlideArbeidsdeling() {
  const roller = useCopyCount("roller");
  const colors = ["var(--teal)", "var(--burgundy)", "var(--red-deep)"];
  return (
    <>
      <Header />
      {/* Flyt */}
      <Box box={[81, 180, 1117, 90]} style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {FLOW.map((k, i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, height: 74, background: i === 1 ? "var(--teal)" : i === 2 ? "var(--burgundy)" : PINK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 16px" }}>
              <Copy k={`flow_${k}`} as="div" style={{ ...sans, fontSize: pt(14), fontWeight: 700, color: i === 1 || i === 2 ? "#fff" : "var(--burgundy)" }} />
              <Copy k={`flow_${k}_sub`} as="div" style={{ fontFamily: MONO, fontSize: pt(10), color: i === 1 ? "var(--mint)" : i === 2 ? "var(--cream-dark)" : MUTED, marginTop: 3 }} />
            </div>
            {i < FLOW.length - 1 && <div style={{ ...sans, fontSize: pt(22), color: "var(--burgundy)", padding: "0 10px" }}>→</div>}
          </div>
        ))}
      </Box>
      {/* Roller */}
      {Array.from({ length: roller }, (_, i) => (
        <Card key={i} box={[81 + i * 380, 310, 357, 250]} bar={colors[i]}>
          <Box box={[22, 26, 313, 210]}>
            <Copy k="roller" i={i} field="navn" as="div" style={{ ...serif, fontSize: pt(26), color: colors[i] }} />
            <Label size={10}>
              <span style={{ display: "block", marginTop: 10 }}>
                <Copy k="roller" i={i} field="label" />
              </span>
            </Label>
            <Body size={13.5} style={{ marginTop: 8 }}>
              <Copy k="roller" i={i} field="tekst" />
            </Body>
          </Box>
        </Card>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Konklusjon: tallene er de siste live-målingene i rommet              */
/* ------------------------------------------------------------------ */

function ratio(v: number): string {
  return `${v.toLocaleString("nb-NO", { maximumFractionDigits: v >= 10 ? 0 : 1 })}×`;
}

function clock(at: number): string {
  return new Date(at).toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
}

type Measured = { big: string; inverse: boolean; detail: string };

function measure(c: Comparison | undefined): (Measured | null)[] {
  if (!c) return [null, null, null];
  const { same, compared } = agreement(c);
  const quality: Measured | null = compared
    ? { big: `${Math.round((same / compared) * 100)} %`, inverse: false, detail: `${formatInt(same)} av ${formatInt(compared)} like svar` }
    : null;
  const t = c.openai.wallMs / c.jev.wallMs;
  const speed: Measured | null =
    c.jev.wallMs > 0 && c.openai.wallMs > 0
      ? { big: ratio(t >= 1 ? t : 1 / t), inverse: t < 1, detail: `Jev ${seconds(c.jev.wallMs)} · OpenAI ${seconds(c.openai.wallMs)}` }
      : null;
  const jc = c.jev.costPerItem;
  const oc = c.openai.costPerItem;
  const k = jc && oc ? oc / jc : null;
  const cost: Measured | null =
    k && jc && oc ? { big: ratio(k >= 1 ? k : 1 / k), inverse: k < 1, detail: `${formatUsd(jc)} mot ${formatUsd(oc)} per element` } : null;
  return [quality, speed, cost];
}

const CARD_COLORS = ["var(--burgundy)", "var(--teal)", "var(--red-deep)"];

export function SlideKonklusjon() {
  const c = useLatestComparison();
  const values = measure(c);
  const items = useCopyCount("items");
  return (
    <>
      <Header />
      {values.map((v, i) => (
        <Card key={i} box={[81 + i * 380, 180, 357, 250]} bar={CARD_COLORS[i]}>
          <Box box={[22, 24, 313, 212]}>
            <Label size={10}>
              <Copy k="cards" i={i} field="label" />
            </Label>
            <Copy k="cards" i={i} field="claim" as="div" style={{ ...serif, fontSize: pt(22), color: CARD_COLORS[i], marginTop: 6 }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: pt(46), fontWeight: 700, color: v ? "var(--burgundy)" : "var(--cream-dark)", lineHeight: 1 }}>{v ? v.big : "–"}</span>
              {v && <Copy k="cards" i={i} field={v.inverse ? "unit_inverse" : "unit"} as="span" style={{ ...sans, fontSize: pt(15), color: MUTED }} />}
            </div>
            <div style={{ marginTop: 12, fontFamily: MONO, fontSize: pt(10.5), color: MUTED, minHeight: 18 }}>
              {v ? v.detail : <Copy k="placeholder" as="span" style={{ ...sans }} />}
            </div>
            <Copy k="cards" i={i} field="note" as="div" style={{ ...sans, fontSize: pt(11), color: MUTED, marginTop: 4 }} />
          </Box>
        </Card>
      ))}

      <Box box={[81, 452, 1117, 160]}>
        <Label size={10.5}>
          <Copy k="items_label" />
        </Label>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${items}, 1fr)`, gap: 24, marginTop: 10 }}>
          {Array.from({ length: items }, (_, i) => (
            <div key={i} style={{ borderLeft: "3px solid var(--red)", paddingLeft: 14 }}>
              <Copy k="items" i={i} field="tittel" as="div" style={{ ...serif, fontSize: pt(19), color: "var(--burgundy)" }} />
              <Copy k="items" i={i} field="tekst" as="div" style={{ ...sans, fontSize: pt(12.5), lineHeight: 1.35, color: "var(--burgundy)", marginTop: 4 }} />
              {i === 1 && c && (
                <div style={{ fontFamily: MONO, fontSize: pt(10.5), color: "var(--teal)", marginTop: 6 }}>
                  Jev: median {seconds(c.jev.medianMs)} per kall · OpenAI: {seconds(c.openai.medianMs)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Box>

      <Box box={[81, 630, 1117, 40]}>
        <div {...interactive} style={{ display: "flex", alignItems: "center", gap: 12, ...sans, fontSize: pt(10.5), color: MUTED }}>
          {c ? (
            <>
              <span>
                <Copy k="source_prefix" /> kl. {clock(c.at)} på «{c.source === "fart" ? "Hundrevis på et sekund" : "Jev mot OpenAI"}» · {taskById(c.taskId).name} · {formatInt(c.n)} elementer ·{" "}
                {formatInt(c.concurrency)} samtidige · {c.openai.model} effort {c.openai.effort}
                {c.jev.errors + c.openai.errors > 0 && ` · ${formatInt(c.jev.errors + c.openai.errors)} feil`}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  clearResults();
                }}
                style={{ ...sans, fontSize: pt(10), border: "none", background: "none", color: MUTED, textDecoration: "underline", cursor: "pointer", padding: 0 }}
              >
                nullstill
              </button>
            </>
          ) : (
            <Copy k="source_empty" />
          )}
          <Copy k="kilder" as="span" style={{ marginLeft: "auto", fontFamily: MONO, fontSize: pt(9.5) }} />
        </div>
      </Box>
    </>
  );
}
