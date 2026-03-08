import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["'Syne'", "Georgia", "sans-serif"],
        mono: ["'DM Mono'", "'Courier New'", "monospace"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        auapw: {
          bg: "#07090f",
          card: "rgba(19,22,30,0.72)",
          fg: "#f5f5f5",
          muted: "#9ca3af",
          dim: "#6b7280",
          border: "rgba(232,232,232,0.12)",
        },
      },
    },
  },
  plugins: [],
}

export default config
