import { DarkMode as DarkModeIcon, LightMode } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

import { ColorModeContext } from "../../contexts/theme/index";

/**
 *
 * @returns {JSX.Element}
 */
export const DarkMode = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const { toggleColorMode } = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {darkMode ? (
        <Tooltip title={"Turn off Dark Mode"}>
          <IconButton
            onClick={() => {
              toggleColorMode();
              setDarkMode(false);
            }}
          >
            <DarkModeIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={"Turn on Dark Mode"}>
          <IconButton
            onClick={() => {
              toggleColorMode();
              setDarkMode(true);
            }}
          >
            <LightMode />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
