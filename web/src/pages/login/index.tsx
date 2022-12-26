import { Toolbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../api/user/getUser";
import { login } from "../../api/user/login";
import logo from "../../assets/logo.png";
import { Alert } from "../../components/alert/index";
import { DarkMode } from "../../components/darkMode/index";
import { Loading } from "../../components/loading/index";
import { ServerList } from "../../components/serverList/index";
import { AuthContext } from "../../contexts/auth/index";
import { ColorModeContext } from "../../contexts/theme/index";

/**
 *
 * @returns {JSX.Element}
 */
export const Login = () => {
  const { theme } = React.useContext(ColorModeContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [alert, setAlert] = React.useState<Alert>({
    open: false,
    message: "",
    type: "error",
  });

  const { setUser, user } = React.useContext(AuthContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (user) {
        navigate("/dashboard");
      }
    }, 1000);
  }, []);

  /**
   *
   * @param event
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password")) {
      setAlert({
        open: true,
        message: "Please enter",
        type: "error",
      });
    }

    try {
      const token = await login(
        data.get("email") as string,
        data.get("password") as string
      );
      if (!token) {
        setAlert({
          open: true,
          message: "Invalid credentials",
          type: "error",
        });
      }
      const user = await getUser(data.get("email") as string, token);
      if (!user) {
        setAlert({
          open: true,
          message: "Invalid credentials",
          type: "error",
        });
      }

      setUser({
        ...user,
        token,
      });

      setAlert({
        open: true,
        message: "Login successful",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setAlert({
        open: true,
        message: "Invalid credentials",
        type: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <ServerList
                servers={[
                  {
                    name: "test",
                    ip: "192.168.1.1",
                    port: 1,
                    players: 1,
                    maxPlayers: 1,
                    mission: {
                      template: "mission1.abramia",
                      difficulty: "Custom",
                    },
                    isOn: true,
                  },
                  {
                    name: "test2",
                    ip: "192.168.1.2",
                    port: 1,
                    players: 1,
                    maxPlayers: 1,
                    mission: {
                      template: "mission2.altis",
                      difficulty: "Custom",
                    },
                    isOn: true,
                  },
                  {
                    name: "test3",
                    ip: "192.168.1.3",
                    port: 1,
                    players: 1,
                    maxPlayers: 1,
                    mission: {
                      template: "mission3.beketov",
                      difficulty: "Custom",
                    },
                    isOn: true,
                  },
                ]}
              />
            </Grid>
            {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
            <Grid
              item
              xs={12}
              sm={10}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Toolbar>
                <div
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <DarkMode />
                </div>
              </Toolbar>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={logo} />
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Alert open={alert.open} message={alert.message} type={alert.type} />
        </>
      )}
    </ThemeProvider>
  );
};
