/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      "world-map": "url('/assets/world_map2.png')",
      "world-map2": "url('/assets/world_map.svg')"

      }
    },
  },
  plugins: [],
}