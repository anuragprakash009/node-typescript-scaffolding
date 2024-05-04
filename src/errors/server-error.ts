import { CustomError } from "./interface-error";

class ServerError extends Error implements CustomError {
  private statusCode: number;
  private errorMessage: string;
  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 500;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
  getErrorStatusCode(): number {
    return this.statusCode;
  }
}

export { ServerError };
