/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'page-bg': 'var(--page-bg)',
        'card-bg': 'var(--card-bg)',
        'ink':'var(--ink)',
        'muted': 'var(--muted)',
        'sage-light':'var(--sage-light)',
        'sage-mid': 'var(--sage-mid)',
        'sage-dark': 'var(--sage-dark)',
        'pink-light': 'var(--pink-light)',
        'pink-bold': 'var(--pink-bold)',
        'peach': 'var(--peach)',
      }
    },
  },
  plugins: [],
};