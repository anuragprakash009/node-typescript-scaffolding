import { BadRequestError } from './bad-request-error';
import { ServerError } from './server-error';
import { HttpError } from './http-error';
import { CustomError } from './interface-error';
import { UnauthorizedError } from './unauthorized.error';
import { ForbiddenError } from './forbidden.error';
import { NotFoundError } from './not-found.error';
import { MethodNotAllowedError } from './method-not-allowed.error';
import { NotAcceptableError } from './not-acceptable.error';
import { ProxyAuthRequiredError } from './proxy-auth-required.error';
import { UnprocessableEntityError } from './unprocessable-entity.error';
import { FailedDependencyError } from './failed-dependency.error';
import { UpgradeRequiredError } from './upgrade-require.error';
import { TooManyRequestsError } from './too-many-request.error';
import { NotImplementedError } from './not-implemented.error';
import { BadGateWayError } from './bad-gateway.error';
import { ServiceUnavailableError } from './service-unavailable';
import { GateWayTimeoutError } from './gateway-timeout.error';
import { HttpVersionNotSupportedError } from './http-version-not-supported.error';
import { InSufficientStorageError } from './insufficient-storage.error';
import { LoopDetectedError } from './loop-detected.error';
import { NotExtendedError } from './not-extended.error';
import { NetworkAuthRequiredError } from './network-auth-require.error';

export {
  BadRequestError,
  CustomError,
  HttpError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  NotAcceptableError,
  ProxyAuthRequiredError,
  UnprocessableEntityError,
  FailedDependencyError,
  UpgradeRequiredError,
  TooManyRequestsError,
  NotImplementedError,
  BadGateWayError,
  ServiceUnavailableError,
  GateWayTimeoutError,
  HttpVersionNotSupportedError,
  InSufficientStorageError,
  LoopDetectedError,
  NotExtendedError,
  NetworkAuthRequiredError,
};
