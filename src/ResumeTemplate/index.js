import React from 'react';
import {Page, Text, Document, PDFDownloadLink, View, Image} from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import 'react-quill/dist/quill.snow.css';
import {styles, stylesheet} from "./utils";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FileDownloadIcon from "@mui/icons-material/FileDownload";


// Create Document Component
export const ResumeTemplate = ({profile}) => {
    const example = profile
    return (
        <Document>
            <Page style={styles.body}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{flex: 3, width: '100%'}}>
                        {example.userName.length !== 0 && <Text style={styles.title}>{example.userName}</Text>}
                        {example.workLocation.length !== 0 && <Text
                            style={styles.basicInfo}>{example.email} || {example.phoneNum} || {example.workLocation}</Text>}

                    </View>
                    <View style={{flex: 1}}>
                        {example.photoUrl.length !== 0 && <Image
                            style={styles.image}
                            src={example.photoUrl}
                        />}
                    </View>
                </View>
                <Text style={styles.subtitle}>Education</Text>
                <Text style={styles.profile_line}></Text>
                {example.eduInfo.length !== 0 && example.eduInfo.map((value, index) => {
                    return (
                        <View key={index}>

                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.topicName}>{value.univName}</Text>
                                </View>
                                <View style={{flex: 1}}/>
                                {typeof value.time[0] === 'string' || value.time[0] instanceof String ?
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{moment(value.time[0]).format("YYYY/MM") + " - " + moment(value.time[1]).format("YYYY/MM")}</Text>
                                    </View> :
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{value.time[0].format("YYYY/MM") + " - " + value.time[1].format("YYYY/MM")}</Text>
                                    </View>}
                            </View>
                            <Text style={styles.text}>
                                <Text>{value.degree}</Text>
                                <Space num={0.5}/>
                                <Text>{value.programName}</Text>
                            </Text>
                            <Html stylesheet={stylesheet}>{value.description}</Html>
                        </View>
                    )
                })}
                <Text style={styles.subtitle}>Project</Text>
                <Text style={styles.profile_line}></Text>
                {example.projectInfo.length !== 0 && example.projectInfo.map((value, index) => {
                    return (
                        <View key={index}>

                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.topicName}>{value.projectName}</Text>
                                </View>
                                <View style={{flex: 1}}/>
                                {typeof value.time[0] === 'string' || value.time[0] instanceof String ?
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{moment(value.time[0]).format("YYYY/MM") + " - " + moment(value.time[1]).format("YYYY/MM")}</Text>
                                    </View> :
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{value.time[0].format("YYYY/MM") + " - " + value.time[1].format("YYYY/MM")}</Text>
                                    </View>}
                            </View>
                            <Text style={styles.text}>
                                <Text>{value.role}</Text>
                                <Space num={0.5}/>
                                <Text>{value.department}</Text>
                            </Text>
                            <Html stylesheet={stylesheet}>{value.description}</Html>
                        </View>
                    )
                })}
                <Text style={styles.subtitle}>Organization</Text>
                <Text style={styles.profile_line}></Text>
                {example.orgInfo.length !== 0 && example.orgInfo.map((value, index) => {
                    return (
                        <View key={index}>

                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.topicName}>{value.orgName}</Text>
                                </View>
                                <View style={{flex: 1}}/>
                                {typeof value.time[0] === 'string' || value.time[0] instanceof String ?
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{moment(value.time[0]).format("YYYY/MM") + " - " + moment(value.time[1]).format("YYYY/MM")}</Text>
                                    </View> :
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={styles.time}>{value.time[0].format("YYYY/MM") + " - " + value.time[1].format("YYYY/MM")}</Text>
                                    </View>}
                            </View>
                            <Text style={styles.text}>
                                <Text>{value.role}</Text>
                                <Space num={0.5}/>
                                <Text>{value.department}</Text>
                            </Text>
                            <Html stylesheet={stylesheet}>{value.description}</Html>
                        </View>
                    )
                })}
                <Text style={styles.subtitle}>Professional Skills</Text>
                <Text style={styles.profile_line}></Text>
                {example.profSkills.length !== 0 && <Html stylesheet={stylesheet}>{example.profSkills}</Html>}

                <Text style={styles.subtitle}>Other Abilities</Text>
                <Text style={styles.profile_line}></Text>
                {example.otherSkill.length !== 0 && <Html stylesheet={stylesheet}>{example.otherSkill}</Html>}

                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </Page>
        </Document>
    )
}

export const Space = ({num}) => {
    let rows = [];
    for (let i = 0; i < num * 10; i++) {
        rows.push(<Text key={i}>&nbsp;</Text>)
    }
    return (
        <Text>
            {rows.map((value) => {
                return (value)
            })}
        </Text>
    )
}

export const DownloadLink = (props) => {
    const profile = props.profile
    return (
        <PDFDownloadLink document={<ResumeTemplate profile={profile}/>} fileName="resume.pdf"
                         style={{textDecoration: "none", color: "white"}}>
            {({loading}) => (loading ? 'Download' : 'Download')}
        </PDFDownloadLink>
    )
}

export const HomePageDownloadLink = (props) => {
    const profile = props.profile
    return (
        <PDFDownloadLink document={<ResumeTemplate profile={profile}/>} fileName={profile.resumeName + ".pdf"}
                         style={{textDecoration: "none", color: "black"}}>
            {({loading}) => (loading ? <MenuItem>
                <ListItemIcon>
                    <FileDownloadIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>
                    Loading...
                </ListItemText>
            </MenuItem> : <MenuItem>
                <ListItemIcon>
                    <FileDownloadIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>
                    Download Resume
                </ListItemText>
            </MenuItem>)}
        </PDFDownloadLink>
    )
}