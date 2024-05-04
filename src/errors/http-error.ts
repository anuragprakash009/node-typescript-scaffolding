import { CustomError } from "./interface-error";

class HttpError extends Error implements CustomError {
  private statusCode: number;
  private errorMessage: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.errorMessage = message;
    this.statusCode = statusCode;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
  getErrorStatusCode(): number {
    return this.statusCode;
  }
}

export { HttpError };
