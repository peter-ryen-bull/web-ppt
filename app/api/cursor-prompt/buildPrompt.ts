import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import type { PresentationDef, SlideDef } from "@/presentations";
import { isInProgress } from "@/presentations";
import { chapterOf } from "@/presentations/chapters";

/*
 * Bygger prompten som sendes til Cursor fra presentasjonsappen: brukerens
 * tekst + metadata om hvor den ble sendt fra (presentasjon, slide, kapittel,
 * kildefiler). Kun server-side – leser kildefiler for å finne hvor sliden og
 * komponenten er definert.
 */

export type PromptView = "deck" | "presenter";

export type PromptRequest = {
  presentation: PresentationDef;
  prompt: string;
  view: PromptView;
  /** Sendt fra slideoversikten – da er slideIds konteksten (kan være tom). */
  overview: boolean;
  current: { index: number; step: number } | null;
  slideIds: string[];
  /** slide-id → komponentnavn (fra component.name i nettleseren) */
  components: Record<string, string>;
  url: string | null;
};

type FileRef = { file: string; line: number };

type SourceFile = { rel: string; text: string };

const SOURCE_EXT = new Set([".ts", ".tsx"]);

function listSourceFiles(dirAbs: string, root: string): SourceFile[] {
  const out: SourceFile[] = [];
  const walk = (current: string) => {
    if (!existsSync(current)) return;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (SOURCE_EXT.has(path.extname(entry.name))) {
        if (statSync(full).size > 2_000_000) continue;
        out.push({
          rel: path.relative(root, full).split(path.sep).join("/"),
          text: readFileSync(full, "utf8"),
        });
      }
    }
  };
  walk(dirAbs);
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lineOf(text: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

function findInFiles(files: SourceFile[], re: RegExp): FileRef | null {
  for (const f of files) {
    const m = re.exec(f.text);
    if (m) return { file: f.rel, line: lineOf(f.text, m.index) };
  }
  return null;
}

function slideDefPattern(slideId: string): RegExp {
  return new RegExp(`\\bid:\\s*["'\`]${escapeRegExp(slideId)}["'\`]`);
}

function componentPattern(name: string): RegExp {
  const n = escapeRegExp(name);
  return new RegExp(
    `^[ \\t]*(?:export\\s+)?(?:default\\s+)?(?:async\\s+)?(?:function\\s+${n}\\b|(?:const|let|var)\\s+${n}\\b)`,
    "m"
  );
}

/** Slide-id-er fra embedAsChapter er prefikset med kapittel-id – prøv uten. */
function candidateSlideIds(slide: SlideDef): string[] {
  const ids = [slide.id];
  const prefix = slide.chapterId ? `${slide.chapterId}-` : "";
  if (prefix && slide.id.startsWith(prefix) && slide.id.length > prefix.length) {
    ids.push(slide.id.slice(prefix.length));
  }
  return ids;
}

class SourceIndex {
  private cache = new Map<string, SourceFile[]>();
  constructor(private root: string) {}

  files(relDir: string): SourceFile[] {
    let files = this.cache.get(relDir);
    if (!files) {
      files = listSourceFiles(path.join(this.root, relDir), this.root);
      this.cache.set(relDir, files);
    }
    return files;
  }

  /** Søk i presentasjonsmappen først, så i alle presentasjoner og components/. */
  find(presentationId: string, re: RegExp): FileRef | null {
    const own = this.files(`presentations/${presentationId}`);
    const hit = findInFiles(own, re);
    if (hit) return hit;
    const ownSet = new Set(own.map((f) => f.rel));
    const rest = [
      ...this.files("presentations").filter((f) => !ownSet.has(f.rel)),
      ...this.files("components"),
    ];
    return findInFiles(rest, re);
  }
}

function ref(r: FileRef | null): string | null {
  return r ? `${r.file}:${r.line}` : null;
}

function describeSlide(
  req: PromptRequest,
  index: SourceIndex,
  slide: SlideDef,
  i: number,
  opts: { step?: number; detailed: boolean }
): string[] {
  const p = req.presentation;
  const chapter = chapterOf(p, slide.chapterId);
  const head = [
    `${i + 1} av ${p.slides.length} – «${slide.name}» (id \`${slide.id}\``,
    chapter ? `, kapittel «${chapter.title}» (\`${chapter.id}\`)` : "",
    opts.step !== undefined && (slide.steps ?? 0) > 0
      ? `, klikk-steg ${opts.step} av ${slide.steps}`
      : (slide.steps ?? 0) > 0
        ? `, ${slide.steps} klikk-steg`
        : "",
    ")",
  ].join("");

  let def: FileRef | null = null;
  for (const id of candidateSlideIds(slide)) {
    def = index.find(p.id, slideDefPattern(id));
    if (def) break;
  }
  const componentName =
    req.components[slide.id] && /^[A-Za-z_$][\w$]*$/.test(req.components[slide.id])
      ? req.components[slide.id]
      : null;
  const comp = componentName
    ? index.find(p.id, componentPattern(componentName))
    : null;

  if (!opts.detailed) {
    const parts = [head];
    if (def) parts.push(`definisjon ${ref(def)}`);
    if (componentName) {
      parts.push(
        comp ? `komponent \`${componentName}\` i ${ref(comp)}` : `komponent \`${componentName}\``
      );
    }
    return [`- ${parts.join(" · ")}`];
  }

  const lines = [`Gjeldende slide: ${head}`];
  lines.push(
    def
      ? `- Slide-definisjon: ${ref(def)}`
      : `- Slide-definisjon: fant ikke \`id: "${slide.id}"\` i kildefilene`
  );
  if (componentName) {
    lines.push(
      comp
        ? `- Komponent \`${componentName}\`: ${ref(comp)}`
        : `- Komponent \`${componentName}\` (fant ikke definisjonen – søk etter navnet)`
    );
  }
  lines.push(
    slide.notes?.trim()
      ? `- Speaker notes: seksjonen \`## ${slide.id}\` i presentations/${p.id}/notes.md`
      : `- Speaker notes: ingen ennå (legg ev. til \`## ${slide.id}\` i presentations/${p.id}/notes.md)`
  );
  return lines;
}

export function buildPrompt(req: PromptRequest, root = process.cwd()): string {
  const p = req.presentation;
  const index = new SourceIndex(root);
  const viewLabel = req.overview
    ? `slideoversikten i ${req.view === "presenter" ? "presentatørvisningen" : "øvingsvisningen"}`
    : req.view === "presenter"
      ? "presentatørvisningen"
      : "øvingsvisningen";

  const lines: string[] = [];
  lines.push(req.prompt.trim());
  lines.push("");
  lines.push("---");
  lines.push(
    `Kontekst fra presentasjonsappen (sendt fra ${viewLabel}). Repo-roten er arbeidsmappen; AGENTS.md og README.md beskriver regler og struktur.`
  );
  lines.push("");
  lines.push(`Presentasjon: «${p.title}» (id \`${p.id}\`)`);
  lines.push(`- Mappe: presentations/${p.id}/`);
  lines.push(
    `- Speaker notes: presentations/${p.id}/notes.md (én \`## <slide-id>\`-seksjon per slide)`
  );
  if (!isInProgress(p)) {
    lines.push(
      "- Status: arkivert/holdt. Ikke rediger slides, notes.md eller media. Gjenbruk ved å kopiere eller `embedAsChapter`."
    );
  } else {
    lines.push("- Status: under arbeid.");
  }
  if (req.url) lines.push(`- Åpen i nettleseren: ${req.url}`);
  lines.push("");

  if (req.overview) {
    const chosen = req.slideIds
      .map((id) => p.slides.findIndex((s) => s.id === id))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b);
    if (chosen.length) {
      lines.push(
        `Valgte slides som kontekst (${chosen.length} av ${p.slides.length}):`
      );
      for (const i of chosen) {
        lines.push(
          ...describeSlide(req, index, p.slides[i], i, { detailed: false })
        );
      }
    } else {
      lines.push(
        "Ingen slides er valgt – prompten gjelder presentasjonen som helhet."
      );
      if (p.chapters?.length) {
        lines.push(
          `Kapitler: ${p.chapters
            .map((c) => `«${c.title}» (\`${c.id}\`, ${c.slides.length} slides)`)
            .join(", ")}.`
        );
      }
    }
    if (req.current && p.slides[req.current.index]) {
      const cur = p.slides[req.current.index];
      lines.push(
        `Sist viste slide: ${req.current.index + 1}. «${cur.name}» (id \`${cur.id}\`).`
      );
    }
  } else if (req.current && p.slides[req.current.index]) {
    lines.push(
      ...describeSlide(req, index, p.slides[req.current.index], req.current.index, {
        step: req.current.step,
        detailed: true,
      })
    );
  }

  lines.push("");
  lines.push(
    "Slides er React-komponenter på et fast 1280×720-lerret. Gjør endringene direkte i filene – dev-serveren kjører allerede og laster dem inn live, så ikke start en ny. Gjelder prompten notater, rediger notes.md; gjelder den innholdet på sliden, rediger komponenten."
  );
  return lines.join("\n");
}

export function buildDeeplink(prompt: string): string {
  return `cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent(prompt)}`;
}

/** Cursor godtar deeplinks på inntil ca. 8000 tegn (URL-kodet). */
export const DEEPLINK_MAX_CHARS = 8000;
