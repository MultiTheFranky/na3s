import { Close } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Accept } from "react-dropzone";

import { Modal } from "../../components/modal";
import { DropZone } from "./DropZone";

type Props = {
  open: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileAccepted: Accept; // For example: {"text/html": [".html"]}
  onSubmit: (files: File[]) => void;
};
/**
 * Modal for upload a file to something
 * @returns
 */
export const AddFileModal = ({
  open,
  onClose,
  setOpen,
  fileAccepted,
  onSubmit,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose} width="80vw">
      <>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Upload file
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <DropZone fileAccepted={fileAccepted} onSubmit={onSubmit} />
      </>
    </Modal>
  );
};
