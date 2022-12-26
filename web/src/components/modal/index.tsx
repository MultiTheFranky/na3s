import { Modal as MUIModal } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  open: boolean;
  onClose: () => void;
  width?: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/**
 *
 * @param param0
 * @returns
 */
export const Modal = ({ children, onClose, open, width }: Props) => {
  return (
    <MUIModal
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: width ?? "75vw" }}>{children}</Box>
    </MUIModal>
  );
};
