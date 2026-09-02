import type { SlideDef } from "./types";

/*
 * Speaker notes skrives i én markdown-fil per presentasjon (notes.md).
 *
 * Format:
 *   - `## <slide-id>` starter notatene for én slide. Tekst etter id-en i
 *     overskriften (f.eks. `## forside – Forside`) er kun til lesbarhet.
 *   - Alt før første `##`-overskrift ignoreres (kan brukes til kladd).
 *   - HTML-kommentarer (<!-- ... -->) fjernes og vises aldri.
 *   - Teksten vises som ren tekst i presentatørvisningen, med linjeskift
 *     bevart.
 */

export function parseNotes(raw: string): Record<string, string> {
  const withoutComments = raw.replace(/<!--[\s\S]*?-->/g, "");
  const notes: Record<string, string> = {};

  let currentId: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (currentId) {
      notes[currentId] = buffer.join("\n").trim();
    }
    buffer = [];
  };

  for (const line of withoutComments.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(\S+)/);
    if (heading) {
      flush();
      currentId = heading[1];
    } else if (currentId) {
      buffer.push(line);
    }
  }
  flush();

  return notes;
}

/**
 * Fletter notater fra en notes.md inn i slidene. Varsler i dev-modus om
 * notat-id-er som ikke matcher noen slide (typisk skrivefeil).
 */
export function withNotes(slides: SlideDef[], rawNotes: string): SlideDef[] {
  const notes = parseNotes(rawNotes);

  if (process.env.NODE_ENV !== "production") {
    const slideIds = new Set(slides.map((s) => s.id));
    for (const id of Object.keys(notes)) {
      if (!slideIds.has(id)) {
        console.warn(
          `[notes] Notat-id "${id}" matcher ingen slide – sjekk notes.md`
        );
      }
    }
  }

  return slides.map((s) => ({ ...s, notes: notes[s.id] ?? s.notes }));
}
