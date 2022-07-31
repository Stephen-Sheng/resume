import './App.css';
import {RequestProvider} from 'react-request-hook';
import {axiosInstance} from './axios'
import {NotFoundBoundary, Router, View} from 'react-navi';
import {routes} from './route'
import {SnackContext, UserContext} from './context'
import {useReducer, useState} from 'react';
import {userReducer} from './reducer';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

function App() {

    // noinspection JSCheckFunctionSignatures
    const [user, userDispatch] = useReducer(userReducer, {username: null, email: null, id: null, university:null,degree:null,photo:null,lastupdate:null})
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMsg, setSnackMsg] = useState('')

    return (
        <RequestProvider value={axiosInstance}>
            <UserContext.Provider value={{user, userDispatch}}>
                <SnackContext.Provider value={{setSnackOpen, setSnackMsg}}>

                        <Router routes={routes}>
                            <NotFoundBoundary
                                render={() => <h1><span style={{color: 'red'}}>Error:404 Not Found!</span></h1>}>
                                <Snackbar
                                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                                    open={snackOpen}
                                    autoHideDuration={6000}
                                    onClose={() => setSnackOpen(false)}
                                >
                                    <Alert variant="outlined" severity="success" sx={{width: '100%'}}
                                           style={{color: "white"}}>
                                        {snackMsg}
                                    </Alert>
                                </Snackbar>
                                <View/>
                            </NotFoundBoundary>
                        </Router>
                </SnackContext.Provider>
            </UserContext.Provider>
        </RequestProvider>
    )
}

export default App;
