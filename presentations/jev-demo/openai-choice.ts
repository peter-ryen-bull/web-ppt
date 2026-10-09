"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_OPENAI_EFFORT, DEFAULT_OPENAI_MODEL, normalizeOpenaiChoice, type OpenaiChoice } from "./jev";

/*
 * Presentatørens valg av OpenAI-modell og effort. Ligger i localStorage, så
 * det gjelder alle slidene og alle vinduer (øving, presentatør, publikum).
 */

const KEY = "jev-demo:openai";
const SERVER_CHOICE: OpenaiChoice = { model: DEFAULT_OPENAI_MODEL, effort: DEFAULT_OPENAI_EFFORT };
const listeners = new Set<() => void>();
let cache: OpenaiChoice | null = null;

function read(): OpenaiChoice {
  try {
    return normalizeOpenaiChoice(JSON.parse(localStorage.getItem(KEY) ?? "null"));
  } catch {
    return normalizeOpenaiChoice(null);
  }
}

export function getOpenaiChoice(): OpenaiChoice {
  if (typeof window === "undefined") return SERVER_CHOICE;
  cache ??= read();
  return cache;
}

export function setOpenaiChoice(c: Partial<OpenaiChoice>) {
  cache = normalizeOpenaiChoice({ ...getOpenaiChoice(), ...c });
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

export function useOpenaiChoice(): OpenaiChoice {
  return useSyncExternalStore(subscribe, getOpenaiChoice, () => SERVER_CHOICE);
}
