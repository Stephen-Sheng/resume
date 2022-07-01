import ResponsiveAppBar from "../AppBar";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from "@mui/material/Divider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Stack} from "@mui/material";
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
export default function MyResumePage() {

    const [resumeCount, setResumeCount] = useState(0);
    const [value, setValue] = React.useState(0);
    const navigation = useNavigation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{backgroundColor: "#f5f5f7"}}>
            <ResponsiveAppBar/>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} style={{marginTop: '0.1%'}}>
                <Grid item xs={2} sm={2} md={2}></Grid>
                <Grid item xs={2} sm={2} md={2}>
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
                        style={{marginBottom: "20px"}}
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 375,
                                        height: 95,
                                    },
                                }}
                                style={{textAlign: "center"}}
                            >
                                <Paper elevation={1} style={{margin: "15px"}}/>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: 375,
                                    height: 482,
                                },
                            }}>
                                <span style={{margin: "15px", fontWeight: "500"}}>My resume ({resumeCount})</span>
                            </Box>
                            <Box>
                                <IconButton style={{marginLeft: "1px"}}>
                                    <CalculateIcon fontSize={"large"}/>
                                    <span style={{fontSize: "15px"}}>GPA calculator</span>
                                </IconButton>
                                <IconButton style={{margin: "15px"}}>
                                    <AccessAlarmIcon fontSize={"large"}/>
                                    <span style={{fontSize: "15px"}}>Interview preparation</span>
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={6} style={{marginLeft: "150px"}}>
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
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={3}
                                >
                                    <Card sx={{display: 'flex'}} style={{width: 331, height: 113}} component="span">
                                        <CardMedia
                                            component="img"
                                            sx={{width: 54, height: 54}}
                                            image="https://logo.wondercv.com/brand/brand_--sibrLosochoW1w.jpg"
                                            alt="Live from space album cover"
                                            style={{margin: "10px"}}
                                        />
                                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                <Typography component="div" variant="h8">
                                                    Tencent
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    IT | China
                                                </Typography>
                                                <Divider/>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    <Button variant="text"
                                                            startIcon={<AccessTimeIcon style={{color: "#f64"}}/>}
                                                            style={{color: "inherit"}}>
                                                        DDL: 03/09/22
                                                    </Button>
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                    <Card sx={{display: 'flex'}} style={{width: 331, height: 113}} component="span">
                                        <CardMedia
                                            component="img"
                                            sx={{width: 54, height: 54}}
                                            image="https://logo.wondercv.com/brand/brand_--sibrLosochoW1w.jpg"
                                            alt="Live from space album cover"
                                            style={{margin: "10px"}}
                                        />
                                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                <Typography component="div" variant="h8">
                                                    Tencent 2023 Technology job
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    IT | China
                                                </Typography>
                                                <Divider/>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    <Button variant="text"
                                                            startIcon={<AccessTimeIcon style={{color: "#f64"}}/>}
                                                            style={{color: "inherit"}}>
                                                        DDL: 03/09/22
                                                    </Button>
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Stack>
                                <Button variant="outlined"
                                        style={{
                                            color: "#f64",
                                            borderColor: "#f64",
                                            padding: "0px,20px,0px,20px",
                                            marginTop: "30px",
                                            left: "43%"
                                        }}>
                                    More Jobs
                                </Button>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}