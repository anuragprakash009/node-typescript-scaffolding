import express, { Application, Handler } from 'express';
import { IApp } from './app.interface';
import { categoryRouter, productRouter } from '../module';
import { APP_CONSTANT } from '../constant';
import { IAccessLogger } from '../logger';

class ExpressApp implements IApp<Application> {
  private app: Application;
  private port: number;
  private accesslogger: IAccessLogger;
  constructor(app: Application, port: number, accesslogger: IAccessLogger) {
    this.port = port || 8000;
    this.app = app;
    this.accesslogger = accesslogger;
  }

  middlewares(): void {
    console.log(`Middlewares initialized`);
    this.app.use(express.json());
    const httpAccessLoggerMiddleware: Handler =
      this.accesslogger.getAccessLoggerMiddleWare();
    this.app.use(httpAccessLoggerMiddleware);
  }

  routes(): void {
    console.log(`Routes initialized`);
    console.log(`Routes initialized`);
    const projectBaseUrl: string =
      APP_CONSTANT.SERVICE.PRODUCT_BASE_URL +
      APP_CONSTANT.VERSION.NUMBER +
      APP_CONSTANT.MODULE.PRODUCT.PRODUCT_BASE_URL;
    this.app.use(projectBaseUrl, productRouter);

    const categoryBaseUrl: string =
      APP_CONSTANT.SERVICE.PRODUCT_BASE_URL +
      APP_CONSTANT.VERSION.NUMBER +
      APP_CONSTANT.MODULE.PRODUCT.CATEGORY_BASE_URL;
    this.app.use(categoryBaseUrl, categoryRouter);
  }
  start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started`);
    });
  }
  getExpressApp(): Application {
    return this.app;
  }
}

export { ExpressApp };