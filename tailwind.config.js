const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      variants: {
        extend: {
          width: ['group-hover'],
          height: ['group-hover'],
        },
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        raleway: ['var(--font-raleway)', ...fontFamily.sans],
      },

      colors: {
        'pw-blue': '#2996FC',
        'pw-blue-light': '#82BBF0',
        'pw-green': '#82CE11',
        'pw-grey-light': '#F5F5F5',
        'pw-grey-dark': '#222222',
        'pw-orange': '#E0A914',
        'pw-black': '#000000',
        'pw-navy': '#00264E',
        'pw-red': '#F24932',
      },
      backgroundImage: (theme) => ({
        'gradient-primary': `linear-gradient(to right, ${theme(
          'colors.pink'
        )}, ${theme('colors.orange')})`,
      }),
    },
  },
  plugins: [],
};
