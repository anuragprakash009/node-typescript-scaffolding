import { Handler } from 'express';

interface AccessLogger {
  getAccessLoggerMiddleWare(): Handler;
}

export { AccessLogger };
