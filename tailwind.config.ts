import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Segoe UI', 'Helvetica']
    },
    extend: {
      colors: {
        'easy': '#00B8A3',
        'medium': '#FFC01E',
        'hard': '#FF375F',
      },
      boxShadow: {
        'dark-1': '0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.08)',
      },
      letterSpacing: {
        'tightest': '-.075em',
        'tighter': '-.05em',
        'tight': '-.025em',
        'normal': '0',
        'wide': '.025em',
        'wider': '.05em',
        'widest': '.1em',
        'extra-widest': '.2em',
      },
    },
  },
  plugins: [],
} satisfies Config;
