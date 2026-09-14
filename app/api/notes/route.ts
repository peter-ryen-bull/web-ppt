import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { replaceNoteSection, upsertNoteSection } from "@/presentations/notes";

const SAFE_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const MAX_NOTES_CHARS = 100_000;

type Body = {
  presentationId?: unknown;
  slideId?: unknown;
  chapterId?: unknown;
  slideName?: unknown;
  notes?: unknown;
};

function presentationsRoot(): string {
  return path.join(process.cwd(), "presentations");
}

function collectNotesFiles(presentationId: string): {
  root: string;
  nested: string[];
} {
  const dir = path.join(presentationsRoot(), presentationId);
  const root = path.join(dir, "notes.md");
  const nested: string[] = [];

  const walk = (current: string) => {
    if (!existsSync(current)) return;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "notes.md" && full !== root) nested.push(full);
    }
  };
  walk(dir);

  return { root, nested };
}

function headingIds(
  slideId: string,
  chapterId: string | undefined
): { exact: string; stripped: string | null } {
  const prefix = chapterId ? `${chapterId}-` : "";
  const stripped =
    prefix &&
    slideId.startsWith(prefix) &&
    slideId.length > prefix.length
      ? slideId.slice(prefix.length)
      : null;
  return { exact: slideId, stripped };
}

function writeNotes(file: string, contents: string): string {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents, "utf8");
  return path.relative(process.cwd(), file);
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Notater kan bare redigeres i utviklingsmodus." },
      { status: 403 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON." }, { status: 400 });
  }

  const presentationId =
    typeof body.presentationId === "string" ? body.presentationId : "";
  const slideId = typeof body.slideId === "string" ? body.slideId : "";
  const chapterId =
    typeof body.chapterId === "string" && SAFE_ID.test(body.chapterId)
      ? body.chapterId
      : undefined;
  const slideName =
    typeof body.slideName === "string" ? body.slideName : undefined;
  const notes = typeof body.notes === "string" ? body.notes : null;

  if (!SAFE_ID.test(presentationId) || !SAFE_ID.test(slideId) || notes === null) {
    return NextResponse.json(
      { error: "Mangler gyldig presentationId, slideId eller notes." },
      { status: 400 }
    );
  }
  if (notes.length > MAX_NOTES_CHARS) {
    return NextResponse.json(
      { error: "Notatet er for langt." },
      { status: 400 }
    );
  }

  const presentationDir = path.join(presentationsRoot(), presentationId);
  if (!existsSync(presentationDir)) {
    return NextResponse.json(
      { error: `Fant ikke presentasjonsmappen ${presentationId}.` },
      { status: 404 }
    );
  }

  const { exact, stripped } = headingIds(slideId, chapterId);
  const { root, nested } = collectNotesFiles(presentationId);

  const tryReplace = (file: string, headingId: string): string | null => {
    if (!existsSync(file)) return null;
    const raw = readFileSync(file, "utf8");
    const updated = replaceNoteSection(raw, headingId, notes);
    if (updated === null) return null;
    if (updated !== raw) writeNotes(file, updated);
    return path.relative(process.cwd(), file);
  };

  for (const file of [root, ...nested]) {
    const saved = tryReplace(file, exact);
    if (saved) return NextResponse.json({ ok: true, file: saved });
  }

  if (stripped) {
    const chapterFile = nested.find((file) =>
      file.endsWith(`${path.sep}${chapterId}${path.sep}notes.md`)
    );
    const nestedOrder = chapterFile
      ? [chapterFile, ...nested.filter((file) => file !== chapterFile)]
      : nested;
    for (const file of nestedOrder) {
      const saved = tryReplace(file, stripped);
      if (saved) return NextResponse.json({ ok: true, file: saved });
    }
  }

  const created = !existsSync(root);
  const raw = created ? "" : readFileSync(root, "utf8");
  const updated = upsertNoteSection(raw, exact, notes, slideName);
  const file = writeNotes(root, updated);
  return NextResponse.json({ ok: true, file, created });
}
