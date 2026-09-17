"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, from }),
      });
      const data = (await res.json()) as { error?: string; from?: string };
      if (!res.ok) {
        setError(data.error ?? "Feil brukernavn eller passord.");
        return;
      }
      router.replace(data.from && data.from.startsWith("/") ? data.from : "/");
      router.refresh();
    } catch {
      setError("Klarte ikke å logge inn. Prøv igjen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>Brukernavn</span>
        <input
          className={styles.input}
          name="username"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Passord</span>
        <input
          className={styles.input}
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Logger inn…" : "Logg inn"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Logg inn</h1>
          <p className={styles.meta}>
            Innlogging kreves når appen ikke kjører på localhost.
          </p>
        </header>
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
