import { CustomError } from "./interface-error";

import { HTTP } from "../constant/";

class ServerError extends Error implements CustomError {
  private statusCode: number;
  private errorMessage: string;
  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    this.statusCode = HTTP.RESPONSE_CODE.INTERNAL_SERVER_ERROR;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
  getErrorStatusCode(): number {
    return this.statusCode;
  }
}

export { ServerError };
