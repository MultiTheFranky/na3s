import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Arma3Server } from "shared";

import { TabProps } from "..";
/**
 * Component to display the parameters of a server
 * @param server The server to display the parameters of
 * @param setServer The function to update the server state
 * @returns React component
 */
export const ParametersTab = ({ server, setServer }: TabProps) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(server.parameters).map((parameter) => {
        return (
          <Grid item xs={2} key={parameter}>
            {typeof server.parameters[parameter as keyof Arma3Server["parameters"]] === "boolean" ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={server.parameters[parameter as keyof Arma3Server["parameters"]] as boolean}
                    onChange={(event) => {
                      setServer({
                        ...server,
                        parameters: {
                          ...server.parameters,
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
                value={server.parameters[parameter as keyof Arma3Server["parameters"]]}
                onChange={(event) => {
                  setServer({
                    ...server,
                    parameters: {
                      ...server.parameters,
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
