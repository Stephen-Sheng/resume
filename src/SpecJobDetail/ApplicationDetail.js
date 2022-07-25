import React from 'react';
import Grid from "@mui/material/Grid";
import ReactTextCollapse from "react-text-collapse";
const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: 'show more',
    expandText: 'show less',
    minHeight: 220,
    maxHeight: 1500,
    textStyle: {
        color: '#f64',
        fontSize: '14px',
        cursor:'pointer',
        textAlign:"right"
    },
}

const ApplicationDetail = (props) => {
    const jobData = props.jobData
    const {detail,description} = jobData;

    return (
        <Grid container spacing={2} style={{position:"relative",bottom:"10em"}}>
            <Grid item xs={12} style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#404040",
                textAlign: "Left",
                marginLeft: "22em",
                marginTop: "2em"
            }}>
                Application Detail
            </Grid>
            <Grid item xs={2.5}/>
            <Grid item xs={4} style={{marginBottom:"20px"}}>
                <img alt={"job description"} src={detail} style={{display: "block", width: "140%", height: "auto"}}/>
            </Grid>
            <Grid item xs={1.8} />
            <Grid item xs={3} style={{position:"relative",top:"80px"}}>
                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    <p style={{lineHeight:"32px"}}>{description}</p>
                </ReactTextCollapse>
            </Grid>

        </Grid>
    )
};

export default ApplicationDetail;