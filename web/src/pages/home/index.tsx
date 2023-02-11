import { Card, CardContent, Typography } from "@mui/material";
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
      getArma3Servers().then((servers) => {
        setServers(servers);
      });
    }
  }, [user]);

  return (
    <Grid container spacing={2}>
      {servers.length > 0 ? (
        servers.map((server) => {
          return (
            <Grid item xs={2}>
              <ServerCard key={server.id} {...server} />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Card
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              padding: "2rem"
            }}
          >
            <CardContent>
              <Typography variant="h4">No servers found</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};
