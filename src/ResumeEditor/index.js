import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResumeAppBar from "../ResumeAppBar";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
    display: 'none',
});
const Item = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    fontFamily:"Arial"
}));

export default function ResumeEditor() {

    return (
        <div style={{backgroundColor:"#353944"}}>
            <ResumeAppBar/>
            <Grid container spacing={0} style={{marginTop:"0.5rem"}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2.5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 324,
                                height: 1017,
                            },
                        }}
                    >
                    <Paper elevation={0}>

                    </Paper>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 719,
                                height: 1017,
                            },
                        }}>
                        <Paper elevation={0}>
                        <Grid container spacing={2} style={{padding:"45px"}}>
                            <Grid item xs={3} ></Grid>
                            <Grid item xs={6}><Item style={{fontWeight:700,fontSize:"20px"}}>Name</Item></Grid>
                            <Grid item xs={3}><label htmlFor="outlined-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="outlined" component="span" style={{width:"70px",height:"60px",fontSize:"10px"}}>
                                    Upload
                                </Button>
                            </label></Grid>
                        </Grid>
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}