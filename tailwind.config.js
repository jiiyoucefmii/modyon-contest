/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      rotate: {
        '33': '33deg',
        '25': '25deg',
        '11': '11deg',
        '12': '12deg',
        '24': '24deg',
        '18': '18deg',
        '5': '5deg',
        '3': '3deg',
        '6': '6deg',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}