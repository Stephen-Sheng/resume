import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import scoreBox from './score-box.png'
import Button from "@mui/material/Button";

const Item = styled("div")(({ theme }) => ({
    textAlign: 'left',
}));
export default function ResumeCheckBox(props) {
    let score = 100 - props.score * 10
    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 304,
                    height: 157,
                    borderRadius:"10px"
                },

            }}
        >
            <Paper elevation={0} style={{backgroundImage:`url(${scoreBox})`,  backgroundPosition: "center"
            }}>
                <Grid container spacing={2} style={{backgroundColor:"transparent"}}>
                    <Grid item xs={3}>
                        <Item style={{fontSize:"42px", backgroundColor: 'transparent', color:"white",marginLeft:"10px", fontWeight:700
                        }}>{score}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item style={{fontSize:"16px", backgroundColor: 'transparent', color:"white",marginLeft:"12px", fontWeight:700, marginTop:"30px", textAlign:"left"
                        }}>marks</Item>
                    </Grid>
                    <Grid item xs={5} >
                        <Button variant="contained" size={"small"} style={{borderRadius:"15px", backgroundColor:"white",color:"#f64", marginTop:"20px", marginLeft:"20px", fontSize:"14px", fontWeight:700}}>AI Check</Button>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:"5px"}}>
                        <LinearProgress variant="determinate" value={score} color={"inherit"} style={{marginLeft:"20px", marginRight:"20px",color:"white"}}/>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:"10px"}}>
                        <Item style={{color:"white",fontSize:"13px",fontWeight:600, lineHeight:"18px", marginLeft:"20px", marginBottom:"0px", paddingTop:"0px", marginRight:"5px"}}>
                            Hello, your resume is not good enough, please refer to the optimization suggestions, continue to improve the resume ~
                        </Item>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    )
}