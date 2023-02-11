import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import { LogData } from "shared";

import { Modal } from "../../components/modal";

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
  const [open, setOpen] = React.useState(false);

  /**
   * Function to close the modal
   */
  const onClose = () => {
    setOpen(false);
  };

  /**
   *
   * @param data
   */
  const onSubmitHandler = (data: any) => {
    console.log(data);
    if (webSocket) {
      const dataToSend: LogData = {
        type: "steamGuard",
        message: data.steamGuard,
      };
      webSocket.send(JSON.stringify(dataToSend));
    } else {
      console.error("WebSocket is not ready?");
    }
  };

  React.useEffect(() => {
    createWebSocket(webSocket, setWebSocket, setWSLogs, setOpen);
  }, []);

  return (
    <WSContext.Provider
      value={{
        wsLogs,
        webSocket,
      }}
    >
      {children}
      <Modal open={open} onClose={onClose} width="80vw">
        <>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Write your Steam Guard Code
            </Typography>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          </Toolbar>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmitHandler}
          >
            <TextField label="Steam Guard Code" />
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Save
            </Button>
          </Box>
        </>
      </Modal>
      ;
    </WSContext.Provider>
  );
};

/**
 * Main function to create a websocket
 */
const createWebSocket = (
  webSocket: WebSocket | null,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>,
  setWSLogs: React.Dispatch<React.SetStateAction<LogData[]>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
      const data = JSON.parse(e.data) as LogData;
      setWSLogs((prev) => [...prev, data]);
      if (data.type === "steamGuard") setOpen(true);
    };
    ws.onclose = () => {
      setWebSocket(null);
      // Reconnect in 5 seconds
      setTimeout(
        () => createWebSocket(webSocket, setWebSocket, setWSLogs, setOpen),
        5000
      );
    };
  }
};
