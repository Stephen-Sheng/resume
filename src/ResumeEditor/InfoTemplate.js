import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import useHover from "@react-hook/hover";
import './PhotoUpload.css'

const Item = styled("div")(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontFamily: "Arial"
}));

export default function InfoTemplate(props) {
    const {topic, time, role, department, city, description} = props.infoObj
    const target = React.useRef(null)
    const isHovering = useHover(target, {enterDelay: 0, leaveDelay: 0})
    return (
        <div ref={target} style={{backgroundColor: isHovering ? '#EFEFF0' : 'white', cursor:"pointer"}}>
            <Grid container spacing={0} style={{marginBottom: "0px", backgroundColor:"transparent"}}>
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
                        {time[0].format("YYYY/MM")+ " - "+ time[1].format("YYYY/MM")}
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
                    {description==="<p><br></p>"? null: parse(description)}
                </Item>
            </Grid>
        </div>
    )
}

