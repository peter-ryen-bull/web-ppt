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
                <h2 className={styles.cardTitle}>{p.title}</h2>
                <p className={styles.cardDescription}>{p.description}</p>
                <p className={styles.cardMeta}>
                  {p.date && <span>{p.date}</span>}
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
