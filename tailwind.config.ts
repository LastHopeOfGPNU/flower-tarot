import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          900: "#1a0b2e", // Deep purple background
          800: "#2d1b4e", // Card background
          700: "#432c7a", // Accent
          600: "#764ba2", // Highlight
          100: "#e0d4fc", // Text
        },
        gold: {
          500: "#ffd700",
          600: "#d4af37",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mystic-gradient": "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      },
    },
  },
  plugins: [],
};
export default config;