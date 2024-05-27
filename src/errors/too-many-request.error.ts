import { HttpError } from './http-error';
import { HTTP } from '../constant';
class TooManyRequestsError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.TOO_MANY_REQUESTS, message);
  }
}

export { TooManyRequestsError };
