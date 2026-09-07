const TONE_CLASSES = {
  light: {
    a: "bg-primary/[0.07]",
    b: "bg-primary-light/[0.08]",
  },
  dark: {
    a: "bg-primary/20",
    b: "bg-primary-light/[0.12]",
  },
};

/**
 * Two large, softly blurred blobs that drift slowly behind a section's
 * content. Purely decorative (aria-hidden, pointer-events-none, positioned
 * at z-0 so it never sits above real content) — meant to break up long
 * flat-color sections without competing for attention. The parent section
 * needs `relative overflow-hidden` for this to stay contained.
 */
export default function AmbientGlow({ tone = "light" }) {
  const colors = TONE_CLASSES[tone] ?? TONE_CLASSES.light;

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <div
        className={`absolute -top-1/4 -left-1/5 w-[36rem] h-[36rem] rounded-full blur-3xl ${colors.a}`}
        style={{ animation: "ambient-drift-a 22s ease-in-out infinite" }}
      />
      <div
        className={`absolute -bottom-1/3 -right-1/5 w-[40rem] h-[40rem] rounded-full blur-3xl ${colors.b}`}
        style={{ animation: "ambient-drift-b 26s ease-in-out infinite" }}
      />
    </div>
  );
}
