import { HttpError } from './http-error';
import { HTTP } from '../constant';
class NetworkAuthRequiredError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.NETWORK_AUTHENTICATION_REQUIRED, message);
  }
}

export { NetworkAuthRequiredError };
