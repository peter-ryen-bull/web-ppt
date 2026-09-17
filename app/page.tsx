import { PRESENTATIONS, eventDateFromId, isInProgress } from "@/presentations";
import HomeList from "./HomeList";
import styles from "./home.module.css";

function eventTime(id: string): number {
  return eventDateFromId(id)?.getTime() ?? 0;
}

export default function Home() {
  const items = [...PRESENTATIONS]
    .sort((a, b) => eventTime(b.id) - eventTime(a.id))
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      date: p.date,
      place: p.place,
      tags: p.tags,
      inProgress: isInProgress(p),
      icon: p.icon,
    }));
  const inProgressCount = items.filter((item) => item.inProgress).length;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Presentasjoner</h1>
          <p className={styles.meta}>
            {items.length}{" "}
            {items.length === 1 ? "presentasjon" : "presentasjoner"}
            {inProgressCount > 0 && (
              <>
                {" · "}
                {inProgressCount} under arbeid
              </>
            )}
          </p>
        </header>
        <HomeList items={items} />
      </main>
    </div>
  );
}
