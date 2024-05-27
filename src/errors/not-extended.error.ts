import { HttpError } from './http-error';
import { HTTP } from '../constant';
class NotExtendedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.NOT_EXTENDED, message);
  }
}

export { NotExtendedError };
