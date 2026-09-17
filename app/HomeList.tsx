"use client";

import { useMemo, useState } from "react";
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

function haystack(item: HomeListItem): string {
  return [
    item.date,
    item.place,
    item.title,
    item.description,
    item.id,
    ...(item.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function SearchIcon() {
  return (
    <svg
      className={styles.searchIcon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.2 10.2 13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PageIcon() {
  return (
    <svg
      className={styles.rowIcon}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <rect
        x="4"
        y="2.75"
        width="10"
        height="12.5"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6.5 6.5h5M6.5 9h5M6.5 11.5h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function tagClass(tag: PresentationTag): string {
  if (tag === "conference") return styles.tagConference;
  if (tag === "pitch") return styles.tagPitch;
  return styles.tagPrivate;
}

function TagPills({ tags }: { tags: PresentationTag[] }) {
  return (
    <ul className={styles.rowTags}>
      {tags.map((tag) => (
        <li key={tag} className={`${styles.tag} ${tagClass(tag)}`}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function HomeList({ items }: { items: HomeListItem[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<PresentationTag | null>(null);

  const availableTags = useMemo(() => {
    const used = new Set<PresentationTag>();
    for (const item of items) {
      for (const tag of item.tags ?? []) used.add(tag);
    }
    return PRESENTATION_TAGS.filter((tag) => used.has(tag));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeTag && !(item.tags ?? []).includes(activeTag)) return false;
      if (q && !haystack(item).includes(q)) return false;
      return true;
    });
  }, [items, query, activeTag]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor="presentation-search">
            Søk
          </label>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              id="presentation-search"
              className={styles.search}
              type="search"
              placeholder="Søk etter dato, sted, tittel eller tag"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {availableTags.length > 0 && (
          <div className={styles.filters} role="group" aria-label="Filtrer på tag">
            {availableTags.map((tag) => {
              const pressed = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.filter} ${tagClass(tag)} ${
                    pressed ? styles.filterActive : ""
                  }`}
                  aria-pressed={pressed}
                  onClick={() => setActiveTag(pressed ? null : tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Ingen treff.</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.id}`} className={styles.row}>
                <PageIcon />
                <div className={styles.rowBody}>
                  {item.place && (
                    <p className={styles.rowPlace}>{item.place}</p>
                  )}
                  <h2 className={styles.rowTitle}>{item.title}</h2>
                </div>
                {item.date ? (
                  <p className={styles.rowDate}>{item.date}</p>
                ) : (
                  <span className={styles.rowDate} />
                )}
                <TagPills tags={item.tags ?? []} />
                <span className={styles.rowArrow} aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
