import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResumeAppBar from "../ResumeAppBar";
import PhotoUpload from "./PhotoUpload";
import {useContext, useEffect, useState} from "react";
import useHover from '@react-hook/hover'
import Divider from "@mui/material/Divider";
import InfoTemplate from "./InfoTemplate";
import SuggestionBar from "./SuggestionBar";
import BasicInfoEdit from "./BasicInfoEdit";
import EduInfoEdit from "./EduInfoEdit";
import ProjectInfoEdit from "./ProjectInfoEdit";
import OrgInfoEdit from "./OrgInfoEdit";
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import ProfInfoEdit from "./ProfInfoEdit";
import './PhotoUpload.css'
import OtherInfoEdit from "./OtherInfoEdit";
import AddButton from "./AddButton";
import {useRequest} from "react-request-hook";
import moment from "moment";
import {UserContext} from "../context";
import {useNavigation} from "react-navi";

const Item = styled("div")(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontFamily: "Arial"
}));


export default function ResumeEditor({resumeId}) {
    const [bestDegree, setBestDegree] = useState("")
    const [bestUniv, setBestUniv] = useState("")
    const [resumeName, setResumeName] = useState("");
    const [userName, setUserName] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [workLocation, setWorkLocation] = useState("")
    const [email, setEmail] = useState("")
    const [eduInfo, setEduInfo] = useState([])
    const [projectInfo, setProjectInfo] = useState([])
    const [orgInfo, setOrgInfo] = useState([])
    const [profSkills, setProfSkills] = useState("")
    const [otherSkill, setOtherSkill] = useState("")
    const [photoUrl, setPhotoUrl] = useState('')


    const userInfoTarget = React.useRef(null)
    const eduInfoTarget = React.useRef(null)
    const projectInfoTarget = React.useRef(null)
    const orgInfoTarget = React.useRef(null)
    const profInfoTarget = React.useRef(null)
    const otherInfoTarget = React.useRef(null)

    const isUserInfoHovering = useHover(userInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isEduHovering = useHover(eduInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isProjectHovering = useHover(projectInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isOrgInfoHovering = useHover(orgInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isProfInfoHovering = useHover(profInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isOtherInfoHovering = useHover(otherInfoTarget, {enterDelay: 0, leaveDelay: 0})

    const [eduIndex, setEduIndex] = useState(null)
    const [projectIndex, setProjectIndex] = useState(null)
    const [orgIndex, setOrgIndex] = useState(null)

    const [editStatus, setEditStatus] = useState(false)
    const [eduEditStatus, setEduEditStatus] = useState(false)
    const [projectEditStatus, setProjectEditStatus] = useState(false)
    const [orgEditStatus, setOrgEditStatus] = useState(false)
    const [profEditStatus, setProfEditStatus] = useState(false)
    const [otherEditStatus, setOtherEditStatus] = useState(false)
    const [, sendQueryResume] = useRequest((id) => ({
        url: `get-specific-resume/${id}`,
        method: "GET"
    }))

    const {user} = useContext(UserContext)
    const navigation = useNavigation();
    useEffect(()=>{
        if(!user.id){
            navigation.navigate('/sign-in')
        }
    },[user.id,navigation])

    useEffect(() => {
        async function loadResume() {
            if (resumeId) {
                const {ready} = sendQueryResume(resumeId)
                try {
                    const response = await ready()
                    let data = response.data
                    setResumeName(data.resumename)
                    setUserName(data.username)
                    setPhoneNum(data.phonenum)
                    setEmail(data.email)
                    setWorkLocation(data.worklocation)
                    setPhotoUrl(data.photourl)
                    setEduInfo(JSON.parse(data.eduinfo))
                    setProjectInfo(JSON.parse(data.projectinfo))
                    setOrgInfo(JSON.parse(data.orginfo))
                    setProfSkills(data.profskills)
                    setOtherSkill(data.otherskills)
                    console.log(data)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        loadResume()
    }, [resumeId,sendQueryResume])


    function handleClickName() {
        setEditStatus(true)
    }

    function handleClickEdu(value) {
        setEduIndex(value)
        if (value !== null) {
            let newEduInfo = eduInfo
            console.log(eduInfo)
            console.log(value)
            let time1 = moment(eduInfo[value].time[0])
            let time2 = moment(eduInfo[value].time[1])

            newEduInfo[value] = {...newEduInfo[value], time: [time1, time2]}
            setEduInfo(newEduInfo);
            console.log(newEduInfo)
        }
        setEduEditStatus(true)
    }

    function handleClickProject(value) {
        setProjectIndex(value)
        if (value !== null) {
            let newProjectInfo = projectInfo
            let time1 = moment(projectInfo[value].time[0])
            let time2 = moment(projectInfo[value].time[1])
            newProjectInfo[value] = {...newProjectInfo[value], time: [time1, time2]}
            setProjectInfo(newProjectInfo)
        }
        setProjectEditStatus(true)
    }

    function handleClickOrg(value) {
        setOrgIndex(value)
        if (value !== null) {
            let newOrgInfo = orgInfo
            let time1 = moment(orgInfo[value].time[0])
            let time2 = moment(orgInfo[value].time[1])
            newOrgInfo[value] = {...newOrgInfo[value], time: [time1, time2]}
            setOrgInfo(newOrgInfo)
        }
        setOrgEditStatus(true)
    }

    function handleClickProf() {
        setProfEditStatus(true)
    }

    function handleClickOther() {
        setOtherEditStatus(true)
    }

    return (
        <div style={{backgroundColor: "#353944"}}>
            <ResumeAppBar profile={{
                photoUrl,
                userName,
                email,
                workLocation,
                phoneNum,
                eduInfo,
                orgInfo,
                projectInfo,
                profSkills,
                otherSkill
            }} resumeName={resumeName} setResumeName={setResumeName} resumeId={resumeId}
                          bestDegree={bestDegree} bestUniv={bestUniv}/>
            <Grid container spacing={0} style={{marginTop: "0.5rem"}}>
                <Grid item xs={2}></Grid>
                {editStatus || eduEditStatus || projectEditStatus || orgEditStatus || profEditStatus || otherEditStatus ?
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: 719,
                                    height: 700,
                                },
                            }}
                        >
                            <Paper elevation={0} style={{maxHeight: '100%', overflow: 'auto'}}>
                                {editStatus &&
                                    <BasicInfoEdit setEditStatus={setEditStatus} setUserName={setUserName}
                                                   setPhoneNum={setPhoneNum}
                                                   setWorkLocation={setWorkLocation}
                                                   setEmail={setEmail} userName={userName}
                                                   phoneNum={phoneNum}
                                                   workLocation={workLocation} email={email}/>}
                                {eduEditStatus &&

                                    <EduInfoEdit setEditStatus={setEduEditStatus} eduInfo={eduInfo}
                                                 setBestDegree={setBestDegree}
                                                 setBestUniv={setBestUniv}
                                                 bestDegree={bestDegree}
                                                 setEduInfo={setEduInfo}
                                                 eduIndex={eduIndex}/>}
                                {projectEditStatus &&
                                    <ProjectInfoEdit setEditStatus={setProjectEditStatus}
                                                     projectInfo={projectInfo}
                                                     setProjectInfo={setProjectInfo}
                                                     projectIndex={projectIndex}/>}
                                {orgEditStatus &&
                                    <OrgInfoEdit setEditStatus={setOrgEditStatus} orgInfo={orgInfo}
                                                 setOrgInfo={setOrgInfo} orgIndex={orgIndex}/>}
                                {profEditStatus &&
                                    <ProfInfoEdit setEditStatus={setProfEditStatus} profInfo={profSkills}
                                                  setProfInfo={setProfSkills}/>
                                }
                                {otherEditStatus &&
                                    <OtherInfoEdit setEditStatus={setOtherEditStatus} otherInfo={otherSkill}
                                                   setOtherInfo={setOtherSkill}/>
                                }
                            </Paper>
                        </Box>
                    </Grid> : <Grid item xs={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: 324,
                                    height: 817,
                                },
                            }}
                        >
                            <Paper elevation={0}>
                                <SuggestionBar resumeInfo={{
                                    userName,
                                    phoneNum,
                                    workLocation,
                                    email,
                                    eduInfo,
                                    projectInfo,
                                    orgInfo,
                                    profSkills,
                                    otherSkill,
                                    resumeName,
                                }}/>
                            </Paper>
                        </Box>
                    </Grid>
                }
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
                        <Paper id={"printDoc"} elevation={0} style={{maxHeight: '100%', overflow: 'auto'}}>
                            {/* User info part*/}
                            <Grid container spacing={2} style={{padding: "45px", paddingBottom: "0px"}}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6} onClick={handleClickName} style={{
                                    cursor: 'pointer',
                                    backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                }} ref={userInfoTarget}>
                                    {userName.length === 0 ? <Item style={{
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                    }}>
                                        Name
                                    </Item> : <Item style={{
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        backgroundColor: isUserInfoHovering ? '#EFEFF0' : 'white'
                                    }}>
                                        {userName}
                                    </Item>}

                                    {phoneNum.length === 0 & email.length === 0 & workLocation.length === 0 ?
                                        <div
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
                                <Grid id={'img-container'} item xs={3}>
                                    <PhotoUpload photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
                                </Grid>
                            </Grid>

                            {/* Education part*/}
                            <div ref={eduInfoTarget} style={{
                                backgroundColor: isEduHovering ? '#EFEFF0' : 'white'
                            }}>
                                <Grid container spacing={0} style={{}}>
                                    <Grid item xs={3}><Item style={{
                                        fontWeight: 700,
                                        fontSize: "17px",
                                        paddingBottom: "0px",
                                    }}>Education</Item></Grid>
                                    <AddButton isHovering={isEduHovering} handleClick={handleClickEdu}/>
                                    <Divider style={{
                                        width: '85%',
                                        borderColor: "black",
                                        marginLeft: "45px",
                                        marginRight: "45px",
                                        marginBottom: "5px"
                                    }}/>
                                </Grid>
                                {eduInfo.length === 0 ?
                                    <div onClick={() => handleClickEdu(null)} style={{
                                        fontSize: "12px",
                                        marginLeft: "50px",
                                        marginRight: "40px",
                                        paddingBottom: "40px",
                                        color: "#606060",
                                        cursor: "pointer",
                                        backgroundColor: isEduHovering ? '#EFEFF0' : 'white'
                                    }}>Students are able to show their
                                        expertise and learning ability in their educational background
                                    </div> : eduInfo.map((value, index) => {
                                        return (
                                            <div key={index} onClick={() => handleClickEdu(index)}>
                                                <InfoTemplate infoObj={{
                                                    topic: value.univName,
                                                    city: value.cityName,
                                                    department: value.degree,
                                                    description: value.description,
                                                    role: value.programName,
                                                    time: value.time,
                                                    index,
                                                    info: eduInfo
                                                }} setInfo={setEduInfo}/>
                                            </div>
                                        )
                                    })

                                }
                            </div>

                            {/*    Project Experience*/}
                            <div ref={projectInfoTarget} style={{
                                backgroundColor: isProjectHovering ? '#EFEFF0' : 'white'
                            }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3}><Item style={{
                                        fontWeight: 700,
                                        fontSize: "17px",
                                        paddingBottom: "0px",
                                        textAlign: "left",
                                        marginLeft: "40px"
                                    }}>Project</Item></Grid>
                                    <AddButton isHovering={isProjectHovering}
                                               handleClick={handleClickProject}/>
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
                                        <div key={index} onClick={() => handleClickProject(index)}>
                                            <InfoTemplate key={index} infoObj={{
                                                topic: value.projectName,
                                                city: value.city,
                                                department: value.department,
                                                description: value.description,
                                                role: value.role,
                                                time: value.time,
                                                index,
                                                info: projectInfo
                                            }} setInfo={setProjectInfo}/>
                                        </div>
                                    )
                                }) : <div style={{
                                    fontSize: "12px",
                                    marginLeft: "50px",
                                    marginRight: "40px",
                                    paddingBottom: "40px",
                                    cursor: "pointer",
                                    color: "#606060"
                                }} onClick={() => handleClickProject(null)}>
                                    Interviewers usually look for experience that is relevant to the
                                    position being
                                    applied
                                    for
                                </div>
                                }
                            </div>

                            {/*    Organization Exp part*/}
                            <div ref={orgInfoTarget} style={{
                                backgroundColor: isOrgInfoHovering ? '#EFEFF0' : 'white'
                            }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3}><Item style={{
                                        fontWeight: 700,
                                        fontSize: "17px",
                                        paddingBottom: "0px",
                                        textAlign: "left",
                                        marginLeft: "40px"
                                    }}>Organization</Item></Grid>
                                    <AddButton isHovering={isOrgInfoHovering} handleClick={handleClickOrg}/>
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
                                        <div key={index} onClick={() => handleClickOrg(index)}>
                                            <InfoTemplate key={index} infoObj={{
                                                topic: value.orgName,
                                                city: value.city,
                                                department: value.department,
                                                description: value.description,
                                                role: value.role,
                                                time: value.time,
                                                index,
                                                info: orgInfo
                                            }} setInfo={setOrgInfo}/>
                                        </div>
                                    )
                                }) : <div style={{
                                    fontSize: "12px",
                                    marginLeft: "50px",
                                    marginRight: "40px",
                                    paddingBottom: "40px",
                                    color: "#606060",
                                    cursor: "pointer"
                                }} onClick={() => handleClickOrg(null)}>
                                    Can reflect students' strengths beyond academic ability
                                </div>
                                }
                            </div>

                            {/*    Professional Skill Exp part*/}
                            <div ref={profInfoTarget} style={{
                                backgroundColor: isProfInfoHovering ? '#EFEFF0' : 'white'
                            }}>
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
                                        paddingBottom: "40px",
                                        cursor: "pointer",
                                        color: "#606060"
                                    }} onClick={handleClickProf}>
                                        A summary of the acquisition of professional skills
                                    </div> : <Item style={{
                                        textAlign: "left",
                                        marginLeft: "15px",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                        marginRight: "45px",
                                        cursor: "pointer"
                                    }} onClick={handleClickProf}> {parse(profSkills)}</Item>
                                }
                            </div>
                            {/*    Others part*/}
                            <div ref={otherInfoTarget} style={{
                                backgroundColor: isOtherInfoHovering ? '#EFEFF0' : 'white'
                            }}>
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
                                        paddingBottom: "40px",
                                        color: "#606060",
                                        cursor: "pointer"
                                    }} onClick={handleClickOther}>
                                        Other skills and hobbies
                                    </div> : <Item style={{
                                        textAlign: "left",
                                        marginLeft: "15px",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                        marginRight: "45px",
                                        cursor: "pointer"
                                    }} onClick={handleClickOther}> {parse(otherSkill)}</Item>
                                }
                            </div>
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}