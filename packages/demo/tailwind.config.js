import feelUiTailwindPlugin from '@feel-ui/styles/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [feelUiTailwindPlugin],
}
