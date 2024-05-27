import { HttpError } from './http-error';
import { HTTP } from '../constant';
class BadGateWayError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.BAD_GATEWAY, message);
  }
}

export { BadGateWayError };
