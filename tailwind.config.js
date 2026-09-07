/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Confident, trustworthy blue — the single accent color, used sparingly
        primary: {
          DEFAULT: "#2954E5",
          light: "#4C72F0",
          dark: "#1B3BB0",
        },
        // Soft indigo tint for accent backgrounds
        secondary: "#EEF2FF",
        // Warm off-white surface, closer to Braun/Apple product photography backdrops
        surface: {
          DEFAULT: "#FAFAF9",
          muted: "#F2F1EE",
        },
        ink: {
          DEFAULT: "#15161A",
          muted: "#6B6B72",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(15,15,20,0.06)",
        cardHover: "0 24px 48px rgba(15,15,20,0.12)",
        soft: "0 2px 12px rgba(15,15,20,0.05)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

