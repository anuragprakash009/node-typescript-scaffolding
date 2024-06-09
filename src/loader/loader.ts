import { PostgresDataBase } from '../database';
import { ILoggerService, WinstonLogger } from '../logger';
import { Application } from 'express';
import { env } from '../config';
import { IAccessLogger, HttpAccessLogger } from '../logger';

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async loadServer(): Promise<void> {
    const postgresDataBase: PostgresDataBase = new PostgresDataBase(
      env.DB_USERNAME,
      env.DATABASE,
      env.PASSWORD,
      env.DB_HOST,
      env.DB_PORT,
    );
    console.log(`Connecting to database...`);
    await postgresDataBase.connect();
    console.log(`Connected to database...`);
    console.log(`Loggers Initializing...`);
    const morganAccessLogger: IAccessLogger = new HttpAccessLogger();
    const logger: ILoggerService = WinstonLogger.getInstance();
    console.log(`Loggers Initialized...`);
    let { ExpressApp } = await import('../app');
    const expressApp = new ExpressApp(this.app, env.PORT, morganAccessLogger);
    await postgresDataBase.sync();
    expressApp.middlewares();
    expressApp.routes();
    expressApp.start();
    logger.info(`App started`);
    console.log(`Server started and ready to serve the requestes`);
  }
}

export { Loader };
