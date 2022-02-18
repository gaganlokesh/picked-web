const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: colors.gray,
      emerald: colors.emerald,
      white: colors.white,
      red: colors.red,
      green: colors.green,
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
      success: {
        darkest: 'var(--success-darkest)',
        darker: 'var(--success-darker)',
        dark: 'var(--success-dark)',
        semidark: 'var(--success-semidark)',
        DEFAULT: 'var(--success)',
        semilight: 'var(--success-semilight)',
        light: 'var(--success-light)',
        lighter: 'var(--success-lighter)',
        lightest: 'var(--success-lightest)',
      },
      danger: {
        darkest: 'var(--danger-darkest)',
        darker: 'var(--danger-darker)',
        dark: 'var(--danger-dark)',
        semidark: 'var(--danger-semidark)',
        DEFAULT: 'var(--danger)',
        semilight: 'var(--danger-semilight)',
        light: 'var(--danger-light)',
        lighter: 'var(--danger-lighter)',
        lightest: 'var(--danger-lightest)',
      },
    },
    extend: {
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
