"use client";

import { useEffect, useState } from "react";
import type { SlideDef } from "@/presentations";
import { StepContext } from "./steps";
import styles from "./SlideCanvas.module.css";

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

/** Skalerer 1280x720-lerretet til å fylle containeren (letterboxed). */
export function useContainerScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / SLIDE_W, r.height / SLIDE_H));
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return scale;
}

export function SlideCanvas({
  slide,
  scale,
  step,
}: {
  slide: SlideDef;
  scale: number;
  /** Gjeldende klikk-steg. Utelatt = vis alt (miniatyrer o.l.) */
  step?: number;
}) {
  const Slide = slide.component;
  return (
    <div
      className={styles.canvas}
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        transform: `scale(${scale})`,
      }}
    >
      <StepContext.Provider value={step ?? Number.POSITIVE_INFINITY}>
        <Slide />
      </StepContext.Provider>
    </div>
  );
}
