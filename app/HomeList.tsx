"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";

export type HomeListItem = {
  id: string;
  title: string;
  description: string;
  date?: string;
  place?: string;
};

function haystack(item: HomeListItem): string {
  return [item.date, item.place, item.title, item.description, item.id]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function whenWhere(item: HomeListItem): string {
  return [item.place, item.date].filter(Boolean).join(" · ");
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

export default function HomeList({ items }: { items: HomeListItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => haystack(item).includes(q));
  }, [items, query]);

  return (
    <>
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
            placeholder="Søk etter dato, sted eller tittel"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
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
                  {whenWhere(item) && (
                    <p className={styles.rowWhenWhere}>{whenWhere(item)}</p>
                  )}
                  <h2 className={styles.rowTitle}>{item.title}</h2>
                </div>
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
