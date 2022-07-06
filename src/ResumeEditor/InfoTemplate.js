import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Item = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    fontFamily: "Arial"
}));

export default function InfoTemplate(props) {
    const {topic, time, role, department, city} = props.infoObj
    return (
        <>
            <Grid container spacing={0} style={{marginBottom: "0px"}}>
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
                        {time}
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
                    marginLeft: "40px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginRight: "45px",
                }}>
                    {/*/!*{description}*!/*/}
                    {/*<ul style={{paddingLeft: "15px", fontSize: "15px", marginBottom: "0px"}}>*/}
                    {/*    <li>Huashi Force is a WeChat app that allows parents of teenagers to*/}
                    {/*        get a quick overview of their children's physical condition and*/}
                    {/*        test data.*/}
                    {/*    </li>*/}
                    {/*    <li>Currently "Login", "Check your health", "Personal Centre" and*/}
                    {/*        "Home" are available.*/}
                    {/*    </li>*/}
                    {/*    <li>It is expected that other expected features such as "user*/}
                    {/*        points", "404 pages" and "recommended reading" will be completed*/}
                    {/*        as scheduled*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </Item>
            </Grid>
        </>
    )
}

