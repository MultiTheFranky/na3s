import { Add, Delete } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Arma3Mission, Arma3Server } from "shared";
/**
 * Component to display a list of missions for the server
 * @param missions The list of missions to display
 * @param setServer The function to update the server state
 */
export const MissionList = ({
  missions,
  server,
  setServer
}: {
  missions: Arma3Mission[];
  server: Arma3Server;
  setServer: React.Dispatch<React.SetStateAction<Arma3Server>>;
}) => {
  return (
    <Grid container spacing={2}>
      <IconButton
        onClick={() => {
          setServer({
            ...server,
            missions: [
              ...server.missions,
              {
                template: "mission.map",
                difficulty: "Custom"
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
              <TableCell>Difficulty</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missions.map((mission) => {
              return (
                <TableRow key={mission.template}>
                  <TableCell>
                    <TextField
                      value={mission.template}
                      onChange={(event) => {
                        setServer({
                          ...server,
                          missions: server.missions.map((serverMission) => {
                            if (serverMission.template === mission.template) {
                              return {
                                ...serverMission,
                                template: event.target.value as `string.string`
                              };
                            }
                            return serverMission;
                          })
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={mission.difficulty}
                      onChange={(event) => {
                        setServer({
                          ...server,
                          missions: server.missions.map((serverMission) => {
                            if (serverMission.template === mission.template) {
                              return {
                                ...serverMission,
                                difficulty: event.target.value as "Custom" | "Recruit" | "Regular" | "Veteran"
                              };
                            }
                            return serverMission;
                          })
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setServer((server) => {
                          return {
                            ...server,
                            missions: server.missions.filter((serverMission) => {
                              return serverMission.template !== mission.template;
                            })
                          };
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
