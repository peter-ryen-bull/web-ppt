"use client";

import { getFontEmbedCSS, toPng } from "html-to-image";
import { PDFDocument } from "pdf-lib";
import { SLIDE_H, SLIDE_W } from "./SlideCanvas";

/** Widescreen 16:9 i PDF-punkter (13,333" × 7,5"). */
const PDF_PAGE_W_PT = 960;
const PDF_PAGE_H_PT = 540;
const SLIDE_CREAM = "#fbf0e5";

export function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function waitForImages(root: HTMLElement): Promise<void> {
  const imgs = [...root.querySelectorAll("img")];
  return Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  ).then(() => undefined);
}

/** Stopp SMIL-animasjoner og CSS-overganger, slik at eksporten blir ett stillbilde. */
export function freezeVisuals(root: HTMLElement) {
  root.querySelectorAll("svg").forEach((svg) => {
    try {
      (svg as SVGSVGElement).pauseAnimations();
    } catch {
      /* noen SVG-er støtter det ikke */
    }
  });
  root.querySelectorAll<HTMLElement>("*").forEach((node) => {
    node.style.transition = "none";
    node.style.animation = "none";
    node.style.animationPlayState = "paused";
  });
}

/** Kopier :root-variabler og font-klasser inn på noden som skal fanges. */
const THEME_VARS = [
  "--cream",
  "--cream-dark",
  "--burgundy",
  "--burgundy-2",
  "--red",
  "--red-deep",
  "--teal",
  "--mint",
  "--divider",
  "--font-serif",
  "--font-sans",
  "--font-manrope-stack",
  "--font-gelica",
  "--font-dm-sans",
  "--font-manrope",
];

export function copyDocumentTheme(el: HTMLElement) {
  const html = document.documentElement;
  for (const cls of html.classList) el.classList.add(cls);
  const src = getComputedStyle(html);
  for (const name of THEME_VARS) {
    const value = src.getPropertyValue(name);
    if (value) el.style.setProperty(name, value);
  }
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const comma = dataUrl.indexOf(",");
  const binary = atob(comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(bytes)], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

let fontEmbedCss: string | null = null;

export async function captureSlidePng(el: HTMLElement): Promise<string> {
  copyDocumentTheme(el);
  freezeVisuals(el);
  await document.fonts.ready;
  await waitForImages(el);
  await waitForPaint();

  if (fontEmbedCss === null) {
    fontEmbedCss = await getFontEmbedCSS(el);
  }
  return toPng(el, {
    width: SLIDE_W,
    height: SLIDE_H,
    canvasWidth: SLIDE_W * 2,
    canvasHeight: SLIDE_H * 2,
    pixelRatio: 2,
    backgroundColor: SLIDE_CREAM,
    cacheBust: true,
    fontEmbedCSS: fontEmbedCss,
    style: {
      transform: "none",
      left: "0",
      top: "0",
      margin: "0",
    },
  });
}

export async function createPdfWriter(title: string) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(title);

  return {
    async addImage(dataUrl: string) {
      const png = await pdf.embedPng(dataUrlToBytes(dataUrl));
      const page = pdf.addPage([PDF_PAGE_W_PT, PDF_PAGE_H_PT]);
      page.drawImage(png, {
        x: 0,
        y: 0,
        width: PDF_PAGE_W_PT,
        height: PDF_PAGE_H_PT,
      });
    },
    async save(filename: string) {
      downloadBytes(await pdf.save(), filename);
    },
  };
}
