import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Arma3Server } from "shared";

import { TabProps } from "..";

/**
 * Component to display the server settings of a server
 * @param server The server to display the server settings of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const ServerConfigTab = ({ server, setServer }: TabProps) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(server.serverSettings).map((parameter) => {
        return (
          <Grid item xs={2} key={parameter}>
            {typeof server.serverSettings[parameter as keyof Arma3Server["serverSettings"]] === "boolean" ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={server.serverSettings[parameter as keyof Arma3Server["serverSettings"]] as boolean}
                    onChange={(event) => {
                      setServer({
                        ...server,
                        serverSettings: {
                          ...server.serverSettings,
                          [parameter]: event.target.checked
                        }
                      });
                    }}
                  />
                }
                label={parameter}
              />
            ) : (
              <TextField
                label={parameter}
                value={server.serverSettings[parameter as keyof Arma3Server["serverSettings"]]}
                onChange={(event) => {
                  setServer({
                    ...server,
                    serverSettings: {
                      ...server.serverSettings,
                      [parameter]: event.target.value
                    }
                  });
                }}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
