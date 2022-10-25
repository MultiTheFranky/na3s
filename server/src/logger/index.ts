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

  const alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
      all: true,
    }),
    winston.format.label({
      label: "[NA3S]",
    }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level} ${info.label}: ${info.message}`
    ),
    winston.format.align()
  );

  // Setup winston logger
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
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
        format: winston.format.combine(
          winston.format.colorize(),
          alignColorsAndTime
        ),
      })
    );
  }

  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "blue",
  });

  logger.info("📝 Logger initialized 📝");

  return logger;
};

export const logger = initLogger();

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
