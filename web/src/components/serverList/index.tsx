import Grid from "@mui/material/Grid";
import { Arma3BasicServerInfo } from "shared";

import { Server } from "../server";

type Props = {
  servers: Arma3BasicServerInfo[];
};

/**
 * Server list component
 * @param {Arma3BasicServerInfo[]} servers
 * @returns {JSX.Element}
 */
export const ServerList = ({ servers }: Props) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
      }}
    >
      {servers.map((server) => (
        <Grid item xs={4} key={server.ip}>
          <Server {...server} />
        </Grid>
      ))}
    </Grid>
  );
};
