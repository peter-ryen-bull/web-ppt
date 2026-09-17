"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  copyLength,
  copyPathFromParts,
  getCopyString,
  getCopyValue,
} from "@/presentations/copy";
import type { SlideCopy, SlideDef } from "@/presentations/types";
import styles from "./Copy.module.css";

export type CopyEditProps = {
  presentationId: string;
  enabled: boolean;
  onEditingChange?: (editing: boolean) => void;
};

type MenuPos = { x: number; y: number };

type CopyContextValue = {
  presentationId: string | null;
  slideId: string;
  chapterId?: string;
  copy: SlideCopy;
  editable: boolean;
  overrides: Record<string, string>;
  setOverride: (path: string, value: string) => void;
  activePath: string | null;
  menuPos: MenuPos | null;
  setActivePath: (path: string | null, pos?: MenuPos) => void;
};

const CopyContext = createContext<CopyContextValue | null>(null);

export function CopyProvider({
  slide,
  copyEdit,
  children,
}: {
  slide: SlideDef;
  copyEdit?: CopyEditProps;
  children: ReactNode;
}) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [activePath, setActivePathState] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const onEditingChange = copyEdit?.onEditingChange;
  const copy = slide.copy;

  useEffect(() => {
    setOverrides((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const [path, value] of Object.entries(prev)) {
        if (getCopyString(copy, path) === value) {
          delete next[path];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [copy]);

  const setActivePath = useCallback(
    (path: string | null, pos?: MenuPos) => {
      setActivePathState(path);
      setMenuPos(path ? (pos ?? menuPos) : null);
      onEditingChange?.(path != null);
    },
    [onEditingChange, menuPos]
  );

  const setOverride = useCallback((path: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [path]: value }));
  }, []);

  const value = useMemo<CopyContextValue>(
    () => ({
      presentationId: copyEdit?.presentationId ?? null,
      slideId: slide.id,
      chapterId: slide.chapterId,
      copy: copy ?? {},
      editable: Boolean(copyEdit?.enabled && copyEdit.presentationId),
      overrides,
      setOverride,
      activePath,
      menuPos,
      setActivePath,
    }),
    [
      copyEdit?.enabled,
      copyEdit?.presentationId,
      slide.id,
      slide.chapterId,
      copy,
      overrides,
      setOverride,
      activePath,
      menuPos,
      setActivePath,
    ]
  );

  return (
    <CopyContext.Provider value={value}>{children}</CopyContext.Provider>
  );
}

export function useCopy(): SlideCopy {
  return useContext(CopyContext)?.copy ?? {};
}

export function useHasCopy(k: string): boolean {
  return getCopyValue(useCopy(), k) !== undefined;
}

/** Antall elementer i en yaml-liste (`items`, `cards`, …). */
export function useCopyCount(k: string): number {
  return copyLength(useCopy(), k);
}

export function Copy({
  k,
  i,
  field,
  path: pathProp,
  style,
  as: Tag = "span",
}: {
  k?: string;
  i?: number;
  field?: string;
  /** Full feltsti, f.eks. `rows.0.pills.1`. Overstyrer k/i/field. */
  path?: string;
  style?: CSSProperties;
  as?: "span" | "div";
}) {
  const ctx = useContext(CopyContext);
  const path = pathProp ?? copyPathFromParts(k ?? "text", i, field);
  const fromYaml = getCopyString(ctx?.copy, path);
  const text = ctx?.overrides[path] ?? fromYaml;
  const editable = Boolean(ctx?.editable);
  const heading = k === "title" || k === "kicker" || k === "subtitle";

  const onContextMenu = (event: React.MouseEvent) => {
    if (!editable || !ctx) return;
    event.preventDefault();
    event.stopPropagation();
    ctx.setActivePath(path, { x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <Tag
        className={editable ? styles.editable : undefined}
        style={{
          ...(heading ? { display: "block", width: "100%" } : null),
          ...style,
          ...(editable
            ? {
                position: style?.position ?? "relative",
                zIndex: style?.zIndex ?? 2,
                pointerEvents: "auto",
              }
            : null),
        }}
        onContextMenu={onContextMenu}
      >
        {text || (editable ? `[${path}]` : "")}
      </Tag>
      {editable && ctx?.activePath === path && ctx.presentationId && (
        <CopyEditor
          presentationId={ctx.presentationId}
          slideId={ctx.slideId}
          chapterId={ctx.chapterId}
          path={path}
          value={text}
          menuPos={ctx.menuPos ?? { x: 24, y: 24 }}
          onOverride={(next) => ctx.setOverride(path, next)}
          onClose={() => ctx.setActivePath(null)}
        />
      )}
    </>
  );
}

function CopyEditor({
  presentationId,
  slideId,
  chapterId,
  path,
  value,
  menuPos,
  onOverride,
  onClose,
}: {
  presentationId: string;
  slideId: string;
  chapterId?: string;
  path: string;
  value: string;
  menuPos: MenuPos;
  onOverride: (value: string) => void;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"menu" | "edit">("menu");
  const [draft, setDraft] = useState(value);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, 0);
    const onPointerDown = (event: PointerEvent) => {
      if (!armed) return;
      if (panelRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopPropagation();
      const blockClick = (click: Event) => {
        click.preventDefault();
        click.stopPropagation();
        onClose();
      };
      window.addEventListener("click", blockClick, { capture: true, once: true });
      onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(arm);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [onClose]);

  const save = async () => {
    setStatus("saving");
    setError(null);
    onOverride(draft);
    try {
      const res = await fetch("/api/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presentationId,
          slideId,
          chapterId,
          path,
          value: draft,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      onClose();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        onClose();
        return;
      }
      setStatus("error");
      setError(err instanceof Error ? err.message : "Kunne ikke lagre.");
    }
  };

  if (typeof document === "undefined") return null;

  const width = phase === "menu" ? 160 : 440;
  const height = phase === "menu" ? 48 : 220;
  const left = Math.min(
    Math.max(12, menuPos.x),
    Math.max(12, window.innerWidth - width - 12)
  );
  const top = Math.min(
    Math.max(12, menuPos.y),
    Math.max(12, window.innerHeight - height - 12)
  );

  return createPortal(
    phase === "menu" ? (
      <div
        ref={panelRef}
        className={styles.menu}
        style={{ left, top }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <button type="button" onClick={() => setPhase("edit")}>
          Rediger
        </button>
      </div>
    ) : (
      <div
        ref={panelRef}
        className={styles.editor}
        style={{ left, top }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className={styles.editorLabel}>{path}</div>
        <textarea
          className={styles.textarea}
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              void save();
            }
          }}
        />
        {status === "error" && error && (
          <div className={styles.error}>{error}</div>
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Avbryt
          </button>
          <button
            type="button"
            className={styles.save}
            disabled={status === "saving"}
            onClick={() => void save()}
          >
            {status === "saving" ? "Lagrer…" : "Lagre"}
          </button>
        </div>
      </div>
    ),
    document.body
  );
}
