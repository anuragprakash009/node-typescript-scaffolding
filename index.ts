import express from 'express';
import { env } from './src/config';
import { PostgresDataBase } from './src/database';
import { Loader } from './src/loader';
import {
  LoggerService,
  WinstonLogger,
  AccessLogger,
  HttpAccessLogger,
} from './src/logger';
import { join } from 'path';

const loggerPath: string = join(__dirname, 'logs');

const app = express();
const postgresConn: PostgresDataBase = new PostgresDataBase(
  env.DB_USERNAME,
  env.DATABASE,
  env.PASSWORD,
  env.DB_HOST,
  env.DB_PORT,
);

const morganAccessLogger: AccessLogger = new HttpAccessLogger(loggerPath);
postgresConn.connect();
import { ExpressApp } from './src/app';
const expressApp: ExpressApp = new ExpressApp(
  app,
  env.PORT,
  morganAccessLogger,
);

const logger: LoggerService = new WinstonLogger(loggerPath);

const loader: Loader = new Loader(expressApp, postgresConn, logger);

loader.loadServer();
