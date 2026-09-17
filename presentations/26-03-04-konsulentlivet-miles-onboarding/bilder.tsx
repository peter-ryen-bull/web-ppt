import { Box, Img, pt } from "../parts";
import { Chrome, MEDIA, Photo, TitleSlide } from "./chrome";

export function SlideSnakkI() {
  return (
    <TitleSlide
      title="S_____K I B______"
      badge="🧠"
      box={[73.7, 162.5, 1130, 345.7]}
    />
  );
}

export function SlideJonas() {
  return (
    <Photo
      box={[0, 0, 1280, 720]}
      src={`${MEDIA}/image16.jpeg`}
      alt="Jonas Henriksen"
      fit="cover"
    />
  );
}

export function SlideSnakkIBilder() {
  return (
    <TitleSlide
      title="SNAKK I BILDER"
      badge="🧠"
      box={[73.7, 162.5, 1130, 345.7]}
    />
  );
}

export function SlideIteam() {
  return (
    <Photo
      box={[240, 160, 800, 400]}
      src={`${MEDIA}/image17.png`}
      alt="iteam"
      fit="contain"
      badge="🧠"
    />
  );
}

export function SlideMlk() {
  return (
    <Photo
      box={[76.2, 0, 1127.7, 720]}
      src={`${MEDIA}/image18.jpeg`}
      alt="Martin Luther King Jr."
      fit="cover"
    />
  );
}

export function SlideJobs() {
  return (
    <Photo
      box={[93.4, 1.5, 1103.2, 720]}
      src={`${MEDIA}/image19.jpeg`}
      alt="Steve Jobs og iPod"
      fit="cover"
      showLogo={false}
    />
  );
}

export function SlideStanford() {
  return (
    <>
      <Img
        box={[378.3, 63.8, 473.6, 611.1]}
        src={`${MEDIA}/image20.png`}
        alt="Bower og Clark: narrative stories as mediators"
        fit="contain"
      />
      <Chrome badge="🧠" />
      <Box box={[19.3, 681.8, 640.7, 17.8]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(5),
            color: "var(--burgundy-2)",
          }}
        >
          https://link.springer.com/article/10.3758/BF03332778
        </div>
      </Box>
    </>
  );
}
