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
 *     bevart. I dev-modus kan den redigeres der og skrives tilbake hit.
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function headingPattern(slideId: string): RegExp {
  return new RegExp(`^##\\s+${escapeRegExp(slideId)}(?:\\s|$)`);
}

/** Finner linjeindeksene for notatseksjonen til en slide (heading … neste ##). */
export function findNoteSection(
  raw: string,
  slideId: string
): { headingIndex: number; endIndex: number } | null {
  const lines = raw.split(/\r?\n/);
  const headingRe = headingPattern(slideId);
  let headingIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headingRe.test(lines[i])) {
      headingIndex = i;
      break;
    }
  }
  if (headingIndex === -1) return null;

  let endIndex = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    if (/^##\s+\S/.test(lines[i])) {
      endIndex = i;
      break;
    }
  }
  return { headingIndex, endIndex };
}

/**
 * Byttet ut brødteksten under `## <slide-id>` og bevarer overskriftslinjen.
 * Returnerer null hvis seksjonen ikke finnes.
 */
export function replaceNoteSection(
  raw: string,
  slideId: string,
  body: string
): string | null {
  const section = findNoteSection(raw, slideId);
  if (!section) return null;

  const lines = raw.split(/\r?\n/);
  const hadTrailingNewline = raw.endsWith("\n");
  const oldBody = lines
    .slice(section.headingIndex + 1, section.endIndex)
    .join("\n");
  const hiddenComments = [...oldBody.matchAll(/<!--[\s\S]*?-->/g)]
    .map((m) => m[0])
    .filter((comment) => !body.includes(comment));
  const withComments = hiddenComments.length
    ? `${hiddenComments.join("\n\n")}\n\n${body}`
    : body;
  const normalized = withComments.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const next: string[] = lines.slice(0, section.headingIndex + 1);

  if (normalized) {
    next.push("", ...normalized.split("\n"));
  }

  const after = lines.slice(section.endIndex);
  if (after.length > 0) {
    next.push("");
    next.push(...after);
  }

  let result = next.join("\n");
  if (hadTrailingNewline && !result.endsWith("\n")) {
    result += "\n";
  }
  return result;
}

/**
 * Oppdaterer en eksisterende seksjon, eller legger til en ny bakerst.
 */
export function upsertNoteSection(
  raw: string,
  slideId: string,
  body: string,
  headingLabel?: string
): string {
  const replaced = replaceNoteSection(raw, slideId, body);
  if (replaced !== null) return replaced;

  const heading = headingLabel
    ? `## ${slideId} – ${headingLabel}`
    : `## ${slideId}`;
  const normalized = body.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const section = normalized
    ? `${heading}\n\n${normalized}\n`
    : `${heading}\n`;
  const trimmed = raw.replace(/\s+$/, "");
  return trimmed ? `${trimmed}\n\n${section}` : section;
}
