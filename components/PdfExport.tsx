"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { SlideDef } from "@/presentations";
import { lastStepOf, SlideSurface } from "./SlideCanvas";
import { captureSlidePng, createPdfWriter, waitForPaint } from "./exportPdf";
import styles from "./PdfExport.module.css";

export type PdfProgress = { current: number; total: number };

export function usePdfExport() {
  const [slide, setSlide] = useState<SlideDef | null>(null);
  const [tick, setTick] = useState(0);
  const [progress, setProgress] = useState<PdfProgress | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const ready = useRef<((el: HTMLDivElement) => void) | null>(null);

  useLayoutEffect(() => {
    if (!slide || !frameRef.current) return;
    ready.current?.(frameRef.current);
  }, [slide, tick]);

  const exportSlides = useCallback(
    async (slides: SlideDef[], opts: { title: string; filename: string }) => {
      if (slides.length === 0) return;
      setProgress({ current: 0, total: slides.length });
      const pdf = await createPdfWriter(opts.title);
      try {
        for (let i = 0; i < slides.length; i++) {
          setProgress({ current: i + 1, total: slides.length });
          await new Promise<HTMLDivElement>((resolve, reject) => {
            const timeout = window.setTimeout(
              () =>
                reject(new Error("Tidsavbrudd mens sliden ble tegnet.")),
              20000
            );
            ready.current = (node) => {
              window.clearTimeout(timeout);
              resolve(node);
            };
            setSlide(slides[i]);
            setTick(i + 1);
          });
          await waitForPaint();
          const node = frameRef.current;
          if (!node) throw new Error("Fant ikke sliden som skulle eksporteres.");
          await pdf.addImage(await captureSlidePng(node));
        }
        await pdf.save(opts.filename);
      } finally {
        ready.current = null;
        setSlide(null);
        setTick(0);
        setProgress(null);
      }
    },
    []
  );

  const captureNode = (
    <>
      {slide && (
        <div
          className={styles.host}
          key={`${slide.id}-${tick}`}
          aria-hidden
        >
          <div ref={frameRef} className={styles.frame}>
            <SlideSurface slide={slide} step={lastStepOf(slide)} />
          </div>
        </div>
      )}
      {progress && (
        <div className={styles.progressToast} role="status">
          Lager PDF… {progress.current} / {progress.total}
        </div>
      )}
    </>
  );

  return { exportSlides, captureNode, progress, exporting: progress !== null };
}
