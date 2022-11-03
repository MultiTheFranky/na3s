import { LogData, WebSocketEnv } from "shared";
import { WebSocketServer } from "ws";
import { loadEnvironmentVariables } from "../env";
import { logInfo } from "../logger";

const logsData: LogData[] = [];

export let wss: WebSocketServer;

/**
 * Function to create a websocket server
 */
export const ws = async () => {
  const { WEBHOOK_PORT } = loadEnvironmentVariables<WebSocketEnv>();
  wss = new WebSocketServer({ port: WEBHOOK_PORT });
  wss.on("connection", (ws) => {
    logsData.forEach((data) => {
      ws.send(JSON.stringify(data));
    });
  });
  logInfo(`🎯 Websocket server is running on port ${WEBHOOK_PORT} 🎯`);
};

/**
 * Send a message to all connected clients
 * @param {LogData} log
 */
export const wsSend = (log: LogData) => {
  logsData.push(log);
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(log));
      }
    });

    // Remove old logs
    if (logsData.length > 100) {
      logsData.shift();
    }
  }
};
