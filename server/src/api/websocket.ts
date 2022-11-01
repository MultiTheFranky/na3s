import { LogData } from "shared";
import { WebSocketServer } from "ws";

const logsData: LogData[] = [];

export let wss: WebSocketServer;

/**
 * Function to create a websocket server
 */
export const ws = () => {
  wss = new WebSocketServer({ port: 8080 });
  wss.on("connection", (ws) => {
    logsData.forEach((data) => {
      ws.send(JSON.stringify(data));
    });
  });
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
