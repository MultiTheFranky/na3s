import { Close } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Modal } from "../../components/modal";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

/**
 *
 * @param props
 * @returns
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  return (
    <Modal open={open} onClose={onClose} width="80vw">
      <>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Add server
          </Typography>
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
          <Tab label="General" />
          <Tab label="Basic" />
          <Tab label="Config" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <GeneralTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <BasicTab />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <ConfigTab />
        </TabPanel>
      </>
    </Modal>
  );
};

/**
 *
 * @returns
 */
const GeneralTab = () => {
  return (
    <>
      <form></form>
    </>
  );
};

/**
 *
 * @returns
 */
const BasicTab = () => {
  return <></>;
};

/**
 *
 * @returns
 */
const ConfigTab = () => {
  return <></>;
};
