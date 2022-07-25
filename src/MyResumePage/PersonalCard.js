import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import {useContext} from "react";
import {UserContext} from "../context";
import { Tag } from 'antd';



export default function PersonalCard(props) {

    const {user} = useContext(UserContext)

    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 375,
                    height: 115,
                },
            }}
        >
            <Paper elevation={1} style={{margin: "15px", border:"1px solid #ececec"}}>
                <Grid container spacing={2} style={{padding:"12px"}}>
                    <Grid item xs={3}>
                        <img alt={"user"} style={{width:"91px",height:"91px"}} src={user.photo} />
                    </Grid>
                    <Grid item xs={9} style={{paddingLeft:"30px"}}>
                        <div style={{fontSize:"16px",fontWeight:"500",color:"#404040",lineHeight:"16px",marginBottom:"7px"}}>{user.username}</div>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Tag color="#f5f8ff" style={{color: "#4183ff"}}>{user.degree}</Tag>
                            </Grid>
                            <Grid item xs={8}>
                                <Tag color="#f5f8ff" style={{color: "#4183ff"}}>{user.university}</Tag>
                            </Grid>
                            <Grid item xs={12} style={{fontSize:"12px",fontWeight:"400",color:"#9c9c9c",lineHeight:"12px"}}>
                                Last update: {user.lastupdate}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}