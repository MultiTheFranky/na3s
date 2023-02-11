import { Add, Delete, FileUpload } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Arma3Mod, Arma3Server } from "shared";

import { AddFileModal } from "../../modals/addFile";
import { readHTML } from "../../utils/modsExportReader/index";

/**
 * Component to display a list of mods
 * @param mods The list of mods to display
 * @param setServer The function to update the server state
 */
export const ModList = ({
  mods,
  server,
  setServer,
}: {
  mods: Arma3Mod[];
  server: Arma3Server;
  setServer: React.Dispatch<React.SetStateAction<Arma3Server>>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
                  enabled: true,
                },
              ],
            });
          }}
        >
          <Add />
        </IconButton>
        <IconButton onClick={() => setOpen(!open)}>
          <FileUpload />
        </IconButton>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Path or SteamID</TableCell>
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
                                  name: event.target.value,
                                };
                              }
                              return serverMod;
                            }),
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
                                  path: event.target.value,
                                };
                              }
                              return serverMod;
                            }),
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
                                  enabled: event.target.checked,
                                };
                              }
                              return serverMod;
                            }),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setServer({
                            ...server,
                            serverMods: server.serverMods.filter(
                              (serverMod) => serverMod.id !== mod.id
                            ),
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
      <AddFileModal
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
        fileAccepted={{ "text/html": [".html"] }}
        onSubmit={(files) => {
          if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = async (event) => {
              const data = event.target?.result;
              if (
                data &&
                typeof data === "string" &&
                data.length > 0 &&
                data.includes(
                  "<!--Created by Arma 3 Launcher: https://arma3.com-->"
                )
              ) {
                const mods = readHTML(data);
                //filter out mods that are already in the list
                const filteredMods = mods.filter((mod) => {
                  return !server.mods.some(
                    (serverMod) => serverMod.path === mod.path
                  );
                });
                setServer({
                  ...server,
                  mods: [...server.mods, ...filteredMods],
                });
              } else {
                console.error("Invalid file");
              }
            };
            reader.readAsText(files[0]);
          }
          setOpen(false);
        }}
      />
    </>
  );
};
