import { spawn } from "child_process";
import { accessSync, constants } from "fs";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";
import { getPresentation } from "@/presentations";
import {
  buildDeeplink,
  buildPrompt,
  DEEPLINK_MAX_CHARS,
  type PromptRequest,
} from "./buildPrompt";

/*
 * Prompt Cursor fra presentasjonsappen (kun dev-modus).
 *
 * To transportmåter:
 *  - "cli":      kjører Cursor CLI (`agent -p --force …`) i repo-roten og
 *                strømmer NDJSON-hendelsene tilbake til nettleseren. Krever
 *                at CLI-en er installert (curl https://cursor.com/install -fsS | bash)
 *                og innlogget (`agent login`). Overstyr binærsti med
 *                CURSOR_AGENT_BIN.
 *  - "deeplink": åpner Cursor-appen med prompten ferdig utfylt i en ny chat
 *                (cursor://anysphere.cursor-deeplink/prompt?text=…).
 */

export const dynamic = "force-dynamic";

const SAFE_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const MAX_PROMPT_CHARS = 20_000;

function isExecutable(file: string): boolean {
  try {
    accessSync(file, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

/** Finn Cursor CLI: CURSOR_AGENT_BIN, PATH, eller standard installasjonssti. */
function findAgentBinary(): string | null {
  const override = process.env.CURSOR_AGENT_BIN;
  if (override) return isExecutable(override) ? override : null;
  const names = ["agent", "cursor-agent"];
  const dirs = [
    ...(process.env.PATH ?? "").split(path.delimiter).filter(Boolean),
    path.join(os.homedir(), ".local", "bin"),
    "/usr/local/bin",
    "/opt/homebrew/bin",
  ];
  for (const dir of dirs) {
    for (const name of names) {
      const full = path.join(dir, name);
      if (isExecutable(full)) return full;
    }
  }
  return null;
}

function readAuthStatus(bin: string): Promise<boolean> {
  return new Promise((resolve) => {
    const proc = spawn(bin, ["status", "--format", "json"], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    const timer = setTimeout(() => {
      if (proc.exitCode === null) proc.kill("SIGTERM");
      resolve(false);
    }, 4000);
    proc.stdout?.setEncoding("utf8");
    proc.stdout?.on("data", (chunk: string) => {
      out += chunk;
    });
    const done = (value: boolean) => {
      clearTimeout(timer);
      resolve(value);
    };
    proc.on("error", () => done(false));
    proc.on("close", () => {
      try {
        const data = JSON.parse(out) as { isAuthenticated?: boolean };
        done(data.isAuthenticated === true);
      } catch {
        done(false);
      }
    });
  });
}

function runLogin(bin: string, signal: AbortSignal): Promise<{ ok: boolean; error?: string }> {
  return new Promise((resolve) => {
    const proc = spawn(bin, ["login"], { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr?.setEncoding("utf8");
    proc.stderr?.on("data", (chunk: string) => {
      stderr = (stderr + chunk).slice(-2000);
    });
    const onAbort = () => {
      if (proc.exitCode === null) proc.kill("SIGTERM");
    };
    signal.addEventListener("abort", onAbort);
    proc.on("error", (err) => {
      signal.removeEventListener("abort", onAbort);
      resolve({ ok: false, error: err.message });
    });
    proc.on("close", (code) => {
      signal.removeEventListener("abort", onAbort);
      if (code === 0) resolve({ ok: true });
      else resolve({ ok: false, error: stderr.trim() || `agent login avsluttet med kode ${code}` });
    });
  });
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Kun i utviklingsmodus." }, { status: 403 });
  }
  const bin = findAgentBinary();
  const authenticated = bin ? await readAuthStatus(bin) : false;
  return NextResponse.json({
    cli: bin !== null,
    authenticated,
    bin,
    platform: process.platform,
  });
}

type Body = {
  presentationId?: unknown;
  prompt?: unknown;
  view?: unknown;
  overview?: unknown;
  current?: unknown;
  slideIds?: unknown;
  components?: unknown;
  url?: unknown;
  transport?: unknown;
  chatId?: unknown;
};

function parseBody(body: Body):
  | {
      ok: true;
      req: PromptRequest;
      transport: "cli" | "deeplink" | "preview";
      chatId: string | null;
    }
  | { ok: false; error: string; status: number } {
  const presentationId =
    typeof body.presentationId === "string" ? body.presentationId : "";
  if (!SAFE_ID.test(presentationId)) {
    return { ok: false, error: "Mangler gyldig presentationId.", status: 400 };
  }
  const presentation = getPresentation(presentationId);
  if (!presentation) {
    return { ok: false, error: `Ukjent presentasjon ${presentationId}.`, status: 404 };
  }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return { ok: false, error: "Prompten er tom.", status: 400 };
  if (prompt.length > MAX_PROMPT_CHARS) {
    return { ok: false, error: "Prompten er for lang.", status: 400 };
  }
  const transport =
    body.transport === "deeplink"
      ? "deeplink"
      : body.transport === "preview"
        ? "preview"
        : "cli";
  const view = body.view === "presenter" ? "presenter" : "deck";
  const overview = body.overview === true;

  let current: PromptRequest["current"] = null;
  if (body.current && typeof body.current === "object") {
    const c = body.current as { index?: unknown; step?: unknown };
    const index = typeof c.index === "number" ? Math.floor(c.index) : -1;
    const step = typeof c.step === "number" ? Math.max(0, Math.floor(c.step)) : 0;
    if (index >= 0 && index < presentation.slides.length) current = { index, step };
  }

  const known = new Set(presentation.slides.map((s) => s.id));
  const slideIds = Array.isArray(body.slideIds)
    ? body.slideIds.filter(
        (id): id is string => typeof id === "string" && known.has(id)
      )
    : [];

  const components: Record<string, string> = {};
  if (body.components && typeof body.components === "object") {
    for (const [id, name] of Object.entries(body.components as Record<string, unknown>)) {
      if (known.has(id) && typeof name === "string" && name.length <= 80) {
        components[id] = name;
      }
    }
  }

  const url =
    typeof body.url === "string" && /^https?:\/\//.test(body.url) && body.url.length < 500
      ? body.url
      : null;
  const chatId =
    typeof body.chatId === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(body.chatId)
      ? body.chatId
      : null;

  return {
    ok: true,
    transport,
    chatId,
    req: { presentation, prompt, view, overview, current, slideIds, components, url },
  };
}

function openExternally(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const cmd =
      process.platform === "darwin"
        ? ["open", [url]]
        : process.platform === "win32"
          ? ["cmd", ["/c", "start", "", url]]
          : ["xdg-open", [url]];
    try {
      const child = spawn(cmd[0] as string, cmd[1] as string[], {
        stdio: "ignore",
        detached: true,
      });
      child.on("error", () => resolve(false));
      child.on("exit", (code) => resolve(code === 0));
      child.unref();
    } catch {
      resolve(false);
    }
  });
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Kun i utviklingsmodus." }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON." }, { status: 400 });
  }

  if (body.transport === "login") {
    const bin = findAgentBinary();
    if (!bin) {
      return NextResponse.json(
        {
          error:
            "Fant ikke Cursor CLI (`agent`). Installer med `curl https://cursor.com/install -fsS | bash` og start dev-serveren på nytt.",
          code: "cli-missing",
        },
        { status: 409 }
      );
    }
    const result = await runLogin(bin, req.signal);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? "Innlogging avbrutt.", code: "cli-login-failed" },
        { status: 409 }
      );
    }
    return NextResponse.json({ transport: "login", authenticated: true });
  }

  const parsed = parseBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const fullPrompt = buildPrompt(parsed.req);

  // Forhåndsvisning: bare bygg prompten, ikke send den noe sted.
  if (parsed.transport === "preview") {
    return NextResponse.json({ transport: "preview", prompt: fullPrompt });
  }

  if (parsed.transport === "deeplink") {
    const url = buildDeeplink(fullPrompt);
    if (url.length > DEEPLINK_MAX_CHARS) {
      return NextResponse.json(
        {
          error: `Prompten med kontekst blir ${url.length} tegn URL-kodet – Cursor godtar maks ${DEEPLINK_MAX_CHARS} i en deeplink. Velg færre slides eller bruk CLI-en.`,
        },
        { status: 413 }
      );
    }
    const opened = await openExternally(url);
    return NextResponse.json({ transport: "deeplink", url, opened, prompt: fullPrompt });
  }

  const bin = findAgentBinary();
  if (!bin) {
    return NextResponse.json(
      {
        error:
          "Fant ikke Cursor CLI (`agent`). Installer med `curl https://cursor.com/install -fsS | bash`, kjør `agent login`, og start dev-serveren på nytt – eller bruk «Åpne i Cursor».",
        code: "cli-missing",
      },
      { status: 409 }
    );
  }
  if (!(await readAuthStatus(bin))) {
    return NextResponse.json(
      {
        error:
          "Cursor CLI er ikke innlogget. Trykk «Logg inn» her, eller kjør `agent login` i en terminal.",
        code: "cli-unauthenticated",
      },
      { status: 409 }
    );
  }

  const cwd = process.cwd();
  const args = [
    "-p",
    "--force",
    "--trust",
    "--workspace",
    cwd,
    "--output-format",
    "stream-json",
    "--stream-partial-output",
  ];
  if (parsed.chatId) args.push("--resume", parsed.chatId);
  args.push(fullPrompt);

  const encoder = new TextEncoder();
  let child: ReturnType<typeof spawn> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const emit = (obj: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      };
      const finish = () => {
        if (closed) return;
        closed = true;
        controller.close();
      };

      emit({ type: "meta", transport: "cli", bin, cwd, prompt: fullPrompt });

      const proc = spawn(bin, args, {
        cwd,
        env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
        stdio: ["ignore", "pipe", "pipe"],
      });
      child = proc;

      // Send bare hele linjer videre, så våre egne meta-linjer ikke
      // havner midt i en JSON-linje fra CLI-en.
      let buffered = "";
      proc.stdout?.setEncoding("utf8");
      proc.stdout?.on("data", (chunk: string) => {
        buffered += chunk;
        let nl: number;
        while ((nl = buffered.indexOf("\n")) >= 0) {
          const line = buffered.slice(0, nl).trim();
          buffered = buffered.slice(nl + 1);
          if (!line || closed) continue;
          controller.enqueue(encoder.encode(line + "\n"));
        }
      });

      let stderr = "";
      proc.stderr?.setEncoding("utf8");
      proc.stderr?.on("data", (chunk: string) => {
        stderr = (stderr + chunk).slice(-4000);
      });

      proc.on("error", (err) => {
        emit({ type: "exit", code: null, error: err.message, stderr });
        finish();
      });
      proc.on("close", (code, signal) => {
        if (buffered.trim() && !closed) {
          controller.enqueue(encoder.encode(buffered.trim() + "\n"));
        }
        emit({ type: "exit", code, signal, stderr });
        finish();
      });

      req.signal.addEventListener("abort", () => {
        if (proc.exitCode === null) proc.kill("SIGTERM");
      });
    },
    cancel() {
      if (child && child.exitCode === null) child.kill("SIGTERM");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
