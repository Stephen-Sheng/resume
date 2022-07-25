import {Steps} from 'antd';
import React from 'react';
import Grid from "@mui/material/Grid";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const {Step} = Steps;
const ProgressBar = (props) => {
    const jobData = props.jobData
    const {ddl, logo, company, category, employee} = jobData;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#404040",
                textAlign: "left",
                marginLeft: "22em",
                marginTop: "2em"
            }}>
                Application Progress
            </Grid>
            <Grid item xs={2}/>

            <Grid item xs={6}>
                <Steps progressDot current={0}>
                    <Step status={"finish"} title="Apply" description="See the official website"/>
                    <Step status={"finish"} title="Written Exam" description={`DDL:${ddl}`}/>
                    <Step status={"finish"} title="Interview" description="In batches"/>
                    <Step status={"finish"} title="Offer" description="After interviewing"/>

                </Steps>
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#404040",
                        textAlign: "left",
                        paddingLeft: "4.2em"
                    }}>
                        Company Introduction
                    </Grid>
                    <Grid item xs={4} style={{textAlign: "right"}}>
                        <img alt={logo} src={logo} style={{width: "80px", height: "80px", borderRadius: "6px"}}/>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: "left", fontSize: "14px", alignSelf: "center"}}>
                        {company}
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={1.6}/>
                    <Grid item xs={10.4} style={{alignItems: "center", display: "flex"}}>
                        <BusinessCenterIcon fontSize={"small"} style={{marginRight: "15px"}}/>{category}
                    </Grid>
                    <Grid item xs={1.6}/>
                    <Grid item xs={10.4} style={{alignItems: "center", display: "flex"}}>
                        <PeopleAltIcon fontSize={"small"} style={{marginRight: "15px"}}/>{employee} Staff
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ProgressBar;