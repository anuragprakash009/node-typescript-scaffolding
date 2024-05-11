import { HttpError } from "./http-error";

import { HTTP } from "../constant/";

class ServerError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.INTERNAL_SERVER_ERROR, message);
  }
}

export { ServerError };
