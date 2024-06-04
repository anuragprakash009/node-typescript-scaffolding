import { MongoDbConnection } from '../database';
import { LoggerService, WinstonLogger } from '../logger';
import { Application } from 'express';
import { env } from '../config';
import { AccessLogger, HttpAccessLogger } from '../logger';

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async loadServer(): Promise<void> {
    const mongoose: MongoDbConnection = new MongoDbConnection(env.MONGO_URL);
    console.log(`Connecting to database...`);
    await mongoose.connect();
    console.log(`Connected to database...`);
    console.log(`Loggers Initializing...`);
    const morganAccessLogger: AccessLogger = new HttpAccessLogger();
    const logger: LoggerService = WinstonLogger.getInstance();
    console.log(`Loggers Initialized...`);
    let { ExpressApp } = await import('../app');
    const expressApp = new ExpressApp(this.app, env.PORT, morganAccessLogger);
    expressApp.middlewares();
    expressApp.routes();
    expressApp.start();
    logger.info(`App started`);
    console.log(`Server started and ready to serve the requestes`);
  }
}

export { Loader };
