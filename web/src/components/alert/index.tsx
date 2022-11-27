import { AlertColor, Alert as AlertMUI, Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  type: AlertColor;
};

export type Alert = {
  open: boolean;
  message: string;
  type: AlertColor;
};
/**
 * General Alert component
 * @param {Props} props
 * @returns {JSX.Element} The Alert component
 */
export const Alert = ({ open, message, type }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
    >
      <AlertMUI severity={type} sx={{ width: "100%" }}>
        {message}
      </AlertMUI>
    </Snackbar>
  );
};
