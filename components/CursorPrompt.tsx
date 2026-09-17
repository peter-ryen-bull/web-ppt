"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import type { PresentationDef } from "@/presentations";
import styles from "./CursorPrompt.module.css";

/*
 * Prompt Cursor direkte fra presentasjonen (kun dev-modus). Prompten sendes
 * til /api/cursor-prompt sammen med metadata om hvor den kom fra (slide,
 * kapittel, valgte slides), og kjøres enten headless via Cursor CLI – med
 * hendelsene strømmet tilbake hit – eller åpnes i Cursor-appen via deeplink.
 */

export const CURSOR_PROMPT_ENABLED = process.env.NODE_ENV === "development";

export type CursorPromptView = "deck" | "presenter";

export type CursorPromptContext = {
  view: CursorPromptView;
  /** Sendt fra slideoversikten – da er slideIds konteksten (kan være tom). */
  overview: boolean;
  current: { index: number; step: number } | null;
  slideIds: string[];
};

export type CursorPromptTransport = "cli" | "deeplink";

type LogKind = "user" | "assistant" | "tool" | "info" | "done" | "error";
type LogItem = { id: number; kind: LogKind; text: string };

export type CursorPromptSession = ReturnType<typeof useCursorPrompt>;

function componentName(c: ComponentType): string | undefined {
  const named = c as { displayName?: string; name?: string };
  return named.displayName || named.name || undefined;
}

const TOOL_VERBS: Record<string, string> = {
  read: "Leser",
  write: "Skriver",
  edit: "Endrer",
  strReplace: "Endrer",
  search_replace: "Endrer",
  delete: "Sletter",
  shell: "Kjører",
  grep: "Søker",
  glob: "Finner",
  ls: "Lister",
  semanticSearch: "Søker",
  codebaseSearch: "Søker",
  todo: "Planlegger",
};

function describeTool(toolCall: unknown): string {
  if (!toolCall || typeof toolCall !== "object") return "Verktøy";
  const entries = Object.entries(toolCall as Record<string, unknown>);
  if (!entries.length) return "Verktøy";
  const [kind, payload] = entries[0];
  const p = (payload ?? {}) as { name?: string; args?: Record<string, unknown> };
  if (kind === "function") return `Verktøy ${p.name ?? ""}`.trim();
  const args = p.args ?? {};
  const target =
    args.path ??
    args.relativeWorkspacePath ??
    args.targetFile ??
    args.file ??
    args.command ??
    args.pattern ??
    args.query ??
    "";
  const base = kind.replace(/ToolCall$/, "");
  const verb = TOOL_VERBS[base] ?? base;
  const t = String(target);
  return t ? `${verb} ${t.length > 120 ? `${t.slice(0, 117)}…` : t}` : verb;
}

