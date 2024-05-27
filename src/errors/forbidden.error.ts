import { HttpError } from './http-error';
import { HTTP } from '../constant';
class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.FORBIDDEN, message);
  }
}

export { ForbiddenError };
