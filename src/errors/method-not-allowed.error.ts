import { HttpError } from './http-error';
import { HTTP } from '../constant';
class MethodNotAllowedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.METHOD_NOT_ALLOWED, message);
  }
}

export { MethodNotAllowedError };
