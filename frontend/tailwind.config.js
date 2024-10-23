/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco': '#e4f3f0',
        'eco1': '#559421',
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
    // Añade aquí los colores que usarás
  ],
}