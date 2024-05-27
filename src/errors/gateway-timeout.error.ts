import { HttpError } from './http-error';
import { HTTP } from '../constant';
class GateWayTimeoutError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.GATEWAY_TIMEOUT, message);
  }
}

export { GateWayTimeoutError };
