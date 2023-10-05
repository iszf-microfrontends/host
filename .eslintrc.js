module.exports = {
  root: true,
  extends: ['@iszf-microfrontends/eslint-config'],
  plugins: ['react-refresh'],
  ignorePatterns: ['webpack.config.js'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
