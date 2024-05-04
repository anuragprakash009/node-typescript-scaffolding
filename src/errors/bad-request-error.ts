import { CustomError } from "./interface-error";

class BadRequestError extends Error implements CustomError {
  private statusCode: number;
  private errorMessage: string;
  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 400;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
  getErrorStatusCode(): number {
    return this.statusCode;
  }
}

export { BadRequestError };
