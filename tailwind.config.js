/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        command: {
          bg: "#050914",
          card: "#091224",
          cardHover: "#0e1b34",
          cardBorder: "#172a4d",
          borderGlow: "#1e3a6a",
          header: "#070e20",
          sidebar: "#060c1b",
          cyan: "#00e5ff",
          cyanMuted: "#38bdf8",
          red: "#ef4444",
          redGlow: "#f43f5e",
          amber: "#f59e0b",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "cyan-glow": "0 0 15px -3px rgba(0, 229, 255, 0.3), 0 0 6px -2px rgba(0, 229, 255, 0.2)",
        "red-glow": "0 0 18px -3px rgba(239, 68, 68, 0.4), 0 0 6px -2px rgba(239, 68, 68, 0.3)",
        "amber-glow": "0 0 15px -3px rgba(245, 158, 11, 0.35)",
        "tactical": "0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(23, 42, 77, 0.8)",
      },
      animation: {
        "radar-sweep": "radar 4s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
