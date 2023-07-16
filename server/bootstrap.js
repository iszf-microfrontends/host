const express = require('express');
const fallback = require('express-history-api-fallback');
const config = require('./config');
const { resolveRoot } = require('./utils');

const app = express();
const root = resolveRoot('dist');

app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(config.PORT, () => {
  console.log(`Host is running on port ${config.PORT}`);
});
