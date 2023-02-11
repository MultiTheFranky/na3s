import "./DropZone.css";

import { FilePresent } from "@mui/icons-material";
import { AlertColor, Button, Grid, Icon, Paper } from "@mui/material";
import React from "react";
import Dropzone, { Accept } from "react-dropzone";

import { Alert } from "../../../components/alert";
import { ColorModeContext } from "../../../contexts/theme";

type Props = {
  fileAccepted: Accept;
  onSubmit: (files: File[]) => void;
};
/**
 *
 * @returns
 */
export const DropZone = ({ fileAccepted, onSubmit }: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<AlertColor>("info");
  /**
   *
   * @param acceptedFiles
   * @returns
   */
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  /**
   * Handle reject files
   */
  const handleReject = () => {
    setOpen(true);
    setMessage("File type not supported");
    setType("error");
  };

  /**
   *
   * @param error
   */
  const handleError = (error: Error) => {
    setOpen(true);
    setMessage(error.message);
    setType("error");
  };

  const { theme } = React.useContext(ColorModeContext);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 280
          }}
        >
          <Dropzone
            onDrop={handleDrop}
            onDropRejected={handleReject}
            onError={handleError}
            accept={fileAccepted}
            minSize={0}
            maxSize={3072000}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
              const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

              return (
                <div
                  {...getRootProps({
                    className: `dropzone ${additionalClass}`
                  })}
                  style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper
                  }}
                >
                  <input {...getInputProps()} />
                  <span>{isDragActive ? "📂" : "📁"}</span>
                  <p>Drag & drop a file to upload</p>
                  {files.map((file: File) => (
                    <p key={file.name}>
                      <Icon component={FilePresent} />
                      {file.name}
                    </p>
                  ))}
                </div>
              );
            }}
          </Dropzone>
          <Button
            onClick={() => {
              onSubmit(files);
            }}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
      <Alert open={open} message={message} type={type} />
    </Grid>
  );
};
