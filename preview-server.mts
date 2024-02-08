/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: '.env.development' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT } = process.env;
const DIST_PATH = path.resolve(__dirname, 'dist');

const app = express();
app.use(express.static(DIST_PATH));

const bootstrap = (): void => {
  try {
    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
  } catch (error) {
    console.error(`Failed to start app: ${error}`);
  }
};

bootstrap();
