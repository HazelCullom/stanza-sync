module.exports = {
  content: [
    './frontend/**/*.html',
    './frontend/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'azalea-pink': {
          100: '#fdf2f8', // Soft pink background
          200: '#fce7f3', // Subtle petal tone
          300: '#fbc9e8', // Slightly deeper pink
          400: '#f7a5d0', // Accented pink
        },
        'azalea-green': {
          100: '#bdb47f', // Light leaf green
          200: '#aabb89', // Soft, natural green
          300: '#55ff00', // Muted foliage
        },
        'azalea-amber': {
          100: '#f1e6ca', // Warm, pale yellow-green
          200: '#ffebc9', // Slight glow
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

