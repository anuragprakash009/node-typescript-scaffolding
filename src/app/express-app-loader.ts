import { Application } from "express";
import { App } from "./app-interface";
import { productRouters } from "../module";
import { APP_CONSTANT } from "../constant";

class ExpressApp implements App<Application> {
  private app: Application;
  private port: number;
  constructor(app: Application, port: number) {
    this.port = port || 8000;
    this.app = app;
  }
  middlewares(): void {
    console.log(`Middlewares initialized`);
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
