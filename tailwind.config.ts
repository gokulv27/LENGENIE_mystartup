import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          raised: "var(--bg-raised)",
        },
        gold: {
          primary: "var(--gold-primary)",
          bright: "var(--gold-bright)",
          light: "var(--gold-light)",
          muted: "var(--gold-muted)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          strong: "var(--border-strong)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      spacing: {
        // We stick with tailwind default spacing generally, which matches 1rem = 16px, 1 = 0.25rem = 4px.
        // The rule was "Spacing unit: 8px base. Sections: 80px vertical padding". So base unit `2` in tailwind is 8px.
        // `py-20` is 80px.
        section: "80px",
      },
      borderWidth: {
        "05": "0.5px",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
