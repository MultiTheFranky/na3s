import {
  Add,
  AdminPanelSettings,
  Close,
  Delete,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AlertColor,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  Slider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { System, User } from "shared";

import { getSettings } from "../../api/system/get";
import { postSettings } from "../../api/system/post";
import { deleteUser } from "../../api/user/deleteUser";
import { getUsers } from "../../api/user/getUsers";
import { AuthContext } from "../../contexts/auth/index";
import { AddUserModal } from "../../modals/addUser/index";
import { Alert } from "../alert";
import { EditUser } from "../editUser";
import { Modal } from "../modal";

/**
 *
 * @returns
 */
export const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const [openAddUser, setOpenAddUser] = React.useState(false);
  const [settings, setSettings] = React.useState<System | null>();
  const [users, setUsers] = React.useState<User[]>([]);

  const [alert, setAlert] = React.useState<{
    open: boolean;
    message: string;
    type: AlertColor;
  }>({ open: false, message: "", type: "success" });
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      getSettings().then((settings) => {
        setSettings(settings);
      });
      getUsers().then((users) => {
        setUsers(users);
      });
    }
  }, [user]);

  return open ? (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setOpenAddUser(false);
      }}
    >
      <>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <Grid container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              General
            </Typography>
          </Toolbar>
          {settings && (
            <Grid container spacing={2}>
              <>
                <Grid item xs={4}>
                  <Card key="firstExecution">
                    <CardHeader
                      title="First Execution"
                      action={
                        <Checkbox checked={settings.firstExecution} disabled />
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card key="isSteamCMDRunning">
                    <CardHeader
                      title="Is SteamCMD Running"
                      action={
                        <Checkbox
                          checked={settings.isSteamCMDRunning}
                          disabled
                        />
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card key="debug">
                    <CardHeader
                      title="Debug"
                      action={
                        <Checkbox
                          checked={settings.debug}
                          onClick={() => {
                            setSettings({
                              ...settings,
                              debug: !settings.debug,
                            });
                          }}
                        />
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card key="updateInterval">
                    <CardHeader
                      title="Update Interval"
                      subheader={`${settings.updateInterval} minutes`}
                    />
                    <CardContent>
                      <Slider
                        value={settings.updateInterval}
                        valueLabelDisplay="auto"
                        onChange={(event, value) => {
                          setSettings({
                            ...settings,
                            updateInterval: value as number,
                          });
                        }}
                        max={1440}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </>
            </Grid>
          )}
          {users && user && (
            <Grid item xs={12}>
              <>
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Users
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpenAddUser(true);
                    }}
                  >
                    <Add />
                  </IconButton>
                </Toolbar>
                <Grid container spacing={2}>
                  {users
                    .sort((a, b) => {
                      if (a.admin && !b.admin) {
                        return -1;
                      }
                      if (!a.admin && b.admin) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((userList) => {
                      return (
                        <Grid item key={userList.email}>
                          <Card>
                            <CardHeader
                              title={userList.name}
                              subheader={userList.email}
                              action={
                                <>
                                  {userList.admin && (
                                    <Tooltip title="Admin">
                                      <IconButton>
                                        <AdminPanelSettings />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {user.email !== userList.email ? (
                                    <EditUser
                                      editUser={userList}
                                      setUsers={setUsers}
                                    />
                                  ) : null}
                                  {user.email !== userList.email ? (
                                    <IconButton
                                      aria-label="deleteUser"
                                      onClick={() => {
                                        deleteUser(userList.email).then(
                                          (message) => {
                                            getUsers().then((users) => {
                                              setUsers(users);
                                            });
                                            setAlert({
                                              open: true,
                                              message: message,
                                              type: "success",
                                            });

                                            setTimeout(() => {
                                              setAlert({
                                                open: false,
                                                message: alert.message,
                                                type: alert.type,
                                              });
                                            }, 3000);
                                          }
                                        );
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                  ) : null}
                                </>
                              }
                            />
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                if (user && settings) {
                  postSettings({
                    firstExecution: settings.firstExecution,
                    isSteamCMDRunning: settings.isSteamCMDRunning,
                    debug: settings.debug,
                    updateInterval: settings.updateInterval,
                  }).then((message) => {
                    setAlert({
                      open: true,
                      message: message,
                      type: "success",
                    });
                    setTimeout(() => {
                      setAlert({
                        open: false,
                        message: alert.message,
                        type: alert.type,
                      });
                      setOpen(false);
                    }, 3000);
                  });
                }
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Alert open={alert.open} message={alert.message} type={alert.type} />
        <AddUserModal
          open={openAddUser}
          setOpen={setOpenAddUser}
          setUsers={setUsers}
        />
      </>
    </Modal>
  ) : (
    <IconButton
      onClick={() => {
        setOpen(true);
      }}
    >
      <SettingsIcon />
    </IconButton>
  );
};