export function useCursorPrompt(presentation: PresentationDef) {
  const [cliAvailable, setCliAvailable] = useState<boolean | null>(null);
  const [cliAuthenticated, setCliAuthenticated] = useState(false);
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogItem[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const nextIdRef = useRef(1);

  const refreshCli = useCallback(async () => {
    const res = await fetch("/api/cursor-prompt");
    const data = (res.ok ? await res.json() : { cli: false }) as {
      cli?: boolean;
      authenticated?: boolean;
    };
    setCliAvailable(data.cli === true);
    setCliAuthenticated(data.authenticated === true);
  }, []);

  useEffect(() => {
    if (!CURSOR_PROMPT_ENABLED) return;
    let cancelled = false;
    refreshCli().catch(() => {
      if (!cancelled) {
        setCliAvailable(false);
        setCliAuthenticated(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [refreshCli]);

  const push = useCallback((kind: LogKind, text: string) => {
    setLog((prev) => [...prev, { id: nextIdRef.current++, kind, text }]);
  }, []);

  const appendAssistant = useCallback((delta: string) => {
    setLog((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.kind === "assistant") {
        return [...prev.slice(0, -1), { ...last, text: last.text + delta }];
      }
      return [...prev, { id: nextIdRef.current++, kind: "assistant", text: delta }];
    });
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setLog([]);
    setChatId(null);
    setLastPrompt(null);
  }, []);

  const login = useCallback(async () => {
    if (running) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setRunning(true);
    push("info", "Åpner innlogging i nettleseren…");
    try {
      const res = await fetch("/api/cursor-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ transport: "login" }),
      });
      const data = (await res.json()) as { error?: string; authenticated?: boolean };
      if (!res.ok) {
        push("error", data.error ?? `Feil ${res.status}`);
        return;
      }
      setCliAuthenticated(true);
      push("done", "Innlogget på Cursor CLI.");
      await refreshCli();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        push("info", "Innlogging stoppet.");
      } else {
        push("error", err instanceof Error ? err.message : "Ukjent feil.");
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setRunning(false);
    }
  }, [running, push, refreshCli]);

  const send = useCallback(
    async (ctx: CursorPromptContext, transport: CursorPromptTransport) => {
      const prompt = text.trim();
      if (!prompt || running) return;

      const slides = presentation.slides;
      const contextIds = new Set<string>(ctx.slideIds);
      if (ctx.current && slides[ctx.current.index]) {
        contextIds.add(slides[ctx.current.index].id);
      }
      const components: Record<string, string> = {};
      for (const id of contextIds) {
        const s = slides.find((x) => x.id === id);
        const name = s && componentName(s.component);
        if (name) components[id] = name;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      setRunning(true);
      push("user", prompt);
      setText("");

      // Uten --stream-partial-output kommer bare hele meldinger; da viser vi dem.
      let sawDelta = false;

      const handleEvent = (ev: Record<string, unknown>) => {
        switch (ev.type) {
          case "meta": {
            if (typeof ev.prompt === "string") setLastPrompt(ev.prompt);
            break;
          }
          case "system": {
            if (ev.subtype === "init") {
              if (typeof ev.session_id === "string") setChatId(ev.session_id);
              if (typeof ev.model === "string") push("info", `Modell: ${ev.model}`);
            }
            break;
          }
          case "assistant": {
            const msg = ev.message as
              | { content?: { type?: string; text?: string }[] }
              | undefined;
            const textPart =
              msg?.content
                ?.filter((c) => c.type === "text" && typeof c.text === "string")
                .map((c) => c.text)
                .join("") ?? "";
            if (!textPart) break;
            const isDelta = "timestamp_ms" in ev && !("model_call_id" in ev);
            if (isDelta) {
              sawDelta = true;
              appendAssistant(textPart);
            } else if (!sawDelta) {
              push("assistant", textPart);
            }
            break;
          }
          case "tool_call": {
            if (ev.subtype === "started") push("tool", describeTool(ev.tool_call));
            break;
          }
          case "result": {
            const secs =
              typeof ev.duration_ms === "number"
                ? ` (${Math.max(1, Math.round(ev.duration_ms / 1000))} s)`
                : "";
            if (ev.is_error) {
              push("error", `Cursor feilet${secs}: ${String(ev.result ?? "")}`);
            } else {
              push("done", `Ferdig${secs}`);
            }
            break;
          }
          case "exit": {
            const code = ev.code;
            const stderr = typeof ev.stderr === "string" ? ev.stderr.trim() : "";
            if (typeof ev.error === "string") {
              push("error", `Kunne ikke starte Cursor CLI: ${ev.error}`);
            } else if (typeof code === "number" && code !== 0) {
              push(
                "error",
                `Cursor CLI avsluttet med kode ${code}${stderr ? `:\n${stderr.slice(-800)}` : ""}`
              );
            } else if (code === null && ev.signal) {
              push("info", "Stoppet.");
            }
            break;
          }
          default:
            break;
        }
      };

      try {
        const res = await fetch("/api/cursor-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            presentationId: presentation.id,
            prompt,
            view: ctx.view,
            overview: ctx.overview,
            current: ctx.current,
            slideIds: ctx.slideIds,
            components,
            url: window.location.href,
            transport,
            chatId: transport === "cli" ? chatId : null,
          }),
        });

        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const data = (await res.json()) as {
            error?: string;
            code?: string;
            transport?: string;
            url?: string;
            opened?: boolean;
            prompt?: string;
          };
          if (!res.ok) {
            if (data.code === "cli-missing") {
              setCliAvailable(false);
              setCliAuthenticated(false);
            }
            if (data.code === "cli-unauthenticated") setCliAuthenticated(false);
            push("error", data.error ?? `Feil ${res.status}`);
            return;
          }
          if (data.transport === "deeplink" && data.url) {
            if (data.prompt) setLastPrompt(data.prompt);
            if (!data.opened) window.location.href = data.url;
            push(
              "done",
              "Åpnet i Cursor med prompt og kontekst – trykk Enter der for å kjøre."
            );
            return;
          }
          push("error", "Uventet svar fra serveren.");
          return;
        }
        if (!res.ok || !res.body) {
          push("error", (await res.text()) || `Feil ${res.status}`);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffered = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffered += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffered.indexOf("\n")) >= 0) {
            const line = buffered.slice(0, nl).trim();
            buffered = buffered.slice(nl + 1);
            if (!line) continue;
            try {
              handleEvent(JSON.parse(line) as Record<string, unknown>);
            } catch {
              push("info", line);
            }
          }
        }
        if (buffered.trim()) {
          try {
            handleEvent(JSON.parse(buffered) as Record<string, unknown>);
          } catch {
            /* ufullstendig siste linje – ignorer */
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          push("info", "Stoppet.");
        } else {
          push("error", err instanceof Error ? err.message : "Ukjent feil.");
        }
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setRunning(false);
      }
    },
    [text, running, presentation, chatId, push, appendAssistant]
  );

  return {
    cliAvailable,
    cliAuthenticated,
    text,
    setText,
    running,
    log,
    chatId,
    lastPrompt,
    send,
    stop,
    reset,
    login,
  };
}

