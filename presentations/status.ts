import type { PresentationDef } from "./types";

/** Dato fra id-prefikset `YY-MM-DD-…` (år 20YY). */
export function eventDateFromId(id: string): Date | null {
  const m = /^(\d{2})-(\d{2})-(\d{2})(?:-|$)/.exec(id);
  if (!m) return null;
  const year = 2000 + Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

/**
 * Under arbeid hvis `inProgress` er satt, ellers hvis id-datoen er i
 * fremtiden. `inProgress: false` tvinger arkiv også for kommende datoer.
 */
export function isInProgress(
  presentation: Pick<PresentationDef, "id" | "inProgress">,
  now = new Date(),
): boolean {
  if (presentation.inProgress === true) return true;
  if (presentation.inProgress === false) return false;
  const event = eventDateFromId(presentation.id);
  if (!event) return false;
  return startOfLocalDay(event) > startOfLocalDay(now);
}
