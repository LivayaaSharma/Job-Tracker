/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./hooks/**/*.{js,ts,jsx,tsx}"],
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
        'status-saved-bg': 'var(--status-saved-bg)',
        'status-saved-text': 'var(--status-saved-text)',
        'status-applied-bg': 'var(--status-applied-bg)',
        'status-applied-text': 'var(--status-applied-text)',
        'status-interview-bg': 'var(--status-interview-bg)',
        'status-interview-text': 'var(--status-interview-text)',
        'status-offer-bg': 'var(--status-offer-bg)',
        'status-offer-text': 'var(--status-offer-text)',
        'status-rejected-bg': 'var(--status-rejected-bg)',
        'status-rejected-text': 'var(--status-rejected-text)',
      }
    },
  },
  plugins: [],
};