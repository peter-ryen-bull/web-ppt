import type { ChapterDef, PresentationDef, SlideDef } from "./types";
import { withNotes } from "./notes";

/**
 * Bygger en presentasjon der chapters er kilden, og slides er den
 * flate avspillingslisten. chapterId settes på hver slide.
 */
export function definePresentation(
  def: Omit<PresentationDef, "slides"> & {
    chapters: ChapterDef[];
    notes?: string;
  }
): PresentationDef {
  const { notes, ...rest } = def;
  const slides: SlideDef[] = rest.chapters.flatMap((ch) =>
    ch.slides.map((s) => ({ ...s, chapterId: ch.id }))
  );
  return {
    ...rest,
    slides: notes ? withNotes(slides, notes) : slides,
  };
}

/**
 * Legger en annen presentasjon inn som ett kapittel. Slide-id-er prefikses
 * så de ikke kolliderer med vertspresentasjonen.
 */
export function embedAsChapter(
  source: PresentationDef,
  opts: { id: string; title?: string; idPrefix?: string }
): ChapterDef {
  const prefix = opts.idPrefix ?? `${opts.id}-`;
  return {
    id: opts.id,
    title: opts.title ?? source.title,
    slides: source.slides.map((s) => ({
      ...s,
      id: `${prefix}${s.id}`,
      chapterId: undefined,
    })),
  };
}

export function chapterOf(
  presentation: PresentationDef,
  chapterId: string | undefined
): ChapterDef | undefined {
  if (!chapterId) return undefined;
  return presentation.chapters?.find((c) => c.id === chapterId);
}

export function isChapterFullyHidden(
  chapter: ChapterDef,
  hidden: Set<string>
): boolean {
  return (
    chapter.slides.length > 0 && chapter.slides.every((s) => hidden.has(s.id))
  );
}

export function toggleChapterHidden(
  chapter: ChapterDef,
  hidden: Set<string>
): Set<string> {
  const next = new Set(hidden);
  if (isChapterFullyHidden(chapter, hidden)) {
    for (const s of chapter.slides) next.delete(s.id);
  } else {
    for (const s of chapter.slides) next.add(s.id);
  }
  return next;
}
