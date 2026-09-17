import { Box, Img, pt } from "../parts";
import {
  Badge,
  Chrome,
  CUTIVE,
  Logo,
  MEDIA,
  Photo,
  TitleSlide,
} from "./chrome";

export function SlideGiAndre() {
  return <TitleSlide title="GI  ANDRE Æ____" badge="♥️" />;
}

export function SlideSmartOcean() {
  return (
    <Photo
      box={[64.3, 0, 1151.3, 720]}
      src={`${MEDIA}/image3.jpeg`}
      alt="Smart Ocean: sensorer i havet"
      fit="contain"
      badge="♥️"
    />
  );
}

export function SlideJocko() {
  return (
    <>
      <Img
        box={[143.4, 45.5, 993.1, 614.7]}
        src={`${MEDIA}/image4.jpeg`}
        alt="Jocko Willink"
        fit="cover"
      />
      <Img
        box={[45.7, 424.1, 195.6, 295.9]}
        src={`${MEDIA}/image5.jpeg`}
        alt="Extreme Ownership"
        fit="contain"
      />
      <Logo />
      <Badge>♥️</Badge>
      <Box box={[783.1, 569.7, 420, 90.5]}>
        <div style={{ ...CUTIVE, fontSize: pt(50) }}>TILLIT</div>
      </Box>
    </>
  );
}

export function SlideTruman() {
  return (
    <Photo
      box={[0, 40, 1280, 640]}
      src={`${MEDIA}/image6.jpeg`}
      alt="Harry Truman"
      fit="cover"
    />
  );
}

export function SlideGiAndreIgjen() {
  return <TitleSlide title="GI  ANDRE Æ____" badge="♥️" />;
}

export function SlideGiAndreAeren() {
  return (
    <TitleSlide
      title="GI  ANDRE ÆREN"
      subtitle="Men ta skylden selv"
      badge="♥️"
    />
  );
}

export function SlideFuld() {
  return (
    <>
      <Img
        box={[44.5, 105.7, 758.7, 530.7]}
        src={`${MEDIA}/image7.jpeg`}
        alt="Richard Fuld"
        fit="cover"
      />
      <Img
        box={[791.5, 423.1, 488.5, 271.1]}
        src={`${MEDIA}/image8.jpeg`}
        alt="Lehman Brothers-skiltet bæres ut"
        fit="cover"
      />
      <Chrome badge="♥️" />
    </>
  );
}

export function SlideTeamwork() {
  return (
    <>
      <Img
        box={[207.1, 225, 816, 108.7]}
        src={`${MEDIA}/image9.png`}
        alt="Slack-ros"
      />
      <Img
        box={[401, 451.4, 816, 113.5]}
        src={`${MEDIA}/image10.png`}
        alt=""
      />
      <Img
        box={[466.7, 305.3, 346.7, 109.3]}
        src={`${MEDIA}/image11.png`}
        alt=""
      />
      <Img
        box={[33.1, 273.3, 246.6, 414.7]}
        src={`${MEDIA}/image12.png`}
        alt=""
      />
      <Img
        box={[207.1, 88.1, 769.3, 543.7]}
        src={`${MEDIA}/image13.png`}
        alt="Extreme teamwork"
        fit="contain"
      />
      <Chrome badge="♥️" />
    </>
  );
}

export function SlideGallup() {
  return (
    <>
      <Img
        box={[281.8, 31.8, 696.5, 655.8]}
        src={`${MEDIA}/image14.png`}
        alt="Gallup: The Importance of Employee Recognition"
        fit="contain"
      />
      <Chrome badge="♥️" />
      <Box box={[15.2, 697.2, 492.7, 22.6]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(8),
            color: "var(--burgundy-2)",
          }}
        >
          https://link.springer.com/article/10.3758/BF03332778
        </div>
      </Box>
    </>
  );
}
