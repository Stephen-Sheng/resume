
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Button as AntBtn } from 'antd';

export default function EditBackBar(props){
    const text = props.text
    const setEditStatus = props.setEditStatus
    return(
        <Grid container spacing={2} >
            <Grid item xs={4} style={{textAlign:"left"}}>
                <Button variant="text" onClick={()=>setEditStatus(false)} startIcon={<ArrowBackIosNewIcon />} style={{fontSize:"14px", marginLeft:"20px", marginTop:"20px", color:"black"}}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={4} style={{textAlign:"center"}}>
                <Button variant="text" style={{fontSize:"14px", marginTop:"20px", color:"black"}}>
                    {text}
                </Button>
            </Grid>
            <Grid item xs={4} style={{textAlign:"right"}}>
                <AntBtn htmlType="submit" shape={"round"} style={{borderColor:"#f64",marginTop:"20px", fontSize:"14px", color:"#f64", backgroundColor:"transparent", marginRight:"20px"}}>
                    Save
                </AntBtn>
            </Grid>
        </Grid>
    )
}