/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1C2333',
          soft: '#4A5268',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          sunken: '#F5F6F8',
          line: '#E3E6EC',
        },
        route: {
          DEFAULT: '#2B4C7E',
          light: '#E8EEF7',
        },
        stamp: {
          DEFAULT: '#E0A458',
          light: '#FBF1E1',
        },
        delay: {
          DEFAULT: '#C1443C',
          light: '#FBEAE8',
        },
        arrive: {
          DEFAULT: '#3F7D58',
          light: '#E9F3EC',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 35, 51, 0.06), 0 1px 1px rgba(28, 35, 51, 0.04)',
      },
    },
  },
  plugins: [],
}
