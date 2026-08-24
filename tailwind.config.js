/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        gold: "hsl(var(--gold))",
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        headline: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["Figtree", "system-ui", "sans-serif"],
        bangla: ["Noto Serif Bengali", "serif"],
      },
    },
  },
  plugins: [],
};
