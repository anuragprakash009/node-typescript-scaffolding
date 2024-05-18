import { HttpError } from './http-error';
import { HTTP } from '../constant';
class BadRequestError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.BAD_REQUEST, message);
  }
}

export { BadRequestError };
