import { Card, CardContent, CardHeader } from "@mui/material";
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
      }}
    >
      <CardHeader
        title={server.serverSettings.hostname}
        subheader={`${getHostname()}:${server.parameters.port}`}
      />
      <CardContent></CardContent>
    </Card>
  );
};
