"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import { CLASSIFY_TASKS, labelsOf, splitRecord, type ClassifyTask } from "./cases";
import { Body, Card, Header, Label, MONO, MUTED, PINK, sans, serif } from "./ui";

const CASE_COLORS = ["var(--red-deep)", "var(--teal)", "var(--burgundy)"];

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
      <Box box={[81, 420, 900, 80]}>
        <Copy k="subtitle" as="div" style={{ ...sans, fontSize: pt(20), lineHeight: 1.35, color: MUTED }} />
      </Box>
      <Box box={[81, 520, 1117, 80]}>
        <Copy k="cases_label" as="div" style={{ ...sans, fontSize: pt(10.5), fontWeight: 700, letterSpacing: 1.2, color: MUTED }} />
        <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
          {CLASSIFY_TASKS.map((t, i) => (
            <div key={t.id} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#fff", padding: "10px 14px", borderLeft: `4px solid ${CASE_COLORS[i]}` }}>
              <span style={{ ...serif, fontSize: pt(22), color: CASE_COLORS[i], lineHeight: 1 }}>{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <Copy k="cases" i={i} field="navn" as="div" style={{ ...sans, fontSize: pt(13), fontWeight: 700, color: "var(--burgundy)" }} />
                <div style={{ fontFamily: MONO, fontSize: pt(10), color: MUTED, whiteSpace: "nowrap" }}>
                  → <Copy k="cases" i={i} field="til" style={{ display: "inline" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
      <Box box={[81, 640, 900, 40]}>
        <Copy k="byline" as="div" style={{ ...sans, fontSize: pt(14), color: "var(--burgundy)" }} />
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* De tre casene, med samme eksempler som live-slidene                  */
/* ------------------------------------------------------------------ */

function ExampleRow({ task, item }: { task: ClassifyTask; item: string }) {
  const rec = splitRecord(item);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 88px", gap: 8, alignItems: "center", padding: "5px 0", borderBottom: "1px solid var(--cream)" }}>
      {rec ? (
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: MONO, fontSize: pt(9.5), color: "var(--burgundy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rec[0][1]}</div>
          <div style={{ ...sans, fontSize: pt(9), color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {rec
              .slice(1)
              .map(([, v]) => v)
              .join(" · ")}
          </div>
        </div>
      ) : (
        <div
          style={{
            ...sans,
            fontSize: pt(task.id === "kjoretoy" ? 12 : 10),
            lineHeight: 1.25,
            color: "var(--burgundy)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item}
        </div>
      )}
      <div style={{ alignSelf: "stretch", background: "rgba(120, 232, 219, 0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: pt(11), color: "var(--teal)" }}>?</div>
    </div>
  );
}

export function SlideCasene() {
  return (
    <>
      <Header />
      {CLASSIFY_TASKS.map((t, i) => (
        <Card key={t.id} box={[81 + i * 380, 175, 357, 430]} bar={CASE_COLORS[i]}>
          <Box box={[20, 22, 317, 395]}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ ...serif, fontSize: pt(28), color: CASE_COLORS[i], lineHeight: 1 }}>{i + 1}</span>
              <Copy k="cards" i={i} field="navn" as="div" style={{ ...serif, fontSize: pt(21), color: "var(--burgundy)" }} />
            </div>
            <Copy k="cards" i={i} field="inn" as="div" style={{ ...sans, fontSize: pt(11), color: MUTED, marginTop: 8 }} />
            <Copy k="cards" i={i} field="sporsmal" as="div" style={{ ...sans, fontSize: pt(13), lineHeight: 1.3, fontWeight: 700, color: "var(--burgundy)", marginTop: 4, minHeight: 36 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {labelsOf(t).map((l) => (
                <span key={l} style={{ fontFamily: MONO, fontSize: pt(9.5), fontWeight: 700, color: "#fff", background: t.colors[l], padding: "2px 7px" }}>
                  {l}
                </span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px", gap: 8, marginTop: 14, paddingBottom: 4, borderBottom: "1.5px solid var(--burgundy)", ...sans, fontSize: pt(9), fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: MUTED }}>
              <span>{t.itemLabel}</span>
              <span style={{ color: "var(--teal)", textAlign: "center" }}>{t.column}</span>
            </div>
            {t.examples.map((item) => (
              <ExampleRow key={item} task={t} item={item} />
            ))}
          </Box>
        </Card>
      ))}
      <Box box={[81, 622, 1117, 50]} style={{ background: PINK, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box" }}>
        <Copy k="footer" as="div" style={{ ...sans, fontSize: pt(14), color: "var(--burgundy)" }} />
      </Box>
    </>
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
