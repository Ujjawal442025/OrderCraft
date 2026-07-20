/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0D0D0D",
        purple: {
          DEEP: "#7C3AED",
          core: "#8B5CF6",
          light: "#A855F7",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#BDBDBD",
          muted: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "serif"],
      },
      boxShadow: {
        glow: "0 0 120px rgba(168, 85, 247, 0.4)",
      },
    },
  },
  plugins: [],
};
