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

  return (
    <div className={styles.overview}>
      <div className={styles.overviewHeader}>
        <h2>{presentation.title}</h2>
        <p>
          {exportMode
            ? "Huk av slidene som skal med i PDF-en. Hver slide tas med én gang, på siste steg."
            : "Klikk for å gå til en slide. Bruk øye-knappen for å skjule eller vise den. Kapitler er bare synlige her – ikke for publikum."}
        </p>
        <div className={styles.overviewActions}>
          {exportState && !exportMode && (
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

      {chapters?.length ? (
        chapters.map((ch) => {
          const chapterHidden = isChapterFullyHidden(ch, hidden);
          const chapterIds = ch.slides.map((s) => s.id);
          const chapterSelected =
            chapterIds.length > 0 &&
            chapterIds.every((id) => exportState?.selected.has(id));
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
                {exportMode && exportState && (
                  <div className={styles.chapterActions}>
                    <button
                      className={styles.btn}
                      onClick={() => exportState.onToggleChapter(ch.id)}
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
                      exportMode={exportMode}
                      selected={exportState?.selected.has(s.id) ?? false}
                      exporting={exporting}
                      onGo={() => onGo(i)}
                      onToggleHidden={() => onToggleHidden(s.id)}
                      onToggleSelected={() =>
                        exportState?.onToggleSelected(s.id)
                      }
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
              exportMode={exportMode}
              selected={exportState?.selected.has(s.id) ?? false}
              exporting={exporting}
              onGo={() => onGo(i)}
              onToggleHidden={() => onToggleHidden(s.id)}
              onToggleSelected={() => exportState?.onToggleSelected(s.id)}
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
  exportMode,
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
  exportMode: boolean;
  selected: boolean;
  exporting: boolean;
  onGo: () => void;
  onToggleHidden: () => void;
  onToggleSelected: () => void;
}) {
  return (
    <div
      className={`${styles.thumb} ${
        isCurrent && !exportMode ? styles.thumbActive : ""
      } ${isHidden ? styles.thumbHidden : ""} ${
        exportMode && selected ? styles.thumbSelected : ""
      }`}
    >
      <button
        className={styles.thumbCanvasWrap}
        onClick={() => {
          if (exportMode) onToggleSelected();
          else onGo();
        }}
        disabled={exporting}
        title={
          exportMode
            ? selected
              ? "Fjern fra PDF"
              : "Velg til PDF"
            : slide.name
        }
      >
        <div className={styles.thumbCanvas}>
          <SlideCanvas slide={slide} scale={200 / SLIDE_W} />
        </div>
      </button>
      <div className={styles.thumbFooter}>
        {exportMode && (
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
        {!exportMode && (
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
