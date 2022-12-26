import { Add } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

import { AddServerModal } from "../../modals/addServer/index";

/**
 * Component for adding a server
 * @returns {JSX.Element} Add server button
 */
export const AddServer = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return open ? (
    <AddServerModal
      open={open}
      onClose={() => setOpen(false)}
      setOpen={setOpen}
    />
  ) : (
    <IconButton
      onClick={() => {
        setOpen(true);
      }}
    >
      <Add fontSize="large" />
    </IconButton>
  );
};
