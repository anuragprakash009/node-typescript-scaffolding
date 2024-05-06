import { Logger, createLogger, format, transports } from "winston";
import { env } from "../config/";
import { join } from "path";
import { LoggerService } from "./logger.interface";
import DailyRotateFile from "winston-daily-rotate-file";

class WinstonLogger implements LoggerService {
  private logger: Logger;
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new DailyRotateFile({
          filename: `${join(this.filePath, "application-error-%DATE%.log")}`,
          level: "error",
          datePattern: "YYYY-MM-DD-HH",
          maxSize: "50m",
          maxFiles: "30d",
        }),
        new DailyRotateFile({
          filename: `${join(this.filePath, "application-info-%DATE%.log")}`,
          level: "info",
          datePattern: "YYYY-MM-DD-HH",
          maxSize: "50m",
          maxFiles: "30d",
        }),
        new DailyRotateFile({
          filename: `${join(this.filePath, "application-combined-%DATE%.log")}`,
          level: "debug",
          datePattern: "YYYY-MM-DD-HH",
          maxSize: "50m",
          maxFiles: "30d",
        }),
      ],
    });
    if (env.NODE_ENV === "development") {
      this.logger.add(
        new transports.Console({
          format: format.json(),
        })
      );
    }
  }
  debug(message: string): void {
    const isoTimeStamp = new Date().toISOString();

    this.logger.debug({
      message: message,
      timeStamp: isoTimeStamp,
    });
  }
  error(message: string): void {
    const isoTimeStamp = new Date().toISOString();

    this.logger.error({
      message: message,
      timeStamp: isoTimeStamp,
    });
  }
  info(message: string): void {
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
    errorStack?: string
  ): string {
    const utcTimeStamp = new Date().toUTCString();
    if (typeof errorStack === "string") {
      return `${utcTimeStamp} ${fileName} ${methodName} ${message} ${errorStack}`;
    }
    return `${utcTimeStamp} ${fileName} ${methodName} ${message}`;
  }
}

export { WinstonLogger };
