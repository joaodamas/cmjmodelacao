import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: {
        "2xl": "1240px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ['ui-monospace', '"SF Mono"', '"JetBrains Mono"', "Menlo", "Consolas", "monospace"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        graphite: "hsl(var(--graphite))",
        steel: "hsl(var(--steel))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)"
      },
      boxShadow: {
        industrial: "0 24px 60px -20px rgba(8, 19, 38, 0.22)",
        "industrial-lg": "0 40px 90px -28px rgba(8, 19, 38, 0.32)",
        "accent-glow": "0 0 0 1px hsl(var(--accent) / 0.4), 0 12px 32px -8px hsl(var(--accent) / 0.35)"
      },
      letterSpacing: {
        tightest: "-0.025em"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
