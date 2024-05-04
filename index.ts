import express from "express";
import { env } from "./src/config";
import { PostgresDataBase } from "./src/database";
import { ExpressApp } from "./src/app";
import { Loader } from "./src/loader";

const app = express();
const postgresConn: PostgresDataBase = new PostgresDataBase(
  env.DB_USERNAME,
  env.DATABASE,
  env.PASSWORD,
  env.DB_HOST,
  env.DB_PORT
);

const expressApp: ExpressApp = new ExpressApp(app, env.PORT);

const loader: Loader = new Loader(expressApp, postgresConn);

loader.loadServer();
