"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { getPresentation } from "@/presentations";
import {
  SLIDE_W,
  SlideCanvas,
  useContainerScale,
} from "./SlideCanvas";
import styles from "./Deck.module.css";

export default function Deck({ presentationId }: { presentationId: string }) {
  const presentation = getPresentation(presentationId);
  if (!presentation) {
    throw new Error(`Ukjent presentasjon: ${presentationId}`);
  }
  const slides = presentation.slides;
  const storageKey = `deck-hidden-slides:${presentation.id}`;

  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [overview, setOverview] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const scale = useContainerScale(stageRef);

  // Last inn skjulte slides fra localStorage + slide fra URL-hash (#7)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setHidden(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignorer korrupt lagring */
    }
    const readHash = () => {
      const n = parseInt(window.location.hash.slice(1), 10);
      if (!Number.isNaN(n) && n >= 1 && n <= slides.length) {
        setCurrent(n - 1);
        setStep(0);
      }
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [storageKey, slides.length]);

  useEffect(() => {
    history.replaceState(null, "", `#${current + 1}`);
    // Presentatør-/publikumsvisningen starter der du sist var
    localStorage.setItem(`deck-pos:${presentation.id}`, String(current));
    localStorage.setItem(`deck-step:${presentation.id}`, String(step));
  }, [current, step, presentation.id]);

  const persistHidden = useCallback(
    (next: Set<string>) => {
      setHidden(next);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    },
    [storageKey]
  );

  const visibleIndexes = useMemo(
    () =>
      slides
        .map((s, i) => ({ id: s.id, i }))
        .filter((s) => !hidden.has(s.id))
        .map((s) => s.i),
    [slides, hidden]
  );

  const currentVisiblePos = visibleIndexes.indexOf(current);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (visibleIndexes.length === 0) return;
      let pos = currentVisiblePos;
      if (pos === -1) {
        // Nåværende slide ble skjult – finn nærmeste synlige
        pos =
          dir === 1
            ? visibleIndexes.findIndex((i) => i > current)
            : visibleIndexes.findLastIndex((i) => i < current);
        if (pos === -1) pos = dir === 1 ? 0 : visibleIndexes.length - 1;
        setCurrent(visibleIndexes[pos]);
        setStep(0);
        return;
      }
      // Gå gjennom klikk-stegene i sliden før slide-bytte
      const maxStep = slides[current].steps ?? 0;
      if (dir === 1 && step < maxStep) {
        setStep(step + 1);
        return;
      }
      if (dir === -1 && step > 0) {
        setStep(step - 1);
        return;
      }
      const nextPos = Math.min(
        Math.max(pos + dir, 0),
        visibleIndexes.length - 1
      );
      const next = visibleIndexes[nextPos];
      if (next !== current) {
        setCurrent(next);
        // Bakover: land på ferdig avslørt slide
        setStep(dir === 1 ? 0 : slides[next].steps ?? 0);
      }
    },
    [current, currentVisiblePos, visibleIndexes, slides, step]
  );

  const toggleHidden = useCallback(
    (id: string) => {
      const next = new Set(hidden);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persistHidden(next);
    },
    [hidden, persistHidden]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "g" || e.key === "G" || e.key === "Escape") {
        setOverview((o) => (e.key === "Escape" ? false : !o));
      } else if (e.key === "h" || e.key === "H") {
        toggleHidden(slides[current].id);
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      } else if (e.key === "Home") {
        if (visibleIndexes.length) {
          setCurrent(visibleIndexes[0]);
          setStep(0);
        }
      } else if (e.key === "End") {
        if (visibleIndexes.length) {
          setCurrent(visibleIndexes[visibleIndexes.length - 1]);
          setStep(0);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleHidden, current, visibleIndexes, slides]);

  const isCurrentHidden = hidden.has(slides[current]?.id);

  return (
    <div className={styles.root}>
      <div className={styles.stage} ref={stageRef} onClick={() => go(1)}>
        <SlideCanvas slide={slides[current]} scale={scale} step={step} />
        {isCurrentHidden && (
          <div className={styles.hiddenBadge}>
            Denne sliden er skjult – hoppes over i visning
          </div>
        )}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <Link href="/" className={styles.btn} title="Alle presentasjoner">
            ⌂ Presentasjoner
          </Link>
          <button
            className={styles.btn}
            onClick={() => go(-1)}
            disabled={currentVisiblePos <= 0 && step === 0}
            title="Forrige (←)"
          >
            ← Forrige
          </button>
          <button
            className={styles.btn}
            onClick={() => go(1)}
            disabled={
              currentVisiblePos !== -1 &&
              currentVisiblePos >= visibleIndexes.length - 1 &&
              step >= (slides[current].steps ?? 0)
            }
            title="Neste (→ / mellomrom)"
          >
            Neste →
          </button>
        </div>

        <div className={styles.counter}>
          {currentVisiblePos === -1
            ? `– / ${visibleIndexes.length}`
            : `${currentVisiblePos + 1} / ${visibleIndexes.length}`}
          <span className={styles.counterDetail}>
            (slide {current + 1} av {slides.length}
            {(slides[current].steps ?? 0) > 0 &&
              ` · steg ${step}/${slides[current].steps}`}
            )
          </span>
        </div>

        <div className={styles.toolbarGroup}>
          <Link
            href={`/${presentation.id}/presenter`}
            className={styles.btn}
            title="Presentatørvisning med speaker notes – publikumsvisningen åpnes derfra"
          >
            🎤 Presentér
          </Link>
          <button
            className={styles.btn}
            onClick={() => toggleHidden(slides[current].id)}
            title="Skjul/vis denne sliden (H)"
          >
            {isCurrentHidden ? "Vis slide" : "Skjul slide"}
          </button>
          <button
            className={styles.btn}
            onClick={() => setOverview((o) => !o)}
            title="Oversikt (G)"
          >
            Oversikt
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              if (document.fullscreenElement) document.exitFullscreen();
              else document.documentElement.requestFullscreen();
            }}
            title="Fullskjerm (F)"
          >
            ⛶
          </button>
        </div>
      </div>

      {overview && (
        <div className={styles.overview}>
          <div className={styles.overviewHeader}>
            <h2>{presentation.title}</h2>
            <p>
              Klikk for å gå til en slide. Bruk øye-knappen for å skjule eller
              vise den i presentasjonen.
            </p>
            <button
              className={styles.btn}
              onClick={() => setOverview(false)}
            >
              Lukk (Esc)
            </button>
          </div>
          <div className={styles.grid}>
            {slides.map((s, i) => {
              const isHidden = hidden.has(s.id);
              return (
                <div
                  key={s.id}
                  className={`${styles.thumb} ${
                    i === current ? styles.thumbActive : ""
                  } ${isHidden ? styles.thumbHidden : ""}`}
                >
                  <button
                    className={styles.thumbCanvasWrap}
                    onClick={() => {
                      setCurrent(i);
                      setStep(0);
                      setOverview(false);
                    }}
                    title={s.name}
                  >
                    <div className={styles.thumbCanvas}>
                      <SlideCanvas slide={s} scale={200 / SLIDE_W} />
                    </div>
                  </button>
                  <div className={styles.thumbFooter}>
                    <span className={styles.thumbLabel}>
                      {i + 1}. {s.name}
                    </span>
                    <button
                      className={styles.eyeBtn}
                      onClick={() => toggleHidden(s.id)}
                      title={isHidden ? "Vis slide" : "Skjul slide"}
                    >
                      {isHidden ? "🚫" : "👁"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
