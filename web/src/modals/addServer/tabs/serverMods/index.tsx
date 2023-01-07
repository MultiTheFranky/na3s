import Grid from "@mui/material/Grid";

import { ServerModList } from "../../../../components/serverModList/index";
import { TabProps } from "..";

/**
 * Component to display the serverMods of a server
 * @param server The server to display the serverMods of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const ServerModsTab = ({ server, setServer }: TabProps) => {
  return (
    <Grid container spacing={2}>
      <ServerModList
        mods={server.serverMods}
        server={server}
        setServer={setServer}
      />
    </Grid>
  );
};
