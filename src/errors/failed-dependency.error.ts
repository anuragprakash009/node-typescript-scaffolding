import { HttpError } from './http-error';
import { HTTP } from '../constant';
class FailedDependencyError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.FAILED_DEPENDENCY, message);
  }
}

export { FailedDependencyError };
