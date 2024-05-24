import { Application, Handler } from 'express';
import { App } from './app-interface';
import { productRouters } from '../module';
import { APP_CONSTANT } from '../constant';
import { AccessLogger } from '../logger';

class ExpressApp implements App<Application> {
  private app: Application;
  private port: number;
  private accesslogger: AccessLogger;
  constructor(app: Application, port: number, accesslogger: AccessLogger) {
    this.port = port || 8000;
    this.app = app;
    this.accesslogger = accesslogger;
  }

  middlewares(): void {
    console.log(`Middlewares initialized`);
    const httpAccessLoggerMiddleware: Handler =
      this.accesslogger.getAccessLoggerMiddleWare();
    this.app.use(httpAccessLoggerMiddleware);
  }

  routes(): void {
    console.log(`Routes initialized`);
    const projectBaseUrl: string =
      APP_CONSTANT.SERVICE.BASE_URL +
      APP_CONSTANT.VERSION.NUMBER +
      APP_CONSTANT.MODULE.PRODUCT.BASE_URL;
    this.app.use(projectBaseUrl, productRouters);
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
