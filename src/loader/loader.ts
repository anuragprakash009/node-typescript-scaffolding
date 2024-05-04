import { ExpressApp } from "../app";
import { PostgresDataBase } from "../database";

class Loader {
  private app: ExpressApp;
  private postgres: PostgresDataBase;

  constructor(app: ExpressApp, postgres: PostgresDataBase) {
    this.app = app;
    this.postgres = postgres;
  }
  async loadServer(): Promise<void> {
    console.log("Starting server...");
    console.log("Connecting to postgres...");
    this.postgres.connect();
    await this.postgres.authenticate();
    console.log("Connected to postgres...");
    this.app.loggers();
    this.app.middlewares();
    this.app.routes();
    this.app.start();
  }
}

export { Loader };
