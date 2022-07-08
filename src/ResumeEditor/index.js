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
import SuggestionBar from "./SuggestionBar";

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

    const [resumeName, setResumeName] = useState("");
    const [userName, setUserName] = useState("Name")
    const [phoneNum, setPhoneNum] = useState("")
    const [workLocation, setWorkLocation] = useState("")
    const [email, setEmail] = useState("")
    const isUserInfoHovering = useHover(userInfoTarget, {enterDelay: 0, leaveDelay: 0})

    const [eduInfo, setEduInfo] = useState([])

    const [projectInfo, setProjectInfo] = useState([])

    const [orgInfo, setOrgInfo] = useState([])

    const [profSkills, setProfSkills] = useState("")

    const [otherSkill, setOtherSkill] = useState("")

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
                        // style={{maxHeight:1017,overflow:"auto"}}
                    >
                        <Paper elevation={0} >
                            <SuggestionBar resumeInfo={{userName, phoneNum, workLocation, email, eduInfo, projectInfo, orgInfo,profSkills, otherSkill, resumeName}}/>
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
                                    {phoneNum.length === 0 & email.length === 0 & workLocation.length === 0 ? <div
                                            style={{
                                                fontSize: "12px",
                                                marginLeft: "50px",
                                                marginRight: "40px",
                                                marginBottom: "40px",
                                                color: "#606060"
                                            }}>Please enter your basic information</div> :
                                        <Item style={{
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                        }}>
                                            {phoneNum !== "" || email !== "" || workLocation !== "" ? `${phoneNum} | ${email} | ${workLocation}` : ""}
                                        </Item>
                                    }
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
                            {eduInfo.length === 0 ?
                                <div style={{
                                    fontSize: "12px",
                                    marginLeft: "50px",
                                    marginRight: "40px",
                                    marginBottom: "40px",
                                    color: "#606060"
                                }}>Students are able to show their
                                    expertise and learning ability in their educational background
                                </div> : eduInfo.map((value, index) => {
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
                                })

                            }

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
                            {projectInfo.length !== 0 ? projectInfo.map((value, index) => {
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
                            }) : <div style={{
                                fontSize: "12px",
                                marginLeft: "50px",
                                marginRight: "40px",
                                marginBottom: "40px",
                                color: "#606060"
                            }}>
                                Interviewers usually look for experience that is relevant to the position being applied
                                for
                            </div>
                            }

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
                            {orgInfo.length !== 0 ? orgInfo.map((value, index) => {
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
                            }) : <div style={{
                                fontSize: "12px",
                                marginLeft: "50px",
                                marginRight: "40px",
                                marginBottom: "40px",
                                color: "#606060"
                            }}>
                                Can reflect students' strengths beyond academic ability
                            </div>
                            }

                            {/*    Professional Skill Exp part*/}
                            <Grid container spacing={0}>
                                <Grid item xs={8}><Item style={{
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    paddingBottom: "0px",
                                    textAlign: "left",
                                    marginLeft: "40px"
                                }}>Professional Skills</Item></Grid>
                                <Divider style={{
                                    width: '85%',
                                    borderColor: "black",
                                    marginLeft: "45px",
                                    marginRight: "45px",
                                    marginBottom: "5px"
                                }}/>
                            </Grid>
                            {profSkills.length === 0 ?
                                <div style={{
                                    fontSize: "12px",
                                    marginLeft: "50px",
                                    marginRight: "40px",
                                    marginBottom: "40px",
                                    color: "#606060"
                                }}>
                                    A summary of the acquisition of professional skills
                                </div> : {profSkills}
                            }
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
                            {otherSkill.length === 0 ?
                                <div style={{
                                    fontSize: "12px",
                                    marginLeft: "50px",
                                    marginRight: "40px",
                                    marginBottom: "40px",
                                    color: "#606060"
                                }}>
                                    Other skills and hobbies
                                </div> : {otherSkill}
                            }
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}