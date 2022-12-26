import { Logout } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { List, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth/index";
import { ColorModeContext } from "../../contexts/theme/index";
import { Page, dashboardPages } from "../../pages/index";
import { getNickFromEmail } from "../../utils/nickText/index";
import { AddServer } from "../addServer/index";
import { DarkMode } from "../darkMode/index";
import { Settings } from "../settings";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

/**
 * LogOut component
 */
const LogOut = () => {
  const { setUser } = React.useContext(AuthContext);
  return (
    <IconButton>
      <Tooltip title="Log out">
        <Logout
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            <Navigate to="/" />;
          }}
        />
      </Tooltip>
    </IconButton>
  );
};

/**
 *
 * @returns {JSX.Element}
 */
export const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState<Page>(dashboardPages[0]);
  /**
   *
   */
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { theme } = React.useContext(ColorModeContext);

  const { user } = React.useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {page.name}
            </Typography>
            {user?.email && (
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {getNickFromEmail(user?.email)}
              </Typography>
            )}
            {user?.admin && <AddServer />}
            {user?.admin && <Settings />}
            <DarkMode />
            <LogOut />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Grid
              container
              spacing={2}
              sx={{
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {dashboardPages.map((page) => (
                <Grid item xs={12} key={page.name}>
                  {open ? (
                    <Button
                      onClick={() => {
                        setPage(page);
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        {page.name}
                      </Typography>
                    </Button>
                  ) : (
                    <Tooltip title={page.name}>
                      <IconButton
                        onClick={() => {
                          setPage(page);
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                          }}
                        >
                          {page.icon}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              ))}
            </Grid>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {page.component}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
