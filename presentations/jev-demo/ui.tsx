"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Copy, useHasCopy } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import { OPENAI_MODELS, type BatchLine, type DemoStatus, type JevRunResult, type LlmRunResult, type PromptMode, type Provider, type Questions } from "./jev";
import { getOpenaiChoice, setOpenaiChoice, useOpenaiChoice } from "./openai-choice";

export const MUTED = "#5A4A50";
export const PINK = "#FBE3E0";
export const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
export const sans: CSSProperties = { fontFamily: "var(--font-sans)" };
export const serif: CSSProperties = { fontFamily: "var(--font-serif)" };

/** Kicker, tittel og valgfri ingress fra copy.yaml. */
export function Header() {
  const hasLead = useHasCopy("lead");
  return (
    <>
      <MilesLogo />
      <Box box={[81, 44, 900, 28]}>
        <Copy
          k="kicker"
          as="div"
          style={{ ...sans, fontSize: pt(13), letterSpacing: 1.2, color: "var(--red)" }}
        />
      </Box>
      <Box box={[81, 70, 1060, 56]}>
        <Copy
          k="title"
          as="div"
          style={{ ...serif, fontSize: pt(30), lineHeight: 1.15, color: "var(--burgundy)" }}
        />
      </Box>
      {hasLead && (
        <Box box={[81, 128, 1100, 30]}>
          <Copy
            k="lead"
            as="div"
            style={{ ...sans, fontSize: pt(14), lineHeight: 1.35, color: MUTED }}
          />
        </Box>
      )}
    </>
  );
}

export function Card({
  box,
  bar,
  bg = "#fff",
  style,
  children,
}: {
  box: [number, number, number, number];
  bar?: string;
  bg?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <Box box={box} style={{ background: bg, overflow: "hidden", ...style }}>
      {bar && (
        <div
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 6, background: bar }}
        />
      )}
      {children}
    </Box>
  );
}

export function Label({
  children,
  size = 12,
  color = MUTED,
}: {
  children?: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        ...sans,
        fontSize: pt(size),
        letterSpacing: 1,
        textTransform: "uppercase",
        fontWeight: 700,
        color,
      }}
    >
      {children}
    </div>
  );
}

export function Body({
  children,
  size = 14,
  color = "var(--burgundy)",
  style,
}: {
  children?: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...sans, fontSize: pt(size), lineHeight: 1.35, color, ...style }}>{children}</div>
  );
}

