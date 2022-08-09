import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ResumeMenu from "./ResumeMenu";
import {useContext, useEffect, useState} from "react";
import {useRequest, useResource} from "react-request-hook";
import {UserContext} from "../context";

export default function ResumeCard() {
    const {user} = useContext(UserContext);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [resumes, getResumes] = useResource((userId) => ({
        url: `/get-resumes/${userId}`,
        method: 'GET',
    }));
    const [, sendDeleteResume] = useRequest((id) => ({
        url: `/deleteResume/${id}`,
        method: "GET"
    }))

    const handleDialogClickOpen = (e) => {
        e.stopPropagation()
        setDialogOpen(true);
    };
    const [finalName, setFinalName] = useState("")
    const [deleteUpdateTrigger, setDeleteUpdateTrigger] = useState(true)

    useEffect(() => getResumes(user.id), [user.id, getResumes, finalName, deleteUpdateTrigger])


    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 375,
                    height: 482,
                },
            }}
        >
            <Paper elevation={0} style={{margin: "15px"}}>
                <Grid container spacing={2} style={{padding: "0px"}}>
                    {resumes.isLoading || !resumes.data ?
                        <Grid item xs={12} style={{padding: "12px"}}>
                            <span style={{
                                fontWeight: "500"
                            }}>My resume (0)
                            </span>
                        </Grid> :
                        <>
                            <Grid item xs={12}>
                                <span style={{
                                    fontWeight: "500"
                                }}>My resume ({resumes.data.data.length})
                                </span>
                            </Grid>
                            {resumes.data.data.map((value, index) => {
                                return (
                                    <Grid item xs={12} key={index}>
                                        <Card elevation={0} sx={{display: 'flex'}}
                                              style={{width: 333, height: 74, border: "1px solid #ececec"}}
                                              component="span">
                                            <CardMedia
                                                component="img"
                                                sx={{width: 34, height: 42}}
                                                image={"https://files.wondercv.com/PC/cvs/myresume_red.png"}
                                                alt="Live from space album cover"
                                                style={{margin: "10px"}}
                                            />
                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={10}>
                                                        <Typography component="div" variant="h8" style={{
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            color: "#404040"
                                                        }}>
                                                            {value.resumeName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} style={{textAlign: "right", padding: "0px"}}>
                                                        <ResumeMenu dialogOpen={dialogOpen} value={value}
                                                                    handleDialogClickOpen={handleDialogClickOpen}
                                                                    setDialogOpen={setDialogOpen}
                                                                    setFinalName={setFinalName}
                                                                    sendDeleteResume={sendDeleteResume}
                                                                    deleteUpdateTrigger={deleteUpdateTrigger}
                                                                    setDeleteUpdateTrigger={setDeleteUpdateTrigger}/>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </>
                    }
                </Grid>
            </Paper>
        </Box>
    )
}