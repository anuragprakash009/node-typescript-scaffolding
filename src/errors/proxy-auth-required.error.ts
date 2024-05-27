import { HttpError } from './http-error';
import { HTTP } from '../constant';
class ProxyAuthRequiredError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.PROXY_AUTHENTICATION_REQUIRED, message);
  }
}

export { ProxyAuthRequiredError };
