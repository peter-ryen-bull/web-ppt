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
  }));

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Presentasjoner</h1>
      </header>
      <HomeList items={items} />
    </main>
  );
}
