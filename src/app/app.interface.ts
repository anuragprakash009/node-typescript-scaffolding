interface IApp<T> {
  middlewares(): void;
  routes(): void;
  start(): void;
  getExpressApp(): T;
}

export { IApp };
