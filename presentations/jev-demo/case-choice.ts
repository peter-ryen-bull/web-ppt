"use client";

import { useSyncExternalStore } from "react";
import { CLASSIFY_TASKS, taskById, type CaseId, type ClassifyTask } from "./cases";

/*
 * Hvilket av de tre casene presentatøren har valgt, og hvilket eksempel.
 * Ligger i localStorage, så valget følger med fra slide til slide og mellom
 * vinduene (øving, presentatør, publikum).
 */

const KEY = "jev-demo:case";
type CaseChoice = { id: CaseId; example: number };
const SERVER: CaseChoice = { id: CLASSIFY_TASKS[0].id, example: 0 };
const listeners = new Set<() => void>();
let cache: CaseChoice | null = null;

function normalize(c: Partial<CaseChoice> | null | undefined): CaseChoice {
  const task = taskById(c?.id);
  const n = typeof c?.example === "number" ? Math.floor(c.example) : 0;
  return { id: task.id, example: n >= 0 && n < task.examples.length ? n : 0 };
}

function read(): CaseChoice {
  try {
    return normalize(JSON.parse(localStorage.getItem(KEY) ?? "null"));
  } catch {
    return SERVER;
  }
}

export function getCaseChoice(): CaseChoice {
  if (typeof window === "undefined") return SERVER;
  cache ??= read();
  return cache;
}

export function setCaseChoice(c: Partial<CaseChoice>) {
  cache = normalize({ ...getCaseChoice(), ...c });
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* privat modus o.l.: valget gjelder bare denne fanen */
  }
  listeners.forEach((l) => l());
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

export function useCaseChoice(): CaseChoice {
  return useSyncExternalStore(subscribe, getCaseChoice, () => SERVER);
}

/** Valgt case og eksempelteksten som er valgt i den. */
export function useCase(): { task: ClassifyTask; example: number; item: string } {
  const c = useCaseChoice();
  const task = taskById(c.id);
  return { task, example: c.example, item: task.examples[c.example] };
}
