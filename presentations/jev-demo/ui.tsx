"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Copy, useHasCopy } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";
import type { BatchLine, DemoStatus, JevRunResult, LlmRunResult, PromptMode, Provider, Questions } from "./jev";

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
    .catch(() => ({ jev: false, llm: { configured: false, model: null } }));
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

async function post<T>(payload: unknown): Promise<T> {
  try {
    const res = await fetch("/api/jev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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

/**
 * Sender alle elementene til /api/jev, som kaller Jev parallelt på serveren.
 * Nettleseren åpner bare noen få samtidige forbindelser per vert, så
 * parallelliteten må ligge der. `onLines` får hver bit av strømmen.
 */
export async function streamBatch(
  items: string[],
  questions: Questions,
  concurrency: number,
  onLines: (lines: BatchLine[]) => void,
  signal: AbortSignal,
  provider: Provider = "jev",
  promptMode?: PromptMode
): Promise<string | null> {
  try {
    const res = await fetch("/api/jev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "batch", provider, items, questions, concurrency, promptMode }),
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

/** Liten merkelapp: «LIVE» eller «INNSPILT». */
export function ModeBadge({ live, offline = "INNSPILT FRA DOCS" }: { live: boolean; offline?: string }) {
  return (
    <span
      style={{
        ...sans,
        fontSize: pt(10),
        fontWeight: 700,
        letterSpacing: 1,
        padding: "3px 8px",
        background: live ? "var(--teal)" : "var(--cream-dark)",
        color: live ? "var(--mint)" : "var(--burgundy)",
      }}
    >
      {live ? "LIVE" : offline}
    </span>
  );
}
