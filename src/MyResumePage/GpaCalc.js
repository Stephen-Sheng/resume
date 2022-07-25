import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CalculateIcon from "@mui/icons-material/Calculate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import {useInput} from "react-hookedup";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import styled from "styled-components";


const OrangeBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #ff6644;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #ff6644;
    }
  }
`;

export default function GpaCalc() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);

    const GPA = useInput("")
    const total = useInput("")

    const [finalGPA,setFinalGPA] = React.useState("");

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleSnackClickOpen = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = () => {
        setSnackOpen(false);
    };



    const handleConversion = ()=>{
        if(GPA.value.length !== 0 && total.value.length !==0){
            const temp = parseFloat(GPA.value) * 4.0 /parseFloat(total.value)
            setFinalGPA(String(temp))
        }else{
            handleSnackClickOpen()
        }
    }

    return (
        <div>
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
                open={snackOpen}
                onClose={handleSnackClose}
            >
                <Alert severity="error">Input error</Alert>
            </Snackbar>
            <IconButton style={{color:"#f64"}} onClick={handleDialogClickOpen}>
                <CalculateIcon fontSize={"large"}/>
                <span style={{fontSize: "14px",color:"rgba(0,0,0,.7)",lineHeight:"18px"}}>GPA calculator</span>
            </IconButton>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>GPA Calculator</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{lineHeight:"28px"}} component={"span"}>
                        To facilitate HR's measurement of candidates, it is recommended that the GPA be converted to the 4.0 international standard.

                        <div>Enter your GPA and the school's overall standard into the box below.</div>

                        <div>Example:</div>
                        <div>1. with a perfect score of 5.0 and a GPA of 3.75, enter 3.75 in the GPA box and 5.0 in the total score box.</div>

                        <div>2. with a perfect score of 100 and a GPA of 87, enter 87 in the GPA box and 100 in the Total box.</div>
                    </DialogContentText>
                    <Grid container spacing={2} style={{paddingLeft:"20px"}}>
                        <Grid item xs={4}>
                            <OrangeBorderTextField
                                {...GPA.bindToInput}
                                autoFocus
                                margin="dense"
                                id="GPA"
                                label="GPA"
                                type="number"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <OrangeBorderTextField
                                {...total.bindToInput}
                                autoFocus
                                margin="dense"
                                id="total"
                                label="Total"
                                type="number"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4} style={{marginTop:"10px"}}>
                            <Button variant="contained" style={{
                                backgroundColor: "#f64",
                                padding: "10px",
                            }}
                                    onClick={handleConversion}
                            >
                                Convert
                            </Button>
                        </Grid>
                        {finalGPA.length !== 0 && <Grid item xs={12} style={{fontSize: "16px", color: "#404040", marginTop: "12px"}}>
                            Your GPA : {finalGPA}
                        </Grid>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button style={{color: "#f64"}} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
