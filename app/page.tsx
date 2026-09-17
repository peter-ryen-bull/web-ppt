import { PRESENTATIONS } from "@/presentations";
import HomeList from "./HomeList";
import styles from "./home.module.css";

export default function Home() {
  const items = PRESENTATIONS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    date: p.date,
    place: p.place,
    tags: p.tags,
  }));

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Presentasjoner</h1>
          <p className={styles.meta}>
            {items.length}{" "}
            {items.length === 1 ? "presentasjon" : "presentasjoner"}
          </p>
        </header>
        <HomeList items={items} />
      </main>
    </div>
  );
}
