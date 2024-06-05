import { Handler } from 'express';

interface IAccessLogger {
  getAccessLoggerMiddleWare(): Handler;
}

export { IAccessLogger };
