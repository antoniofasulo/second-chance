/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette personalizzata per il progetto
        'brand-blue': '#2563eb',
        'brand-slate': '#0f172a',
      },
    },
  },
  plugins: [],
}