import { Logger, createLogger, format, transports } from 'winston';
import { env } from '../config/';
import { join } from 'path';
import { ILoggerService } from './logger.interface';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ServerError } from '../errors';

class WinstonLogger implements ILoggerService {
  private logger: Logger | null;
  private filePath: string;
  private static instance: null | WinstonLogger;
  constructor() {
    this.logger = null;
    this.filePath = '';
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.getFormattedMessage = this.getFormattedMessage.bind(this);
  }
  private initialize() {
    this.filePath = env.LOG_PATH;
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new DailyRotateFile({
          filename: `${join(this.filePath, 'application-error-%DATE%.log')}`,
          level: 'error',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '50m',
          maxFiles: '30d',
        }),
        new DailyRotateFile({
          filename: `${join(this.filePath, 'application-info-%DATE%.log')}`,
          level: 'info',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '50m',
          maxFiles: '30d',
        }),
        new DailyRotateFile({
          filename: `${join(this.filePath, 'application-combined-%DATE%.log')}`,
          level: 'debug',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '50m',
          maxFiles: '30d',
        }),
      ],
    });
    if (env.NODE_ENV === 'development') {
      this.logger.add(
        new transports.Console({
          format: format.json(),
        }),
      );
    }
  }
  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
      WinstonLogger.instance.initialize();
    }
    return WinstonLogger.instance;
  }
  debug(message: string): void {
    if (!this.logger) {
      throw new ServerError(`Logger not initialized`);
    }
    const isoTimeStamp = new Date().toISOString();

    this.logger.debug({
      message: message,
      timeStamp: isoTimeStamp,
    });
  }
  error(message: string): void {
    if (!this.logger) {
      throw new ServerError(`Logger not initialized`);
    }
    const isoTimeStamp = new Date().toISOString();

    this.logger.error({
      message: message,
      timeStamp: isoTimeStamp,
    });
  }
  info(message: string): void {
    if (!this.logger) {
      throw new ServerError(`Logger not initialized`);
    }
    const isoTimeStamp = new Date().toISOString();
    this.logger.info({
      message: message,
      timeStamp: isoTimeStamp,
    });
  }
  getFormattedMessage(
    fileName: string,
    methodName: string,
    message: string,
    errorStack?: string,
  ): string {
    const utcTimeStamp = new Date().toUTCString();
    if (typeof errorStack === 'string') {
      return `${utcTimeStamp} ${fileName} ${methodName} ${message} ${errorStack}`;
    }
    return `${utcTimeStamp} ${fileName} ${methodName} ${message}`;
  }
}

export { WinstonLogger };
