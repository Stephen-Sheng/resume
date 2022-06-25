import "../../node_modules/video-react/dist/video-react.css"; // import css
import React from 'react';
import { Player, ControlBar } from 'video-react';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from "../AppBar";
import "./index.css"
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

export default function Home() {

    return (
        <div style={{backgroundColor:"black"}}>
            <ResponsiveAppBar />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: "0.5%" }}>
                <Grid item xs={2} sm={4} md={4}>
                </Grid>
                <Grid item xs={2} sm={4} md={4} style={{ textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom component="span" style={{ fontWeight: 550, color: "white" }}>
                        Recommended by Interviewers
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: "0.5%" }}>
                <Grid item xs={2} sm={4} md={4}>
                </Grid>
                <Grid item xs={2} sm={4} md={4} style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" gutterBottom component="span" style={{ fontWeight: 550, color:"#cfcfcf" }}>
                        Create a perfect CV in 30 minutes!
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: "0.5%" }}>
                <Grid item xs={2} sm={4} md={4}>
                </Grid>
                <Grid item xs={2} sm={4} md={4} style={{ textAlign: "center" }}>
                    <Button variant="contained" style={{borderRadius:"40px", backgroundImage:"linearGradient(90deg,#ff813a,#ff3d3d)", height:"150%", fontWeight:"550"}}>Generate a free professional CV</Button>
                </Grid>
            </Grid>
            <Player
                className="my-player"
                fluid={false}
                autoPlay={true}
                preload="auto"
                src="https://files.wondercv.com/%E9%A6%96%E9%A1%B5%E8%A7%86%E9%A2%91_v3.mp4"
            >
                <ControlBar disableCompletely={true} className="my-class" />
            </Player>
        </div>
    )
}