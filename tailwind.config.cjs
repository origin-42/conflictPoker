module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      '32': '32px'
    },
    extend: {
      boxShadow: {
        'upper': '0 -8px 6px -6px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}