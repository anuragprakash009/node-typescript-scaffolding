import morgan from 'morgan';
import { RotatingFileStream, createStream } from 'rotating-file-stream';
import { AccessLogger } from './access.logger.interface';
import { Handler } from 'express';

class HttpAccessLogger implements AccessLogger {
  private accessLogStream: RotatingFileStream;
  private logPath: string;
  constructor(logPath: string) {
    this.logPath = logPath;
    this.accessLogStream = createStream('access.log', {
      interval: '30d',
      path: this.logPath,
    });
  }
  getAccessLoggerMiddleWare(): Handler {
    return morgan('combined', { stream: this.accessLogStream });
  }
}

export { HttpAccessLogger };
