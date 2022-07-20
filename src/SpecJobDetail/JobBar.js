import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as React from "react";


export default function JobBar(props) {

    const jobData = props.jobData

    return (
        <Grid container spacing={0} style={{
            marginTop: "0px",
            backgroundImage: `url("https://static.wondercv.com/cv_pc_vue/img/jobs_background.a054a2b8.png")`
        }}>
            <Grid item xs={2.5}/>
            <Grid item xs={4}
                  style={{fontSize: "26px", fontWeight: "500", color: "white", paddingTop: "1.5em"}}>
                {jobData.company}
            </Grid>
            <Grid item xs={5.5} style={{paddingTop: "3em", textAlign: "center"}}>
                <a href={jobData.website} target="_blank" rel="noopener noreferrer" style={{color:"white", display:"flex",alignItems:"center"}}>
                <Button variant="contained" style={{
                    backgroundColor: "#f64",
                    padding: "10px",
                    width: "168px",
                    height: "48px"
                }}
                    // onClick={() => navigation.navigate('/cv/editor')}
                >
                    <AddIcon fontSize={"medium"}/> Apply
                </Button>
                </a>
            </Grid>
            <Grid item xs={2.5}/>
            <Grid item xs={4}
                  style={{
                      fontSize: "14px", color: "white", paddingBottom: "3em", alignItems: "center", display: "flex"
                  }}>
                <BusinessCenterIcon fontSize={"small"}/>&nbsp;{jobData.category} &nbsp;&nbsp;<LocationOnIcon
                fontSize={"small"}/>{jobData.location}
            </Grid>
            <Grid item xs={5.5}>

            </Grid>
        </Grid>
    )
}