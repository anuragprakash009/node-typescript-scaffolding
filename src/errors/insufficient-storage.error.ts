import { HttpError } from './http-error';
import { HTTP } from '../constant';
class InSufficientStorageError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.INSUFFICIENT_STORAGE, message);
  }
}

export { InSufficientStorageError };
