import { HttpError } from './http-error';
import { HTTP } from '../constant';
class NotFoundError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.NOT_FOUND, message);
  }
}

export { NotFoundError };
