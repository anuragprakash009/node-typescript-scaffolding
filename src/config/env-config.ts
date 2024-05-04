import dotenv from "dotenv";
import { cleanEnv, str, port, host } from "envalid";

let envName: string = ".env";
if (process.env.NODE_ENV?.toLowerCase() === "production") {
  envName = "prod.env";
}
dotenv.config({
  path: `./src/config/${envName}`,
});
const env = cleanEnv(process.env, {
  //ADMIN_EMAIL: email({ default: "admin@example.com" }),
  //EMAIL_CONFIG_JSON: json({ desc: "Additional email parameters" }),
  NODE_ENV: str({
    choices: ["development", "test", "production", "staging"],
  }),
  PORT: port(),
  DATABASE: str(),
  DB_USERNAME: str(),
  PASSWORD: str(),
  DB_PORT: port(),
  DB_HOST: host(),
});

export { env };
