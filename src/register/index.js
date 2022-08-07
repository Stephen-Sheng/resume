import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigation, Link as NavLink} from 'react-navi'
import {useRequest} from "react-request-hook";
import {useInput} from "react-hookedup";
import {useContext, useState} from "react";
import {SnackContext} from "../context";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import md5 from "md5"
import {OrangeBorderTextField} from "../SearchJobPage";
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

export default function SignUp() {
    const email = useInput("")
    const password = useInput("")
    const firstName = useInput("")
    const lastName = useInput("")
    const passwordConfirm = useInput("")
    const navigation = useNavigation()
    const {setSnackOpen, setSnackMsg} = useContext(SnackContext)
    const [regErr, setRegErr] = useState(false)
    const [,createRegRequest] = useRequest((username,password,email)=>({
        url:'/register',
        method:'POST',
        data:{username,password:md5(password),email}
    }))
    const handleSubmit = async (event) => {
        event.preventDefault();
        let username = `${firstName.value} ${lastName.value}`
        console.log(username)
        const {ready} = createRegRequest(username, password.value, email.value);
        try{
            const data = await ready()
            console.log(data)
            if (data.status === 200) {
                await navigation.navigate("/")
                setSnackMsg("Registration Success!")
                setSnackOpen(true)
            } else {
                setRegErr(true)
            }
        } catch (e) {
            console.log("e")
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        {regErr && <Alert severity="error" style={{marginBottom:'15px'}}>
                            <AlertTitle>Sign up failed</AlertTitle>
                            This email has been registered!
                        </Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <OrangeBorderTextField
                                    {...firstName.bindToInput}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <OrangeBorderTextField
                                    {...lastName.bindToInput}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OrangeBorderTextField
                                    {...email.bindToInput}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OrangeBorderTextField
                                    {...password.bindToInput}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OrangeBorderTextField
                                    {...passwordConfirm.bindToInput}
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Password Confirmation"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="new-password"
                                    error={password.value === passwordConfirm.value?false:true}
                                    helperText={"Please ensure that you enter the same password twice"}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                            {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{backgroundColor:"#f64"}}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink href="/sign-in">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}