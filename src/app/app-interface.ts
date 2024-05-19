interface App<T> {
  morgan(): void;
  middlewares(): void;
  routes(): void;
  start(): void;
  getExpressApp(): T;
}

export { App };
