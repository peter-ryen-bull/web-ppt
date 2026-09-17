import { Chrome, MEDIA, Photo, TitleSlide } from "./chrome";

export function SlideLaerA() {
  return <TitleSlide title={"LÆR A____\n_____"} badge="♥️" />;
}

export function SlideSvigermor() {
  return (
    <Photo
      box={[411.4, 103.9, 523.1, 512.2]}
      src={`${MEDIA}/image15.png`}
      alt="Nervøst ansikt"
      fit="contain"
      badge="♥️"
    />
  );
}

export function SlideLaerAIgjen() {
  return <TitleSlide title={"LÆR A____\n_____"} badge="♥️" />;
}

export function SlideLaerAlleNavn() {
  return <TitleSlide title={"LÆR ALLE\nNAVN"} badge="♥️" />;
}

export function SlideVarme() {
  return (
    <>
      <Chrome badge="♥️" />
      <div
        style={{
          position: "absolute",
          left: 395,
          top: 311.5,
          fontFamily: "var(--font-cutive-stack)",
          fontSize: `${(54 * 4) / 3}px`,
          color: "var(--burgundy)",
        }}
      >
        ♥️ Varme
      </div>
    </>
  );
}
