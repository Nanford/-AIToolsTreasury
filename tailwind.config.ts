import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 苹果经典配色
        'apple-blue': '#007AFF',
        'apple-green': '#34C759',
        'apple-indigo': '#5856D6',
        'apple-orange': '#FF9500',
        'apple-pink': '#FF2D55',
        'apple-purple': '#AF52DE',
        'apple-red': '#FF3B30',
        'apple-teal': '#5AC8FA',
        'apple-yellow': '#FFCC00',
        'apple-gray': '#8E8E93',
        'apple-gray2': '#AEAEB2',
        'apple-gray3': '#C7C7CC',
        'apple-gray4': '#D1D1D6',
        'apple-gray5': '#E5E5EA',
        'apple-gray6': '#F2F2F7',
      },
    },
  },
  plugins: [],
};

export default config; 