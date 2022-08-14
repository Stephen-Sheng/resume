import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigation, Link as NavLink} from 'react-navi'
import {useRequest} from "react-request-hook";
import {useInput} from "react-hookedup";
import {useContext, useState} from "react";
import {SnackContext, UserContext} from "../context";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styled from "styled-components";
import md5 from "md5"

const OrangeBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #ff6644;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #ff6644;
    }
  }
`;
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.southampton.ac.uk/">
                University of Southampton
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const email = useInput("")
    const password = useInput("")
    let navigation = useNavigation()
    const {setSnackOpen, setSnackMsg} = useContext(SnackContext)
    const [loginErr, setLoginErr] = useState(false)
    const {userDispatch} = useContext(UserContext)
    const [, createLoginRequest] = useRequest((email, password) => ({
        url: '/login',
        method: 'post',
        data: {email, password:md5(password)}
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {ready} = createLoginRequest(email.value, password.value);
        try {
            const data = await ready()
            if (data.status === 200) {
                setSnackMsg(`Hello, ${data.data.username.split(" ")[0]}`)
                setSnackOpen(true)
                await userDispatch({
                    type: "LOGIN",
                    username: data.data.username,
                    id: data.data.id,
                    university: data.data.university,
                    degree:data.data.degree,
                    photo:data.data.photo,
                    lastupdate: data.data.lastupdate
                })
                await navigation.navigate("/")
            } else {
                setLoginErr(true);
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
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
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                            {loginErr && <Alert severity="error">
                                <AlertTitle>Login failed</AlertTitle>
                                Invalid email or password — <strong>check it out!</strong>
                            </Alert>}
                            <OrangeBorderTextField
                                {...email.bindToInput}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                variant={"outlined"}
                            />
                            <OrangeBorderTextField
                                {...password.bindToInput}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant={"outlined"}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                style={{backgroundColor:"#f64"}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/*<NavLink href="/sign-up">*/}
                                    {/*    Forgot password?*/}
                                    {/*</NavLink>*/}
                                </Grid>
                                <Grid item>
                                    <NavLink href="/sign-up">
                                        Don't have an account? Sign Up
                                    </NavLink>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}