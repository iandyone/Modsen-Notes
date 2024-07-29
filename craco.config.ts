import path from 'path';

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@constants': path.resolve(__dirname, 'src', 'constants'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
    },
  },
};
