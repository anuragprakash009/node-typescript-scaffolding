import morgan from 'morgan';
import { RotatingFileStream, createStream } from 'rotating-file-stream';
import { IAccessLogger } from './access.logger.interface';
import { Handler } from 'express';
import { env } from '../config';

class HttpAccessLogger implements IAccessLogger {
  private accessLogStream: RotatingFileStream;
  constructor() {
    const logPath = env.LOG_PATH;
    this.accessLogStream = createStream('access.log', {
      interval: '30d',
      path: logPath,
    });
  }
  getAccessLoggerMiddleWare(): Handler {
    return morgan('combined', { stream: this.accessLogStream });
  }
}

export { HttpAccessLogger };
