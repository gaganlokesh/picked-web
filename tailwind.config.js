const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      coolGray: colors.coolGray,
      emerald: colors.emerald,
      white: colors.white,
      primary: {
        darker: 'var(--primary-darker)',
        dark: 'var(--primary-dark)',
        semidark: 'var(--primary-semidark)',
        DEFAULT: 'var(--primary)',
        semilight: 'var(--primary-semilight)',
        light: 'var(--primary-light)',
        lighter: 'var(--primary-lighter)',
      },
      neutral: {
        darker: 'var(--neutral-darker)',
        dark: 'var(--neutral-dark)',
        semidark: 'var(--neutral-semidark)',
        DEFAULT: 'var(--neutral)',
        semilight: 'var(--neutral-semilight)',
        light: 'var(--neutral-light)',
        lighter: 'var(--neutral-lighter)',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
