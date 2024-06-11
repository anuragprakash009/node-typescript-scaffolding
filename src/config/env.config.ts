import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

let envName: string = '.env';
if (process.env.NODE_ENV?.toLowerCase() === 'production') {
  envName = 'prod.env';
}
dotenv.config({
  path: `./src/config/${envName}`,
});
const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
  }),
  MONGO_URL: url(),
  PORT: port(),
  LOG_PATH: str(),
});

export { env };
