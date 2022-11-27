import React, { ReactElement } from "react";
import { LogData } from "shared";

export type WSContext = {
  wsLogs: LogData[];
  webSocket: WebSocket | null;
};

export const WSContext = React.createContext<WSContext>({
  wsLogs: [],
  webSocket: null,
});

/**
 * Auth provider content system
 * @param {React.PropsWithChildren<{}>} props
 * @returns {JSX.Element}
 */
export const WSProvider = ({ children }: { children: ReactElement }) => {
  const [wsLogs, setWSLogs] = React.useState<LogData[]>([]);
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    createWebSocket(webSocket, setWebSocket, setWSLogs);
  }, []);

  return (
    <WSContext.Provider
      value={{
        wsLogs,
        webSocket,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

/**
 * Main function to create a websocket
 */
const createWebSocket = (
  webSocket: WebSocket | null,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>,
  setWSLogs: React.Dispatch<React.SetStateAction<LogData[]>>
) => {
  if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
    const ws = new WebSocket(
      `ws://${window.location.hostname}:${
        process.env.REACT_APP_WEBHOOK_PORT ?? 8080
      }`
    );
    ws.onopen = () => {
      setWebSocket(ws);
    };
    ws.onmessage = (e) => {
      setWSLogs((prev) => [...prev, JSON.parse(e.data) as LogData]);
    };
    ws.onclose = () => {
      setWebSocket(null);
      // Reconnect in 5 seconds
      setTimeout(
        () => createWebSocket(webSocket, setWebSocket, setWSLogs),
        5000
      );
    };
  }
};
