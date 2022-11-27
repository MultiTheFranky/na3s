import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import { ColorModeContext } from '../../contexts/theme/index';
import { AuthContext } from '../../contexts/auth/index';
import { login } from '../../api/user/login';
import { Alert } from '../../components/alert/index';
import { getUser } from '../../api/user/getUser';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns {JSX.Element}
 */
export const Login = () => {


    const { theme } = React.useContext(ColorModeContext);
    const [alert, setAlert] = React.useState<Alert>({
        open: false,
        message: '',
        type: 'error',
    });

    const { setUser, user } = React.useContext(AuthContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
        console.log(user);
    }, []);


    /**
     * 
     * @param event 
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        if (!data.get('email') || !data.get('password')) {
            setAlert({
                open: true,
                message: 'Please enter',
                type: 'error',
            });
        }

        try {
            const token = await login(data.get('email') as string, data.get('password') as string);
            if (!token) {
                setAlert({
                    open: true,
                    message: 'Invalid credentials',
                    type: 'error',
                });
            }
            const user = await getUser(data.get('email') as string, token);
            if (!user) {
                setAlert({
                    open: true,
                    message: 'Invalid credentials',
                    type: 'error',
                });
            }

            setUser({
                ...user,
                token,
            });

            setAlert({
                open: true,
                message: 'Login successful',
                type: 'success',
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            setAlert({
                open: true,
                message: 'Invalid credentials',
                type: 'error',
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={logo} />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            <Alert
                open={alert.open}
                message={alert.message}
                type={alert.type}
            />
        </ThemeProvider>
    );
}