import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Arma3Server } from "shared";

import { TabProps } from "..";

/**
 * Component to display the basic server settings of a server
 * @param server The server to display the basic server settings of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const BasicServerConfigTab = ({ server, setServer, advanceMode }: TabProps) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(server.basicServerSettings).map((parameter) => {
        if (!advanceMode) {
          return null;
        }
        return (
          <Grid item xs={2} key={parameter}>
            {typeof server.basicServerSettings[parameter as keyof Arma3Server["basicServerSettings"]] === "boolean" ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      server.basicServerSettings[
                        parameter as keyof Arma3Server["basicServerSettings"]
                      ] as unknown as boolean
                    }
                    onChange={(event) => {
                      setServer({
                        ...server,
                        basicServerSettings: {
                          ...server.basicServerSettings,
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
                value={server.basicServerSettings[parameter as keyof Arma3Server["basicServerSettings"]]}
                onChange={(event) => {
                  setServer({
                    ...server,
                    basicServerSettings: {
                      ...server.basicServerSettings,
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
