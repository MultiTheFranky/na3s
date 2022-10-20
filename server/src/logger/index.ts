import "winston-daily-rotate-file";

import { existsSync, mkdirSync } from "fs";

import winston from "winston";

/**
 *
 * @returns
 */
export const initLogger = () => {
  // Create logger folder if it doesn't exists
  const logsDir = "logs";
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }

  // Setup winston logger
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "server" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.DailyRotateFile({
        filename: `${logsDir}/error.log`,
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "200m",
        maxFiles: "14d",
        level: "error",
      }),
      new winston.transports.DailyRotateFile({
        filename: `${logsDir}/combined.log`,
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "200m",
        maxFiles: "14d",
      }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  return logger;
};

const logger = initLogger();

/**
 * Function to log information
 * @param {string } message Message to log
 */
export const logInfo = (message: string) => {
  logger.info(message);
};

/**
 * Function to log warnings
 * @param {string } message Message to log
 */
export const logWarn = (message: string) => {
  logger.warn(message);
};

/**
 * Function to log errors
 * @param {string } message Message to log
 */
export const logError = (message: string) => {
  logger.error(message);
};
