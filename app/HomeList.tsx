"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  PRESENTATION_TAGS,
  type PresentationTag,
} from "@/presentations";
import styles from "./home.module.css";

export type HomeListItem = {
  id: string;
  title: string;
  description: string;
  date?: string;
  place?: string;
  tags?: PresentationTag[];
};

const TAG_LABELS: Record<PresentationTag, string> = {
  conference: "Konferanse",
  pitch: "Pitch",
  private: "Internt",
};

function haystack(item: HomeListItem): string {
  const tags = item.tags ?? [];
  return [
    item.date,
    item.place,
    item.title,
    item.description,
    item.id,
    ...tags,
    ...tags.map((tag) => TAG_LABELS[tag]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m13.2 13.2 3.8 3.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m4.5 4.5 7 7m0-7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className={styles.rowArrow} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h11m-4.5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PageIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 17h6M10 14v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 8h4M6.5 10.5h7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function toneClass(tag: PresentationTag | undefined): string {
  if (tag === "conference") return styles.toneConference;
  if (tag === "pitch") return styles.tonePitch;
  if (tag === "private") return styles.tonePrivate;
  return styles.toneNeutral;
}

function TagPills({ tags }: { tags: PresentationTag[] }) {
  if (tags.length === 0) return <span className={styles.rowTags} />;
  return (
    <ul className={styles.rowTags} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className={`${styles.tag} ${toneClass(tag)}`}>
          {TAG_LABELS[tag]}
        </li>
      ))}
    </ul>
  );
}

export default function HomeList({ items }: { items: HomeListItem[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<PresentationTag | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tagCounts = useMemo(() => {
    const counts = new Map<PresentationTag, number>();
    for (const item of items) {
      for (const tag of item.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return counts;
  }, [items]);

  const availableTags = useMemo(
    () => PRESENTATION_TAGS.filter((tag) => tagCounts.has(tag)),
    [tagCounts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeTag && !(item.tags ?? []).includes(activeTag)) return false;
      if (q && !haystack(item).includes(q)) return false;
      return true;
    });
  }, [items, query, activeTag]);

  const isFiltering = query.trim() !== "" || activeTag !== null;

  // "/" fokuserer søkefeltet, som i GitHub/Linear.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      e.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function reset() {
    setQuery("");
    setActiveTag(null);
    inputRef.current?.focus();
  }

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <label className={styles.srOnly} htmlFor="presentation-search">
            Søk
          </label>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              ref={inputRef}
              id="presentation-search"
              className={styles.search}
              type="search"
              placeholder="Søk etter dato, sted, tittel eller tag"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  setQuery("");
                }
              }}
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                type="button"
                className={styles.clear}
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Tøm søk"
              >
                <ClearIcon />
              </button>
            ) : (
              <kbd className={styles.kbd} aria-hidden>
                /
              </kbd>
            )}
          </div>
        </div>

        <div className={styles.filterBar}>
          {availableTags.length > 0 && (
            <div
              className={styles.filters}
              role="group"
              aria-label="Filtrer på tag"
            >
              <button
                type="button"
                className={`${styles.filter} ${
                  activeTag === null ? styles.filterActive : ""
                }`}
                aria-pressed={activeTag === null}
                onClick={() => setActiveTag(null)}
              >
                Alle
                <span className={styles.filterCount}>{items.length}</span>
              </button>
              {availableTags.map((tag) => {
                const pressed = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.filter} ${
                      pressed ? styles.filterActive : ""
                    }`}
                    aria-pressed={pressed}
                    onClick={() => setActiveTag(pressed ? null : tag)}
                  >
                    <span
                      className={`${styles.filterDot} ${toneClass(tag)}`}
                      aria-hidden
                    />
                    {TAG_LABELS[tag]}
                    <span className={styles.filterCount}>
                      {tagCounts.get(tag)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          {isFiltering && (
            <p className={styles.resultCount} aria-live="polite">
              {filtered.length} av {items.length}
            </p>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Ingen treff</p>
          <p className={styles.emptyText}>
            {query.trim()
              ? `Fant ingen presentasjoner som matcher «${query.trim()}».`
              : "Ingen presentasjoner med dette filteret."}
          </p>
          <button type="button" className={styles.resetButton} onClick={reset}>
            Nullstill søk og filter
          </button>
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered.map((item) => {
            const tags = item.tags ?? [];
            return (
              <li key={item.id} className={styles.listItem}>
                <Link href={`/${item.id}`} className={styles.row}>
                  <span className={`${styles.rowIcon} ${toneClass(tags[0])}`}>
                    <PageIcon />
                  </span>
                  <div className={styles.rowBody}>
                    {(item.place || item.date) && (
                      <p className={styles.rowMeta}>
                        {item.place && <span>{item.place}</span>}
                        {item.place && item.date && (
                          <span className={styles.rowMetaDot} aria-hidden>
                            ·
                          </span>
                        )}
                        {item.date && <span>{item.date}</span>}
                      </p>
                    )}
                    <h2 className={styles.rowTitle}>{item.title}</h2>
                  </div>
                  <TagPills tags={tags} />
                  <ChevronIcon />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
