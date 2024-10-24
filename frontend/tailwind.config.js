/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'board': '#e8dff5',
        'boardList': '#cdb4db',
        'focus': '#b973e1',
        'eco2': '#145c6b',
        'eco2.1': '#216b7c',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-red-300', 'bg-red-400',
    'bg-blue-300', 'bg-blue-400',
    'bg-green-300', 'bg-green-400',
    'bg-yellow-300', 'bg-yellow-400',
    'bg-orange-300', 'bg-orange-400',
    'bg-amber-300', 'bg-amber-400',
    'bg-lime-300', 'bg-lime-400',
    'bg-emerald-300', 'bg-emerald-400',
    'bg-cyan-300', 'bg-cyan-400',
  ],
}