export function Button({
  onClick,
  disabled,
  tone = "red",
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  tone?: "red" | "teal" | "ghost";
  children: ReactNode;
}) {
  const bg = tone === "red" ? "var(--red)" : tone === "teal" ? "var(--teal)" : "transparent";
  const color = tone === "ghost" ? "var(--burgundy)" : "#fff";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        // Uten blur stjeler knappen piltastene fra slide-navigasjonen.
        e.currentTarget.blur();
        e.stopPropagation();
        onClick();
      }}
      style={{
        ...sans,
        fontSize: pt(13),
        fontWeight: 700,
        padding: "7px 16px",
        border: tone === "ghost" ? "1.5px solid var(--burgundy)" : "none",
        background: bg,
        color,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function stop(e: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>) {
  e.stopPropagation();
}

/**
 * Spres på beholdere med felt og knapper. Øvingsvisningen blar ved klikk på
 * lerretet, og publikumsvisningen blar ved mellomrom også i tekstfelt.
 */
export const interactive = { onKeyDown: stop, onClick: stop };

export const fieldStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  resize: "none",
  border: "1.5px solid var(--divider)",
  background: "#fff",
  padding: "8px 10px",
  color: "var(--burgundy)",
  outline: "none",
};

/** Horisontal sannsynlighetsstolpe. */
export function ProbBar({
  label,
  value,
  highlight,
  color = "var(--teal)",
}: {
  label: ReactNode;
  value: number;
  highlight?: boolean;
  color?: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 52px", alignItems: "center", gap: 10 }}>
      <div
        style={{
          ...sans,
          fontSize: pt(11),
          lineHeight: 1.25,
          color: "var(--burgundy)",
          fontWeight: highlight ? 700 : 400,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div style={{ height: 11, background: "var(--cream)" }}>
        <div
          style={{
            width: `${Math.max(0, Math.min(1, value)) * 100}%`,
            height: "100%",
            background: highlight ? color : "var(--cream-dark)",
            transition: "width 500ms ease",
          }}
        />
      </div>
      <div style={{ fontFamily: MONO, fontSize: pt(11), color: "var(--burgundy)", textAlign: "right" }}>
        {value.toFixed(2)}
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  color = "var(--burgundy)",
}: {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, whiteSpace: "nowrap" }}>
      <Label size={9.5}>{label}</Label>
      <div style={{ fontFamily: MONO, fontSize: pt(15), fontWeight: 600, color, whiteSpace: "nowrap" }}>{value}</div>
      {sub && <div style={{ ...sans, fontSize: pt(10.5), color: MUTED }}>{sub}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Klient mot /api/jev                                                  */
/* ------------------------------------------------------------------ */

let statusPromise: Promise<DemoStatus> | null = null;

function fetchStatus(): Promise<DemoStatus> {
  statusPromise ??= fetch("/api/jev")
    .then((r) => (r.ok ? (r.json() as Promise<DemoStatus>) : Promise.reject()))
    .catch(() => ({ jev: false }));
  return statusPromise;
}

/** Om live-kall er satt opp på serveren. Null mens vi venter på svar. */
export function useDemoStatus(): DemoStatus | null {
  const [status, setStatus] = useState<DemoStatus | null>(null);
  useEffect(() => {
    let alive = true;
    fetchStatus().then((s) => alive && setStatus(s));
    return () => {
      alive = false;
    };
  }, []);
  return status;
}

/** Alle kall til /api/jev tar med presentatørens OpenAI-valg. Jev-kall ignorerer det. */
export function apiBody(payload: Record<string, unknown>): string {
  return JSON.stringify({ ...payload, openai: getOpenaiChoice() });
}

async function post<T>(payload: Record<string, unknown>): Promise<T> {
  try {
    const res = await fetch("/api/jev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: apiBody(payload),
    });
    return (await res.json()) as T;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as T;
  }
}

export function runJev(state: string, questions: Questions) {
  return post<JevRunResult>({ kind: "jev", state, questions });
}

export function runLlm(state: string, questions: Questions) {
  return post<LlmRunResult>({ kind: "llm", state, questions });
}

async function streamLines(payload: Record<string, unknown>, onLines: (lines: BatchLine[]) => void, signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch("/api/jev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: apiBody(payload),
      signal,
    });
    if (!res.headers.get("content-type")?.includes("ndjson") || !res.body) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      return body?.error ?? `HTTP ${res.status}`;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() ?? "";
      const lines = parts.filter(Boolean).map((p) => JSON.parse(p) as BatchLine);
      if (lines.length) onLines(lines);
    }
    return null;
  } catch (e) {
    if (signal.aborted) return null;
    return e instanceof Error ? e.message : String(e);
  }
}

/**
 * Sender alle elementene til /api/jev, som kaller Jev parallelt på serveren.
 * Nettleseren åpner bare noen få samtidige forbindelser per vert, så
 * parallelliteten må ligge der. `onLines` får hver bit av strømmen.
 */
export function streamBatch(
  items: string[],
  questions: Questions,
  concurrency: number,
  onLines: (lines: BatchLine[]) => void,
  signal: AbortSignal,
  provider: Provider = "jev",
  promptMode?: PromptMode
): Promise<string | null> {
  return streamLines({ kind: "batch", provider, items, questions, concurrency, promptMode }, onLines, signal);
}

/** Samme tekst, ett Jev-kall per spørsmål, alle samtidig. Linjenes `i` følger rekkefølgen i `questions`. */
export function streamSplit(state: string, questions: Questions, onLines: (lines: BatchLine[]) => void, signal: AbortSignal) {
  return streamLines({ kind: "split", state, questions }, onLines, signal);
}

