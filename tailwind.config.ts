

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
    },
      boxShadow: {
        'text-shadow': '2px 2px 4px rgba(255, 255, 255, 0.5)',
      },
      animation: {
        scroll: "scroll 40s linear infinite",
        'scroll-paused': 'scroll 40s linear infinite paused',
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
              },
      },

      screens: {
        mob: {'max':"640px"},
      },
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        "background-secondary": "rgba(var(--background-secondary))",
        "foreground-secondary": "rgba(var(--foreground-secondary))",
        // background: "rgba(var(--background) / <alpha-value>)",
        // foreground: "rgba(var(--foreground) / <alpha-value>)",
        // "background-secondary": "rgba(var(--background-secondary) / <alpha-value>)",
        // "foreground-secondary": "rgba(var(--foreground-secondary) / <alpha-value>)",
        warning: "rgba(var(--warning))",
        success: "rgba(var(--success))",
        danger: "rgba(var(--danger))",
        info: "rgba(var(--info))",
        text: "rgba(var(--text))",
        border: "rgba(var(--border))",
        contrast: "rgba(var(--contrast))",
        "icon-border": "rgba(var(--icon-border))",
        soil: "rgba(var(--soil))",
        "slate-800" : "rgba(var(--slate-800))",
        indigo: "rgba(var(--indigo))",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
