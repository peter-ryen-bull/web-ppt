import { ChapterSlide } from "../parts";

/* Kapittel: Effekter av dataplattform */
export function SlideEffekter() {
  return <ChapterSlide title="Effekter av dataplattform" />;
}

/* De fire effektene */
export function SlideEffektKvalitet() {
  return (
    <ChapterSlide
      title="Effekt 1 – Data du kan stole på"
      titleSize={54}
      subtitle="Kvalitet"
    />
  );
}

export function SlideEffektEtterlevelse() {
  return (
    <ChapterSlide
      title="Effekt 2 – Compliance bygget inn"
      titleSize={54}
      subtitle="Etterlevelse"
    />
  );
}

export function SlideEffektEffektivitet() {
  return (
    <ChapterSlide
      title="Effekt 3 – Mindre arbeid, mer automatisering"
      titleSize={54}
      subtitle="Effektivitet"
    />
  );
}

export function SlideEffektFremtid() {
  return (
    <ChapterSlide
      title="Effekt 4 – KI integrert i dataflyten"
      titleSize={54}
      subtitle="Fremtidsrettet"
    />
  );
}
