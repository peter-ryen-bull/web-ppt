"use client";

import { getFontEmbedCSS, toJpeg, toPng } from "html-to-image";
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

/** html-to-image tegner video til canvas og krasjer på .mov / ulastede frames. */
function isPdfCaptureNode(node: HTMLElement): boolean {
  return node.tagName !== "VIDEO";
}

/** Stopp SMIL-animasjoner og CSS-overganger, slik at eksporten blir ett stillbilde. */
export function freezeVisuals(root: HTMLElement) {
  root.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.remove();
  });
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

/**
 * `full`: PNG i dobbel oppløsning (skarp, men bilder gjør filen stor).
 * `compact`: JPEG i 1280×720 – typisk en brøkdel av størrelsen.
 */
export type PdfQuality = "full" | "compact";

export type SlideCapture = { dataUrl: string; format: "png" | "jpg" };

const COMPACT_JPEG_QUALITY = 0.75;

export async function captureSlide(
  el: HTMLElement,
  quality: PdfQuality = "full"
): Promise<SlideCapture> {
  copyDocumentTheme(el);
  freezeVisuals(el);
  // Safari dekoder store bilder asynkront og tegner dem ellers tomme i PDF-en.
  el.querySelectorAll("img").forEach((img) => {
    img.decoding = "sync";
  });
  await document.fonts.ready;
  await waitForImages(el);
  await waitForPaint();

  if (fontEmbedCss === null) {
    fontEmbedCss = await getFontEmbedCSS(el);
  }
  const ratio = quality === "compact" ? 1 : 2;
  const options = {
    width: SLIDE_W,
    height: SLIDE_H,
    canvasWidth: SLIDE_W * ratio,
    canvasHeight: SLIDE_H * ratio,
    pixelRatio: ratio,
    backgroundColor: SLIDE_CREAM,
    cacheBust: true,
    fontEmbedCSS: fontEmbedCss,
    filter: isPdfCaptureNode,
    style: {
      transform: "none",
      left: "0",
      top: "0",
      margin: "0",
    },
  };
  if (quality === "compact") {
    return {
      dataUrl: await toJpeg(el, { ...options, quality: COMPACT_JPEG_QUALITY }),
      format: "jpg",
    };
  }
  return { dataUrl: await toPng(el, options), format: "png" };
}

export async function createPdfWriter(title: string) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(title);

  return {
    async addImage({ dataUrl, format }: SlideCapture) {
      const bytes = dataUrlToBytes(dataUrl);
      const image =
        format === "jpg" ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);
      const page = pdf.addPage([PDF_PAGE_W_PT, PDF_PAGE_H_PT]);
      page.drawImage(image, {
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
