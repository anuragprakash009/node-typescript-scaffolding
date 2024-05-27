import { HttpError } from './http-error';
import { HTTP } from '../constant';
class NotImplementedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.NOT_IMPLEMENTED, message);
  }
}

export { NotImplementedError };
