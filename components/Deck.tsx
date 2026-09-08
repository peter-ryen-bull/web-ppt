"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { getPresentation, type SlideDef } from "@/presentations";
import {
  chapterOf,
  isChapterFullyHidden,
  toggleChapterHidden,
} from "@/presentations/chapters";
import {
  SLIDE_W,
  SlideCanvas,
  useContainerScale,
} from "./SlideCanvas";
import { usePdfExport } from "./PdfExport";
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
  const [exportMode, setExportMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [exportError, setExportError] = useState<string | null>(null);
  const { exportSlides, captureNode, progress, exporting } = usePdfExport();
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

  const toggleChapter = useCallback(
    (chapterId: string) => {
      const chapter = chapterOf(presentation, chapterId);
      if (!chapter) return;
      persistHidden(toggleChapterHidden(chapter, hidden));
    },
    [presentation, hidden, persistHidden]
  );

  const goChapter = useCallback(
    (dir: 1 | -1) => {
      const chapters = presentation.chapters;
      if (!chapters?.length) return;
      const currentId = slides[current]?.chapterId;
      const idx = chapters.findIndex((c) => c.id === currentId);
      if (idx < 0) return;
      const next = chapters[idx + dir];
      if (!next) return;
      const first = slides.findIndex((s) => s.chapterId === next.id);
      if (first >= 0) {
        setCurrent(first);
        setStep(0);
      }
    },
    [presentation.chapters, slides, current]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (overview || exporting) return;
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (overview || exporting) return;
        e.preventDefault();
        go(-1);
      } else if (e.key === "Escape") {
        if (exporting) {
          e.preventDefault();
          return;
        }
        if (exportMode) {
          setExportMode(false);
          return;
        }
        setOverview(false);
      } else if (e.key === "g" || e.key === "G") {
        if (exporting) return;
        setOverview((o) => !o);
        setExportMode(false);
      } else if ((e.key === "h" || e.key === "H") && e.shiftKey) {
        const id = slides[current]?.chapterId;
        if (id) toggleChapter(id);
      } else if (e.key === "h" || e.key === "H") {
        toggleHidden(slides[current].id);
      } else if (e.key === "[") {
        goChapter(-1);
      } else if (e.key === "]") {
        goChapter(1);
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
  }, [
    go,
    toggleHidden,
    toggleChapter,
    goChapter,
    current,
    visibleIndexes,
    slides,
    exportMode,
    exporting,
    overview,
  ]);

  const isCurrentHidden = hidden.has(slides[current]?.id);
  const currentChapter = chapterOf(presentation, slides[current]?.chapterId);
  const chapters = presentation.chapters;

  const startExportMode = useCallback(() => {
    setSelected(new Set(slides.map((s) => s.id)));
    setExportError(null);
    setExportMode(true);
  }, [slides]);

  const toggleSelected = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleChapterSelected = useCallback(
    (chapterId: string) => {
      const chapter = chapterOf(presentation, chapterId);
      if (!chapter) return;
      const ids = chapter.slides.map((s) => s.id);
      setSelected((prev) => {
        const allOn = ids.every((id) => prev.has(id));
        const next = new Set(prev);
        if (allOn) ids.forEach((id) => next.delete(id));
        else ids.forEach((id) => next.add(id));
        return next;
      });
    },
    [presentation]
  );

  const runExport = useCallback(async () => {
    const chosen = slides.filter((s) => selected.has(s.id));
    if (!chosen.length) return;
    setExportError(null);
    try {
      await exportSlides(chosen, {
        title: presentation.title,
        filename: `${presentation.id}.pdf`,
      });
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : "Kunne ikke lage PDF."
      );
    }
  }, [slides, selected, exportSlides, presentation.title, presentation.id]);

  const closeOverview = useCallback(() => {
    if (exporting) return;
    setExportMode(false);
    setOverview(false);
  }, [exporting]);

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
            {currentChapter && ` · ${currentChapter.title}`}
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
          {currentChapter && (
            <button
              className={styles.btn}
              onClick={() => toggleChapter(currentChapter.id)}
              title="Skjul/vis hele kapittelet (Shift+H)"
            >
              {isChapterFullyHidden(currentChapter, hidden)
                ? "Vis kapittel"
                : "Skjul kapittel"}
            </button>
          )}
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

      {captureNode}

      {overview && (
        <div className={styles.overview}>
          <div className={styles.overviewHeader}>
            <h2>{presentation.title}</h2>
            <p>
              {exportMode
                ? "Huk av slidene som skal med i PDF-en. Hver slide tas med én gang, på siste steg."
                : "Klikk for å gå til en slide. Bruk øye-knappen for å skjule eller vise den. Kapitler er bare synlige her – ikke for publikum."}
            </p>
            <div className={styles.overviewActions}>
              {!exportMode && (
                <button
                  className={styles.btn}
                  onClick={startExportMode}
                  title="Last ned slides som PDF"
                >
                  Eksporter PDF
                </button>
              )}
              <button
                className={styles.btn}
                onClick={closeOverview}
                disabled={exporting}
              >
                Lukk (Esc)
              </button>
            </div>
          </div>

          {exportMode && (
            <div className={styles.exportBar}>
              {exporting && progress ? (
                <p>
                  Lager PDF… slide {progress.current} av {progress.total}
                </p>
              ) : (
                <>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      setSelected(new Set(slides.map((s) => s.id)))
                    }
                  >
                    Alle
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => setSelected(new Set())}
                  >
                    Ingen
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    disabled={selected.size === 0}
                    onClick={runExport}
                  >
                    Last ned PDF ({selected.size})
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => setExportMode(false)}
                  >
                    Avbryt
                  </button>
                </>
              )}
              {exportError && (
                <p className={styles.exportError}>{exportError}</p>
              )}
            </div>
          )}

          {chapters?.length ? (
            chapters.map((ch) => {
              const chapterHidden = isChapterFullyHidden(ch, hidden);
              const chapterIds = ch.slides.map((s) => s.id);
              const chapterSelected =
                chapterIds.length > 0 &&
                chapterIds.every((id) => selected.has(id));
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
                    <div className={styles.chapterActions}>
                      {exportMode && (
                        <button
                          className={styles.btn}
                          onClick={() => toggleChapterSelected(ch.id)}
                          disabled={exporting}
                        >
                          {chapterSelected ? "Fjern kapittel" : "Velg kapittel"}
                        </button>
                      )}
                      {!exportMode && (
                        <button
                          className={styles.btn}
                          onClick={() => toggleChapter(ch.id)}
                          title={
                            chapterHidden
                              ? "Vis kapittel"
                              : "Skjul hele kapittelet"
                          }
                        >
                          {chapterHidden ? "Vis kapittel" : "Skjul kapittel"}
                        </button>
                      )}
                    </div>
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
                          selected={selected.has(s.id)}
                          exporting={exporting}
                          onGo={() => {
                            setCurrent(i);
                            setStep(0);
                            setExportMode(false);
                            setOverview(false);
                          }}
                          onToggleHidden={() => toggleHidden(s.id)}
                          onToggleSelected={() => toggleSelected(s.id)}
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
                  selected={selected.has(s.id)}
                  exporting={exporting}
                  onGo={() => {
                    setCurrent(i);
                    setStep(0);
                    setExportMode(false);
                    setOverview(false);
                  }}
                  onToggleHidden={() => toggleHidden(s.id)}
                  onToggleSelected={() => toggleSelected(s.id)}
                />
              ))}
            </div>
          )}
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
