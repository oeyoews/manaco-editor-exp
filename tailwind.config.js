/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        editor: {
          dark: '#1e1e1e',
          light: '#ffffff',
          sidebar: {
            dark: '#252526',
            light: '#f3f3f3'
          },
          header: {
            dark: '#333333',
            light: '#e7e7e7'
          }
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};