/** Merkelapp på svar som kom fra et live kall. */
export function LiveBadge() {
  return (
    <span
      style={{
        ...sans,
        fontSize: pt(10),
        fontWeight: 700,
        letterSpacing: 1,
        padding: "3px 8px",
        background: "var(--teal)",
        color: "var(--mint)",
      }}
    >
      LIVE
    </span>
  );
}

/**
 * Lerretet er skalert med transform, så `position: fixed` inni det regnes fra
 * lerretet og klippes ikke av kort med overflow: hidden. Åpner mot midten.
 */
function popoverPosition(button: HTMLElement): CSSProperties {
  let canvas: HTMLElement | null = button.parentElement;
  while (canvas && getComputedStyle(canvas).transform === "none") canvas = canvas.parentElement;
  const b = button.getBoundingClientRect();
  if (!canvas) return { top: b.bottom + 6, left: b.left };
  const c = canvas.getBoundingClientRect();
  const scale = c.width / canvas.offsetWidth || 1;
  const x = (b.left - c.left) / scale;
  const y = (b.top - c.top) / scale;
  const vertical = y > canvas.offsetHeight / 2 ? { bottom: (c.bottom - b.top) / scale + 6 } : { top: (b.bottom - c.top) / scale + 6 };
  const horizontal = x > canvas.offsetWidth / 2 ? { right: (c.right - b.right) / scale } : { left: x };
  return { ...vertical, ...horizontal };
}

/**
 * Diskret velger for OpenAI-modell og effort. Ser ut som en linje med
 * modellnavnet; klikk åpner listen. Valget deles av alle slidene.
 */
export function OpenaiPicker({ disabled }: { disabled?: boolean }) {
  const choice = useOpenaiChoice();
  const [open, setOpen] = useState<CSSProperties | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const model = OPENAI_MODELS.find((m) => m.id === choice.model) ?? OPENAI_MODELS[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const option = (active: boolean): CSSProperties => ({
    ...sans,
    border: "none",
    cursor: "pointer",
    background: active ? "var(--burgundy)" : "transparent",
    color: active ? "#fff" : "var(--burgundy)",
  });

  return (
    <span ref={ref} {...interactive} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        disabled={disabled}
        title="Velg OpenAI-modell og effort"
        onClick={(e) => {
          e.currentTarget.blur();
          setOpen(open ? null : popoverPosition(e.currentTarget));
        }}
        style={{
          fontFamily: MONO,
          fontSize: pt(10.5),
          color: MUTED,
          background: "none",
          border: "none",
          borderBottom: "1px dotted currentColor",
          padding: 0,
          cursor: disabled ? "default" : "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {choice.model} · effort {choice.effort} ▾
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            zIndex: 50,
            ...open,
            width: 330,
            background: "#fff",
            border: "1.5px solid var(--burgundy)",
            boxShadow: "0 8px 24px rgba(69, 13, 32, 0.18)",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Label size={9}>modell · listepris inn / ut per Mtok</Label>
          {OPENAI_MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setOpenaiChoice({ model: m.id })}
              style={{ ...option(m.id === choice.model), display: "flex", justifyContent: "space-between", padding: "4px 8px", fontSize: pt(11) }}
            >
              <span>
                {m.name} <span style={{ fontFamily: MONO, fontSize: pt(9.5), opacity: 0.7 }}>{m.id}</span>
              </span>
              <span style={{ fontFamily: MONO, fontSize: pt(9.5) }}>
                ${m.price.in} / ${m.price.out}
              </span>
            </button>
          ))}
          <div style={{ marginTop: 8 }}>
            <Label size={9}>effort</Label>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {model.efforts.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setOpenaiChoice({ effort: e })}
                style={{ ...option(e === choice.effort), fontFamily: MONO, fontSize: pt(10), padding: "3px 8px", outline: "1px solid var(--divider)" }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}
