interface App<T> {
  middlewares(): void;
  routes(): void;
  start(): void;
  getExpressApp(): T;
}

export { App };
