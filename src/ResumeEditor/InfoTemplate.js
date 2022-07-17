import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import useHover from "@react-hook/hover";
import './PhotoUpload.css'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {deepCopy} from "../utils";

const Item = styled("div")(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontFamily: "Arial"
}));

export default function InfoTemplate(props) {
    const {topic, time, role, department, city, description, index, info} = props.infoObj
    const setInfo = props.setInfo
    const target = React.useRef(null)
    const isHovering = useHover(target, {enterDelay: 0, leaveDelay: 0})

    function handleClick(e) {
        e.stopPropagation()
        setInfo(info.filter((value, index_arr) => index_arr !== index))
    }

    function handleClickUp(e) {
        e.stopPropagation();
        const temp = deepCopy(info[index - 1])
        temp.time = [info[index - 1].time[0].clone(), info[index - 1].time[1].clone()]
        const temp2 = deepCopy(info[index])
        temp2.time = [info[index].time[0].clone(), info[index].time[1].clone()]
        setInfo(existingItems => {
            return existingItems.map((item, j) => {
                if (j === index) {
                    return temp
                }
                if (j === index - 1) {
                    return temp2
                }
                return item
            })
        })
    }

    function handleClickDown(e) {
        e.stopPropagation()
        const temp = deepCopy(info[index + 1])
        temp.time = [info[index + 1].time[0].clone(), info[index + 1].time[1].clone()]
        const temp2 = deepCopy(info[index])
        temp2.time = [info[index].time[0].clone(), info[index].time[1].clone()]
        setInfo(existingItems => {
            return existingItems.map((item, j) => {
                if (j === index) {
                    return temp
                }
                if (j === index + 1) {
                    return temp2
                }
                return item
            })
        })
    }

    return (
        <div ref={target} style={{backgroundColor: isHovering ? '#EFEFF0' : 'white', cursor: "pointer"}}>
            <Grid container spacing={0} style={{marginBottom: "0px", backgroundColor: "transparent"}}>
                <Grid item xs={8}>
                    <Item style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        textAlign: "inherit",
                        marginLeft: "40px",
                        paddingTop: "0px",
                        paddingBottom: "0px"
                    }}>
                        {topic}
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        textAlign: "right",
                        marginRight: "55px",
                        paddingTop: "0px",
                        paddingBottom: "0px"
                    }}>
                        {typeof time[0] === 'string' || time[0] instanceof String ? time[0] + ' - ' + time[1] : time[0].format("YYYY/MM") + " - " + time[1].format("YYYY/MM")}
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Item style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        textAlign: "left",
                        marginLeft: "40px",
                        paddingTop: "0px",
                        paddingBottom: "0px"
                    }}>
                        {role}&nbsp;&nbsp;&nbsp;&nbsp;{department}
                    </Item>
                </Grid>

                <Grid item xs={4}>
                    <Item style={{
                        textAlign: "right",
                        marginRight: "55px",
                        paddingTop: "0px",
                        paddingBottom: "0px"
                    }}>
                        {city}
                        {isHovering &&
                            <>
                                <Tooltip title={"Up"} arrow placement={"top"}>
                                    <IconButton aria-label="add" size="medium"
                                                onClick={handleClickUp}
                                                disabled={index === 0}
                                                style={{padding: "0px"}}>
                                        <ArrowUpwardIcon fontSize="inherit"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Down"} arrow placement={"top"}>
                                    <IconButton aria-label="add" size="medium"
                                                onClick={handleClickDown}
                                                disabled={index === info.length - 1}
                                                style={{padding: "0px"}}>
                                        <ArrowDownwardIcon fontSize="inherit"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" arrow placement="top">
                                    <IconButton aria-label="add" size="medium"
                                                onClick={handleClick}
                                                style={{padding: "0px"}}>
                                        <DeleteIcon fontSize="inherit"/>
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                    </Item>

                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Item style={{
                    textAlign: "left",
                    marginLeft: "15px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginRight: "45px",
                }}>
                    {description === "<p><br></p>" ? null : parse(description)}
                </Item>
            </Grid>
        </div>
    )
}

