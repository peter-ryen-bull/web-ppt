"use client";

import { useSyncExternalStore } from "react";
import type { Provider } from "./jev";

/*
 * Siste live-målinger fra fart- og sammenlign-slidene, til konklusjonen.
 * Ligger i localStorage, så publikumsvinduet ser det samme, og har
 * tidspunkt slik at gamle øvingstall kan kjennes igjen og nullstilles.
 */

export type EngineRun = {
  provider: Provider;
  model: string;
  effort: string | null;
  n: number;
  errors: number;
  wallMs: number;
  medianMs: number;
  /** Målte tokens × listepris, snitt per vellykket element. */
  costPerItem: number | null;
  /** Svar per element, null der kallet feilet. */
  choices: (string | null)[];
};

export type Comparison = {
  source: "fart" | "sammenlign";
  at: number;
  taskId: string;
  n: number;
  concurrency: number;
  jev: EngineRun;
  openai: EngineRun;
};

type Store = {
  latest?: Comparison;
  /** Siste fart-kjøring per motor, til den andre motoren har kjørt samme oppsett. */
  fart?: Partial<Record<Provider, EngineRun & { taskId: string; concurrency: number; at: number }>>;
};

const KEY = "jev-demo:results";
const EMPTY: Store = {};
const listeners = new Set<() => void>();
let cache: Store | null = null;

function read(): Store {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? "null") as Store | null) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function get(): Store {
  if (typeof window === "undefined") return EMPTY;
  cache ??= read();
  return cache;
}

function write(next: Store) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* privat modus o.l.: gjelder bare denne fanen */
  }
  listeners.forEach((l) => l());
}

export function recordComparison(c: Comparison) {
  write({ ...get(), latest: c });
}

/** Lagrer en fart-kjøring. Har den andre motoren kjørt samme case, antall og samtidighet, blir paret en sammenligning. */
export function recordFartRun(run: EngineRun, taskId: string, concurrency: number) {
  const at = Date.now();
  const fart = { ...get().fart, [run.provider]: { ...run, taskId, concurrency, at } };
  const other = fart[run.provider === "jev" ? "openai" : "jev"];
  const paired = other && other.taskId === taskId && other.n === run.n && other.concurrency === concurrency;
  const latest: Comparison | undefined = paired
    ? {
        source: "fart",
        at,
        taskId,
        n: run.n,
        concurrency,
        jev: run.provider === "jev" ? run : other,
        openai: run.provider === "openai" ? run : other,
      }
    : get().latest;
  write({ ...get(), fart, latest });
}

export function clearResults() {
  write(EMPTY);
}

function onStorage(e: StorageEvent) {
  if (e.key !== KEY) return;
  cache = read();
  listeners.forEach((l) => l());
}

function subscribe(fn: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function useLatestComparison(): Comparison | undefined {
  return useSyncExternalStore(subscribe, () => get().latest, () => undefined);
}

/** Enighet: elementer der begge svarte og svaret var likt. */
export function agreement(c: Comparison): { same: number; compared: number } {
  let same = 0;
  let compared = 0;
  c.jev.choices.forEach((j, i) => {
    const o = c.openai.choices[i];
    if (j === null || o === null || o === undefined) return;
    compared++;
    if (j === o) same++;
  });
  return { same, compared };
}
