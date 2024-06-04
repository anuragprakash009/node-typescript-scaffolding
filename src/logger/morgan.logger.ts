import morgan from 'morgan';
import { RotatingFileStream, createStream } from 'rotating-file-stream';
import { AccessLogger } from './access.logger.interface';
import { Handler } from 'express';
import { env } from '../config';

class HttpAccessLogger implements AccessLogger {
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
