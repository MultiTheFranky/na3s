export type LogType = "info" | "error" | "warn" | "debug" | "steamGuard";

export type LogData = {
  type: LogType;
  message: string;
};
