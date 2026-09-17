"use client";

import { useCallback, useState } from "react";
import type { PresentationDef, SlideDef } from "@/presentations";
import { chapterOf, isChapterFullyHidden } from "@/presentations/chapters";
import { SLIDE_W, SlideCanvas } from "./SlideCanvas";
import {
  CURSOR_PROMPT_ENABLED,
  CursorPromptPanel,
  type CursorPromptSession,
  type CursorPromptView,
} from "./CursorPrompt";
import styles from "./SlideOverview.module.css";

export type SlideOverviewExport = {
  mode: boolean;
  selected: Set<string>;
  exporting: boolean;
  progress: { current: number; total: number } | null;
  error: string | null;
  onStart: () => void;
  onToggleSelected: (id: string) => void;
  onToggleChapter: (chapterId: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onRun: () => void;
  onCancel: () => void;
};

export type SlideOverviewPrompt = {
  session: CursorPromptSession;
  view: CursorPromptView;
};

export default function SlideOverview({
  presentation,
  current,
  hidden,
  onGo,
  onToggleHidden,
  onClose,
  export: exportState,
  prompt,
}: {
  presentation: PresentationDef;
  current: number;
  hidden: Set<string>;
  onGo: (index: number) => void;
  onToggleHidden: (id: string) => void;
  onClose: () => void;
  export?: SlideOverviewExport;
  /** Prompt Cursor med valgte slides som kontekst (kun dev-modus). */
  prompt?: SlideOverviewPrompt;
}) {
  const slides = presentation.slides;
  const chapters = presentation.chapters;
  const exportMode = exportState?.mode ?? false;
  const exporting = exportState?.exporting ?? false;

  const promptEnabled = CURSOR_PROMPT_ENABLED && !!prompt;
  const [promptMode, setPromptMode] = useState(false);
  const [promptSelected, setPromptSelected] = useState<Set<string>>(
    () => new Set()
  );
  const promptActive = promptEnabled && promptMode && !exportMode;

  const togglePromptSelected = useCallback((id: string) => {
    setPromptSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const togglePromptChapter = useCallback(
    (chapterId: string) => {
      const chapter = chapterOf(presentation, chapterId);
      if (!chapter) return;
      const ids = chapter.slides.map((s) => s.id);
      setPromptSelected((prev) => {
        const allOn = ids.every((id) => prev.has(id));
        const next = new Set(prev);
        if (allOn) ids.forEach((id) => next.delete(id));
        else ids.forEach((id) => next.add(id));
        return next;
      });
    },
    [presentation]
  );

  // Én felles «velg slides»-modus for både PDF-eksport og Cursor-prompt.
  const selection = exportMode && exportState
    ? {
        kind: "export" as const,
        selected: exportState.selected,
        toggle: exportState.onToggleSelected,
        toggleChapter: exportState.onToggleChapter,
      }
    : promptActive
      ? {
          kind: "prompt" as const,
          selected: promptSelected,
          toggle: togglePromptSelected,
          toggleChapter: togglePromptChapter,
        }
      : null;

  const promptSummary = promptSelected.size
    ? `${promptSelected.size} ${promptSelected.size === 1 ? "slide" : "slides"} valgt som kontekst`
    : "Hele presentasjonen (ingen slides valgt)";

  return (
    <div className={styles.overview}>
      <div className={styles.overviewHeader}>
        <h2>{presentation.title}</h2>
        <p>
          {exportMode
            ? "Huk av slidene som skal med i PDF-en. Hver slide tas med én gang, på siste steg."
            : promptActive
              ? "Huk av slidene Cursor skal bruke som kontekst – eller la alle stå umerket for å prompte om hele presentasjonen."
              : "Klikk for å gå til en slide. Bruk øye-knappen for å skjule eller vise den. Kapitler er bare synlige her – ikke for publikum."}
        </p>
        <div className={styles.overviewActions}>
          {promptEnabled && !exportMode && !promptMode && (
            <button
              className={styles.btn}
              onClick={() => setPromptMode(true)}
              title="Prompt Cursor om presentasjonen eller utvalgte slides"
            >
              Prompt Cursor
            </button>
          )}
          {exportState && !exportMode && !promptActive && (
            <button
              className={styles.btn}
              onClick={exportState.onStart}
              title="Last ned slides som PDF"
            >
              Eksporter PDF
            </button>
          )}
          <button className={styles.btn} onClick={onClose} disabled={exporting}>
            Lukk (Esc)
          </button>
        </div>
      </div>

      {exportState && exportMode && (
        <div className={styles.exportBar}>
          {exporting && exportState.progress ? (
            <p>
              Lager PDF… slide {exportState.progress.current} av{" "}
              {exportState.progress.total}
            </p>
          ) : (
            <>
              <button className={styles.btn} onClick={exportState.onSelectAll}>
                Alle
              </button>
              <button className={styles.btn} onClick={exportState.onSelectNone}>
                Ingen
              </button>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={exportState.selected.size === 0}
                onClick={exportState.onRun}
              >
                Last ned PDF ({exportState.selected.size})
              </button>
              <button className={styles.btn} onClick={exportState.onCancel}>
                Avbryt
              </button>
            </>
          )}
          {exportState.error && (
            <p className={styles.exportError}>{exportState.error}</p>
          )}
        </div>
      )}

      {promptActive && prompt && (
        <div className={styles.promptSection}>
          <div className={styles.exportBar}>
            <button
              className={styles.btn}
              onClick={() => setPromptSelected(new Set(slides.map((s) => s.id)))}
            >
              Alle
            </button>
            <button
              className={styles.btn}
              onClick={() => setPromptSelected(new Set())}
            >
              Ingen
            </button>
            <p>{promptSummary}</p>
            <button
              className={styles.btn}
              onClick={() => setPromptMode(false)}
              disabled={prompt.session.running}
            >
              Avbryt
            </button>
          </div>
          <CursorPromptPanel
            session={prompt.session}
            variant="inline"
            summary={promptSummary}
            context={{
              view: prompt.view,
              overview: true,
              current: { index: current, step: 0 },
              slideIds: slides
                .map((s) => s.id)
                .filter((id) => promptSelected.has(id)),
            }}
          />
        </div>
      )}

      {chapters?.length ? (
        chapters.map((ch) => {
          const chapterHidden = isChapterFullyHidden(ch, hidden);
          const chapterIds = ch.slides.map((s) => s.id);
          const chapterSelected =
            !!selection &&
            chapterIds.length > 0 &&
            chapterIds.every((id) => selection.selected.has(id));
          return (
            <section key={ch.id} className={styles.chapter}>
              <div className={styles.chapterHeader}>
                <div>
                  <h3 className={styles.chapterTitle}>{ch.title}</h3>
                  <span className={styles.chapterMeta}>
                    {ch.slides.length} slides
                    {chapterHidden && " · skjult"}
                  </span>
                </div>
                {selection && (
                  <div className={styles.chapterActions}>
                    <button
                      className={styles.btn}
                      onClick={() => selection.toggleChapter(ch.id)}
                      disabled={exporting}
                    >
                      {chapterSelected ? "Fjern kapittel" : "Velg kapittel"}
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.grid}>
                {ch.slides.map((s) => {
                  const i = slides.findIndex((x) => x.id === s.id);
                  if (i < 0) return null;
                  return (
                    <OverviewThumb
                      key={s.id}
                      slide={slides[i]}
                      index={i}
                      isCurrent={i === current}
                      isHidden={hidden.has(s.id)}
                      selectMode={selection?.kind ?? null}
                      selected={selection?.selected.has(s.id) ?? false}
                      exporting={exporting}
                      onGo={() => onGo(i)}
                      onToggleHidden={() => onToggleHidden(s.id)}
                      onToggleSelected={() => selection?.toggle(s.id)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })
      ) : (
        <div className={styles.grid}>
          {slides.map((s, i) => (
            <OverviewThumb
              key={s.id}
              slide={s}
              index={i}
              isCurrent={i === current}
              isHidden={hidden.has(s.id)}
              selectMode={selection?.kind ?? null}
              selected={selection?.selected.has(s.id) ?? false}
              exporting={exporting}
              onGo={() => onGo(i)}
              onToggleHidden={() => onToggleHidden(s.id)}
              onToggleSelected={() => selection?.toggle(s.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OverviewThumb({
  slide,
  index,
  isCurrent,
  isHidden,
  selectMode,
  selected,
  exporting,
  onGo,
  onToggleHidden,
  onToggleSelected,
}: {
  slide: SlideDef;
  index: number;
  isCurrent: boolean;
  isHidden: boolean;
  selectMode: "export" | "prompt" | null;
  selected: boolean;
  exporting: boolean;
  onGo: () => void;
  onToggleHidden: () => void;
  onToggleSelected: () => void;
}) {
  const selecting = selectMode !== null;
  const selectTitle =
    selectMode === "export"
      ? selected
        ? "Fjern fra PDF"
        : "Velg til PDF"
      : selected
        ? "Fjern fra konteksten"
        : "Bruk som kontekst for Cursor";
  return (
    <div
      className={`${styles.thumb} ${
        isCurrent && !selecting ? styles.thumbActive : ""
      } ${isHidden ? styles.thumbHidden : ""} ${
        selecting && selected ? styles.thumbSelected : ""
      }`}
    >
      <button
        className={styles.thumbCanvasWrap}
        onClick={() => {
          if (selecting) onToggleSelected();
          else onGo();
        }}
        disabled={exporting}
        title={selecting ? selectTitle : slide.name}
      >
        <div className={styles.thumbCanvas}>
          <SlideCanvas slide={slide} scale={200 / SLIDE_W} />
        </div>
      </button>
      <div className={styles.thumbFooter}>
        {selecting && (
          <input
            type="checkbox"
            className={styles.thumbCheckbox}
            checked={selected}
            onChange={onToggleSelected}
            disabled={exporting}
            aria-label={`Velg ${slide.name}`}
          />
        )}
        <span className={styles.thumbLabel}>
          {index + 1}. {slide.name}
        </span>
        {!selecting && (
          <button
            className={styles.eyeBtn}
            onClick={onToggleHidden}
            title={isHidden ? "Vis slide" : "Skjul slide"}
          >
            {isHidden ? "🚫" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}
