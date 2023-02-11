import { Close, SettingsSuggest } from "@mui/icons-material";
import { AlertColor, Button, Tab, Tabs, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Arma3Server } from "shared";

import { addServer as addServerAPI } from "../../api/arma3/addServer";
import { Alert } from "../../components/alert";
import { Modal } from "../../components/modal";
import { server as arma3ServerMock } from "../../mocks/Arma3Server";
import { BasicServerConfigTab, MissionsTab, ModsTab, ParametersTab, ServerConfigTab, ServerModsTab } from "./tabs";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

/**
 * Tab panel
 * @param {TabPanelProps} props
 * @returns {JSX.Element} Tab panel
 */
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * Modal for adding a server
 * @returns {JSX.Element} Add server modal
 */
export const AddServerModal = ({ open, onClose, setOpen }: Props) => {
  const [tab, setTab] = React.useState<number>(0);
  const [server, setServer] = React.useState<Arma3Server>(arma3ServerMock);
  const [advanceMode, setAdvanceMode] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [type, setType] = React.useState<AlertColor>("success");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  /**
   * On button click
   */
  const addServer = async () => {
    if (server) {
      if (advanceMode) {
        // filter out all advanced parameters
        const serverFiltered: Arma3Server = {
          id: server.id,
          isOn: server.isOn,
          parameters: {
            port: server.parameters.port,
            basicConfig: server.parameters.basicConfig,
            config: server.parameters.config
          },
          basicServerSettings: server.basicServerSettings,
          serverSettings: {
            hostname: server.serverSettings.hostname,
            password: server.serverSettings.password,
            maxPlayers: server.serverSettings.maxPlayers,
            passwordAdmin: server.serverSettings.passwordAdmin,
            serverCommandPassword: server.serverSettings.serverCommandPassword
          },
          mods: server.mods,
          serverMods: server.serverMods,
          missions: server.missions
        };
        const response = await addServerAPI(serverFiltered);
        if (response.error) setType("error");
        setMessage(response.message);
        setOpenAlert(true);
        if (!response.error) {
          setOpen(false);
        }
      } else {
        const response = await addServerAPI(server);
        if (response.error) setType("error");
        setMessage(response.message);
        setOpenAlert(true);
        if (!response.error) {
          setOpen(false);
        }
      }
    }
  };
  return (
    <Modal open={open} onClose={onClose} width="80vw">
      <>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Add server
          </Typography>
          <IconButton
            onClick={() => {
              setAdvanceMode(!advanceMode);
            }}
          >
            <Tooltip title="Advance mode">
              {advanceMode ? <SettingsSuggest /> : <SettingsSuggest color="disabled" />}
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setTab(newValue);
          }}
        >
          <Tab label="Config" />
          <Tab label="Parameters" />
          <Tab label="Basic" />
          <Tab label="Missions" />
          <Tab label="Mods" />
          <Tab label="ServerMods" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <ServerConfigTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <ParametersTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <BasicServerConfigTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <MissionsTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <ModsTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <ServerModsTab server={server} setServer={setServer} advanceMode={advanceMode} />
        </TabPanel>
        <Button
          variant="contained"
          sx={{
            width: "100%"
          }}
          onClick={addServer}
        >
          <Typography variant="h6">Add server</Typography>
        </Button>
        <Alert open={openAlert} message={message} type={type} />;
      </>
    </Modal>
  );
};
