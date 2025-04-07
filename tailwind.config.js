/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-gray': '#86868b',
        'apple-gray6': '#f5f5f7',
        'apple-gray5': '#d2d2d7',
        'apple-blue': '#0066cc',
      },
    },
  },
  plugins: [],
}