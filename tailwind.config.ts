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
        steel: "hsl(var(--steel))",
        ops: {
          bg: "#eef4fb",
          page: "#f8fbff",
          surface: "#ffffff",
          overlay: "#041526",
          sidebar: "#071f3a",
          sidebarBorder: "#123b66",
          sidebarHover: "#0d335d",
          sidebarMute: "#8db8df",
          sidebarDeep: "#06182c",
          sidebarInput: "#1a4777",
          card: "#0a2b4f",
          ink: "#0a2540",
          inkSoft: "#10243a",
          inkMid: "#29445f",
          muted: "#5b7189",
          mutedStrong: "#4b6682",
          mutedSoft: "#6d8298",
          border: "#c7d8ea",
          borderSoft: "#d8e5f1",
          borderMid: "#aac5df",
          accent: "#0878d8",
          accentBright: "#35a2ff",
          accentSoft: "#eef6ff",
          accentPale: "#dbeafe",
          accentFaint: "#dceafb",
          modalBorder: "#2b6fa8",
          successBorder: "#98c6ff",
          successBg: "#eaf4ff",
          successInk: "#0a579a",
          warnBorder: "#f2cf78",
          warnBg: "#fff8e6",
          warnInk: "#604400",
          warnInkMid: "#6a4a00",
          warnInkSoft: "#7a5600",
          warnMark: "#d99b16",
          error: "#f5a524"
        }
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
