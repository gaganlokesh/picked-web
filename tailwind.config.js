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
        darkest: 'var(--primary-darkest)',
        darker: 'var(--primary-darker)',
        dark: 'var(--primary-dark)',
        semidark: 'var(--primary-semidark)',
        DEFAULT: 'var(--primary)',
        semilight: 'var(--primary-semilight)',
        light: 'var(--primary-light)',
        lighter: 'var(--primary-lighter)',
        lightest: 'var(--primary-lightest)',
      },
      neutral: {
        darkest: 'var(--neutral-darkest)',
        darker: 'var(--neutral-darker)',
        dark: 'var(--neutral-dark)',
        semidark: 'var(--neutral-semidark)',
        DEFAULT: 'var(--neutral)',
        semilight: 'var(--neutral-semilight)',
        light: 'var(--neutral-light)',
        lighter: 'var(--neutral-lighter)',
        lightest: 'var(--neutral-lightest)',
      },
    },
    extend: {
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
