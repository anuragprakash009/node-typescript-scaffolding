interface App<T> {
  loggers(): void;
  middlewares(): void;
  routes(): void;
  start(): void;
  getExpressApp(): T;
}

export { App };
