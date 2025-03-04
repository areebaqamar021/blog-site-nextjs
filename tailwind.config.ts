import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBeige: '#F7F4ED',
      },

    },
  },
  plugins: [],
  important:true
} satisfies Config;