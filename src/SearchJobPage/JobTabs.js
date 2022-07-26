import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {Spin} from "antd";
import JobCard from "./JobCard";
import JobRecommendCard from "./JobRecommendCard";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {useResource} from "react-request-hook";
import {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function JobTabs() {

    const [value, setValue] = React.useState(0);
    const [jobItemPageApi, setJobItemPageApi] = useState(1);
    const [jobPageApi,setJobPageApi] = useState(1);
    const [jobList, requestJobList] = useResource(() => ({
        url: `/get-job/${jobPageApi}`,
        method: "GET"
    }))
    const [recomJobList, requestRecomJobList] = useResource(() => ({
        url: `/get-recomJobList/${jobItemPageApi}`,
        method: "GET"
    }))
    useEffect(() => {
        requestJobList()
        requestRecomJobList()
    }, [requestJobList, requestRecomJobList, jobItemPageApi,jobItemPageApi])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor={"inherit"}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#f64",
                        height: "3px",
                    }
                }}
                style={{paddingLeft: "10px", backgroundColor: "#f5f5f7", fontSize: "22px"}}
                aria-label="secondary tabs example"
            >
                <Tab value={0} label={<span style={value === 0 ? {fontSize: "20px"} : {fontSize: "18px"}}>University Application</span>}/>
                <Tab value={1} label={<span style={value === 0 ? {fontSize: "18px"} : {fontSize: "20px"}}>Job Recommendation</span>}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    {jobList.isLoading || !jobList.data ? <Spin/> : jobList.data.data.dataList.map((value, index) => {
                        return (
                            <JobCard key={index} company={value.company} location={value.location} ddl={value.ddl}
                                     id={value.id} logo={value.logo}></JobCard>
                        )
                    })}
                    {jobList.isLoading || !jobList.data ? null :
                        <Grid item xs={12} style={{paddingTop: "20px"}}>
                            <Pagination count={jobList.data.data.pages}
                                        shape="rounded"
                                        onChange={(e, value) => setJobPageApi(value)}/>
                        </Grid>}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    {recomJobList.isLoading || !recomJobList.data ?
                        <Spin/> : recomJobList.data.data.dataList.map((value, index) => {
                            return (
                                <JobRecommendCard key={index} name={value.itemname} city={value.city}
                                                  salary={value.salary} id={value.id} degree={value.degree}
                                                  company={value.company}></JobRecommendCard>
                            )
                        })}
                </Grid>
                {recomJobList.isLoading || !recomJobList.data ? null :
                    <Grid item xs={12} style={{paddingTop: "20px"}}>
                        <Pagination count={recomJobList.data.data.pages}
                                    page={jobItemPageApi}
                                    shape="rounded"
                                    onChange={(e, value) => setJobItemPageApi(value)}/>
                    </Grid>}
            </TabPanel>
        </>
    )
}