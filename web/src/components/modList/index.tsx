import { Add, Delete } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Arma3Mod, Arma3Server } from "shared";

/**
 * Component to display a list of mods
 * @param mods The list of mods to display
 * @param setServer The function to update the server state
 */
export const ModList = ({
  mods,
  server,
  setServer
}: {
  mods: Arma3Mod[];
  server: Arma3Server;
  setServer: React.Dispatch<React.SetStateAction<Arma3Server>>;
}) => {
  return (
    <Grid container spacing={2}>
      <IconButton
        onClick={() => {
          setServer({
            ...server,
            serverMods: [
              ...server.serverMods,
              {
                id: crypto.randomUUID(),
                name: "mod",
                path: "\\path\\to\\mod",
                enabled: true
              }
            ]
          });
        }}
      >
        <Add />
      </IconButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mods.map((mod) => {
              return (
                <TableRow key={mod.id}>
                  <TableCell>
                    <TextField
                      value={mod.name}
                      onChange={(event) => {
                        setServer({
                          ...server,
                          serverMods: server.serverMods.map((serverMod) => {
                            if (serverMod.id === mod.id) {
                              return {
                                ...serverMod,
                                name: event.target.value
                              };
                            }
                            return serverMod;
                          })
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={mod.path}
                      onChange={(event) => {
                        setServer({
                          ...server,
                          serverMods: server.serverMods.map((serverMod) => {
                            if (serverMod.id === mod.id) {
                              return {
                                ...serverMod,
                                path: event.target.value
                              };
                            }
                            return serverMod;
                          })
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={mod.enabled}
                      onChange={(event) => {
                        setServer({
                          ...server,
                          serverMods: server.serverMods.map((serverMod) => {
                            if (serverMod.id === mod.id) {
                              return {
                                ...serverMod,
                                enabled: event.target.checked
                              };
                            }
                            return serverMod;
                          })
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setServer({
                          ...server,
                          serverMods: server.serverMods.filter((serverMod) => serverMod.id !== mod.id)
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
