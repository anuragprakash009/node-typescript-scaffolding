import { HttpError } from './http-error';
import { HTTP } from '../constant';
class UnprocessableEntityError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.UNPROCESSABLE_ENTITY, message);
  }
}

export { UnprocessableEntityError };
