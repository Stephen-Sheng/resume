import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResumeAppBar from "../ResumeAppBar";
import PhotoUpload from "./PhotoUpload";
import {useEffect, useMemo, useState} from "react";
import useHover from '@react-hook/hover'
import Divider from "@mui/material/Divider";
import InfoTemplate from "./InfoTemplate";
import SuggestionBar from "./SuggestionBar";
import BasicInfoEdit from "./BasicInfoEdit";
import EduInfoEdit from "./EduInfoEdit";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ProjectInfoEdit from "./ProjectInfoEdit";
import OrgInfoEdit from "./OrgInfoEdit";

const Item = styled("div")(({theme}) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    fontFamily: "Arial"
}));

export default function ResumeEditor() {
    const userInfoTarget = React.useRef(null)
    const eduInfoTarget = React.useRef(null)
    const projectInfoTarget = React.useRef(null)
    const orgInfoTarget = React.useRef(null)

    const [resumeName, setResumeName] = useState("");
    const [userName, setUserName] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [workLocation, setWorkLocation] = useState("")
    const [email, setEmail] = useState("")

    const isUserInfoHovering = useHover(userInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isEduHovering = useHover(eduInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isProjectHovering = useHover(projectInfoTarget, {enterDelay: 0, leaveDelay: 0})
    const isOrgInfoHovering = useHover(orgInfoTarget,{enterDelay: 0, leaveDelay: 0})


    const [eduInfo, setEduInfo] = useState([])
    const [eduIndex, setEduIndex] = useState(null)

    const [projectInfo, setProjectInfo] = useState([])
    const [projectIndex, setProjectIndex] = useState(null)

    const [orgInfo, setOrgInfo] = useState([])
    const [orgIndex, setOrgIndex] = useState(null)

    const [profSkills, setProfSkills] = useState("")
    const [otherSkill, setOtherSkill] = useState("")

    const [editStatus, setEditStatus] = useState(false)
    const [eduEditStatus, setEduEditStatus] = useState(false)
    const [projectEditStatus, setProjectEditStatus] = useState(false)
    const [orgEditStatus, setOrgEditStatus] = useState(false)



    function handleClickName() {
        setEditStatus(!editStatus)
    }

    function handleClickEdu(value) {
        setEduIndex(value)
        setEduEditStatus(!eduEditStatus)
    }

    function handleClickProject(value) {
        setProjectIndex(value)
        setProjectEditStatus(!projectEditStatus)
    }

    function handleClickOrg(value) {
        setOrgIndex(value)
        setOrgEditStatus(!orgEditStatus)
    }

    function printDocument() {
        let input = document.getElementById('printDoc')
        input.style.height = "auto";
        console.log(document.getElementById('img'))
        html2canvas(input,{allowTaint:true,useCORS:true})
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                const doc = new jsPDF('p', 'mm', 'a4');
                let position = 0;
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                let filename = 'test'
                doc.save(filename + '.pdf');
                input.style.height = "1017px";

            })
    }

    return (
        <div style={{backgroundColor: "#353944"}}>
            <ResumeAppBar printDocument={printDocument}/>
            <Grid container spacing={0} style={{marginTop: "0.5rem"}}>
                <Grid item xs={2}></Grid>
                {editStatus || eduEditStatus || projectEditStatus || orgEditStatus? <Grid item xs={4}>
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
                            {editStatus && <BasicInfoEdit setEditStatus={setEditStatus} setUserName={setUserName}
                                                          setPhoneNum={setPhoneNum} setWorkLocation={setWorkLocation}
                                                          setEmail={setEmail} userName={userName} phoneNum={phoneNum}
                                                          workLocation={workLocation} email={email}/>}
                            {eduEditStatus &&
                                <EduInfoEdit setEditStatus={setEduEditStatus} eduInfo={eduInfo} setEduInfo={setEduInfo}
                                             eduIndex={eduIndex}/>}
                            {projectEditStatus &&
                                <ProjectInfoEdit setEditStatus={setProjectEditStatus} projectInfo={projectInfo}
                                                 setProjectInfo={setProjectInfo} projectIndex={projectIndex}/>}
                            {orgEditStatus &&
                                <OrgInfoEdit setEditStatus={setOrgEditStatus} orgInfo={orgInfo}
                                                 setOrgInfo={setOrgInfo} orgIndex={orgIndex}/>}
                        </Paper>
                    </Box>
                </Grid> : <Grid item xs={2.5}>
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
                                resumeName
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
                            <div ref={eduInfoTarget} style={{
                                backgroundColor: isEduHovering ? '#EFEFF0' : 'white'
                            }}>
                                <Grid container spacing={0} style={{}}>
                                    <Grid item xs={3}><Item style={{
                                        fontWeight: 700,
                                        fontSize: "17px",
                                        paddingBottom: "0px",
                                    }}>Education</Item></Grid>
                                    {isEduHovering ?
                                        <Grid item xs={9} style={{textAlign: "right", paddingRight: "60px"}}>
                                            <IconButton aria-label="add" size="medium"
                                                        onClick={() => handleClickEdu(null)}
                                                        style={{padding: "0px", top: "8px"}}>
                                                <AddBoxIcon fontSize="inherit"/>
                                            </IconButton>
                                        </Grid> : null}
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
                                                    time: value.time
                                                }}/>
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
                                    {isProjectHovering ?
                                        <Grid item xs={9} style={{textAlign: "right", paddingRight: "60px"}}>
                                            <IconButton aria-label="add" size="medium"
                                                        onClick={() => handleClickProject(null)}
                                                        style={{padding: "0px", top: "8px"}}>
                                                <AddBoxIcon fontSize="inherit"/>
                                            </IconButton>
                                        </Grid> : null}
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
                                            time: value.time
                                        }}/>
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
                                    Interviewers usually look for experience that is relevant to the position being
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
                                {isOrgInfoHovering ?
                                    <Grid item xs={9} style={{textAlign: "right", paddingRight: "60px"}}>
                                        <IconButton aria-label="add" size="medium"
                                                    onClick={() => handleClickOrg(null)}
                                                    style={{padding: "0px", top: "8px"}}>
                                            <AddBoxIcon fontSize="inherit"/>
                                        </IconButton>
                                    </Grid> : null}
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
                                        time: value.time
                                    }}/>
                                    </div>
                                )
                            }) : <div style={{
                                fontSize: "12px",
                                marginLeft: "50px",
                                marginRight: "40px",
                                paddingBottom: "40px",
                                color: "#606060",
                                cursor:"pointer"
                            }}>
                                Can reflect students' strengths beyond academic ability
                            </div>
                            }
                            </div>

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