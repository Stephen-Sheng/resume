import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResumeAppBar from "../ResumeAppBar";
import PhotoUpload from "./PhotoUpload";
import {useState} from "react";
import useHover from '@react-hook/hover'
import Divider from "@mui/material/Divider";
import InfoTemplate from "./InfoTemplate";

const Item = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    fontFamily: "Arial"
}));

export default function ResumeEditor() {
    const userInfoTarget = React.useRef(null)
    const [userName, setUserName] = useState("Name")
    const [phoneNum, setPhoneNum] = useState("")
    const [workLocation, setWorkLocation] = useState("")
    const [email, setEmail] = useState("")
    const isUserInfoHovering = useHover(userInfoTarget, {enterDelay: 0, leaveDelay: 0})

    const [eduInfo, setEduInfo] = useState([{
        univName: "Beijing University of Posts and Telecommunications",
        programName: "Telecommunications with Management",
        degree: "Bachelor",
        cityName: "Beijing",
        time: "2017-09 - 2021-06",
        description: "web Dev"
    }, {
        univName: "University of Southampton",
        programName: "Computer Science",
        degree: "Master",
        cityName: "Southampton",
        time: "2021-09 - 2022-09",
        description: "web Dev"
    }])

    const [projectInfo, setProjectInfo] = useState([{
        projectName: "Hua Ti Sunshine WeChat Mini-program",
        role: "front-end engineer",
        department: "BUPT final project",
        city: "Beijing",
        time: "2021-02 - 2022-06",
        description: "《华体原力》是一款便于青少年的家长们快速了解子女身体状况与体测数据的微信小程序\n" +
            "目前实现了“登录”、“察看身体状况”以及“个人中心”和“首页”的编写\n" +
            "预计可以如期完成其他预期的功能，如：“用户积分”、“404页面”及“推荐阅读”等"
    }, {
        projectName: "Hua Ti Sunshine WeChat Mini-program",
        role: "front-end engineer",
        department: "BUPT final project",
        city: "Shanghai",
        time: "2021-02 - 2022-06",
        description: "《华体原力》是一款便于青少年的家长们快速了解子女身体状况与体测数据的微信小程序\n" +
            "目前实现了“登录”、“察看身体状况”以及“个人中心”和“首页”的编写\n" +
            "预计可以如期完成其他预期的功能，如：“用户积分”、“404页面”及“推荐阅读”等"
    }])

    const [orgInfo, setOrgInfo] = useState([{
        orgName: "Volunteer association",
        role:"Supervisor",
        department:"Office",
        time:"2021-02 - 2022-06",
        city:"Beijing",
        description:""
    }])

    function handleClickName() {
        console.log("clicked")
    }

    return (
        <div style={{backgroundColor: "#353944"}}>
            <ResumeAppBar/>
            <Grid container spacing={0} style={{marginTop: "0.5rem"}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2.5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 324,
                                height: 1017,
                            },
                        }}
                    >
                        <Paper elevation={0}>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 719,
                                height: 1017,
                            },
                        }}>
                        <Paper elevation={0}>
                            {/* User info part*/}
                            <Grid container spacing={2} style={{padding: "45px", paddingBottom: "0px"}}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6} onClick={handleClickName} style={{
                                    cursor: 'pointer',
                                    backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                }} ref={userInfoTarget}>
                                    <Item style={{
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                    }}>
                                        {userName}
                                    </Item>
                                    <Item style={{
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                    }}>
                                        {phoneNum !== "" || email !== "" || workLocation !== "" ? `${phoneNum} | ${email} | ${workLocation}` : ""}
                                    </Item>
                                </Grid>
                                <Grid item xs={3}>
                                    <PhotoUpload/>
                                </Grid>
                            </Grid>

                            {/* Education part*/}
                            <Grid container spacing={0}>
                                <Grid item xs={3}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px"
                                }}>Education</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                            {eduInfo !== [] && eduInfo.map((value, index) => {
                                return (
                                    <InfoTemplate key={index} infoObj={{
                                        topic: value.univName,
                                        city: value.cityName,
                                        department: value.degree,
                                        description: value.description,
                                        role: value.programName,
                                        time: value.time
                                    }}/>
                                )
                            })}

                            {/*    Project Experience*/}
                            <Grid container spacing={0}>
                                <Grid item xs={3}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px",
                                    textAlign: "left",
                                    marginLeft: "40px"
                                }}>Project</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                            {projectInfo !== [] && projectInfo.map((value, index) => {
                                return (
                                    <InfoTemplate key={index} infoObj={{
                                        topic: value.projectName,
                                        city: value.city,
                                        department: value.department,
                                        description: value.description,
                                        role: value.role,
                                        time: value.time
                                    }}/>
                                )
                            })}

                        {/*    Organization Exp part*/}
                            <Grid container spacing={0}>
                                <Grid item xs={3}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px",
                                    textAlign: "left",
                                    marginLeft: "40px"
                                }}>Organization</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                            {orgInfo !== [] && orgInfo.map((value, index) => {
                                return (
                                    <InfoTemplate key={index} infoObj={{
                                        topic: value.orgName,
                                        city: value.city,
                                        department: value.department,
                                        description: value.description,
                                        role: value.role,
                                        time: value.time
                                    }}/>
                                )
                            })}

                            {/*    Professional Skill Exp part*/}
                            <Grid container spacing={0}>
                                <Grid item xs={3}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px",
                                    textAlign: "left",
                                    marginLeft: "40px"
                                }}>Skills</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                            {/*    Others part*/}
                            <Grid container spacing={0}>
                                <Grid item xs={3}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px",
                                    textAlign: "left",
                                    marginLeft: "40px"
                                }}>Other Abilities</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}