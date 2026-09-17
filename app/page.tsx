import Link from "next/link";
import { PRESENTATIONS } from "@/presentations";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Presentasjoner</h1>
        <p className={styles.subtitle}>Velg en presentasjon for å starte.</p>
      </header>

      <ul className={styles.list}>
        {PRESENTATIONS.map((p) => (
          <li key={p.id}>
            <Link href={`/${p.id}`} className={styles.card}>
              <div className={styles.cardBody}>
                {(p.date || p.place) && (
                  <p className={styles.cardWhenWhere}>
                    <span className={styles.cardWhenWhereLabel}>
                      Når og hvor
                    </span>
                    <span className={styles.cardWhenWhereValue}>
                      {[p.date, p.place].filter(Boolean).join(" · ")}
                    </span>
                  </p>
                )}
                <h2 className={styles.cardTitle}>{p.title}</h2>
                <p className={styles.cardDescription}>{p.description}</p>
                <p className={styles.cardMeta}>
                  <span>{p.slides.length} slides</span>
                </p>
              </div>
              <span className={styles.cardArrow} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
