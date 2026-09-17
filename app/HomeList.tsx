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

      {filtered.length === 0 ? (
        <p className={styles.empty}>Ingen treff.</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.id}`} className={styles.row}>
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
