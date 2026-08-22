const path = require('path');
const dotenv = require('dotenv');

function resolveNodeEnv() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  const lifecycle = process.env.npm_lifecycle_event;
  if (lifecycle === 'start') {
    return 'production';
  }
  return 'development';
}

const nodeEnv = resolveNodeEnv();
const envFilePath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

dotenv.config({ path: envFilePath });

module.exports = {
  nodeEnv
};
