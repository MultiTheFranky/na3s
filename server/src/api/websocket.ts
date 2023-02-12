import { LogData, WebSocketEnv } from "shared";
import { WebSocketServer } from "ws";

import {
  getSteamCMDUser,
  updateSteamCMDUser,
} from "../db/components/steamcmd/user";
import { loadEnvironmentVariables } from "../env";
import { logError, logInfo } from "../logger";

const logsData: LogData[] = [];

export let wss: WebSocketServer;

/**
 * Function to create a websocket server
 */
export const ws = async () => {
  const { REACT_APP_WEBHOOK_PORT } = loadEnvironmentVariables<WebSocketEnv>();
  wss = new WebSocketServer({ port: REACT_APP_WEBHOOK_PORT ?? 8200 });
  wss.on("connection", (ws) => {
    logsData.forEach((data) => {
      ws.send(JSON.stringify(data));
    });
  });
  wss.on("data", async (data: LogData) => {
    logInfo(data.message);
    if (data.type === "steamGuard" && data.message) {
      const user = await getSteamCMDUser();
      if (user) {
        await updateSteamCMDUser({ ...user, steamGuardCode: data.message });
      }
    }
  });
  logInfo(
    `🎯 Websocket server is running on port ${REACT_APP_WEBHOOK_PORT} 🎯`
  );
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
