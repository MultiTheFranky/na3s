import { ThemeProvider } from "@emotion/react";
import {
  PaletteMode,
  PaletteOptions,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import React, { ReactElement } from "react";

const primaryMain = "#1a8200";
const primaryLight = "#37b700";
const primaryDark = "#256300";
const secondaryMain = "#f9f9f9";
const secondaryLight = "#ffffff";
const secondaryDark = "#c9c9c9";

const colors = {
  primary: {
    main: primaryMain,
    light: primaryLight,
    dark: primaryDark,
  },
  secondary: {
    main: secondaryMain,
    light: secondaryLight,
    dark: secondaryDark,
  },
};

const paletteOptions: PaletteOptions = colors;

export const ColorModeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  theme: createTheme({
    palette: {
      mode: (localStorage.getItem("theme") as PaletteMode) || "light",
      ...paletteOptions,
    },
  }),
});

/**
 * Auth provider content system
 * @param {React.PropsWithChildren<{}>} props
 * @returns {JSX.Element}
 */
export const ColorModeProvider = ({ children }: { children: ReactElement }) => {
  const [mode, setMode] = React.useState<"light" | "dark">(
    (localStorage.getItem("theme") as PaletteMode | "dark") || "light"
  );
  const themeOptions = createTheme({
    palette: {
      mode: mode,
      ...paletteOptions,
      background: {
        default: mode === "light" ? "#fff" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
  });
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      theme: responsiveFontSizes(themeOptions),
    }),
    [mode]
  );

  React.useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={responsiveFontSizes(themeOptions)}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
