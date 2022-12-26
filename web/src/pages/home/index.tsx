import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Arma3Server } from "shared";

import { getArma3Servers } from "../../api/arma3/getServers";
import { ServerCard } from "../../components/serverCard/index";
import { AuthContext } from "../../contexts/auth/index";

/**
 *
 * @return {JSX.Element} Home page
 */
export const Home = () => {
  const { user } = React.useContext(AuthContext);

  const [servers, setServers] = React.useState<Arma3Server[]>([]);

  React.useEffect(() => {
    if (user) {
      getArma3Servers(user.token).then((servers) => {
        setServers(servers);
      });
    }
  }, [user]);

  return (
    <Grid container>
      {servers.length > 0 ? (
        <Grid item xs={12}>
          {servers.map((server) => {
            return <ServerCard key={server.id} {...server} />;
          })}
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Card
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Typography variant="h4">No servers found</Typography>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};