export function CursorPromptPanel({
  session,
  context,
  summary,
  variant,
  onClose,
  autoFocus = true,
}: {
  session: CursorPromptSession;
  context: CursorPromptContext;
  /** Kort beskrivelse av konteksten, f.eks. «Slide 12 · Klokka er 03:14». */
  summary: string;
  variant: "dock" | "inline";
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const { cliAvailable, cliAuthenticated, text, setText, running, log, chatId, lastPrompt } =
    session;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const defaultTransport: CursorPromptTransport = cliAuthenticated ? "cli" : "deeplink";
  const canSend = text.trim().length > 0 && !running;

  return (
    <div
      className={`${styles.panel} ${variant === "dock" ? styles.dock : styles.inline}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.header}>
        <span className={styles.title}>Cursor</span>
        <span className={styles.summary} title={summary}>
          {summary}
        </span>
        <span className={styles.headerActions}>
          {chatId && (
            <button
              className={styles.miniBtn}
              onClick={session.reset}
              disabled={running}
              title="Start en ny samtale (glem konteksten fra forrige prompt)"
            >
              Ny samtale
            </button>
          )}
          {lastPrompt && (
            <button
              className={styles.miniBtn}
              onClick={() => setShowPrompt((v) => !v)}
              title="Vis prompten slik den ble sendt, med metadata"
            >
              {showPrompt ? "Skjul prompt" : "Vis prompt"}
            </button>
          )}
          {onClose && (
            <button
              className={styles.miniBtn}
              onClick={onClose}
              title="Lukk (⌘I)"
              aria-label="Lukk"
            >
              ×
            </button>
          )}
        </span>
      </div>

      {showPrompt && lastPrompt && (
        <pre className={styles.promptPreview}>{lastPrompt}</pre>
      )}

      {log.length > 0 && (
        <div className={styles.log} ref={logRef}>
          {log.map((item) => (
            <div key={item.id} className={`${styles.logItem} ${styles[`log_${item.kind}`]}`}>
              {item.kind === "user" && <span className={styles.logPrefix}>›</span>}
              {item.kind === "tool" && <span className={styles.logPrefix}>·</span>}
              {item.kind === "done" && <span className={styles.logPrefix}>✓</span>}
              {item.kind === "error" && <span className={styles.logPrefix}>!</span>}
              <span className={styles.logText}>{item.text}</span>
            </div>
          ))}
          {running && <div className={styles.working}>Cursor jobber…</div>}
        </div>
      )}

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={text}
        rows={variant === "dock" ? 3 : 2}
        placeholder={
          context.overview
            ? context.slideIds.length
              ? "Hva skal gjøres med de valgte slidene?"
              : "Hva skal gjøres med presentasjonen?"
            : "Hva vil du endre på denne sliden?"
        }
        spellCheck
        disabled={running}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            if (canSend) void session.send(context, defaultTransport);
          } else if (e.key === "Escape") {
            e.currentTarget.blur();
          }
        }}
      />

      <div className={styles.footer}>
        <span className={styles.transportHint}>
          {cliAvailable === null
            ? "Sjekker Cursor CLI…"
            : cliAuthenticated
              ? chatId
                ? "Cursor CLI · fortsetter samtalen"
                : "Cursor CLI · kjører i bakgrunnen, sliden oppdateres live"
              : cliAvailable
                ? "Cursor CLI er installert – logg inn for å kjøre prompten her"
                : "Cursor CLI ikke funnet – prompten åpnes i Cursor-appen"}
        </span>
        <span className={styles.footerActions}>
          {running ? (
            <button className={styles.btn} onClick={session.stop}>
              Stopp
            </button>
          ) : (
            <>
              {cliAvailable && !cliAuthenticated && (
                <button
                  className={styles.btn}
                  onClick={() => void session.login()}
                  title="Åpne innlogging for Cursor CLI i nettleseren"
                >
                  Logg inn
                </button>
              )}
              {cliAuthenticated && (
                <button
                  className={styles.btn}
                  disabled={!canSend}
                  onClick={() => void session.send(context, "deeplink")}
                  title="Åpne prompten i Cursor-appen i stedet for å kjøre den her"
                >
                  Åpne i Cursor
                </button>
              )}
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={!canSend || cliAvailable === null}
                onClick={() => void session.send(context, defaultTransport)}
                title={
                  cliAuthenticated
                    ? "Kjør med Cursor CLI (⌘↩)"
                    : "Åpne i Cursor-appen med prompt og kontekst (⌘↩)"
                }
              >
                {cliAuthenticated ? "Send ⌘↩" : "Åpne i Cursor ⌘↩"}
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
