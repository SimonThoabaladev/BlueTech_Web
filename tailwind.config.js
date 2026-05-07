export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 60px rgba(16, 24, 40, 0.7)',
      },
      colors: {
        brand: {
          50: '#effefd',
          100: '#d9fbff',
          200: '#b3f3ff',
          300: '#7ee6ff',
          400: '#4dd3ff',
          500: '#2ab4e6',
          600: '#1f86b2',
          700: '#175f7d',
          800: '#114459',
          900: '#0a2a38',
        },
      },
    },
  },
  plugins: [],
}
