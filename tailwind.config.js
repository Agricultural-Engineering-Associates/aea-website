/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2D5F2B',
        'gold': '#C4A439',
        'earth': '#3A3A2A',
        'cream': '#F5F2E8',
      },
      fontFamily: {
        'heading': ['Merriweather', 'Georgia', 'serif'],
        'body': ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
