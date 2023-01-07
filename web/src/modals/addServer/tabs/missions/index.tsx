import Grid from "@mui/material/Grid";

import { MissionList } from "../../../../components/missionList/index";
import { TabProps } from "..";

/**
 * Component to display the missions of a server
 * @param server The server to display the missions of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const MissionsTab = ({ server, setServer }: TabProps) => {
  return (
    <Grid container spacing={2}>
      <MissionList
        missions={server.missions}
        server={server}
        setServer={setServer}
      />
    </Grid>
  );
};
