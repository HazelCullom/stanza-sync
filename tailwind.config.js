module.exports = {
  content: [
    './frontend/**/*.html',
    './frontend/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        azalea: {
          light: '#d0f0c0',
          DEFAULT: '#a0e0a0',
          dark: '#70c070',
        },
        blossom: {
          light: '#ffc0cb',
          DEFAULT: '#ffb6c1',
          dark: '#ff69b4',
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    }
  },
  plugins: [],
};
