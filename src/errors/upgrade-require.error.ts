import { HttpError } from './http-error';
import { HTTP } from '../constant';
class UpgradeRequiredError extends HttpError {
  constructor(message: string) {
    super(HTTP.RESPONSE_CODE.UPGRADE_REQUIRED, message);
  }
}

export { UpgradeRequiredError };
