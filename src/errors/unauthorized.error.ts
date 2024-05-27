import { HttpError } from './http-error';
import { HTTP } from '../constant';
class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.UNAUTHORIZED, message);
  }
}

export { UnauthorizedError };
