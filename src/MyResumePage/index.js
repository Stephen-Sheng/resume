import ResponsiveAppBar from "../AppBar";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useContext, useEffect} from "react";
import {useNavigation} from "react-navi";
import {UserContext} from "../context";
import BottomBar from "./BottomBar";
import JobRecommendTab from "./JobRecommendTab";
import PersonalCard from './PersonalCard'
import ResumeCard from "./ResumeCard";

export default function MyResumePage() {

    const navigation = useNavigation();
    const {user} = useContext(UserContext)
    useEffect(()=>{
        if(!user.id){
            navigation.navigate('/sign-in')
        }
    },[user.id,navigation])

    return (
        <div style={{backgroundColor: "#f5f5f7"}}>
            <ResponsiveAppBar/>
            <Grid container spacing={{xs: 2, md: 3}} style={{marginTop: '0.1%'}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 375,
                                height: 790,
                            },
                        }}
                        style={{paddingBottom: "20px"}}
                    >
                        <Paper elevation={0}>
                            <Button variant="contained" style={{
                                backgroundColor: "#f64",
                                padding: "10px",
                                margin: "10px",
                                marginTop: "20px",
                                marginLeft: "15px"
                            }}
                                    onClick={() => navigation.navigate('/cv/editor')}
                            >
                                <AddIcon fontSize={"medium"}/> New Resume
                            </Button>
                            <Button variant="outlined"
                                    style={{color: "#f64", borderColor: "#f64", padding: "9px", marginTop: "10px"}}>
                                <UploadFileIcon fontSize={"medium"}/> Import Resume
                            </Button>
                            <PersonalCard/>
                            <ResumeCard/>
                            <BottomBar/>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={6} style={{marginLeft: "150px"}}>
                    <JobRecommendTab/>
                </Grid>
            </Grid>
        </div>
    )
}