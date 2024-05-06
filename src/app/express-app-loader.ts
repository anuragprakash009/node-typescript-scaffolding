import { Application, Request, Response } from "express";
import { App } from "./app-interface";

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
    this.app.get("/api/", (req: Request, res: Response) => {
      console.log(req);
      res.json({
        status: true,
        statusCode: 200,
        data: {
          name: "working",
        },
      });
    });
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
