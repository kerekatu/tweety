const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './containers/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      white: colors.white,
    },
    extend: {
      minHeight: {
        '(layout)': 'calc(100vh - 5rem)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['hover', 'focus', 'disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
