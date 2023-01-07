import Grid from "@mui/material/Grid";

import { ModList } from "../../../../components/modList/index";
import { TabProps } from "..";

/**
 * Component to display the mods of a server
 * @param server The server to display the mods of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const ModsTab = ({ server, setServer }: TabProps) => {
  return (
    <Grid container spacing={2}>
      <ModList mods={server.mods} server={server} setServer={setServer} />
    </Grid>
  );
};
