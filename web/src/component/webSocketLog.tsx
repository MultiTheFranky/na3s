import React from "react";
import { WSContext } from "../context/webSocket";

/**
 * 
 * @returns 
 */
export const WebSocketLog = () => {
    const { wsLogs } = React.useContext(WSContext);
    return (
        <div>
            {wsLogs.map((log, i) => (
                <div key={i} style={{
                    color: log.type === "error" ? "red" :
                        log.type === "warn" ? "orange" : log.type === "info" ? "blue" : "cyan",
                    textAlign: "left",
                }}>{log.message}</div>
            ))}
        </div>
    );
};