import { HttpError } from './http-error';
import { HTTP } from '../constant';
class HttpVersionNotSupportedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.HTTP_VERSION_NOT_SUPPORTED, message);
  }
}

export { HttpVersionNotSupportedError };
