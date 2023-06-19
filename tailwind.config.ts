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
    },
  },
  plugins: [],
} satisfies Config;
