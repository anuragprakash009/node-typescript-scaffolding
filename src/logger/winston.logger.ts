import { Logger, createLogger, format, transports } from "winston";
import { env } from "../config/";
import { join } from "path";
import { LoggerService } from "./logger.interface";

class WinstonLogger implements LoggerService {
  private logger: Logger;
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new transports.File({
          filename: `${join(this.filePath, "error.log")}`,
          level: "error",
        }),
        new transports.File({
          filename: `${join(this.filePath, "debug.log")}`,
          level: "debug",
        }),
        new transports.File({
          filename: `${join(this.filePath, "combined.log")}`,
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
  debug(fileName: string, methodName: string, message: string): void {
    const isoTimeStamp = new Date().toISOString();

    const formattedMessage = this.getFormattedMessage(
      fileName,
      methodName,
      message
    );

    this.logger.debug({
      message: formattedMessage,
      timeStamp: isoTimeStamp,
    });
  }
  error(
    fileName: string,
    methodName: string,
    message: string,
    errorStack: string | undefined
  ): void {
    const isoTimeStamp = new Date().toISOString();

    const formattedMessage = this.getFormattedMessage(
      fileName,
      methodName,
      message,
      errorStack
    );

    this.logger.error({
      message: formattedMessage,
      timeStamp: isoTimeStamp,
    });
  }
  info(fileName: string, methodName: string, message: string): void {
    const isoTimeStamp = new Date().toISOString();

    const formattedMessage = this.getFormattedMessage(
      fileName,
      methodName,
      message
    );

    this.logger.info({
      message: formattedMessage,
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
