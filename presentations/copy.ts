import { parse as parseYaml, parseDocument } from "yaml";
import type { DeckCopy, SlideCopy, SlideDef, CopyValue } from "./types";

/*
 * Publikumstekst i copy.yaml, én seksjon per slide-id.
 *
 *   scene:
 *     line1: "Klokka er 03:14."
 *     items:
 *       - "Første punkt"
 *     omrader:
 *       - tittel: "Lostjenesten"
 *         tekst: "…"
 *
 * Feltstier mot et blad: `line1`, `items.0`, `omrader.0.tekst`.
 */

const COPY_PATH =
  /^[a-zA-Z][a-zA-Z0-9_-]*(?:\.(?:\d+|[a-zA-Z][a-zA-Z0-9_-]*))*$/;

export function isCopyPath(path: string): boolean {
  return COPY_PATH.test(path);
}

export function parseCopyPath(path: string): (string | number)[] {
  return path.split(".").map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asCopyValue(value: unknown): CopyValue | null {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    const items = value.map(asCopyValue);
    if (items.every((item) => item !== null)) return items as CopyValue[];
    return null;
  }
  if (isPlainObject(value)) {
    const obj: { [key: string]: CopyValue } = {};
    for (const [key, nested] of Object.entries(value)) {
      const parsed = asCopyValue(nested);
      if (parsed === null) return null;
      obj[key] = parsed;
    }
    return obj;
  }
  return null;
}

export function parseCopy(raw: string): DeckCopy {
  if (!raw.trim()) return {};
  const data = parseYaml(raw);
  if (!isPlainObject(data)) return {};
  const deck: DeckCopy = {};
  for (const [slideId, fields] of Object.entries(data)) {
    if (!isPlainObject(fields)) continue;
    const slide: SlideCopy = {};
    for (const [key, value] of Object.entries(fields)) {
      const field = asCopyValue(value);
      if (field !== null) slide[key] = field;
    }
    deck[slideId] = slide;
  }
  return deck;
}

/**
 * Fletter copy.yaml inn i slidene. Varsler i dev om nøkler uten slide.
 */
export function withCopy(slides: SlideDef[], raw: string): SlideDef[] {
  const deck = parseCopy(raw);

  if (process.env.NODE_ENV !== "production") {
    const slideIds = new Set(slides.map((s) => s.id));
    for (const id of Object.keys(deck)) {
      if (!slideIds.has(id)) {
        console.warn(
          `[copy] Slide-id "${id}" matcher ingen slide – sjekk copy.yaml`
        );
      }
    }
  }

  return slides.map((s) => ({ ...s, copy: deck[s.id] ?? s.copy }));
}

export function getCopyValue(
  copy: SlideCopy | undefined,
  path: string
): CopyValue | undefined {
  if (!copy || !isCopyPath(path)) return undefined;
  let current: unknown = copy;
  for (const part of parseCopyPath(path)) {
    if (current == null) return undefined;
    if (typeof part === "number") {
      if (!Array.isArray(current)) return undefined;
      current = current[part];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return asCopyValue(current) ?? undefined;
}

export function getCopyString(
  copy: SlideCopy | undefined,
  path: string
): string {
  const value = getCopyValue(copy, path);
  return typeof value === "string" ? value : "";
}

/** Antall elementer i en yaml-liste, ellers 0. */
export function copyLength(copy: SlideCopy | undefined, path: string): number {
  const value = getCopyValue(copy, path);
  return Array.isArray(value) ? value.length : 0;
}

export function getCopyStrings(
  copy: SlideCopy | undefined,
  path: string
): string[] {
  const value = getCopyValue(copy, path);
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function presentationHasCopy(
  presentation: Pick<{ hasCopy?: boolean }, "hasCopy">
): boolean {
  return Boolean(presentation.hasCopy);
}

export function yamlHasSlide(raw: string, slideId: string): boolean {
  if (!raw.trim()) return false;
  const doc = parseDocument(raw);
  return doc.getIn([slideId]) != null;
}

/**
 * Oppdaterer ett streng-blad i copy.yaml. Bevarer kommentarer og nøkkelrekkefølge.
 * Returnerer null hvis sliden eller stien ikke peker på en eksisterende streng.
 */
export function setCopyFieldInYaml(
  raw: string,
  slideId: string,
  path: string,
  value: string
): string | null {
  if (!isCopyPath(path)) return null;
  const doc = parseDocument(raw);
  const parts = [slideId, ...parseCopyPath(path)];
  const existing = doc.getIn(parts);
  if (typeof existing !== "string") return null;
  doc.setIn(parts, value);
  return doc.toString({ lineWidth: 0 });
}

export function copyPathFromParts(
  k: string,
  i?: number,
  field?: string
): string {
  const parts = [k];
  if (i != null) parts.push(String(i));
  if (field) parts.push(field);
  return parts.join(".");
}
