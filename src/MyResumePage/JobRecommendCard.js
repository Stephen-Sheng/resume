import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {useNavigation} from "react-navi";
import {Tag} from "antd";

export default function JobRecommendCard(props) {

    const {id,name,city,salary,degree,company} = props
    const navigation = useNavigation();
    function handleClickJob() {
        navigation.navigate(`/jobItem/${id}`)
    }

    return(
        <Grid item xs={6} style={{cursor:"pointer"}} onClick={handleClickJob}>
            <Card sx={{display: 'flex'}} style={{width: 301, height: 113}} component="span">
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}} style={{maxHeight: '100%', overflow: 'auto'}}>
                        <Grid container spacing={0}>
                            <Grid item xs={8}>
                                <Typography component="div" variant="h8" style={{fontSize:"16px",fontWeight:"600",lineHeight:"18px"}}>
                                    {name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component="div" variant="h8" style={{fontSize:"16px",fontWeight:"600",lineHeight:"18px",color:"#f64"}}>
                                    {salary}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} style={{paddingTop:"0px"}}>
                                <Tag color="#f5f8ff" style={{color: "#606060", fontSize:"13px"}}>{city}</Tag>
                            </Grid>
                            <Grid item xs={3} style={{paddingTop:"0px"}}>
                                <Tag color="#f5f8ff" style={{color: "#606060", fontSize:"13px"}}>{degree}</Tag>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>
                        <Typography component="div" style={{color:"#606060",fontSize:"14px",paddingTop:"5px"}}>
                            {company}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    )
}