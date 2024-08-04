import path from 'path';

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@ui': path.resolve(__dirname, 'src', 'components', 'ui'),
      '@constants': path.resolve(__dirname, 'src', 'constants'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@query': path.resolve(__dirname, 'src', 'query'),
    },
  },
};
