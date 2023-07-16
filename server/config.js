const dotenv = require('dotenv');
const { resolveRoot } = require('./utils');

const defaultEnvFile = dotenv.config();
const prodEnvFile = dotenv.config({ path: resolveRoot('.env.prod') });
const parsedEnv = { ...defaultEnvFile.parsed, ...prodEnvFile.parsed };

module.exports = {
  ...parsedEnv,
  PORT: parsedEnv.PORT ?? 3000,
};
