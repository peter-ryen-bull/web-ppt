"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SlideDef } from "@/presentations";
import { SlideSurface } from "./SlideCanvas";
import styles from "./SlidePreload.module.css";

/** Varm opp bilder og skrifter uten å starte den kommende live-sliden. */
export function SlidePreload({ slide }: { slide?: SlideDef }) {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<ShadowRoot | null>(null);
  const [preparedSlide, setPreparedSlide] = useState<SlideDef>();

  // La den synlige sliden tegnes først. Behold den forrige forhåndslastingen
  // gjennom byttet, slik at bildene fortsatt finnes i dekodingsbufferen.
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setPreparedSlide(slide), { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setPreparedSlide(slide), 0);
    return () => window.clearTimeout(id);
  }, [slide]);

  // Isoler SVG-id-er og CSS fra sliden som vises på skjermen.
  useLayoutEffect(() => {
    const host = ref.current;
    if (host) setTarget(host.shadowRoot ?? host.attachShadow({ mode: "open" }));
  }, [preparedSlide?.id]);

  useEffect(() => {
    const root = target;
    if (!root) return;

    for (const image of root.querySelectorAll("img")) {
      image.loading = "eager";
      void image.decode().catch(() => {});
    }

    // Last også skrifter som først brukes på neste slide.
    const fonts = new Map<string, string>();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      const parent = node.parentElement;
      if (!text || !parent || parent.closest("style, script")) continue;
      const style = getComputedStyle(parent);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      fonts.set(font, (fonts.get(font) ?? "") + text);
    }
    for (const [font, text] of fonts) {
      void document.fonts.load(font, text).catch(() => {});
    }
    for (const svg of root.querySelectorAll("svg")) svg.pauseAnimations();
  }, [preparedSlide, target]);

  if (!preparedSlide) return null;
  return (
    <div
      ref={ref}
      className={styles.preload}
      aria-hidden="true"
      inert
      data-slide-preload={preparedSlide.id}
    >
      {target && createPortal(
        <>
          <style>{`* { box-sizing: border-box; margin: 0; padding: 0; animation: none !important; transition: none !important; }`}</style>
          <SlideSurface slide={preparedSlide} />
        </>,
        target
      )}
    </div>
  );
}
