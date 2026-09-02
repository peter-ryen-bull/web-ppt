"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getPresentation } from "@/presentations";
import { SlideCanvas, useContainerScale } from "./SlideCanvas";
import { useSyncedDeck } from "./useSyncedDeck";
import styles from "./PresenterView.module.css";

function formatElapsed(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function PresenterView({
  presentationId,
}: {
  presentationId: string;
}) {
  const presentation = getPresentation(presentationId);
  if (!presentation) {
    throw new Error(`Ukjent presentasjon: ${presentationId}`);
  }

  const {
    slides,
    current,
    step,
    hidden,
    visibleIndexes,
    currentVisiblePos,
    go,
    toggleHidden,
  } = useSyncedDeck(presentation);

  const currentStageRef = useRef<HTMLDivElement>(null);
  const nextStageRef = useRef<HTMLDivElement>(null);
  const currentScale = useContainerScale(currentStageRef);
  const nextScale = useContainerScale(nextStageRef);

  // Klokke og tidtaker – startes først etter mount (unngår hydreringsavvik)
  const [now, setNow] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    setStartedAt(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const openAudience = useCallback(() => {
    window.open(
      `/${presentationId}/vis`,
      `deck-vis:${presentationId}`,
      "width=960,height=540"
    );
  }, [presentationId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "h" || e.key === "H") {
        toggleHidden(slides[current].id);
      } else if (e.key === "v" || e.key === "V") {
        openAudience();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleHidden, current, slides, openAudience]);

  // Neste synlige slide (den publikum ser etter neste tastetrykk)
  const nextIndex =
    currentVisiblePos === -1
      ? visibleIndexes.find((i) => i > current) ?? null
      : currentVisiblePos < visibleIndexes.length - 1
        ? visibleIndexes[currentVisiblePos + 1]
        : null;

  const currentSlide = slides[current];
  const isCurrentHidden = hidden.has(currentSlide.id);
  const maxStep = currentSlide.steps ?? 0;
  // Flere klikk-steg igjen på denne sliden? Da viser «Neste» neste steg.
  const hasMoreSteps = currentVisiblePos !== -1 && step < maxStep;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerGroup}>
          <Link href={`/${presentationId}`} className={styles.btn}>
            ← Tilbake
          </Link>
          <span className={styles.title}>{presentation.title}</span>
        </div>
        <div className={styles.headerGroup}>
          <span className={styles.clock}>
            {now !== null
              ? new Date(now).toLocaleTimeString("nb-NO", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "–"}
          </span>
          <span className={styles.timer}>
            {now !== null && startedAt !== null
              ? formatElapsed(now - startedAt)
              : "00:00"}
          </span>
          <button
            className={styles.btn}
            onClick={() => setStartedAt(Date.now())}
            title="Nullstill tidtaker"
          >
            ↺
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={openAudience}
            title="Åpne publikumsvisningen i nytt vindu (V) – dra det til den delte skjermen og trykk F"
          >
            Åpne publikumsvisning
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.currentPane}>
          <div className={styles.paneLabel}>
            Nå: {current + 1}. {currentSlide.name}
            {isCurrentHidden && (
              <span className={styles.hiddenTag}>skjult</span>
            )}
          </div>
          <div className={styles.stage} ref={currentStageRef}>
            <SlideCanvas slide={currentSlide} scale={currentScale} step={step} />
          </div>
        </section>

        <aside className={styles.sidePane}>
          <div className={styles.paneLabel}>
            {hasMoreSteps
              ? `Neste: steg ${step + 1} av ${maxStep} – ${currentSlide.name}`
              : nextIndex !== null
                ? `Neste: ${nextIndex + 1}. ${slides[nextIndex].name}`
                : "Neste: – (siste slide)"}
          </div>
          <div className={styles.nextStage} ref={nextStageRef}>
            {hasMoreSteps ? (
              <SlideCanvas
                slide={currentSlide}
                scale={nextScale}
                step={step + 1}
              />
            ) : nextIndex !== null ? (
              <SlideCanvas slide={slides[nextIndex]} scale={nextScale} step={0} />
            ) : (
              <div className={styles.endOfDeck}>Slutt på presentasjonen</div>
            )}
          </div>

          <div className={styles.paneLabel}>Notater</div>
          <div className={styles.notes}>
            {currentSlide.notes ? (
              currentSlide.notes
            ) : (
              <span className={styles.noNotes}>
                Ingen notater for denne sliden.
              </span>
            )}
          </div>
        </aside>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGroup}>
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
              !hasMoreSteps
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
            {maxStep > 0 && ` · steg ${step}/${maxStep}`})
          </span>
        </div>
        <div className={styles.hint}>
          Publikum ser kun sliden – notater og teller vises bare her.
        </div>
      </footer>
    </div>
  );
}