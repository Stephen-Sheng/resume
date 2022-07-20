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

export default function JobCard(props) {

    const {company, location, ddl, id, logo} = props
    const navigation = useNavigation();
    function handleClickJob() {
        navigation.navigate(`/job/${id}`)
    }

    return(
        <Grid item xs={6} style={{cursor:"pointer"}} onClick={handleClickJob}>
        <Card sx={{display: 'flex'}} style={{width: 331, height: 113}} component="span">
            <CardMedia
                component="img"
                sx={{width: 54, height: 54}}
                image={logo}
                alt="Live from space album cover"
                style={{margin: "10px"}}
            />
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h8">
                        {company}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {location}
                    </Typography>
                    <Divider/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        <Button variant="text"
                                startIcon={<AccessTimeIcon style={{color: "#f64"}}/>}
                                style={{color: "inherit"}}>
                            DDL: {ddl}
                        </Button>
                    </Typography>
                </CardContent>
            </Box>
        </Card>
        </Grid>
    )
}