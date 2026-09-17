import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { after, NextResponse } from "next/server";
import { getPresentation, isInProgress } from "@/presentations";
import { isCopyPath, setCopyFieldInYaml, yamlHasSlide } from "@/presentations/copy";

const SAFE_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const MAX_VALUE_CHARS = 20_000;

type Body = {
  presentationId?: unknown;
  slideId?: unknown;
  chapterId?: unknown;
  path?: unknown;
  value?: unknown;
};

function presentationsRoot(): string {
  return path.join(process.cwd(), "presentations");
}

function collectCopyFiles(presentationId: string): {
  root: string;
  nested: string[];
} {
  const dir = path.join(presentationsRoot(), presentationId);
  const root = path.join(dir, "copy.yaml");
  const nested: string[] = [];

  const walk = (current: string) => {
    if (!existsSync(current)) return;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "copy.yaml" && full !== root) nested.push(full);
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
    prefix && slideId.startsWith(prefix) && slideId.length > prefix.length
      ? slideId.slice(prefix.length)
      : null;
  return { exact: slideId, stripped };
}

function writeCopy(file: string, contents: string): string {
  after(() => {
    writeFileSync(file, contents, "utf8");
  });
  return path.relative(process.cwd(), file);
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Tekst kan bare redigeres i utviklingsmodus." },
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
  const fieldPath = typeof body.path === "string" ? body.path : "";
  const value = typeof body.value === "string" ? body.value : null;

  if (!SAFE_ID.test(presentationId) || !SAFE_ID.test(slideId) || value === null) {
    return NextResponse.json(
      { error: "Mangler gyldig presentationId, slideId eller value." },
      { status: 400 }
    );
  }
  if (!isCopyPath(fieldPath)) {
    return NextResponse.json({ error: "Ugyldig feltsti." }, { status: 400 });
  }
  if (value.length > MAX_VALUE_CHARS) {
    return NextResponse.json({ error: "Teksten er for lang." }, { status: 400 });
  }

  const presentation = getPresentation(presentationId);
  if (!presentation) {
    return NextResponse.json(
      { error: `Fant ikke presentasjonen ${presentationId}.` },
      { status: 404 }
    );
  }
  if (!isInProgress(presentation)) {
    return NextResponse.json(
      { error: "Arkiverte presentasjoner kan ikke redigeres." },
      { status: 403 }
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
  const { root, nested } = collectCopyFiles(presentationId);

  const tryWrite = (file: string, yamlSlideId: string): string | null => {
    if (!existsSync(file)) return null;
    const raw = readFileSync(file, "utf8");
    if (!yamlHasSlide(raw, yamlSlideId)) return null;
    const updated = setCopyFieldInYaml(raw, yamlSlideId, fieldPath, value);
    if (updated === null) return null;
    if (updated !== raw) writeCopy(file, updated);
    return path.relative(process.cwd(), file);
  };

  for (const file of [root, ...nested]) {
    const saved = tryWrite(file, exact);
    if (saved) return NextResponse.json({ ok: true, file: saved });
  }

  if (stripped) {
    const chapterFile = nested.find((file) =>
      file.endsWith(`${path.sep}${chapterId}${path.sep}copy.yaml`)
    );
    const nestedOrder = chapterFile
      ? [chapterFile, ...nested.filter((file) => file !== chapterFile)]
      : nested;
    for (const file of nestedOrder) {
      const saved = tryWrite(file, stripped);
      if (saved) return NextResponse.json({ ok: true, file: saved });
    }
  }

  return NextResponse.json(
    { error: `Fant ikke feltet ${fieldPath} for sliden ${slideId}.` },
    { status: 404 }
  );
}
