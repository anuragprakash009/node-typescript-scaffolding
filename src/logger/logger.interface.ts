interface LoggerService {
  info(msg: string): void;
  debug(msg: string): void;
  error(msg: string): void;
}

export { LoggerService };
