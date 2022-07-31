import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import {Spin} from "antd";
import JobCard from "./JobCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {useResource} from "react-request-hook";
import {useEffect} from "react";
import JobRecommendCard from "./JobRecommendCard";
import {useNavigation} from "react-navi";

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
export default function JobRecommendTab(props) {

    const navigation = useNavigation()
    const handleMoreJob = () => {
        navigation.navigate('/recruiting')

    }
    const [value, setValue] = React.useState(0);
    const [jobList, requestJobList] = useResource(()=>({
        url:"/get-job/1",
        method:"GET"
    }))
    const [recomJobList,requestRecomJobList] = useResource(()=>({
        url:"/get-recomJobList/1",
        method:"GET"
    }))
    useEffect(() => {
        requestJobList()
        requestRecomJobList()
    }, [requestJobList,requestRecomJobList])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 775,
                    height: 590,
                },
            }}
            style={{marginBottom: "20px"}}

        >
            <Paper elevation={0}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor={"inherit"}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#f64"
                        }
                    }}
                    style={{marginLeft: "10px"}}
                    aria-label="secondary tabs example"
                >
                    <Tab value={0} label="University Application"/>
                    <Tab value={1} label="Recommended jobs"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        {jobList.isLoading || !jobList.data? <Spin />: jobList.data.data.dataList.map((value,index)=>{
                            return(
                                <JobCard key={index} company={value.company} location={value.location} ddl={value.ddl} id={value.id} logo={value.logo}></JobCard>
                            )
                        })}
                    </Grid>
                    <Button variant="outlined"
                            style={{
                                color: "#f64",
                                borderColor: "#f64",
                                padding: "0px,20px,0px,20px",
                                marginTop: "30px",
                                left: "43%"
                            }} onClick={handleMoreJob}>
                        More Jobs
                    </Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        {recomJobList.isLoading || !recomJobList.data? <Spin />: recomJobList.data.data.dataList.map((value,index)=>{
                            return(
                                <JobRecommendCard key={index} name={value.itemname} city={value.city} salary={value.salary} id={value.id} degree={value.degree} company={value.company}></JobRecommendCard>
                            )
                        })}
                    </Grid>
                    <Button variant="outlined"
                            style={{
                                color: "#f64",
                                borderColor: "#f64",
                                padding: "0px,20px,0px,20px",
                                marginTop: "30px",
                                left: "43%"
                            }} onClick={handleMoreJob}>
                        More Jobs
                    </Button>
                </TabPanel>
            </Paper>
        </Box>
    )
}