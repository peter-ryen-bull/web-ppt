"use client";

import { useEffect, useRef, useState } from "react";
import { getPresentation } from "@/presentations";
import { SlideCanvas, useContainerScale } from "./SlideCanvas";
import { useSyncedDeck } from "./useSyncedDeck";
import styles from "./AudienceView.module.css";

/*
 * Publikumsvisning: viser KUN gjeldende slide – ingen knapper, teller
 * eller notater. Følger presentatørvisningen automatisk via
 * BroadcastChannel. Dette er vinduet som dras til den delte skjermen
 * (HDMI/prosjektor) og settes i fullskjerm med F.
 */
export default function AudienceView({
  presentationId,
}: {
  presentationId: string;
}) {
  const presentation = getPresentation(presentationId);
  if (!presentation) {
    throw new Error(`Ukjent presentasjon: ${presentationId}`);
  }

  const { slides, current, step, go } = useSyncedDeck(presentation);
  const stageRef = useRef<HTMLDivElement>(null);
  const scale = useContainerScale(stageRef);

  const [hintVisible, setHintVisible] = useState(true);
  const [cursorIdle, setCursorIdle] = useState(false);

  // Skjul fullskjerm-hintet etter noen sekunder, og når man er i fullskjerm
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 6000);
    const onFs = () => {
      if (document.fullscreenElement) setHintVisible(false);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      clearTimeout(t);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  // Skjul musepekeren når den står stille
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onMove = () => {
      setCursorIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setCursorIdle(true), 2500);
    };
    onMove();
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const toggleFullscreen = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    const onDblClick = () => toggleFullscreen();
    window.addEventListener("keydown", onKey);
    window.addEventListener("dblclick", onDblClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("dblclick", onDblClick);
    };
  }, [go]);

  return (
    <div className={`${styles.root} ${cursorIdle ? styles.noCursor : ""}`}>
      <div className={styles.stage} ref={stageRef}>
        <SlideCanvas slide={slides[current]} scale={scale} step={step} />
      </div>
      {hintVisible && (
        <div className={styles.hint}>
          Dra vinduet til den delte skjermen · F eller dobbeltklikk for
          fullskjerm
        </div>
      )}
    </div>
  );
}
