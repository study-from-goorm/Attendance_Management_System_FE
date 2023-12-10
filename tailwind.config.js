/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-color': '#F1F6F9',
        'primary-color': '#14274E',
        'secondary-color': '#394867',
        'neutral-color': '#9BA4B4',
      },
      flex: {
        6: '6 6 0%',
      },
    },
  },
  plugins: [],
};
