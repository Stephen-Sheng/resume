import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Box from "@mui/material/Box";
import * as React from "react";
import GpaCalc from "./GpaCalc";
import {useNavigation} from "react-navi";


export default function BottomBar() {

    const navigation = useNavigation()
    
    return(
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={5}>
                    <GpaCalc />
                </Grid>
                <Grid item xs={7}>
                    <IconButton style={{color:"#f64"}} onClick={()=>navigation.navigate('/tips')}>
                        <AccessAlarmIcon fontSize={"large"} />
                        <span style={{fontSize: "14px",color:"rgba(0,0,0,.7)",lineHeight:"18px"}}>Interview preparation</span>
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}