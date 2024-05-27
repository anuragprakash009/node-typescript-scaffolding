import { HttpError } from './http-error';
import { HTTP } from '../constant';
class ServiceUnavailableError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.SERVICE_UNAVAILABLE, message);
  }
}

export { ServiceUnavailableError };
