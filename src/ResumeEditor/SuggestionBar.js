import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import SchoolIcon from '@mui/icons-material/School';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildIcon from '@mui/icons-material/Build';
import {useEffect} from "react";
import ResumeCheckBox from "./ResumeCheckBox";

const ChipComp = (props) => {
    let num = props.num
    if (num === 0) {
        return (
            <Chip label="perfect" size={"small"} style={{color: "#4183ff", backgroundColor: "rgba(65,131,255,.1)"}}/>
        )
    } else if (num === 1) {
        return (
            <Chip label={num + " item"} size={"small"}
                  style={{color: "#f64", backgroundColor: "rgba(255,102,68,.12)"}}/>
        )
    }
    return (
        <Chip label={num + " items"} size={"small"} style={{color: "#f64", backgroundColor: "rgba(255,102,68,.12)"}}/>
    )

}

const ListItem = (props) => {
    let text = props.text;
    return(
        <ListItemButton sx={{pl: 4}} style={{padding:"0px 10px 0px 10px"}}>
            <ListItemText style={{backgroundColor: "#f5f6fa",color:"#404040", fontSize:"14px",padding:"12px", marginTop:"6px"}}
                          primary={text}/>
        </ListItemButton>
    )
}

export default function SuggestionBar(props) {

    const {
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
    } = props.resumeInfo

    const [basicOpen, setBasicOpen] = React.useState(false);
    const [eduOpen, setEduOpen] = React.useState(false);
    const [projectOpen, setProjectOpen] = React.useState(false);
    const [profOpen, setProfOpen] = React.useState(false);
    const [otherOpen, setOtherOpen] = React.useState(false);

    const [basicCount, setBasicCount] = React.useState(0);
    const [eduCount, setEduCount] = React.useState(0);
    const [projectCount, setProjectCount] = React.useState(0);
    const [profCount, setProfCount] = React.useState(0);
    const [otherCount, setOtherCount] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);

    useEffect(() => {
        let count = 0;
        let total = 0;
        if (userName.length === 4) {
            count++
        }
        if (email.length === 0) {
            count++
        }
        if (phoneNum.length === 0) {
            count++
        }
        if (resumeName.length === 0) {
            count++
        }
        setBasicCount(count)
        total += count
        count = 0
        if (eduInfo.length === 0) {
            setEduCount(1)
            total++
        }
        if (projectInfo.length === 0) {
            setProjectCount(1)
            total++
        }
        if (profSkills.length === 0) {
            setProfCount(1)
            total++
        }
        if (orgInfo.length === 0) {
            count++
        }
        if (otherSkill.length === 0) {
            count++
        }
        total+=count
        setOtherCount(count)
        setTotalCount(total)

    }, [props.resumeInfo])

    return (
        <>
            <ResumeCheckBox score = {totalCount}/>
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper',  position: 'relative',
                overflow: 'auto',
                maxHeight: 817,}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader"
                               style={{fontSize: "16px", fontWeight: 700, marginTop: "0px"}}>
                    Resume Suggestions
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => setBasicOpen(!basicOpen)}
                            style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <ListItemIcon>
                    <FeedIcon/>
                </ListItemIcon>
                <ListItemText primary="Basic Information"/>
                <ChipComp num={basicCount}/>
                {basicOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={basicOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    {userName.length === 4 && <ListItem text={"Important basic information is missing from your resume, please make sure you fill in your name"} />}
                    {email.length === 0 && <ListItem text={"Email is an important basic information in the resume, it is recommended to fill in the common email"} />}
                    {phoneNum.length === 0 && <ListItem text={"Phone number is an important basic information in the resume, please pay attention to complete and accurate filling"}/>}
                    {resumeName.length === 0 && <ListItem text={"Note that the name of the resume file is modified according to the position submitted, generally using the format: applied job name_Name"}/>}
                </List>
            </Collapse>

            <ListItemButton onClick={() => setEduOpen(!eduOpen)} style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <ListItemIcon>
                    <SchoolIcon/>
                </ListItemIcon>
                <ListItemText primary="Education"/>
                <ChipComp num={eduCount}/>
                {eduOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={eduOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{maxHeight: '100%', overflow: 'auto'}}>
                    {eduInfo.length === 0 && <ListItem text={"Education experience is mandatory information on your CV, please fill in this section"}/>}
                </List>
            </Collapse>

            <ListItemButton onClick={() => setProjectOpen(!projectOpen)}
                            style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <ListItemIcon>
                    <WorkIcon/>
                </ListItemIcon>
                <ListItemText primary={"Project"}/>
                <ChipComp num={projectCount}/>
                {projectOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={projectOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    {projectInfo.length === 0 && <ListItem text={"Project experience should be the main body of the resume and it is recommended to add some more relevant project experience to the content."}/>}
                </List>
            </Collapse>

            <ListItemButton onClick={() => setProfOpen(!profOpen)} style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary={"Professional Details"}/>
                <ChipComp num={profCount}/>
                {profOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={profOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    {profSkills.length === 0 && <ListItem text={"Suggest adding descriptions and summaries of professional skills"}/>}
                </List>
            </Collapse>

            <ListItemButton onClick={() => setOtherOpen(!otherOpen)}
                            style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <ListItemIcon>
                    <BuildIcon/>
                </ListItemIcon>
                <ListItemText primary={"Other sections"}/>
                <ChipComp num={otherCount}/>
                {otherOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={otherOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    {orgInfo.length === 0 && <ListItem text={"It is advisable to have at least one piece of organisational or event experience on your CV and it is recommended to add"}/>}
                    {otherSkill.length === 0 && <ListItem text={"Suggest adding a description of language skills to increase competitiveness"}/>}
                </List>
            </Collapse>
        </List>
        </>
    );
}
