import { Card, CardHeader } from "@mui/material";
import { Arma3Server } from "shared";

import { getHostname } from "../../utils/getHostname";

/**
 * Card component for server
 * @param {Arma3Server} server
 * @returns JSX.Element
 */
export const ServerCard = (server: Arma3Server) => {
  return (
    <Card
      sx={{
        padding: "1rem",
        margin: "1rem",
        backgroundColor: server.isOn ? "green" : "red"
      }}
    >
      <CardHeader
        title={server.serverSettings.hostname}
        subheader={`${getHostname()}:${server.parameters.port}`}
        titleTypographyProps={{
          variant: "h4",
          color: (theme) => (theme.palette.mode === "dark" ? "#d2d2d2" : "#1c1c1c")
        }}
      />
    </Card>
  );
};
