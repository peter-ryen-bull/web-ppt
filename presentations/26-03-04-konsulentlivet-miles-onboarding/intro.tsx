import { Box, Img, pt } from "../parts";
import { Badge, Chrome, CUTIVE, Logo, MEDIA, Title } from "./chrome";

export function SlideHej() {
  return (
    <>
      <Chrome badge="🧠♥️" />
      <Title size={104} box={[44.5, 115.5, 1130, 177.7]}>
        Hej 🫶
      </Title>
      <Box box={[44.5, 358.6, 1009.6, 329.6]}>
        <div style={{ ...CUTIVE, fontSize: pt(66), lineHeight: 1.2 }}>
          Å være konsulent i Miles-verdier i bruk
        </div>
      </Box>
    </>
  );
}

const OPPDRAG = [
  { navn: "Smart Ocean", rolle: "Team Lead" },
  { navn: "Equinor SSI", rolle: "Scrum Master" },
  { navn: "Equinor DMT", rolle: "" },
  { navn: "Miljødirektoratet", rolle: "" },
  { navn: "Iteam Havbruk", rolle: "Team Lead / Solo" },
  { navn: "Politiet", rolle: "Tech Lead" },
];

export function SlideOppdrag() {
  return (
    <>
      <Logo />
      <Badge>🧠♥️</Badge>
      <Box box={[93.3, 144.8, 860, 520]}>
        <div
          style={{
            ...CUTIVE,
            fontSize: pt(50),
            lineHeight: 1.22,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {OPPDRAG.map((o) => (
            <div
              key={o.navn}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 28,
                whiteSpace: "nowrap",
              }}
            >
              <span>{o.navn}</span>
              {o.rolle && (
                <span style={{ fontSize: pt(14), opacity: 0.7 }}>{o.rolle}</span>
              )}
            </div>
          ))}
        </div>
      </Box>
      <Img
        box={[888.4, 400.7, 336.5, 319.3]}
        src={`${MEDIA}/image2.png`}
        alt="Forsikra-appen"
        fit="cover"
      />
    </>
  );
}
