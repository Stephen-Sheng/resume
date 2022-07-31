import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Card from "@mui/material/Card";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {useNavigation} from "react-navi";

export default function PostList(props) {

    const {summary, postTitle, postDate, category,cover} = props
    const navigation = useNavigation();
    // function handleClickJob() {
    //     navigation.navigate(`/job/${id}`)
    // }

    return(
        <Grid item xs={6} style={{cursor:"pointer"}}>
            <Card sx={{display: 'flex'}} style={{width: 786, height: 173}} component="span">
                <CardMedia
                    component="img"
                    sx={{maxWidth: "165px", maxHeight: "155px"}}
                    image={cover}
                    height={155}
                    width={193}
                    alt="Live from space album cover"
                    style={{margin: "10px"}}
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h8" style={{fontSize:"20px",lineHeight:"22px",fontWeight:"600"}}>
                            {postTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" style={{fontSize:"14px",color:"#9c9c9c",marginTop:"6px",lineHeight:"24px"}}>
                            {summary}
                        </Typography>
                        <Divider/>
                        <Typography variant="subtitle1" color="text.secondary" component="div" style={{marginBottom:"10px",marginTop:"5px"}}>
                            <Button variant="text"
                                    startIcon={<AccessTimeIcon style={{color: "#f64"}}/>}
                                    style={{color: "inherit",backgroundColor:"#f9f9f9", borderRadius:"12px",padding:"3px"}}>
                                {postDate}
                            </Button>
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    )
}