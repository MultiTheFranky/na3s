import "winston-daily-rotate-file";

import { existsSync, mkdirSync } from "fs";

import winston from "winston";

import { wsSend } from "../api/websocket";

/**
 * Function to create a logger
 * @return {winston.Logger} The logger
 */
const initLogger = () => {
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
        format: alignColorsAndTime,
      })
    );
  }

  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "blue",
  });

  /* logger.exceptions.handle(
    new winston.transports.Console({
      format: alignColorsAndTime,
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logsDir}/exceptions.log`,
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "200m",
      maxFiles: "14d",
    })
  ); */

  logger.info("📝 Logger initialized 📝");

  return logger;
};

const logger = initLogger();

/**
 * Function to log information
 * @param {any } message Message to log
 */
export const logInfo = (...message: any) => {
  wsSend({
    type: "info",
    message: `${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")} info [NA3S]: ${message.join(" ")}`,
  });
  logger.info(message.join(" "));
};

/**
 * Function to log warnings
 * @param {any } message Message to log
 */
export const logWarn = (...message: any) => {
  wsSend({
    type: "warn",
    message: `${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")} warn [NA3S]: ${message.join(" ")}`,
  });
  logger.warn(message.join(" "));
};

/**
 * Function to log errors
 * @param {any } message Message to log
 */
export const logError = (...message: any) => {
  wsSend({
    type: "error",
    message: `${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")} error [NA3S]: ${message.join(" ")}`,
  });
  logger.error(message.join(" "));
};

/**
 * Function to log debug
 * @param {any } message Message to log
 */
export const logDebug = (...message: any) => {
  wsSend({
    type: "debug",
    message: `${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")} debug [NA3S]: ${message.join(" ")}`,
  });
  logger.debug(message.join(" "));
};
