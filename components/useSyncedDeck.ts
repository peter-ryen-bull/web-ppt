"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PresentationDef } from "@/presentations";

/*
 * Synkronisert deck-tilstand på tvers av vinduer (samme nettleser) via
 * BroadcastChannel. Brukes av presentatørvisningen og publikumsvisningen,
 * slik at slide-bytte i ett vindu umiddelbart vises i det andre.
 *
 * Posisjonen lagres også i localStorage, så et nytt vindu starter på
 * riktig slide selv om det åpnes senere.
 */

type SyncMessage =
  | { type: "hello" }
  | { type: "state"; current: number; step: number; hidden: string[] };

export function useSyncedDeck(presentation: PresentationDef) {
  const slides = presentation.slides;
  const posKey = `deck-pos:${presentation.id}`;
  const stepKey = `deck-step:${presentation.id}`;
  const hiddenKey = `deck-hidden-slides:${presentation.id}`;

  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const channelRef = useRef<BroadcastChannel | null>(null);
  const stateRef = useRef({ current, step, hidden });
  stateRef.current = { current, step, hidden };

  /** Oppdater tilstand lokalt, lagre og kringkast til andre vinduer. */
  const update = useCallback(
    (next: Partial<{ current: number; step: number; hidden: Set<string> }>) => {
      const merged = { ...stateRef.current, ...next };
      stateRef.current = merged;
      if (next.current !== undefined) {
        setCurrent(merged.current);
        localStorage.setItem(posKey, String(merged.current));
      }
      if (next.step !== undefined) {
        setStep(merged.step);
        localStorage.setItem(stepKey, String(merged.step));
      }
      if (next.hidden !== undefined) {
        setHidden(merged.hidden);
        localStorage.setItem(hiddenKey, JSON.stringify([...merged.hidden]));
      }
      channelRef.current?.postMessage({
        type: "state",
        current: merged.current,
        step: merged.step,
        hidden: [...merged.hidden],
      } satisfies SyncMessage);
    },
    [posKey, stepKey, hiddenKey]
  );

  useEffect(() => {
    // Utgangspunkt fra localStorage (overstyres av svar på "hello" under)
    try {
      const rawHidden = localStorage.getItem(hiddenKey);
      if (rawHidden) setHidden(new Set(JSON.parse(rawHidden) as string[]));
    } catch {
      /* ignorer korrupt lagring */
    }
    const pos = parseInt(localStorage.getItem(posKey) ?? "", 10);
    if (!Number.isNaN(pos) && pos >= 0 && pos < slides.length) {
      setCurrent(pos);
    }
    const st = parseInt(localStorage.getItem(stepKey) ?? "", 10);
    if (!Number.isNaN(st) && st >= 0) {
      setStep(st);
    }

    const ch = new BroadcastChannel(`deck-sync:${presentation.id}`);
    channelRef.current = ch;
    ch.onmessage = (e: MessageEvent<SyncMessage>) => {
      const msg = e.data;
      if (msg.type === "hello") {
        // Et nytt vindu spør om tilstand – svar med vår
        ch.postMessage({
          type: "state",
          current: stateRef.current.current,
          step: stateRef.current.step,
          hidden: [...stateRef.current.hidden],
        } satisfies SyncMessage);
      } else if (msg.type === "state") {
        stateRef.current = {
          current: msg.current,
          step: msg.step,
          hidden: new Set(msg.hidden),
        };
        setCurrent(msg.current);
        setStep(msg.step);
        setHidden(new Set(msg.hidden));
      }
    };
    ch.postMessage({ type: "hello" } satisfies SyncMessage);
    return () => {
      ch.close();
      channelRef.current = null;
    };
  }, [presentation.id, posKey, stepKey, hiddenKey, slides.length]);

  const visibleIndexes = useMemo(
    () =>
      slides
        .map((s, i) => ({ id: s.id, i }))
        .filter((s) => !hidden.has(s.id))
        .map((s) => s.i),
    [slides, hidden]
  );

  const currentVisiblePos = visibleIndexes.indexOf(current);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length)
        update({ current: index, step: 0 });
    },
    [slides.length, update]
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (visibleIndexes.length === 0) return;
      let pos = currentVisiblePos;
      if (pos === -1) {
        // Nåværende slide er skjult – finn nærmeste synlige
        pos =
          dir === 1
            ? visibleIndexes.findIndex((i) => i > current)
            : visibleIndexes.findLastIndex((i) => i < current);
        if (pos === -1) pos = dir === 1 ? 0 : visibleIndexes.length - 1;
        update({ current: visibleIndexes[pos], step: 0 });
        return;
      }
      // Gå gjennom klikk-stegene i sliden før slide-bytte
      const maxStep = slides[current].steps ?? 0;
      if (dir === 1 && step < maxStep) {
        update({ step: step + 1 });
        return;
      }
      if (dir === -1 && step > 0) {
        update({ step: step - 1 });
        return;
      }
      const nextPos = Math.min(
        Math.max(pos + dir, 0),
        visibleIndexes.length - 1
      );
      const next = visibleIndexes[nextPos];
      if (next !== current) {
        // Bakover: land på ferdig avslørt slide
        update({ current: next, step: dir === 1 ? 0 : slides[next].steps ?? 0 });
      }
    },
    [current, currentVisiblePos, visibleIndexes, slides, step, update]
  );

  const toggleHidden = useCallback(
    (id: string) => {
      const next = new Set(hidden);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      update({ hidden: next });
    },
    [hidden, update]
  );

  return {
    slides,
    current,
    step,
    hidden,
    visibleIndexes,
    currentVisiblePos,
    go,
    goTo,
    toggleHidden,
  };
}
