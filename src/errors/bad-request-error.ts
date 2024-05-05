import { CustomError } from "./interface-error";
import { HTTP } from "../constant";
class BadRequestError extends Error implements CustomError {
  private statusCode: number;
  private errorMessage: string;
  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    this.statusCode = HTTP.RESPONSE_CODE.BAD_REQUEST;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
  getErrorStatusCode(): number {
    return this.statusCode;
  }
}

export { BadRequestError };
