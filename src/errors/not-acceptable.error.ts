import { HttpError } from './http-error';
import { HTTP } from '../constant';
class NotAcceptableError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.NOT_ACCEPTABLE, message);
  }
}

export { NotAcceptableError };
