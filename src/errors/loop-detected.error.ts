import { HttpError } from './http-error';
import { HTTP } from '../constant';
class LoopDetectedError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.LOOP_DETECTED, message);
  }
}

export { LoopDetectedError };
