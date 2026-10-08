/** Gjenskapt fra AquaPlatform-dashbordet (merke + ordmerke), for mørk bakgrunn. */
export function AquaPlatformLogo({ size = 56 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.3 }}>
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
        <circle cx="24" cy="24" r="19" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="24" cy="5" r="2.6" fill="#F26B2A" />
        <circle cx="10.6" cy="37.4" r="2.6" fill="#2FB8E0" />
        <circle cx="37.4" cy="37.4" r="2.6" fill="#2FB8E0" />
        <path
          d="M15.5 35.5 L24 13.5 L32.5 35.5"
          fill="none"
          stroke="#fff"
          strokeWidth="4.2"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 28 Q19 24 24.5 27 T35 25"
          fill="none"
          stroke="#3CC9C0"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <div style={{ fontFamily: "var(--font-sans)", lineHeight: 1.1 }}>
        <div style={{ fontSize: size * 0.56, fontWeight: 600, color: "#fff" }}>
          AquaPlatform
        </div>
        <div
          style={{
            fontSize: size * 0.22,
            letterSpacing: size * 0.03,
            color: "#9fb3b0",
            marginTop: size * 0.06,
          }}
        >
          OPERASJONSDASHBORD
        </div>
      </div>
    </div>
  );
}
