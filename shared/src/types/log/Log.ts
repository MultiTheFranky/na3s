export type LogType = "info" | "error" | "warn" | "debug";

export type LogData = {
  type: LogType;
  message: string;
};
