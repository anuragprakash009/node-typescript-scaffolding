import { ExpressApp } from '../app';
import { PostgresDataBase } from '../database';
import { LoggerService } from '../logger';

class Loader {
  private app: ExpressApp;
  private postgres: PostgresDataBase;
  private logger: LoggerService;
  constructor(
    app: ExpressApp,
    postgres: PostgresDataBase,
    logger: LoggerService,
  ) {
    this.app = app;
    this.postgres = postgres;
    this.logger = logger;
  }
  async loadServer(): Promise<void> {
    console.log('Starting server...');
    console.log('Connecting to postgres...');
    this.postgres.connect();
    await this.postgres.authenticate();
    console.log('Connected to postgres...');
    this.logger.info(`Server started`);
    this.app.middlewares();
    this.app.routes();
    this.app.start();
  }
}

export { Loader };
