/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-300', 'bg-red-400',
    'bg-blue-300', 'bg-blue-400',
    'bg-green-300', 'bg-green-400',
    // Añade aquí los colores que usarás
  ],
}