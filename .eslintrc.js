module.exports = {
  root: true,
  extends: ['@iszf-microfrontends/eslint-config/react-rq'],
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.js', 'webpack.config.js', 'postcss.config.js'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
