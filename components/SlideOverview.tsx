"use client";

import type { PresentationDef, SlideDef } from "@/presentations";
import { isChapterFullyHidden } from "@/presentations/chapters";
import { SLIDE_W, SlideCanvas } from "./SlideCanvas";
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

export default function SlideOverview({
  presentation,
  current,
  hidden,
  onGo,
  onToggleHidden,
  onClose,
  export: exportState,
}: {
  presentation: PresentationDef;
  current: number;
  hidden: Set<string>;
  onGo: (index: number) => void;
  onToggleHidden: (id: string) => void;
  onClose: () => void;
  export?: SlideOverviewExport;
}) {
  const slides = presentation.slides;
  const chapters = presentation.chapters;
  const exportMode = exportState?.mode ?? false;
  const exporting = exportState?.exporting ?? false;
  const selection =
    exportMode && exportState
      ? {
          selected: exportState.selected,
          toggle: exportState.onToggleSelected,
          toggleChapter: exportState.onToggleChapter,
        }
      : null;

  return (
    <div className={styles.overview}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.eyebrow}>Oversikt</p>
          <h2 className={styles.title}>{presentation.title}</h2>
          <p className={styles.meta}>
            {exportMode
              ? "Huk av slidene som skal med i PDF-en. Hver slide tas med én gang, på siste steg."
              : "Klikk for å gå til en slide. Bruk øye-knappen for å skjule eller vise den. Kapitler er bare synlige her – ikke for publikum."}
          </p>
        </div>
        <div className={styles.overviewActions}>
          {exportState && !exportMode && (
            <button
              type="button"
              className={styles.btn}
              onClick={exportState.onStart}
              title="Last ned slides som PDF"
            >
              Eksporter PDF
            </button>
          )}
          <button
            type="button"
            className={styles.btn}
            onClick={onClose}
            disabled={exporting}
          >
            Lukk (Esc)
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {exportState && exportMode && (
          <div className={styles.exportBar}>
            {exporting && exportState.progress ? (
              <p>
                Lager PDF… slide {exportState.progress.current} av{" "}
                {exportState.progress.total}
              </p>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={exportState.onSelectAll}
                >
                  Alle
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={exportState.onSelectNone}
                >
                  Ingen
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={exportState.selected.size === 0}
                  onClick={exportState.onRun}
                >
                  Last ned PDF ({exportState.selected.size})
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={exportState.onCancel}
                >
                  Avbryt
                </button>
              </>
            )}
            {exportState.error && (
              <p className={styles.exportError}>{exportState.error}</p>
            )}
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
                  <div className={styles.chapterHeading}>
                    <h3 className={styles.chapterTitle}>{ch.title}</h3>
                    <span className={styles.chapterMeta}>
                      {ch.slides.length}{" "}
                      {ch.slides.length === 1 ? "slide" : "slides"}
                    </span>
                    {chapterHidden && (
                      <span className={styles.tag}>Skjult</span>
                    )}
                  </div>
                  {selection && (
                    <div className={styles.chapterActions}>
                      <button
                        type="button"
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
                        selecting={!!selection}
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
                selecting={!!selection}
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
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2 10s2.8-5.5 8-5.5S18 10 18 10s-2.8 5.5-8 5.5S2 10 2 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 3.5 17 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.6 6.2C3.2 7.4 2.2 9 2 10c0 0 2.8 5.5 8 5.5 1.4 0 2.6-.4 3.7-1M15.7 13.2C16.9 12 17.8 10.6 18 10c0 0-2.8-5.5-8-5.5-.9 0-1.7.1-2.5.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OverviewThumb({
  slide,
  index,
  isCurrent,
  isHidden,
  selecting,
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
  selecting: boolean;
  selected: boolean;
  exporting: boolean;
  onGo: () => void;
  onToggleHidden: () => void;
  onToggleSelected: () => void;
}) {
  const selectTitle = selected ? "Fjern fra PDF" : "Velg til PDF";
  return (
    <div
      className={`${styles.thumb} ${
        isCurrent && !selecting ? styles.thumbActive : ""
      } ${isHidden ? styles.thumbHidden : ""} ${
        selecting && selected ? styles.thumbSelected : ""
      }`}
    >
      <button
        type="button"
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
            type="button"
            className={styles.eyeBtn}
            onClick={onToggleHidden}
            title={isHidden ? "Vis slide" : "Skjul slide"}
            aria-label={isHidden ? "Vis slide" : "Skjul slide"}
          >
            {isHidden ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
