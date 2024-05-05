interface LoggerService {
  info(fileName: string, methodName: string, message: string): void;
  debug(fileName: string, methodName: string, message: string): void;
  error(
    fileName: string,
    methodName: string,
    message: string,
    errorStack: string | undefined
  ): void;
}

export { LoggerService };
